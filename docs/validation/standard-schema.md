---
sidebar_label: Standard Schema Support
---

# Standard Schema Support

You can use any schema library that follows [Standard Schema](https://standardschema.dev/), such as [Valibot](https://valibot.dev/) or [ArkType](https://arktype.io/). Use it in `schema.ts` the same way as Zod. No setup is needed.

```typescript title="api/products/schema.ts"
import { object, string, number } from "valibot";

export const POST = {
  body: object({ name: string(), price: number() }),
};
```

```typescript title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";

export const POST = defineRoute(PostSchema, (ctx) => {
  const { name, price } = ctx.validated.body;
  return Response.json({ name, price });
});
```

## Good to know

- The validator must be synchronous. An async validator is a startup error.
- A schema that is neither Zod nor Standard Schema is a startup error.
- You can mix Zod and other libraries in one app.
- Built-in [coercion](/docs/validation/coercion) works with Zod only. Use your library's own conversion.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Validation Types](/docs/api/validation-types)
