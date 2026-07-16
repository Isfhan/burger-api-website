---
sidebar_label: BurgerContext
---

# BurgerContext

`BurgerContext` is the shared request context your handlers receive as `req`. Its job is to give every handler one consistent object. Handlers read request data from it and write response changes to it. It does no work unless your handler uses it.

## Built once per request

Each request gets one context object. It reuses the same object template, so it is cheap to set up.

## Lazy evaluation

Most request data is exposed through getters that compute their value only when accessed:

- `req.query` parses the query string the first time you read it. A request that never reads the query performs no query parsing at all.
- `req.params` and `req.route` are populated from the matched route and are available immediately.

Unused fields cost nothing. If your handler never reads a value, the framework never builds it.

## Uses little memory

The context only carries the data specific to the matched route (for example, a static route has no `params`). Because it reuses the same object template, each request uses a small, steady amount of memory, so response times stay steady even under heavy load.

## Reading and writing

Handlers read request data through `req.query`, `req.params`, `req.validated`, and `req.route`, and express response changes through `req.set`. The request context is the single place the framework and your code meet. See [Request API](../api/request-api.md) for the full property reference.


## Related

- [Architecture Overview](/docs/architecture/overview)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
- [Routing Engine](/docs/architecture/routing-engine)
- [Request Context](/docs/core/request-handling)
