---
sidebar_label: Schema Definition
---

# Schema Definition

The **validation schema** is the **`schema`** export from your `route.ts`. It is an object with one key per HTTP method (lowercase: `get`, `post`, etc.). Each method can have `query`, `body`, and (where applicable) `params` or `response` Zod schemas.

```typescript
export const schema = {
  get: { query: z.object({ limit: z.coerce.number().optional() }) },
  post: { body: z.object({ name: z.string(), price: z.number() }) },
};
```

Validated data is available on `req.validated.query`, `req.validated.body`, etc. See [Validation](/docs/validation/zod), [Query](/docs/validation/query), and [Body](/docs/validation/body).


## Related

- [Zod Validation](/docs/validation/zod)
- [Params Validation](/docs/validation/params)
- [Query Validation](/docs/validation/query)
- [Validation Types](/docs/api/validation-types)
