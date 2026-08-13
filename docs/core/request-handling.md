---
sidebar_label: Request Context
---

# Request Context

Every handler and hook receives a `BurgerContext` (`ctx`), the request context for that request. It is a single, lightweight object that exposes the standard `Request` surface through delegation, plus a few framework additions:

- `ctx.request`: the original raw `Request`.
- `ctx.params`: dynamic path parameters.
- `ctx.wildcardParams`: wildcard segments.
- `ctx.query`: the parsed query string (evaluated lazily).
- `ctx.cookies`: parsed cookies (evaluated lazily).
- `ctx.route`: the matched route's path and pattern.
- `ctx.validated`: data validated by your schemas.
- `ctx.set`: response changes applied at the end of the request lifecycle.
- `ctx.services`: application services declared in `src/providers.ts`.
- `ctx.config`: the route's `config.ts` settings, read-only.

Request data is read lazily. For example, `ctx.query` is parsed only when you use it, so a request that never reads the query pays nothing for parsing.

`ctx` is not a `Request` subclass: use `ctx.request` for the raw object and the delegated helpers (`ctx.json()`, `ctx.text()`, `ctx.headers`, `ctx.method`, `ctx.url`, `ctx.body`, ...) for everything else.

## Handler story

Handlers are per-method exports that receive the context and return a standard Web `Response`:

```ts title="api/users/[id]/route.ts"
export async function GET(ctx: BurgerContext) {
  const { id } = ctx.params;
  return Response.json({ id });
}
```

See [Request API](/docs/api/request-api) for every property with examples. For routing details, see [File-Based Routing](/docs/routing/file-based-routing).

## Types for this feature

The types you use (from `burger-api`):

- `BurgerContext` — the request object passed to handlers and hooks
- `BurgerContext<typeof GET>` — the request object with `ctx.validated` typed from your schema

✅ Correct — type the handler parameter:

```ts title="api/users/[id]/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
    const { id } = ctx.validated.params; // typed from the schema
    return Response.json({ id });
}
```

❌ Wrong — reading a body field that was not validated:

```ts
export async function POST(ctx: BurgerContext) {
    ctx.validated.body.anything; // ❌ 'ctx.validated' is possibly undefined
}
```

Use `ctx.json<T>()` to give the parsed body a type:

```ts
const body = await ctx.json<{ id: number }>();
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
