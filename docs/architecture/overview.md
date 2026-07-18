---
sidebar_label: Overview
---

# Architecture Overview

BurgerAPI is organized around a small set of cooperating pieces. This page is the map; the pages linked below go deeper.

- **Hybrid Router** — matches each request on the fastest available strategy ([Routing Engine](./routing-engine.md)).
- **Shared Request Context** — one lightweight object per request that exposes `req.query`, `req.params`, `req.route`, `req.validated`, and `req.set` ([BurgerContext](./burger-context.md)).
- **Single Pipeline** — middleware, validation, and response handling run in one predictable set of processing steps, from the request coming in to the response going out ([Request Lifecycle](./request-lifecycle.md)).
- **OpenAPI Generation** — API documentation is derived from your routes and schemas, not written by hand.

The design goal throughout is to keep requests fast and light on memory, while staying easy to reason about. The [Design Decisions](./design-decisions.md) page explains *why* these choices were made.


## Related

- [Request Lifecycle](/docs/architecture/request-lifecycle)
- [Routing Engine](/docs/architecture/routing-engine)
- [BurgerContext](/docs/architecture/burger-context)
- [Request Context](/docs/core/request-handling)
