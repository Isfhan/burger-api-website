---
sidebar_label: Handlers
---

# Handlers

Each route file exports functions named after HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, ...). A handler receives a `BurgerContext` and returns a standard Web `Response`.

```ts title="api/products/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ items: [] });
}

export async function POST(ctx: BurgerContext) {
  const body = await ctx.json();
  // ...create a product...
  return Response.json({ created: true }, { status: 201 });
}
```

## Reading request data

Handlers read `ctx.params`, `ctx.query`, `ctx.cookies`, and `ctx.json()` for request data, and `ctx.validated` for data that passed your schemas. Response changes are expressed with `ctx.set`. See [Request API](../api/request-api.md) for every property.

## Typed validated data

Validation lives in the route's `schema.ts` with per-method named exports. Wrap the handler with `defineRoute(schema, handler)` to get `ctx.validated` inferred from the schema automatically — no generic to write by hand:

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
});
```

The older, equivalent form — annotate the handler with `BurgerContext<typeof GET>` directly — still works:

```ts
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
}
```

See [Validation](/docs/validation/zod) for the full flow and [Type Safety](/docs/advanced/type-safety) for how `defineRoute` works.

## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Request Context](/docs/core/request-handling)
