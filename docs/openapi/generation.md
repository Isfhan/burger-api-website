---
sidebar_label: OpenAPI Generation
---

# OpenAPI Generation

BurgerAPI automatically generates an [OpenAPI 3.0](https://swagger.io/specification/) spec from your routes. Set `title` and `version` (and optionally `description`) in the `Burger` constructor. The spec is built from your route structure, Zod schemas, and any route-level `openapi` metadata you export.

See [OpenAPI & Swagger](/docs/api/openapi), [Swagger UI](/docs/openapi/swagger-ui), and [OpenAPI Metadata](/docs/openapi/metadata).
