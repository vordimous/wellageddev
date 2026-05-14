---
title: Extracting ZodForm to Open Source
date: 2026-05-14T09:35:00.000Z
summary: Notes on pulling the Zod-backed JSON Forms framework out of x1-ui and into a standalone package with shared core plus Vue and React adapters.
tags:
  - zod
  - json-forms
  - vue
  - react
  - oss
draft: true
---

> AI-assisted: placeholder post. Full write-up pending implementation.

The JSON Forms ecosystem doesn't ship a Zod-backed implementation, and the framework we built inside x1-ui is generic enough to live on its own. This post will document the extraction once the monorepo is scaffolded and the core package is rendering against both Vue and React adapters.
