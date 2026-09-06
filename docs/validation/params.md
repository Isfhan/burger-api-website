---
sidebar_label: Params Validation
---

# Params Validation

Validate **path parameters** (e.g. from dynamic routes like `[id]`) by defining a `params` schema for the method in your route's `schema.ts`. BurgerAPI runs validation before the handler; validated params are on `ctx.validated.params`. Path values are text, so enable [coercion](/docs/validation/coercion) if you expect a typed param (e.g. a number id).

See [Schema Definition](/docs/validation/schema) and the full [Validation](/docs/validation/zod) guide for examples.

## Types for this feature

The `params` schema types `ctx.validated.params`.

The types you use (from `burger-api`):

- `defineRoute(schema, handler)`: infers the handler type from `schema`; no generic to write
- `BurgerContext<typeof GET>`: the same inference, written by hand
- `ctx.validated.params`: the validated path parameters

✅ Correct. Validated params are typed from the schema:

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

❌ Wrong. A parameter name that is not in the schema:

```ts
export const GET = defineRoute(GetSchema, (ctx) => {
    ctx.validated.params.wrong; // ❌ Property 'wrong' does not exist
});
```

Without a `params` schema, `ctx.params` stays `Record<string, string> | undefined`, with every key untyped. For typed parameters, always add the schema. See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Query Validation](/docs/validation/query)
- [Validation Types](/docs/api/validation-types)
