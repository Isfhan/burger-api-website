---
sidebar_label: OpenAPI
---

# OpenAPI

BurgerAPI generates an OpenAPI 3.0 document directly from your routes and Zod schemas, and serves an interactive docs UI. Because the specification is derived from the code, it stays in sync as your API changes, with no separate spec file to maintain.

Route-level metadata (summaries, tags, operation IDs) is supplied per method in `openapi.ts` next to each route. The docs UI defaults to Scalar, with `swaggerDocs()` and `redocDocs()` as alternatives. See [OpenAPI Generation](/docs/openapi/generation) and [Swagger UI](/docs/openapi/swagger-ui).


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
