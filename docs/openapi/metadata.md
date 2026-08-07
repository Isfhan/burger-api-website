---
sidebar_label: OpenAPI Metadata
---

# OpenAPI Metadata

Add per-method documentation by exporting an **`openapi`** object from your `openapi.ts` file. Each method maps to an object with `summary`, `description`, `tags`, `operationId`, `deprecated`, `responses`, and `externalDocs`. BurgerAPI merges this with the generated spec and infers schemas from your Zod `schema.ts` where possible.

```typescript title="api/posts/openapi.ts"
export const GET = { summary: "List posts", tags: ["posts"] };
export const POST = { summary: "Create a post", tags: ["posts"] };
```

See [OpenAPI & Swagger](/docs/api/openapi) and [OpenAPI Generation](/docs/openapi/generation).


## Related

- [OpenAPI Generation](/docs/openapi/generation)
- [Swagger UI](/docs/openapi/swagger-ui)
- [OpenAPI Specification & Swagger UI](/docs/api/openapi)
- [OpenAPI](/docs/core-concepts/openapi)
