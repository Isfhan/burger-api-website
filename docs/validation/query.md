---
sidebar_label: Query Validation
---

# Query Validation

Validate **query parameters** by defining a `query` schema for the HTTP method in your route's `schema.ts`. Use `z.object()` with optional/required keys; validated data is on `ctx.validated.query`.

Example: `export const GET = { query: z.object({ search: z.string().optional(), limit: z.coerce.number().optional() }) }`. Query values always arrive as text, so `z.coerce.number()` uses automatic type conversion (also called coercion) to turn `"10"` into the number `10`. You can also turn conversion on for the whole app with `validation: { coerce: true }` — see [Coercion](/docs/validation/coercion). See [Validation](/docs/validation/zod) and [Schema Definition](/docs/validation/schema).


## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
