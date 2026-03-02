# CFP Submissions

---

## It Is Time to Reconsider Protobuf

**Session Title**

It Is Time to Reconsider Protobuf

---

**Description**

Protobuf adoption remains low despite years of maturity, but not for the reasons most developers think. The real barrier is not complexity or tooling; it is that most developers have only ever worked with JSON and never had a reason to choose something different. Protobuf does not ask you to compete with JSON on its home turf. It asks you to think about your interfaces differently.

The real case for Protobuf isn't serialization speed. It's contract-first development. One `.proto` file drives type generation across every language in your stack, schema drift becomes a lint error, and breaking changes get caught before they ship. Modern tooling (buf, ConnectRPC, protovalidate) has removed every historical friction point. This talk covers the practical path to adopting Protobuf without abandoning REST or JSON where they already work.

The tooling story has changed significantly. buf handles linting, formatting, and breaking change detection in CI. ConnectRPC works over plain HTTP without a proxy. protovalidate puts validation rules directly in the schema. Postman, VS Code, and IntelliJ all have native support.

---

**Small print**

Audience: polyglot developers, API designers, platform engineers who dismissed gRPC or Protobuf in the past. No prior Protobuf experience required.

Duration: 25 min, adaptable to a lightning talk or 45-min deep dive.

First delivery. No special requirements.

---

---

## Building a User-Facing Audit Log Archive with OpenTelemetry and DuckDB

**Session Title**

Building a User-Facing Audit Log Archive with OpenTelemetry and DuckDB

---

**Description**

Your OTEL traces already contain every business event your users care about: file uploads, payments, and document changes. This talk shows how to filter that data out of the infrastructure noise, store it in S3 or GCS as plain JSONL, and query it with DuckDB. Filtering down to audit events cuts storage by 92%; the DuckDB warm path is 2,200x faster than scanning raw JSONL. No new databases, no managed services, no per-query cost.

Tiered storage is the key architectural decision. Hot queries hit an in-memory cache; warm queries hit a denormalized DuckDB file (23ms); cold queries hit JSONL on object storage (single-digit seconds). Each tier serves a different query pattern without forcing everything through one system.

A single Protobuf schema ties the ingestion pipeline and search API together, so event classification stays consistent as the system evolves.

---

**Small print**

Audience: backend, platform, and DevOps engineers working with OpenTelemetry. Familiarity with OTEL concepts (spans, attributes) is helpful but not required.

Duration: 30–40 min. Talk includes code examples and benchmark data.

First delivery. No special requirements.

---

---

## Schemas Are the Interface: Why Structure Matters More in the Age of AI Agents

**Session Title**

Schemas Are the Interface: Why Structure Matters More in the Age of AI Agents

---

**Description**

When an LLM picks a tool to invoke, it reads your schema, not your docs or source code. A missing description is a capability gap. An imprecise type is a source of hallucination. This talk connects the existing case for contract-first development (OpenAPI, Protobuf, JSON Schema) to what AI agent tooling actually requires from your API contracts, covering MCP, OpenAI function calling, and Google ADK.

Schema quality is now a correctness requirement, not a best practice. Vague descriptions cause wrong tool selection. Missing fields mean tools that agents can't reliably use. Schema drift breaks automated pipelines in ways that are harder to debug than a broken unit test.

Google contributing gRPC transport to MCP in early 2026 is the clearest signal of where this is heading: strict Protobuf typing at the transport layer plus semantic MCP descriptions at the tooling layer. Both matter.

---

**Small print**

Audience: backend developers, API designers, platform engineers, and engineering leaders thinking about AI agent integration. No prior AI agent experience required.

Duration: 25 min, adaptable to a lightning talk or 45-min deep dive with live demos.

First delivery. No special requirements.

---

---

## The Mikado Method in the Age of AI Agents

**Session Title**

The Mikado Method in the Age of AI Agents

---

**Description**

The Mikado Method (attempt a change naively, map what blocks you as a graph, undo, work the leaves first) has always been a sound way to approach large refactors. The reason it doesn't stick is the undo step: discarding hours of work is hard for humans under deadline pressure. AI coding agents invert that cost. A discarded branch costs seconds. This talk covers how to apply the method when the agent handles the attempts and you maintain the graph.

The human's job changes when agents do the implementation. Prerequisite discovery and graph maintenance become the primary skill: writing specs that produce useful failures, turning those failures into graph nodes, and assigning leaf tasks to fresh agent sessions.

The method has limits, and ignoring them is how you end up with a graph that costs more to maintain than it saves. The talk covers when to reach for something simpler.

---

**Small print**

Audience: developers and technical leads using AI coding agents (Copilot, Cursor, Claude Code) for non-trivial implementation work. No prior knowledge of the Mikado Method required.

Duration: 25–30 min. adaptable to a lightning talk

First delivery. No special requirements.
