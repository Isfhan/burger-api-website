---
sidebar_label: Swagger UI
---

# Swagger UI

BurgerAPI serves an interactive docs UI so you can explore and call your API from the browser. The default provider is [Swagger UI](https://swagger.io/tools/swagger-ui/); you can switch to [Scalar](https://scalar.com/) with `scalarDocs()` or to [ReDoc](https://redocly.com/redoc/) with `redocDocs()`. The provider is set in the OpenAPI config, which is auto-discovered from `openapi.config.ts` in dev.

Once the server is running and OpenAPI is configured, the spec is available at `/openapi.json` and the UI at `/docs` (both paths are configurable).

See [OpenAPI & Swagger](/docs/api/openapi) and [OpenAPI Generation](/docs/openapi/generation).


## Related

- [OpenAPI Generation](/docs/openapi/generation)
- [OpenAPI Metadata](/docs/openapi/metadata)
- [OpenAPI Specification & Swagger UI](/docs/api/openapi)
- [OpenAPI](/docs/core-concepts/openapi)
