---
title: How to Organize docs
date: 2023-11-01T04:00:00.000Z
summary: How to Organize docs
---

## Docs Structure

### Getting Started

I have 5 min. Does this project work? All visitors find this information helpful.

#### High-level intro to features

- Purpose and benefits
- Who should use the solution

#### Developer/Technical level intro

- Introduce key features
- Introduce Bindings
- Describe what the solution does using generic terms

#### Persona/Solution specific use cases

> I have a specific need and heard this project can help. Main visitor filter.

- Specialized situations.
- Enterprise Product integrations
- Full guides
- Live Demos

#### Explicit/Vanilla Configuration

> I have a working solution that requires more configuration or a use case that isn't covered.

- Deep dive into the solution config
- Comprehensive list of use cases
- Clear descriptions and concise examples

#### Quickstart

> Show me what your solution does.

- Short getting started
- Important places to continue learning
- Highlight the solution config making it happen
- Use it to point users to the next step
- At the end Download everything and run it locally

### Security

> I have a working PoC; how do I add security?

- TLS and encryption
- Securing APIs
- Authentication and authorization
- When and where to add these components
- Generic Examples

### Deploy and Operate

> How do I get my solution into production?

- Local deployment and Development environments
- Production deploy examples. Cloud, on-prem, Marketplace
- Automation and orchestration. Helm, Ansible, Terraform
- Describe Telemetry
- Logging & Monitoring with best practice examples
- Health checks and alerting
- Scaling and performance tuning
- Cloud Provider walkthroughs

### Reference & Glossary

> I am implementing my solution and need to understand what a specific attribute is

- Comprehensive overview
- Mention everything visible to the user
- Every attribute described with Reader friendly snippets
- Automatic Reference linking
- Programmatically maintain/generate

### Troubleshooting

> How can I solve a problem that isn't described in the docs?

- Common issues and solutions
- Uncommon options and settings to aid in Debugging
- GH issues and discussions callout
- Community and paid support

---

## Guides and Tutorials

General structure

- Install
  - Components install easily
- Connect
  - Portable client connection
- Success
  - Measured success criteria

Situational:

- Testable
- Make it your own
  - Use your own client
  - Bring your own components

### Quickstarts

Cover as much core functionality as possible. Create everything or the user and let them see a result.

- Low barrier, fast success, 5min proof of function
- Used to confirm the solution does what it says
- hosted

### Cookbooks/Guides

Common feature combinations.

- Teaching focused
- Organized by function/usage
- Exhaustive explanation
- Used to confirm the solution does work for more situations
- Variable components

### Feature Examples

Exhausted list of simple and isolated examples.

- Feature focused
- Organized by category
- Short copy & paste oriented and testable
- Used to add or troubleshoot features
- Self contained
- Static components

### Use Case Demos

Full end to end demos brining in other services or applications

- Show and Tell focused
- End to End, Real world scenarios
- Quick setup and walkthrough
- Used to showcase multiple functions

### Common Config Templates

Assistive config generation.

- Fill in the blank configs
- I want to bootstrap a solution
- I will bring my own components

## Docs Inspiration

### Logical Reference

- [pkg.go.dev/net/http](https://pkg.go.dev/net/http)

### Practical Organization

- [questdb.io/docs/](https://questdb.io/docs/)
- [vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html)
- [docs.ansible.com/](https://docs.ansible.com/)
- [developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)
- [docs.adyen.com/development-resources/](https://docs.adyen.com/development-resources/)
- [infisical.com/docs/documentation/getting-started/introduction](https://infisical.com/docs/documentation/getting-started/introduction)
- [docs.redpanda.com/redpanda-connect/about/](https://docs.redpanda.com/redpanda-connect/about/)

### Examples

- [vuejs.org/examples/\#hello-world](https://vuejs.org/examples/#hello-world)
- [getstream.io/chat/docs/sdk/android/compose/overview/](https://getstream.io/chat/docs/sdk/android/compose/overview/)
