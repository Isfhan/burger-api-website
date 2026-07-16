---
sidebar_label: Error Handling
---

# Validation Error Handling

When validation fails, BurgerAPI returns a **400** response with a structured error payload (e.g. grouped by `query`, `body`, `params`). The format is consistent with Zod 4.x. Your frontend can parse this to show field-level errors.

See the [Validation](/docs/validation/zod) guide for the exact response shape and examples.


## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
