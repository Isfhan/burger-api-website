---
sidebar_label: Headers Validation
---

# Headers Validation

Add a `headers` schema to a method in `schema.ts`. The validated values are on `ctx.validated.headers`.

```typescript title="api/secure/schema.ts"
import { z } from "zod";

export const GET = {
  headers: z.object({ "x-api-key": z.string().min(1) }),
};
```

```typescript title="api/secure/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  return Response.json({ key: ctx.validated.headers["x-api-key"] });
});
```

If the header is missing or empty, the request gets `422`.

## Good to know

- Write header keys in lowercase (`"x-api-key"`). A key with capitals is a startup error.
- Header values are text. Turn on [coercion](/docs/validation/coercion) if you expect numbers or booleans.

## Related

- [Schema Definition](/docs/validation/schema)
- [Cookie Validation](/docs/validation/cookie)
- [Query Validation](/docs/validation/query)
- [Validation Errors](/docs/validation/errors)
