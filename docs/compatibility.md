---
sidebar_position: 1
---

# Runtimes & Compatibility

BurgerAPI is **Bun-first** and WinterCG-compatible. The same app code (routes,
hooks, validation, OpenAPI, plugins, providers) runs on Bun in development and
deploys to five targets via `burger-api build --target=<platform>`: Bun,
Node.js, Cloudflare Workers, Deno, and Vercel.

Every claim on this page is backed by one thing: `RUNTIME_CAPABILITIES`, a
small data table exported from `burger-api` itself. The CLI's `build
--target` reads the same table to reject an unsupported combination (e.g. a
WebSocket route targeting Vercel) at build time, so this page and the build
can't quietly drift apart the way hand-maintained compatibility prose
otherwise does.

## Feature matrix

| Feature | Bun | Node.js | Cloudflare Workers | Deno | Vercel |
|---|---|---|---|---|---|
| File-based routing (`route.*`, `schema.*`, `hooks.*`, `openapi.*`, `config.*`) | Full | Full | Full (AOT) | Full (AOT) | Full (AOT) |
| Hook lifecycle (all 6 points) | Full | Full | Full | Full | Full |
| Validation (`ctx.validated`, 422 + RFC 9457) | Full | Full | Full | Full | Full |
| OpenAPI + docs UI | Full | Full | Full | Full | Full |
| Providers (`ctx.services`) / Plugins | Full | Full | Full | Full | Full |
| `burger-api build --target` | `bun` (default) | `node` | `cloudflare` | `deno` | `vercel` |
| Long-running process | Yes | Yes | No (per-request) | Usually (Deploy: no) | No (per-invocation) |
| Filesystem at request time | Yes | Yes | No | Yes (Deploy: no) | No |
| Static assets | Disk (dev) / embedded (prod) | Disk (dev) / embedded (prod) | Platform-native recommended (Assets binding) | Disk (dev) / embedded (prod) | Platform-native recommended (`public/` + CDN) |
| WebSocket | Yes (native `ServerWebSocket`) | Yes (via `@burger-api/node-server`'s bridge) | Yes (native `WebSocketPair`) | Yes (native `Deno.upgradeWebSocket`) | **No** |
| `--compile` (standalone binary) | Yes | N/A | N/A | N/A | N/A |

## WebSocket

Four of five targets genuinely support WebSocket, each through its own native
primitive. There's no shim pretending otherwise:

- **Bun**: `server.upgrade()`, the runtime hijacks the socket directly.
- **Cloudflare Workers**: `new WebSocketPair()`, returned as a `101` response with `webSocket` set.
- **Deno**: `Deno.upgradeWebSocket(request)`.
- **Node.js**: no `fetch`-handler upgrade path exists on Node at all, so the
  [`@burger-api/node-server`](/docs/deployment/node) adapter wires
  `createNodeWsBridge()` to `node:http`'s `'upgrade'` event automatically
  when the app has WebSocket routes.

**Vercel is the one real exception**, and it's a platform limitation, not a
missing adapter: Vercel Functions have no persistent-connection model to
upgrade into. `burger-api build --target=vercel` **fails at build time** if
the project has any WebSocket routes, rather than silently shipping a broken
route. The same check `RUNTIME_CAPABILITIES` backs is what the runtime side
also uses, so a WebSocket upgrade attempted against a Vercel-declared build
gets an honest "not supported on this deployment target" response instead of
being mistaken for a plain, bridgeable Node deployment.

See [WebSocket → Node.js](/docs/websocket/overview#nodejs) for the Node bridge specifically.

## Static assets

Two portable modes exist inside burger-api itself:

- **Dev** (`pageDir` set, Bun/Node/Deno): files under `<pageDir>/assets/` are read from disk per request.
- **Production AOT** (`burger-api build`): file contents are base64-embedded into the build output, so the artifact never touches the filesystem at request time. This works on every target, including Cloudflare and Vercel.

For Cloudflare Workers and Vercel specifically, prefer the platform's own
static hosting over framework-served assets once you have more than a
handful of small files. Cloudflare's Assets binding and Vercel's `public/` +
CDN are both faster and cheaper than routing static content through a
Worker/Function invocation. burger-api's embedded-asset mode is there for
small, bundled assets (an icon, a manifest), not as a CDN replacement.

## What the non-Bun targets need

Cloudflare Workers, Vercel, and Deno Deploy have no persistent filesystem at
request time, so:

- Routes must be **compiled ahead of time (AOT)**. `burger-api build
  --target=<platform>` does this for you: it scans `apiDir`/`pageDir`/`wsDir`
  once at build time and generates a self-contained entry file. There is no
  runtime route scanning on these targets.
- The module graph must contain **no `bun` imports**: the generated entry
  exports `{ fetch: toFetchHandler(app) }`, portable across every WinterCG
  runtime.
- Cloudflare/Deno/Vercel builds are **not bundled by burger-api**: the
  generated entry is handed to the platform's own tool (`wrangler`, `deno`,
  `vercel`) to bundle and deploy, the same as any other project on that
  platform.

See the deployment guides for each target: [Bun](deployment/bun),
[Node.js](deployment/node),
[Cloudflare Workers](deployment/cloudflare), [Vercel](deployment/vercel),
[Deno](deployment/deno), and [Benchmarks](advanced/benchmarks) for how fast
the Bun path actually is.
