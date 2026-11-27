---
sidebar_label: Params Validation
---

# Params Validation

Add a `params` schema to check path parameters from dynamic folders such as `[id]`. The validated values are on `ctx.validated.params`.

```ts title="api/products/[id]/schema.ts"
import { z } from "zod";

export const GET = { params: z.object({ id: z.string().uuid() }) };
```

```ts title="api/products/[id]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { id } = ctx.validated.params; // typed: string
  return Response.json({ id });
});
```

Path values are text. Turn on [coercion](/docs/validation/coercion) for a number id.

Without a schema, `ctx.params` still holds the raw strings, but nothing checks them.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Query Validation](/docs/validation/query)
- [Validation Types](/docs/api/validation-types)
