---
title: The Mikado Method in the Age of AI Agents
date: 2026-03-01T14:00:00.000Z
summary: A 2014 technique for navigating legacy codebases turns out to be a near-perfect framework for governing AI coding agents, once you account for the fact that AI-generated code is essentially free.
tags:
  - ai
  - software-engineering
  - developer-productivity
  - spec-driven-development
draft: false
---

> AI-assisted: I developed the thesis, provided the source materials (the Mikado Method Chapter 1 PDF and a spec-driven development reference), and reviewed the final post for accuracy. Claude helped draft and structure the content.

There is a Japanese game called Mikado, which most people know as pick-up sticks. You drop a bundle of sticks on the table and then try to remove them one at a time without disturbing the others. The one you want is always buried under three more. Every large codebase works exactly the same way.

The [Mikado Method](https://www.manning.com/books/the-mikado-method), a book by Ola Ellnestam and Daniel Brolund published in 2014, takes that metaphor seriously. It is a structured technique for making significant changes to complex software without breaking the build at any point along the way. I have found it to be one of the clearest thinking about how software change actually works. And recently I have started to believe it was inadvertently designed for a world where AI writes the code.

## What the Mikado Method actually is

The method has four primitives.

**Set a goal.** Write down what you want the system to do or be when you are finished. Be concrete. "Admin services are in a separate package deployable without customer services" is a goal. "Improve the architecture" is not.

**Experiment naively.** Try to implement the goal right now, without analyzing all the consequences first. Make the change. Run the compiler. Run the tests. See what breaks.

**Visualize.** Whatever breaks is a prerequisite: something that must be true before your goal is achievable. Write it down as a node in a graph, with an arrow pointing toward the goal it unblocks. The graph is the artifact. It is the only thing that survives the next step.

**Undo.** Revert every breaking change. Return to the last known working state. Start over on a prerequisite node, not the goal.

You repeat this loop for each prerequisite, and each prerequisite's prerequisites, until you reach leaf nodes that can be implemented cleanly without breaking anything. Then you work back up the tree, committing at each step, always keeping the codebase green.

The authors are direct about one thing that surprises new practitioners: the undo step is not waste. The code you wrote and reverted taught you something. The graph holds that knowledge. Nothing was lost except the broken code, which was never going to ship anyway.

## Why it works, and where the friction lives

For a human developer working on a brownfield system, the Mikado Method delivers on its promises. The codebase never enters a long-lived broken state. There are no "refactoring branches" that accumulate months of divergence and produce a painful merge at the end. Each commit is small, green, and shippable. Stakeholders can watch the graph shrink as prerequisites get checked off, which is far better than watching nothing happen for three weeks and then getting a big bang release.

The method also surfaces dependencies empirically rather than through analysis. Instead of spending hours reading code trying to predict what will break, you try the change and let the compiler and tests tell you. The naive approach is faster than the analytical one.

But I will be honest about the friction, because the method is not free of it.

The revert cycle has a cost that the book somewhat underplays. Writing code you know you are about to delete feels bad, even when you understand intellectually that you are learning, not wasting time. There is an emotional overhead to undoing your own work repeatedly. For a developer who is already under pressure, the discipline required to revert rather than keep patching is genuinely hard to maintain.

There is also ceremony. Maintaining the graph, deciding which node to work next, keeping the prerequisites from becoming stale as the codebase evolves around you: these are real coordination costs, especially for a solo developer on a tight deadline. The method was designed for teams. For one person it sometimes feels like a lot of scaffolding.

The result is a technique that produces excellent outcomes but asks real effort from the human doing it. That tradeoff made sense in 2014. It looks different now.

## The AI coding agent problem

Unconstrained AI coding agents have a characteristic failure mode that I have seen described many ways, but the underlying shape is always the same.

You give an agent a goal. It charges at the goal directly. It makes changes across a wide surface area of the codebase simultaneously, because it has read everything and sees all the connections at once. The code it produces compiles, passes a superficial check, and looks plausible. But the failure mode that hurts in practice is subtler than "wrong code." Individual diffs look correct in isolation; the system as a whole has a latent bug no single commit would reveal. An agent widens a type across many files and every callsite's tests still pass, but one downstream caller compares strictly where the producer normalizes. Each file is green. The integration is broken. You discover this later through a test you did not have, or through production behavior that looks nothing like the spec.

The agent has no intuition about working state. It does not feel the pain of a broken build. It does not develop a reflexive preference for keeping things green. It is optimistic by construction: it produces a complete-looking answer rather than surfacing what it does not know.

The longer an agent session runs, the worse this gets. Context drift is well-documented: in long-running sessions, agents lose track of earlier constraints and decisions, gradually producing output that diverges from the original intent. The agent at the end of a two-hour session is operating with a degraded model of the codebase compared to the agent at the start.

The fixes people reach for tend to be external: code review, CI gates, smaller prompts, more explicit instructions. These help but they do not address the structural problem, which is that agents need a method, not just guardrails.

## Where Mikado and AI overlap

The Mikado Method maps almost perfectly onto the agent workflow problem.

| Mikado concept | Agent equivalent |
|---|---|
| Mikado Goal | The spec or user story given to the agent |
| Naive implementation | Let the agent attempt the change without scaffolding |
| Errors surface prerequisites | Test and compile failures reveal what the agent needs first |
| Visualize the graph | Human captures failures as structured prerequisite tasks |
| Undo | Discard the agent's branch; cost is near zero |
| Work the leaf nodes first | Give the agent atomic, prereq-free sub-tasks one at a time |

The critical inversion is in the undo step.

For a human developer, reverting code is emotionally and temporally costly. You wrote that code. It took time. Deleting it requires discipline and a certain tolerance for feeling like you went backward. This is the friction that makes Mikado hard to sustain under pressure.

For an AI agent, discarding a branch costs nothing. The agent has no attachment to what it wrote. The tokens were cheap. The wall-clock time was seconds. There is no emotional overhead to reverting. There is no sunk cost fallacy to fight.

One clarification worth making. This applies to the exploration phase specifically. The naive experiment is throwaway. The leaf implementations — the actual commits that build up the goal — are kept and shipped. The inversion is not "agents write throwaway code." It is that the part humans used to pay for emotionally and temporally (exploring, learning, reverting) is now nearly free, while the graph-building the method always relied on becomes the human's primary contribution.

This completely inverts the cost structure of the method. The part that was the bottleneck for humans, doing the implementation work, is now essentially free. The part that was never the bottleneck, building and maintaining the prerequisite graph, is now the critical human contribution. The human's job is not to write the code. It is to run the graph.

## Several other ideas arrive at the same place

I find it striking how many independent threads in software research converge on this structure.

[ReAct](https://arxiv.org/abs/2210.03629), a 2022 paper from Google Research, showed that AI agents perform significantly better when they interleave explicit reasoning traces with actions rather than acting directly. The Think-Act-Observe loop they describe is structurally identical to Mikado's experiment-visualize-undo cycle. The Mikado Graph is what you get when you externalize and persist those reasoning traces across many iterations.

Modern agent orchestration frameworks have independently landed on directed acyclic graphs (DAGs) to represent task dependencies. In Plan-and-Execute frameworks, a planner produces a DAG of sub-tasks, and executors work the leaf nodes first. That is the Mikado graph. The frameworks are reinventing it from the AI side; Mikado invented it from the human side ten years earlier.

Context drift research consistently identifies two root causes: vague scope and long session duration. Mikado addresses both directly. Each agent session is scoped to a single prerequisite node, which is as constrained as a task definition can be. Each session starts from a fresh context: the agent sees the graph, the leaf's definition, and nothing else. There is no accumulated conversation history to drift from. (Runtime state — caches, container images, already-applied database migrations — does not reset when the session does, and Mikado does not address that side of "clean state." More on that in the limits section.)

[Uncle Bob's writing on TDD cycles](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) explicitly recommends reverting rather than debugging when a new test does not pass quickly. "Backtrack and delete tests until reaching a point from which you can take a different path." Mikado formalizes this instinct into a methodology for large-scale change. TDD validates the revert discipline at the micro level; Mikado applies it at the architectural level.

GitHub's [Agentic CI writing from 2025](https://github.blog/ai-and-ml/generative-ai/continuous-ai-in-practice-what-developers-can-automate-today-with-agentic-ci/) describes the emerging pattern where agents produce PRs rather than direct commits. Changes are proposed, tested, and merged only when clean. The Mikado workflow generates exactly these kinds of tasks: small, scoped, green-or-nothing.

## What this looks like in practice

The workflow I have been thinking through goes like this.

Write the Mikado Goal as a concrete spec: a description of the target behavior that can be verified. This is the one input that requires careful human thought. Everything else flows from it.

If you already have a plan or design document, feed it to the skill as the starting hypothesis. The naive experiment then becomes a validation pass: prerequisites your plan anticipated get confirmed or refuted, and new ones the plan missed surface as failures. Starting with a plan does not skip the experiment — it gives you something concrete to test against.

Point an agent at the goal with no scaffolding. Tell it to implement the goal directly. Do not help it avoid the obstacles. You want to find the obstacles.

Collect the failures, not the code. Compile errors, failing tests, runtime exceptions: these are the data you are after. The code the agent wrote is almost certainly going to be reverted.

Build the prerequisite graph from the failures. This is the human judgment step, and it is the most important one. Deciding which failures share a root cause, which prerequisites are truly independent, and which order makes sense requires understanding the system. This is not a step you can delegate to the agent.

Assign a single leaf-node prerequisite to the agent. One task, clean scope. Whether that runs in the current session or a fresh one depends on the leaf's size and surface area — small, self-contained changes often stay inline; anything that crosses subsystem boundaries or introduces a new abstraction delegates to a fresh context.

"Single leaf" is directionally right but not always literal. Mechanical refactors — type widenings, renames, database column migrations — naturally span many files because intermediate states do not compile. Judge leaf size by cognitive load, not by line count or file count. Ten files of the same mechanical edit repeated is one leaf. Two files with subtle coupling and a new abstraction introduced between them is two leaves.

Commit only when the session's sub-task passes all tests cleanly. If it does not pass, revert and refine the prerequisite definition. The graph is a living document; new prerequisites emerge as you work. Some will surface during the naive experiment; others only appear once a leaf is underway. When a leaf is halfway done and you realize it depends on a sibling prerequisite you had considered independent, stop the leaf, add the dependency to the graph, and re-pick. Resist the urge to fold the sibling's work into the current leaf to finish faster. That is how scope leaks — the quiet failure mode of the method — happen. A leaf that solves its surface symptom by reaching into a sibling's scope creates latent gaps that look fine at review time and break in production.

Repeat until the Mikado Goal is met.

The description above frames the agent as the one implementing each leaf. The method also works with the roles inverted. If you have deep domain knowledge in the system — the kind that comes from years of working in the codebase, or from being the person who designed the feature — you may not want to hand implementation to an agent at all. In that case the agent becomes a different kind of collaborator: it runs the naive experiments, builds and maintains the prerequisite graph, derives the testing plan, and verifies each leaf after you commit it. You implement. At each step the agent hands you a single, clearly scoped task with verified acceptance criteria, marks it done when it passes, and picks the next one. The undo cost is still near zero — if your implementation reveals that a leaf needs to be split, the agent records the sub-prerequisites and re-queues. The discipline the method imposes is unchanged. Who writes the code is a configuration choice, not a constraint.

The output of this process is a codebase that was never broken, a commit history that tells a coherent story, and a graph that documents the dependency structure you discovered along the way.

## Making it real: tooling the method

The method described above is a workflow. In practice, it starts to compound only once the workflow is codified as tooling.

In my own setup, Mikado lives as a stack of composable skills ([available on GitHub](https://github.com/vordimous/mikado-skills)): one to kick off a goal and run the naive experiment, one to drive a single leaf to completion — inline or in a fresh context depending on the leaf's scope, one to assemble the pull request from the graph and the commits it produced. A project-specific wrapper sits on top and codifies conventions — known flaky tests, narrow test commands, codegen rules, commit message formats — so every subagent receives them identically without a human remembering to include them in the prompt. The skills compose via a loop orchestrator so the full run is effectively `loop <mikado-leaf>` until the graph is empty.

The distinction matters because fresh-session-per-leaf is incompatible with tribal knowledge. A rule like "never run the full test suite, only the affected test class" that lives in your head will be included in the first leaf's prompt and forgotten by the fifth. The same rule embedded in the skill's operating rules is applied identically every time. The move from "method I follow" to "method my tools enforce" is where the method's consistency claims start actually holding.

The right amount of tooling depends on the project. A small or new codebase may need only the four core skills. A large monorepo benefits from a project wrapper that catalogs its known flakes, its narrow test commands, its codegen pipeline, and its commit conventions. Either way, getting out of the business of remembering these things is what makes the method scale past one or two goals.

## The limits

The human still builds and maintains the graph. This is not a step you can automate away. Reading the agent's failures and understanding what they mean requires familiarity with the codebase and judgment about the domain. The method reduces the implementation burden on the human dramatically; it does not reduce the thinking burden.

The method also requires fast feedback. Mikado was designed for systems with compilers and test suites. The faster the feedback loop, the cheaper each experiment is. If your test suite takes twenty minutes to run, the per-experiment cost goes back up. This is not a new constraint; it is the same one Mikado has always had.

And the graph is a hypothesis, not a plan. Leaf nodes that look independent often reveal new dependencies when you actually implement them. The tree grows as you work it. Treat the graph as something you are discovering, not something you designed upfront. The moment you mistake it for a waterfall plan, you will start ignoring what the failures are trying to tell you.

Green leaves are not a green system. Each leaf's tests verify the leaf. Integration bugs that span multiple leaves — a type widening that changes behavior at callsites which were individually green but combine incorrectly, a data format change that different callers parse with slightly different rules — still slip through. The method produces commits that are small, bisectable, and reviewable, which makes integration-level review tractable. It does not make that review unnecessary. The human who reviews the full diff is still doing work the method cannot replace.

Clean state means the runtime, not just the session. A fresh agent session starts with no conversation history. The runtime environment — caches, container images, hot-reload classloaders, already-applied database migrations — does not reset with it. A Mikado run against a live system can be sabotaged by a stale Redis entry, a partially-rolled deployment, or a data migration that ran against the wrong codebase version. These are not context drift in the LLM sense; they are state drift in the operational sense, and they need to be addressed by the same discipline that keeps any production system consistent. The method assumes you are doing that work separately.

The graph structure tells you how to ship. A Mikado graph with genuinely independent prerequisites can ship as independent pull requests reviewed in parallel by the right subject-matter reviewers. A linear chain of prerequisites ships as a stacked PR set or a single PR. If you default to "one goal, one PR," you may leave the graph's natural shape on the floor and create a larger review surface than the work required. The graph is an asset for the delivery flow, not just the implementation flow.

## Conclusion

The Mikado Method was not designed for AI agents. It was designed for human developers working in brownfield systems that had no tests and no documentation, trying to make large changes without destroying the codebase in the process. The authors built it from years of experience doing exactly that work.

But the method's core insight turns out to be more durable than its original context. Exploration is learning. Reversion is not waste. The graph is the product. These are true regardless of who is doing the implementation.

When a human is doing the implementation, maintaining those principles requires discipline and emotional resilience. The undo cycle costs something real. When an agent is doing the implementation, the undo cycle costs nothing. The entire friction model shifts. The graph, which was always the most valuable thing the method produced, becomes even more valuable because the human's time is now freed entirely to build it.

The developers who will get the most out of AI coding agents are not the ones who can write the best prompts. They are the ones who can think clearly about prerequisites: what needs to be true before the thing you want is possible, and in what order those things should happen. That has always been what the Mikado Method was teaching.
