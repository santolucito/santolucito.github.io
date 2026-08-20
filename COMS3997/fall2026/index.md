---
layout: default
title: COMS3997
---

# New Directions in Computing: Neurosymbolic AI

## Fall 2026

Prof. Mark Santolucito

[Course poster](./poster.html)

# Summary

How do we build AI systems that generalize and reason, not just predict? This seminar explores neurosymbolic AI: the integration of neural networks with symbolic structures like programs, logics, and proofs. We will examine program synthesis and LLM-guided code generation, learning as program induction as a path toward genuine abstraction, and how formal methods can constrain and verify neural systems, from theorem proving in Lean to temporal logic specifications as guardrails for agents. Students will read, discuss, and present recent research papers and complete a hands-on project.

Prerequisite: Advanced Programming or equivalent.

# Course Structure

Each week we will read and discuss 1-2 research papers. Every student will present at least one paper during the semester, and everyone posts a short reading response before each class. The second deliverable is a hands-on project, done individually or in pairs — building, extending, or empirically studying a neurosymbolic system — with a proposal, an in-progress presentation, and a final writeup and presentation.

Grading: participation and reading responses, paper presentation, and the final project. (Exact breakdown on the syllabus.)

# Schedule

Schedule and readings are tentative and will be adjusted as the semester progresses.

## Module 1 - Why Neurosymbolic?

Week 1 - Class introduction: prediction vs. reasoning, the case for structure
- [On the Measure of Intelligence (Chollet, 2019)](https://arxiv.org/abs/1911.01547)
- Thinking, Fast and Slow (Kahneman, 2011) - selected excerpts on System 1 and System 2
- [Thinking Fast and Slow in AI (Booch, Rossi, et al., 2020)](https://arxiv.org/abs/2010.06002)

Week 2 - The neurosymbolic landscape
- [Neurosymbolic AI: The 3rd Wave (Garcez & Lamb, 2020)](https://arxiv.org/abs/2012.05876)

## Module 2 - Program Synthesis and LLM-Guided Code Generation

Week 3 - Classical program synthesis: inductive synthesis and search
- FlashFill: Automating String Processing in Spreadsheets Using Input-Output Examples (Gulwani, POPL 2011)

Week 4 - Neural program synthesis
- [DeepCoder: Learning to Write Programs (Balog et al., 2017)](https://arxiv.org/abs/1611.01989)
- [RobustFill: Neural Program Learning under Noisy I/O (Devlin et al., 2017)](https://arxiv.org/abs/1703.07469)
- [Grammar Filtering for Syntax Guided Synthesis (Morton et al., AAAI 2020)](https://www.marksantolucito.com/papers/aaai2020.pdf)

Week 5 - LLMs as code generators
- [Evaluating Large Language Models Trained on Code (Chen et al., 2021)](https://arxiv.org/abs/2107.03374)
- [Competition-Level Code Generation with AlphaCode (Li et al., 2022)](https://arxiv.org/abs/2203.07814)

## Module 3 - Learning as Program Induction

Week 6 - Concept learning as program induction
- Human-level concept learning through probabilistic program induction (Lake, Salakhutdinov, Tenenbaum, Science 2015)

Week 7 - Wake-sleep library learning
- [DreamCoder: Growing generalizable, interpretable knowledge with wake-sleep Bayesian program learning (Ellis et al., PLDI 2021)](https://arxiv.org/abs/2006.08381)

Week 8 - Abstraction and compression
- [Top-Down Synthesis for Library Learning / Stitch (Bowers et al., POPL 2023)](https://arxiv.org/abs/2211.16605)

Week 9 - Abstraction benchmarks: ARC and beyond (project proposals due)

## Module 4 - Formal Methods Meets Neural Systems

Week 10 - Neural theorem proving in Lean
- [LeanDojo: Theorem Proving with Retrieval-Augmented Language Models (Yang et al., NeurIPS 2023)](https://arxiv.org/abs/2306.15626)

Week 11 - Autoformalization and proof sketching
- [Autoformalization with Large Language Models (Wu et al., 2022)](https://arxiv.org/abs/2205.12615)
- [Draft, Sketch, and Prove (Jiang et al., ICLR 2023)](https://arxiv.org/abs/2210.12283)

Week 12 - Temporal logic and formal guardrails for agents
- [Safe Reinforcement Learning via Shielding (Alshiekh et al., AAAI 2018)](https://arxiv.org/abs/1708.08611)
- Automated reasoning in industry at AWS:
  [Semantic-based Automated Reasoning for AWS Access Policies using SMT (Backes et al., FMCAD 2018)](https://www.amazon.science/publications/semantic-based-automated-reasoning-for-aws-access-policies-using-smt)
  and [Automated Reasoning checks in Amazon Bedrock Guardrails](https://aws.amazon.com/bedrock/guardrails/)
- Optional: [Cedar: A New Language for Expressive, Fast, Safe, and Analyzable Authorization (Cutler et al., 2024)](https://arxiv.org/abs/2403.04651)

Week 13 - Project in-progress presentations

Week 14 - Final project presentations + course wrap-up
