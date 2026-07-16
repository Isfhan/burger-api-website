---
sidebar_label: Validation Types
---

# Validation Types

Validation is declared with Zod. BurgerAPI reads a `schema` export from each route and validates the request before the handler runs.

## RouteSchema

Each HTTP method maps to an object of optional Zod schemas:

```ts
type RouteSchema = {
  [method: string]: {
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    body?: z.ZodTypeAny;
  };
};
```

Example:

```ts
export const schema = {
  post: {
    body: z.object({ name: z.string().min(1) }),
  },
};
```

See [CRUD API](/docs/examples/crud-api) for the full `api/products/route.ts` file.

## Validated data

After validation, the result is available on `req.validated`:

- `req.validated.params`
- `req.validated.query`
- `req.validated.body`

Each is typed from the corresponding schema. See [Validation](../validation/zod.md) for the full guide and [Error Handling](../advanced/error-handling.md) for the error shape.

## OpenAPI metadata

Routes can export `openapi` metadata (summary, tags, operationId, ...) used for documentation. See [OpenAPI Metadata](../openapi/metadata.md).


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
