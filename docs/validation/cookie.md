---
sidebar_label: Cookie Validation
---

# Cookie Validation

Add a `cookies` schema to a method in `schema.ts`. The validated values are on `ctx.validated.cookies`.

```typescript title="api/session/schema.ts"
import { z } from "zod";

export const GET = {
  cookies: z.object({ session: z.string().min(1) }),
};
```

```typescript title="api/session/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  return Response.json({ session: ctx.validated.cookies.session });
});
```

If the `session` cookie is missing, the request gets `422`.

Cookie values are text. Turn on [coercion](/docs/validation/coercion) if you expect numbers or booleans.

## Related

- [Schema Definition](/docs/validation/schema)
- [Headers Validation](/docs/validation/headers)
- [Validation Errors](/docs/validation/errors)
