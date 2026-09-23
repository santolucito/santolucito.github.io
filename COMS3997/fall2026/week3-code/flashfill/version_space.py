"""
version_space.py -- sets of programs, stored WITHOUT listing them (Sec. 4).

This is the heart of FlashFill: the version-space algebra.
  * generate_positions(): every position expression that points at an index
  * SubStrSet:            "keep the choices, not the programs"
  * generate_dag():       GenerateStr, the DAG of every way to split the output
  * intersect_dags():     combine two examples (product construction)
  * size():               count the programs by dynamic programming, never enumerating

Slides: "Keep the choices, not the programs", "Why a graph?",
        "Label each edge...", "Version-space algebra: the operations",
        "Options add up in memory but multiply in programs".
"""

from dataclasses import dataclass

from dsl import (CPos, Pos, ConstStr, seq_ends_at, seq_starts_at,
                 seqs_ending_at, seqs_starting_at)

def generate_positions(s, k):
    """GeneratePosition: every position expression that evaluates to k on s."""
    positions = {CPos(k), CPos(k - len(s) - 1)}
    for r1 in [()] + seqs_ending_at(s, k):
        for r2 in [()] + seqs_starting_at(s, k):
            if not r1 and not r2:
                continue  # Pos(ε, ε, c) is just CPos in disguise
            matches = [t for t in range(len(s) + 1)
                       if seq_ends_at(r1, s, t) and seq_starts_at(r2, s, t)]
            i = matches.index(k)
            # Record both "c-th from the left" and "c-th from the right".
            positions.add(Pos(r1, r2, i + 1))
            positions.add(Pos(r1, r2, -(len(matches) - i)))
    return frozenset(positions)


@dataclass(frozen=True)
class SubStrSet:
    """All SubStr(v, p1, p2) with p1 in `starts` and p2 in `ends`.

    KEY TRICK: we store the two choices separately. |starts| * |ends|
    programs cost only |starts| + |ends| memory."""
    starts: frozenset
    ends: frozenset

    def size(self):
        return len(self.starts) * len(self.ends)


def label_size(label):
    """Number of atoms an edge label stands for (ConstStr counts as 1)."""
    return sum(1 if isinstance(a, ConstStr) else a.size() for a in label)


@dataclass
class Dag:
    """Nodes are positions in the output; edge (i, j) carries a label: a list
    of atom-sets, each able to produce output[i:j]. Any path from start to
    end is a Concatenate program, so the DAG holds all ways to split the
    output into pieces, and all ways to make each piece."""
    start: object
    end: object
    edges: dict  # (u, v) -> list of ConstStr / SubStrSet


def generate_dag(inp, out):
    """GenerateStr: the version space of all programs mapping inp -> out."""
    edges = {}
    for i in range(len(out)):
        for j in range(i + 1, len(out) + 1):
            piece = out[i:j]
            label = [ConstStr(piece)]  # we can always just type the text...
            for k in range(len(inp) - len(piece) + 1):  # ...or copy it from the input
                if inp[k:k + len(piece)] == piece:
                    label.append(SubStrSet(generate_positions(inp, k),
                                           generate_positions(inp, k + len(piece))))
            edges[(i, j)] = label
    return Dag(0, len(out), edges)


def intersect_labels(label1, label2):
    """Atoms that appear in BOTH labels (work on the sets, not the programs)."""
    result = []
    for a in label1:
        for b in label2:
            if isinstance(a, ConstStr) and a == b:
                result.append(a)
            elif isinstance(a, SubStrSet) and isinstance(b, SubStrSet):
                starts, ends = a.starts & b.starts, a.ends & b.ends
                if starts and ends:
                    result.append(SubStrSet(starts, ends))
    return result


def intersect_dags(d1, d2):
    """Product construction: node (i1, i2) means 'at i1 in output 1 and at i2
    in output 2'. An edge survives only if its labels share an atom, i.e.
    one piece of program explains BOTH examples."""
    edges = {}
    for (u1, v1), l1 in d1.edges.items():
        for (u2, v2), l2 in d2.edges.items():
            label = intersect_labels(l1, l2)
            if label:
                edges[((u1, u2), (v1, v2))] = label
    return prune(Dag((d1.start, d2.start), (d1.end, d2.end), edges))


def prune(dag):
    """Drop edges not on some start -> end path (dead ends from the product)."""
    def reach(frm, edge_list, forward):
        seen, stack = {frm}, [frm]
        while stack:
            n = stack.pop()
            for (u, v) in edge_list:
                a, b = (u, v) if forward else (v, u)
                if a == n and b not in seen:
                    seen.add(b)
                    stack.append(b)
        return seen
    fwd = reach(dag.start, dag.edges, True)
    bwd = reach(dag.end, dag.edges, False)
    dag.edges = {(u, v): l for (u, v), l in dag.edges.items() if u in fwd and v in bwd}
    return dag


def outgoing(dag):
    out = {}
    for (u, v), label in dag.edges.items():
        out.setdefault(u, []).append((v, label))
    return out


def size(dag):
    """Count programs = sum over paths of product of edge-label sizes (DP)."""
    succ, memo = outgoing(dag), {}

    def count(u):
        if u == dag.end:
            return 1
        if u not in memo:
            memo[u] = sum(label_size(l) * count(v) for v, l in succ.get(u, []))
        return memo[u]
    return count(dag.start)
