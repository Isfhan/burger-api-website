---
sidebar_label: 'OpenAPI / Swagger'
---

# OpenAPI & Swagger

BurgerAPI builds an [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) document from your routes and schemas. You get:

- the spec at `/openapi.json`
- an interactive docs UI at `/docs`

The spec comes from your code, so it stays in sync as the API changes.

## Document metadata

Set the title, version and more in `src/openapi.config.ts`. `burger-api create` adds this file for you.

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

| Field | Type | Purpose |
|-------|------|---------|
| `title` | `string` | API title. Default "Burger API" |
| `description` | `string` | API description. Default "Burger API documentation" |
| `version` | `string` | API version. Default "1.0.0" |
| `servers` | `OpenAPIServer[]` | Server URLs (`{ url, description? }`) |
| `contact` | `OpenAPIContact` | `{ name?, url?, email? }` |
| `license` | `OpenAPILicense` | `{ name, url? }` |
| `termsOfService` | `string` | URL to the terms of service |
| `externalDocs` | `OpenAPIExternalDocs` | `{ url, description? }` |
| `security` | `Array<Record<string, string[]>>` | Root security requirements. Default `[]` |
| `path` | `string` | Path of the JSON spec. Default `/openapi.json` |
| `docsPath` | `string` | Path of the docs UI. Default `/docs` |
| `enabled` | `boolean` | Serve the spec and docs. Default `true` |
| `docsAuth` | `DocsAuth` | Basic auth for the docs and spec (`{ username, password }`). Omit for none |
| `provider` | `DocsProvider` | Docs UI. Default Swagger UI. Others: `scalarDocs()`, `redocDocs()` |
| `mapJsonSchema` | `Record<string, JsonSchemaConverter>` | Converters for schema libraries that cannot describe themselves, such as Valibot |

Apps without the convention file can pass the same object as `new Burger({ openapi: { ... } })`. The older `new Burger({ title, version, description })` options also work. `openapi.config.ts` wins when both exist.

## Route metadata

Add details per endpoint in the route's `openapi.ts`, with one export per method:

```ts title="src/api/products/[id]/openapi.ts"
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

Allowed fields: `summary`, `description`, `tags`, `operationId`, `deprecated`, `responses`, `externalDocs`. Request and response schemas come from `schema.ts`, so you do not repeat them.

## Docs UI

Pick the UI with the `provider` field. The options are exported from `burger-api`: `swaggerDocs()` (default), `scalarDocs()`, `redocDocs()`.

```ts title="src/openapi.config.ts"
import { scalarDocs } from "burger-api";
import type { OpenAPIConfig } from "burger-api";

export default {
  title: "My API",
  provider: scalarDocs(),
  docsAuth: { username: "admin", password: "secret" },
} satisfies OpenAPIConfig;
```

## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
