---
title: 'AI: The First Layer Without a Contract'
date: 2026-08-05T04:00:00.000Z
summary: AI is the newest layer in Tanenbaum's philosophy of layered abstraction, but unlike every layer before it, it is indeterministic. There is no hard contract.
draft: true
tags:
- ai
- software-engineering
---

## Idea

Tanenbaum's philosophy of layers: each generation of computing adds an abstraction layer that programmers wield without needing to understand everything beneath it. Machine code, assembly, programming languages, operating systems, dev tools, frameworks. AI is the latest layer in that stack, another tool to wield.

The catch most people don't center their discussion around: every previous layer had a hard contract. A compiler produces the same output for the same input. An OS syscall has defined semantics. AI as a layer is indeterministic. There is no hard contract like every layer before it had.

## Points to develop

- Map the historical layers (Tanenbaum, structured computer organization) and the contract each one offered
- What "contract" means: determinism, testability, spec conformance
- What changes when the layer is probabilistic: verification moves from the interface to the output, evals replace unit tests, trust is statistical not guaranteed
- How practitioners are coping: guardrails, structured output, retries, human review
- Maybe: this is why AI feels different to senior engineers, the abstraction leaks by design
