---
sidebar_label: OpenAPI Generation
---

# OpenAPI Generation

BurgerAPI automatically generates an [OpenAPI 3.0](https://swagger.io/specification/) spec from your routes. Set `title` and `version` (and optionally `description`) in the `Burger` constructor. The spec is built from your route structure, Zod schemas, and any per-method `openapi` metadata you export in `openapi.ts`.

An interactive docs UI is served from the spec. The default provider is Swagger UI; `scalarDocs()` and `redocDocs()` are the built-in alternatives, chosen in the OpenAPI config (`openapi.config.ts` in dev, the `openapi` option in production builds).

See [OpenAPI & Swagger](/docs/api/openapi), [Swagger UI](/docs/openapi/swagger-ui), and [OpenAPI Metadata](/docs/openapi/metadata).


## Related

- [Swagger UI](/docs/openapi/swagger-ui)
- [OpenAPI Metadata](/docs/openapi/metadata)
- [OpenAPI Specification & Swagger UI](/docs/api/openapi)
- [OpenAPI](/docs/core-concepts/openapi)
