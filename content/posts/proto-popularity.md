---
title: Why are Protobufs not more popular? - WIP
date: 2025-02-14T05:00:00.000Z
summary: Teaching developers to think contract-first and giving them more protocol options
draft: false
tags:
- devrel
- protobuf
- api
---


## RPC protocols are a different mindset

Some developers naturally think in terms of remote procedure calls. They define a service, its methods, and its message types, then let tooling handle the rest.

- SOAP did this with XML/WSDL, gRPC does it with Protobuf. Different eras, same contract-first instinct
- The wire format (binary, XML, whatever) is not the concern, the contract is the source of truth
- Define the contract, generate the code, trust the process

## REST developers built trust through visibility

Most developers want to see what's on the wire. JSON is human-readable, curl works out of the box, browser dev tools show every request and response. That visibility builds trust and it's a legitimate reason REST became the default.

- Contract-first (or "design-first") APIs require defining the schema before writing business logic. Feels like overhead.
- REST schema definitions (OpenAPI, Swagger) are often generated after the code is written. Documentation, not source of truth.
- REST tooling is mature: Postman, curl, browser dev tools, decades of Stack Overflow answers. That ecosystem is where most devs first learn to build.

## Fewer developers are choosing their protocol

The visibility that drew developers to REST is something fewer of them actively use today. Not a knock on REST, just how the landscape has shifted.

- BaaS platforms (Firebase, Supabase) abstract the API layer. The HTTP request is hidden behind an SDK call.
- Heavy frameworks and vibe coding generate API contracts. AI defaults to REST because that's what the training data contains.
- REST is the default because so many before already chose it. The well worn path, not an active decision.
- Many developers have never seriously evaluated alternatives.

## Bringing attention to Protobufs

Rising tides float all boats. Not about replacing REST with gRPC. About teaching developers to think contract-first and choose the right protocol for the task.

- Protobuf is a serialization format, not an RPC protocol. gRPC is the RPC framework built on top of it.
- The `.proto` file defines both message types and service contracts in one place. Single definition, everything generated from it. Tools like `buf` (bufbuild/buf) handle linting, formatting, and breaking change detection against that definition.
- `.proto` doesn't lock you into gRPC. gRPC-gateway and Envoy transcoding serve both gRPC and REST from the same contract.
- REST and gRPC coexist, the protocol becomes a delivery choice
- More OSS projects should offer Protobuf-defined APIs alongside existing REST. Normalizes contract-first thinking.
- Protobuf forward and backward compatibility reduces breaking changes, lets teams upgrade independently. `protovalidate` (bufbuild/protovalidate) adds validation rules directly in the `.proto` file, so the contract enforces its own constraints.
- gRPC has constraints: no native browser support (HTTP/2 binary framing). gRPC-Web is one workaround, ConnectRPC (connectrpc/connect-es) is another that works over standard HTTP without a special proxy. This is why coexistence matters.
- Use gRPC where it fits (service-to-service, internal APIs, streaming), REST where it fits (browser clients, public APIs)
- Once developers think contract-first, the protocol question becomes secondary
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
