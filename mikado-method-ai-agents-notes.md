# Internal notes — "The Mikado Method in the Age of AI Agents"

Working context from the real-world validation run that informed the blog post edits. Keep for reference when prepping the talk. The talk demo will use a different codebase, so none of the specific details below should appear in the public version — the blog post prose has been kept deliberately generic.

## Appendix A: The validation run at a glance

The post's edits were informed by running the method end-to-end on a substantial refactor in a polyglot monorepo (Java + Groovy + Spring Boot backend, Vue 3 frontend, ~dozen microservices). The goal was to replace a closed enum-based content type field on REST endpoints with a free-form string so users could configure arbitrary MIME types, with pass-through behavior for anything the system doesn't natively parse.

**Numbers from the run:**

- Initial plan doc: 1 page, listed ~5 affected files, declared adjacent SOAP subsystem out of scope.
- Naive experiment: delete the enum + retype 5 domain classes, ~30 lines of source changes, compile-only verification.
- Compile output: 15 errors across 3 clusters, surfaced in ~12 seconds.
- Prerequisite graph: 3 observed (from the experiment) + 6 anticipated (from the plan, refined later) = 9 total.
- Leaves executed: 6 delegated to fresh agent sessions via loop orchestrator, 3 executed in main session (trivial deletions, bookkeeping, codegen companions).
- Final commit count on the feature branch: 15 feature commits + 4 mikado-bookkeeping commits = 19. Squash-merged into `develop` as a single commit.
- Review iteration: 1. The review found 2 real bugs (one a normalization asymmetry invisible to per-leaf tests; one a FE display shim that leaked into migration scope).
- Post-merge deploy surprises: 1 version-skew failure (old adapter pods reading migrated Mongo data, `Enum.valueOf` error).

**Scope drift from the original plan:**

- SOAP subsystem pulled in after the naive experiment revealed the shared enum. This was the strongest single moment validating "experiment reveals truth the plan missed."
- Two open questions (data migration strategy, interaction with an existing "ignore content type" flag) surfaced during leaf implementation, not from the naive experiment. Graph grew during execution.
- Two unrelated bugs uncovered while testing: a latent cache-deserializer issue from a previous migration, and a missing security auto-config exclusion in one service. Both extracted to separate branches, shipped independently.

**Eventual PR shape:**

- Main feature: 1 MR, 15 feature commits squash-merged.
- Cache-deserializer fix: separate MR against develop.
- Mikado tooling artifacts (skill files, example goal file): separate MR against develop.
- Split was done post-hoc by branch extraction; would have been cleaner if done during planning as clustered MRs from the start. This is the source of the "graph structure tells you how to ship" point added to the Limits section.

## Appendix B: Section-by-section validation notes

For each major section of the published post, what the run confirmed, challenged, or exposed as underspecified.

**"What the Mikado Method actually is."** Confirmed. The four primitives mapped cleanly onto the skill stack: goal recording, naive experiment in a worktree, graph assembly, leaf loop with revert-on-fail.

**"Why it works, and where the friction lives."** Mostly confirmed for the human-mode framing. The specific friction we observed for agents was different: subagent timeouts (one leaf's agent returned without committing mid-test), context-window overhead for the loop orchestrator, and project-convention drift (forgetting to pass known-flake info between sessions).

**"The AI coding agent problem."** Confirmed strongly. The reviewer found a normalization asymmetry that was invisible at the per-leaf level — one call site compared raw strings where a sibling call site normalized, both sides individually tested and green. This is the exact pattern named in the edited paragraph.

**"Where Mikado and AI overlap."** The undo-cost inversion played out as described. The subtle addition was that it applies to exploration, not to leaf commits — which is what the new clarification paragraph addresses.

**"Several other ideas arrive at the same place."** Untested here — these are external references. Consider adding a context-drift citation if you find one you'd vouch for; did not add one during editing.

**"What this looks like in practice."** Mostly confirmed. Two things forced edits:

- "Single leaf" was routinely violated by mechanical refactors (one leaf touched 17 files because the type widening broke intermediate compiles). Led to the cognitive-load leaf-sizing paragraph.
- Scope leak happened once: a FE leaf quietly folded in what should have been a data-migration leaf's territory via a display shim. Reviewer caught it. Led to the scope-leak warning paragraph.

**"The limits."** Expanded from 3 paragraphs to 6. The new ones come directly from run observations: green leaves ≠ green system (reviewer found a cross-leaf integration bug), clean state = runtime (stale Redis entries, DevTools reloads, image-tag lag all caused debugging time), graph-shape-tells-you-how-to-ship (the goal naturally decomposed into 4 clusters but we merged as 1 MR).

**Not in the post but worth noting for the talk.** The skill stack itself matured during the run. Rules like "narrow test execution" and "fold codegen byproducts into causing commit" were discovered by pain and then codified into the skill operating rules. The method's tooling compounds; it is not static.

## Appendix C: Skill improvements codified during the run

All of these became concrete edits to the skill files (published at https://github.com/vordimous/mikado-skills and project wrappers). List them here as reference for what "tooling the method" actually means in practice.

**Global `mikado` skill:**

- Narrow-verification rule: default to compile-only for pure refactors; single-class `--tests` filter for logic changes; module-level suites are a yellow flag requiring justification; full suites are commit-boundary only.
- Codegen byproduct rule: regenerated OpenAPI specs, API clients, lockfiles ship in the commit of the leaf that caused them to regenerate, not separate chore commits.
- Subagent timeout recovery: if a subagent returns without committing, verify its work in main session before redelegating; commit if acceptance met, revert and redelegate otherwise.
- Leaf sizing by cognitive load, not file count or LOC. Pure mechanical edits across many files count as one leaf; small edits introducing new abstractions count as more.
- Scope-leak warning in common failure modes.
- Agent-safe git principles (adapted from GitButler's framework): task isolation, clear branch boundaries, explicit commit selection, easy pre-push review, cheap rollback, cross-branch damage prevention.

**`mikado-loop` skill:**

- Main-session-vs-subagent decision criterion refined away from "always delegate." Trivial deletions, bookkeeping, codegen companions run inline; subsystem-crossing or >100 LOC non-mechanical changes delegate.
- Commit strategy default inferred from invocation mode (`/loop /mikado-loop` implies folded; explicit single-step implies separate).
- Open-question handling: proceed with graph-recorded defaults; stop only for genuine unresolved decisions.
- Exit summary block: commits this iteration, files touched, mode, open questions resolved, scope-leak flags.
- Subagent timeout recovery path explicitly documented.

**`mikado-mr` skill:**

- Push state check: verify `git rev-list --count @{u}..HEAD` is zero, not just that `@{u}` resolves.
- Draft + review cycle documented as the standard pattern for nontrivial goals.
- Never-amend rule for housekeeping commits.
- Multi-MR shape chooser: single (default), clustered (by subsystem), or stacked (by dependency chain). Cluster detection heuristic: group by Conventional Commits scope.
- Squash-merge vs stacked-MR incompatibility called out explicitly.

**Project wrapper skill:**

- Known flakes list (specific to our project: a particular test needing an env var, a handful of pre-existing TypeScript errors to ignore).
- Narrow-first test command ordering.
- Codegen byproduct callout for the specific files in our pipeline.
- Subagent prompt must include the known-flakes list so fresh sessions don't rediscover them.
- Squash-merge policy note: prefer clustered over stacked MRs for multi-subsystem goals.

**Cross-cutting / settings:**

- Permission audit of git operations: moved `git revert`, `git checkout -b`, `git switch -c`, `git branch -d/-m`, `git stash push/pop/apply`, `git cherry-pick`, `git restore --staged` from deny to allow. Kept denied: `git push`, `git pull`, `git merge`, `git rebase`, `git reset`, force variants, `git clean`, `git stash drop/clear`, `git checkout -- <file>`.
- Memory system for user-specific preferences (narrow testing, git workflow norms) loaded into every session.

These are the tangible artifact of "method my tools enforce" from the post's Tooling section.

## Appendix D: Talk presentation suggestions

Things to do in the live talk that do not belong in the prose.

**Key visuals:**

1. **The final Mikado graph** — the Mermaid diagram from the goal file with all nodes checked off. One slide, audience sees exactly what an artifact looks like.
2. **The commit sequence** — `git log --oneline` of the feature branch, showing 15 conventional-commit messages, each bisectable. Concrete evidence of "small, green, shippable" commits.
3. **Before / after of a naive experiment** — show the 15 compile errors, then the graph they collapsed into (3 root causes → 3 prerequisites). The "failures become graph" moment is the post's strongest claim; show it happening.
4. **The reviewer catching a bug** — one slide where the reviewer agent flags an integration bug that was invisible to individual leaf tests. Vivid evidence of both the strength and the limit of the method.

**Narrative beats:**

1. Open with the pick-up-sticks metaphor, but immediately ground it in a concrete broken-build-at-merge story the audience has lived through.
2. Show the human-mode Mikado method working, then show where the revert cost makes it hard to sustain. Set up the "undo is expensive for humans" claim with lived experience.
3. Introduce AI agents not as a tool but as a cost-structure shift. This is the thesis — do not bury it.
4. Show the failure mode — individually-green diffs, broken integration — with a concrete example. This is the problem the method solves.
5. Walk the run at high level: goal → experiment → graph → leaves → MR. Use the visuals above.
6. Show the review catching what the leaves missed. This is honesty and it builds credibility.
7. Close with the cost-structure framing and the "think about prerequisites" payoff.

**Counterpoints to address preemptively:**

- "This sounds like extra ceremony for solo developers." Acknowledge, then point to the tooling section: the ceremony is automated once you codify it as skills.
- "My test suite takes 20 minutes; this won't work." Acknowledge, cite the post's limit, and redirect: if the test suite is the bottleneck, fix the test suite, that's a separate problem.
- "Can't I just prompt better?" Frame as "better prompts help; better method helps more and compounds." Point to context drift and scope leak as structural problems no prompt can fix.

**Tangent worth having ready:**

- Permission model for AI agents. The run surfaced that default AI git permissions are too restrictive for the method to work well (the skill needed to commit to keep leaves bisectable). Audiences interested in agent governance will want this detail.
- Version skew at deploy time. The run hit a real failure where migrated data met old code. Not a Mikado problem per se; a useful reality-check.

**What NOT to put in the talk:**

- The specific codebase and Jira ticket. Demo should be on a purpose-built example.
- The full list of skill-file edits. Too much. Mention the pattern, not the inventory.
- Detailed failure debugging (stale containers, DevTools classloader). Too in-the-weeds.

## Appendix E: Concrete failure modes encountered (reference material)

Useful bank of specific failure modes to draw on when answering questions or constructing demos. All observed during the run.

**Integration bug invisible to per-leaf tests.** A predicate function (`isSupported(mime)`) was case-insensitive and parameter-stripping; four downstream call sites compared raw values against canonical constants. Each call site's unit tests were green. Any user typing `application/json; charset=UTF-8` would silently fall through to the wrong branch. Found only in full-diff review.

**Scope leak between leaves.** A frontend leaf (dropdown UX) included a legacy-value normalization shim that reached into the territory of a data-migration leaf. Shim made the display correct but hid the fact that stored data was still in legacy format. Reviewer caught.

**Subagent timeout.** One leaf's subagent session hit a polling/timeout issue mid-test and returned without committing. The main-session loop orchestrator had no documented recovery path at the time; I had to verify and commit staged work manually. This led to the timeout-recovery rule in the skill.

**Stale bytecode masquerading as working service.** Service running against a recent DB migration but on a previous image tag. Spring Data Mongo attempted `Enum.valueOf` on a string that was migrated past the enum it was trying to build. Took 10 minutes to realize the service was on an old image.

**DevTools warm-reload inconsistency.** After a large merge, the Spring Boot DevTools restart classloader served a mix of old and new class definitions. Full JVM restart fixed it. Would not have been debuggable from Mikado-level artifacts alone.

**Permission friction.** Default agent permissions denied `git commit` and `git add`. The method cannot enforce per-leaf commits without those. Resolution required a permission audit and a settings update, which became a reusable pattern.

**Graph drift from code drift.** User merged another branch's changes into the feature branch mid-run. Some mikado commits became partially or fully redundant. The reconciliation step in the loop skill caught this; worth codifying as "when base commit's ancestry changes, pause and reconcile."

**Machine-generated commit noise.** OpenAPI spec regenerated on every backend build. First few leaves produced "chore: regenerate spec" companion commits that cluttered history. Rule added: fold into the causing commit. Reduced commit count by ~30%.

**Deploy-time version skew.** Mongock migration ran successfully (rewrote enum-name strings to MIME strings); application pods on old images then failed to deserialize migrated data. Exactly the "new data + old code" risk flagged in the Limits section.

**MR shape mismatch.** Goal naturally decomposed into 4 subsystem clusters (backend refactor, data migration, frontend, pass-through behavior). Was merged as 1 MR. Review would have been parallelizable and faster with clustered MRs. Led to the "graph shape tells you how to ship" limits paragraph and the mikado-mr skill's multi-MR chooser.

## Appendix F: Coach-mode pilot run (pre-v1 skill snapshot)

A second validation run tested the "coach" mode path: the human writes and commits the code; the agent runs the naive experiments, builds and maintains the prerequisite graph, derives the testing plan, and verifies each leaf. This is the role inversion described in the "What this looks like in practice" section of the post.

**Important caveat:** the skills were updated after this run. Several features now in the published v1 skill — the cadence/MR/implementation configuration front-matter, the formal testing plan derivation and signoff, the three-way reconciliation protocol (confirmed/new/stale), and the MIKADO_LOOP exit signals — were not yet in the version used here. Observations below reflect that snapshot, not current behavior.

**Run profile:**

- Codebase: fresh-feature goal on a polyglot project (compiled backend, JS frontend), greenfield rather than legacy.
- Mode: coach (human implements each leaf; agent manages graph, experiments, and verification).
- Goal ingested from an existing spec file rather than stated as direct prose. The spec seeded anticipated prerequisites; the naive experiment confirmed and refined them.

**Numbers:**

- Anticipated top-level prerequisites from spec: 3 (confirmed by naive experiment).
- Total prerequisites after sub-decomposition: ~28 across 3 goal clusters.
- Leaves executed by the human: all of them (coach mode).
- Mid-loop graph expansion: 1 node split into 4 ordered sub-leaves after a worktree experiment showed intermediate states broke tests. The split was committed as a graph-only checkpoint before any leaf implementation.
- Nodes deferred mid-run: 1 (deferred cleanly with the extension seam left in place and an expansion comment documenting the steps a future implementer would follow).
- Post-run human edits outside the leaf loop: logic that was implemented correctly and passed its tests was later removed because the human decided the added complexity wasn't warranted for the goal's final scope. The method surfaced the decision cleanly — the work was committed and attributable — rather than silently leaving dead code.

**What coach mode validated:**

- The graph scaffold works independently of who writes the code. The human received one clearly scoped task at a time with verified acceptance criteria, and never had to track which prerequisites were still open.
- Mid-loop expansion is clean in coach mode too. When a leaf's implementation revealed sub-prerequisites, the agent recorded them and re-queued without requiring the human to restart or re-plan.
- The "undo cost is near zero" claim holds for the human-as-implementer path: reverting a leaf and trying a different approach is low-friction because the scope was bounded before work started.
- The post-run editorial removal (human removing correctly-implemented logic) shows the graph does not lock in scope. Work that the method correctly produced can still be deliberately trimmed by the human after the fact. This is not a failure of the method; it is the human exercising judgment at the appropriate boundary.

**What coach mode exposed:**

- Verification scope matters more in coach mode. When the agent is the implementer, misscoped tests hurt the agent. When the human is the implementer, miscoped tests create a trust gap: the human made a real decision the tests didn't capture, and the agent's "leaf verified" signal can be misleading. The testing plan derivation and signoff (now in Phase 0.4 of the published skill) addresses this directly; it was absent in this run.
- The skills did not yet prompt for implementation mode at goal start. Coach mode required deliberate setup rather than being a first-class configuration path. This has since been corrected.

**For the talk:**

This run is a better fit for audiences who want to use the method but aren't ready to fully delegate implementation. The frame: "the method gives you structure and the agent gives you verification — you keep authorship." The mid-loop expansion is still a good visual; the deferred node with expansion comment is a clean "scope decision made explicit" moment. Avoid showing any codebase-specific detail; keep the example at graph-and-commit level.
