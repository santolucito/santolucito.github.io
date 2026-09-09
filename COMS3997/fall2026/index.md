---
layout: default
title: COMS3997
---

# New Directions in Computing: Neurosymbolic AI

## Fall 2026

Prof. Mark Santolucito


# Summary

How do we build AI systems that generalize and reason, not just predict? This seminar explores neurosymbolic AI: the integration of neural networks with symbolic structures like programs, logics, and proofs. We will examine program synthesis and LLM-guided code generation, learning as program induction as a path toward genuine abstraction, and how formal methods can constrain and verify neural systems, from theorem proving in Lean to temporal logic specifications as guardrails for agents. Students will read, discuss, and present recent research papers and complete a hands-on project.

Prerequisite: Advanced Programming or equivalent.

# Course Structure

Each week we will read and discuss 1-2 research papers. Every student will take a presentation role several times during the semester, and everyone posts a short reading response before each class. The second deliverable is a hands-on project, done individually or in pairs — building, extending, or empirically studying a neurosymbolic system — with a proposal, an in-progress presentation, and a final writeup and presentation.

Grading: participation and reading responses, paper presentations, and the final project. (Exact breakdown on the syllabus.)

## Presentations

Every week, starting in week 3, we will have a presentation on two papers from the assigned reading. It is run as a role play: three students take a role for that paper, and the rest of the class comes ready to join the cross-examination with questions from their reading response. Sign-ups happen in Week 2. Over the semester everyone plays each role at least once — the point is that you get practice reading a paper generously *and* adversarially.

**Author** (~15 min, slides). Present the paper as if you wrote it. What problem were you stuck on, what was the key idea that unstuck it, and what do the experiments actually show? Do not narrate the paper section by section — tell us the one thing you want us to remember. You own the details: if someone asks what the ablation removed, how the search is guided, or what the DSL actually contains, you answer.

**Champion** (~5 min). Argue this paper deserves a best paper award. Why does the idea matter beyond the benchmark it was evaluated on — what does it unlock, and what would you build on top of it? Concede the paper's single biggest weakness up front and explain why it does not sink the contribution. Vague enthusiasm is not championing; be specific.

**Critic** (~5 min). You are Reviewer 2 and you recommend reject. Attack the claims, not the authors. Good targets: claims the experiments do not support, a missing baseline that might have won, a benchmark that does not measure the thing being claimed, compute or annotation costs buried in an appendix, results that will not survive a change of domain. Close with the one experiment that would change your score — a critique you cannot turn into an experiment is an opinion.

**Implementer** (~5 min). Before class, get the artifact running — or fail to, and report exactly where it broke. Run it on one input the paper never considered and show us what happened.

**Discussion** (~20 min). Champion and Critic cross-examine each other, the Author defends, and the class joins in. By the end we should agree on what we would have to believe for this paper to be right, and on what the next paper in this line should do.

For all roles: read any one paper this work cites and any one that cites it (you choose). It is helpful to know where the idea came from and what happened to it next.

# Schedule

Schedule and readings are tentative and will be adjusted as the semester progresses.

### Week 1 - Class introduction: prediction vs. reasoning, the case for structure

*In class*
In pairs, start by solving some ARC v1 tasks by hand. Pick one that is interesting. Write a program (feel free to use an LLM) that solves some tasks in 3 different programming paradigms (e.g. imperative, functional, logic programming, smt). 

### Week 2 - Pure Symbolic Methods

*REMOTE Lecture 9-10*

*In class*
Intro to Satisfiability Modulo Theories (SMT) and Inductive Logic Programming 

*Readings for before class (no presentations)*
- Handbook of Model Checking, chapter on SMT (on Courseworks)
- Handbook of Model Checking, chapter on Program Synthesis (on Courseworks)
- [On the Measure of Intelligence (Chollet, 2019)](https://arxiv.org/abs/1911.01547)

*Homework*
Write a Sudoku (or similar) solver in SMT and ILP

### Week 3 - FlashFill and RobustFill

- [FlashFill: Automating String Processing in Spreadsheets Using Input-Output Examples (Gulwani, POPL 2011)](https://www.microsoft.com/en-us/research/publication/automating-string-processing-spreadsheets-using-input-output-examples/)
- [RobustFill: Neural Program Learning under Noisy I/O (Devlin, Uesato, Bhupatiraju, Singh, Mohamed, Kohli, ICML 2017)](https://arxiv.org/abs/1703.07469)

*Homework*
Write an enumerative program synthesis engine for programming by example

### Week 4 - Neural program synthesis

- [DeepCoder: Learning to Write Programs (Balog, Gaunt, Brockschmidt, Nowozin, Tarlow, ICLR 2017)](https://arxiv.org/abs/1611.01989)
- [Grammar Filtering for Syntax-Guided Synthesis (Morton, Hallahan, Shum, Piskac, Santolucito, AAAI 2020)](https://www.marksantolucito.com/papers/aaai2020.pdf)

### Week 5 - Concept learning as program induction

- [Human-level Concept Learning through Probabilistic Program Induction (Lake, Salakhutdinov, Tenenbaum, Science 2015)](https://www.cs.cmu.edu/~rsalakhu/papers/LakeEtAl2015Science.pdf)
- [DreamCoder: Growing Generalizable, Interpretable Knowledge with Wake-Sleep Bayesian Program Learning (Ellis, Wong, Nye, Sable-Meyer, Cary, Morales, Hewitt, Solar-Lezama, Tenenbaum, PLDI 2021)](https://arxiv.org/abs/2006.08381)

### Week 6 - Abstraction and compression

- [babble: Learning Better Abstractions with E-Graphs and Anti-Unification (Cao, Kunkel, Nandi, Willsey, Tatlock, Polikarpova, POPL 2023)](https://arxiv.org/abs/2212.04596)
- [Stitch: Top-Down Synthesis for Library Learning (Bowers, Olausson, Wong, Grand, Tenenbaum, Ellis, Solar-Lezama, POPL 2023)](https://arxiv.org/abs/2211.16605)

### Week 7 - Looping models

- [Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning (Drozdova, Sirbu, Miotti, Obryk, Etcheverry, Niklasson, Richards, 2026)](https://arxiv.org/abs/2609.01449)
- [Lattice Deduction Transformers (Davis, Haller, Alfarano, Santolucito, 2026)](https://arxiv.org/abs/2605.08605)

### Week 8 - Temporal logic and Games

- [Safe Reinforcement Learning via Shielding (Alshiekh, Bloem, Ehlers, Konighofer, Niekum, Topcu, AAAI 2018)](https://arxiv.org/abs/1708.08611)
- [Mining Beyond the Bools: Learning Data Transformations and Temporal Specifications (Kouteili, Fishell, Scaff, Santolucito, Piskac, 2026)](https://arxiv.org/abs/2603.06710)

### Week 9 - Lean

- [The Lean 4 Theorem Prover and Programming Language (de Moura, Ullrich, CADE 2021)](https://lean-lang.org/papers/lean4.pdf)
- Optional: [A Metaprogramming Framework for Formal Verification (Ebner, Ullrich, Roesch, Avigad, de Moura, ICFP 2017)](https://lean-lang.org/papers/tactic.pdf)

*Homework*
Lean Tutorial

(project proposals due)

### Week 10 - Building formal libraries: Mathlib and CSLib

- [The Lean Mathematical Library (The mathlib Community, CPP 2020)](https://arxiv.org/abs/1910.09336)
- [CSLib: The Lean Computer Science Library (Barrett, Chaudhuri, Montesi, Grundy, Kohli, de Moura, Rademaker, Yingchareonthawornchai, 2026)](https://arxiv.org/abs/2602.04846)

### Week 11 - Constrained Decoding

- [Flexible and Efficient Grammar-Constrained Decoding (Park, Zhou, D'Antoni, ICML 2025)](https://arxiv.org/abs/2502.05111)
- [ChopChop: A Programmable Framework for Semantically Constraining the Output of Language Models (Nagy, Zhou, Polikarpova, D'Antoni, POPL 2026)](https://arxiv.org/abs/2509.00360)

### THANKSGIVING BREAK

### Week 12 - Formal Methods in Industry

- [Semantic-based Automated Reasoning for AWS Access Policies using SMT (Backes, Bolignano, Cook, Dodge, Gacek, Luckow, Rungta, Tkachuk, Varming, FMCAD 2018)](https://www.amazon.science/publications/semantic-based-automated-reasoning-for-aws-access-policies-using-smt)
- [Cedar: A New Language for Expressive, Fast, Safe, and Analyzable Authorization (Cutler, Disselkoen, Eline, He, Headley, Hicks, Hietala, Ioannidis, Kastner, Mamat, McAdams, McCutchen, Rungta, Torlak, Wells, 2024)](https://arxiv.org/abs/2403.04651)

### Week 13 - Project in-progress presentations

Present what you have so far, final presentation is via video upload to youtube before end of finals period.

