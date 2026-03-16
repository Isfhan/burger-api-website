---
sidebar_label: Body Validation
---

# Body Validation

Validate **request body** (e.g. for POST/PUT) by defining a `body` schema for the method in your route’s `schema` object. Validated body is on `req.validated.body`.

Example: `post: { body: z.object({ name: z.string().min(1), price: z.number().positive() }) }`. See [Validation](/docs/request-handling/validation) and [Schema Definition](/docs/validation/schema).
