---
sidebar_label: "Static Routes"
---

# Static API Routes

A static route has a fixed path, such as `/api/products`. It captures no values from the URL.

## Create a route

Put a `route.ts` file in a folder under your `apiDir`. The folder path becomes the URL. The default `apiPrefix` is `api`.

```
api/
  products/
    route.ts           → /api/products
    featured/
      route.ts         → /api/products/featured
  users/
    profile/
      route.ts         → /api/users/profile
```

In `route.ts`, export one function per HTTP method. Use uppercase names: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

```typescript title="api/products/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ message: "Fetched products" });
}

export async function POST(ctx: BurgerContext) {
  const body = await ctx.json();
  return Response.json({ created: body }, { status: 201 });
}
```

Each handler gets one argument, `ctx` (a `BurgerContext`), and must return a standard `Response`. Returning a plain object does not work. See [Request API](/docs/api/request-api) for what `ctx` holds.

For a full example with GET and POST, see [CRUD API](/docs/examples/crud-api).

## Which route wins

When several routes could match a URL, the most specific one wins:

1. Static (`featured/`)
2. Dynamic (`[id]/`)
3. Wildcard (`[...]/`)

```
api/products/featured/route.ts   → GET /api/products/featured
api/products/[id]/route.ts       → GET /api/products/123
api/products/[...]/route.ts      → GET /api/products/123/reviews
```

## Built-in method handling

### Method Not Allowed (405)

If a route exists but does not export the requested method, the response is `405` with an `Allow` header:

```
DELETE /api/products   → 405  Allow: GET, HEAD, POST, OPTIONS
```

### Automatic HEAD

You do not write a `HEAD` handler. A `HEAD` request runs your `GET` handler and sends no body.

### Automatic OPTIONS

Every route answers `OPTIONS` with `204` and an `Allow` header. The automatic handler skips `transform` and `beforeRoute`, so auth checks do not block CORS preflight requests. If you export your own `OPTIONS` handler, it replaces the automatic one.

### Trailing slash

`/api/products/` matches `/api/products`.

## Types

Type the handler parameter with `BurgerContext`:

```typescript
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ message: "ok" });
}
```

For typed query, params or body, add a `schema.ts` and wrap the handler with `defineRoute`. See [Validation](/docs/validation/zod) and [Type Safety](/docs/advanced/type-safety).

## Related

- [Dynamic Routes](./dynamic-routes.md)
- [Wildcard Routes](./wildcard-routes.md)
- [Route Groups](./route-groups.md)
- [File-Based Routing](/docs/routing/file-based-routing)
