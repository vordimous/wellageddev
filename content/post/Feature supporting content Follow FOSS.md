---
date: 2024-11-01T04:00:00.000Z
description: why should DevRel be in Product
author: AJ Danelz
hidden: true
---

# Feature supporting content; Follow FOSS

Focus on individual use cases and a path to success for each. Protocols like MQTT & SSE are easier since the use case is relatively uniform. HTTP & gRPC need to have clearly defined entry points for different developer communities. We should capture early-stage interest and grow the community with current features. Share progress updates to encourage new members to share ideas and see the path to implementation. By inviting feedback, we can shape the result to better match more communities. Aligning our focus with a specific set of communities will help focus our content. General paths will still be the default and first priority.

## Action plan

Keep track of features large and small in a named package that makes sense and aligns with how a developer community would understand it. Could be a whole protocol, major enhancement, or specific use case that needs a specific functionality. Every step, with some exceptions, doesn’t need to be followed but should be considered. Existing features likely fall in somewhere on this list.

1. Proposal/Spec
2. Feedback forums/chat
3. Reference docs\*
4. General features/intro/guide docs\*
5. Example\*
6. Demo\*
7. Virtual/In-person speaking
8. Should be out of Incubator
9. Release Notes
10. How to Guide\*
11. Announcement blog
12. Capability blog, small and specific (ex. [css](https://dev.to/francescovetere/css-trick-transition-from-height-0-to-auto-21de), [feature](https://dev.to/this-is-learning/the-most-upvoted-visual-studio-code-feature-4heh))
13. Real-world video

\*could be reused/added to

### EEE

- Education
  - Reference docs\*
  - General features/intro/guide docs\*
  - Example\*
  - Demo\*
  - How to Guide\*
  - Release Notes
  - Capability blog
- Evangelism
  - Release Notes
  - Announcement blog
  - Capability blog
  - Real-world video
- Engagement
  - Proposals
  - Forums
  - Chat
  - Virtual/In-person speaking

### Potential Content

- Convert HTTP/SSE/gRPC examples into guides
- Write blogs around use cases to point back to demos and guides. Update demos and use general integration components to resonate with users
  - SSE in vue/react/nativejs
  - HTTP prefer wait
  - MQTT simulator
  - gRPC gateway into Kafka, paired with feedback for proto-json conversion feature
  - Async REST
- Deployment architectures for demos
  - Highlight vscode extension
  - Sunset zilla studio?
- Zilla issues/discussions, check the roadmap/chats for items that aren’t issues and make them into discussions. Features that are mostly thought through would have more official proposal/specs attached. Other ideas could be open threads for feedback and upvoting.
- Deep dive into capabilities and how they work with Kafka.
  - MQTT sessions and Kafka
  - Routing and route matching
  - Caching layer
  - Overall performance and the use of High-performance data structures
-

### Weekly process

- Highlight any step on the action plan
- Talk about one thing each week
- Properly catalog so different types of features could be used
- Mention large and small features
- Invite to join in the conversation. Share content and ask for thoughts on or to check out a resource.

## Thoughts

General

- Share in as many relevant communities as possible
- Go to other communities and post in a centralized place
- Try to share in different places each week, don’t spam one place
- Plan for the item the week before and share early in the week

Types of content

- Thought Leadership
- Example
- Demos
- How to Guide
- Capability blog
- Announcement blog
- Real-world video
- Feedback forums
- Proposal/writeups

Tooling

- Company docs and blog
- Github Discussions are good forums
  - Most accessible
  - Public and searchable
- Slack and Discord are good places for one-off chats
  - Slack will be deleted
  - Both aren’t public
- Discord has announcement rooms for publishing updates
- Could Publish updates on Twitter
- The tech mindshare has a big presence in the Fediverse
- Reddit and Hacker News are powerful but picky

Github discussion example:  
![][image1]
