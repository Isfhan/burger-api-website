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
  title: "My API",
  version: "1.0.0",
});

await app.serve(4000);
```

The constructor accepts a `ServerOptions` object that defines where routes live, URL prefixes, validation settings, and OpenAPI metadata. In dev, `src/hooks.ts`, `src/plugins.ts`, and `src/providers.ts` are auto-discovered; production builds pass pre-resolved modules and `apiRoutes` instead. See [Server Options](/docs/core/server-options) and [Configuration](/docs/core/configuration).

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

### macro(name, fn)

Registers a reusable hook factory. Macros expand at compile time into plugin-scoped hooks applied to every route. `fn` takes no arguments — a macro is a zero-arg bundle of hooks, not a per-call-site configurable unit.

```ts
app.macro("requireAuth", () => ({
  beforeRoute: [/* ... */],
}));
```

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

Programmatic WebSocket routes are a **dev-only** convenience — they are not captured by production AOT builds. Use a file-based route under `wsDir` for anything that needs to survive `burger-api build`. See [WebSocket](/docs/websocket/overview).

### fetchHandler()

Builds a Web-Standard fetch handler for the app. Usable with `Bun.serve`, `Deno.serve`, Vercel, Cloudflare Workers, and Node 24+. Pages and WebSocket are Bun-only and are not served by this handler.

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

Node WebSocket integration: returns a bridge that plugs the framework's WebSocket pipeline into `node:http`'s `'upgrade'` event, using a framing library's `WebSocketServer` (e.g. the `ws` package). Requires WebSocket routes to already be configured (`wsDir`, `wsRoutes`, or `app.websocket()`) — throws otherwise.

```ts
import http from "node:http";
import { WebSocketServer } from "ws";
import { Burger, toFetchHandler } from "burger-api";

const app = new Burger({ apiRoutes, wsRoutes });
const bridge = app.createNodeWsBridge({ WebSocketServer });

http
  .createServer((req, res) => toFetchHandler(app)(req, undefined))
  .on("upgrade", (req, socket, head) => bridge.handleUpgrade(req, socket, head))
  .listen(3000);
```

This is the escape hatch for running BurgerAPI's WebSocket routes on plain Node — see [WebSocket](/docs/websocket/overview#nodejs) and [Compatibility](/docs/compatibility).

### getServer()

Returns the underlying `Server` instance, or `undefined` if `serve()` hasn't started one yet (e.g. no routes were configured). Mainly useful for test harnesses and benchmark scripts that need to stop the server cleanly.

```ts
const server = app.getServer();
server?.stop();
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
