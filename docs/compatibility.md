---
sidebar_position: 1
---

# Runtimes & Compatibility

You write your app once and run it on Bun in development. To deploy, run `burger-api build --target=<platform>` for one of five targets: Bun, Node.js, Cloudflare Workers, Deno, or Vercel.

Version requirements:

- **Bun 1.4.4 or newer** for the framework and CLI.
- **Node 24.22.1+ or 26.12.1+** for Node.js deployments.

## Feature matrix

| Feature | Bun | Node.js | Cloudflare Workers | Deno | Vercel |
|---|---|---|---|---|---|
| File-based routing (`route.*`, `schema.*`, `hooks.*`, `openapi.*`, `config.*`) | Full | Full | Full | Full | Full |
| Hook lifecycle (all 6 points) | Full | Full | Full | Full | Full |
| Validation (`ctx.validated`, 422 + RFC 9457) | Full | Full | Full | Full | Full |
| OpenAPI + docs UI | Full | Full | Full | Full | Full |
| Providers (`ctx.services`) / Plugins | Full | Full | Full | Full | Full |
| `burger-api build --target` | `bun` (default) | `node` | `cloudflare` | `deno` | `vercel` |
| Long-running process | Yes | Yes | No (per-request) | Usually (Deploy: no) | No (per-invocation) |
| Filesystem at request time | Yes | Yes | No | Yes (Deploy: no) | No |
| Static assets | Yes | Yes | Yes (platform assets recommended) | Yes | Yes (platform assets recommended) |
| WebSocket | Yes | Yes (with `@burger-api/node-server`) | Yes | Yes | **No** |
| Pub/sub (`ws.publish`, `ctx.publish`) | Yes | No | No | No | No |
| `--compile` (standalone binary) | Yes | N/A | N/A | N/A | N/A |

## WebSocket

WebSocket works on every target except Vercel. Vercel has no long-lived connections, so `burger-api build --target=vercel` fails if your project has WebSocket routes.

Pub/sub is Bun-only. See [WebSocket](/docs/websocket/overview) for a pattern that works everywhere, and [WebSocket on Node.js](/docs/websocket/overview#nodejs) for Node setup.

## Static assets

Production builds include your asset files, so they work on every target. On Cloudflare Workers and Vercel, use the platform's own static hosting (Cloudflare Assets, Vercel `public/`) for anything more than a few small files.

## Cloudflare Workers, Deno, and Vercel

- `burger-api build` finds your routes at build time. Your app does not read the filesystem at request time.
- Do not import `bun` in your app code. These runtimes cannot load it.
- The build gives you an entry file. You bundle and deploy it with the platform's own tool (`wrangler`, `deno`, `vercel`).

## Related

- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Node.js](/docs/deployment/node)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Deno](/docs/deployment/deno)
- [Deploy on Vercel](/docs/deployment/vercel)
