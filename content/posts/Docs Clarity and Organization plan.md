---
title: How to Organize docs
date: 2024-11-01T04:00:00.000Z
summary: why should DevRel be in Product
draft: true
---


## **Outcomes**

* #### Clear Organization

* #### Comprehensive information

* #### Consistent & Searchable wording

* #### Concise Examples and Snippets

* #### Interactive Samples

* #### Testable code

* #### Help and Support

## **Feature content**

#### Foundation:

* #### Full Reference docs, descriptions and snippets

* #### Reader-friendly, concise vanilla example

* #### Update any impact on existing sections

#### Learning:

* #### Update or create a concept page

* #### Consumer blog

#### Interaction:

* #### Runnable Guide, Fewest dependencies

* #### Interactive Real world demo, Industry standard dependencies

## **Docs Structure**

### **Getting Started**

#### I have 5 min. Does this project work? All visitors find this information helpful.

#### **High-level intro, What is Zilla?**

* #### Intro to features

* #### Purpose and benefits

* #### Who should use Zilla

#### **Developer/Technical level intro, How does Zilla work?**

* #### Overview of Zilla

* #### Introduce Kinds

* #### Introduce Bindings

* #### Describe what Zilla does using generic terms

#### **Persona/Solution specific use cases**

#### I have a specific need and heard this project can help. Main visitor filter.

* #### Specialized situations. IoT, Async Web, Service Mesh

* #### Leverages Existing specs. OpenAPI, AsyncAPI, Proto

* #### Enterprise Product integrations

* #### Full guides

* #### Live Demos

#### **Explicit/Vanilla Configuration**

#### I have a working Zilla config that requires more configuration or a use case that isn't covered.

* #### Deep dive into Zilla config

* #### Comprehensive list of use cases

* #### Clear descriptions and concise examples

#### **Quickstart**

* #### Easy install options

* #### Short getting started

* #### Important places to start using Zilla

* Highlight the zilla.yaml config making it happen  
* Use it to point users to the next step  
* At the end Download everything and run it locally

#### **Describe Bindings**

### **Integration**

#### How does Zilla leverage the resources I already have

* #### Detailed list of Supported Kafka brokers with testing results grid

* #### Data governance describes the usecases where schemas are needed

* #### Describe Catalogs and any of the services used with them

* #### Message formats and validation (e.g., JSON, Avro)

* #### Data filtering on fetch based on schema fields

* #### Generic Examples

### **Security**

#### I have a working PoC; how do I add security?

* #### Describe Guards and Vaults

* #### TLS and encryption

* #### Securing APIs

* #### Authentication and authorization

* #### When and where to add these components with zilla

* #### Generic Examples

### **Deploy and Operate**

#### How do I get my solution into production?

* #### Local deployment and Development environments

* #### Production deploy examples. Cloud, on-prem, Marketplace

* #### Automation and orchestration. Helm, Ansible, Terraform

* #### Describe Telemetry

* #### Logging & Monitoring with best practice examples

* #### Health checks and alerting

* #### Scaling and performance tuning

* #### Cloud Provider walkthroughs

### **Reference & Glossary**

#### I am implementing my solution and need to understand what a specific attribute is

* #### Comprehensive overview

* #### Mention everything visible outside of Zilla

* #### Every attribute described with Reader friendly snippets

* #### Automatic Reference linking

* #### Programmatically maintain/generate

### **Troubleshooting**

#### How can I solve a problem that isn't described in the docs?

* #### Common issues and solutions

* #### Uncommon options and settings to aid in Debugging

* #### GH issues and discussions callout

* #### Community and paid support

---

## Guides and Tutorials

General structure

* Install  
  * Components install easily  
* Connect  
  * Portable client connection  
* Success  
  * Measured success criteria  
* Make it your own  
  * Use your own client  
  * Bring your own components

Types:

* Quickstart  
  * Low barrier, fast success, 5min proof of function  
  * Used to confirm Zilla could work  
  * hosted  
* Cookbook  
  * Teaching focused  
  * Organized by function/usage  
  * Exhaustive explanation  
  * Used to confirm Zilla does work  
  * Variable backend  
* Examples  
  * Feature focused  
  * Organized by category  
  * Short copy & paste oriented and testable  
  * Used to add or troubleshoot features  
  * Self contained  
* Demo  
  * Show and Tell focused  
  * End to End, Real world scenarios  
  * Quick setup and walkthrough  
  * Used to showcase multiple functions  
* Templates  
  * Fill in the blank configs  
  * I want to bootstrap a solution  
  * I will bring my own components  
  * Add to the zilla cli

		

### Resources

#### Quickstart

All resources in zilla-docs repo

* ~~gRPC Kafka proxy~~  
* ~~HTTP Kafka proxy~~  
* ~~MQTT Broker Kafka proxy~~  
* HTTP Kafka Async  
* MQTT over WS

#### Cookbooks

All resources in zilla-docs repo

* gRPC service mesh  
* HTTP JSON-Avro, JSON-Proto, JSONSchema REST proxy  
* ~~MQTT broker with WS~~  
* JWT Authn with Keycloak  
* K8s HA resources and autoscaling  
* Kafka auth methods  
  * Sasl/scram  
  * Sasl/SSL  
  * mTLS  
  * RP, CC clouds  
  * Kafka APIs, (Warpstream, VoltDB, etc.)  
* 

#### Examples

All resources in zilla-examples repo

* Kafka mapping  
  * REST  
  * Sync/Async  
  * SSE  
  * MQTT  
  * gRPC  
* Kafka Fanin/Fanout  
  * Http oneway  
  * SSE Fanout  
  * gRPC oneway  
  * gRPC Fanout  
* Asycapi Kafka  
  * REST  
  * Async  
  * SSE  
  * MQTT  
* Kafka Schemas  
* API gateway  
  * Schemas  
  * HTTP  
  * gRPC  
* Authn  
  * SSE JWT  
  * HTTP JWT  
  * MQTT JWT  
  * WS  
* Install on  
  * Linux server  
  * Helm and ingress  
  * ArgoCD?  
  * Portainer?

Current list:  
- auto generate  
    asyncapi.http.kafka.proxy  
    asyncapi.mqtt.kafka.proxy  
    asyncapi.sse.kafka.proxy  
    asyncapi.mqtt.proxy  
    asyncapi.sse.proxy

- kafka mapping  
    grpc.kafka.proxy  
    http.kafka.async  
    http.kafka.cache  
    http.kafka.crud  
    http.kafka.oneway  
    http.kafka.sync  
    mqtt.kafka.broker

- kafka fanout  
    grpc.kafka.fanout  
    sse.kafka.fanout

- validation  
    http.kafka.karapace  
    http.proxy.schema.inline

- kafka auth  
    http.kafka.sasl.scram  
    http.redpanda.sasl.scram

- API gateway  
    grpc.proxy  
    http.proxy  
    openapi.proxy  
    http.filesystem  
    http.filesystem.config.server

- client auth  
    http.echo.jwt  
    mqtt.kafka.broker.jwt  
    sse.proxy.jwt

- PoC  
    grpc.echo  
    grpc.kafka.echo  
    http.echo  
    amqp.reflect  
    tcp.echo  
    tcp.reflect  
    tls.echo  
    tls.reflect  
    ws.echo  
    ws.reflect

- deployment  
    kubernetes.prometheus.autoscale

#### Demos

All resources in zilla-demos repo

#### Templates

All resources in zilla-templates repo or or templates folder of zilla

* REST proxy  
* MQTT broker

---


## **Docs Inspiration**

### **Logical Reference**

* #### [https://pkg.go.dev/net/http](https://pkg.go.dev/net/http)

### **Practical Organization**

* #### [https://questdb.io/docs/](https://questdb.io/docs/)

* #### [https://vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html)

* #### [https://docs.ansible.com/](https://docs.ansible.com/)

* #### [https://developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)

* #### [https://docs.adyen.com/development-resources/](https://docs.adyen.com/development-resources/)

* #### [https://infisical.com/docs/documentation/getting-started/introduction](https://infisical.com/docs/documentation/getting-started/introduction)

* #### [https://docs.redpanda.com/redpanda-connect/about/](https://docs.redpanda.com/redpanda-connect/about/)

### **Examples**

* #### [https://vuejs.org/examples/\#hello-world](https://vuejs.org/examples/#hello-world)

* #### [https://getstream.io/chat/docs/sdk/android/compose/overview/](https://getstream.io/chat/docs/sdk/android/compose/overview/)

## **Tasks & Timelines**

#### sm: 1-3 days md: 1-2 weeks lg: 1 month xl: months xxl: unknown

* #### **Help and Support**: sm/md

  * #### Discussion and Issue templates

  * #### Website, Docs, and Community instructions to direct conversations into GH

* #### **Clear Organization**: sm/md

  * #### Validate and implement structure

* #### **Comprehensive information**: lg/xl

  * #### Automate capability comparison

  * #### Ensure all capabilities have foundational content

  * #### Update or create concept pages where necessary

* #### **Consistent & Searchable wording**: md/lg

  * #### Comb over every word in docs

  * #### Build glossary

  * #### Update contributing best practice

  * #### Improve writing guide automation

* #### **Concise Examples and Snippets**: md/lg

  * #### Leverage functioning examples for each binding

  * #### parse examples to include as snippets

* #### **Interactive Samples**: xl/xxl

  * #### Build and Host Demos

* #### **Testable code**: xl/xxl

  * #### Add programmatically runnable tests to Every project and example

  * #### Run some tests on every commit to develop

  * #### Run all tests on every release candidate and release

* #### **Download artifacts**: xl/xxl

  * #### Make all examples and demos downloadable artifacts

  * #### Maintain a simple download a run script

  * #### Query and track download numbers daily

#### 
