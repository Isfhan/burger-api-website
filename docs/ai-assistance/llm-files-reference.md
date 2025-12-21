---
sidebar_label: "File Contents Reference (New)"
title: "File Contents Reference"
description: "A summary of what is contained within each of the Burger API LLM context files."
sidebar_position: 3
---

# File Contents Reference

This page provides a detailed breakdown of what information is contained in each of the three LLM context files.

## llms.txt (Table of Contents)

This file serves as a high-level map. It doesn't contain the full documentation but links to all critical sections.

- **Structure**: Hierarchical list of documentation modules.
- **Key Categories**: 
    - Getting Started
    - Framework Core
    - CLI Reference
    - Routing & Request Handling
    - Middleware System
    - Zod Validation
    - Examples & Tutorials

---

## llms-small.txt (Essential Reference)

Designed for speed and efficiency, this file (~400 lines) contains the most frequently used information.

- **Framework Basics**: `Burger` class, `ServerOptions`, and the `serve` method.
- **Core Types**: Definitions for `BurgerRequest`, `Middleware`, and `RequestHandler`.
- **File-Based Routing**: Patterns for static, dynamic, wildcard, and grouped routes.
- **Route File Structure**: Examples of exporting handlers (`GET`, `POST`, etc.) and using `schema`.
- **Middleware System**: Basic implementation patterns and return type behaviors.
- **Zod Validation**: Common schema structures for `params`, `query`, and `body`.
- **CLI Commands**: Essential commands like `create`, `add`, `list`, and `serve`.

---

## llms-full.txt (Comprehensive Documentation)

The complete reference (~1700 lines) containing everything a developer needs to know about Burger API.

- **Complete API Spec**: Detailed documentation for every class and method in the framework.
- **Deep Dive Types**: Exhaustive type definitions with edge cases explained.
- **Advanced Routing**: Complex routing scenarios, nesting, and priority.
- **Middleware Deep Dive**: Lifecycle details, error handling within middleware, and chaining.
- **Validation Mastery**: Advanced Zod schemas, custom error messages, and complex object validation.
- **OpenAPI Generation**: Detailed guide on how Burger API generates Swagger/OpenAPI docs from your code.
- **Full CLI Guide**: Every CLI command with all available flags and options.
- **Troubleshooting**: A dedicated section for common issues and their solutions.
- **Advanced Topics**: Deployment strategies, build optimizations, and custom server configurations.
- **Full Project Examples**: Complete code for standard application patterns.

---

:::tip Choosing the right file
If you find the AI is "guessing" how an advanced feature works, switch from `small` to `full`. If the AI is giving too much irrelevant info, switch from `full` to `small`.
:::
