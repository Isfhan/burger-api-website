---
sidebar_position: 1
---

# Runtimes & Compatibility

BurgerAPI is **Bun-first** and WinterCG-compatible. The same app code — routes,
hooks, validation, OpenAPI, plugins, providers — runs on Bun in development and
production, and deploys to any WinterCG fetch runtime through
`toFetchHandler` (Cloudflare Workers, Vercel, Deno Deploy, Node 24+).

## Bun vs WinterCG Feature Matrix (1.0)

| Feature | Bun (primary) | WinterCG fetch (CF / Vercel / Deno) |
|---------|---------------|-------------------------------------|
| File-based routing (`route.*`, `schema.*`, `hooks.*`, `openapi.*`, `config.*`) | Full | Full (AOT-compiled) |
| Hook lifecycle (all 6 points) | Full | Full |
| Validation (`ctx.validated`, 422 + RFC 9457) | Full | Full |
| OpenAPI + docs UI (Scalar / Swagger / Redoc, `docsAuth`) | Full | Full |
| Providers (`ctx.services`) | Full | Full |
| Plugins | Full | Full |
| `serve()` long-lived server | Yes (`BunAdapter`) | No — use `toFetchHandler` |
| Native static route map (Bun.serve `routes`) | Yes (optimization) | No — trie dispatch |
| Pages `HTMLBundle` | Yes | No (not in 1.0) |
| WebSocket (`src/websocket/`, `burger.websocket()`, `wsDir`) | Yes | No (not in 1.0 — no edge WS parity) |
| Node 24+ | Via Bun-compatible path | Yes (same fetch entry) |

Pages and WebSocket are **Bun-only in 1.0**. Everything else is portable.

## What WinterCG deployments need

WinterCG runtimes have no filesystem, so:

- Routes must be **compiled ahead of time (AOT)** — pass them via `apiRoutes`
  in `new Burger({...})` or build with `burger-api build`. There is no runtime
  route scanning.
- The module graph must contain **no `bun` imports** — import
  `toFetchHandler` from `burger-api/adapter/web-standard` (also re-exported
  from the package root).
- The app exports the platform entry shape, e.g.
  `export default { fetch: toFetchHandler(burger) }` for Cloudflare Workers.

See the deployment guides for each target: [Bun](deployment/bun),
[Cloudflare Workers](deployment/cloudflare), [Vercel](deployment/vercel),
[Deno](deployment/deno).
