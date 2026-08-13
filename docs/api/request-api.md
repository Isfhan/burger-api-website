---
sidebar_label: Request API
---

# Request API

The `ctx` object your handlers receive exposes request data through a small, consistent set of properties. This page shows how to use each one.

`ctx` is a `BurgerContext`. It is not a `Request` subclass: the original request is available as `ctx.request`, and the standard request surface is delegated.

## ctx.request

The raw `Request`. Use it when you need the full request object:

```ts
export async function GET(ctx: BurgerContext) {
  const url = new URL(ctx.request.url);
  return Response.json({ path: url.pathname });
}
```

## ctx.params

Dynamic path parameters:

```ts title="api/users/[id]/route.ts"
export async function GET(ctx: BurgerContext) {
  const { id } = ctx.params;
  return Response.json({ id });
}
```

**When to use:** any time the route has a `[param]` segment. Wildcard segments are available as `ctx.wildcardParams`.

## ctx.query

The parsed query string, available lazily:

```ts
export async function GET(ctx: BurgerContext) {
  const { limit = "10", tag } = ctx.query;
  return Response.json({ limit, tag });
}
```

**Why:** `ctx.query` parses only when you read it, so requests that don't use the query pay nothing for parsing. See [Query Parsing](./query-parsing.md).

## ctx.cookies

Parsed cookies, also lazy. The record maps cookie names to values.

## ctx.body

The raw request body stream (`ReadableStream | null`), delegated from `ctx.request`.

## ctx.json() and ctx.text()

Read the request body as JSON or text. These delegate to the underlying request:

```ts
export async function POST(ctx: BurgerContext) {
  const body = await ctx.json();
  return Response.json({ received: body });
}
```

## ctx.headers, ctx.method, ctx.url

The request headers, HTTP method, and full URL. All delegate to the underlying request and never allocate anything extra:

```ts
export async function GET(ctx: BurgerContext) {
  const token = ctx.headers.get("authorization");
  return Response.json({ method: ctx.method });
}
```

## ctx.route

The matched route's identity:

```ts
export async function GET(ctx: BurgerContext) {
  // ctx.route.pattern === "/users/:id"
  return Response.json({ pattern: ctx.route.pattern });
}
```

Present on every matched route, including static routes. See [Route Metadata](./route-metadata.md).

## ctx.validated

Data that passed your schemas, typed from `schema.ts`:

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
```

```ts title="api/products/route.ts"
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  const { limit } = ctx.validated.query; // typed + validated
  return Response.json({ limit });
}
```

**Why:** validated data is typed from your schema, so handlers know exactly what they received without manual casts. See [Validation](/docs/validation/zod).

## ctx.services

Application services registered in `src/providers.ts`, typed via module augmentation. See [Configuration](/docs/core/configuration).

## ctx.set

Response mutations, covered in [Response Mutation](./response-mutation.md).

## Types for this feature

The type you use: `BurgerContext`, or `BurgerContext<typeof GET>` when the route has a schema.

✅ Correct — type the handler parameter:

```ts
import type { BurgerContext } from "burger-api";
export async function GET(ctx: BurgerContext) {
    const { limit = "10" } = ctx.query;
    return Response.json({ limit });
}
```

✅ Correct — give the JSON body a type with `ctx.json<T>()`:

```ts
export async function POST(ctx: BurgerContext) {
    const body = await ctx.json<{ name: string }>();
    return Response.json({ name: body.name });
}
```

❌ Wrong — untyped handler parameters:

```ts
export async function GET(ctx) {
    // ❌ Parameter 'ctx' implicitly has an 'any' type
}
```

Unannoted `BurgerContext` keeps every request field (query, params, cookies) untyped. For typed request data, add a schema and use `BurgerContext<typeof GET>` — see [Validation](/docs/validation/zod) and the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Burger Class](/docs/core/burger-class)
- [Key Concepts](/docs/key-concepts)
