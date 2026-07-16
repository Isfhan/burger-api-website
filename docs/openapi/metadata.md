---
sidebar_label: OpenAPI Metadata
---

# OpenAPI Metadata

Add per-route or per-method documentation by exporting an **`openapi`** object from your `route.ts`. It can include `summary`, `description`, `tags`, `operationId`, `parameters`, and `responses` for each method. BurgerAPI merges this with the generated spec and infers schemas from your Zod `schema` where possible.

See [OpenAPI & Swagger](/docs/api/openapi) and [OpenAPI Generation](/docs/openapi/generation).


## Related

- [OpenAPI Generation](/docs/openapi/generation)
- [Swagger UI](/docs/openapi/swagger-ui)
- [OpenAPI Specification & Swagger UI](/docs/api/openapi)
- [OpenAPI](/docs/core-concepts/openapi)
