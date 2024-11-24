---
date: 2024-11-01T04:00:00.000Z
description: Writing a performance blog
author: AJ Danelz
hidden: true
tags:
- devrel
- marketing
---

# AsyncAPI generates x MQTT messages per second

The desired outcome for this blog is the clearly demonstrate a high throughput of MQTT messages across the QOS levels. A reader should come away from the blog with the understanding that Zilla can handle a more than adequate amount of messages per second with a minimal resource cost. Any gaps in scale will be understood as a cost limitation instead of a product limitation. The additional benefit of business workflows on Kafka will be a clear differentiator along with service definition and validation using AsyncAPI schemas.

## Intro

- What is MQTT and QOS 0,1,2  
- Describe what a large IoT demand looks like and the need for high-throughput  
- What is AsyncAPI and Zilla MQTT Kafka broker  
- Mention business use case for Kafka

## Methodology

- system environment  
  - Baseline all tests on a set CPU number  
  - Ample RAM  
  - Horizontally and vertically scaled CPU  
- Describe the testing components  
  - load testing framework  
  - benchmark collection  
  - [Emqx benchmark](https://docs.emqx.com/en/emqx/latest/performance/benchmark-emqtt-bench.html)  
- Declare the test scenarios  
  - Large number of clients with few updates  
  - Few clients with frequent updates  
  - Small and large message size  
- Isolate network and hardware variables  
- Unburden Kafka with as much resources as needed  
- store all setup and configs in a repo

## Results

- Throughput  
  - Messages per second  
  - Correlate the number of clients  
  - Correlate message size  
  - Changes in latency to an MQTT subscriber  
  - Changes in latency to a Kafka consumer  
- Resources  
  - Graph RAM usage for all scenarios  
  - Group results by CPU  
  - Correlate scaling to demonstrate linear CPU usage  
- Comparisons  
  - Results from other MQTT brokers  
  - Results from other MQTT strategies  
  - Data persistence onto Kafka latency  
  - [Emqx scenarios and results](https://docs.emqx.com/en/emqx/latest/performance/performance-reference.html#test-scenarios-and-results)

## Discussion

- Highlight the best results  
- Discuss QOS complexity challenges  
- Discuss Kafka persistence vs. Broker extensions  
- Discuss trade-offs for the cost of scaling and performance  
- Mention any potential gaps in the analysis

## Conclusion

- Summarize results  
- Reinforce the simplicity of deployment and synergy with Kafka business workflows  
- Highlight the drop-in replacement for any other broker

