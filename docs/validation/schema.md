---
sidebar_label: Schema Definition
---

# Schema Definition

The **validation schema** lives in `schema.ts`, one per route directory. It exports one object per HTTP method (uppercase: `GET`, `POST`, and so on). For each method you describe the data you expect.

In short: a schema is a small description of "what the request should look like". BurgerAPI reads it, checks the real request against it, and gives you clean data to work with.

## The full shape

```typescript title="api/products/schema.ts"
import { z } from "zod";

export const GET = {
  // path parameters, e.g. /users/:id
  params: z.object({ id: z.string() }),
  // query string, e.g. ?limit=10
  query: z.object({ limit: z.number() }),
  // request headers
  headers: z.object({ "x-api-key": z.string() }),
  // cookies
  cookies: z.object({ session: z.string() }),
  // JSON request body (POST/PUT)
  body: z.object({ name: z.string() }),
  // per-route opt-in for automatic type conversion
  coerce: true,
};

export const POST = {
  body: z.object({ name: z.string() }),
  // validate what the handler returns
  response: { 200: z.object({ id: z.string() }) },
};
```

Every slot is optional. You only describe what you actually use.

## Reusing a schema across routes

When the same shape appears in several routes, define it once and import it. Plain TypeScript, no registry to learn:

```typescript title="src/schemas.ts"
import { z } from "zod";

export const Pagination = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});
```

```typescript title="api/items/schema.ts"
import { Pagination } from "../../schemas";

export const GET = { query: Pagination }; // shared, fully typed
```

## Validated data

After validation, the result is available on `ctx.validated`:

- `ctx.validated.params`
- `ctx.validated.query`
- `ctx.validated.headers`
- `ctx.validated.cookies`
- `ctx.validated.body`

Each is typed from the corresponding schema. Wrap the handler with `defineRoute(schema, handler)` to get the inferred types automatically, or annotate it with `BurgerContext<typeof GET>` by hand. See [Zod Validation](/docs/validation/zod), [Query](/docs/validation/query), and [Body](/docs/validation/body).

## Types for this feature

The schema is the source of your types. The handler that uses it gets those types for free.

The types you use (from `burger-api`):

- `defineRoute(schema, handler)`: infers the handler type from `schema`; no generic to write
- `BurgerContext<typeof GET>`: the same inference, written by hand. `typeof GET` is the schema export.
- `ctx.validated`: the validated data, typed slot by slot.
- `RouteSchema`: a route's full schema map (for programmatic routes).

✅ Correct. Wrap the handler with `defineRoute`:

```typescript title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    const { id } = ctx.validated.params; // typed: string
    const { limit } = ctx.validated.query; // typed: number
    return Response.json({ id, limit });
});
```

❌ Wrong. Reading a slot you did not declare:

```typescript
export const GET = defineRoute(GetSchema, (ctx) => {
    ctx.validated.body; // ❌ Property 'body' does not exist (no body schema on GET)
});
```

A slot without a schema is `unknown`. A schema written as a string reference (model) is also `unknown`, since the model is checked at runtime, not by TypeScript. See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Zod Validation](/docs/validation/zod)
- [Params Validation](/docs/validation/params)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Headers Validation](/docs/validation/headers)
- [Cookie Validation](/docs/validation/cookie)
- [Validation Types](/docs/api/validation-types)
