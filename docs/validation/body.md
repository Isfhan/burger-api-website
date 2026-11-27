---
sidebar_label: Body Validation
---

# Body Validation

Add a `body` schema to a method in `schema.ts`. The validated body is on `ctx.validated.body`.

```ts title="api/products/schema.ts"
import { z } from "zod";

export const POST = {
  body: z.object({ name: z.string().min(1), price: z.number().positive() }),
};
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";

export const POST = defineRoute(PostSchema, (ctx) => {
  const { name, price } = ctx.validated.body; // typed from the schema
  return Response.json({ name, price }, { status: 201 });
});
```

## Rules

- The body must be JSON (`application/json` or `application/*+json`). Other content types get `415`.
- Malformed JSON gets `400`.
- A body that fails the schema gets `422`.
- An empty body validates as `undefined`, so an optional body schema still works.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
