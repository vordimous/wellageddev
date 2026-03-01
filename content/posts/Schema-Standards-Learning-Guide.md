---
title: Understanding Schemas and Message Types in Enterprise Data Integration
date: 2026-02-18T05:00:00.000Z
summary: Exploring OpenAPI, AsyncAPI, CloudEvents, Schema Registry, OpenTelemetry Semantic Conventions, EDI, and More - A Learning Resource for Technical Product Managers
tags:
- schema
- openapi
- asyncapi
- cloudevents
- enterprise-integration
- edi
- schema-registry
- opentelemetry
- protobuf
---

> AI-assisted: I researched the topics covered here, developed the outline and key arguments, and used Claude to help draft and compile the final post. All content was reviewed for accuracy, and quotes and statistics are attributed with source links.
> 
> Content sourced from MuleSoft, Boomi, WSO2, Solace, Confluent, CNCF, Capital One, eBay, and other industry leaders. All quotes and statistics are attributed with source links.



## Executive Summary

In the middleware and enterprise integration industry, schemas and message standards are not merely technical details. They are foundational contracts that enable systems to exchange business data reliably at scale. This document explores why leading integration platforms like MuleSoft, Boomi, WSO2, and others are investing heavily in open standards, and why products that understand, respect, and utilize schema definitions deliver superior business value.

**The core business problem:** Your order management system needs to send purchase orders to your ERP. Your ERP needs to update your warehouse system. Your warehouse system needs to notify your shipping provider. Each system was built by different vendors with different assumptions about data formats. Without standardized schemas, every integration becomes a custom project. Expensive, fragile, and difficult to maintain.

**The solution:** Schema standards like OpenAPI, AsyncAPI, CloudEvents, and Schema Registry provide common "contracts" that define how systems exchange data. With them, organizations gain interoperability, governance, and the ability to evolve systems without breaking downstream business processes.

---

## 1. Why Schemas Matter in Enterprise Integration

### 1.1 The Problem of Integration Chaos

Consider a typical business scenario: your order management system needs to send purchase order data to your ERP, your warehouse management system, and your supplier's fulfillment platform. Each system was built by a different vendor, at a different time, with different assumptions about how a "purchase order" should be structured.

The problem? Every system describes the same business data differently. The lack of a common way of describing business transactions means developers are constantly re-learning how to exchange data with each new system. This also limits the potential for reusable tools and infrastructure to aid the delivery of business data across environments.

> "The portability and productivity that can be achieved from event data is hindered overall."
>
> — *CloudEvents Specification, CNCF* ([source](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md))

This challenge is not abstract. According to [Airbyte's analysis on schema evolution](https://airbyte.com/data-engineering-resources/master-schema-evolution), enterprises average one schema modification every 3.03 days across typical systems. Without proper management, these changes break integration workflows, corrupt reports and dashboards, and derail downstream business processes.

**Real-world example:** A field called `employeeID` exists in your HR system. Your payroll system expects it. One day, the HR team removes that field during a system upgrade. The payroll integration, unaware of this change, fails silently or crashes, and suddenly employees aren't getting paid correctly.

### 1.2 Schemas as Contracts

A schema defines the structure of business data exchanged between systems. It specifies allowed data types, their format, and relationships. Think of a schema as a blueprint that describes:

- What fields are included in a purchase order, invoice, or customer record
- What data type each field contains (text, number, date, etc.)
- Which fields are required vs. optional
- How fields relate to each other

> "Schema Registry allows for schema evolution and provides compatibility checks to ensure that the contract between producers and consumers is not broken. This allows producers and consumers to update independently and evolve their schemas independently, with assurances that they can read new and legacy data."
>
> — *Confluent Documentation* ([source](https://docs.confluent.io/cloud/current/sr/schema_registry_ccloud_tutorial.html))

In business terms: when your order system sends data to your warehouse system, both systems agree on what an "order" looks like. If the order system changes its format, the schema contract ensures the warehouse system can still understand the data, or alerts you that a breaking change is about to occur.

### 1.3 The Business Impact

Integration platform vendors recognize this reality. The shift toward standardized schemas is accelerating because enterprises need systems that can reliably communicate across organizational boundaries, including partners, suppliers, and customers.

> "Event-driven integration is being adopted as the go-to architecture and so standards like CloudEvents are essential to increasing interconnectivity, inside and across enterprises."
>
> — *Solace* ([source](https://www.cncf.io/announcements/2024/01/25/cloud-native-computing-foundation-announces-the-graduation-of-cloudevents/))

Products that fail to support schema standards force customers into manual workarounds, increased development complexity, and a lack of consistency across their integration landscape. As noted in the [MuleSoft blog on AsyncAPI and CloudEvents](https://medium.com/@gbartoloni/asyncapi-cloudevents-in-mulesoft-what-works-what-doesnt-and-how-to-bridge-the-gap-c9d913f07a7b), relying solely on standard connectors can lead to these challenges when native support is limited.

**The bottom line:** Without schema standards, every integration becomes a custom project. With them, integrations become predictable, maintainable, and scalable.

---

## 2. The Major Schema Standards Landscape

The integration industry has developed several complementary standards to address different communication patterns. Understanding when to use each is key to building a coherent integration strategy.

| Standard | Primary Use Case | Think of It As... |
|----------|------------------|-------------------|
| **OpenAPI** | Request/response APIs (REST) | Defining how systems ask for and receive data |
| **AsyncAPI** | Asynchronous messaging | Defining how systems send notifications and updates |
| **CloudEvents** | Message envelope format | A standard "shipping label" for any message |
| **Schema Registry** | Schema versioning & governance | A central catalog of all data formats |
| **OTel Semantic Conventions** | Observability data naming | Consistent names for monitoring/tracing data |
| **EDI (X12/EDIFACT)** | B2B document exchange | Standardized business documents for trading partners |

### 2.1 OpenAPI: The Foundation for Request/Response APIs

When one system needs to request data from another, like querying a customer's order history or submitting a new invoice, this typically happens through a REST API. The OpenAPI Specification (OAS) is the widely adopted standard for describing these APIs.

According to the [OpenAPI Initiative](https://www.openapis.org/), OpenAPI has become the de facto standard for REST APIs, providing a human and machine-readable structure that describes:

- What endpoints are available (e.g., `/orders`, `/customers/{id}`)
- What data you send in a request
- What data you receive in a response
- How authentication works

> "This allows people to understand how an API works, how a sequence of APIs work together, generate client code, create tests, apply design standards, and much, much more."
>
> — *OpenAPI Initiative* ([source](https://www.openapis.org/))

**Industry Adoption:** According to [Wikipedia's OpenAPI article](https://en.wikipedia.org/wiki/OpenAPI_Specification), founding members of the OpenAPI Initiative in 2015 include Google, IBM, Microsoft, PayPal, Capital One, 3Scale, Apigee, Intuit, and Restlet. MuleSoft joined in 2017 after developing RAML.

**Business Value:** When your team needs to integrate with a partner's system, an OpenAPI specification tells your developers exactly what to expect. No guesswork, no back-and-forth emails asking "what format should the date be in?" Per [Boomi's documentation](https://help.boomi.com/docs/atomsphere/api%20management/topics/c-atm-api_management_28fb124c-f53f-4da8-bf8e-ca89656a5f39/), the platform automatically generates OpenAPI specification files for each deployed REST API.

The [2024 State of SaaS APIs report](https://unified.to/blog/2024_state_of_saas_apis_api_specifications_and_documentation) found that OpenAPI and Swagger are the most supported API specification formats, though noted that "many developers see the necessary step of making API specifications as an unnecessary formality," explaining why many APIs remain poorly designed.

#### Key Benefits of OpenAPI

| Benefit | Business Value |
|---------|----------------|
| Design-First Development | Define the integration contract before writing code, catching misunderstandings early |
| Auto-Documentation | Generate interactive documentation so partners can self-serve |
| Code Generation | Automatically create integration code, reducing development time |
| Contract Testing | Validate that implementations match specifications before go-live |
| Standardization | Common language across teams, vendors, and partners |

### 2.2 AsyncAPI: Defining Asynchronous Business Communications

Not all business processes work as simple request/response. Consider these scenarios:

- **Order placed → Notify warehouse, update inventory, send confirmation email** (one action triggers multiple downstream processes)
- **Inventory below threshold → Alert purchasing department** (system monitors and notifies when conditions are met)
- **Payment received → Update accounts receivable, trigger fulfillment** (one system informs others that something happened)

These patterns require asynchronous communication, where the sending system doesn't wait for an immediate response. AsyncAPI is the specification for describing these types of integrations.

According to the [AsyncAPI Initiative](https://www.asyncapi.com/), AsyncAPI is protocol-agnostic, supporting various messaging technologies (AMQP, MQTT, WebSockets, Kafka, and more).

> "Evented APIs arose as a way to bring a similar level of governance to the EVENTful world that already existed in the RESTful world, and to make the experience of the API consumer similar as well."
>
> — *MuleSoft Blog on Evented APIs* ([source](https://blogs.mulesoft.com/api-integration/strategy/evented-apis-for-event-driven-challenges/))

The specification separates integrations into three layers, as described in [MuleSoft's AsyncAPI documentation](https://docs.mulesoft.com/design-center/design-async-api):
- **Messages:** The business data being exchanged (e.g., order details, inventory update)
- **Channels:** Where the message is sent (e.g., "orders" queue, "inventory-updates" topic)
- **Transport:** The underlying technology (Kafka, RabbitMQ, etc.)

**Real-World Adoption:**

| Organization | Use Case | Source |
|--------------|----------|--------|
| eBay | Standardized notification system for marketplace updates | [eBay Tech Blog](https://innovation.ebayinc.com/stories/asyncapi-2-0-enabling-the-event-driven-world/) |
| Capital One | Contract-first development for internal system communication | [Capital One Tech](https://www.capitalone.com/tech/software-engineering/asyncapi-event-driven-architecture/) |
| TransferGo | Blueprint for payment processing workflows | [AsyncAPI Case Studies](https://www.asyncapi.com/casestudies) |
| Slack | Documenting data streaming APIs for partners | [AsyncAPI Case Studies](https://www.asyncapi.com/casestudies) |

**MuleSoft Implementation:** Per [MuleSoft's release notes](https://docs.mulesoft.com/release-notes/platform/event-driven-api), Anypoint Platform supports AsyncAPI 2.6 in Anypoint Code Builder for designing API specs and Avro schemas, API Designer, and API Experience Hub.

> "AsyncAPI addresses the need for a unified, open source, protocol-agnostic asynchronous specification that is both human-readable and machine-readable, while also being backed by a diverse and rich tooling ecosystem."
>
> — *eBay Tech Blog* ([source](https://innovation.ebayinc.com/stories/asyncapi-2-0-enabling-the-event-driven-world/))

### 2.3 CloudEvents: A Standard Envelope for Business Messages

When systems exchange business data, the message itself (the order, the invoice, the status update) is only part of the picture. Receiving systems also need to know:

- Where did this message come from?
- What type of message is this?
- When was it created?
- How should I interpret the payload?

CloudEvents is a CNCF-graduated specification that standardizes this "envelope" information. Think of it like a shipping label that accompanies every package. Regardless of what's inside, the label follows a standard format that any logistics system can read.

According to the [CNCF announcement](https://www.cncf.io/announcements/2024/01/25/cloud-native-computing-foundation-announces-the-graduation-of-cloudevents/), CloudEvents was approved as a graduated project on January 25, 2024.

> "It's a simple data model with a focus on describing the context of events that works with numerous popular protocols and data encodings in a uniform way, without trying to invent new protocol features or getting in the way of the protocol features that exist."
>
> — *Microsoft Principal Architect Clemens Vasters* ([source](https://thenewstack.io/cncf-cloudevents-a-lil-message-envelope-that-travels-far/))

**Enterprise Scale:**

Per [The New Stack's coverage](https://thenewstack.io/cncf-cloudevents-a-lil-message-envelope-that-travels-far/):
- **Microsoft** uses CloudEvents across Microsoft 365 and Azure cloud services, processing billions of messages each day
- **SAP** uses CloudEvents as a foundation across SAP Event Broker, SAP BTP Kyma runtime, SAP Event Mesh, and SAP Integration Suite

> "The CloudEvents specification has been used as a foundation in SAP's Business Technology Platform for alignment across applications and platform services... Adhering to the open CloudEvents specification provides interoperability across messaging protocols and its extensibility simplifies customer adoption."
>
> — *SAP, via CNCF Graduation Announcement* ([source](https://www.cncf.io/announcements/2024/01/25/cloud-native-computing-foundation-announces-the-graduation-of-cloudevents/))

**Why This Matters for Integration Products:** CloudEvents allows different systems, potentially from different vendors, to exchange messages without custom translation of the envelope metadata. The business payload can be anything (an order, an alert, a status update), but the routing and handling information follows a universal standard.

> "It's not creating a whole new set of middleware, and we were very conscious not to do that. We wanted people to slowly adapt to CloudEvents without having to sort of reinvent their entire middleware architecture."
>
> — *Doug Davis, Co-chair of CloudEvents and CNCF Serverless WG* ([source](https://thenewstack.io/cncf-cloudevents-a-lil-message-envelope-that-travels-far/))

#### CloudEvents Core Attributes

Per the [CloudEvents Specification](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md):

| Attribute | Required | Business Purpose |
|-----------|----------|------------------|
| `id` | Yes | Unique identifier. Enables deduplication and tracking |
| `source` | Yes | Which system sent this (e.g., "orders.acme.com") |
| `specversion` | Yes | CloudEvents version for compatibility |
| `type` | Yes | What kind of message (e.g., "com.acme.order.created") |
| `datacontenttype` | No | Format of the payload (e.g., "application/json") |
| `dataschema` | No | Link to the schema defining the payload structure |
| `subject` | No | Specific resource this relates to (e.g., order ID) |
| `time` | No | When this occurred. Critical for sequencing |

### 2.4 Schema Registry: Centralized Catalog of Data Formats

As your organization builds more integrations, you quickly accumulate dozens (or hundreds) of different data formats: order schemas, customer schemas, inventory schemas, each potentially with multiple versions. How do you keep track of them all? How do you ensure that when System A sends data, System B knows how to interpret it?

A Schema Registry is a centralized catalog that stores, versions, and validates all your data schemas. It serves as the "single source of truth" for what your business data looks like.

> "Schema Registry provides several benefits, including data validation, compatibility checking, versioning, and evolution. It also simplifies the development and maintenance of data pipelines and reduces the risk of data compatibility issues, data corruption, and data loss."
>
> — *Confluent Documentation* ([source](https://docs.confluent.io/platform/current/schema-registry/index.html))

**Why It Matters:** Per [Confluent's Schema Registry course](https://developer.confluent.io/courses/apache-kafka/schema-registry/):

> "In any non-trivial system, the Schema Registry is indispensable. As applications grow, new consumers emerge, and schemas inevitably evolve. The Schema Registry provides centralized schema management – all producers and consumers share a common understanding of message formats."

**How It Works in Practice:**

According to [Confluent's tutorial](https://docs.confluent.io/cloud/current/sr/schema_registry_ccloud_tutorial.html):

1. **Registration:** When your order system is ready to send order data, it first registers the order schema with the registry
2. **ID Assignment:** The registry assigns a unique schema ID and returns it
3. **Message Tagging:** Your order system includes this schema ID with every order message it sends
4. **Lookup:** When your warehouse system receives an order message, it uses the schema ID to look up the exact format
5. **Validation:** The warehouse system deserializes the message using the correct schema, guaranteed to match

**Business Benefit:** Your order system and warehouse system can be updated independently. As long as schema changes follow compatibility rules, neither system breaks when the other is updated.

**Supported Formats:** Per [Confluent's Schema Registry Overview](https://docs.confluent.io/platform/7.2/schema-registry/index.html):

| Format | Characteristics | Best For |
|--------|-----------------|----------|
| Avro | Compact binary format, built-in schema evolution | High-volume transaction processing |
| JSON Schema | Human-readable, widely understood | Web integrations, debugging, partner APIs |
| Protobuf | Efficient, language-neutral, gRPC native | Cross-platform microservices |

> "Schema Registry supports multiple formats at the same time. For example, you can have Avro schemas in one subject and Protobuf schemas in another."
>
> — *Confluent Documentation* ([source](https://docs.confluent.io/platform/7.2/schema-registry/index.html))

### 2.5 Related Standard: OpenTelemetry Semantic Conventions

While the standards above define the structure of *business data* exchanged between systems, there's a complementary standard worth understanding: **OpenTelemetry Semantic Conventions**. These conventions define consistent naming for *observability data*, the telemetry (traces, metrics, logs) that monitors how your integrations perform.

**What It Does:** OpenTelemetry Semantic Conventions specify common names for different kinds of operations and data across your technology stack. According to the [OpenTelemetry documentation](https://opentelemetry.io/docs/concepts/semantic-conventions/):

> "The benefit of using Semantic Conventions is in following a common naming scheme that can be standardized across a codebase, libraries, and platforms."

**Why This Matters for Integration:** When your order management system sends data to your warehouse system, you use OpenAPI or AsyncAPI to define that data contract. But when you want to *monitor* that integration (track latency, identify errors, correlate logs across services) you need consistent naming for your observability data. That's where OTel Semantic Conventions come in.

**Think of it this way:**

| Standard | Answers the Question |
|----------|---------------------|
| OpenAPI / AsyncAPI | "What does the order data look like?" |
| CloudEvents | "What metadata accompanies each message?" |
| OTel Semantic Conventions | "What do we call the fields when we log or trace this operation?" |

**Industry Convergence:** In April 2023, [Elastic and OpenTelemetry announced plans to converge the Elastic Common Schema (ECS) with OTel Semantic Conventions](https://opentelemetry.io/blog/2023/ecs-otel-semconv-convergence/), with the goal of creating a single unified schema:

> "The goal is to achieve convergence of ECS and OTel Semantic Conventions into a single open schema that is maintained by OpenTelemetry, so that OpenTelemetry Semantic Conventions truly is a successor of the Elastic Common Schema."
>
> — *OpenTelemetry Blog* ([source](https://opentelemetry.io/blog/2023/ecs-otel-semconv-convergence/))

This convergence effort brings ECS's mature schema for logs and security events into the OTel ecosystem, making it the emerging standard for all observability naming.

**Stability Progress:** The conventions are progressively reaching stability:
- **HTTP conventions:** Declared stable in 2023 (v1.23.0) ([source](https://opentelemetry.io/blog/2023/http-conventions-declared-stable/))
- **Database conventions:** Reached stability in 2024 ([source](https://opentelemetry.io/docs/specs/semconv/db/))
- **Messaging conventions:** Still in development, covering Kafka, RabbitMQ, AWS SQS/SNS, and more ([source](https://opentelemetry.io/docs/specs/semconv/messaging/))

**Integration Platform Adoption:**

MuleSoft now includes native OpenTelemetry support. Per [MuleSoft's documentation](https://docs.mulesoft.com/mule-runtime/latest/otel-support):

> "MuleSoft follows the semantic convention defined by OpenTelemetry that adds one or more exception events to the span... OpenTelemetry enables Mule runtime engine to provide observability into the behavior of Mule applications."

Boomi announced early access for OpenTelemetry as part of their 2025 platform releases, allowing native configuration of runtimes to stream real-time telemetry data to preferred third-party monitoring platforms ([source](https://boomi.com/platform/)).

**CloudEvents Interoperability:** OpenTelemetry includes [specific semantic conventions for CloudEvents](https://opentelemetry.io/docs/specs/semconv/cloudevents/), enabling correlation between the business messages (CloudEvents format) and the observability traces that track their journey through your systems.

**Key Takeaway:** OTel Semantic Conventions are complementary to the data contract standards in this document. You define your API contracts with OpenAPI/AsyncAPI and your message envelopes with CloudEvents, then you use OTel Semantic Conventions to ensure consistent, vendor-neutral monitoring of those integrations. Integration platforms that support both give you governance over your data *and* visibility into how that data flows.

---

## 3. EDI: The Bedrock of B2B Data Exchange

### 3.1 Understanding EDI Standards

Electronic Data Interchange (EDI) is the computer-to-computer exchange of business documents in a standard electronic format between business partners. According to [Orderful's X12 overview](https://www.orderful.com/blog/x12-edi), EDI standards have been around for over 40 years and remain foundational to global commerce.

> "X12 is a standard developed by the Accredited Standards Committee (ASC) X12, chartered by the American National Standards Institute (ANSI) in 1979, for interindustry electronic exchange of business transactions."
>
> — *Introduction to B2B EDI* ([source](https://medium.com/another-integration-blog/introduction-to-b2b-edi-x12-091bb4d4fe7e))

**X12 (ANSI):** The primary standard for EDI in North America. Per [SEEBURGER's analysis](https://www.seeburger.com/resources/good-to-know/what-is-ansi-x12), X12 is used across healthcare (HIPAA compliance), retail, manufacturing, finance, and logistics. It uses three-digit codes (like 850 for Purchase Order, 810 for Invoice).

**EDIFACT (UN/ECE):** The international standard used throughout Europe and Asia, developed in 1986. According to [EZCom Software](https://blog.ezcomsoftware.com/edi-x12-v-edifact), it uses six-letter codes (like ORDERS for Purchase Order, INVOIC for Invoice).

> "Today, EDI X12 powers billions of transactions every day across all industries, but especially in retail, manufacturing, healthcare, finance, and logistics. Its standardized formats ensure that critical business documents such as purchase orders, invoices, and shipping notices are exchanged accurately and efficiently between trading partners."
>
> — *EDI2XML* ([source](https://www.edi2xml.com/blog/edi-x12-explained-codes-standards-and-real-world-impact/))

### 3.2 X12 vs EDIFACT Comparison

Per [Zenbridge's analysis](https://zenbridge.io/insights/edifact-vs-x12/):

| Aspect | X12 | EDIFACT |
|--------|-----|---------|
| Region | North America | Europe, Asia, International |
| Developed | 1979 (ANSI) | 1986 (UN/ECE) |
| Document Codes | 3-digit (850, 810) | 6-letter (ORDERS, INVOIC) |
| Industries | Healthcare, Retail, Finance | Global Trade, Logistics |
| Governance | ASC X12 | UN/CEFACT |
| Interchange Header | ISA/IEA | UNB/UNZ |
| Functional Group | GS/GE | UNG/UNE |
| Transaction Set | ST/SE | UNH/UNT |

### 3.3 Why EDI Still Matters for Integration Products

Integration platforms must support EDI because it remains the backbone of supply chain and healthcare communications. As noted by [GraceBlood](https://graceblood.com/blog/understanding-edi-standards-x12-vs-edifact/):

> "While newer technologies like XML, JSON, and APIs are reshaping how data is exchanged, ANSI X12 and EDIFACT remain foundational pillars in EDI—trusted for their robustness, reliability, and widespread adoption."

Products like MuleSoft, Boomi, and SEEBURGER provide B2B/EDI capabilities. Per [SEEBURGER](https://www.seeburger.com/resources/good-to-know/what-is-ansi-x12):

> "With SEEBURGER BIS Platform B2B/EDI capabilities and Cloud Integration Services for B2B/EDI, you can convert any EDI data format found on the market."

**Key Insight:** An integration platform that cannot handle EDI excludes itself from significant enterprise use cases, particularly in retail, healthcare, logistics, and manufacturing.

#### Common EDI Transaction Types

Per [CData's X12 EDI Guide](https://arc.cdata.com/resources/edi/x12.rst):

| X12 Code | EDIFACT | Document Type |
|----------|---------|---------------|
| 850 | ORDERS | Purchase Order |
| 810 | INVOIC | Invoice |
| 856 | DESADV | Ship Notice/Manifest |
| 855 | ORDRSP | Purchase Order Acknowledgment |
| 820 | REMADV | Payment Order/Remittance Advice |
| 997 | CONTRL | Functional Acknowledgment |

---

## 4. How Leading Platforms Leverage Schema Standards

### 4.1 MuleSoft: Full Lifecycle Schema Support

MuleSoft announced open beta for AsyncAPI support in Anypoint Platform with a vendor-neutral approach to integrating with various event brokers. Per [Solace's coverage](https://solace.com/blog/mulesoft-embracing-event-driven-integration/) of the announcement:

> "Traditional iPaaS and integration vendors will hop on the train as customer demand increases – with this announcement MuleSoft joins Boomi, SAP and others in doing so."

From the [MuleSoft Blog on Evented APIs](https://blogs.mulesoft.com/api-integration/strategy/evented-apis-for-event-driven-challenges/):

> "AsyncAPI spec and event schemas can be published in a catalog/app store to facilitate discoverability and reuse—addressing one of the event-driven architecture gaps. Once an AsyncAPI is published, mock tests can be created to reflect the utilization of the API, removing the testability gap in event-driven architectures."

**Capabilities:**
- AsyncAPI 2.6 support in Anypoint Code Builder ([source](https://docs.mulesoft.com/release-notes/platform/event-driven-api))
- Avro schema design and validation
- API Experience Hub for discovery
- Scaffolding generation from AsyncAPI specs ([source](https://docs.mulesoft.com/anypoint-code-builder/imp-asyncapi))

**Limitations:** As integration architect Giacomo Bartoloni noted in his [Medium article](https://medium.com/@gbartoloni/asyncapi-cloudevents-in-mulesoft-what-works-what-doesnt-and-how-to-bridge-the-gap-c9d913f07a7b):

> "While MuleSoft provides robust tools for building event-driven architectures, the limitations in its native AsyncAPI support for certain message brokers necessitate the development of custom connectors to facilitate the usage of CloudEvents format."

### 4.2 Boomi: Canonical Data Models

Boomi API Management provides central governance for all API connections. Per [Boomi's blog on Universal API Management](https://boomi.com/blog/how-universal-api-management-simplifies-data-modeling/):

> "Pre-built connectors include standard data models for 300,000+ unique endpoints, which means developers start with established structures instead of building mappings from scratch. Visual mapping tools let teams define canonical models without writing code, and 200+ million anonymized integration patterns inform machine learning-powered mapping suggestions."

**Canonical Model Approach:**

> "One Canonical Data Model Reduces Mapping Work: The platform defines standard field names, data types, and structures that all connected applications use. Without this standardization, developers spend time reconciling conflicting definitions where different systems use different naming conventions and formats for the same information."
>
> — *Boomi* ([source](https://boomi.com/blog/how-universal-api-management-simplifies-data-modeling/))

Per [Boomi's API Management documentation](https://help.boomi.com/docs/atomsphere/api%20management/topics/c-atm-api_management_28fb124c-f53f-4da8-bf8e-ca89656a5f39/), the platform automatically generates a WSDL for each deployed SOAP API and an OpenAPI specification file for each deployed REST API.

### 4.3 WSO2: Open Standards Focus

WSO2 API Manager is an open platform for managing APIs with full lifecycle capabilities. Per [WSO2's website](https://wso2.com/api-manager/):

> "WSO2's API management provides the #1 open source, market-leading full lifecycle platform for building, integrating, securing, and exposing AI and digital services as managed APIs in the cloud, on-premises, hybrid architectures, and modern environments like Kubernetes."

According to [WSO2's feature documentation](https://wso2.com/api-manager/features/), the platform supports:
- API-first integration with built-in support for a wide range of protocols (HTTP, AMQP, JMS, Kafka, gRPC)
- Standards support (OpenAPI, SOAP)
- Schema validation: "Validates APIs payload content against schemas"
- JSON web tokens for consumption by back-end servers

Per [WSO2's architecture documentation](https://apim.docs.wso2.com/en/latest/get-started/apim-architecture/):

> "WSO2 Universal Gateway acts as the entry point for an API request made to an API managed by WSO2 API Manager. The Universal Gateway does the JWT token validation by validating the signature, issuer, expiry time, and subscription."

**Key Differentiator:** WSO2's open-source approach allows customers to avoid vendor lock-in. Per [WSO2](https://wso2.com/api-management/):

> "Protect yourself from vendor lock-in, and enjoy complete trust and transparency with our fully open-source software."

### 4.4 Solace: Event Portal and AsyncAPI

Per [Solace's blog on MuleSoft integration](https://solace.com/blog/mulesoft-embracing-event-driven-integration/):

> "Event Portal lets users easily find existing event types or create new event types through an easy set of dialogs. Event Portal also abstracts away AsyncAPI limitations such as ownership, versioning and reusability of each AsyncAPI component (channels, schemas). Finally, Event Portal provides an easier path to AsyncAPI document creation and helps get developers writing MuleSoft Integration Flows faster."

**MuleSoft Integration:**

> "Creating flows for event-driven integrations can be a real pain, and integrations are frequently way more complicated than they need to be. We know that, as many of us come from writing integration flows ourselves. We've developed a plugin that lets you export an AsyncAPI specification from Event Portal and generate a MuleSoft Integration Flow, all within the Anypoint Studio IDE."
>
> — *Solace* ([source](https://solace.com/blog/mulesoft-embracing-event-driven-integration/))

### Platform Comparison Matrix

| Capability | MuleSoft | Boomi | WSO2 | Solace |
|------------|----------|-------|------|--------|
| OpenAPI Support | ✅ Full | ✅ Auto-generate | ✅ Full | N/A |
| AsyncAPI Support | ✅ 2.6 ([source](https://docs.mulesoft.com/release-notes/platform/event-driven-api)) | Partial | ✅ | ✅ Full |
| CloudEvents | Custom connector needed ([source](https://medium.com/@gbartoloni/asyncapi-cloudevents-in-mulesoft-what-works-what-doesnt-and-how-to-bridge-the-gap-c9d913f07a7b)) | N/A | N/A | ✅ Native |
| Schema Registry | External integration | N/A | N/A | ✅ Built-in ([source](https://docs.solace.com/Schema-Registry/schema-registry-best-practices.htm)) |
| EDI Support | ✅ B2B/EDI | ✅ B2B/EDI | Via integration | N/A |
| Open Source | No | No | ✅ Yes ([source](https://wso2.com/api-management/)) | No |

---

## 5. Schema Evolution: Managing Change Without Breaking Systems

### 5.1 The Challenge of Change

Schemas will never stop changing. New fields get added, types are updated, old columns are dropped. Per [Estuary's guide on schema evolution](https://estuary.dev/blog/real-time-schema-evolution/):

> "Schema evolution is one of the most complex parts of real-time systems. Without it, pipelines break, dashboards fail, and downstream consumers lose trust."

From [Confluent's documentation on schema evolution](https://docs.confluent.io/cloud/current/sr/fundamentals/schema-evolution.html):

> "An important aspect of data management is schema evolution. After the initial schema is defined, applications may need to evolve it over time. When this happens, it's critical for the downstream consumers to be able to handle data encoded with both the old and the new schema seamlessly. This is an area that tends to be overlooked in practice until you run into your first production issues."

### 5.2 Compatibility Strategies

Per [Confluent's Schema Evolution documentation](https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html), Schema Registry supports compatibility rules that help manage schema changes gracefully:

| Strategy | Description | Use When |
|----------|-------------|----------|
| **BACKWARD** | New schema can read old data | Upgrading consumers first |
| **FORWARD** | Old schema can read new data | Upgrading producers first |
| **FULL** | Both backward and forward | Gradual rollouts, safest option |
| **NONE** | No compatibility checking | Development/testing only |

**Transitive vs Non-Transitive:**

> "Transitive compatibility checking is important once you have more than two versions of a schema for a given subject. If compatibility is configured as transitive, then it checks compatibility of a new schema against all previously registered schemas; otherwise, it checks compatibility of a new schema only against the latest schema."
>
> — *Confluent* ([source](https://docs.confluent.io/cloud/current/sr/schema_registry_ccloud_tutorial.html))

### 5.3 Best Practices for Schema Evolution

Per [Solace's Schema Registry Best Practices](https://docs.solace.com/Schema-Registry/schema-registry-best-practices.htm):

1. **Provide default values** for new fields to maintain backward compatibility
2. **Never rename fields**: "Instead of renaming fields, add new fields and deprecate old ones. Renaming breaks compatibility."
3. **Make new fields optional** to ensure older consumers can ignore them
4. **Use semantic versioning**: "Use semantic versioning for your schemas. This helps track changes systematically."
5. **Use union types**: "Union types allow a field to accept multiple data types, providing flexibility for future changes."

Anti-patterns to avoid, per [Solace](https://docs.solace.com/Schema-Registry/schema-registry-best-practices.htm):

> "Breaking changes without planning—Avoid removing required fields, changing field types incompatibly, or renaming fields without aliases. Tight coupling to schema versions—Avoid hard-coding schema versions directly in application code."

### 5.4 The Outbox Pattern

One approach to prevent schema changes from impacting downstream systems is the outbox pattern. Per [Decodable's article on schema evolution in CDC pipelines](https://www.decodable.co/blog/schema-evolution-in-change-data-capture-pipelines):

> "One approach is to use the outbox pattern, hence, not directly exposing data model internals to the outside world to begin with. So instead of configuring a CDC pipeline directly against the database tables backing some application, a contract is defined based on a well-defined public schema."

How it works:
1. Instead of directly exposing data model internals, define a contract based on a well-defined public schema
2. Data changes are written to a dedicated outbox table following the defined contract
3. Both original table writes and outbox writes are bound to the same database transaction
4. CDC reads from the outbox table, not the internal tables

**Benefits:**
- Decouples internal data models from external contracts
- Allows internal schema changes without breaking consumers
- Provides transaction consistency for event publishing

---

## 6. The Business Case for Schema-Aware Products

### 6.1 Avoiding Vendor Lock-In

Closed or throttled APIs trap organisations inside proprietary ecosystems. Per research on [Vendor Lock-In and Interoperability](https://www.researchgate.net/publication/383855750_Vendor_Lock-In_and_Interoperability_Importance_of_interoperability_among_cloud_services):

> "By prioritizing interoperability, organizations can avoid vendor lock-in, enhance flexibility, and foster innovation, ultimately enabling a more agile and resilient IT infrastructure in the cloud."

Per [ITLawCo's analysis](https://itlawco.com/avoiding-vendor-lock-in-in-data-protection-and-privacy-management-platforms/):

> "Closed or throttled APIs trap organisations inside proprietary ecosystems. Solution: build abstraction layers or middleware that interface via open standards."

**Strategies for Avoiding Lock-In:**

Per [Acceldata's guide on data interoperability](https://www.acceldata.io/blog/data-interoperability-key-principles-challenges-and-best-practices):
- **Standardization:** Adopt industry-standard data formats, protocols, and interfaces
- **Openness:** Embrace open standards and APIs to facilitate data exchange and prevent vendor lock-in
- **Metadata management:** Establish clear metadata standards to provide context and enable data discovery

### 6.2 Developer Productivity

When working with event-driven architectures, developers need to work with multiple protocols. Per [MuleSoft's blog on evented APIs](https://blogs.mulesoft.com/api-integration/strategy/evented-apis-for-event-driven-challenges/):

> "Developer experience: When working with event-driven architectures, developers need to work with multiple protocols (JMS, MQTT, AMQP, Kafka, etc.), which can be challenging."

**Code Generation:** Per [AsyncAPI documentation](https://www.asyncapi.com/docs/tutorials/getting-started/event-driven-architectures), from AsyncAPI specifications, developers can automatically generate:
- Scaffolding code and project structure
- Client libraries in multiple languages
- Server stubs and handlers
- Interactive documentation

Per [eBay's article on AsyncAPI](https://innovation.ebayinc.com/stories/asyncapi-2-0-enabling-the-event-driven-world/):

> "For industry adoption, however, it's not just the richness of the specification that matters — it's also the tooling that comes with it. As with OpenAPI, AsyncAPI tooling incorporates powerful visualizers that allow architects and engineers to collaborate on the design."

**Contract Testing:** Per [eBay](https://innovation.ebayinc.com/stories/asyncapi-2-0-enabling-the-event-driven-world/):

> "Microcks is an open source Kubernetes mock-and-test framework that supports AsyncAPI."

### 6.3 Governance and Compliance

API governance is the structured framework that manages and enforces policies for API deployment, security, observability, and lifecycle operations. Per [Traefik Labs](https://traefik.io/blog/top-five-policies-for-runtime-api-governance):

> "Open observability standards like OpenTelemetry guarantee compatibility with various backend API analytics platforms and prevent vendor lock-in. They provide a way to decouple your observability strategy from your gateway strategy."

**Data Contracts:** Per [Monte Carlo's guide on data contracts](https://www.montecarlodata.com/blog-data-contracts-explained/):

> "A data contract is an agreement between a service provider and data consumers... But here's what makes it powerful: this agreement is implemented in code, not just documented in prose."

Best practices from [Monte Carlo](https://www.montecarlodata.com/blog-data-contracts-explained/):
- "Place the contract under version control in Git, just like code. Store it in a schema registry for easy access."
- "Embed checks in the CI/CD pipeline of the data producer. If an engineer tries to deploy a change that violates the contract, automated tests should fail."
- "Add circuit breakers in data ingestion too. If incoming data doesn't match the contract, stop it from flowing into the warehouse."

**Runtime Enforcement:** Per [Traefik Labs](https://traefik.io/blog/top-five-policies-for-runtime-api-governance):

> "API gateways provide control points for runtime API governance, enabling governance teams to enforce common runtime standards such as authentication and authorization, granular API access, rate limiting and throttling, input validation, and monitoring."

---

## 7. Recommendations for Product Development

### 7.1 Core Capabilities to Build

| Capability | Why It Matters | Priority |
|------------|----------------|----------|
| **OpenAPI Support** | Industry standard for REST APIs. Enables design-first development, auto-documentation, and code generation. ([OpenAPI Initiative](https://www.openapis.org/)) | High |
| **AsyncAPI Support** | Essential for event-driven APIs. MuleSoft, Boomi, SAP, and others are adopting it. Protocol-agnostic design. ([AsyncAPI](https://www.asyncapi.com/)) | High |
| **CloudEvents Format** | CNCF-graduated standard. Used by Microsoft, SAP, AWS for billions of messages daily. Ensures event interoperability. ([CNCF](https://cloudevents.io/)) | Medium-High |
| **Schema Registry** | Centralized schema management with compatibility checking. Prevents breaking changes and enables schema evolution. ([Confluent](https://docs.confluent.io/platform/current/schema-registry/)) | High |
| **OTel Semantic Conventions** | Emerging standard for observability data naming. Enables consistent monitoring across polyglot environments. MuleSoft and Boomi now support. ([OpenTelemetry](https://opentelemetry.io/docs/specs/semconv/)) | Medium |
| **EDI Support** | Required for B2B in retail, healthcare, logistics. X12 and EDIFACT remain foundational for supply chain. | Medium (industry-dependent) |
| **Schema Validation** | Runtime validation prevents bad data from corrupting systems. Essential for API governance and security. | High |

### 7.2 Key Questions for Product Strategy

When evaluating schema support in integration products, consider:

**Discoverability**
- Can developers find and understand available schemas through a catalog or portal?
- Is there a searchable registry of events, channels, and message types?

**Evolution**
- Does the platform support schema versioning with compatibility checking?
- Can schemas evolve without breaking existing consumers?

**Validation**
- Can schemas be validated at design time AND runtime?
- Are validation errors surfaced clearly to developers?

**Interoperability**
- Does the platform support industry standards or lock users into proprietary formats?
- Can data flow to/from other platforms without custom translation?

**Tooling**
- Can developers generate code, documentation, and tests from schema definitions?
- Is there IDE integration for schema authoring?

### 7.3 Implementation Roadmap

**Phase 1: Foundation**
- Implement OpenAPI support for REST APIs
- Add schema validation at the gateway layer
- Create a basic schema/API catalog

**Phase 2: Event-Driven**
- Add AsyncAPI support for event-driven APIs
- Implement CloudEvents format for event interoperability
- Integrate with or build a schema registry

**Phase 3: Advanced Governance**
- Add schema evolution with compatibility checking
- Implement contract testing capabilities
- Build discoverability features (search, catalog, portal)

**Phase 4: Enterprise Scale**
- Add EDI support for B2B scenarios
- Implement multi-format support (Avro, Protobuf, JSON Schema)
- Enable federation across multiple registries/gateways

---

## 8. Conclusion

The enterprise integration landscape is converging on open standards for schemas and message types. Organizations like CNCF (CloudEvents), the AsyncAPI Initiative, the OpenAPI Initiative, and the OpenTelemetry project are driving standardization that benefits the entire ecosystem.

For product managers building integration platforms, the message is clear: **products that understand, respect, and utilize schema definitions will deliver superior value** through interoperability, governance, and evolvability. This includes not just the data contracts themselves (OpenAPI, AsyncAPI, CloudEvents, Schema Registry) but also how those integrations are monitored (OpenTelemetry Semantic Conventions). Those that ignore these standards will find themselves creating integration chaos rather than solving it.

> "Change is inevitable. Breakage doesn't have to be."
>
> — *Estuary on Schema Evolution* ([source](https://estuary.dev/blog/real-time-schema-evolution/))

The question is not whether to support these standards, but how quickly and comprehensively to do so.

---

## References and Further Reading

### Specifications

| Standard | URL |
|----------|-----|
| OpenAPI | https://www.openapis.org/ |
| AsyncAPI | https://www.asyncapi.com/ |
| CloudEvents | https://cloudevents.io/ |
| CloudEvents GitHub Spec | https://github.com/cloudevents/spec |
| Confluent Schema Registry | https://docs.confluent.io/platform/current/schema-registry/ |
| JSON Schema | https://json-schema.org/ |
| OpenTelemetry Semantic Conventions | https://opentelemetry.io/docs/specs/semconv/ |
| OpenTelemetry Messaging Conventions | https://opentelemetry.io/docs/specs/semconv/messaging/ |
| OpenTelemetry CloudEvents Conventions | https://opentelemetry.io/docs/specs/semconv/cloudevents/ |

### Platform Documentation

| Platform | Resource | URL |
|----------|----------|-----|
| MuleSoft AsyncAPI | Event-Driven API Release Notes | https://docs.mulesoft.com/release-notes/platform/event-driven-api |
| MuleSoft | Implementing AsyncAPI Specifications | https://docs.mulesoft.com/anypoint-code-builder/imp-asyncapi |
| MuleSoft | AsyncAPI Specifications in Design Center | https://docs.mulesoft.com/design-center/design-async-api |
| MuleSoft | OpenTelemetry Support | https://docs.mulesoft.com/mule-runtime/latest/otel-support |
| Boomi | API Management | https://boomi.com/platform/api-management/ |
| Boomi | Universal API Management Blog | https://boomi.com/blog/how-universal-api-management-simplifies-data-modeling/ |
| Boomi | Platform Overview | https://boomi.com/platform/ |
| WSO2 | API Manager | https://wso2.com/api-manager/ |
| WSO2 | API Manager Architecture | https://apim.docs.wso2.com/en/latest/get-started/apim-architecture/ |
| Solace | Event Portal | https://solace.com/products/portal/ |
| Solace | Schema Registry Best Practices | https://docs.solace.com/Schema-Registry/schema-registry-best-practices.htm |
| Confluent | Schema Evolution | https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html |

### Industry Perspectives

| Source | Topic | URL |
|--------|-------|-----|
| Capital One | AsyncAPI in Event-Driven Architecture | https://www.capitalone.com/tech/software-engineering/asyncapi-event-driven-architecture/ |
| eBay | AsyncAPI 2.0 Adoption | https://innovation.ebayinc.com/stories/asyncapi-2-0-enabling-the-event-driven-world/ |
| Solace | MuleSoft Event-Driven Integration | https://solace.com/blog/mulesoft-embracing-event-driven-integration/ |
| CNCF | CloudEvents Graduation Announcement | https://www.cncf.io/announcements/2024/01/25/cloud-native-computing-foundation-announces-the-graduation-of-cloudevents/ |
| The New Stack | CloudEvents Deep Dive | https://thenewstack.io/cncf-cloudevents-a-lil-message-envelope-that-travels-far/ |
| MuleSoft | Evented APIs Blog | https://blogs.mulesoft.com/api-integration/strategy/evented-apis-for-event-driven-challenges/ |
| Monte Carlo | Data Contracts Explained | https://www.montecarlodata.com/blog-data-contracts-explained/ |
| Decodable | Schema Evolution in CDC Pipelines | https://www.decodable.co/blog/schema-evolution-in-change-data-capture-pipelines |
| Estuary | Real-Time Schema Evolution | https://estuary.dev/blog/real-time-schema-evolution/ |
| Airbyte | Mastering Schema Evolution | https://airbyte.com/data-engineering-resources/master-schema-evolution |
| OpenTelemetry | ECS and OTel SemConv Convergence | https://opentelemetry.io/blog/2023/ecs-otel-semconv-convergence/ |
| OpenTelemetry | HTTP Conventions Declared Stable | https://opentelemetry.io/blog/2023/http-conventions-declared-stable/ |
| Elastic | ECS Contribution to OpenTelemetry FAQ | https://www.elastic.co/blog/ecs-elastic-common-schema-otel-opentelemetry-faq |
| Grafana | Database Observability with OTel Semantic Conventions | https://grafana.com/blog/2025/06/06/database-observability-how-opentelemetry-semantic-conventions-improve-consistency-across-signals/ |

### EDI Resources

| Source | Topic | URL |
|--------|-------|-----|
| SEEBURGER | ANSI X12 Overview | https://www.seeburger.com/resources/good-to-know/what-is-ansi-x12 |
| Zenbridge | EDIFACT vs X12 | https://zenbridge.io/insights/edifact-vs-x12/ |
| EDI2XML | EDI X12 Explained | https://www.edi2xml.com/blog/edi-x12-explained-codes-standards-and-real-world-impact/ |
| GraceBlood | Understanding EDI Standards | https://graceblood.com/blog/understanding-edi-standards-x12-vs-edifact/ |
| Medium | Introduction to B2B EDI | https://medium.com/another-integration-blog/introduction-to-b2b-edi-x12-091bb4d4fe7e |

### Case Studies

| Organization | Use Case | Source |
|--------------|----------|--------|
| TransferGo | AsyncAPI for event-driven microservices | [AsyncAPI Case Studies](https://www.asyncapi.com/casestudies) |
| Slack | Data streaming API documentation | [AsyncAPI Case Studies](https://www.asyncapi.com/casestudies) |
| IBM | Company-wide event catalog | [AsyncAPI Case Studies](https://www.asyncapi.com/casestudies) |
| Port of Rotterdam | Infrastructure monitoring with AsyncAPI | [AsyncAPI Case Studies](https://www.asyncapi.com/casestudies) |

---

*Document generated from industry research including sources from MuleSoft, Boomi, WSO2, Solace, Confluent, CNCF, Capital One, eBay, and other industry leaders. All quotes and statistics are attributed with source links.*

---

## CFP

# Schemas Are the Interface: Why Structure Matters More in the Age of AI Agents

Schemas have always been the right way to define how systems exchange data. OpenAPI for REST, AsyncAPI for events, Protobuf for cross-language contracts, CloudEvents for message envelopes. The arguments for contract-first development are well established: type safety, code generation, breaking change detection, independent service evolution. But adoption has always been optional. Teams could skip the schema, ship raw JSON, and deal with the consequences later.

AI agents changed the math. When an LLM decides which tool to invoke, it reads a schema. MCP tool definitions are JSON Schema. OpenAI function calling requires typed parameter declarations. Google's Agent Development Kit generates callable tools directly from OpenAPI specifications, using the `summary` and `description` fields to guide tool selection. The model doesn't read your source code or your documentation site. It reads the schema. A missing description is no longer a documentation gap. It is a capability gap. An imprecise type is no longer a developer annoyance. It is a source of hallucination.

This talk connects the decades-old case for schema-driven development to the new reality of AI agent tooling. You'll see how MCP, OpenAI Structured Outputs, and Google ADK all depend on the same foundation (machine-readable, semantically annotated schemas), why Google is pushing gRPC and Protobuf as a transport layer for MCP, and what this means for how you design APIs and define contracts going forward. The schema is no longer just the contract between your services. It is the interface your AI agents reason against.

## Talk outline

> Slated at ~25 min runtime but can be adapted to a lightning talk or deep dive

1. Schemas have always mattered (3 min)
    - Quick tour of the landscape: OpenAPI, AsyncAPI, Protobuf, CloudEvents, Schema Registry.
    - The traditional case for contract-first: type safety, code generation, compatibility, independent evolution.
    - Why adoption remained optional for most teams despite the clear benefits.
2. Enter the agents (5 min)
    - How LLM function calling works: the model reads a schema, selects a tool, emits structured JSON. The orchestrator validates and executes.
    - MCP's tool definition format: `name`, `description`, `inputSchema`. The schema is the executable contract.
    - Demo: a simple MCP server with two tools. Show the JSON Schema the model sees. Walk through how the model picks the right tool based on description quality.
3. The new correctness requirements (7 min)
    - Description quality drives tool selection accuracy. Vague descriptions cause wrong tool picks. Demo: same tool with a good vs. bad description, showing the model's behavior change.
    - Type enforcement prevents injection. Protobuf's strict typing and JSON Schema's constrained outputs both validate at the serialization layer, catching malformed inputs before execution.
    - Schema drift breaks automated pipelines. In agent workflows, schema changes cascade. Practitioners identify schema drift as the top cause of broken automations.
    - Missing fields are capability gaps. If your OpenAPI spec has no `operationId` or summary, Google ADK generates a tool the agent cannot reliably use.
4. The ecosystem convergence (5 min)
    - Google contributing gRPC transport to MCP (February 2026). Protobuf's strict typing + MCP's semantic descriptions = both layers matter.
    - OpenAI Structured Outputs: constraining model generation at the decoding layer against a JSON Schema, not just prompting for JSON.
    - Google ADK's `OpenAPIToolset`: one OpenAPI spec in, callable tools out. The spec quality determines agent quality.
    - Emerging standards: OASF (Open Agentic Schema Framework), agents.json, LangChain Agent Protocol. Different organizations arriving at the same conclusion.
5. Practical adoption (5 min)
    - Start with what you have: improve your OpenAPI descriptions and add missing `operationId` fields. This is the lowest-effort, highest-impact change for AI readiness.
    - Add Protobuf for type safety across service boundaries. Use Buf for linting, breaking change detection, and code generation.
    - Schema registries for versioning. The same compatibility strategies (backward, forward, full) that protect human consumers now protect agent consumers.
    - The contract-first workflow you'd use for APIs now serves both humans and agents. The tooling (Buf, OpenAPI generators, schema registries) is already built.

## Target audience

Backend developers, API designers, platform engineers, and anyone building or integrating with AI agent tooling (MCP servers, function calling, agentic workflows). Also relevant for engineering leaders evaluating how their API strategy intersects with AI adoption.

## Takeaways

- AI agents read your schemas at runtime to decide what to do. Schema quality directly determines agent accuracy.
- MCP, OpenAI function calling, and Google ADK all depend on machine-readable, semantically annotated schemas. The model is now a consumer of your API contract.
- Contract-first development (Protobuf, OpenAPI, JSON Schema) is no longer just good practice for teams. It is a prerequisite for reliable AI-powered automation.
- The tooling ecosystem built for human developers (Buf, schema registries, OpenAPI generators) already serves agents too. The investment in schemas pays off twice.

## References

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-11-25)
- [Google Pushes for gRPC Support in Model Context Protocol (InfoQ, Feb 2026)](https://www.infoq.com/news/2026/02/google-grpc-mcp-transport/)
- [Google Cloud: gRPC as a Native Transport for MCP](https://cloud.google.com/blog/products/networking/grpc-as-a-native-transport-for-mcp)
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs/)
- [OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling/)
- [Google ADK: OpenAPI Tools](https://google.github.io/adk-docs/tools-custom/openapi-tools/)
- [Simon Willison on LLM Schemas (Feb 2025)](https://simonwillison.net/2025/Feb/28/llm-schemas/)
- [Open Agentic Schema Framework (OASF)](https://fabrix.ai/blog/some-of-the-open-source-standards-used-with-ai-agents-or-agentic-frameworks/)
- [Comparing 7 AI Agent-to-API Standards (Nordic APIs)](https://nordicapis.com/comparing-7-ai-agent-to-api-standards/)
- [Building Agents with OpenAPI: LangChain vs Haystack (Speakeasy)](https://www.speakeasy.com/blog/langchain-vs-haystack-api-tools)
