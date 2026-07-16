---
slug: burger-api-v0.11.0-release
title: BurgerAPI v0.11.0 Released
authors: [isfhan]
tags: [release, context, performance, query-parsing]
---

**v0.11.0 replaces the raw `Request` argument with BurgerContext, a new request object that gives handlers access to `req.query`, `req.route`, `req.set`, and `req.validated`. Query strings are parsed only when you read them, response changes are applied in one step at the end, and fields your handler never uses are never processed. Everything is backward-compatible, existing routes work unchanged.**

<!-- truncate -->

## What's New in v0.11.0

- **BurgerContext** — one request object is created per request and shared across middleware and handlers. It wraps the native `Request` and adds lazy fields that are only computed when you read them.
- **`req.query`** — query parameters are parsed with a fast, lightweight parser. No `URL` or `URLSearchParams` object is created. Duplicate keys become arrays, `+` is treated as space.
- **`req.route`** — every matched route exposes `path` (the actual URL) and `pattern` (the route definition). Works for static, dynamic, and wildcard routes.
- **`req.set`** — change the response status or headers without building a new Response. Changes are applied once at the end, after your handler and any `after` middleware.
- **Less unused work** — if your handler never reads `req.query`, nothing is parsed. If you never set `req.set`, no response changes are applied.
- **Route access analysis** — an optional compile-time check that detects which request fields each handler uses, useful for future optimizations.

## BurgerContext

Every request now comes with a BurgerContext object. It works like the standard `Request` you already know, but adds a few extras:

```typescript
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  const query = req.query;
  const route = req.route;
  const validated = req.validated;

  return Response.json({ query, route, validated });
}
```

You still get everything from the regular `Request` (like `req.method`, `req.url`, `req.headers`, `req.json()`). The new fields are just bonuses.

## Query Parameters

Before this release, reading `req.query` required creating a `URL` object and parsing the full query string. Now BurgerAPI uses a lighter approach. It reads the raw query string directly and only does the work when you ask for a value:

```typescript
export async function GET(req: BurgerRequest) {
  const page = req.query.page;
  const tags = req.query.tag;

  return Response.json({ page, tags });
}
```

If your handler never touches `req.query`, nothing is parsed. Duplicate keys automatically become arrays, and `+` signs are treated as spaces, just like the browser does.

## Route Identity

Every route now tells you which path it matched and what pattern it was defined with:

```typescript
// GET /api/users/42

req.route.path    // "/api/users/42"
req.route.pattern // "/api/users/:id"
```

This works for static routes, dynamic routes with parameters, and wildcard routes. It is useful for logging, debugging, or building APIs that need to know their own structure.

## Changing the Response

If you want to change the status code or add a header, you don't need to build a new Response. Use `req.set` instead:

```typescript
export async function POST(req: BurgerRequest) {
  const body = await req.json();

  req.set.status = 201;
  req.set.headers = { "X-Custom": "value" };

  return Response.json(body);
}
```

BurgerAPI applies your changes at the end, after your handler and any `after` middleware finish. If you never use `req.set`, nothing changes.

## Only Pay for What You Use

BurgerContext is built so unused features cost nothing:

| Field | What happens when you don't use it |
|-------|-------------------------------------|
| `req.query` | Not parsed, nothing created |
| `req.set` | No response changes applied |
| `req.params` | Already parsed by the router |
| `req.route` | Already set when the route matched |

This means adding `req.query` to your code won't slow down routes that never read it.

## Upgrade

v0.11.0 is backward-compatible, existing routes keep working, and no API changes are required.

```bash
bun add burger-api@latest
```

The new fields (`query`, `set`, `route`) are optional. Use them when you need them.

See the [request handling documentation](/docs/core/request-handling) and [BurgerContext architecture](/docs/architecture/burger-context) for full details.

## Get Involved

BurgerAPI is open source and we welcome contributions!

- ⭐ [Star us on GitHub](https://github.com/isfhan/burger-api)
- 🐛 [Report issues](https://github.com/isfhan/burger-api/issues)
- 💡 [Share ideas](https://github.com/isfhan/burger-api/discussions)
- 🤝 [Contribute code](https://github.com/isfhan/burger-api/pulls)

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
