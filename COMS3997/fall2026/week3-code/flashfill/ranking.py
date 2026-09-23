"""
ranking.py -- pick ONE program out of the version space (Sec. 5.3).

The version space says what is POSSIBLE (everything consistent with the
examples). Ranking says what is LIKELY: a hand-written "Occam's razor" cost.
Prefer SubStr over ConstStr, Pos over CPos, fewer pieces and shorter contexts.

Slide: "Many programs survive; Occam's razor picks one".
"""

from dsl import CPos, Pos, ConstStr, SubStr
from version_space import outgoing

PIECE_COST = 3  # each extra piece of Concatenate costs something


def position_cost(p):
    if isinstance(p, CPos):
        return 3  # absolute indices rarely generalize
    return 1 + 0.5 * (len(p.r1) + len(p.r2)) + 0.1 * (abs(p.c) - 1)


def position_key(p):
    # Ties are common: in "Alan Turing" the space is both the 1st and the
    # last (-1) space. The examples cannot tell them apart, so this is pure
    # ranking bias. We break ties toward counting from the RIGHT, which is
    # why "Grace Brewster Hopper" gets "Hopper" and not "Brewster".
    return (position_cost(p), isinstance(p, Pos) and p.c > 0, str(p))


def best_atom(label):
    """Cheapest single atom from an edge label, with its cost."""
    options = []
    for a in label:
        if isinstance(a, ConstStr):
            options.append((2 + 2 * len(a.s), 0, a))  # constants are a last resort
        else:
            p1 = min(a.starts, key=position_key)
            p2 = min(a.ends, key=position_key)
            options.append((position_cost(p1) + position_cost(p2), 1, SubStr(p1, p2)))
    cost, _, atom = min(options, key=lambda o: (o[0], o[1], str(o[2])))
    return cost, atom


def best_program(dag):
    """Cheapest start -> end path, choosing the best atom on each edge (DP)."""
    succ, memo = outgoing(dag), {}

    def best(u):
        if u == dag.end:
            return 0, []
        if u not in memo:
            choices = []
            for v, label in succ.get(u, []):
                atom_cost, atom = best_atom(label)
                rest_cost, rest = best(v)
                choices.append((PIECE_COST + atom_cost + rest_cost, [atom] + rest))
            memo[u] = min(choices, key=lambda c: (c[0], len(c[1])))
        return memo[u]
    return best(dag.start)[1]
