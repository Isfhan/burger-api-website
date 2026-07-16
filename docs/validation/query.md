---
sidebar_label: Query Validation
---

# Query Validation

Validate **query parameters** by defining a `query` schema for the HTTP method in your route’s `schema` object. Use `z.object()` with optional/required keys; validated data is on `req.validated.query`.

Example: `get: { query: z.object({ search: z.string().optional(), limit: z.coerce.number().optional() }) }`. See [Validation](/docs/validation/zod) and [Schema Definition](/docs/validation/schema).


## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
