---
slug: burger-api-v0.10.0-release
title: BurgerAPI v0.10.0 Released
authors: [isfhan]
tags: [release, routing, performance, http]
---

**v0.10.0 upgrades BurgerAPI's routing engine. Static routes now run through Bun's native router for maximum speed, while dynamic and wildcard routes are matched by a fast internal trie — both sharing the same execution pipeline. The release also adds correct `405 Method Not Allowed` responses with an `Allow` header, automatic `HEAD` handling, and loose trailing-slash matching.**

<!-- truncate -->

## What's New in v0.10.0

- **Hybrid Router** — static routes are served by Bun's native `routes` map (the fast path), while `:param` and `*` routes are served by an optimized internal trie. Both execute the same shared handler, so middleware and validation behave identically.
- **Proper `405 Method Not Allowed`** — requesting a known route with an unsupported method now returns `405` with an `Allow` header listing the supported methods.
- **Automatic `HEAD`** — a `HEAD` request to a route that defines `GET` runs the `GET` handler and returns the response with the body removed.
- **Loose trailing slash** — `/foo` and `/foo/` resolve to the same route.
- **Precomputed `Allow` headers** — the `Allow` header is built once per route and cached.
- **Fail-fast route checks** — duplicate routes and ambiguous parameter folders are detected at compile time.

## How the Hybrid Router Works

BurgerAPI splits routing into two mechanisms that share one execution pipeline:

- **Static routes** are matched exactly and dispatched directly by Bun's native `routes` map — O(1), with no framework code on the hot path.
- **Dynamic routes** (e.g. `api/users/[id]`) and **wildcard routes** (e.g. `api/files/[...]`) are matched by an internal trie in O(number of path segments).
- **Matching priority:** static > dynamic > wildcard. A more specific route always wins.

Because both paths run the same compiled handler, method dispatch, `405`/`Allow`, automatic `HEAD`, and middleware behavior are identical regardless of how the route was matched.

## Method Not Allowed (405)

When a known route is requested with a method it doesn't support, BurgerAPI returns `405` and tells clients which methods are allowed:

```
GET    /api/products        → 200
POST   /api/products        → 200
DELETE /api/products        → 405  Allow: GET, POST
```

The `Allow` header is always present on `405` responses.

## Automatic HEAD

You no longer need to write a separate `HEAD` handler. A `HEAD` request to any route that defines `GET` reuses the `GET` handler and returns the same headers with an empty body:

```typescript title="api/health/route.ts"
export function GET() {
  return Response.json({ status: "ok" });
}
```

```
HEAD /api/health   → 200, same headers as GET, no body
```

## Trailing Slash

Trailing slashes are treated loosely. `/api/health` and `/api/health/` match the same route. On a dynamic route, a trailing slash is interpreted as an empty parameter value:

```
GET /api/users/123   → req.params.id === "123"
GET /api/users/      → req.params.id === ""   (then your Zod schema can reject it)
```

## Upgrade

v0.10.0 is backward-compatible — existing routes keep working, and no API changes are required.

```bash
bun add burger-api@latest
```

See the [routing documentation](/docs/routing/api/static-routes) for full details on routing behavior, parameters, and wildcards.

## Get Involved

BurgerAPI is open source and we welcome contributions!

- ⭐ [Star us on GitHub](https://github.com/isfhan/burger-api)
- 🐛 [Report issues](https://github.com/isfhan/burger-api/issues)
- 💡 [Share ideas](https://github.com/isfhan/burger-api/discussions)
- 🤝 [Contribute code](https://github.com/isfhan/burger-api/pulls)

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
