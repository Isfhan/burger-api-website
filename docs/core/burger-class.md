---
sidebar_label: Burger
---

# Burger Class

The **`Burger`** class is the main entry point for your BurgerAPI application. You import it, create an instance with [Server Options](/docs/core/server-options), and call `serve()` to start the server.

## Constructor

```ts
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
});

await app.serve(4000);
```

The constructor accepts a `ServerOptions` object that defines where routes live, URL prefixes, and validation settings. In dev, `src/hooks.ts`, `src/plugins.ts`, and `src/providers.ts` are auto-discovered; production builds pass pre-resolved modules and `apiRoutes` instead. OpenAPI metadata lives in `src/openapi.config.ts`, not here. See [Server Options](/docs/core/server-options) and [Configuration](/docs/core/configuration).

## Methods

### serve(port, callback?)

Starts the server and listens for requests.

```ts
await app.serve(4000);
await app.serve(4000, () => {
  console.log("Server running at http://localhost:4000");
});
```

- **port** (number, default: 4000): port to listen on.
- **callback?** (function): called after the server has started.

This is the Bun deployment surface. See [Deployment](/docs/deployment/bun).

### usePlugin(plugin, scope?, seed?)

Registers a plugin (application extension). Plugin hooks are compiled into the hook chain for every route. The same plugin identity is deduplicated. Returns `this` for chaining.

```ts
app.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
```

Plugins are registered in `src/plugins.ts`. See [Ecosystem](/docs/ecosystem/introduction).

### provide(name, service)

Registers an application service, created once at startup and injected into `ctx.services` for every request.

```ts
app.provide("db", createDb());
```

Services are registered in `src/providers.ts` and accessed as `ctx.services.name`, typed via module augmentation.

### websocket(path, handlers)

Registers a WebSocket route programmatically (as an alternative to a file-based route under `wsDir`). Returns `this` for chaining.

```ts
app.websocket("/chat", {
  open(ws) {
    ws.send("connected");
  },
  message(ws, message) {
    ws.send(message);
  },
});
```

Programmatic WebSocket routes are a **dev-only** convenience. They are not captured by production AOT builds. Use a file-based route under `wsDir` for anything that needs to survive `burger-api build`. See [WebSocket](/docs/websocket/overview).

### fetchHandler()

Builds a Web-Standard fetch handler for the app. Usable with `Bun.serve`, `Deno.serve`, Vercel, Cloudflare Workers, and Node 24+. It serves static function page routes and embedded assets, and handles WebSocket upgrades where the runtime supports them (Bun, Deno, Cloudflare Workers). Bun-only page features (HTML-import bundles and dynamic `[param]` pages) and disk-backed dev assets are only served by `serve()` on Bun; see [Compatibility](/docs/compatibility).

### toFetchHandler(burger)

The WinterCG entry point. `toFetchHandler(app)` returns a Web-Standard fetch handler that runs anywhere `Request` and `Response` exist:

```ts
import { Burger, toFetchHandler } from "burger-api";

const app = new Burger({ apiRoutes });

// Cloudflare Workers / Vercel
export default { fetch: toFetchHandler(app) };

// Deno
Deno.serve(toFetchHandler(app));
```

WinterCG targets must pass AOT `apiRoutes`: there is no filesystem at runtime. See [Deployment](/docs/deployment/bun).

### createNodeWsBridge(options)

Lower-level Node WebSocket integration. On Node, use `serve(app)` from [`@burger-api/node-server`](/docs/deployment/node) instead: it starts the HTTP server and wires the WebSocket bridge for you.

`createNodeWsBridge()` returns a bridge that plugs the framework's WebSocket pipeline into `node:http`'s `'upgrade'` event, using a framing library's `WebSocketServer` (the `ws` package). It requires WebSocket routes to already be configured (`wsDir`, `wsRoutes`, or `app.websocket()`) and to have been processed by `await app.fetchHandler()` (or `await app.serve()`) first; it throws otherwise. This is the escape hatch for wiring things by hand.

```ts
import { serve } from "@burger-api/node-server";
import { Burger } from "burger-api";

const app = new Burger({ apiRoutes, wsRoutes });

serve(app, { port: 3000 }); // HTTP + WebSocket bridge, including createNodeWsBridge()
```

See [WebSocket](/docs/websocket/overview#nodejs) and [Compatibility](/docs/compatibility).

### getServer()

Returns the underlying `Server` wrapper (created in the constructor, so it is always present). Mainly useful for test harnesses and benchmark scripts that need to stop the server cleanly; `isRunning()` reports whether `serve()` has actually started it.

```ts
const server = app.getServer();
if (server?.isRunning()) server.stop();
```

## App files

Scaffolded projects split configuration across convention files:

| File | Role |
|------|------|
| `src/index.ts` | `Burger` instance, `serve()` only |
| `src/hooks.ts` | Global lifecycle hooks |
| `src/plugins.ts` | Register plugins |
| `src/providers.ts` | Declare shared services |
| `burger.build.ts` | Build-time only (CLI) |

## Related

- [Server Options](/docs/core/server-options)
- [Configuration](/docs/core/configuration)
