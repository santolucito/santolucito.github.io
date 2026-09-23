"""
flashfill.py -- a minimal FlashFill for teaching (COMS 3997, Week 3).

Based on: Sumit Gulwani, "Automating String Processing in Spreadsheets
using Input-Output Examples", POPL 2011.

The big idea: a single input/output example is consistent with a HUGE number
of programs. FlashFill never lists them one by one. It builds a compact data
structure (a "version space") that stands for ALL of them at once, intersects
those structures across examples, and only at the very end ranks the
survivors and picks one.

The code is split so that each idea lives in one file:
  dsl.py            the language: tokens, CPos / Pos, ConstStr / SubStr, run_program
  version_space.py  sets of programs: generate_positions, SubStrSet, generate_dag,
                    intersect_dags, size
  ranking.py        pick the most natural program: best_program
  flashfill.py      (this file) learn() ties them together, plus the demos

SIMPLIFICATIONS relative to the paper (on purpose, to keep this short):
  * NO Loop and NO Switch/conditionals. Only the straight-line fragment:
    one Concatenate of atoms. So a single program must fit every example.
  * One input string v (the paper allows several input columns).
  * Token sequences have at most MAX_TOKENS tokens. Position sets are plain
    Python sets of concrete expressions. The paper uses a more compact
    representation, with sets of equivalent tokens.
  * Ranking is a small hand-written cost function in the spirit of Sec. 5.3.

Run:  python3 flashfill.py   (from inside this folder)
"""

from dsl import run_program
from version_space import generate_dag, intersect_dags, size
from ranking import best_program


def learn(examples, verbose=True):
    """Build one DAG per example, intersect them all, return the best program."""
    dag = None
    for inp, out in examples:
        new = generate_dag(inp, out)
        dag = new if dag is None else intersect_dags(dag, new)
        if verbose:
            print(f"  after {inp!r} -> {out!r}: {size(dag):,} consistent programs")
    return best_program(dag)


def show(program):
    return "Concatenate(\n    " + ",\n    ".join(str(a) for a in program) + ")"


# ---------------------------------------------------------------------------
# Demo
# ---------------------------------------------------------------------------

def demo(title, examples, tests):
    print("=" * 70)
    print(title)
    program = learn(examples)
    print("Chosen program:")
    print(show(program))
    for t in tests:
        print(f"  {t!r:26} -> {run_program(program, t)!r}")
    print()


if __name__ == "__main__":
    names = ["Ada Lovelace", "Edsger Dijkstra", "Grace Brewster Hopper"]
    demo("Names, ONE example (look how big the version space is)",
         [("Alan Turing", "Turing, A.")], names)
    demo("Names, TWO examples (intersection shrinks it)",
         [("Alan Turing", "Turing, A."), ("Grace Hopper", "Hopper, G.")], names)

    # With two examples the cheapest program copies "-706-7709" wholesale.
    # It is consistent, but it fails (None) on a dotted number: overfitting
    # to the examples' format. One more example removes that program.
    phones = ["510.220.5586", "(212) 555 0199"]
    demo("Phone numbers, two examples",
         [("323-708-7700", "323-708-7700"), ("(425)-706-7709", "425-706-7709")], phones)
    demo("Phone numbers, plus one more example (the fix is more data)",
         [("323-708-7700", "323-708-7700"), ("(425)-706-7709", "425-706-7709"),
          ("510.220.5586", "510-220-5586")], phones)
