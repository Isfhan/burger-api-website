---
sidebar_label: Body Validation
---

# Body Validation

Validate **request body** (e.g. for POST/PUT) by defining a `body` schema for the method in your route's `schema.ts`. Validated body is on `ctx.validated.body`.

Example: `export const POST = { body: z.object({ name: z.string().min(1), price: z.number().positive() }) }`. The body is only validated when the request is JSON (`content-type: application/json`); other content types are skipped. See [Validation](/docs/validation/zod) and [Schema Definition](/docs/validation/schema).

## Types for this feature

The `body` schema types `ctx.validated.body`.

The types you use (from `burger-api`):

- `defineRoute(schema, handler)`: infers the handler type from `schema`; no generic to write
- `BurgerContext<typeof POST>`: the same inference, written by hand
- `ctx.validated.body`: the validated body, typed field by field

✅ Correct: validated body is typed from the schema:

```ts title="api/products/schema.ts"
import { z } from "zod";
export const POST = { body: z.object({ name: z.string().min(1), price: z.number().positive() }) };
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";

export const POST = defineRoute(PostSchema, (ctx) => {
    const { name, price } = ctx.validated.body; // both typed
    return Response.json({ name, price }, { status: 201 });
});
```

❌ Wrong: a body field that is not in the schema:

```ts
export const POST = defineRoute(PostSchema, (ctx) => {
    ctx.validated.body.missing; // ❌ Property 'missing' does not exist
});
```

For an unannoted handler, `ctx.validated` is possibly `undefined` and its fields are untyped. Add the schema and wrap the handler with `defineRoute` (or annotate it by hand). See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
