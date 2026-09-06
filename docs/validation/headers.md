---
sidebar_label: Headers Validation
---

# Headers Validation

You can validate request **headers** the same way you validate the query string or body. This is useful for API keys, tokens, and other header-based inputs.

## Example

```typescript title="api/secure/schema.ts"
import { z } from "zod";

export const GET = {
  headers: z.object({
    "x-api-key": z.string().min(1),
  }),
};
```

```typescript title="api/secure/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const key = ctx.validated.headers["x-api-key"];
  return Response.json({ key });
});
```

If the `x-api-key` header is missing or empty, BurgerAPI responds with `422` and a structured error. The validated value is available on `ctx.validated.headers`.

## Notes

- Header names are matched case-insensitively.
- Headers are text, so enable [coercion](/docs/validation/coercion) if you expect typed header values.
- Cookie values are validated separately. See [Cookie Validation](/docs/validation/cookie).


## Related

- [Schema Definition](/docs/validation/schema)
- [Cookie Validation](/docs/validation/cookie)
- [Query Validation](/docs/validation/query)
- [Validation Errors](/docs/validation/errors)
