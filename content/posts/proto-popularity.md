---
title: Why are Protobufs not more popular? - WIP
date: 2026-02-14T05:00:00.000Z
summary: Protobuf schemas get overlooked because most developers have only ever worked with JSON
draft: false
tags:
- devrel
- protobuf
- api
---

> AI-assisted: I developed the arguments and references in this post. Claude helped organize and expand the draft.

It isn't about he protocol it is about the schema. You don't need to give up REST to get the benefits of Protobufs.

## Contract-first is a different mindset

Some developers naturally think in terms of defining the contract before writing any code. The service, its methods, its message types, all defined up front. Then tooling generates everything from that definition.

- SOAP did this with XML/WSDL, gRPC does it with Protobuf. Different eras, same instinct.
- The wire format is not the concern. The contract is the source of truth.
- Define the contract, generate the code, trust the process.

## JSON is the default

JSON is human-readable, universally supported, and works everywhere. Curl, browser dev tools, Postman, every language. That's a real strength and it's why JSON became the default format for APIs. Nothing wrong with that.

- JSON doesn't have a built-in schema. The shape of the data is implied by the code. Schema definitions (OpenAPI, Swagger, JSON Schema) are often added as an afterthought.
- Most teams build code-first and generate docs later. Contract-first (or "design-first") requires defining the schema before writing business logic. That's a different workflow that takes looking at the problem different.

## Most developers have only used one approach

JSON's ubiquity means fewer developers actively think about their serialization or schema choice. It's just what you use.

- BaaS platforms (Firebase, Supabase) abstract the API layer. The data format is hidden behind an SDK call.
- Heavy frameworks and vibe coding generate the API layer. AI defaults to JSON because that's what the training data contains.
- JSON is the default because so many before already chose it. The well worn path, not an active decision.
- Most developers haven't had the opportunity to try contract-first development.

## Bringing attention to Protobufs

Rising tides float all boats. The goal is to teach developers another way to define their APIs that opens up more opportunities.

- A `.proto` file defines message types and service contracts in one place. Single definition, everything generated from it.
- The schema is the source of truth, not the code. You define the contract first, then generate clients, servers, and docs from it.
- Any object that leaves the application boundary (DTOs, API responses, events, messages) can be defined as a Protobuf message from the start. That schema becomes shareable across any service that needs it, regardless of language. Two Go services, a Python worker, and a TypeScript frontend can all generate types from the same `.proto` file.
- Tools like `buf` (bufbuild/buf) handle linting, formatting, and breaking change detection against that definition. The schema has its own development lifecycle.
- `protovalidate` (bufbuild/protovalidate) adds validation rules directly in the `.proto` file. The contract enforces its own constraints.
- Protobuf forward and backward compatibility reduces breaking changes, lets teams upgrade independently.
- The transport protocol is a separate decision. gRPC, REST (via gRPC-gateway or Envoy transcoding), ConnectRPC (connectrpc/connect-es) all work from the same `.proto` definition. JSON still flows through REST gateways, mapped from the proto contract.
- More OSS projects should offer Protobuf-defined APIs alongside their existing interfaces. Normalizes contract-first thinking.
- Larger projects with explicit service contracts get easier to maintain over time, not harder
- Buf's argument: the real reason to use Protobuf isn't performance, it's that schema-driven development reduces integration failures
- Learning to trust the contract is the real shift

## DevRel strategy

Start with open source tools that already have developer-facing APIs. Contribute Protobuf definitions to real projects.

- Just creating a PR brings awareness. Maintainers and watchers see it, the conversation starts.
- Don't create PRs with AI-generated code. Authenticity earns credibility with maintainers.
- OpenTelemetry (OTel) is a strong starting point. gRPC is already a core transport, data model defined in Protobuf.
- Metrics, traces, and logs are exactly the kind of structured data contracts where Protobuf excels
- Buf's tooling-first DevRel approach (CLI, BSR, Buf Slack) has done more for adoption than performance benchmarks

## Do it live

Stream the contributions. Demystifies the Protobuf workflow for developers who have never touched a `.proto` file.

- Questions answered in real time, friction points become visible and solvable in front of an audience
- VODs, clips, and writeups continue educating after the stream ends
- Each contribution becomes a case study for introducing schema-driven APIs to existing projects

## It is time to reconsider Protobuf - Blog and Talk

The ROI on Protobuf has never been better. The tooling, the ecosystem, and the developer experience have all changed since the common criticisms were written.

- A direct rebuttal to the feedback collected in [I Reviewed 1,000s of Opinions on gRPC](https://konfigthis.com/blog/grpc/). Those criticisms were valid when written. Today each one can either be reversed or is much more nuanced:
    - "Tooling is immature." `buf` CLI, BSR, VS Code and IntelliJ plugins, Postman gRPC support. The tooling gap has closed.
    - "Build process overhead." `buf generate` is one command. Remote plugins via BSR mean you don't need protoc installed locally.
    - "Debugging is hard." `buf curl`, grpcurl, Postman, and ConnectRPC's JSON mode all make inspection straightforward.
    - "No browser support." ConnectRPC works over standard HTTP without a proxy. This is solved.
    - "Load balancing is tricky." Service meshes (Istio, Linkerd, Envoy) handle gRPC-aware load balancing natively now.
    - "It's over-engineering for non-Google scale." The argument was always about performance. The real argument is about schemas. You don't need Google scale to benefit from clear contracts.
- The deciding factor should be: is this project going to have schemas? Schemas almost always matter. If data crosses a boundary, a schema makes that boundry well defined and easier to maintain.
- Protobuf is the most capable schema language available and can be used anywhere schemas are found. API contracts, event schemas, data pipelines, configuration, inter-service messages, and even REST APIs.

## CFP

# It Is Time to Reconsider Protobuf

Protobuf adoption remains low despite years of maturity, but not for the reasons most developers think. The real barrier is not complexity or tooling; it is that most developers have only ever worked with JSON and never had a reason to choose something different. Protobuf does not ask you to compete with JSON on its home turf. It asks you to think about your interfaces differently.

The real case for Protobuf isn't serialization speed. It's contract-first development. One `.proto` file drives type generation across every language in your stack, schema drift becomes a lint error, and breaking changes get caught before they ship. Modern tooling (buf, ConnectRPC, protovalidate) has removed every historical friction point. This talk covers the practical path to adopting Protobuf without abandoning REST or JSON where they already work.

The tooling story has changed significantly. buf handles linting, formatting, and breaking change detection in CI. ConnectRPC works over plain HTTP without a proxy. protovalidate puts validation rules directly in the schema. Postman, VS Code, and IntelliJ all have native support.

This talk walks through the most common criticisms of Protobuf and gRPC, acknowledges where they came from, and shows what has changed. You'll see the current state of the tooling, a practical workflow for adopting Protobuf schemas in an existing project, and why the real ROI is in schema-driven development, not raw throughput.

## Talk outline

> 15 min lightning. Budget ~13 min of content, 2 min of slack. No live demo, screen recordings only. No Q&A built in.

1. The hook: watch what happens around every new protocol (1 min)
    - MCP is the newest protocol most of this room has touched. It's JSON-RPC, and in December 2025 its maintainers decided transports should be pluggable rather than blessing new official ones.
    - Google withdrew its dedicated gRPC transport proposal, because with pluggable transports it wasn't needed.
    - Buf then published a full Protobuf mapping of MCP anyway, the same way they've shown up next to every other protocol.
    - That's the pattern worth noticing. Schema tooling arrives next to whatever the new thing is, because the schema question is independent of the protocol question. Hold that thought.
2. You remember the bumpy years (2 min)
    - Most of this room formed an opinion about Protobuf and gRPC somewhere between 2016 and 2020, and it was rough: protoc in your build, no browser story, thin IDE support, "you're not Google."
    - Source it honestly from [I Reviewed 1,000s of Opinions on gRPC](https://konfigthis.com/blog/grpc/) so nobody thinks you're strawmanning. Those complaints were correct.
    - Say plainly that you're not here to argue the complaints were wrong. You're here because the thing they were about has changed underneath them.
    - Do not attempt a point-by-point rebuttal. It reads as defensive and burns the clock.
3. The reframe: Protobuf is a schema language (4 min)
    - This is the talk. Everything before it is setup, everything after is evidence.
    - Any object crossing an application boundary is a candidate: DTOs, events, API responses, config.
    - Kafka and Confluent Schema Registry treat Protobuf as a first-class schema with zero gRPC involved. Strongest proof that schema and transport are separate decisions, and most of the room hasn't connected it.
    - Forward and backward compatibility as a built-in property, not a versioning convention you maintain by hand.
    - Land the line: the deciding question is not "do I need gRPC," it's "does data cross a boundary here."
4. It became first-class while you weren't looking (4 min)
    - The point of this section is accumulation, not any single item. Nobody announced "Protobuf is ready now." It arrived one platform at a time, starting at the infrastructure edge and working inward toward the code you write.
    - Run it as a timeline slide, roughly one line each, fast:
        - 2020: AWS ALB routes gRPC natively with end-to-end HTTP/2. Confluent Schema Registry makes Protobuf first-class alongside Avro.
        - 2022: Postman ships gRPC support. The "you can't just poke at it" objection loses its tool of choice.
        - 2023: Kubernetes 1.27 promotes native gRPC health probes to GA. No sidecar, no wrapper binary.
        - 2025: gRPC Swift 2 lands as a full async/await rewrite. Tonic is donated into the gRPC project under CNCF and becomes the official Rust implementation. `protovalidate` reaches v1.0.
        - 2026: Protobuf gets a real language server. Spring Boot 4.1 ships first-party gRPC auto-configuration for server, client, and test.
    - Then slow down and show exactly one of them. The LSP is the right pick: a twenty-second screen recording of go-to-definition and completion inside a `.proto` does more than any claim you can make out loud.
    - Second artifact if time allows: `buf breaking` failing in CI on a renamed field. One screenshot, no narration.
    - The line that ties it together: none of these were Protobuf asking for special treatment. Each one was a platform deciding a schema-defined contract was worth supporting directly.
5. Monday morning (1.5 min)
    - Pick one DTO that already exists in your codebase. Define it as a `.proto`.
    - Generate it alongside your current JSON. Change no transport, delete no code.
    - Add `buf lint` and `buf breaking` to CI. That's the whole first step.
    - The point is that adoption is additive. Nobody has to approve a migration.
6. Close (0.5 min)
    - One slide: the reframe restated, a QR code to the reference list, done.

### Cut for time, deliberately

- Protobuf Editions. Correct, current, and a nuance trap. Invites "is proto3 dead" and costs three minutes.
- The four gRPC streaming types. Transport detail, undercuts the schema thesis.
- Benchmarks and payload-size numbers. Arguing performance concedes the frame.
- BSR and remote plugins. Real value, but it's a second-step concern.
- The remaining four criticisms from the konfig list. Blog material, not stage material.

## Slide outline

> 18 slides, ~10 minutes of narrated content in a 15 minute slot. The remaining time absorbs transitions, a stumble, and a walk-up. Lightning slides move fast; a 20 second slide is normal.

**Rules for this deck**

- One idea per slide. If a slide needs a second bullet to make sense, it's two slides.
- On-slide text is what the audience *reads*, not what I say. Everything else is a speaker note.
- No slide has more than three lines of text. Section dividers have one.
- Code appears at most twice, eight lines maximum, syntax highlighted, no ellipses.
- Screen recordings only, no live demo, no terminal typing on stage.
- No logo grids. A logo grid says "many things support this" without letting anyone verify it.

### Act 1: The pattern (3 slides, ~1 min)

**1. Title** — 10s
> It Is Time to Reconsider Protobuf
> *name, handle, event*

**2. Three dates** — 30s
> Dec 2025 — MCP makes transports pluggable
> Jan 2026 — Google withdraws its gRPC transport proposal
> Jan 2026 — Buf publishes a Protobuf mapping of MCP anyway

*Say:* MCP is the newest protocol most people here have touched. Its maintainers decided not to bless new official transports, so Google's dedicated proposal became unnecessary and they closed it themselves. Buf mapped the protocol to Protobuf regardless.

**3. The pattern** — 20s
> Schema tooling shows up next to every new protocol.

*Say:* Because the schema question is independent of the protocol question. Hold onto that.

### Act 2: The bumpy years (3 slides, ~1.5 min)

**4. When you formed your opinion** — 40s
> You met Protobuf somewhere around 2016–2020.

*Say:* Set the scene concretely: protoc wired into your build, no browser story, a `.proto` file your IDE treated as plain text.

**5. What people actually said** — 40s
> Four short verbatim quotes from [I Reviewed 1,000s of Opinions on gRPC](https://konfigthis.com/blog/grpc/), attributed on-slide.

*Say:* Read two aloud, let the other two land silently. Attribution on screen is what keeps this from reading as a strawman.

**6. They were right** — 20s
> Every one of these was true.

*Say:* I'm not here to tell you those complaints were wrong. I'm here because the thing they were about has changed underneath them.

### Act 3: The reframe (5 slides, ~4 min) — this is the talk

**7. Thesis** — 20s
> Protobuf is a schema language.

*Say:* Nothing more on this slide. Let it sit.

**8. The boundary** — 50s
> Simple diagram: one line labeled "application boundary," four things crossing it — DTOs, events, API responses, config.

*Say:* Anything that crosses this line has a shape. The only question is whether that shape is written down somewhere both sides can generate from.

**9. Protobuf without gRPC** — 40s
> Kafka. Confluent Schema Registry. Protobuf as a first-class schema type.
> No gRPC anywhere in this picture.

*Say:* This is the proof that schema and transport are separate decisions. Most people have never connected these two facts.

**10. Compatibility is a property, not a practice** — 50s
> Eight-line `.proto` diff: add a field, bump nothing, old readers keep working.

*Say:* Contrast with the alternative: a version key in a JSON envelope and a code review convention nobody wrote down.

**11. The question** — 40s
> Not "do I need gRPC?"
> "Does data cross a boundary here?"

*Say:* This is the one line to remember from the talk. Say it, pause, move on.

### Act 4: It became first-class (4 slides, ~3 min)

**12. Timeline** — 60s
> 2020 — AWS ALB routes gRPC natively · Confluent makes Protobuf first-class
> 2022 — Postman ships gRPC support
> 2023 — Kubernetes 1.27: native gRPC health probes GA
> 2025 — gRPC Swift 2 · Tonic becomes official gRPC-Rust under CNCF · protovalidate v1.0
> 2026 — Protobuf gets a language server · Spring Boot 4.1 ships first-party gRPC

*Say:* Build the rows one at a time. The shape is the argument: infrastructure first, then tooling, then orchestration, then languages, then frameworks. It worked inward toward the code you write.

**13. Screen recording: the LSP** — 40s
> Silent 20 second capture. Go-to-definition across files, then completion inside a message.

*Say:* January 2026. This is the single slide that retires "the tooling is rough," because it demonstrates instead of claiming.

**14. Screenshot: `buf breaking` in CI** — 30s
> A failed check on a renamed field. Red, unambiguous, no narration.

*Say:* Schema drift becomes a build failure instead of a production incident.

**15. Nobody announced this** — 20s
> No one shipped a press release saying Protobuf was ready.

*Say:* Each of those platforms independently decided a schema-defined contract was worth supporting directly. That's what a technology maturing actually looks like.

### Act 5: What to do (3 slides, ~1.5 min)

**16. Monday morning** — 60s
> 1. Pick one DTO you already have. Define it as a `.proto`.
> 2. Generate it next to your existing JSON.
> 3. Add `buf lint` and `buf breaking` to CI.

*Say:* Change no transport. Delete no code. This is the entire first step.

**17. Adoption is additive** — 20s
> Nobody has to approve a migration.

*Say:* This is why the first step is safe to take without a meeting.

**18. Close** — 20s
> Does data cross a boundary here?
> *QR code to the reference list*

### Assets to produce

- [ ] Screen recording: Protobuf LSP go-to-definition and completion, 20s, no audio, large font
- [ ] Screenshot: `buf breaking` failing a CI check on a renamed field
- [ ] Diagram: application boundary with four objects crossing it
- [ ] Eight-line `.proto` diff showing an added field
- [ ] Four attributed quotes pulled from the konfig post
- [ ] Timeline slide with five rows, built progressively
- [ ] QR code to the published reference list

### Slides deliberately not made

- A logo grid of supporting languages. The timeline makes the same point with evidence and a shape.
- Any benchmark chart. Putting a performance number on screen concedes the frame, and the whole talk argues performance was never the point.
- A gRPC streaming diagram. Transport detail that pulls against the schema thesis.
- A Protobuf Editions slide. Correct and current, but it invites "so is proto3 dead?" and costs three minutes I don't have.
- An architecture diagram of gateways and proxies. If someone needs it, they need a different, longer talk.

## Target audience
Polyglot developers, API designers, and platform engineers who evaluated Protobuf or gRPC in the past and decided against it, or who have only ever worked with JSON APIs.

## Takeaways
- The Protobuf tooling ecosystem has matured to the point where the old friction points simply don't exist for most use cases
- Protobuf is a schema language, not just a serialization format or a gRPC dependency
- You can adopt Protobuf schemas without giving up REST or JSON
- Schema-driven development reduces integration failures regardless of project scale

---

## References

### Schema-driven development and the case for Protobuf
- [The real reason to use Protobuf is not performance](https://buf.build/blog/the-real-reason-to-use-protobuf) - Buf's argument that schema-driven development (not speed) is why Protobuf matters
- [API Design-First vs. Code First](https://blog.stoplight.io/api-design-first-vs-code-first) - Stoplight on why defining contracts before writing code reduces rework

### Protobuf compatibility and schema evolution
- [Protobuf Language Guide: Updating A Message Type](https://protobuf.dev/programming-guides/proto3/) - Official Google docs on safe field changes and wire compatibility
- [Protobuf Dos and Don'ts](https://protobuf.dev/best-practices/dos-donts/) - Official best practices for evolving schemas
- [Backward and Forward Compatibility with Protocol Buffers](https://earthly.dev/blog/backward-and-forward-compatibility/) - Practical walkthrough of Protobuf's extensibility model

### Bridging REST and gRPC
- [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) - Generates a REST reverse-proxy from .proto service definitions
- [Envoy gRPC-JSON Transcoder](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/grpc_json_transcoder_filter) - Infrastructure-level REST-to-gRPC translation
- [gRPC-Web](https://github.com/grpc/grpc-web) - Browser client support for gRPC via proxy

### Tooling and ecosystem
- [Buf Schema Registry (BSR)](https://buf.build/product/bsr) - Hosted Protobuf registry with dependency management and generated SDKs
- [Protobuf finally has LSP support. You're welcome.](https://buf.build/blog/protobuf-lsp) - Buf ships the first production-grade Protobuf language server (Jan 2026), closing the "IDE support is bad" criticism
- [Introducing the next generation of the Buf CLI](https://buf.build/blog/buf-cli-next-generation) - v2 config format, monorepos as first-class citizens, `buf config migrate`
- [protovalidate](https://github.com/bufbuild/protovalidate) - Validation rules declared in the schema; reached v1.0 in September 2025
- [OpenTelemetry Protocol (OTLP) Specification](https://opentelemetry.io/docs/specs/otlp/) - Real-world example of Protobuf as an industry-standard wire format
- [opentelemetry-proto](https://github.com/open-telemetry/opentelemetry-proto) - The actual .proto definitions for OTel's data model

### Protobuf Editions
- [Protobuf Editions Overview](https://protobuf.dev/editions/overview/) - Official docs on replacing `syntax = "proto3"` with `edition = "2024"`
- [Protobuf Editions are here: don't panic](https://buf.build/blog/protobuf-editions-are-here) - Buf's take: editions are a feature-flag refactor, most users should stay on proto3 for now
- [Protobuf Editions explained](https://kreya.app/blog/protobuf-editions-explained/) - Practical walkthrough of what changes and what doesn't
- [Protobuf changes announced June 27, 2025](https://protobuf.dev/news/2025-06-27/) - Edition 2024 release timeline

### ConnectRPC and the browser story
- [Making gRPC more approachable with ConnectRPC](https://kmcd.dev/posts/connectrpc/) - Introduction to Connect's HTTP/1.1 + JSON approach
- [ConnectRPC: Where is it now?](https://kmcd.dev/posts/connectrpc-where-is-it-now/) - Two-year retrospective (May 2026) covering remote plugins, LSP, protovalidate, FauxRPC, OpenAPI generation
- [Why Smart Teams Are Betting on ConnectRPC Over Standard gRPC](https://alamrafiul.com/posts/connectrpc-vs-grpc/) - Side-by-side comparison of ergonomics and debuggability
- [Connect RPC vs. Google gRPC: Conformance Deep Dive](https://buf.build/blog/grpc-conformance-deep-dive) - How Connect implementations measure against the gRPC spec

### First-class support, platform by platform
> The timeline behind the talk's central claim: Protobuf and gRPC support arrived incrementally across the industry, starting at the infrastructure edge and working inward.

- [ALB support for end-to-end HTTP/2 and gRPC](https://aws.amazon.com/blogs/aws/new-application-load-balancer-support-for-end-to-end-http-2-and-grpc) - AWS, October 2020. gRPC-aware routing, health checks, and access logs at the load balancer
- [Protobuf Schema Serializer and Deserializer](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/serdes-protobuf.html) - Confluent Platform 5.5 (2020) made Protobuf a first-class schema type alongside Avro
- [Postman Now Supports gRPC](https://blog.postman.com/postman-now-supports-grpc/) - January 2022 open beta, GA with Postman v10
- [Kubernetes 1.24: gRPC container probes in beta](https://kubernetes.io/blog/2022/05/13/grpc-probes-now-in-beta/) - Alpha in 1.23, beta in 1.24, GA in 1.27. Native gRPC health checking with no wrapper binary
- [Introducing gRPC Swift 2](https://www.swift.org/blog/grpc-swift-2/) - February 2025. Full async/await rewrite with pluggable transports and client-side load balancing
- [gRPC-Rust Preview Release](https://grpc.io/blog/grpc-rust-announcement/) - Tonic donated into the gRPC project under CNCF as the official Rust implementation
- [Spring Boot 4.1 Adds gRPC Auto-Configuration](https://www.infoq.com/news/2026/06/spring-boot-4-1/) - June 2026. Server, client, testing, SSL, security, and health indicators all auto-configured
- [Supported languages](https://grpc.io/docs/languages/) - The current roster, 15+ languages

### Language and framework integration
- [The Ultimate Guide to Spring gRPC](https://stevenpg.com/posts/ultimate-guide-spring-grpc/) - Deep dive on Spring Boot 4.1's first-party gRPC support: all four RPC types, error mapping, interceptors, metadata, deadlines, TLS, testing
- [Getting Started with Spring gRPC in Spring Boot 4.1](https://www.danvega.dev/blog/spring-grpc-spring-boot-4-1) - Shorter intro to the auto-configuration and client injection story (June 2026)
- [spring-grpc](https://github.com/spring-projects/spring-grpc) - The Spring project itself
- [gRPC-Rust Roadmap](https://grpc.io/blog/grpc-rust-roadmap/) - Where the Rust implementation is headed after the Tonic donation

### Protobuf beyond RPC: events and data pipelines
- [Why a Protobuf schema registry?](https://buf.build/blog/why-a-protobuf-schema-registry) - Buf's case for schemas as a governed artifact, not a build detail
- [Bufstream schema providers](https://buf.build/docs/bufstream/schema-providers/) - Broker-side schema awareness for Kafka topics, Confluent Schema Registry API compatible
- [How to use Protobuf with Apache Kafka and Schema Registry](https://codingharbour.com/apache-kafka/how-to-use-protobuf-with-apache-kafka-and-schema-registry/) - Hands-on walkthrough

### Running it in production
- [Six Lessons from Production gRPC](https://speedscale.com/blog/six-lessons-from-production-grpc/) - Operational friction points and how teams work around them
- [Running gRPC at Scale: Lessons From the Frontlines of Production](https://tldrecap.tech/posts/2025/grpconf-india/grpc-scaling-production/) - gRPConf India talk recap on multi-region throughput, load balancing, observability

### Developer sentiment and community discourse
- [I Reviewed 1,000s of Opinions on gRPC](https://konfigthis.com/blog/grpc/) - Synthesizes developer opinions from Reddit, HN, Twitter, and YouTube
- [HN: Can somebody please explain why we would use gRPC?](https://news.ycombinator.com/item?id=24944452) - Candid practitioner discussion on gRPC's value and friction points
- [HN: A detailed comparison of REST and gRPC](https://news.ycombinator.com/item?id=35711196) - Real-world experience reports on the REST vs gRPC tradeoff

### Protobuf/gRPC momentum
- [Google Pushes for gRPC Support in Model Context Protocol](https://www.infoq.com/news/2026/02/google-grpc-mcp-transport/) - Google Cloud contributing gRPC transport to Anthropic's MCP (Feb 2026)
- [A gRPC Transport for the Model Context Protocol](https://cloud.google.com/blog/products/networking/grpc-as-a-native-transport-for-mcp/) - Google Cloud's own announcement (Jan 2026), with the full argument for binary encoding, mTLS, and method-level authorization
- [SEP-1352: Add gRPC as a transport](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1352) - Withdrawn by its Google authors on Jan 14, 2026 in favor of pluggable transports. The discussion thread is the real value: a live argument over whether schema-first belongs in a JSON-RPC protocol
- [The Future of MCP Transports](https://blog.modelcontextprotocol.io/posts/2025-12-19-mcp-transport-future/#official-and-custom-transports) - The decision that made SEP-1352 unnecessary. gRPC ships as a custom transport, not an official one
- [The 2026 MCP Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/) - "We are not adding more official transports this cycle." Keeps the momentum claim honest
- [bufbuild/mcp-proto](https://github.com/bufbuild/mcp-proto) - Buf's Protobuf mapping of the MCP protocol, open-sourced in response to the SEP-1352 discussion. A worked example of retrofitting a schema onto a JSON-native protocol
- [gRPC and AI: A Powerful Partnership](https://grpc.io/blog/grpc-and-ai/) - How LLMs shorten the proto-authoring and test-generation loop
- [gRPConf 2025](https://grpc.io/blog/grpconf-2025-announcement/) - A dedicated conference is itself a signal of ecosystem health; gRPConf 2026 follows Sept 3 at the Computer History Museum
