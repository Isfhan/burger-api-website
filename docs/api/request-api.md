---
sidebar_label: Request API
---

# Request API

Every handler and hook gets `ctx`, a `BurgerContext`. This page lists what you can read from it.

Examples assume `import type { BurgerContext } from "burger-api";`.

## Quick reference

| Property | What it is |
|----------|------------|
| `ctx.params` | Path parameters from `[param]` folders |
| `ctx.wildcardParams` | Segments matched by a `[...]` folder |
| `ctx.query` | Query string values. See [Query Parsing](/docs/api/query-parsing) |
| `ctx.cookies` | Cookies, by name |
| `ctx.headers`, `ctx.method`, `ctx.url` | The usual request fields |
| `ctx.json()`, `ctx.text()`, `ctx.arrayBuffer()` | Read the body |
| `ctx.body` | The raw body stream |
| `ctx.request` | The original `Request` |
| `ctx.validated` | Data that passed your schemas |
| `ctx.route` | The matched route. See [Route Metadata](/docs/api/route-metadata) |
| `ctx.config` | The route's `config.ts` values, read-only |
| `ctx.services` | Services from `src/providers.ts` |
| `ctx.ip` | The client address |
| `ctx.set` | Status, headers and cookies for the response. See [Response Mutation](/docs/api/response-mutation) |

## Params and query

```ts title="src/api/users/[id]/route.ts"
export async function GET(ctx: BurgerContext) {
  const { id } = ctx.params;
  const { limit = "10" } = ctx.query;
  return Response.json({ id, limit });
}
```

## Body

```ts
export async function POST(ctx: BurgerContext) {
  const body = await ctx.json<{ name: string }>();
  return Response.json({ name: body.name });
}
```

You can call `ctx.json()` more than once. If the route has a `body` schema, read `ctx.validated.body` instead. It is typed and already checked.

## ctx.validated

Add a `schema.ts` and wrap the handler with `defineRoute`. `ctx.validated` is then typed from the schema.

```ts title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
```

```ts title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { limit } = ctx.validated.query; // number | undefined
  return Response.json({ limit });
});
```

See [Validation](/docs/core-concepts/validation).

## ctx.services

Shared services such as a database client. They are the same for every request and read-only. For per-request values, use a [transform](/docs/hooks/global#transform) hook. See [Providers](/docs/core-concepts/providers).

## ctx.ip

The client address from the socket. It never comes from headers like `X-Forwarded-For`. It is set on Bun `serve()` and on [`@burger-api/node-server`](/docs/deployment/node). With `toFetchHandler` it is `undefined`.

## Related

- [Request Context](/docs/core/request-handling)
- [Response Mutation](/docs/api/response-mutation)
- [Burger Class](/docs/core/burger-class)
- [Key Concepts](/docs/key-concepts)
