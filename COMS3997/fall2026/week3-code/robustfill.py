"""
robustfill.py -- a minimal RobustFill for teaching (COMS 3997, Week 3).

Based on: Devlin, Uesato, Bhupatiraju, Singh, Mohamed, Kohli,
"RobustFill: Neural Program Learning under Noisy I/O", ICML 2017.

SETUP (PyTorch lives in a local virtual environment; needs `uv`):
    uv venv --python 3.12 .venv
    uv pip install --python .venv/bin/python torch numpy
    .venv/bin/python robustfill.py            # trains ~3 min on CPU, then demos
    .venv/bin/python robustfill.py --noise 0.3  # train with typos in the outputs

READ THIS FIRST -- what the neural network does and does not do:
  * The network is only a PROPOSER. It reads the examples and suggests
    programs, one token at a time, like a translation model.
  * What we return is a deterministic DSL program. We RUN it with an
    ordinary interpreter on the examples and keep only candidates that
    check out. The network never computes an output string itself.
  * This is program SYNTHESIS, not program INDUCTION. An induction model
    maps (examples, new input) -> new output directly, and its "program"
    is hidden in the weights. Synthesis gives an explicit program you can
    read, test and reuse. The paper compares the two.

SIMPLIFICATIONS relative to the paper:
  * A tiny DSL. Each program token is a WHOLE expression, such as
    "ToUpper(Word,-1)", and a program has at most 4 of them.
  * Small LSTMs and a few minutes of CPU training. The paper trains on
    millions of programs.
  * Attention: the output encoder starts from the input encoder's final
    state, and the decoder attends to BOTH encodings. This is close to the
    paper's "Attention-B" variant, without the output->input attention.
"""

import argparse
import random
import re
import string
import time

import torch
import torch.nn as nn
import torch.nn.functional as F

# ---------------------------------------------------------------------------
# 1. The DSL and its (deterministic!) interpreter
# ---------------------------------------------------------------------------

TOKEN_REGEX = {"Word": r"[A-Za-z]+", "Num": r"[0-9]+"}
INDICES = [0, 1, 2, -1]  # which token: 1st, 2nd, 3rd, last
FUNCTIONS = {
    "GetToken": lambda t: t,
    "ToUpper": str.upper,
    "ToLower": str.lower,
    "ToProper": str.capitalize,
    "Initial": lambda t: t[0],
}
CONSTANTS = [" ", ",", ".", "-", "@", ", ", "/", ":"]
MAX_EXPRS = 4

# Every expression is one program token. Case functions only make sense on words.
EXPRESSIONS = [(f, typ, i) for f in FUNCTIONS for typ in TOKEN_REGEX for i in INDICES
               if typ == "Word" or f in ("GetToken", "Initial")]
EXPRESSIONS += [("Const", c) for c in CONSTANTS]


def expr_name(e):
    return f"Const({e[1]!r})" if e[0] == "Const" else f"{e[0]}({e[1]},{e[2]})"


PAD, BOS, EOS = 0, 1, 2
VOCAB = ["<pad>", "<bos>", "<eos>"] + [expr_name(e) for e in EXPRESSIONS]
EXPR_OF_TOKEN = {i + 3: e for i, e in enumerate(EXPRESSIONS)}


def eval_expr(e, s):
    """Run one expression on input s. None means 'this expression fails'."""
    if e[0] == "Const":
        return e[1]
    func, typ, index = e
    tokens = re.findall(TOKEN_REGEX[typ], s)
    if not -len(tokens) <= index < len(tokens):
        return None
    return FUNCTIONS[func](tokens[index])


def run_program(token_ids, s):
    pieces = [eval_expr(EXPR_OF_TOKEN[t], s) for t in token_ids]
    return None if None in pieces else "".join(pieces)


def show(token_ids):
    return "Concat(" + ", ".join(VOCAB[t] for t in token_ids) + ")"


# ---------------------------------------------------------------------------
# 2. Synthetic data: random programs + random inputs they work on
# ---------------------------------------------------------------------------

WORDS = ("alan turing grace hopper ada lovelace edsger dijkstra barbara liskov john "
         "mccarthy donald knuth frances allen tony hoare ken thompson radia perlman "
         "leslie lamport shafi goldwasser silvio micali judea pearl robin milner "
         "columbia paris tokyo boston lima cairo oslo delhi").split()
TEMPLATES = ["{W} {W}", "{W} {W} {W}", "{W}.{W}@{W}.com", "{W} {N}", "{N}-{N}-{N}",
             "({N}) {N}-{N}", "{W}, {W} {N}", "{W}/{W}/{N}", "{N} {W} {W}"]


def random_word():
    w = random.choice(WORDS)
    return random.choice([w.capitalize(), w.capitalize(), w, w.upper()])


def random_input(template):
    s = re.sub(r"\{W\}", lambda _: random_word(), template)
    return re.sub(r"\{N\}", lambda _: str(random.randint(1, 9999)), s)


def random_program():
    length = random.choices([1, 2, 3, 4], weights=[2, 3, 3, 2])[0]
    while True:
        prog = [random.choice(list(EXPR_OF_TOKEN)) if random.random() < 0.7
                else random.choice([t for t, e in EXPR_OF_TOKEN.items() if e[0] == "Const"])
                for _ in range(length)]
        if any(EXPR_OF_TOKEN[t][0] != "Const" for t in prog):  # not a pure constant
            return prog


def sample_task(n_inputs):
    """A random program plus n inputs (all from one template) it runs cleanly on."""
    while True:
        prog, template = random_program(), random.choice(TEMPLATES)
        inputs = [random_input(template) for _ in range(n_inputs)]
        outputs = [run_program(prog, s) for s in inputs]
        if all(outputs) and len(set(outputs)) > 1:  # valid, non-empty, not constant
            return prog, inputs, outputs


def add_noise(s):
    """One random character edit (insert / delete / substitute): a 'typo'."""
    i, c = random.randrange(len(s) + 1), random.choice(string.ascii_letters)
    op = random.choice(["insert", "delete", "substitute"]) if s else "insert"
    if op == "insert":
        return s[:i] + c + s[i:]
    i = min(i, len(s) - 1)
    return s[:i] + (c if op == "substitute" else "") + s[i + 1:]


# ---------------------------------------------------------------------------
# 3. The model: encode each example, decode a program, pool across examples
# ---------------------------------------------------------------------------

CHARS = string.printable[:95]
CHAR_ID = {c: i + 1 for i, c in enumerate(CHARS)}  # 0 is padding


def encode_strings(strings):
    ids = [[CHAR_ID.get(c, 1) for c in s] or [PAD] for s in strings]
    lengths = torch.tensor([len(x) for x in ids])
    padded = torch.zeros(len(ids), int(lengths.max()), dtype=torch.long)
    for row, x in enumerate(ids):
        padded[row, :len(x)] = torch.tensor(x)
    return padded, lengths


def attend(query, keys, mask):
    """Dot-product attention: a weighted average of `keys`, focused where
    they look like `query`. query (N,d), keys (N,L,d), mask (N,L)."""
    scores = torch.bmm(keys, query.unsqueeze(2)).squeeze(2)
    weights = F.softmax(scores.masked_fill(~mask, -1e9), dim=1)
    return torch.bmm(weights.unsqueeze(1), keys).squeeze(1)


class RobustFill(nn.Module):
    def __init__(self, hidden=128, emb=32):
        super().__init__()
        self.char_emb = nn.Embedding(len(CHARS) + 1, emb, padding_idx=0)
        self.input_encoder = nn.LSTM(emb, hidden, batch_first=True)
        self.output_encoder = nn.LSTM(emb, hidden, batch_first=True)
        self.prog_emb = nn.Embedding(len(VOCAB), emb)
        self.decoder = nn.LSTMCell(emb, hidden)
        self.combine = nn.Linear(3 * hidden, hidden)
        self.to_vocab = nn.Linear(hidden, len(VOCAB))

    def run_lstm(self, lstm, strings, state=None):
        chars, lengths = encode_strings(strings)
        packed = nn.utils.rnn.pack_padded_sequence(
            self.char_emb(chars), lengths, batch_first=True, enforce_sorted=False)
        out, (h, c) = lstm(packed, state)
        out, _ = nn.utils.rnn.pad_packed_sequence(out, batch_first=True)
        mask = torch.arange(out.shape[1])[None, :] < lengths[:, None]
        return out, mask, (h, c)

    def encode(self, inputs, outputs):
        """One row per (input, output) example. The output encoder starts where
        the input encoder stopped, so it reads the output 'knowing' the input."""
        in_states, in_mask, state = self.run_lstm(self.input_encoder, inputs)
        out_states, out_mask, (h, c) = self.run_lstm(self.output_encoder, outputs, state)
        return (in_states, in_mask, out_states, out_mask), (h[0], c[0])

    def step(self, prev_tokens, state, memory, n_examples):
        """One decoder step for every example, then LATE POOLING: max over the
        examples of the same task, so one prediction uses all of them."""
        in_states, in_mask, out_states, out_mask = memory
        h, c = self.decoder(self.prog_emb(prev_tokens), state)
        features = torch.tanh(self.combine(torch.cat(
            [h, attend(h, out_states, out_mask), attend(h, in_states, in_mask)], dim=1)))
        pooled = features.view(-1, n_examples, features.shape[1]).max(dim=1).values
        return self.to_vocab(pooled), (h, c)

    def loss(self, tasks):
        """Teacher forcing: feed the TRUE previous token, predict the next."""
        n = len(tasks[0][1])
        memory, state = self.encode([s for _, ins, _ in tasks for s in ins],
                                    [s for _, _, outs in tasks for s in outs])
        target = torch.full((len(tasks), MAX_EXPRS + 2), PAD)
        for row, (prog, _, _) in enumerate(tasks):
            seq = [BOS] + prog + [EOS]
            target[row, :len(seq)] = torch.tensor(seq)
        total = 0.0
        for t in range(MAX_EXPRS + 1):
            prev = target[:, t].repeat_interleave(n)  # same token for every example
            logits, state = self.step(prev, state, memory, n)
            total = total + F.cross_entropy(logits, target[:, t + 1], ignore_index=PAD)
        return total / (MAX_EXPRS + 1)


# ---------------------------------------------------------------------------
# 4. Inference: beam search proposes, the interpreter disposes
# ---------------------------------------------------------------------------

@torch.no_grad()
def beam_search(model, inputs, outputs, width=64):
    n = len(inputs)
    memory, state = model.encode(inputs, outputs)
    beams, finished = [(0.0, [])], []
    for _ in range(MAX_EXPRS + 1):
        k = len(beams)
        prev = torch.tensor([b[1][-1] if b[1] else BOS for b in beams]).repeat_interleave(n)
        mem_k = tuple(m.repeat(k, *[1] * (m.dim() - 1)) for m in memory)
        logits, (h, c) = model.step(prev, state, mem_k, n)
        logp = F.log_softmax(logits, dim=1).tolist()
        candidates = [(score + logp[b][tok], prog + [tok], b)
                      for b, (score, prog) in enumerate(beams)
                      for tok in range(3, len(VOCAB)) if len(prog) < MAX_EXPRS]
        candidates += [(score + logp[b][EOS], prog, -1)
                       for b, (score, prog) in enumerate(beams) if prog]
        candidates.sort(key=lambda x: -x[0])
        beams, parents = [], []
        for score, prog, parent in candidates[:width]:
            if parent == -1:
                finished.append((score, prog))
            else:
                beams.append((score, prog))
                parents.append(parent)
        if not beams:
            break
        rows = torch.tensor([p * n + e for p in parents for e in range(n)])
        state = (h[rows], c[rows])
    return sorted(finished, key=lambda x: -x[0])


def edit_distance(a, b):
    row = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        prev, row[0] = row[0], i
        for j, cb in enumerate(b, 1):
            prev, row[j] = row[j], min(row[j] + 1, row[j - 1] + 1, prev + (ca != cb))
    return row[-1]


def synthesize(model, inputs, outputs):
    """Return the best-scoring program that EXACTLY fits all examples. If none
    does (e.g. noisy examples), return the one with the smallest total edit
    distance, as in the paper's noise experiments."""
    candidates = beam_search(model, inputs, outputs)

    def distance(prog):
        results = [run_program(prog, s) for s in inputs]
        return sum(edit_distance(r, o) if r is not None else len(o) + 10
                   for r, o in zip(results, outputs))
    for _, prog in candidates:
        if distance(prog) == 0:
            return prog, "consistent"
    return min(candidates, key=lambda c: distance(c[1]))[1], "closest (edit distance)"


# ---------------------------------------------------------------------------
# 5. Training and demos
# ---------------------------------------------------------------------------

def train(model, minutes, noise, batch=64, n_examples=4):
    opt = torch.optim.Adam(model.parameters(), lr=2e-3)
    start, step = time.time(), 0
    while time.time() - start < minutes * 60:
        tasks = [sample_task(n_examples) for _ in range(batch)]
        if noise:
            tasks = [(p, ins, [add_noise(o) if random.random() < noise else o for o in outs])
                     for p, ins, outs in tasks]
        loss = model.loss(tasks)
        opt.zero_grad()
        loss.backward()
        opt.step()
        if step % 200 == 0:
            print(f"  step {step:5d}  {time.time() - start:5.0f}s  loss {loss.item():.3f}")
        step += 1
    print(f"  trained {step} steps ({step * batch:,} tasks) in {time.time() - start:.0f}s")


def demo_task(model, name, examples, tests):
    inputs, outputs = zip(*examples)
    prog, how = synthesize(model, list(inputs), list(outputs))
    print(f"--- {name}\n  program [{how}]: {show(prog)}")
    for s in tests:
        print(f"    {s!r:28} -> {run_program(prog, s)!r}")


def held_out_accuracy(model, n_tasks=200):
    """A task counts as solved only if the program is right on 2 inputs it never saw."""
    random.seed(12345)  # the same held-out tasks every time we evaluate
    solved = consistent = 0
    for _ in range(n_tasks):
        _, inputs, outputs = sample_task(6)
        prog, how = synthesize(model, inputs[:4], outputs[:4])
        consistent += how == "consistent"
        solved += all(run_program(prog, s) == o for s, o in zip(inputs[4:], outputs[4:]))
    return consistent / n_tasks, solved / n_tasks


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--minutes", type=float, default=3.0)
    parser.add_argument("--noise", type=float, default=0.0,
                        help="probability of a random typo in each training output")
    parser.add_argument("--seed", type=int, default=0)
    args = parser.parse_args()
    random.seed(args.seed)
    torch.manual_seed(args.seed)

    print("Example random training task:")
    prog, ins, outs = sample_task(4)
    print(f"  {show(prog)}")
    for s, o in zip(ins, outs):
        print(f"    {s!r:28} -> {o!r}")

    model = RobustFill()
    # Baseline: the same beam search + interpreter check, but an UNTRAINED
    # proposer. Anything above this number is what the network learned.
    model.eval()
    fits, acc = held_out_accuracy(model)
    print(f"\nUntrained network, held-out tasks: consistent {fits:.0%}, correct {acc:.0%}")
    random.seed(args.seed)

    print(f"\nTraining for {args.minutes} min (noise={args.noise}) ...")
    model.train()
    train(model, args.minutes, args.noise)
    model.eval()

    print("\nHand-written tasks (4 examples each):")
    demo_task(model, "last name, upper-cased",
              [("alan turing", "TURING"), ("Grace Hopper", "HOPPER"),
               ("ada lovelace", "LOVELACE"), ("Tony Hoare", "HOARE")],
              ["Barbara Liskov", "robin milner"])
    demo_task(model, "'Turing, A.'",
              [("Alan Turing", "Turing, A."), ("Grace Hopper", "Hopper, G."),
               ("Ada Lovelace", "Lovelace, A."), ("Tony Hoare", "Hoare, T.")],
              ["Edsger Dijkstra", "Barbara Liskov"])
    demo_task(model, "user name from e-mail",
              [("alan.turing@columbia.com", "alan"), ("grace.hopper@yale.com", "grace"),
               ("ada.byron@oxford.com", "ada"), ("ken.thompson@bell.com", "ken")],
              ["judea.pearl@ucla.com"])
    demo_task(model, "area code",
              [("(212) 555-0199", "212"), ("(650) 253-0000", "650"),
               ("(415) 736-0000", "415"), ("(718) 260-3000", "718")],
              ["(917) 123-4567"])

    print("\nNoisy examples (typo 'HOPPR' in example 2):")
    demo_task(model, "last name, upper-cased, with a typo",
              [("alan turing", "TURING"), ("Grace Hopper", "HOPPR"),
               ("ada lovelace", "LOVELACE"), ("Tony Hoare", "HOARE")],
              ["Barbara Liskov"])

    print("\nHeld-out random tasks (4 observed examples, 2 hidden test inputs):")
    fits, acc = held_out_accuracy(model)
    print(f"  found a program consistent with the 4 examples: {fits:.0%}")
    print(f"  program also correct on the 2 hidden inputs:    {acc:.0%}")
