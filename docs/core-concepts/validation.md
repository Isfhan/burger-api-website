---
sidebar_label: Validation
---

# Validation

Validation checks the incoming request before your handler runs. With BurgerAPI you describe the expected shape of `params`, `query`, and `body` using a Zod schema. Requests that do not match receive a structured error, and valid values are made available on `req.validated` so your handler can use them with confidence.

A route declares validation by exporting a `schema` object with one key per HTTP method:

```ts title="api/products/route.ts"
export const schema = {
  get: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100).optional(),
    }),
  },
};
```

This is only a small slice of one route. See the full example in [CRUD API](/docs/examples/crud-api) and the [Validation schema](/docs/validation/schema) shape.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
