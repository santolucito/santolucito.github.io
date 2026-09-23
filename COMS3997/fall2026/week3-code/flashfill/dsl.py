"""
dsl.py -- the string language FlashFill searches over (Gulwani, POPL 2011, Sec. 3).

This file knows nothing about synthesis. It only defines:
  * tokens: character classes such as AlphaTok and NumTok that match maximal runs, and
  * the DSL itself: Concatenate(atom, ...), where
        atom     = ConstStr(s) | SubStr(v, p1, p2)
        position = CPos(k) | Pos(r1, r2, c)
    plus run_program(), which executes a program on an input string.

Slides: "Where do you cut? Fixed indices break" (CPos) and
        "Describe a cut by what surrounds it" (Pos).
"""

import string
from dataclasses import dataclass
from functools import lru_cache

MAX_TOKENS = 2  # longest token sequence we consider on either side of a position

# ---------------------------------------------------------------------------
# 1. Tokens: character classes that match MAXIMAL runs of characters.
#    "AlphaTok" in "Alan Turing" matches "Alan" and "Turing", never "lan".
# ---------------------------------------------------------------------------

CHAR_CLASSES = {
    "AlphaTok": string.ascii_letters,
    "UpperTok": string.ascii_uppercase,
    "LowerTok": string.ascii_lowercase,
    "NumTok": string.digits,
    "WhiteSpaceTok": " \t",
}
# One token per punctuation character, e.g. "'-'" matches a run of hyphens.
for ch in string.punctuation:
    CHAR_CLASSES[repr(ch)] = ch

START, END = "StartTok", "EndTok"  # match the empty string at the start / end


@lru_cache(maxsize=None)
def token_runs(s):
    """For each token, map run-start -> run-end and run-end -> run-start.

    Because runs are maximal, a position can start (or end) at most one run
    of a given token, so a dict is enough."""
    starts, ends = {}, {}
    for tok, chars in CHAR_CLASSES.items():
        starts[tok], ends[tok] = {}, {}
        i = 0
        while i < len(s):
            if s[i] in chars:
                j = i
                while j < len(s) and s[j] in chars:
                    j += 1
                starts[tok][i], ends[tok][j] = j, i
                i = j
            else:
                i += 1
    starts[START], ends[START] = {0: 0}, {0: 0}
    starts[END], ends[END] = {len(s): len(s)}, {len(s): len(s)}
    return starts, ends


def seq_ends_at(seq, s, t):
    """Does token sequence `seq` match some substring s[?:t]? (walk backwards)"""
    _, ends = token_runs(s)
    for tok in reversed(seq):
        if t not in ends[tok]:
            return False
        t = ends[tok][t]
    return True


def seq_starts_at(seq, s, t):
    """Does token sequence `seq` match some substring s[t:?]? (walk forwards)"""
    starts, _ = token_runs(s)
    for tok in seq:
        if t not in starts[tok]:
            return False
        t = starts[tok][t]
    return True


def seqs_ending_at(s, t, max_len=MAX_TOKENS):
    """All token sequences (length <= max_len) that match a substring ending at t."""
    _, ends = token_runs(s)
    results = []
    for tok, run in ends.items():
        if t in run:
            results.append((tok,))
            if max_len > 1 and tok != START:  # nothing comes before StartTok
                results += [prev + (tok,) for prev in seqs_ending_at(s, run[t], max_len - 1)]
    return results


def seqs_starting_at(s, t, max_len=MAX_TOKENS):
    """All token sequences (length <= max_len) that match a substring starting at t."""
    starts, _ = token_runs(s)
    results = []
    for tok, run in starts.items():
        if t in run:
            results.append((tok,))
            if max_len > 1 and tok != END:  # nothing comes after EndTok
                results += [(tok,) + nxt for nxt in seqs_starting_at(s, run[t], max_len - 1)]
    return results


# ---------------------------------------------------------------------------
# 2. The DSL.  Program = Concatenate(atom, atom, ...)
#    atom     = ConstStr(s) | SubStr(v, p1, p2)
#    position = CPos(k) | Pos(r1, r2, c)
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class CPos:
    """Absolute position k. Negative k counts from the end: CPos(-1) = len(v)."""
    k: int

    def eval(self, s):
        t = self.k if self.k >= 0 else len(s) + 1 + self.k
        return t if 0 <= t <= len(s) else None

    def __str__(self):
        return f"CPos({self.k})"


@dataclass(frozen=True)
class Pos:
    """The c-th position t such that r1 matches just LEFT of t and r2 just RIGHT.
    This is "position by context": 'right after the space', not 'index 5'."""
    r1: tuple
    r2: tuple
    c: int

    def eval(self, s):
        matches = [t for t in range(len(s) + 1)
                   if seq_ends_at(self.r1, s, t) and seq_starts_at(self.r2, s, t)]
        index = self.c - 1 if self.c > 0 else self.c
        return matches[index] if -len(matches) <= index < len(matches) else None

    def __str__(self):
        show = lambda r: "·".join(r) if r else "ε"
        return f"Pos({show(self.r1)}, {show(self.r2)}, {self.c})"


@dataclass(frozen=True)
class ConstStr:
    s: str

    def eval(self, v):
        return self.s

    def __str__(self):
        return f"ConstStr({self.s!r})"


@dataclass(frozen=True)
class SubStr:
    p1: object
    p2: object

    def eval(self, v):
        i, j = self.p1.eval(v), self.p2.eval(v)
        return v[i:j] if i is not None and j is not None and i <= j else None

    def __str__(self):
        return f"SubStr(v, {self.p1}, {self.p2})"


def run_program(atoms, v):
    """Concatenate(atoms) on input v. Returns None if any piece fails."""
    pieces = [a.eval(v) for a in atoms]
    return None if None in pieces else "".join(pieces)
