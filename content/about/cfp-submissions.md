# CFP Submissions

---

## It Is Time to Reconsider Protobuf

**Session Title**

It Is Time to Reconsider Protobuf

---

**Description**

Protobuf adoption remains low despite years of maturity, but not for the reasons most developers think. The real barrier is not complexity or tooling; it is that most developers have only ever worked with JSON and never had a reason to choose something different. Protobuf does not ask you to compete with JSON on its home turf. It asks you to think about your interfaces differently.

The underappreciated case for Protobuf is not serialization speed. It is contract-first development. When a single `.proto` file is the source of truth, every consumer in every language generates its types from the same definition. Schema drift becomes a lint error. Breaking changes get caught before they ship. This is a fundamentally different workflow from retrofitting OpenAPI onto an existing REST API and calling it a schema.

Modern tooling has removed every historical friction point. The buf CLI handles linting, formatting, and breaking change detection. ConnectRPC works over plain HTTP without a sidecar. protovalidate puts field validation rules directly in the schema. Postman, VS Code, and IntelliJ all have native support today.

This talk walks through the practical case for adopting Protobuf in a polyglot service environment without abandoning REST or JSON where they already work. You will leave with a clear mental model for where Protobuf adds the most value and a concrete path to start using it on your next project.

---

**Small print**

Target audience: polyglot developers, API designers, and platform engineers who have dismissed gRPC or Protobuf in the past or have only worked with JSON-based APIs. No prior experience with Protobuf or gRPC required.

Preferred duration: 25 minutes, adaptable to a 45-minute deep dive or a lightning talk format.

First public delivery: yes, this would be the first time presenting this material.

No special technical requirements beyond slides and a projector.

---

---

## Building a User-Facing Audit Log Archive with OpenTelemetry and DuckDB

**Session Title**

Building a User-Facing Audit Log Archive with OpenTelemetry and DuckDB

---

**Description**

If your application is already instrumented with OpenTelemetry, you are already collecting the data you need for a user-facing audit log. File uploads, document edits, payments, permission changes: they all show up as spans. The problem is that audit-relevant events are buried under infrastructure noise, and nobody has built a path to surface them.

This talk shows how to filter business events out of your OTEL telemetry pipeline, write them to tiered object storage, and query them with DuckDB. No new databases. No managed services. No per-query cost. The entire stack is open-source and your data lives in plain JSONL files on S3 or GCS.

The key numbers: filtering OTEL spans down to audit events reduces storage volume by 92%. A denormalized DuckDB warm path brings single-transaction lookups from 52 seconds on raw JSONL down to 23 milliseconds. That is a 2,200x improvement with no server to manage. A single Protobuf schema ties the ingestion pipeline and the search API together so event classification stays consistent as your system evolves.

You will leave with a working architecture for tiered audit storage, practical DuckDB patterns for querying OTEL's nested span structure, and a clear understanding of where this approach is the right fit versus when you actually need a dedicated observability platform.

---

**Small print**

Target audience: backend, platform, and DevOps engineers working with OpenTelemetry who want audit log capabilities without adding managed infrastructure. Familiarity with OTEL concepts (spans, attributes) is helpful but not required.

Preferred duration: 30 to 40 minutes. The talk includes code examples and benchmark data that benefit from time to breathe.

First public delivery: yes, this would be the first time presenting this material.

No special AV requirements beyond code examples on screen.

---

---

## Schemas Are the Interface: Why Structure Matters More in the Age of AI Agents

**Session Title**

Schemas Are the Interface: Why Structure Matters More in the Age of AI Agents

---

**Description**

Schemas have always been the right way to define how systems exchange data. OpenAPI, AsyncAPI, Protobuf, CloudEvents. The case for contract-first development is well established: type safety, code generation, breaking change detection, independent service evolution. But adoption remained optional. Teams could skip the schema, ship raw JSON, and deal with the consequences later.

AI agents changed the math. When an LLM decides which tool to invoke, it reads a schema. MCP tool definitions are JSON Schema. OpenAI function calling requires typed parameter declarations. Google's Agent Development Kit generates callable tools directly from OpenAPI specifications, using the summary and description fields to guide tool selection. The model does not read your source code or your documentation site. It reads the schema. A missing description is no longer a documentation gap. It is a capability gap. An imprecise type is no longer a developer annoyance. It is a source of hallucination.

This talk connects the decades-old case for schema-driven development to the new reality of AI agent tooling. You will see how MCP, OpenAI Structured Outputs, and Google ADK all depend on the same foundation: machine-readable, semantically annotated schemas. You will also see why Google is pushing gRPC and Protobuf as a transport layer for MCP, and what this means for how you design APIs and define contracts going forward. The schema is no longer just the contract between your services. It is the interface your AI agents reason against.

---

**Small print**

Target audience: backend developers, API designers, platform engineers, and anyone building or integrating with AI agent tooling (MCP servers, function calling, agentic workflows). Also relevant for engineering leaders thinking about how their API strategy intersects with AI adoption. No prior AI agent experience required.

Preferred duration: 25 minutes, adaptable to a lightning talk or a 45-minute deep dive with live demos.

First public delivery: yes, this would be the first time presenting this material.

No special AV requirements beyond code examples and a projector.

---

---

## The Mikado Method in the Age of AI Agents

**Session Title**

The Mikado Method in the Age of AI Agents

---

**Description**

The Mikado Method is a structured technique from 2014 for making large architectural changes to a codebase without breaking the build at any point along the way. The core loop is simple: set a goal, attempt it naively, visualize the dependencies that block you as a graph, undo the broken attempt, and work through the graph leaves first until the original goal becomes unblocked. It is one of the clearest frameworks for thinking about how software change actually works.

There is one practical problem. The undo step is emotionally and temporally costly for humans. Discarding hours of work to start from a cleaner state requires discipline that most teams do not sustain under deadline pressure. The method works in theory and breaks down in practice.

AI coding agents invert that cost structure. Discarding a branch costs tokens and seconds, not hours. The friction that made Mikado hard for humans disappears entirely. The human's job shifts from writing the implementation to discovering prerequisites and maintaining the dependency graph. The agent handles the attempt. You handle the map.

This talk walks through how to apply Mikado thinking to AI-assisted development: how to write specs that produce useful failures, how to turn those failures into graph nodes, how to assign leaf-node tasks to fresh agent sessions, and how to know when a branch is done. It also covers the limits: where the graph becomes too expensive to maintain and when a simpler approach is the right call.

---

**Small print**

Target audience: developers and technical leads using AI coding agents (Copilot, Cursor, Claude Code, or similar) for non-trivial implementation work. Familiarity with AI coding assistants is assumed; no prior knowledge of the Mikado Method required.

Preferred duration: 25 to 30 minutes.

First public delivery: yes, this would be the first time presenting this material.

No special AV requirements beyond slides and a projector.
