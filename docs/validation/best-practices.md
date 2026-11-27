---
sidebar_label: Best Practices
---

# Validation Best Practices

A few habits that keep validation simple.

- **Start small.** Add a schema only for the slots your handler reads.
- **Turn on coercion for text inputs.** Query, params, headers and cookies are text. Use [coercion](/docs/validation/coercion) when you expect numbers or booleans.
- **Share shapes.** Define a shape once in its own file and import it into each `schema.ts`. See [Schema Definition](/docs/validation/schema).
- **Keep handlers thin.** The handler runs only after validation passes. Use `ctx.validated` and skip extra type checks.
- **Add response schemas.** In the default `dev` mode they only log mismatches. Use `enforce` only on routes where a wrong shape must never reach the client. See [Response Validation](/docs/validation/response).
- **Pick an error format.** The default body is RFC 9457 problem details. Set `errorFormat: "plain"` for a simpler body. See [Problem Details](/docs/validation/problem-details).

```typescript title="api/orders/schema.ts"
import { z } from "zod";

export const POST = {
  body: z.object({ name: z.string().min(1), price: z.number() }),
};
```

## Related

- [Schema Definition](/docs/validation/schema)
- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Validation Configuration](/docs/validation/configuration)
