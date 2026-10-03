---
sidebar_label: Overview
---

# Performance

BurgerAPI is built to keep the request path fast and predictable. The speed comes from a few clear design choices, not from small low-level tweaks. Measured results and raw reports live in [burger-api-benchmarks](https://github.com/isfhan/burger-api-benchmarks); an architectural summary is on the [Benchmarks](/docs/advanced/benchmarks) page.

## Hybrid router

On Bun, `serve()` registers every route (static, `:param`, wildcard) as a per-method native Bun route, so the most frequent requests avoid a catch-all handler that would do the routing in our own code. The fetch handler path (Cloudflare, Deno, Vercel, Node) uses a fast radix matcher. Each request is matched on the strategy that fits it, so common traffic is as fast as the runtime allows and expressive routes stay cheap to match.

## Lazy query parsing

`ctx.query` parses the query string only when you read it. Requests that never read the query do no parsing and use no extra memory. The cost grows only with what the handler actually uses.

## Shared request context

Each request gets one context object built from the same template. It is cheap to create, uses a small steady amount of memory, and lazy getters mean unused fields are never computed.

## Efficient request processing

Hooks, validation, and response handling run in one pipeline. Response changes collected in `ctx.set` are applied in a single step at the end, and when nothing is set the original `Response` is returned without rebuild.

## JIT-compiled hook plans

Each route's hooks (`transform`, validation, `beforeRoute`, `afterRoute`, `mapResponse`) are flattened once at boot into a plan, and that plan (on by default, capability-probed per process) is JIT-compiled into a single function instead of being walked with a generic loop on every request. Runtimes that forbid dynamic code generation (Cloudflare Workers) silently keep the interpreter; nothing breaks, it's just not faster there.

## Related

- [Request Context](/docs/core/request-handling)
- [Benchmarks](/docs/advanced/benchmarks)
