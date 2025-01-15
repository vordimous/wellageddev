---
title: Using observability in development
date: 2025-01-14T04:00:00.000Z
summary: While developing new features open telemetry and observability pipelines should be available to aid development and detect edge cases.
draft: true
tags:
- development
- observability
- opentelemetry
---


- Use observability data during development
- build dashboards before features are released
- Practice locally troubleshooting bug by using real observability logs, metrics, and traces makes you better at diagnosing production
- Reduce app specific logging
- Keep verbose logs and metrics turned on when running locally
- turn off exporters when not needed
- user Otel collector in `debug:verbose` mode
