# Zipline — Senior Full Stack SWE, Health Care
## Interview Prep & Study Guide

**Role:** Senior Full Stack Software Engineer – Health Care (Nest Applications Software team)
**Stack:** Go, Python, React, Kafka, Postgres, Kubernetes, AWS
**Domain:** Medical fulfillment, inventory, order processing, flight coordination in Africa (Rwanda / Ghana operations)

---

## Recommended Study Order

Work top to bottom. Tier 1 covers the actual interviews; don't skip to Tier 2 until those are solid.

### Tier 1 — Do these first (direct round prep)

| Section | Why |
|---|---|
| [§1 — Your positioning](#1-your-positioning--read-this-first) | Your anchors for every answer. 5-minute read. |
| [§3 — Round 2 specifics](#3-round-2--the-two-interviews-ahead) | This IS the interview. Maps directly to the Architecture + Propeller Swap rounds. Highest ROI per minute. |
| [§3.4 — Business-impact stories](#34-the-business-impact-stories-you-should-pre-write) | The recruiter told you explicitly. Write all four out loud before the interview. |
| [§16 — Final checklist](#16-final-checklist) | Confirm nothing fell through. |

### Tier 2 — High value, do after Tier 1

| Section | Why |
|---|---|
| [§11 — Behavioral prep](#11-behavioral-prep--your-stories-mapped) | Needed regardless of round format. |
| [§13 — Red flags](#13-red-flags-to-avoid) | Fast read, defensive — avoids the most common senior-candidate traps. |
| [§12 — Questions to ask](#12-questions-to-ask-them-pick-34) | Signals seniority; pick 3 and internalize them. |
| [§5 — Kafka](#5-kafka--the-logistics-specific-cut) | Deep stack match; will come up in any design conversation. |
| [§7 — System design scenarios](#7-logistics-domain-system-design--the-likely-interview-scenarios) | Practice problems for the Architecture round. |

### Tier 3 — Reference if time allows

| Section | Why |
|---|---|
| [§8 — Postgres](#8-postgres--the-performance-tuning-bits-theyll-probe) | JD explicitly calls it out; skim the cheat-sheets. |
| [§6 — Logistics & WMS](#6-logistics--wms--modern-vocabulary-and-architecture-deep-dive) | Domain credibility and vocabulary refresh. |
| [§4 — Go](#4-go--sharpening-the-parts-that-matter) | You know Go — run the §4.5 quiz, skip the rest unless rusty. |
| [§9 — React](#9-react--frontend--quick-bridge) | Gap area, but unlikely to be the focus in Round 2. |
| [§10 — Kubernetes + AWS](#10-kubernetes--aws--the-ops-layer) | You have this; light skim only. |
| [§2 — The job, decoded](#2-the-job-decoded) | Reference if you want to re-read the JD subtext. |
| [§14 — Sprint plan](#14-sprint-plan-for-round-2-architecture--propeller-swap) | Use to structure your prep days. |
| [§15 — YouTube companion](#15-youtube-video-companion--hand-picked-refreshers) | Only if you have a full day — use the suggested watch order in §15.8. |

---

## 1. Your positioning — read this first

You are unusually well-matched. Lead with these four anchors in every behavioral answer:

1. **AFS Logistics (2018–2020)** — TMS with Spring Boot, **Golang, Kafka, Redis, Postgres, Kubernetes**. You *built* a Delayed Message Delivery service on Kafka + Redis. This is nearly identical to the Zipline stack, in the exact domain (logistics/TMS).
2. **Gohlay** — your OSS Go CLI for Kafka scheduled messages. Gives you deep, demonstrable Kafka-in-Go credibility.
3. **Aklivity / Zilla** — you were Head of DevEx at a company whose product *is* Kafka protocol proxying. You understand event-driven architecture at a protocol level.
4. **Current tech lead role** — 10 reports across dev/QA/product, writing logistics middleware. Directly addresses the "mentoring and growing junior engineers" and "driving architectural decisions in fast-changing environments" requirements.

**Gaps to acknowledge honestly if asked:**
- Your recent years skew DevRel/DevEx rather than IC backend at scale. Frame this as product and community fluency on top of your engineering foundation — and your current tech-lead role as proof you've returned to hands-on engineering leadership.
- Not a lot of visible React in recent roles (you have Vue). React is trivially adjacent — have a story ready about picking up frameworks quickly (vue-pdf maintenance, Thinkful mentoring in React).

**Your thesis statement (steal this):**
> "I've spent my career at the seam where distributed systems meet the humans using them — building Kafka-backed TMS microservices at AFS, a scheduled-message CLI that's still in use, and then moving into DevRel to improve how engineers adopt event-driven tools. Zipline's Nest team is that exact seam in the most meaningful domain I can imagine."

---

## 2. The job, decoded

From the posted JD:

**What they do:** Fulfillment, maintenance, and flight systems for Africa operations. Medical inventory, order processing, flight coordination for automated delivery.

**What they build:** Internal platforms for supply chain + financial workflows, and customer-facing apps for placing/tracking orders.

**Explicit requirements:**
- 8+ years production distributed systems
- Full-stack with Python, Go, or similar OO language
- React (or similar JS framework)
- Kafka or similar event-driven systems
- Postgres modeling + performance tuning
- Automated testing strategies
- Mentoring junior engineers
- Architectural decision-making in fast-changing environments

**Nice-to-haves:**
- Fulfillment / logistics / warehouse systems ← **you have this at AFS**
- Willingness to spend time in Kigali, Rwanda
- Kubernetes + AWS in prod ← **you have this**

**The subtext:**
- "Simple, flexible, resilient" appears twice. They are tired of accidental complexity. Every design answer should preface with: *what's the simplest thing that works?*
- "Fast-changing environments" = expect lots of ambiguity; they want judgment, not just throughput.
- Africa operations mean unreliable connectivity — think offline-first, eventual consistency, idempotency, and graceful degradation. Their Full Stack Apps posting explicitly mentions "regardless of their internet connectivity."

---

## 3. Round 2 — the two interviews ahead

You have specific intel now. Two technical interviews:
1. **Architecture interview** — system design, scoping a dashboard, FE vs. backend, no code.
2. **Propeller Swap** — evolving an existing system under time pressure; data modeling and API design.

Plus a clear coaching signal from the recruiter: **every answer needs an explicit trade-off and a business-impact attached.** That's the bar.

This section covers both rounds end-to-end. Read it before anything else.

### 3.1 The "tradeoffs + business impact" lens — apply to everything

This is the meta-instruction. Senior candidates lose this round not by lacking technical skill but by narrating *what they built* instead of *why they chose it over the alternative and what it changed for the business*. Every architecture or design answer should have this shape:

> "We had to choose between **X** and **Y**. We picked **X** because **[constraint Z]** mattered more than **[constraint W]**. The trade-off was that we accepted **[explicit downside of X]** in exchange for **[explicit upside]**. The result was **[measurable business outcome]** — for example, **[number, %, time, dollar, customer count]**."

Three rules for using it well:

1. **Name the alternative explicitly.** "We chose Kafka" is weak. "We considered RabbitMQ and Postgres LISTEN/NOTIFY before choosing Kafka because partition-level ordering across millions of events mattered more than operational simplicity" is strong.
2. **Name the downside you accepted.** Pretending your decision was strictly better than the alternative is the surest tell that you didn't really make a decision. Real engineering is choosing a poison.
3. **Quantify the outcome.** Even rough numbers beat vague claims. "Reduced p95 latency from ~2s to ~200ms, which let the dispatch team release 3× more shipments per hour" lands. "Improved performance" does not.

**Have three pre-baked trade-off stories ready** — different scales, different domains:

| Scale | Possible story (you fill in specifics) |
|---|---|
| Single-service architecture | AFS Delayed Message Delivery — chose Kafka+Redis over a dedicated scheduler DB. Trade-off: more moving parts vs. unified infrastructure. Outcome: cost / latency / ops surface numbers. |
| Cross-team or platform | ElasticSearch read-side on top of Groovy/Grails monolith — chose CQRS-style projection over query optimization in the monolith. Trade-off: eventual consistency on search vs. blocking the monolith's release cycle. Outcome: search p95 numbers + decoupled deploys. |
| Org / leadership | Current tech lead role — pick a decision you made about scope, sequencing, or staffing. Trade-off: what you said no to. Outcome: what shipped that wouldn't have otherwise. |

Write these three out tonight. Two-minute STAR. Memorize the trade-off line and the outcome line word-for-word. Improvise the middle.

---

### 3.2 The Architecture interview — scoping a dashboard

"No code, just scoping" and "who are you solving for" are the loudest signals in your notes. This is not the classical "design Instagram" system-design round. This is a **product-engineering** architecture round. They want to see you start from the user, define the problem before the solution, and pull architecture out of requirements rather than the other way around.

The dashboard prompt is a thin-slice test. Dashboards look trivial; designing one well is a senior-level skill because almost every architectural decision falls out of *who's reading it and why*.

#### The framework — five phases, in order

Walk through these out loud. The interviewer will probably interrupt and steer; that's fine and expected. What matters is that *you start with users*, not with boxes.

**Phase 1: Who are you solving for? (3–5 min)**

Before anything else, ask. The prompt will be vague on purpose. Pull out:

- **Persona** — Who's the primary user? A warehouse operator in Kigali on a tablet? A logistics manager in SF on a laptop? A regulator pulling an audit report once a quarter? An on-call engineer at 3am? Each gives a different system.
- **Job-to-be-done** — What action does this dashboard enable? Decide / monitor / investigate / report / approve? "Monitor" dashboards optimize for at-a-glance state. "Investigate" dashboards optimize for slice-and-dice. They're different products.
- **Decision cadence** — How often do they look at it? What changes if it's wrong? A live ops dashboard refreshed every 5 seconds is a different beast from a weekly KPI review.
- **Failure mode** — What happens if the dashboard is down? If it's degraded but still loads? If it's lying? The stakes shape the SLOs.
- **Adjacent users** — Anyone else? Compliance officer needs an audit trail. Customer success needs a copy of one view. Each adds a constraint.

**The line to use, almost verbatim:**
> "Before I start drawing, I want to make sure I'm solving the right problem. Who's the primary user, what decision are they making with this, and what happens if the dashboard is wrong or stale?"

That sentence alone will move you up a level in their eyes.

**Phase 2: Define success, then scope (3–5 min)**

Once you have users, define what "done" looks like before scoping the work. Two artifacts:

- **A success metric.** What measurable thing changes for the user? "Time to detect a stalled order drops from 15 min to under 30 sec." Not "users like it."
- **A "v1 doesn't include" list.** Senior engineers cut scope before adding to it. State the cuts out loud: "For v1 I'm assuming we don't need mobile, role-based dashboards, or historical drill-down beyond 7 days." This isn't being lazy; it's negotiating with the interviewer about what they actually want.

**Phase 3: Data model and freshness — the central decision (5–8 min)**

Most dashboard architecture decisions collapse to **how fresh does the data need to be, and what's the source of truth?** Walk through:

- **Source systems.** Where does the data live now? Inventory in Postgres, flight events in Kafka, sensor data in MQTT or a time-series DB? List them.
- **Freshness requirement.** Live (seconds), near-real-time (~1 min), batch (hourly/daily)? Live forces streaming; batch lets you precompute. Don't say "real-time" without defining the number — a 5-second p95 lag is wildly different from 500ms.
- **Read pattern.** Few large queries (executive summary) vs. many small queries (operator filters)? This drives caching vs. streaming.
- **Data shape.** Time series, snapshot state, event stream, aggregated metric? Each maps to a different storage.

**The trade-off to surface explicitly:**

> "There are three patterns I'd consider. **(1)** Query the source systems directly — simplest, but pushes load onto operational stores and gets slow as data grows. **(2)** A read-optimized projection updated by events — CQRS-style — gives sub-second freshness and decouples from source-system load, at the cost of an extra system to operate and eventual-consistency edge cases. **(3)** A batch warehouse — cheapest to operate, fine for daily/weekly views, but unusable for live ops. Given that the primary user is an operator making decisions in real-time, I'd go with (2) for live tiles and use (3) for the historical drill-downs underneath."

This single answer demonstrates: user-first thinking, naming alternatives, explicit trade-off, and a recommendation grounded in the persona.

**Phase 4: Frontend vs. backend boundary (5–8 min)**

This is the part the recruiter explicitly named. They want to see you draw the seam thoughtfully. Key axes:

| Decision | Push to frontend | Push to backend |
|---|---|---|
| **Aggregation / grouping** | Small datasets, user-driven slicing | Large datasets, fixed views, pre-aggregated for cost and speed |
| **Filtering** | Last-mile UX filters on already-loaded data | Filters that change the query shape or hit a different index |
| **Sorting** | Re-sorting within a loaded page | Sorts that span the full dataset |
| **Auth / authorization** | Hiding UI elements only | Enforcing what data is returned (always) |
| **Business logic** | Display formatting, locale | Anything that touches money, inventory, or regulatory state |
| **Polling vs. push** | Polling for "good enough" freshness | WebSockets / SSE for sub-second updates or many subscribers |
| **State** | Ephemeral UI state, draft inputs | Anything that persists or is shared between users |

**Rules to articulate out loud:**

- **The backend is always the security boundary.** Frontend filtering is a UX nicety, never a permission check.
- **Push expensive computation to where the data lives.** Don't ship 10MB to a tablet to compute a sum.
- **Push display variants to the frontend.** Don't bake five layout variants into your API.
- **Make the API the contract, not an implementation accident.** Design the API as if a third party will consume it tomorrow — because at Zipline, somebody probably will (ops tools, partner integrations, internal automation).

#### The dashboard architecture sketch (have this ready)

If they hand you a whiteboard, this is a defensible starting structure for an "operator dashboard for medical fulfillment" (the most likely Zipline-flavored prompt). Don't lead with it — derive it from the user discussion in Phase 1.

```
[ Operator browser/tablet ]
        |  HTTPS, JWT
        v
[ BFF (Backend-for-Frontend) ]   ← shapes responses for THIS UI
        |
        |--- GraphQL or REST --- [ Read API ]
        |                              |
        |                              v
        |                       [ Read store: Postgres
        |                         materialized views,
        |                         + Redis for hot tiles ]
        |                              ^
        |                              | (projector)
        |                              |
        |--- WebSocket/SSE --- [ Live Event Fan-out ]
                                       ^
                                       |
                            [ Kafka topics: order.*, flight.*,
                              inventory.*, lot.* ]
                                       ^
                                       | (outbox)
                                       |
                            [ Order svc | Inventory svc |
                              Flight svc | etc. — sources of truth ]
```

**Key things to point at when you draw this:**

- The **BFF pattern** — give a name to the layer that shapes responses for the specific UI. Senior signal.
- The **outbox** from each owning service into Kafka — this is how you decouple the dashboard from operational systems.
- The **projector** that builds the read model — eventually consistent, can be rebuilt by replaying topics.
- The **Redis cache for "hot tiles"** — top-of-screen KPIs that hundreds of users hit per minute.
- The **WebSocket / SSE channel for live updates** — only for the parts that need it; everything else is request/response.

#### Trade-offs to surface unprompted

Even if they don't ask, name these out loud — it's the difference between "drew boxes" and "thought about the system":

- **Cache invalidation.** "I'm putting a 5-second TTL on the Redis tiles. The trade-off is up to 5 seconds of staleness for tiles that read every page load — but the user perception of liveness comes from the WebSocket push for the most-critical state, not the cached tiles."
- **Read-after-write.** "Because the projector is eventually consistent, an operator who triggers an action and immediately checks the dashboard might not see their own write reflected. I'd solve this by returning the new state in the action's response and letting the UI update optimistically rather than waiting for the projection."
- **Multi-tenancy / data residency.** "Zipline operates in multiple countries with different data residency rules. The read store and Kafka topics need to be partitioned by tenant or region from day one — retrofitting that is brutal."
- **Failure modes.** "If the projector falls behind, the dashboard shows stale data without knowing it. I'd build a lag indicator into the UI and an SLO alert when projection lag exceeds 30 seconds."

#### What they're scoring you on (read the rubric backwards)

Senior architecture interviewers usually score on five axes — even if they don't tell you. Cover each at least once:

1. **Problem framing** — did you ask who, why, and what success means?
2. **Scoping** — did you negotiate v1 down to something deliverable?
3. **Design judgment** — did you name alternatives and pick with reasons?
4. **Communication** — could a junior follow your reasoning?
5. **Operational awareness** — did you talk about failure, freshness, observability?

If 30 minutes in you've only drawn boxes, you're missing axes 1, 2, and 5. Slow down and come back.

---

### 3.3 The Propeller Swap — evolving live systems under pressure

The name is the metaphor. Swap a propeller mid-flight without crashing. Take a system that's already running, with users, with data, with assumptions baked in — and change it without downtime, without breaking consumers, and fast.

This round tests three things at once: data modeling, API design, and your judgment under pace. Expect a prompt like "we have an order service with this schema; the business now wants X — walk me through how you'd evolve it." They're watching how you think when the clock is on.

#### The mental model

Three constraints define every propeller-swap problem:

1. **The plane is flying** — there are live users, live data, live integrations. You cannot stop the world.
2. **The new propeller has to fit** — backwards compatibility for existing callers, at least during transition.
3. **The pit crew is small and the runway is short** — the team can't spend a quarter on a migration. Pick something shippable in days or weeks, not months.

Everything you say in this round should respect these three.

#### The strangler-fig playbook — your default answer

For almost any "evolve this system" prompt, the safe and senior answer is a **phased migration** with these stages. Memorize the shape:

1. **Add, don't replace.** Introduce the new field, new endpoint, new table — alongside the old one. Old callers keep working.
2. **Dual-write.** When the system updates state, write to both the old and new representations in the same transaction. Cheap insurance.
3. **Backfill.** Populate the new representation for existing data. Usually a one-time job; for big tables, an idempotent batch run.
4. **Dual-read with verification.** Reads consult both, compare, log diffs. This is where you catch the bugs your model didn't anticipate.
5. **Cut over reads.** Once diffs are zero for long enough, switch reads to the new path. Old path still being written.
6. **Stop writing the old.** Once nothing reads it, stop writing it.
7. **Delete.** Eventually. Don't skip this step or you'll carry dead schema forever.

You don't have to execute every step in every problem — but having this ladder in your head means you always have a defensible plan when they say "OK, how would you migrate it?"

#### Data modeling under pressure — the moves that work

You'll likely be asked to extend or refactor a schema. The fast, senior moves:

- **Add a new column nullable, never NOT NULL on a hot table.** NOT NULL with a default rewrites every row on most engines and can lock the table.
- **Backfill in batches with explicit transactions** — `UPDATE ... WHERE id BETWEEN x AND y` in idempotent chunks. State the chunk size and that you'd run it off-peak.
- **`CREATE INDEX CONCURRENTLY`** for any new index on a production-sized table.
- **Use a feature flag at the application layer** to gate the new code path. Decouple deploy from release.
- **Add a version column** when the row's interpretation might change — `schema_version int not null default 1`. Cheap; future-self thanks you.
- **Treat lookup tables (status, type) as enums in code, strings in the database.** Resist the urge to make them foreign keys to a lookup table unless they really vary; you'll regret the join.
- **Soft delete via a `deleted_at` timestamp**, not a boolean. Boolean tells you whether; timestamp tells you when. Same storage cost.
- **Append-only audit table from day one** for anything regulated. At Zipline this matters — every state change on an order, lot, or flight should be auditable.

#### API design under pressure — the moves that work

Most propeller-swap prompts will hand you an existing API and ask you to evolve it. The senior plays:

- **Versioning by URL prefix or media type** — `/v2/orders` or `Accept: application/vnd.zipline.order.v2+json`. Have an opinion. URL versioning is uglier but more discoverable; media types are cleaner but harder to debug. Pick one and explain why.
- **Additive changes don't need a version.** Adding a field is safe if clients tolerate unknown fields (most do). Removing or renaming does.
- **Deprecate, don't delete.** Add `Sunset` and `Deprecation` headers per RFC 8594 / draft-ietf-httpapi-deprecation-header. Clients get warning.
- **Use a request ID / idempotency key on every mutating endpoint.** This is non-negotiable for a logistics system where the same order shouldn't ship twice.
- **Return enough in the response that the client doesn't need a follow-up read.** Especially important when the read model is eventually consistent.
- **Distinguish 4xx from 5xx with care.** 409 Conflict for "you tried to transition this order from Shipped to Picking — invalid." 422 for "your payload didn't validate." Don't lump everything into 400.
- **Be explicit about partial success in batch endpoints** — return per-item results, not a single status. A batch of 100 shipments where 3 fail is the most common production pattern.

#### A model walkthrough (use this shape)

Imagine the prompt: *"We have an Order service that stores orders with a single fulfillment center. Now we need orders that can be split across multiple centers. Walk me through how you'd evolve it without breaking the existing API."*

Your answer, roughly two minutes:

> "First — who's affected? Existing callers of the Order API expect one center per order. Operators reading dashboards expect to see a single location. Downstream services (probably inventory and flight) consume order-created events and assume one center. I want to keep all three working through the transition.
>
> The model change is from one-to-one to one-to-many between Order and FulfillmentAssignment. I'd add a new `order_fulfillment` table with `order_id`, `center_id`, `quantity`, `status` — keyed appropriately. The Order table keeps its existing `fulfillment_center_id` column for now, but it becomes the *primary* center, which for v1 is just the first or only one.
>
> For the API — adding a `fulfillments[]` array to the order response is additive and safe; existing clients ignore it. For writes, I'd accept both shapes — the legacy single-center payload, which I treat as `fulfillments: [{center: x, quantity: total}]`, and the new multi-fulfillment payload.
>
> Event-side, I'd emit a new `order.fulfillment.assigned` event per assignment, in addition to the existing `order.created`. Downstream services can subscribe to the new event when they're ready; until then they keep working on the old one.
>
> Trade-off: I'm carrying dual representation in the database for a while, and I'm emitting more events. The cost is operational complexity and slightly more storage. The benefit is zero downtime, zero forced upgrades on downstream teams, and a clear deprecation path. I'd put a sunset date on the legacy single-center field at six months out, communicate to consumers, and delete after.
>
> Business impact: this unlocks multi-region fulfillment, which is the bottleneck on serving customers whose orders exceed a single hub's stock. Rough estimate — if 10% of orders today are rejected for insufficient single-hub stock, this recovers that revenue without operational change."

That's the shape. User-first framing, explicit trade-off, named alternatives implicitly rejected, time-bounded deprecation, business outcome.

#### Speed traps — common mistakes under time pressure

- **Don't propose a rewrite.** Even if the system is ugly, the propeller-swap rubric punishes "let's start fresh." Start incremental.
- **Don't skip the user question.** Even with a tight clock, three seconds of "who's calling this API today?" reframes the whole answer.
- **Don't commit to a wire format you haven't thought through.** If they ask "what's the request body?" sketch it, but say "the field names are illustrative; I'd want to align with whatever conventions your team already uses."
- **Don't apologize for trade-offs.** If you propose dual-write and they say "isn't that double the cost?" — agree, name the alternative (big-bang migration with downtime), explain why you picked dual-write anyway. Don't fold.
- **Don't pretend perfection.** If you can't think of the answer fast, say "I'd want to think about three things before committing: X, Y, Z." That's a senior move. Frantically guessing is not.

#### Phrases to have in your back pocket

These are the "I've-done-this-before" tells. Sprinkle them naturally:

- **"Strangler fig"** — incrementally replace a legacy system by routing new traffic to the new implementation while the old one still runs, then slowly shrink the old surface until it can be deleted. No big-bang cut-over.
- **"Anti-corruption layer"** — a translation boundary that prevents a legacy or external domain model from leaking into your clean domain. The new system talks to the ACL; the ACL speaks legacy.
- **"Expand / contract"** (the schema migration pattern) — add the new column/table first (expand), backfill and dual-write, then drop the old one once nothing reads it (contract). Never alter and deploy atomically.
- **"Dual write, dual read, verify, cut over"** — write to both old and new stores simultaneously, compare reads to build confidence, then flip the read switch and retire the old store. Standard zero-downtime data migration playbook.
- **"Idempotency key"** — a client-supplied token that lets the server deduplicate retried requests, making non-idempotent operations (payments, emails) safe to retry.
- **"Backward-compatible by default; opt-in to the new behavior"** — ship the change so existing callers see no difference, and only callers who pass a flag/version header get the new behavior. Decouples deploy from adoption.
- **"Sunset header with a six-month window"** — respond with a `Deprecation` or `Sunset` HTTP header so clients get machine-readable notice well before the endpoint disappears. Six months is the typical courtesy window.
- **"Feature flag the read path before the write path"** — validate that the new read logic is correct in production before committing writes to the new store. Catches data-shape bugs without corrupting state.
- **"Eventually consistent, with a lag SLO"** — the system will converge, but you define and monitor *how long* convergence is allowed to take (e.g., p99 < 30 s). Turns a vague guarantee into an observable contract.

---

### 3.4 The business-impact stories you should pre-write

The recruiter was explicit: they want trade-offs and business impact. Don't show up without these. Write each as 90 seconds, out loud.

**Story 1: A scaling/performance decision**
- Situation: AFS Delayed Message Delivery, or your ElasticSearch CQRS extraction
- Trade-off: name the alternative and what you gave up
- Business impact: latency numbers, throughput, what the business could do that it couldn't before

**Story 2: A migration / evolving-system decision**
- Situation: pick something you migrated incrementally
- Trade-off: speed vs. safety, or scope vs. correctness
- Business impact: zero downtime, no client breakage, faster team velocity afterwards

**Story 3: A "saying no" decision**
- Situation: tech-lead moment where you pushed back on scope, or chose to defer a feature
- Trade-off: short-term disappointment vs. long-term sustainability
- Business impact: what shipped that wouldn't have, or what didn't break that would have

**Story 4: A cross-functional / non-engineering decision**
- Situation: working with product, ops, regulators, or a customer
- Trade-off: engineering ideal vs. operational reality
- Business impact: adoption, compliance, customer retention

Have these tight before the interview. Pull from them like ammo.

---

### 3.5 Quick reference — phrases that signal senior

Drop these naturally; they're the shorthand interviewers listen for:

- "**Who's the primary user?**" (opening framing)
- "**What does v1 not include?**" (scoping)
- "**What's the failure mode if this is wrong or stale?**" (operational)
- "**The trade-off here is...**" (decisional)
- "**I'd accept [downside] in exchange for [upside]**" (honest)
- "**Eventually consistent, with a lag SLO of N seconds**" (mature)
- "**Backwards-compatible by default; opt-in to the new behavior**" (migration)
- "**Idempotency key on every mutating request**" (production-grade)
- "**The backend is the security boundary**" (anti-pattern guard)
- "**Strangler fig over rewrite**" (judgment)
- "**Cut scope before adding people**" (leadership)

---

## 4. Go — sharpening the parts that matter

You know Go. This section is for fast re-grounding before the loop, not teaching.

### 4.1 Concurrency patterns they'll probe

**Goroutines + channels — the idioms that come up:**

| Pattern | When to use | Gotcha |
|---|---|---|
| `sync.WaitGroup` | Fan-out, wait for all | Always `defer wg.Done()`; add before goroutine launch |
| `errgroup.Group` | Fan-out with first-error cancellation | Context-aware; pair with `context.WithCancel` |
| `select` with `ctx.Done()` | Every blocking loop | Without it, goroutines leak |
| Buffered channel as semaphore | Bounded concurrency | `sem <- struct{}{}` / `<-sem` |
| `sync.Once` | One-time init (singletons, lazy loaders) | Survives panic — don't use if init can fail recoverably |
| `sync.Pool` | Reduce GC pressure on hot path | Not for stateful objects; items can vanish anytime |

**Race conditions — know these three patterns cold:**
- Map access without mutex → use `sync.RWMutex` or `sync.Map` (the latter only for write-once/read-many)
- Reading a slice while another goroutine appends → copy under lock or use channels
- Closure captures loop variable → in Go 1.22+ this is fixed per-iteration; pre-1.22 you need `i := i` shadowing

**Context propagation rule:** `context.Context` is *always* the first parameter. Never store it in a struct. Cancel it, don't nil it.

### 4.2 Error handling — current idioms

- `errors.Is` / `errors.As` — never string-compare errors
- Wrap with `fmt.Errorf("doing X: %w", err)` — `%w` preserves the chain
- Sentinel errors (`var ErrNotFound = errors.New(...)`) at the package level
- For API boundaries: custom error types that implement `Error()` and expose a code
- Don't `panic` across API boundaries; recover at goroutine entry points

### 4.3 Testing — what "comprehensive automated testing" looks like in Go

- **Table-driven tests** — the default idiom
- **`testing.T.Cleanup`** — prefer over `defer` in helpers
- **`t.Parallel()`** — know when it's safe (no shared state) and when it isn't
- **`httptest.Server`** for HTTP handlers
- **`testcontainers-go`** for real Postgres / Kafka in integration tests — mention this, it's a strong signal
- **`go test -race`** — run always in CI
- **Test doubles:** interfaces at boundaries; gomock or handwritten fakes. Avoid mocking what you don't own.
- **Property testing:** `rapid` or `gopter` for invariant-heavy logic (e.g., state machines for order lifecycle)

### 4.4 Performance tuning they might ask about

- `pprof` — CPU, heap, goroutine, block profiles. Know how to enable `net/http/pprof` behind an admin endpoint.
- Escape analysis (`go build -gcflags='-m'`) — when does a value escape to the heap?
- `benchstat` for before/after benchmark comparison
- Common wins: `strings.Builder` over `+=`, pre-size slices/maps, reuse buffers via `sync.Pool`, avoid reflection in hot paths

### 4.5 Quick Go quiz (answer these out loud before the interview)

1. What's the zero value of a map, and what happens if you write to it?
2. Difference between `make([]int, 5)` and `make([]int, 0, 5)`?
3. Why would you pick a pointer receiver over a value receiver?
4. When does `defer` not run?
5. How do you detect goroutine leaks in tests?
6. What's the difference between `close(ch)` and `ch = nil`?
7. Why shouldn't you share `sync.Mutex` by value?

> (Answers: nil → panic; len=5 zeroed vs len=0 cap=5; mutation/consistency/size; os.Exit or runtime crash; `goleak` package or count `runtime.NumGoroutine` before/after; close lets readers drain + range exit, nil blocks forever — useful in select for disabling a case; mutex struct has internal state, copying duplicates the lock not the protection.)

---

## 5. Kafka — the logistics-specific cut

You have the foundation. This section focuses on what comes up in **logistics/fulfillment** system design rounds.

### 5.1 Core model (cement these)

| Concept | What matters for system design |
|---|---|
| **Topic** | Logical stream; partitioned for scale |
| **Partition** | Unit of ordering + parallelism; a key hashes to one partition |
| **Offset** | Per-partition monotonic position; consumers commit offsets |
| **Consumer group** | One partition → one consumer within the group; rebalance on membership change |
| **Replication factor** | Usually 3 in prod; `min.insync.replicas=2` paired with `acks=all` for durability |
| **Log compaction** | Retain latest value per key — perfect for *current state* topics (inventory levels, order-latest-state) |
| **Retention** | Time-based (7d default) or size-based — compaction is orthogonal |

### 5.2 The delivery-guarantee triangle — *know this cold*

**Producer side:**
- `acks=0` — fire and forget (don't use for orders)
- `acks=1` — leader ack (can lose on leader failure)
- `acks=all` + `min.insync.replicas≥2` — durable
- `enable.idempotence=true` — producer dedupes retries by (producer-id, seq); should be default in modern Kafka (≥2.5 it is)
- `transactional.id` — exactly-once across topics/partitions, when combined with `isolation.level=read_committed` on consumers

**Consumer side:**
- At-least-once (default): process → commit offset. Crashes reprocess. **Requires idempotent handlers.**
- At-most-once: commit offset → process. Crashes skip messages. Rarely correct.
- Exactly-once: Kafka transactions OR idempotent external writes (e.g., `INSERT ... ON CONFLICT DO NOTHING` keyed by message ID)

**The pragmatic answer to "how do you guarantee exactly-once in production?"**
> "I lean on at-least-once delivery plus idempotent consumers — typically a dedupe key derived from the message (often the business ID or producer offset) written into the database as a unique constraint. Kafka transactions work, but they increase operational complexity and still don't cross the database boundary cleanly. The outbox pattern handles the other direction."

### 5.3 Patterns you should name-drop

**Transactional Outbox** — write your DB row and an outbox row in the same transaction; a separate process tails the outbox → Kafka. This is *the* answer to "how do you atomically update state and emit an event?" Pair with **CDC (Debezium)** if you want zero custom tailer code.

**Saga** — long-running distributed transactions (place order → reserve inventory → dispatch flight → confirm delivery). Choreography (each step emits events) vs. orchestration (central coordinator). Zipline's flight coordination is probably orchestrated.

**Event sourcing** vs. **event-driven state change** — don't conflate. Event sourcing = events are the source of truth; state is a projection. Most systems are just event-driven with a DB of record, and that's fine. Say so.

**CQRS** — read and write models diverge. Useful when read patterns are expensive (aggregations, search). Pairs naturally with Kafka as the write-log and a projection to Elastic or a read-optimized Postgres table.

**Dead Letter Topic (DLT)** — messages that repeatedly fail land here. Pair with a replay tool.

**Compacted state topics** — a topic keyed by `order_id` where the value is the latest order state. Consumers rebuild state by reading from the beginning. Perfect for onboarding a new service into existing data.

### 5.4 Partitioning strategy — the question you will be asked

> "Design the topic partitioning for order events in a fulfillment system."

Your answer should cover:
- **Key choice:** `order_id` — guarantees all events for one order land in the same partition, preserving order lifecycle ordering.
- **Cardinality:** enough distinct keys that partitions stay balanced. Order IDs are fine; country codes are not.
- **Partition count:** target ≥ peak consumer count, usually 2-3× headroom. Hard to reduce later; easier to over-provision.
- **Hot partition risk:** if one order has 10k events and others have 10, you have skew. Mitigate by keying on `(order_id, shard)` with shard derived from event type if lifecycle is very long.
- **Reprocessing blast radius:** a bad consumer version can poison one partition. Canary consumers + DLT.

### 5.5 Things that trip people up

- **Consumer lag** is not the same as throughput. Alert on lag; tune throughput.
- **Rebalancing storms:** long message processing without heartbeat → group kicks consumer → rebalance. Fix: bump `max.poll.interval.ms`, reduce `max.poll.records`, or move heavy work off the poll thread.
- **Ordering is per-partition, not per-topic.** If a customer asks "guarantee ordering," ask "within what scope?"
- **Retention vs. compaction:** you can have both on one topic (`cleanup.policy=compact,delete`), but understand that compaction doesn't retain deletes beyond `delete.retention.ms`.
- **Schema evolution:** use Avro or Protobuf + a schema registry. Backward compatibility = new consumers can read old messages. Forward = old consumers tolerate new fields. Full = both. For logistics data contracts between teams, full compatibility is worth paying for.

### 5.6 Gohlay — sell this hard

Your Gohlay project (scheduled message delivery via Kafka, no external data store) is a *gift* for this interview. It demonstrates:
- Go + Kafka in production-adjacent code
- A real understanding of Kafka semantics (you had to solve the scheduling problem without a queue)
- OSS maintenance = shipping and maintaining production software alone

Have a 90-second explanation ready:
- What problem it solves
- Why you didn't just use a scheduler + DB
- How it survives restarts (presumably by leveraging Kafka retention + offsets as state)
- Trade-offs you chose

---

## 6. Logistics & WMS — modern vocabulary and architecture deep dive

You built a TMS at AFS Logistics in 2018–2020. Since then the vocabulary has evolved, the architecture has converged on cloud-native microservices, and the WMS/WES/WCS boundary has been redrawn around automation and robotics — which is exactly Zipline's world. This section is the refresh.

### 6.1 The system-of-systems map (know this cold)

Modern fulfillment is a stack of systems, each with distinct responsibilities, update cadence, and consistency guarantees. Zipline's Nest team operates at the intersection of OMS, WMS, and the physical dispatch layer.

```
┌─────────────────────────────────────────────────────────────┐
│  ERP (SAP, Oracle, NetSuite)                                │
│  Financials, procurement, master data. Cadence: daily       │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────────────┐
│  OMS — Order Management System                              │
│  Order capture, ATP, routing, promise, payment              │
│  Cadence: seconds                                           │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────────────┐
│  WMS — Warehouse Management System                          │
│  Inventory, receiving, putaway, picking, packing, shipping  │
│  Cadence: sub-second for reservations                       │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────────────┐
│  WES — Warehouse Execution System                           │
│  Real-time orchestration of humans + automation + robots    │
│  Cadence: real-time (100s of ms)                            │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────────────┐
│  WCS — Warehouse Control System                             │
│  Direct control of conveyors, sorters, AS/RS, AGVs, arms    │
│  Cadence: milliseconds                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────────────┐
│  TMS — Transportation Management System                     │
│  Routing, rating, tendering, tracking, freight audit        │
│  At Zipline, this is flight dispatch and route planning     │
└─────────────────────────────────────────────────────────────┘
```

**The vocabulary drift since 2020:**
- WES is now central — in 2020 it was a minority solution; by 2026 Gartner Leaders like Manhattan Active have *merged WES into the WMS*, so "WMS" often includes real-time orchestration now. Know that the boundary is blurring.
- "Born in the cloud" / "100% microservices" / "composable" is the new marketing vocabulary — signals SaaS multi-tenant vs. legacy monolith.
- "Order streaming" replaces "wave picking" — continuous re-prioritization instead of batched waves.
- "Unified pool of capacity" — humans and robots scheduled by one engine, not two.
- "Agentic AI" is being layered on top (Manhattan, Infios both shipped it in 2025–2026). The hype is loud; the practical use is task assignment, exception handling, and workflow automation.

### 6.2 WMS — what's inside

Modern WMS core domains:

| Domain | What it does | Data model anchor |
|---|---|---|
| **Inbound / Receiving** | ASN matching, dock scheduling, check-in, count, putaway | ASN, receipt, putaway task |
| **Inventory** | On-hand, allocation, reservation, cycle counts, adjustments | SKU × Location × Lot × Serial × Status |
| **Slotting** | Where each SKU lives; velocity-based, ergonomic, cold-chain constrained | Slot profile, SKU-to-location binding |
| **Replenishment** | Triggering moves from reserve to pick locations | Min/max, par levels, demand forecast |
| **Outbound / Picking** | Wave → batch → order → unit; pick paths; pick method | Order, wave, task, tote/container |
| **Packing** | Cartonization, labeling, documentation, hazmat checks | Container, shipment, label |
| **Shipping** | Loading, manifesting, BOL, handoff to carrier | Shipment, load, trailer/flight |
| **Returns** | RMA, inspection, disposition (restock, refurb, scrap) | RMA, return lot |
| **Labor** | Task assignment, engineered standards, gamification | Task, operator, timestamp |
| **Audit / Traceability** | Every inventory movement as an append-only event | Movement / stock ledger |

**The thing you need to redo mentally:** historically WMS was transaction-based with nightly batches. Today the reference architecture is event-driven — each movement emits an event; projections are materialized; integrations happen via streaming APIs and webhooks, not nightly EDI files.

### 6.3 Picking strategies — fast refresher

This comes up in design rounds more than you'd expect. Know the terminology:

- **Discrete / single-order picking** — one picker, one order. Simple, low throughput, used for low volume or large items.
- **Batch picking** — one picker, multiple orders at once, sorted at pack station.
- **Zone picking** — pickers stay in zones; order moves between zones (pick-and-pass) or is consolidated downstream.
- **Wave picking** — orders grouped into waves by cutoff, priority, or carrier. Classic but going out of fashion.
- **Waveless / order-streaming** — continuous release, re-prioritized by the WES as orders flow. Modern default in high-velocity ops.
- **Cluster picking** — batch with a cart of multiple order totes; operator sorts as they pick.
- **Put-to-light / pick-to-light** — lights direct operator actions. Fast, low training.
- **Voice picking** — hands-free, headset-driven. Common in cold environments (gloves).
- **Goods-to-person (GTP)** — robots bring inventory pods to stationary pickers (Kiva/Amazon model, AutoStore).

Zipline's model is unusual: very few SKUs relative to retail, extreme speed requirements, and an aircraft payload as the final container. The pick process is probably closer to discrete or light cluster picking, with the "package" constraints dictated by the drone.

### 6.4 Inventory semantics — the distinctions that matter

Interview gold — these are confused even by experienced engineers:

| Term | Meaning |
|---|---|
| **On-hand** | Physically present, regardless of status |
| **Available** | On-hand minus reserved minus damaged minus held |
| **Reserved / Allocated** | Promised to a specific order but not yet picked |
| **ATP (Available-to-Promise)** | What you can commit to a new order, given existing reservations, inbound supply, and safety stock |
| **ATS (Available-to-Sell)** | ATP filtered by channel / business rules (segmentation) |
| **In-transit** | Shipped but not yet received at the next location |
| **Inbound** | Expected via ASN, not yet arrived |
| **Held / Quarantined** | Physically present but not sellable (QC hold, recall, expired) |
| **Safety stock** | Buffer kept unavailable to absorb forecast error |
| **Cycle count** | Rolling partial audit (vs. physical = full stop-the-world count) |
| **Variance / shrinkage** | Unexplained loss discovered at count |

**The ATP computation** deserves its own mention — it's the single calculation most orders depend on:

```
ATP(sku, location, date) = on_hand
                         - reservations_before(date)
                         + scheduled_inbound_before(date)
                         - safety_stock
                         - held_quantities
```

Done naively this is a query per ATP check. At scale you project ATP into a denormalized read model (Redis, a compacted Kafka topic, or a read-optimized Postgres table) and update it on every inventory event. This is a classic CQRS use case and a great thing to bring up unprompted.

### 6.5 Identifiers — GS1 and what they mean

Healthcare logistics is identifier-heavy. If you haven't touched this stack recently, here's the cheat sheet. Zipline's medical deliveries almost certainly involve some of these:

| Standard | What it identifies | Example |
|---|---|---|
| **GTIN** (Global Trade Item Number) | Product (SKU at trade level) | 14-digit number behind the barcode |
| **GLN** (Global Location Number) | A physical or legal location | "DC-Kigali-01" in system, 13-digit GLN on wire |
| **SSCC** (Serial Shipping Container Code) | A specific shipping unit (pallet, carton) | 18-digit; used on the shipping label |
| **GSIN** (Global Shipment Identification Number) | The whole shipment (multiple SSCCs) | Used for track/trace across carriers |
| **GINC** (Global Identification Number for Consignment) | Carrier consignment grouping | Think: a truckload of many shipments |
| **GS1 DataMatrix** | 2D barcode with product + lot + expiry + serial | The barcode on a pharmaceutical box |
| **GS1-128** | 1D barcode, Application Identifiers separate fields | The label on a logistics carton |
| **EPCIS** (Electronic Product Code Information Services) | Event data standard — "what, where, when, why" | Shared across parties for traceability |
| **UDI** (Unique Device Identifier) | FDA-mandated identifier for medical devices | Required in US; Zipline moves devices |
| **NDC** (National Drug Code) | US FDA product code for drugs | Encoded in DataMatrix alongside GTIN |
| **DSCSA** | US Drug Supply Chain Security Act — serialization + traceability for Rx | The regulatory driver behind much of the above |

**The practical implication for engineers:** your inventory model shouldn't just key on SKU. For pharmaceuticals and medical devices, the unique unit is (GTIN, lot, serial) and you must track chain of custody as EPCIS-style events. Recall propagation — "given this lot, find every downstream recipient" — is a regulatory requirement. It's also a classic event-sourced-projection problem.

### 6.6 Cold chain — the concern you should bring up unprompted

Zipline does cold chain. Vaccines, blood, lab samples. Requirements you'd model:

- **Temperature ranges per SKU** — ambient (15–25°C), refrigerated (2–8°C), frozen (-20°C), ultra-cold (-70°C for some mRNA vaccines). Ranges are regulatory, not opinion.
- **Continuous monitoring** — sensors log temperature through storage and transit. Excursions (out-of-range events) are auditable events.
- **Excursion handling** — an excursion doesn't automatically mean scrap; it goes to QA for review against the SKU's stability data. Your system needs to model "conditional hold."
- **Time-out-of-refrigeration (TOR) budgets** — SKUs have cumulative out-of-range tolerances; your system tracks elapsed budget.
- **Chain of custody** — signed handoffs at each temperature-controlled zone transition.
- **Drone payload constraints** — the aircraft itself has insulation and duration limits; short flights help, but your order acceptance logic must check (SKU cold-chain spec) × (expected flight duration + buffer).

**An interview-ready sentence:**
> "For cold-chain cargo I'd model the drone flight as a temperature-controlled transit segment with a documented TOR budget. The fulfillment service needs to reject orders that exceed the SKU's remaining stability budget before launch, and every handoff emits a chain-of-custody event that becomes part of the EPCIS-style traceability stream."

### 6.7 TMS — what you built at AFS, in today's vocabulary

Your AFS TMS experience maps directly to modern TMS functionality. Quick refresh on the core components:

- **Order/Shipment ingestion** — from OMS, ERP, EDI, or API. Shipment = orders consolidated for transport.
- **Rating** — given an origin, destination, dimensions, weight, service level, what does each eligible carrier charge? Rate shopping.
- **Routing / optimization** — mode selection (TL, LTL, parcel, intermodal), route plan, stop sequencing, load consolidation.
- **Tendering** — offering the shipment to the chosen carrier; acceptance SLAs, fallback rules.
- **Execution / tracking** — pickup, transit events, geofence arrivals, delivery confirmation.
- **Freight audit & payment** — matching invoices to booked rates, catching overcharges.
- **Analytics** — on-time %, cost per mile/kg, carrier scorecards.

**What's new since 2020 in TMS:**
- **Real-time visibility platforms** (project44, FourKites) via standard APIs — carrier-agnostic tracking.
- **AI-driven carrier selection** — optimizing on a multi-factor score, not just price.
- **Multi-enterprise networks** — shippers + carriers + 3PLs on shared platforms (Uber Freight, Infor Nexus, E2open).
- **Digital freight matching** — spot market execution inside the TMS.
- **Control tower** is the current vogue word — unified visibility and exception management across the whole supply chain.

**Zipline's "TMS" is flight coordination.** The mental model translates: shipments → flight missions, carriers → drones, routes → airspace/flight paths, tendering → dispatch handshake, tracking → telemetry, POD → delivery-confirmation event.

### 6.8 Integration patterns — the wire formats you'll encounter

Logistics is integration-heavy. Know these:

| Format / Protocol | Where it shows up | Notes |
|---|---|---|
| **EDI (X12 / EDIFACT)** | Carrier tendering, ASN, invoice | Still dominant; 940 (warehouse shipping order), 945 (shipment confirm), 214 (carrier status), 856 (ASN), 210 (freight invoice) |
| **REST / JSON** | Modern SaaS WMS/OMS/TMS APIs | Default for new integrations |
| **gRPC / Protobuf** | Internal service-to-service | Zipline uses this — see the Commerce Platform JD |
| **Kafka / event streaming** | Between services and for downstream analytics | Outbox → Kafka is the current best-practice egress pattern |
| **Webhooks** | SaaS callback-style integrations | Idempotency + signature verification mandatory |
| **GraphQL** | Merchant / partner portals | Good for flexible reads; less common for transactional posts |
| **MQTT** | IoT sensors (temperature, GPS, telemetry) | Expect this in cold-chain monitoring |
| **EPCIS events** | Regulatory traceability | XML or JSON-LD; shared via EPCIS repositories |

**Your EDI Parser project at UberFreight** — dust that story off. The "Dynamic EDI Parser" hits a sweet spot: it shows integration chops, shows you respect the installed base, and shows you can modernize without rewriting the world.

### 6.9 State machines — the backbone of every logistics system

Every entity in logistics has a lifecycle. You will be asked to draw one. Have these four in your head:

**Order lifecycle:**
```
Created → Validated → Accepted → Released → Picking → Picked
  → Packed → Loaded → InTransit → Delivered
  → (Cancelled) at any point until Released
  → (Failed, Returned) terminal states
```

**Shipment / flight lifecycle:**
```
Planned → Tendered → Accepted → Loaded → Dispatched → InTransit
  → Arrived → Unloaded → Completed
  → (Aborted, Diverted) exception paths
```

**Inventory lot lifecycle:**
```
Inbound → Received → QCHold → Available → Reserved → Picked → Shipped
  → (Quarantined, Expired, Scrapped) exception states
  → (Recalled) with traceability-driven propagation
```

**Drone mission lifecycle (Zipline-specific inference):**
```
Scheduled → PreFlight → Launched → Cruising → Descending
  → Dropped → Returning → Landed → Inspected → Ready
  → (Aborted, EmergencyLanded, LostComms) exception states
```

**Interview framing:** state machines let you talk precisely about consistency. "This transition must be atomic. That transition can be eventually consistent. This one needs a compensating action if downstream fails." That vocabulary separates senior engineers from mid-level ones.

### 6.10 KPIs — the numbers the business cares about

You'll sound credible if you know these by name. Map them to system design choices:

- **OTIF** (On-Time In-Full) — combined delivery quality metric.
- **Perfect order rate** — OTIF × invoice-accurate × damage-free.
- **Order cycle time** — order placement to delivery.
- **Dock-to-stock time** — inbound truck to "available to sell."
- **Pick rate** — units/hour per picker.
- **Pick accuracy** — 1 - (mispicks / total picks). Five-nines is the aspirational bar.
- **Inventory accuracy** — system vs. physical; usually measured at cycle count.
- **Fill rate** — % of orders filled from available stock without backorder.
- **DOH / DOS** (Days on Hand / Days of Supply) — inventory runway.
- **Turns** — annual COGS / average inventory.
- **Cost per order / per mile / per kg**.
- **Carrier on-time %** — feeds carrier scorecards.
- **Dwell time** — truck or drone idle at a dock/hub.

### 6.11 Regulatory and compliance — the constraints the JD doesn't say out loud

For healthcare logistics, these touch your design:

- **FDA DSCSA** (US) — serialized traceability for Rx drugs.
- **EU FMD** (Falsified Medicines Directive) — similar EU equivalent.
- **GDP** (Good Distribution Practice) — WHO/EU standard for medicinal product distribution; dictates temperature, documentation, chain-of-custody rules.
- **HIPAA** — PHI concerns if orders include patient identifiers.
- **Country-specific aviation regulations** — Rwanda CAA, Ghana CAA, FAA for US ops. Flight records, maintenance logs, pilot certifications.
- **Data residency** — patient and operational data may need to live in-country. Not a trivial engineering detail.

You don't need to be a lawyer. You need to know these categories exist, so when someone says "can we just move this service to us-east-1" you're the one who asks "what's in the data, and where are we allowed to keep it?"

### 6.12 Your past projects in modern vocabulary

Relabel as you prep — you'll sound current without overclaiming:

| Your resume says | In 2026 vocabulary |
|---|---|
| "Microservices architecture with Spring Boot, Golang, Kafka, Redis, Postgres, Kubernetes" | "Cloud-native, event-driven logistics platform on Kubernetes, with a polyglot services and Kafka as the integration backbone" |
| "Transportation Management System" | "Multi-modal TMS with rating, routing, and tracking" — call out specific modules (A Rating System = rating engine; Document Manager = shipment doc management) |
| "Delayed Message Delivery service scaled efficiently using Kafka and Redis" | "A Kafka-native scheduled message service — effectively a bounded-time, durable delay queue without introducing a separate scheduler database. Used for retry backoff, deferred notifications, and timed state transitions in the TMS workflow." |
| "Dynamic EDI Parser" | "A schema-aware EDI-to-canonical-model adapter, enabling the TMS to onboard new trading partners without code changes — a classic anti-corruption-layer pattern" |
| "ElasticSearch API on top of Groovy on Grails monolith" | "A CQRS-style read-side projection — I extracted search from the monolith's write path, cut p95 query latency, and decoupled search schema from the relational model" |
| "Gohlay" | "An OSS Go CLI for Kafka-native scheduled messaging — useful in event-driven workflows where a dedicated scheduler is overkill" |

---

## 7. Logistics-domain system design — the likely interview scenarios

This team does medical inventory, order processing, and flight coordination. Expect at least one system-design round with a scenario like:

### 7.1 "Design a medical inventory management system"

**Your structure:**
1. **Clarify scope:** how many SKUs? how many fulfillment centers? consumable vs. serialized? cold-chain? expiry tracking?
2. **Core entities:** SKU, Location, LotNumber (matters for recalls), Quantity-on-hand, Reservation, Movement.
3. **Commands vs. queries:** commands (receive, reserve, pick, ship, scrap) vs. queries (available-to-promise, near-expiry report).
4. **Write model:** Postgres with strong constraints; inventory movements as the source of truth, quantity-on-hand as a materialized projection (or computed on read for low-SKU systems).
5. **Event emission:** outbox pattern → Kafka topics (`inventory.reserved`, `inventory.shipped`, `lot.expiring`).
6. **Consistency:** reservations must be strongly consistent (no overselling life-saving medicine). Use Postgres row locking or serializable isolation. Don't trust eventual consistency for reservations.
7. **Concerns:** expiry handling, recall propagation (given a lot number, find every shipment downstream), audit trail, regulatory traceability.

### 7.2 "Design order processing with flight coordination"

**Your structure:**
1. **Clarify:** order placed by whom (hospital staff, app, API)? SLA from order to takeoff? cancellation semantics?
2. **Lifecycle states:** `Placed → Validated → Picked → LoadedOnDrone → InFlight → Delivered` (+ `Cancelled`, `Failed`, `Returned`). Draw the state machine.
3. **Architecture:** an Order Service (owns lifecycle), an Inventory Service (reserves), a Flight Service (schedules takeoff), tied together by a Saga orchestrator.
4. **The seam between software and hardware:** flight dispatch is the point where the digital world meets a physical drone. Emphasize idempotency, confirm-before-launch handshakes, and defensive rollback (if drone reports "not taking off," release the reservation).
5. **Offline / low-connectivity:** order placement from the client should tolerate intermittent network. Local queue, sync on reconnect, idempotency keys. (The Full Stack Apps JD explicitly calls this out.)
6. **Observability:** every state transition emits an event; a dashboard shows order-to-delivery latency percentiles. Honeycomb/Grafana live in their stack.

### 7.3 "How do you evolve a system when business requirements change weekly?"

This is the "fast-changing environments" question. Your answer:

- **Narrow interfaces, broad internals.** Services should expose stable APIs while internals are free to churn.
- **Event contracts as versioned schemas.** Breaking changes are planned migrations, not surprises.
- **Feature flags everywhere.** Deploy and release are different.
- **Kill deprecated code aggressively.** Carrying dead code is worse than deleting and regretting.
- **Incremental migration patterns.** Strangler fig, parallel run, shadow traffic. Don't rewrite from scratch.

---

## 8. Postgres — the performance-tuning bits they'll probe

JD explicitly calls out "Database modeling and performance tuning experience with Postgres." Have these ready:

### 8.1 Modeling

- **Normalize for writes, denormalize for reads.** A fulfillment system is write-heavy on movements, read-heavy on "what's in stock" — you'll probably materialize the read model.
- **Surrogate vs. natural keys.** For inventory, SKU is natural and stable. Use it as a key where possible.
- **Partitioning.** Time-range partitioning for append-mostly tables (events, movements) above ~100M rows.
- **Soft deletes vs. history tables.** For regulated domains like medical, you need append-only audit trails. `system-versioned temporal tables` pattern via triggers or `btree_gist` exclusion constraints.

### 8.2 Indexing cheat-sheet

| Need | Index type |
|---|---|
| Equality, range | B-tree (default) |
| Multi-column queries | Composite B-tree — order by selectivity desc, query-pattern-first |
| JSON field search | GIN on `jsonb_path_ops` |
| Full text | GIN on `tsvector` |
| Low-cardinality filters with sorted inserts | BRIN — tiny index for huge tables |
| Expression (lower(email), etc.) | Functional index |
| Partial (WHERE status='active') | Partial index — massive space savings |
| Unique constraint with conditions | Unique partial index |
| Spatial | GiST (PostGIS); mentioned in their Maps Platform JD |

**Rule:** indexes help reads, hurt writes. Know the write amplification on a table with six indexes.

### 8.3 Performance diagnosis

- `EXPLAIN (ANALYZE, BUFFERS)` — understand actual vs. planned rows, heap fetches, filter recheck.
- `pg_stat_statements` — top N slowest queries by total time.
- `pg_stat_user_indexes` — find unused indexes (candidates to drop).
- `auto_explain` — log slow plans in production.
- Connection pooling — **pgbouncer** in transaction mode. Don't let Go's `database/sql` open 500 connections.
- Lock contention — `pg_locks` joined with `pg_stat_activity`.

### 8.4 Things that always come up

- **N+1 queries** — batch loader or `IN (...)` queries.
- **Write skew / lost updates** — `SELECT ... FOR UPDATE` or optimistic concurrency with a version column.
- **Transaction isolation** — default is `READ COMMITTED`. For reservations where invariants cross rows (total reserved ≤ on-hand), `SERIALIZABLE` is correct; retry on serialization failure.
- **Migrations without downtime** — add column nullable → backfill → set NOT NULL. Use `CREATE INDEX CONCURRENTLY`. Never `ALTER TABLE` with a long lock on a hot table in business hours.

---

## 9. React + frontend — quick bridge

You have Vue depth and Thinkful mentoring in React. You're fluent enough. Fast refresh:

- **Hooks fundamentals:** `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useContext`, `useReducer`.
- **Effect rules:** don't call inside conditionals; cleanup functions matter; dependency arrays drive re-runs.
- **State management options (know the tradeoffs):** Context+Reducer for component trees, Zustand for light global, Redux Toolkit for heavy, React Query / TanStack Query for server state. Mention server state is *different* from client state — that's the modern frontend insight.
- **Data fetching + caching:** TanStack Query is the de facto choice. SWR is the alternative.
- **Forms:** React Hook Form is the standard.
- **Testing:** React Testing Library (behavior, not implementation) + Playwright for E2E.
- **Offline-first:** service workers, IndexedDB, background sync. *This is where the Zipline Africa context becomes concrete on the frontend* — be ready to talk about offline order placement.

**If asked "you mostly have Vue":**
> "Frameworks come and go, but the underlying models — components, unidirectional data flow, declarative rendering, hook-style effects — are the same. I picked up Vue 3's Composition API in a week coming from React hooks; the reverse direction is easier because React has fewer built-in conventions."

---

## 10. Kubernetes + AWS — the ops layer

You have this. Touchpoints that matter:

- **Deployment vs. StatefulSet vs. DaemonSet.** Know when each applies. Kafka brokers on StatefulSets; consumers on Deployments.
- **Resource requests/limits.** Requests drive scheduling, limits drive OOM kill. CPU limits can cause throttling even when there's headroom — controversial and worth an opinion.
- **Liveness vs. readiness probes.** Readiness removes from service; liveness restarts. Failing a liveness because of a slow dependency is a common outage pattern.
- **HPA** on CPU is lagging; on queue depth (Kafka consumer lag) is leading. KEDA is the tool.
- **Secrets management.** External Secrets Operator → AWS Secrets Manager is common.
- **Service mesh / ingress.** Istio/Linkerd exist; most teams are fine with ingress-nginx + mutual TLS at the app layer.
- **AWS surface:** RDS (Postgres), MSK (managed Kafka) or self-hosted Kafka, S3, SQS (don't conflate with Kafka — different guarantees), EKS, IAM roles for service accounts (IRSA).

---

## 11. Behavioral prep — your stories, mapped

For every behavioral prompt, pick from this matrix. STAR format: Situation, Task, Action, Result.

| Prompt type | Your best story |
|---|---|
| Architecting from scratch | AFS Delayed Message Delivery (Kafka + Redis, scaled efficiently) |
| Owning something end-to-end | Gohlay (design, build, maintain, OSS community) |
| Simplifying complexity | TMS at AFS — microservices, A Rating, Document Manager |
| Mentoring | Thinkful mentorship + current tech lead (10 reports) |
| Disagree and commit | Any tech-lead call you had to make despite team disagreement (have one ready) |
| Working across non-engineering | WSO2 DevRel; current role across dev/QA/product |
| Failure / learning | Pick one where you shipped too fast and paid for it — don't hide it |
| Ambiguous requirements | PeerPractice architecture decisions (practitioner/client terminology, Pillar 3 reframe) demonstrate how you handle definitional ambiguity |
| Global / cross-cultural | WSO2 global events + BMW (likely distributed team) |

**Specifically for Zipline's mission:**
Have an answer for "why Zipline." Avoid generic "changing the world." Connect it to your actual work — medical logistics is where software mistakes are not recoverable, and you've spent your career where software meets physical-world consequences (TMS, EV charging, now health). The stakes are the draw.

---

## 12. Questions to ask them (pick 3–4)

Good questions demonstrate seniority and interest. Tailor to the interviewer:

**For an engineer:**
- What's the most painful technical debt the Nest team carries today? What would you tear out if you had a quarter to do it?
- How do you handle schema evolution across services when the business is moving this fast?
- How much of the system is exactly-once vs. at-least-once + idempotent consumers? Where have you been burned?
- What does on-call look like? Frequency, severity, who-pages-who?

**For a manager / tech lead:**
- What does the first 90 days look like for someone stepping into this role?
- How are architectural decisions made and documented? RFCs, ADRs, hallway conversations?
- What's the split between greenfield feature work and operational improvement?
- How is success measured for senior engineers here — ship velocity, mentorship, architecture, all three?

**About the Kigali / Africa context:**
- How often does the team travel to Rwanda? What's the collaboration model with on-ground ops?
- What are the biggest gaps between what engineers in SF imagine and what operators in Kigali actually need?
- Offline / low-bandwidth — how deep does that concern go in the current stack?

**About the role:**
- Why is this role open — is it growth or backfill? What happened with the previous person in the slot (if growth, what's the new scope)?
- What would make someone unambiguously successful here in 18 months?

---

## 13. Red flags to avoid

- **Overclaiming recent IC depth.** You've been DevRel-leaning for ~3 years. If they ask "what's the last production Go service you wrote," have a real answer — Gohlay maintenance counts, as does your current middleware work. Don't pretend.
- **Saying "microservices" as if it's an answer.** They'll push on why. "Because bounded contexts had different change cadences and ownership" is good. "Because microservices scale better" is not.
- **Defaulting to maximum cleverness.** The JD says *simple* twice. When designing, lead with the simplest thing that works, then discuss what would force you to add complexity.
- **Disparaging past employers.** Zipline's culture skews mission-serious. Stay gracious.
- **Underestimating the hardware seam.** If you treat flight dispatch as just another API call, you miss the whole point. Bring up idempotency, confirmation handshakes, and defensive rollback unprompted.

---

## 14. Sprint plan for Round 2 (architecture + Propeller Swap)

The original 3-day plan below assumed an early-round refresher. For Round 2, the priority shifts hard toward §3 — the round-specific prep — plus the four business-impact stories. Adjust accordingly.

**Day 1 — Stories and the architecture framework (3–4 hrs)**
- Write out the four business-impact stories from §3.4. Tight, 90 seconds each, with the trade-off line and the outcome line memorized.
- Walk through the architecture framework in §3.2 out loud, with no prompt, just narrating. Then do it again pretending the prompt is "design an operator dashboard for cold-chain inventory across multiple distribution centers." Time yourself: target 35 min end-to-end.
- Re-read §3.5 — the senior-signal phrases. These should be in your spoken vocabulary.

**Day 2 — Propeller Swap rehearsal (3–4 hrs)**
- Pick three prompts and walk through each as a propeller-swap problem. Suggestions:
  - "Order service is single-tenant; make it multi-tenant"
  - "Inventory schema doesn't track lot numbers; add lot-level tracking"
  - "REST API is per-resource; partners want a bulk endpoint"
- For each, run the strangler-fig playbook in §3.3 out loud. Target 8–10 min per walkthrough.
- Have the data-modeling and API moves from §3.3 *in your speaking voice*, not just understood.

**Day 3 — Domain reinforcement + Zipline-specific (3–4 hrs)**
- Skim §5 (Kafka), §6 (Logistics/WMS), §7 (system design scenarios) — refresh, don't re-learn
- Watch Keller Rinaudo's TED talk and "Inside Zipline's Factory" if you haven't
- Re-read Zipline's Smart Fulfillment page on their site. Know their words.
- Run through the Go quiz in §4.5 — fast, no agonizing
- Sleep.

### Original 3-day refresher plan (Round 1 prep — keep for reference)

**Day 1 — Go + Kafka refresh (4–5 hrs)**
- Re-read your Gohlay source; be able to explain every design decision in 90 seconds
- Skim [Confluent's Kafka fundamentals](https://developer.confluent.io/) — producer/consumer configs, transactions
- Run through the Go quiz in §4.5 out loud
- Write a small Go program that consumes from a topic, applies idempotent DB writes via outbox. Time-box: 90 min. Don't perfect it; you're building muscle memory.

**Day 2 — System design + Postgres (4–5 hrs)**
- Practice §7.1 and §7.2 out loud, end-to-end, with a whiteboard. Record yourself; listen back. You'll hear the wobbly parts.
- `EXPLAIN ANALYZE` practice on any real Postgres you have access to. Make a slow query fast.
- Read one deep piece on the outbox pattern and one on sagas. [microservices.io](https://microservices.io/patterns/) is good.

**Day 3 — Behavioral + research (3–4 hrs)**
- Write out STAR answers for the §11 matrix. Tight. 2 minutes each.
- Watch Keller Rinaudo's TED talk on Zipline if you haven't. (So you have a concrete reference to operations in your answers.)
- Read Zipline's engineering blog posts. Skim recent press around Platform 2, Walmart rollout, and health expansion.
- Sleep.

---

## 15. YouTube video companion — hand-picked refreshers

Videos chosen for signal density, authoritative voice, and directness. Every title is a direct link.

### 15.1 Kafka — core through production

- **[Apache Kafka 101 — 2025 Edition playlist (Confluent, Tim Berglund)](https://www.youtube.com/playlist?list=PLf38f5LhQtheK16nwnCYFqH23WUUvZfSb)** — the definitive free course. 13 short videos (~5–10 min each) covering topics, partitions, brokers, replication, producers, consumers, Connect, Schema Registry, Streams. If you watch *one* thing on Kafka, watch this playlist.
- **["Is Kafka a Database?" — Martin Kleppmann, Kafka Summit London 2019](https://www.youtube.com/watch?v=BuE6JvQE_CY)** — 35 min. The best single talk on rethinking Kafka as more than a message queue. Clarifies log compaction, state, and event-driven architecture better than any blog post.
- **["Turning the database inside out with Apache Samza" — Martin Kleppmann, Strange Loop](https://www.youtube.com/watch?v=fU9hR3kiOK0)** — ~40 min. Older but foundational. The mental model behind event sourcing + CQRS + stream-processed materialized views. Watch this if §6.4's ATP projection discussion felt abstract.
- **["Lessons learned from Kafka in production" — Tim Berglund](https://www.youtube.com/watch?v=1vLMuWsfMcA)** — ~45 min. Covers the operational gotchas: rebalancing, retention tuning, consumer lag, exactly-once tradeoffs. Directly interview-relevant.
- **["Designing Data-Intensive Applications with Martin Kleppmann" — Pragmatic Engineer, 2026](https://www.youtube.com/watch?v=SVOrURyOu_U)** — ~90 min. Recent update captures how his thinking has evolved since the book. Background listening.

### 15.2 Go — language idioms and concurrency

- **["Go Concurrency Patterns" — Rob Pike, Google I/O 2012](https://www.youtube.com/watch?v=f6kdp27TYZs)** — 52 min. Foundational. Channels, fan-in, fan-out, select, timeout patterns. This is *the* canonical talk.
- **["Advanced Go Concurrency Patterns" — Sameer Ajmani, Google I/O 2013](https://www.youtube.com/watch?v=QDDwwePbDtw)** — 30 min. Direct sequel to Pike's talk. Deadlocks, cancellation, deadlines — the stuff you actually use daily.
- **["Concurrency is not Parallelism" — Rob Pike, Heroku Waza](https://www.youtube.com/watch?v=oV9rvDllKEg)** — 30 min. The conceptual framing behind Go's design.
- **[Bill Kennedy / Ardan Labs — "Ultimate Go: Advanced Engineering" series](https://www.youtube.com/watch?v=0p40m5wS0Qc)** — Kennedy's multi-part series on semantics, pointers vs. values, and escape analysis. Watch the first 3 episodes for the performance-thinking refresh.
- **["SOLID Go Design" — Dave Cheney, Golang UK 2016](https://www.youtube.com/watch?v=zzAdEt3xZ1M)** — Cheney is the voice on idiomatic Go. Short, dense.

### 15.3 System design — interview-focused

- **[ByteByteGo channel (Alex Xu)](https://www.youtube.com/@ByteByteGo)** — Short (8–15 min) animated explainers on every classic system design topic: caching, consistency, load balancing, CDNs, Kafka vs. SQS vs. RabbitMQ, database replication, sharding. Skim and pick whatever feels rustiest.
- **[Jordan Has No Life](https://www.youtube.com/@jordanhasnolife5163)** — Long-form (30–60 min) walkthroughs that go deeper. His "20 system design concepts" series and full design problem walkthroughs (ride-share, ticket booking, distributed cache) are especially good for senior-level depth.
- **[Hussein Nasser](https://www.youtube.com/@hnasr)** — Backend engineer covering database internals, network protocols, HTTP/gRPC, connection pooling. Gruff, honest, production-oriented.
- **["Chris Richardson on Microservice Patterns" — SE Radio Episode 370](https://se-radio.net/2019/06/episode-370-chris-richardson-on-microservice-patterns/)** — audio with transcript. The man literally wrote the book on saga and outbox. If you want the vocabulary straight from the source, this is it.
- **[microservices.io pattern library](https://microservices.io/patterns/)** — not a video, but the canonical reference for outbox, saga, CQRS, strangler fig, and every other pattern you'll name in the Propeller Swap round.

### 15.4 Postgres — performance tuning

- **["Best Practices for Tuning Slow Postgres Queries" — Lukas Fittl, POSETTE 2025](https://www.youtube.com/watch?v=ng6dKtrHAtE)** — ~45 min. Founder of pganalyze walks iteratively through diagnosing slow queries. Postgres 16/17-era. Directly applicable to the JD's "performance tuning" ask.
- **[pganalyze YouTube channel](https://www.youtube.com/@pganalyze)** — short deep dives (5–15 min each) on index types, planner decisions, VACUUM, connection pooling, partitioning. Skim the titles, cherry-pick what you need.
- **[Hussein Nasser — "Postgres Indexes" playlist](https://www.youtube.com/@hnasr)** — if your index-type recall is rusty, search his channel for "postgres index."

### 15.5 Kubernetes + cloud-native ops

- **["Kubernetes Tutorial for Beginners" — TechWorld with Nana (4 hrs)](https://www.youtube.com/watch?v=X48VuDVv0do)** — the most-recommended Kubernetes intro on YouTube. At your level, watch at 1.5–2× and skip what's familiar. Pods/services/ingress/volumes sections are the refresh worth having.
- **["Kubernetes Crash Course for Absolute Beginners" — TechWorld with Nana (~72 min)](https://www.youtube.com/@TechWorld-with-Nana)** — if you just want the map. Good for a quick recalibration. Search her channel for the crash course directly.

### 15.6 Logistics / WMS / supply chain

This space is dominated by vendor marketing videos. Treat them as "what does the industry sound like in 2026":

- **[Manhattan Active Warehouse Management — product overview playlist](https://www.youtube.com/@ManhattanAssociates)** — Watch 1–2 videos to hear the current vendor vocabulary (composable microservices, order streaming, unified human+robot capacity, agentic AI). You don't need to learn Manhattan; you need to know what a sales engineer sounds like.
- **[Consafe Logistics — "What is a Warehouse Management System?"](https://www.youtube.com/@ConsafeLogistics)** — 15–20 min operational overview of receiving → putaway → picking → packing → shipping. Useful if §6.2 felt abstract.
- **[GS1 Global YouTube channel](https://www.youtube.com/@GS1global)** — Short videos on GTINs, GLNs, SSCCs, GS1 DataMatrix, EPCIS. Dry but authoritative. Good for §6.5 context.

### 15.7 Zipline — company-specific context (watch all of these)

This is the "why Zipline" research. Every one of these is worth your time before the interview:

- **["How we're using drones to deliver blood and save lives" — Keller Rinaudo, TED 2017](https://www.youtube.com/watch?v=73rUjrow5pI)** — 12 min. Still the best concise statement of Zipline's mission. Quote-worthy in your "why Zipline" answer.
- **["Inside Zipline's Factory: The World's Largest Drone Delivery Network" — January 2026](https://www.youtube.com/watch?v=_qbbwichFIk)** — Full tour with CEO Keller Rinaudo Cliffton including the ROCC (Remote Operating Command Center) and live flight operations. The most current look at how the company operates.
- **["2024 Behind the Scenes with Zipline"](https://www.youtube.com/watch?v=nY2RjINT1K0)** — Zipline's own channel; ~10 min look at the P2 system and operations.
- **["Autonomy at Zipline, Behind the Scenes"](https://www.youtube.com/watch?v=xB29HG5JNlE)** — Zipline engineering talk on autonomous flight systems. More technical than the PR videos.
- **[MKBHD — "The Truth about Drone Deliveries!" (Zipline Platform 2, 2025)](https://www.youtube.com/watch?v=88yQTzlmsiA)** — Tech-press walkthrough of Platform 2. Useful for product framing for US retail delivery, the adjacent business to the Health Care team you'd join.
- **["Zipline: The Largest Autonomous Delivery System on Earth" — Sourcery/Molly O'Shea, Jan 2026](https://www.youtube.com/watch?v=sF5Ocop7A_I)** — CEO breaks down the $7.6B funding round, 2M+ deliveries milestone, and where the company is headed. Most up-to-date financial and strategic context.

### 15.8 Suggested watch order (if time is tight)

If you have 4–5 hours to spend, in this order:

1. **[Keller Rinaudo TED talk](https://www.youtube.com/watch?v=73rUjrow5pI)** (12 min) — mission grounding
2. **["Inside Zipline's Factory" tour](https://www.youtube.com/watch?v=_qbbwichFIk)** (30–40 min) — current operational texture
3. **[Apache Kafka 101 playlist](https://www.youtube.com/playlist?list=PLf38f5LhQtheK16nwnCYFqH23WUUvZfSb)** — episodes on Topics, Partitioning, Producers, Consumers, Replication (~45 min total) — skip the basics you know, watch the configs
4. **["Is Kafka a Database?" — Kleppmann](https://www.youtube.com/watch?v=BuE6JvQE_CY)** (35 min) — the mindset
5. **["Go Concurrency Patterns" — Pike](https://www.youtube.com/watch?v=f6kdp27TYZs)** (52 min) — language grounding
6. **["Best Practices for Tuning Slow Postgres Queries" — Fittl](https://www.youtube.com/watch?v=ng6dKtrHAtE)** (45 min) — direct JD overlap
7. **Two [ByteByteGo](https://www.youtube.com/@ByteByteGo) system-design videos** on topics you feel rustiest about (20 min)
8. **One [Jordan Has No Life](https://www.youtube.com/@jordanhasnolife5163) full walkthrough** of a design problem adjacent to logistics — 45–60 min — for the full senior-level muscle

That's roughly 4.5–5 hours and covers every major area of the loop.

---

## 16. Final checklist

**Round-2-specific:**
- [ ] Four business-impact stories from §3.4 written out, with trade-off line and outcome line memorized
- [ ] Architecture framework from §3.2 rehearsed out loud, end-to-end, on at least two dashboard prompts
- [ ] Strangler-fig playbook from §3.3 in your speaking voice; three practice walkthroughs done
- [ ] Senior-signal phrases from §3.5 read out loud and internalized

**General:**
- [ ] Have a 60-second company pitch: what Zipline does, why this team, why you
- [ ] Gohlay 90-second explainer rehearsed
- [ ] AFS Delayed Message Delivery story tight (problem → Kafka+Redis approach → scale numbers if you have them → what you'd do differently)
- [ ] Two system-design scenarios whiteboarded in advance (§7.1, §7.2)
- [ ] Three sharp questions ready, different for different interviewer roles
- [ ] LinkedIn / GitHub public profile reviewed; pinned repos include Gohlay
- [ ] A short written "why Zipline" paragraph you can pull from in any interviewer-asked-why-us moment
