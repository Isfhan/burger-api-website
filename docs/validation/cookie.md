---
sidebar_label: Cookie Validation
---

# Cookie Validation

You can validate **cookie** values by declaring a `cookie` schema. BurgerAPI reads the `Cookie` header, splits it into name/value pairs, and checks each value against your schema.

## Example

```typescript
// api/session/route.ts
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
  get: {
    cookie: z.object({
      session: z.string().min(1),
    }),
  },
};

export function GET(req: BurgerRequest) {
  const session = req.validated.cookie.session;
  return Response.json({ session });
}
```

If the `session` cookie is missing, BurgerAPI responds with `400`. The validated value is available on `req.validated.cookie`.

## Notes

- Only the cookie *values* are validated. Setting, signing, or writing cookies is handled elsewhere and is not part of validation.
- Cookie values are text, so enable [coercion](/docs/validation/coercion) if you expect typed cookie values.
- Header inputs are validated separately — see [Headers Validation](/docs/validation/headers).


## Related

- [Schema Definition](/docs/validation/schema)
- [Headers Validation](/docs/validation/headers)
- [Validation Errors](/docs/validation/errors)
