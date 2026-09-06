---
sidebar_label: Overview
---

# Performance

BurgerAPI is built to keep the request path fast and predictable. The speed comes from a few clear design choices, not from small low-level tweaks — and it's not just a claim: see [Benchmarks](/docs/advanced/benchmarks) for real, committed numbers against Elysia, Hono, and Express.

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

## JIT-compiled hook plans

Each route's hooks (`transform`, validation, `beforeRoute`, `afterRoute`, `mapResponse`) are flattened once at boot into a plan, and — on by default, capability-probed per process — that plan is JIT-compiled into a single function instead of being walked with a generic loop on every request. Runtimes that forbid dynamic code generation (Cloudflare Workers) silently keep the interpreter; nothing breaks, it's just not faster there. Measured contribution: see the `optimize/hooks-jit` vs `optimize/hooks-interpreter` numbers on the [Benchmarks](/docs/advanced/benchmarks) page.

## Related

- [Request Context](/docs/core/request-handling)
- [Benchmarks](/docs/advanced/benchmarks)
