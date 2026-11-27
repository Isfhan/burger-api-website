---
sidebar_label: Burger
---

# Burger Class

`Burger` is your app. Create it in `src/index.ts` and call `serve()` to start it.

```ts title="src/index.ts"
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
});

await app.serve(4000);
```

The constructor takes [Server Options](/docs/core/server-options). Hooks, plugins, providers and OpenAPI metadata live in their own files, not here. See [Configuration](/docs/core/configuration).

## App files

| File | Role |
|------|------|
| `src/index.ts` | `new Burger({...})` and `serve()` only |
| `src/hooks.ts` | Global hooks |
| `src/plugins.ts` | Register plugins with `usePlugin` |
| `src/providers.ts` | Register services with `provide` |
| `src/openapi.config.ts` | OpenAPI metadata and docs UI |
| `burger.build.ts` | Build settings, read by the CLI only |

## Methods

### serve(port?, callback?)

Starts the server on Bun.

```ts
await app.serve(4000, () => {
  console.log("Server running at http://localhost:4000");
});
```

- `port`: default `4000`.
- `callback`: runs once the server has started.

See [Deployment](/docs/deployment/bun).

### usePlugin(plugin)

Registers a plugin. Call it in `src/plugins.ts`, which default-exports a function:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default function (burger: PluginRegistrar) {
  burger.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
}
```

Registering the same plugin twice has no extra effect. See [Hooks and Plugins](/docs/ecosystem/hooks-plugins) and [Configuration](/docs/core/configuration#plugins-and-providers).

### provide(name, service)

Registers a service. It is created once and shared as `ctx.services.<name>`. Call it in `src/providers.ts`:

```ts title="src/providers.ts"
import type { ProviderRegistrar } from "burger-api";
import { createDb } from "./db";

export default function (burger: ProviderRegistrar) {
  burger.provide("db", createDb());
}
```

See [Providers](/docs/core-concepts/providers) and [Configuration](/docs/core/configuration#plugins-and-providers).

### websocket(path, handlers)

Adds a WebSocket route in code:

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

Routes added this way work in dev only. `burger-api build` does not include them. For production, add a file under `src/websocket/`. See [WebSocket](/docs/websocket/overview).

### fetchHandler()

Builds a standard fetch handler `(request) => Promise<Response>`. It is async, so `await` it. Use it with `Bun.serve`, `Deno.serve`, Vercel, Cloudflare Workers or Node 24+. Some page features work only with `serve()` on Bun. See [Compatibility](/docs/compatibility).

### toFetchHandler(app)

A function, not a method. It wraps the app as a fetch handler you can export directly:

```ts
import { Burger, toFetchHandler } from "burger-api";

const app = new Burger({ apiRoutes });

// Cloudflare Workers / Vercel
export default { fetch: toFetchHandler(app) };

// Deno
Deno.serve(toFetchHandler(app));
```

These runtimes have no filesystem, so pass the `apiRoutes` from `burger-api build`. See [Deployment](/docs/deployment/bun).

### createNodeWsBridge(options)

Low-level WebSocket support for Node. You rarely need it. Use `serve(app)` from [`@burger-api/node-server`](/docs/deployment/node) instead: it starts HTTP and WebSocket for you.

```ts
import { serve } from "@burger-api/node-server";
import { Burger } from "burger-api";

const app = new Burger({ apiRoutes, wsRoutes });

serve(app, { port: 3000 });
```

See [WebSocket](/docs/websocket/overview#nodejs).

### getServer()

Returns the server object. Useful in tests to stop the server:

```ts
const server = app.getServer();
if (server?.isRunning()) server.stop();
```

## Related

- [Server Options](/docs/core/server-options)
- [Configuration](/docs/core/configuration)
- [Providers](/docs/core-concepts/providers)
