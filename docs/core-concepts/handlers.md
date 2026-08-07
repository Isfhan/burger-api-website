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

Validation lives in the route's `schema.ts` with per-method named exports. Type the handler with the method's schema to get inferred `ctx.validated`:

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
```

```ts title="api/products/route.ts"
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
}
```

See [Validation](/docs/validation/zod) for the full flow.

## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Request Context](/docs/core/request-handling)
