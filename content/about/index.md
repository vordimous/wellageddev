---
title: AJ Danelz
summary: Tech Lead & Chief Architect | Cloud-Native Distributed Systems | Passionate about OSS
---

Tech Lead | Cloud-Native Architect | Full-Stack Dev | OSS Advocate 🥑

[Resume PDF](./andrew_danelz.pdf) | [Linktr.ee](https://linktr.ee/vordimous)

## Summary

Engineering leader and architect with deep cloud-native, distributed systems expertise. I currently serve as technical manager, chief architect, and principal engineer for an integration platform, owning both the architecture and the team that builds it. My background spans event-driven microservices, developer tooling, and open-source advocacy, with a proven ability to collaborate globally across technical and non-technical teams. I focus on developer experience and on building systems a team can reason about.

## Core Competencies

- **Technical Leadership**: People Management, Hiring & Performance, Architecture Governance, Mentoring, Vision & Goal Planning, Metric & KPI Reporting
- **Languages & Frameworks**: Java, Spring Boot, Apache Camel, Golang, TypeScript, Vue.js, React, Node.js
- **Cloud & Infrastructure**: Kubernetes, Helm, Docker, AWS, Google Cloud, Keycloak
- **APIs & Messaging**: gRPC, Protobuf, OpenAPI, Kafka, RabbitMQ
- **Data**: PostgreSQL, Hibernate, Redis, ElasticSearch, MongoDB
- **Observability**: OpenTelemetry, Grafana, Micrometer
- **DevOps & CI/CD**: Git, GitLab CI, Gradle, Renovate, Terraform
- **Developer Advocacy & Community**: Technical Content Creation, Open-Source Maintenance, Public Speaking, Event Management

## Professional Experience

### Tech Lead, X1 Integration Platform

**Rygen Technologies** | Dec 2024 - Present

I am the technical manager of [Rygen X1 iPaaS](https://www.rygen.com/x1-integrations), serving as chief architect, principal engineer, and people manager for the 10-person product team. I set the architectural direction of the platform and approve every change that goes into it.

- **Engineering leadership**: Own hiring, growth, and performance for the team. Reviewed thousands of merge requests across dozens of repositories, and defined the review process itself: CODEOWNERS ownership, automated reviewer routing, and default approver rules.
- **3.0 Control Plane / Data Plane architecture**: Designed and built both sides of the contract between the two systems. Protobuf ownership with commit-SHA pinning and an ancestry gate so a change traces to the exact commit that produced it, a tuned gRPC transport with a documented envelope error model, a shape-versioned secret envelope, and per-workspace Data Plane deployment. Removed the legacy tenant axis and made workspace the sole scoping unit across domain, API, UI, and transport.
- **Runtime reliability**: Stopped Kubernetes rollouts from losing in-flight work, using graceful shutdown, exchange tracking, and abandoned-exchange marking. Replaced ad-hoc pools with shared Micrometer-instrumented Camel thread pools, made the Tomcat connector fail fast when saturated, and moved dispatch to leaderless gRPC with pod-local route self-healing.
- **Observability**: Introduced OpenTelemetry to X1 and extended it into a platform-wide telemetry contract: Camel route instrumentation, metrics, trace-stamped user-facing errors, Faro frontend telemetry, Grafana dashboards, and migration of flow-run history off MongoDB onto timeseries SQL storage.
- **API and frontend platform**: Standardized the API on OpenAPI with discriminator mappings and static spec generation, so the Vue UI is generated from the contract instead of hand-maintained against it. Led a frontend type-safety epic (typed routing, generated enums, a ZodForm JSON-Forms framework driven by backend annotations) and an audited design-token system with lint enforcement and dark theme.
- **Build platform and DX**: Owned the build and CI story across the org: Java 25, Spring Boot 4.x on Camel 4.x LTS, Gradle version catalogs, Renovate policy and fleet sharding, change-scoped CI jobs, module-separated caches, and a Docker image proxy for CI and testcontainers.
- **Stack**: Java, Spring Boot, Apache Camel, gRPC/Protobuf, PostgreSQL, Hibernate, Vue/TypeScript, Keycloak, Kubernetes, Helm, GitLab CI, OpenTelemetry, Grafana.

### Head of Developer Experience

**Aklivity** | Mar 2023 - Nov 2024

Aklivity is an early-stage startup that enables event-driven solutions by proxying multiple API protocols onto Apache Kafka. I created and executed the vision for all aspects of community engagement and product documentation.

- Rebuilt the developer onboarding experience for the [Zilla project](https://docs.aklivity.io/zilla/latest/), including documentation, examples repositories, and interactive demos.
- Owned community engagement through regular updates, feature announcements, and demo walkthroughs.
- Ran first-response troubleshooting for the community and fed that feedback back into product quality.
- Represented the company at developer conferences and hackathons, creating product demos and handling booth responsibilities.

### Head of Developer Relations

**WSO2** | Jan 2022 - Mar 2023

- Led the Developer Relations team, building the community around WSO2's open-source and SaaS offerings, including the Ballerina programming language.
- Created the [Ballerina Exercism.io track](https://github.com/exercism/ballerina), improving language education and adoption.
- Coordinated global events, including hackathons and conferences.
- Spoke on technical topics at industry events.
- Partnered with product teams and technical writers to improve documentation and user experience across WSO2 products.

### Lead Solutions Engineer

**WSO2** | Feb 2021 - Jan 2022

- Drove adoption of WSO2 products alongside the sales team, providing technical consultations and solution design.
- Secured the first customer for the [Asgardeo SaaS platform](https://wso2.com/asgardeo/).
- Authored an opinion article on [identity management and tech debt](https://thenewstack.io/with-identity-management-start-early-for-less-tech-debt/).

### Senior Full Stack Developer

**BMW - Apps and Services** | Feb 2020 - Feb 2021

- Built services for [BMW Charge Forward](https://www.bmwchargeforward.com/), a platform optimizing electric vehicle charging through real-time energy data.
- Delivered the backend on Node.js and NestJS, integrating AWS Lambda, SQS, and Kinesis to handle streams of vehicle data.

### Senior Enterprise Application Engineer

**AFS Logistics** | Jan 2018 - Feb 2020

- **Transportation Management System**: Led development of a high-performance microservices system built with Spring Boot, Golang, Kafka, Redis, and PostgreSQL, deployed on Kubernetes and Helm. Key components included a Rating System, a Document Manager, and a Delayed Message Delivery service.
- **Delayed Message Delivery Service**: Designed and implemented a service that scaled efficiently using Kafka and Redis.

### Full Stack Mentor

**Thinkful Inc** | Jan 2018 - Dec 2020

- Mentored students in React.js and web design patterns, helping them overcome development hurdles and deepening their understanding of full-stack web development.

### Enterprise Application Engineer

**Transplace** (now [Uber Freight](https://www.uberfreight.com)) | Oct 2012 - Dec 2017

- Maintained legacy applications, improved and extended existing products like **Real-time Search**, and architected new applications like the **Dynamic EDI Parser**.
- **Real-time Search**: Added an ElasticSearch API on top of a monolithic Groovy on Grails, PostgreSQL, and Hibernate ORM application, reducing processing load and improving user-built query latency.
- **Dynamic EDI Parser**: Developed an algorithm to parse EDI files dynamically into object formats (XML, JSON) for easier integration and extensibility.

## Open Source

### OSS Maintainer

**Independent** | Jan 2019 - Present

- [Gohlay](https://github.com/vordimous/gohlay): Creator of an open-source CLI tool written in Golang that interacts with Kafka to deliver scheduled messages. The tool is lightweight, scalable, and operates without external data dependencies.
- [vue-pdf](https://github.com/TaTo30/vue-pdf): Maintainer of a Vue.js library for rendering individual PDF pages as markup elements.
- [awesome-data-engineering](https://github.com/igorbarinov/awesome-data-engineering): Maintain the list, ensuring it remains up-to-date with the latest tools and technologies.

## Education

**B.S. in Computer Science** (Cum Laude)
Southern Wesleyan University

## Additional Information

- **Public Content**: [Highlights and links to my Blog, video, and documentation work](https://wellaged.dev/posts/devrel_content_highlights/)
- **Awards**: Eagle Scout with Silver Palm
- **Research**: Path Planning using Dijkstra and Lightning Enhancement
