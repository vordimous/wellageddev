---
title: Why are Protobufs not more popular? - WIP
date: 2025-02-14T05:00:00.000Z
summary: How to bring Protobufs into the forefront of a developers API decision
draft: false
tags:
- devrel
- protobuf
- api
---

- Some devs just think in RPC (remote procedure calls)
- gRPC and SOAP make sense because the contract makes sense to them
- the data in flight is not a worry because the contract and the communication can be trusted
- Trust the process


- Devs want to see the data in flight to trust the HTTP layers are doing what they are supposed to
- Contract first APIs are harder to build initially
- Observe the whole process
- Schema definitions are a second layer description of what was built


- Newer devs don't observe the whole process anymore
- backend as a service hide the process
- heavy frameworks or vibe coding build the contracts
- REST is the default because so many before already chose that
- the well worn path is the one often tread


- Rising tides float all boats
- Protobuf is the best kind of RPC contract to define services APIs
- More applications need open contributions to build RPC first developer APIs
- Existing REST apis can exist the same build on top of the RPC layer
- The Protobuf contract becomes the foundation
- All parties benefit from a clear contract
- Protobuf fwd and bwd compatibility reduce braking changes between versions
- Once more projects are past the hurdle of implementing RPC first the path will become worn
- Maintaining larger projects with RPC contracts become easier
- The maintainers and devs seeing the success will incorporate RPC contracts sooner


- Start with FOSS tools with developer APIs
- Just creating an MR will bring awareness to the maintainers and anyone who uses the project
- Don't create MRs with an AI
- OTEL is a great place to start as gRPC is already a know component
- Metrics and Data contracts like Protobuf are a perfect fit


- Any work for this effort can be streamed and questions from devs new to Protobufs can be answered live
