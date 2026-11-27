---
sidebar_label: Query Validation
---

# Query Validation

Add a `query` schema to a method in `schema.ts`. The validated values are on `ctx.validated.query`.

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({
    search: z.string().optional(),
    limit: z.coerce.number().optional(),
  }),
};
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { search, limit } = ctx.validated.query; // string | undefined, number | undefined
  return Response.json({ search, limit });
});
```

Query values are text. `z.coerce.number()` turns `"10"` into `10`. You can also turn on [coercion](/docs/validation/coercion) for the whole app.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
