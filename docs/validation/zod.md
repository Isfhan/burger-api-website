---
sidebar_label: Zod Validation
---

# Zod Validation

BurgerAPI uses [Zod](https://zod.dev/) to check that incoming requests are shaped the way you expect. A **schema** is just a description of the data you want — for example, "the query string must have a `limit` that is a number". You write these schemas for query parameters, path parameters, request headers, cookies, and request bodies. BurgerAPI checks the request *before* your handler runs and puts the clean, typed result on `ctx.validated`.

BurgerAPI uses Zod 4.x, which gives clear, friendly error messages.

Zod is the default schema provider, but it is not the only one. Any library that follows the [Standard Schema](https://standardschema.dev/) contract (such as Valibot or ArkType) also works — see [Standard Schema Support](/docs/validation/standard-schema).

## A first example

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
  }),
};
```

```ts title="api/products/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
}
```

Here `z.coerce.number()` turns the text `"50"` into the number `50` before the checks run. BurgerAPI also offers built-in automatic type conversion you can turn on for a whole app — see [Coercion](/docs/validation/coercion).

See [Schema Definition](/docs/validation/schema) for the full shape of a validation schema and [Validation](/docs/core-concepts/validation) for the big picture.

## Types for this feature

Your Zod schema is both a runtime check and a type. The handler that uses it gets the inferred type for free.

The types you use (from `burger-api`):

- `BurgerContext<typeof GET>` — types `ctx.validated` from your schema
- `z.infer<typeof GET.query>` — the type of one slot, for variables or helpers

✅ Correct — annotate with the schema type:

```ts title="api/products/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
    const { limit } = ctx.validated.query; // typed: number | undefined
    return Response.json({ limit });
}
```

✅ Correct — reuse a slot's type elsewhere:

```ts
import type { GET } from "./schema";
type Query = z.infer<typeof GET.query>; // { limit?: number }
function usesLimit(limit: Query["limit"]) { /* ... */ }
```

❌ Wrong — an unannoted handler has no validated types:

```ts
export async function GET(ctx: BurgerContext) {
    ctx.validated.query.limit; // ❌ Property 'limit' does not exist (untyped)
}
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Schema Definition](/docs/validation/schema)
- [Params Validation](/docs/validation/params)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Standard Schema Support](/docs/validation/standard-schema)
- [Validation Types](/docs/api/validation-types)
