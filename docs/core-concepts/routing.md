---
sidebar_label: Routing
---

# Routing

BurgerAPI uses file-based routing: the files and folders under your API directory become HTTP routes. A folder named `[id]` becomes a dynamic segment, and an anonymous `[...]` folder becomes a catch-all (its captured segments are available as `ctx.wildcardParams`; only the anonymous form is supported).

Under the hood, a **hybrid router** matches each request on the fastest strategy.

On Bun, `serve()` registers every route (static, `:param`, wildcard) as a per-method native Bun route. The fetch handler path (Cloudflare, Deno, Vercel, Node) uses a fast radix matcher.

This keeps static traffic as fast as the runtime allows while still supporting expressive dynamic routes. See [Routing](../routing/file-based-routing.md) for the full reference, including static, dynamic, wildcard, nested, and grouped routes.


## Related

- [Applications](/docs/core-concepts/applications)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)

