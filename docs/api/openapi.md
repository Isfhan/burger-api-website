---
sidebar_label: 'OpenAPI / Swagger'
---

# OpenAPI & Swagger

BurgerAPI automatically generates an [OpenAPI 3.0](https://swagger.io/specification/) specification from your routes and Zod schemas, and serves an interactive docs UI. The spec is derived from the code, so it stays in sync as your API changes.

## Document metadata

Set the document metadata in `new Burger({...})`:

```ts title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
  title: "Widget Management API",
  version: "1.0.2",
  description: "API for creating, reading, updating, and deleting widgets.",
});
```

## Route-level metadata: the `openapi` type

Add rich details per endpoint in `openapi.ts`, with per-method named exports:

```ts title="api/products/[id]/openapi.ts"
export const GET = {
  summary: "Get a specific product by ID",
  tags: ["Products"],
  operationId: "getProductById",
  responses: {
    200: { description: "Product details returned successfully" },
    404: { description: "Product not found" },
  },
};
```

The `openapi` type allows `summary`, `description`, `tags`, `operationId`, `deprecated`, `responses`, and `externalDocs` per HTTP method. BurgerAPI infers request and response schemas from your `schema.ts` where possible. See [OpenAPI Metadata](/docs/openapi/metadata).

## Docs UI providers

BurgerAPI serves an interactive UI at `/docs` and the raw spec at `/openapi.json`. The default provider is Scalar. The alternatives are exported from `burger-api`:

- `scalarDocs()`
- `swaggerDocs()`
- `redocDocs()`

The provider is set in the OpenAPI config, along with the spec path, docs path, and optional basic auth for `/docs`. In dev, this config is auto-discovered from `openapi.config.ts`; production builds pass it in the `openapi` option. See [Swagger UI](/docs/openapi/swagger-ui).

## Related

- [OpenAPI Generation](/docs/openapi/generation)
- [Swagger UI](/docs/openapi/swagger-ui)
- [OpenAPI Metadata](/docs/openapi/metadata)
- [OpenAPI](/docs/core-concepts/openapi)
