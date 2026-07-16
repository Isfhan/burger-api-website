---
sidebar_label: OpenAPI
---

# OpenAPI

BurgerAPI generates an OpenAPI 3.0 document directly from your routes and Zod schemas, and serves an interactive Swagger UI. Because the specification is derived from the code, it stays in sync as your API changes — there is no separate spec file to maintain.

Route-level metadata (summaries, tags, operation IDs) can be supplied through the `openapi` export on each route. See [OpenAPI & Documentation](../openapi/generation.md) for generation, the Swagger UI endpoint, and metadata.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
