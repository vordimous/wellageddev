---
title: Why are Protobufs not more popular? - WIP
date: 2025-02-14T05:00:00.000Z
summary: Protobuf schemas get overlooked because most developers have only ever worked with JSON
draft: false
tags:
- devrel
- protobuf
- api
---

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
- [OpenTelemetry Protocol (OTLP) Specification](https://opentelemetry.io/docs/specs/otlp/) - Real-world example of Protobuf as an industry-standard wire format
- [opentelemetry-proto](https://github.com/open-telemetry/opentelemetry-proto) - The actual .proto definitions for OTel's data model

### Developer sentiment and community discourse
- [I Reviewed 1,000s of Opinions on gRPC](https://konfigthis.com/blog/grpc/) - Synthesizes developer opinions from Reddit, HN, Twitter, and YouTube
- [HN: Can somebody please explain why we would use gRPC?](https://news.ycombinator.com/item?id=24944452) - Candid practitioner discussion on gRPC's value and friction points
- [HN: A detailed comparison of REST and gRPC](https://news.ycombinator.com/item?id=35711196) - Real-world experience reports on the REST vs gRPC tradeoff

### Protobuf/gRPC momentum
- [Google Pushes for gRPC Support in Model Context Protocol](https://www.infoq.com/news/2026/02/google-grpc-mcp-transport/) - Google Cloud contributing gRPC transport to Anthropic's MCP (Feb 2026)
