---
sidebar_label: Query Validation
---

# Query Validation

Validate **query parameters** by defining a `query` schema for the HTTP method in your route's `schema.ts`. Use `z.object()` with optional/required keys; validated data is on `ctx.validated.query`.

Example: `export const GET = { query: z.object({ search: z.string().optional(), limit: z.coerce.number().optional() }) }`. Query values always arrive as text, so `z.coerce.number()` uses automatic type conversion (also called coercion) to turn `"10"` into the number `10`. You can also turn conversion on for the whole app with `validation: { coerce: true }` (see [Coercion](/docs/validation/coercion)). See [Validation](/docs/validation/zod) and [Schema Definition](/docs/validation/schema).

## Types for this feature

The `query` schema types `ctx.validated.query`.

The types you use (from `burger-api`):

- `defineRoute(schema, handler)`: infers the handler type from `schema`; no generic to write
- `BurgerContext<typeof GET>`: the same inference, written by hand
- `ctx.validated.query`: the validated query, typed key by key

✅ Correct. Validated query is typed from the schema:

```ts title="api/products/schema.ts"
import { z } from "zod";
export const GET = { query: z.object({ search: z.string().optional(), limit: z.coerce.number().optional() }) };
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    const { search, limit } = ctx.validated.query; // search: string | undefined, limit: number | undefined
    return Response.json({ search, limit });
});
```

❌ Wrong. A query key that is not in the schema:

```ts
export const GET = defineRoute(GetSchema, (ctx) => {
    ctx.validated.query.missing; // ❌ Property 'missing' does not exist
});
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Validation Types](/docs/api/validation-types)
