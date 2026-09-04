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

The `openapi` type allows `summary`, `description`, `tags`, `operationId`, `deprecated`, `responses`, and `externalDocs` per HTTP method. BurgerAPI infers request and response schemas from your `schema.ts` where possible.

## Docs UI providers

BurgerAPI serves an interactive UI at `/docs` and the raw spec at `/openapi.json`. The default provider is Swagger UI. The alternatives are exported from `burger-api`:

- `swaggerDocs()`
- `scalarDocs()`
- `redocDocs()`

The provider is set in the OpenAPI config, along with the spec path, docs path, and optional basic auth for `/docs`. In dev, this config is auto-discovered from `openapi.config.ts`; production builds pass it in the `openapi` option. Both the spec path (`/openapi.json` by default) and the docs path (`/docs` by default) are configurable there.

## Types for this feature

The types you use (from `burger-api`):

- `openapi` — the per-route metadata object, keyed by lowercase method
- `OpenAPIMeta` — one method's metadata (`summary`, `tags`, `responses`, ...)
- `OpenAPIConfig` — the docs configuration (dev `openapi.config.ts`, production `openapi` option)

✅ Correct — lowercase keys in programmatic metadata:

```ts
import type { RouteDefinition } from "burger-api";

const def: RouteDefinition = {
    path: "/products",
    handlers: { GET: (ctx) => Response.json([]) },
    openapi: { get: { summary: "List products" } }, // lowercase 'get'
};
```

❌ Wrong — an uppercase key is a silent no-op at runtime, so it fails at compile time:

```ts
const def: RouteDefinition = {
    path: "/products",
    handlers: { GET: (ctx) => Response.json([]) },
    openapi: { GET: { summary: "List" } }, // ❌ 'GET' is not allowed (use 'get')
};
```

❌ Wrong — a response value must be an object:

```ts
openapi: { get: { responses: { "200": 42 } } }; // ❌ 42 is not an object
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
