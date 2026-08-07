---
sidebar_label: Cookie Validation
---

# Cookie Validation

You can validate **cookie** values by declaring a `cookies` schema. BurgerAPI reads the `Cookie` header, splits it into name/value pairs, and checks each value against your schema.

## Example

```typescript title="api/session/schema.ts"
import { z } from "zod";

export const GET = {
  cookies: z.object({
    session: z.string().min(1),
  }),
};
```

```typescript title="api/session/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  const session = ctx.validated.cookies.session;
  return Response.json({ session });
}
```

If the `session` cookie is missing, BurgerAPI responds with `422`. The validated value is available on `ctx.validated.cookies`.

## Notes

- Only the cookie *values* are validated. Setting, signing, or writing cookies is handled elsewhere and is not part of validation.
- Cookie values are text, so enable [coercion](/docs/validation/coercion) if you expect typed cookie values.
- Header inputs are validated separately — see [Headers Validation](/docs/validation/headers).


## Related

- [Schema Definition](/docs/validation/schema)
- [Headers Validation](/docs/validation/headers)
- [Validation Errors](/docs/validation/errors)
