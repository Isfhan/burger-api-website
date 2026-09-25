---
sidebar_label: 'OpenAPI / Swagger'
---

# OpenAPI & Swagger

BurgerAPI automatically generates an [OpenAPI 3.0](https://swagger.io/specification/) specification from your routes and Zod schemas, and serves an interactive docs UI. The spec is derived from the code, so it stays in sync as your API changes.

## Document metadata

Set document metadata in `src/openapi.config.ts`, the convention file that `burger-api create` scaffolds. It is auto-discovered in dev, and `burger-api build` embeds it into the production entry:

```ts title="src/openapi.config.ts"
import type { OpenAPIConfig } from "burger-api";

export default {
  title: "Widget Management API",
  description: "API for creating, reading, updating, and deleting widgets.",
  version: "1.0.2",
  servers: [{ url: "https://api.example.com", description: "Production" }],
  contact: { name: "Widget Team", email: "api@example.com" },
} satisfies OpenAPIConfig;
```

All fields:

| Field | Type | Purpose |
|-------|------|---------|
| `title` | `string` | API title. Defaults to "Burger API" |
| `description` | `string` | API description. Defaults to "Burger API documentation" |
| `version` | `string` | API version. Defaults to "1.0.0" |
| `servers` | `OpenAPIServer[]` | Server URLs (`{ url, description? }`) |
| `contact` | `OpenAPIContact` | `{ name?, url?, email? }` |
| `license` | `OpenAPILicense` | `{ name, url? }` |
| `termsOfService` | `string` | URL to the terms of service |
| `externalDocs` | `OpenAPIExternalDocs` | `{ url, description? }` |
| `security` | `Array<Record<string, string[]>>` | Root security requirements. Defaults to `[]` |
| `path` | `string` | Path of the JSON spec. Defaults to `/openapi.json` |
| `docsPath` | `string` | Path of the docs UI. Defaults to `/docs` |
| `enabled` | `boolean` | Enable the OpenAPI endpoints. Defaults to `true` |
| `docsAuth` | `DocsAuth` | Basic auth for `/docs` and `/openapi.json` (`{ username, password }`). Omit for no protection |
| `provider` | `DocsProvider` | Docs UI function. Defaults to Swagger UI; alternatives: `scalarDocs()`, `redocDocs()` |
| `mapJsonSchema` | `Record<string, JsonSchemaConverter>` | JSON Schema converters for non-Zod validators (Valibot, ArkType, ...) |

`new Burger({ title, version, description })` is a fallback for programmatic apps that do not use the convention file. When both exist, `openapi.config.ts` wins.

For programmatic apps (no filesystem), pass the same object in the `openapi` option instead:

```ts title="src/index.ts"
const burger = new Burger({
  apiRoutes: routes,
  openapi: { title: "Widget Management API", version: "1.0.2" },
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

The provider is set in the OpenAPI config, along with the spec path, docs path, and optional basic auth. Both the spec path (`/openapi.json` by default) and the docs path (`/docs` by default) are configurable there. `docsAuth` protects `/docs` and `/openapi.json`; the docs UI loads the spec from the configured `path`.

## Types for this feature

The types you use (from `burger-api`):

- `openapi`: the per-route metadata object, keyed by lowercase method
- `OpenAPIMeta`: one method's metadata (`summary`, `tags`, `responses`, ...)
- `OpenAPIConfig`: the docs configuration (dev `openapi.config.ts`, production `openapi` option)

✅ Correct: lowercase keys in programmatic metadata:

```ts
import type { RouteDefinition } from "burger-api";

const def: RouteDefinition = {
    path: "/products",
    handlers: { GET: (ctx) => Response.json([]) },
    openapi: { get: { summary: "List products" } }, // lowercase 'get'
};
```

❌ Wrong: an uppercase key is a silent no-op at runtime, so it fails at compile time:

```ts
const def: RouteDefinition = {
    path: "/products",
    handlers: { GET: (ctx) => Response.json([]) },
    openapi: { GET: { summary: "List" } }, // ❌ 'GET' is not allowed (use 'get')
};
```

❌ Wrong: a response value must be an object:

```ts
openapi: { get: { responses: { "200": 42 } } }; // ❌ 42 is not an object
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
