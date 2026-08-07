---
sidebar_label: Body Validation
---

# Body Validation

Validate **request body** (e.g. for POST/PUT) by defining a `body` schema for the method in your route's `schema.ts`. Validated body is on `ctx.validated.body`.

Example: `export const POST = { body: z.object({ name: z.string().min(1), price: z.number().positive() }) }`. The body is only validated when the request is JSON (`content-type: application/json`); other content types are skipped. See [Validation](/docs/validation/zod) and [Schema Definition](/docs/validation/schema).


## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
