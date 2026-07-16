---
sidebar_label: Request Context
---

# Request Context

Every handler and middleware receives a `BurgerRequest` — the request context for that request. It is a single, lightweight object that exposes the standard `Request` surface plus a few framework additions:

- `req.params` — dynamic path parameters.
- `req.query` — the parsed query string (evaluated lazily).
- `req.route` — the matched route's path and pattern.
- `req.validated` — data validated by your Zod schemas.
- `req.set` — response mutations applied at the end of the pipeline.

Request data is read lazily — for example, `req.query` is parsed only when you use it, so a request that never reads the query pays nothing for parsing. See [BurgerContext](../architecture/burger-context.md) for how the context works under the hood.

See [Request API](../api/request-api.md) for every property with examples, and [BurgerContext](../architecture/burger-context.md) for how it works under the hood.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
