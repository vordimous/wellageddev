---
title: Organizing your Quickstart, Cookbooks, Examples, and Demos
date: 2024-06-08T05:00:00.000Z
summary: How to organizing your Quickstart, Cookbooks, Examples, and Demos
draft: false
tags:
- devrel
---

As a developer, I want an easy way to run different samples and use the code to configure my own usecases.

## Acceptance criteria

- Single entry point to run all samples with a script or cli
- Each sample shouldn't have extra complexity that distracts from the demonstrated use
- Each sample has a simple `setup` and `teardown` script that handles everything for the dev and explains how the setup is achieved
- A sample should be testable via a `test` script
- Sample variations are self contained and adjusted by changing defined variables

### Quickstart

All resources are found in the repo

- Low barrier of entry, fast success, 5min proof of function
- Used to confirm app can do what it says
- hosted where possible

### Cookbooks

All resources are found in a `cookbook` folder or repo

- Teaching focused
- Organized by use case
- Exhaustive explanation
- Used to guide
- Variable backend vendors
- Includes Install instructions

### Examples

All resources are found in an `examples` folder or repo

- Feature focused
- Organized by function
- Short copy & paste oriented
- Used when adding or troubleshoot features
- Static backend vendors

### Demos

All resources are found in a `demos` repo

- Show and Tell focused
- End to End, Real world scenarios
- Quick setup and walkthrough
- Used to showcase multiple functions & use cases
- hosted when possible
