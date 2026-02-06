---
title: Building a User Audit Log Archive on OpenTelemetry and DuckDB | Rough Draft
summary: "How to filter business events from raw OpenTelemetry telemetry, store them in tiered object storage, and make them searchable with DuckDB — no vendor lock-in and no per-query cost."
date: 2026-02-04T04:00:00.000Z
tags:
  - opentelemetry
  - duckdb
  - protobuf
  - observability
  - architecture
---

Your application already delivers business data to users through purpose-built endpoints, schemas, and query infrastructure. But both operators and users want to know more. What happened to my file? When did that job run? How has usage changed over the last quarter? The kind of questions that live outside your core domain model.

The traditional answer is to build more. More search endpoints, more storage schemas, more application nodes handling queries, and more database capacity to collect and serve results. Costs balloon. Complexity compounds. And you still end up with a narrow view of what the application is actually doing.

It doesn't have to work that way. Your application is already capturing this information. It's sitting inside your OpenTelemetry traces. Every span carries business context: files processed, documents modified, messages delivered, errors encountered. The problem is that it's buried under thousands of internal spans that mean nothing outside of DevOps, locked inside tooling that nobody wants to teach end users to navigate.

{{< mermaid >}}
flowchart LR
  subgraph INPUT["📡 Ingestion"]
  collector["OTEL Collector<br/>100% of spans"]
  end

  subgraph FILTER["🔍 Pipeline"]
      pipeline{"Business Event<br/>Filter"}
  end

  subgraph SERVE["⚡ Query Tiers"]
      direction TB
      warm["Warm Path<br/>DuckDB · 23ms<br/>0.7% of data"]
      cold["Cold Path<br/>JSONL on S3 · 5s<br/>8% of data"]
      archive["Archive<br/>Full OTEL · 60s<br/>100% retained"]
  end

  noise(["🗑️ Infrastructure Noise<br/>92% discarded"])

  collector ==>|"all traces<br/>via OTLP"| pipeline
  pipeline ==> warm
  pipeline ==> cold
  pipeline -.-> archive
  pipeline -.-> noise

  style INPUT fill:#1a1a2e,stroke:#16213e,color:#eee
  style FILTER fill:#16213e,stroke:#0f3460,color:#eee
  style SERVE fill:#0f3460,stroke:#533483,color:#eee
  style noise fill:none,stroke:#666,color:#999,stroke-dasharray: 5 5
  style warm fill:#064e3b,stroke:#10b981,color:#ecfdf5
  style cold fill:#78350f,stroke:#f59e0b,color:#fef3c7
  style archive fill:#7f1d1d,stroke:#ef4444,color:#fef2f2
  style collector fill:#1e3a5f,stroke:#3b82f6,color:#dbeafe
  style pipeline fill:#312e81,stroke:#818cf8,color:#e0e7ff

{{< /mermaid >}}

This post walks through building a user-facing audit log archive that filters business events from raw OTEL telemetry, stores them in object storage, and makes them searchable through a type-safe API. It's accessible, safe, and cheap. No application overhead, no per-query costs, no vendor lock-in. Just industry-standard tooling (OpenTelemetry, Protobuf, DuckDB) wired together in a way that serves the people who actually use your software.

## The Problem: Observability Data vs. User Data

Application observability and user audit logs are usually treated as separate concerns. Observability tools like Datadog and Splunk capture everything (HTTP requests, database queries, cache hits, internal retries) and surface it to DevOps teams. Audit logs are typically a separate system: a database table, a dedicated logging service, or a third-party compliance tool.

But if your application is already instrumented with OpenTelemetry, the data from both flows through the same pipeline. Every business transaction that matters to your users (a file upload, a document modification, a payment processed) already exists as OTEL spans with rich attributes. The challenge is filtering out the observability noise and capturing only the data relevant to end users.

This creates two problems:

**Volume and cost.** A platform processing thousands of transactions per day generates gigabytes of raw OTEL data monthly. Most of it is internal infrastructure spans that no user will ever see. Storing and querying all of it through managed platforms (BigQuery at $6.25/TB scanned, Datadog's retention pricing) gets expensive fast, and most of that cost goes toward data users don't need.

**Two query patterns.** Users browsing their recent activity need fast, filtered, paginated results, ideally under 100 milliseconds. But when they need to drill into a specific transaction for a support ticket or compliance audit, they need the full event timeline with all attributes and context, even if it takes a few seconds. No single storage tier serves both needs economically.

The approach described here solves both problems: filter OTEL telemetry to business-relevant events, store them in tiered storage matched to query patterns, and expose them through a search API that users can query directly.

## Why DuckDB?

[DuckDB](https://duckdb.org/) is an open-source, in-process SQL database designed for analytical queries. It's often described as "SQLite for analytics" because it runs embedded in your application with no external server to manage. What makes it useful for audit log archives specifically is its ability to read structured files directly from object storage.

With the `httpfs` extension, DuckDB can query JSONL and Parquet files stored in S3, GCS, or any S3-compatible store, such as MinIO. It handles on-the-fly gzip decompression, reads Hive-partitioned directory layouts, and uses columnar execution with vectorized processing (the same techniques used by purpose-built analytics engines).

In a proof of concept against real production OTEL data, the performance gap was significant:

| Data Tier | Query Time | Monthly Size | Reduction vs Raw |
| ------------------------- | ---------- | ------------ | ---------------- |
| Full OTEL JSONL (archive) | 52s | 3.8 GB | — |
| Business-filtered JSONL | 29s | 2.1 GB | 45% |
| Audit-event JSONL | 5s | 400 MB | 92% |
| DuckDB warm path | 23ms | 26 MB | 99.3% |

The first row is everything the OTEL Collector captures: every internal span, every HTTP request, every database query. The third row is just the business events that matter to users. Filtering out observability noise reduces data volume by 92%.

The warm path (a DuckDB file containing denormalized audit summaries) is 2,200x faster than scanning raw OTEL JSONL. That's the difference between a sub-second API response and a minute-long wait.

DuckDB is also free. No per-query cost, no scan-based billing, no retention tiers. It runs wherever your application runs: in a container, a serverless function, or on a developer's laptop. The only cost is the compute your application is already using.

## Architecture: Hot / Warm / Cold

Instead of forcing all queries through a single storage layer, the architecture uses tiered storage matched to query patterns:

{{< mermaid >}}
flowchart TD
  collector[OTEL Collector]
  pipeline[Data Pipeline]
  duckdb[(DuckDB File)]
  index[(Index — MongoDB)]
  storage[(Object Storage — GCS/S3/MinIO)]
  api[Audit Log Search API]
  consumers[Consumers — UI, Support Tools, APIs]

  collector -- all traces via OTLP --> pipeline
  pipeline -- warm path --> duckdb
  pipeline -- trace lookup --> index
  pipeline -- audit events JSONL --> storage
  duckdb --> api
  index --> api
  storage --> api
  api --> consumers

{{< /mermaid >}}

The important piece is the **data pipeline** sitting between the OTEL Collector and storage. It receives the full firehose of observability data and filters it down to business-relevant events, the audit trail that users and support teams actually need. Internal infrastructure spans (HTTP middleware, database connection pools, cache operations) get discarded or routed to a separate observability store.

**Hot:** In-memory cache or server-sent events. Sub-10ms responses for repeated queries and real-time browser updates. Standard application-level caching.

**Warm:** A DuckDB file containing denormalized audit summaries: transaction IDs, statuses, timestamps, durations, and event counts. Written by the ingestion processor, read concurrently by the search API. DuckDB supports concurrent readers with a single writer, so there are no conflicts. Query times are under 100ms, fast enough for paginated user-facing UIs.

**Cold:** Filtered JSONL files on object storage, organized by date using Hive-style partitioning (`year=YYYY/month=MM/day=DD/`). These contain the full event detail for each business transaction. DuckDB reads them directly via `httpfs`, handling compression and schema detection on its own. Response times range from 2 to 10 seconds, which is acceptable for drill-down views and support investigations.

**Archive:** The full, unfiltered OTEL JSONL export from the Collector. The compliance-grade record of everything, including internal spans. Query times range from 10 to 60+ seconds and are used only for deep debugging and regulatory audits.

A trace index (in MongoDB, or any fast key-value store) provides O(1) lookups to locate which archive file contains a specific transaction, avoiding full scans when drilling into a known trace ID.

The same query engine (DuckDB) serves all tiers. The warm path queries a local file. The cold path queries remote JSONL. The API code is nearly identical; only the file path changes.

## Technology Choices

The technology decisions here were driven by accessibility, adaptability, and cost. An audit log system needs to scale with user demand, not just infrastructure load, so the choices lean toward tools that are easy to adopt and cheap to run.

**DuckDB** is open-source, embeddable, and requires zero infrastructure. It reads JSONL and Parquet from any S3-compatible storage. Anyone who knows SQL can write queries against it. There's no cluster to manage, no license to negotiate, and no vendor lock-in. If DuckDB disappeared tomorrow, the JSONL files in object storage would still be just files, queryable by any tool that reads JSON.

**OpenTelemetry Collector** is the data collection layer. It's vendor-neutral by design: it receives traces via OTLP (gRPC or HTTP), applies filtering and routing, and exports to any destination. The Collector's [file exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/fileexporter) writes JSONL with configurable rotation and compression. Using OTEL means the audit log pipeline isn't a separate instrumentation system; it piggybacks on the observability instrumentation your application already has.

**Node.js** was chosen for the search API for developer familiarity. More developers on a typical team can contribute to and maintain a Node.js/TypeScript service than one written in Java, Go, or Rust. It deploys to containers, serverless functions, and VMs with minimal friction. If the cost or scaling needs change, the service can be ported to Cloud Functions or Cloud Run with minimal rework.

**Protobuf** provides the schema contract across the pipeline. The same `.proto` definitions generate types for every language in the system (Java for the ingestion processor, TypeScript for the search API, and any other consumer). The choice here is about correctness, not performance. For an audit log system where data integrity matters, a single source of truth for domain types eliminates an entire category of bugs.

All four are open-source, widely adopted, and replaceable. The architecture doesn't depend on any single vendor's proprietary technology.

## The Protobuf & gRPC Data Pipeline

### OTEL Is Built on Protobuf

OpenTelemetry is more than a set of SDKs. It's a data format specification built on Protocol Buffers. The [OTLP protocol](https://opentelemetry.io/docs/specs/otlp/) defines trace, metric, and log schemas as Protobuf messages. When the OTEL Collector receives a span via gRPC, it arrives as a structured `ExportTraceServiceRequest` proto message with strongly typed fields for trace IDs, span kinds, attributes, events, and status codes.

Protobuf here acts as a **schema contract**. Field types, field numbers, and field names are guaranteed not to change after a specification reaches stability. The [OTEL proto stability guarantees](https://opentelemetry.io/docs/specs/otel/document-status/) ensure backward compatibility: new fields can be added, but existing fields are never removed or renamed. For an audit log archive that may need to query data written years ago, stability matters.

### Schema Synchronization Across Applications

When an ingestion processor (written in Java) and a search API (written in TypeScript) both need to understand what an "audit event" looks like, you have two choices:

1. **Manual mapping.** Each service defines its own types and manually maps between them. Every schema change requires coordinated updates across services, and drift is inevitable.
2. **Generated types from a shared proto.** Define the schema once in `.proto` files, generate language-specific types, and share the definitions across services.

The second approach eliminates drift by construction. Tools like [Buf](https://buf.build/) make this workflow practical by handling linting, breaking change detection, and code generation across languages from a single `buf.gen.yaml` configuration. Instead of wiring together `protoc` plugins manually, Buf manages the full generation pipeline.

Consider an audit domain with 40+ event types spanning file processing, document modification, messaging, request/response cycles, error handling, scheduling, and retry logic:

```protobuf
// Defined once in the event.proto
enum EventType {
  EVENT_TYPE_UNSPECIFIED = 0;

  // File events (1-9)
  EVENT_TYPE_FILE_RECEIVED = 1;
  EVENT_TYPE_FILE_PROCESSED = 2;
  EVENT_TYPE_FILE_SENT = 4;

  // Document events (10-19)
  EVENT_TYPE_DOCUMENT_RECEIVED = 10;
  EVENT_TYPE_DOCUMENT_MODIFIED = 13;

  // Message events (20-29)
  EVENT_TYPE_MESSAGE_RECEIVED = 20;
  EVENT_TYPE_MESSAGE_PROCESSED = 22;

  // ... 40+ event types total
}
```

Running Buf's code generation with `protoc-gen-es` (for TypeScript) and `protoc-gen-java` (for Java) configured in `buf.gen.yaml` produces type-safe enums in both languages from this single file. Buf's breaking change detection (`buf breaking`) also catches any accidental modifications to stable field numbers or enum values before they reach a build. Adding a new auditable event type means adding one line to the proto. Both services pick it up on their next build.

### Deriving OTEL Event Names from Proto Enums

One practical benefit of proto-first design: OTEL span event names can be derived algorithmically from enum names instead of maintained in a separate mapping table:

```typescript
// Enum name: FILE_RECEIVED
// → lowercase: file_received
// → prepend prefix: myapp.event.file_received
// → OTEL span event name

export function toOtelEventName(type: EventType): string {
  const enumName = EventType[type];
  return "myapp.event." + enumName.toLowerCase();
}

// Reverse: parse OTEL event name back to proto enum
export function fromOtelEventName(otelEventName: string): EventType {
  const enumName = otelEventName.substring("myapp.event.".length).toUpperCase() as keyof typeof EventType;
  return EventType[enumName] ?? EventType.UNSPECIFIED;
}
```

So:

- The proto enum is the single source of truth for event classification.
- No separate mapping files to maintain.
- Event name derivation is testable and deterministic.
- End-event classification (which events mark a transaction as complete) is defined as a `Set<EventType>` alongside the enum, not scattered across services.

This is also how the data pipeline decides which spans are audit-relevant: if a span contains events matching known `EventType` names, it's a business event. Everything else is infrastructure noise.

### How Protobuf Connects to DuckDB

The proto-defined schema determines three things in the search layer:

1. **What gets extracted** from raw OTEL JSON? The domain mapper knows which OTEL attributes to pull because the proto defines the audit event fields.
2. **How it maps to DuckDB.** Proto field names map to DuckDB column aliases in query CTEs.
3. **What's searchable in the API?** The `SearchFields` configuration maps user-friendly names to OTEL attribute keys, which are themselves derived from proto-defined semantic conventions.

A schema change in the proto propagates through the entire stack: the ingestion processor writes the new field, the search service extracts it, and the API exposes it to users. One proto update.

## Implementation Deep-Dive

### Data Layout: Hive-Partitioned JSONL on Object Storage

The OTEL Collector's file exporter writes JSONL files to object storage. Organizing them with Hive-style partitioning enables DuckDB to scan only the relevant date partitions:

```

s3://audit-data/

year=2025/

month=01/

day=15/

events-001.json.gz

events-002.json.gz

day=16/

events-001.json.gz

month=02/

...

```

DuckDB reads compressed JSONL directly, with no decompression step or ETL pipeline. A query for January 15th reads only the files in `year=2025/month=01/day=15/`.

**A practical caveat:** DuckDB's glob-based Hive partition filtering can be slower than expected. When given a broad glob pattern, DuckDB enumerates _all_ directories first, then filters them, rather than walking only the matching directories. In benchmarks, this showed as \~23 seconds with a glob versus \~3 seconds with explicit paths. The fix is to build explicit per-day paths in application code instead of relying on a single broad glob:

```typescript

// Instead of: s3://bucket/year=*/month=*/day=*/*.json.gz

// Build explicit paths for the requested date range:

private buildGlobPathsForRange(startDate: string, endDate: string): string[] {

const paths: string[] = [];

for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {

const year = d.getFullYear();

const month = String(d.getMonth() + 1).padStart(2, '0');

const day = String(d.getDate()).padStart(2, '0');

paths.push(

`s3://${bucket}/year=${year}/month=${month}/day=${day}/*.json*`

);

}

return paths;

}

```

This limits the scan to exactly the requested days, with a configurable maximum (e.g., 90 days) to prevent runaway queries.

### DuckDB Client: CLI Subprocess Pattern

There are two ways to use DuckDB from Node.js: via native bindings or via a CLI subprocess. The CLI approach (spawning `duckdb -json -c <sql>`) has the advantage of greater stability.

> **Note on Node.js bindings**: The original `duckdb` npm package is deprecated as of DuckDB v1.4.x (Fall 2025). The recommended replacement is `@duckdb/node-api`, a high-level wrapper around `@duckdb/node-bindings`. If you're starting a new project, evaluate the new bindings. The CLI subprocess pattern described here was chosen before the new bindings were available and remains a valid alternative for maximum compatibility.

The subprocess client configures S3 access via DuckDB's `httpfs` extension, then runs the query:

```typescript

async query<T>(sql: string): Promise<T[]> {

const fullSql = `

INSTALL httpfs;

LOAD httpfs;

SET s3_endpoint='${this.s3Endpoint}';

SET s3_access_key_id='${this.accessKey}';

SET s3_secret_access_key='${this.secretKey}';

SET s3_use_ssl=${this.useSsl};

SET s3_url_style='path';

${sql}

`;



return new Promise((resolve, reject) => {

const duckdb = spawn('duckdb', ['-json', '-c', fullSql]);



let stdout = '';

duckdb.stdout.on('data', (data) => { stdout += data.toString(); });



duckdb.on('close', (code) => {

if (code !== 0) return reject(new Error(`DuckDB failed`));

resolve(stdout.trim() ? JSON.parse(stdout) : []);

});

});

}

```

The `-json` flag tells DuckDB to emit results as a JSON array, which matches the API response format. Each query is a separate subprocess with no connection pooling or state leaks. If DuckDB crashes, it doesn't take down the API process.

The `s3_url_style='path'` setting is important for S3-compatible stores like MinIO that use path-style URLs rather than virtual-hosted-style.

### Unnesting OTEL's Nested Structure

OTEL JSONL is deeply nested. A single line contains a `resourceSpans` array, each with `scopeSpans`, each with `spans`. Getting to individual spans requires three levels of unnesting.

DuckDB's `unnest()` function handles this well in CTEs (Common Table Expressions):

```sql

WITH raw_data AS (

SELECT * FROM read_json(

's3://bucket/year=2025/month=01/day=15/*.json*',

format='newline_delimited',

ignore_errors=true

)

),

-- Level 1: unnest resourceSpans

unnested AS (

SELECT unnest(resourceSpans) as rs FROM raw_data

),

-- Level 2: unnest scopeSpans

scope_spans AS (

SELECT unnest(rs.scopeSpans) as ss FROM unnested

),

-- Level 3: unnest spans

spans AS (

SELECT unnest(ss.spans) as span FROM scope_spans

)

SELECT

span.traceId as trace_id,

span.spanId as span_id,

span.name as span_name,

CAST(span.startTimeUnixNano AS BIGINT) as start_nanos,

CAST(span.endTimeUnixNano AS BIGINT) as end_nanos,

span.attributes as attrs

FROM spans

```

The `ignore_errors=true` flag matters in production. Without it, a single malformed JSON line causes the entire query to fail.

### Extracting Attributes with `list_filter` and `list_extract`

OTEL attributes are stored as an array of key-value pairs, not a flat map:

```json
{
  "attributes": [
    { "key": "http.method", "value": { "stringValue": "POST" } },

    { "key": "http.status_code", "value": { "intValue": "200" } },

    { "key": "myapp.transaction.id", "value": { "stringValue": "abc-123" } }
  ]
}
```

Extracting a specific attribute requires filtering the array by key, then accessing the value. DuckDB's `list_filter()` and `list_extract()` functions handle this:

```sql

-- Extract a specific attribute value from the OTEL attributes array

(list_extract(

list_filter(attrs, x -> x.key = 'myapp.transaction.id'), 1

)).value.stringValue as transaction_id

```

This reads as: "filter the attributes array to entries where key equals 'myapp.transaction.id', take the first match, and extract its stringValue."

For integer attributes (like HTTP status codes), swap `stringValue` for `intValue`. For booleans, `boolValue`. The value type matches the OTEL attribute type, which is defined by the proto schema.

### Dynamic Search with Configurable Fields

Instead of hardcoding which OTEL attributes are searchable, the search API uses a field configuration that maps user-friendly names to internal OTEL attribute keys:

```typescript
interface SearchFieldDefinition {
  name: string; // API field name: 'httpStatus'

  label: string; // UI label: 'HTTP Status'

  otelKey: string; // OTEL key: 'http.response.status_code'

  valueType: "string" | "int" | "bool" | "double";

  category: "http" | "database" | "messaging" | "audit" | "service" | "error";

  description: string; // Tooltip text
}

const SEARCH_FIELDS: SearchFieldDefinition[] = [
  {
    name: "url",

    label: "URL",

    otelKey: ATTR_URL_FULL, // from @opentelemetry/semantic-conventions

    valueType: "string",

    category: "http",

    description: "Full request URL",
  },

  {
    name: "httpStatus",

    label: "HTTP Status",

    otelKey: ATTR_HTTP_RESPONSE_STATUS_CODE,

    valueType: "int",

    category: "http",

    description: "HTTP response status code",
  },

  // ... 18 fields across HTTP, Database, Messaging, Audit, File, Service, Error
];
```

OTEL attribute keys are sourced from `@opentelemetry/semantic-conventions` where available, keeping them consistent with the broader OTEL ecosystem. Custom domain attributes use a namespaced convention (e.g., `myapp.transaction.id`).

The API exposes a `/fields` endpoint that returns all searchable fields with metadata:

```json
{
  "fields": [
    {
      "name": "httpStatus",

      "label": "HTTP Status",

      "valueType": "int",

      "category": "http",

      "description": "HTTP response status code"
    }
  ],

  "count": 18
}
```

A UI consuming this endpoint can dynamically generate filter controls (dropdowns, text inputs, numeric ranges) without hardcoding field lists. Adding a new searchable field means adding one entry to the configuration; the API, query builder, and field discovery all pick it up. This works well for audit log UIs where different users need different filters: a support agent searches by customer ID, a compliance team filters by date range and document type, and both work against the same API.

### Advanced Search: Structured Filters + Free-Text

The advanced search endpoint combines structured attribute filters with a free-text fallback. Each filter specifies a field, an operator, and a value:

```json
{
  "startDate": "2025-01-01",

  "endDate": "2025-01-31",

  "filters": [
    { "field": "httpStatus", "operator": "gte", "value": "400" },

    { "field": "serviceName", "operator": "eq", "value": "order-api" }
  ],

  "freeText": "timeout"
}
```

The query builder translates each filter into a type-aware SQL condition. For string fields, it uses quoted comparison. For numeric fields, it validates and casts:

```typescript
// Type-aware SQL generation based on field definition

switch (filter.operator) {
  case "eq":
    return fieldDef.valueType === "string" ? `AND ${column} = '${escapedValue}'` : `AND ${column} = ${validateNumeric(filter.value)}`;

  case "contains":
    return `AND CAST(${column} AS VARCHAR) ILIKE '%${escapedValue}%'`;

  case "gte":
    return `AND ${column} >= ${validateNumeric(filter.value)}`;

  // ... gt, lt, lte, neq
}
```

The free-text fallback uses `ILIKE` across the full JSON-serialized attributes:

```sql

WHERE (structured_conditions)

OR attrs_json ILIKE '%timeout%'

```

This gives users a "Google-like" search experience (type anything and find matching audit events) while also supporting precise, structured queries when they know exactly what they're looking for.

### Handling Nanosecond Timestamps

OTEL timestamps are in nanoseconds (as strings in JSON, since JavaScript's `Number` type can't safely represent them). DuckDB casts them to `BIGINT`, and the search service uses JavaScript's `BigInt` for arithmetic:

```typescript
const startNanos = BigInt(row.start_nanos);

const endNanos = BigInt(row.end_nanos);

const durationMs = Number((endNanos - startNanos) / BigInt(1_000_000));

const startTime = new Date(Number(startNanos / BigInt(1_000_000))).toISOString();
```

Nanosecond precision is preserved through the DuckDB query and converted to millisecond ISO timestamps for the API response.

## Results & Viability

The proof of concept confirms DuckDB works as a query engine for user audit log archives. Results against real production data:

| Query Pattern | Warm (DuckDB file) | Cold (JSONL on GCS) |
| ------------------------------ | ------------------ | ------------------- |
| Single transaction by ID | 22ms | 4-11s |
| Event timeline for transaction | 30ms | N/A |
| Filtered list with pagination | 28ms | N/A |
| Date range (1 week) | 24ms | 15-38s |
| Monthly aggregation | 23ms | 57-144s |

The warm path handles all interactive UI queries under 30ms, fast enough that the audit log feels instant. The cold path handles drill-down into full transaction detail in single-digit seconds for most cases. If data hasn't been processed into the warm tier yet, the cold path still works, just slower.

### Who This Serves

Since the architecture filters business events from OTEL observability data and exposes them through a searchable API, it serves both internal teams and end users:

- **End users** browsing their transaction history, checking the status of a file upload, or reviewing a document processing timeline, directly in the application UI
- **Support teams** investigating a customer's issue by searching for their transaction ID or correlation ID across months of audit data
- **Compliance teams** auditing transaction records for specific document types, date ranges, or error conditions
- **DevOps teams** that can fall back to the full OTEL archive when they need infrastructure-level spans for debugging

The field discovery endpoint lets new consumers build their own query UIs without coordinating with the API team. A customer-facing audit view, an internal support tool, and a compliance dashboard can all use the same API with different field filters.

### The Cost Equation

The entire stack runs on open-source software: DuckDB, OpenTelemetry, Node.js, and Protocol Buffers. On Kubernetes, the search API runs as a standard deployment with horizontal pod autoscaling. No per-query billing, no scan-based pricing, no minimum spend.

The data lives in object storage, the cheapest durable storage available from any cloud provider. A year of audit log data that might cost thousands in a managed observability platform costs a few dollars per month in GCS or S3 standard storage. And because the pipeline filters out infrastructure noise before archiving, the volume is 92% smaller than raw OTEL exports.

For the warm path, a DuckDB file containing months of denormalized audit summaries stays well under 100 MB, fitting in memory on the smallest container.

### What's Next

A few optimizations we're looking at next:

- **DuckDB's read-through caching** ([announced in January 2026](https://duckdb.org/2026/01/22/read-through-caching.html)) can cache HTTP range requests locally, reducing repeated cold-path query times.
- **Parquet conversion** for older archives. DuckDB's columnar format is faster than JSONL for analytical queries, and DuckDB can perform the conversion itself.
- **Redis caching** for frequently-accessed query patterns, moving from in-process cache to shared cache across API replicas.

[Clay Smith's "Cheap OpenTelemetry Lakehouses"](https://clay.fyi) work covers a similar Parquet + DuckDB + Iceberg pattern for OTEL storage and arrived at many of the same conclusions independently. The convergence is a good sign: embedded SQL engines over open file formats on object storage seem like a solid pattern for anyone who needs to make telemetry data accessible to users, not just DevOps.
