---
sidebar_label: Overview
---

# Performance

BurgerAPI is built to keep the request path fast and predictable. The speed comes from a few clear design choices, not from small low-level tweaks.

## Hybrid router

Static paths are served by Bun's native router, while dynamic and wildcard paths use a trie. Each request is matched on the strategy that fits it, so common static traffic is as fast as the runtime allows and expressive routes stay cheap to match.

## Native Bun routing

By leaning on Bun's built-in HTTP router for static routes, BurgerAPI avoids a catch-all handler that would do the routing in our own code. This removes a layer of extra work for the most frequent kind of request.

## Lazy query parsing

`ctx.query` parses the query string only when you read it. Requests that never read the query do no parsing and use no extra memory. The cost grows only with what the handler actually uses.

## Shared request context

Each request gets one context object built from the same template. It is cheap to create, uses a small steady amount of memory, and lazy getters mean unused fields are never computed.

## Efficient request processing

Hooks, validation, and response handling run in one set of processing steps (a pipeline). Response changes collected in `ctx.set` are applied in a single step at the end, and when nothing is set the original `Response` is returned without rebuild. Using less memory in the code that runs for every request keeps response times steady under heavy load.

These choices keep response times steady under heavy load.

## Related

- [Request Context](/docs/core/request-handling)
