---
sidebar_label: Params Validation
---

# Params Validation

Validate **path parameters** (e.g. from dynamic routes like `[id]`) by defining a `params` schema for the method in your route's `schema.ts`. BurgerAPI runs validation before the handler; validated params are on `ctx.validated.params`. Path values are text, so enable [coercion](/docs/validation/coercion) if you expect a typed param (e.g. a number id).

See [Schema Definition](/docs/validation/schema) and the full [Validation](/docs/validation/zod) guide for examples.


## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Query Validation](/docs/validation/query)
- [Validation Types](/docs/api/validation-types)
