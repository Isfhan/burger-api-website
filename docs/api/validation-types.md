---
sidebar_label: Validation Types
---

# Validation Types

Validation is declared with Zod (or any [Standard Schema](https://standardschema.dev/) library). BurgerAPI reads a `schema` export from each route and validates the request before the handler runs.

## RouteSchema

Each HTTP method maps to an object of optional schemas. A slot accepts either a schema or a **string** that references a registered model:

```ts
type RouteSchema = {
  [method: string]: {
    params?: z.ZodTypeAny | string;
    query?: z.ZodTypeAny | string;
    headers?: z.ZodTypeAny | string;
    cookie?: z.ZodTypeAny | string;
    body?: z.ZodTypeAny | string;
    /** Per-route opt-in for automatic type conversion. */
    coerce?: boolean;
    /** Per-status-code response schemas, validated after the handler. */
    response?: Record<string, z.ZodTypeAny | string>;
  };
};
```

Example:

```ts
export const schema = {
  get: { query: z.object({ limit: z.coerce.number().optional() }) },
  post: {
    body: z.object({ name: z.string().min(1) }),
    response: { 200: z.object({ id: z.string() }) },
  },
};
```

See [CRUD API](/docs/examples/crud-api) for the full `api/products/route.ts` file and [Schema Definition](/docs/validation/schema) for every slot.

## Validated data

After validation, the result is available on `req.validated`. Each key exists only if that slot had a schema:

- `req.validated.params`
- `req.validated.query`
- `req.validated.headers`
- `req.validated.cookie`
- `req.validated.body`

See [Validation](/docs/validation/zod) for the full guide and [Error Handling](../validation/errors.md) for the error shape.

## Validation configuration

The server accepts a `validation` option (`coerce`, `responseValidation`, `errorFormat`, `errorRenderer`) and a `models` option for reusable shapes. See [Validation Configuration](/docs/validation/configuration).

## OpenAPI metadata

Routes can export `openapi` metadata (summary, tags, operationId, ...) used for documentation. See [OpenAPI Metadata](../openapi/metadata.md).


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
- [Validation Configuration](/docs/validation/configuration)
