---
sidebar_label: Handlers
---

# Handlers

A route file exports one function per HTTP method: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`. Each handler gets `ctx` and returns a standard `Response`.

```ts title="src/api/products/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ items: [] });
}

export async function POST(ctx: BurgerContext) {
  const body = await ctx.json();
  return Response.json({ created: true }, { status: 201 });
}
```

`HEAD` and `OPTIONS` are handled for you.

## Reading the request

Use `ctx.params`, `ctx.query`, `ctx.cookies` and `ctx.json()`. See [Request API](/docs/api/request-api) for the full list.

## Typed, validated data

Put schemas in `schema.ts` and wrap the handler with `defineRoute`. `ctx.validated` is then typed for you.

```ts title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
```

```ts title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
});
```

See [Validation](/docs/core-concepts/validation).

## Related

- [Routing](/docs/core-concepts/routing)
- [Request Context](/docs/core/request-handling)
- [Response Types](/docs/core/response-types)
- [Validation](/docs/core-concepts/validation)
