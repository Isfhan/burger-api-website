---
sidebar_label: Design Decisions
---

# Design Decisions

This page explains *why* BurgerAPI is built the way it is. The goal is to make the framework fast, easy to use, and easy to reason about — not to follow a particular trend.

## Why a hybrid router

Static paths use Bun's native router, which is faster than routing them in our own code. Dynamic and wildcard paths need pattern matching that native routing does not provide, so a trie handles those. Combining both gives the speed of native routing where it applies and the flexibility of pattern matching everywhere else.

## Why Bun-first

BurgerAPI targets Bun because Bun provides a high-performance HTTP server and native APIs (file access, process spawning, hashing) that the framework builds on directly. Relying on Bun lets the framework stay small and fast instead of re-implementing those primitives.

## Why file-based routing

Mapping files and folders to routes removes boilerplate. You do not register routes by hand; the structure of your project *is* the route table. Dynamic and wildcard segments use a simple, readable convention (`[id]`, `[...slug]`).

## Why a shared request context

Giving handlers a single `req` object with lazy, typed access to query, params, route, and validated data keeps handler code simple. Reusing the same object template keeps it cheap to create and light on memory, so the convenience costs no performance.

## Why lazy query parsing

Parsing the query string is only useful if the handler reads it. Reading it lazily means requests that don't use the query do no parsing and use no extra memory — the work grows only with what the handler needs.

## Why automatic OpenAPI

API documentation drifts from code when maintained by hand. Generating OpenAPI from the same routes and Zod schemas the server uses keeps the documentation accurate and removes a class of maintenance bugs, while the Swagger UI gives consumers an interactive way to explore the API.


## Related

- [Architecture Overview](/docs/architecture/overview)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
- [Routing Engine](/docs/architecture/routing-engine)
- [Request Context](/docs/core/request-handling)
