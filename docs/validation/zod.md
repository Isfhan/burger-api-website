---
sidebar_label: Zod Validation
---

# Zod Validation

BurgerAPI uses [Zod](https://zod.dev/) 4 to check requests. You write a schema in `schema.ts`. BurgerAPI checks the request before your handler runs and puts the typed result on `ctx.validated`.

You can validate `query`, `params`, `headers`, `cookies` and `body`.

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
  }),
};
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { limit } = ctx.validated.query; // number | undefined
  return Response.json({ limit });
});
```

`defineRoute` gives `ctx.validated` the types from your schema. To reuse a slot type elsewhere, use `z.infer<typeof GET.query>`.

`z.coerce.number()` turns the text `"50"` into the number `50`. To convert text for the whole app, see [Coercion](/docs/validation/coercion).

Other schema libraries work too. See [Standard Schema Support](/docs/validation/standard-schema).

## Related

- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Standard Schema Support](/docs/validation/standard-schema)
- [Validation Types](/docs/api/validation-types)
