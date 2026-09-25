---
sidebar_label: WebSocket Overview
---

# WebSocket

BurgerAPI supports WebSocket routes. A route has three parts: the connection, the messages, and the close. The handlers for these live in one file.

## Two ways to define a route

**1. File-based (dev, auto-discovered)**

Create a folder under your `wsDir` (default `src/websocket/`). The folder name becomes the URL. Inside, add `ws.ts`.

In dev, an unset `wsDir` defaults to `./src/websocket` when that directory exists, so WS routes work without configuration. `burger-api build` reads `wsDir` from `burger.build.ts` (same default), and `dev`/`start` read `new Burger({...})` in `src/index.ts`. Keep the two in sync if you customize; the defaults agree out of the box.

```ts
// src/websocket/chat/ws.ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.send("connected");
}

export function message(ws: BurgerWS, message: string | Buffer) {
    ws.send(message); // echo
}

export function close(ws: BurgerWS, code: number, reason: string) {
    // connection closed
}
```

Sibling convention files work the same as API routes:

- `hooks.ts`: `onOpen`, `onMessage`, `onClose` lifecycle hooks
- `config.ts`: route options. Only `auth` is honored per route (`auth: false` still requires a valid handshake if the app-level `wsConfig({ auth })` requires one); transport options such as `maxPayloadLength` and `idleTimeout` are connection-level and are ignored with a warning when set per route. Set them globally with `burger.wsConfig({...})`.

**2. Programmatic (production builds)**

Register routes and connection options directly on the app:

```ts
import { Burger } from "burger-api";

const app = new Burger();

app.websocket("/chat", {
    open(ws) {
        ws.send("connected");
    },
    message(ws, message) {
        ws.send(message);
    },
});

app.wsConfig({
    maxPayloadLength: 1024 * 1024, // 1 MB
    idleTimeout: 30, // seconds
});

app.serve(4000);
```

`wsRoutes` in `new Burger({ wsRoutes: [...] })` is the prebuilt equivalent used by `burger-api build` output. `wsConfig()` applies to the whole server and is only forwarded by the Bun adapter; on other runtimes the platform's own limits apply.

## Types for this feature

TypeScript checks your WebSocket handlers before they run.

The types you use (all from `burger-api`):

- `BurgerWS`, the WebSocket object: `send`, `sendText`, `sendBinary`, `params`, `data`, `services`, `user`, `subscribe`/`unsubscribe`/`publish` (pub/sub, see below), `close`, `terminate`, `cork`, `remoteAddress`, `readyState`, `raw`
- `WebSocketData`: the data on `ws.data`. You extend it (see below).
- `WebSocketHandlers`: the shape of `open`, `message`, `close`, `drain`, `ping`, `pong`
- `WebSocketHooks`: the shape of `onOpen`, `onMessage`, `onClose`
- `WebSocketConfig`: connection-level options for `burger.wsConfig()`

✅ Correct. Annotate handlers with `BurgerWS`:

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.send("hello");
}
```

`send` accepts a `string | Buffer`. If you already know which one you're sending, `sendText(message: string)` and `sendBinary(message: Buffer)` are the same operation with a narrower, self-documenting signature. Both are real `BurgerWS` methods:

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.sendText("hello"); // ✅ compiles, same as ws.send("hello")
}
```

### Typing `ws.data` (augmentation)

`ws.data` holds per-connection data. It starts empty. Add your own fields with the augmentation pattern (see the [TypeScript Types overview](/docs/advanced/type-safety)):

```ts
declare module "burger-api" {
    interface WebSocketData {
        userId?: string;
    }
}
```

Now this is typed:

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.data.userId = "user-123";
}
```

❌ Wrong. A field you did not declare fails:

```ts
export function open(ws: BurgerWS) {
    ws.data.notDeclared = 1; // ❌ Property 'notDeclared' does not exist
}
```

### Typing `ws.services`

Services work exactly like HTTP: a service declared in `src/providers.ts` gives you `ws.services.db`. Add the type in the same augmentation block:

```ts
declare module "burger-api" {
    interface BurgerServices {
        db: Database;
    }
}
```

### Route parameters

Dynamic segments (`/room/[roomId]`) are available URL-decoded on `ws.params`, always a `Record<string, string>` (empty when the route has none):

```ts
export function message(ws: BurgerWS, message: string | Buffer) {
    const { roomId } = ws.params;
    ws.send(`room ${roomId}: ${message}`);
}
```

## Pub/sub

Every `BurgerWS` connection can subscribe to named topics and publish messages to every other connection subscribed to a topic. This is Bun's native pub/sub, exposed directly on `BurgerWS`, with no separate broker to run.

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.subscribe("room:general");
}

export function message(ws: BurgerWS, message: string | Buffer) {
    // Broadcast to every OTHER connection subscribed to the topic.
    // (The sender does not receive its own publish.)
    ws.publish("room:general", message);
}

export function close(ws: BurgerWS) {
    ws.unsubscribe("room:general");
}
```

The full pub/sub surface on `BurgerWS`:

- `subscribe(topic: string): void`: join a topic.
- `unsubscribe(topic: string): void`: leave a topic.
- `isSubscribed(topic: string): boolean`: check membership.
- `publish(topic: string, message: string | Buffer): void`: broadcast to the topic's other subscribers.
- `publishText(topic: string, message: string): void`: same as `publish`, narrowed to text.
- `publishBinary(topic: string, message: Buffer): void`: same as `publish`, narrowed to binary.

A connection is automatically unsubscribed from every topic when it closes. You don't need to call `unsubscribe` yourself in `close`, though doing so is harmless.

**`subscribe`/`publish` are Bun-only**: they wrap Bun's native topic pub/sub directly, and throw on every other runtime (Node, Cloudflare Workers, Deno). The portable equivalent is a plain connection registry, fanning out manually:

```ts
import type { BurgerWS } from "burger-api";

const clients = new Set<BurgerWS>();

export function open(ws: BurgerWS) {
    clients.add(ws);
}

export function message(ws: BurgerWS, message: string | Buffer) {
    for (const client of clients) {
        if (client !== ws) client.send(message); // skip the sender, like publish() does
    }
}

export function close(ws: BurgerWS) {
    clients.delete(ws);
}
```

This is the one part of a WebSocket route that isn't automatically portable across targets. Everything else (`open`/`message`/`close`, `ws.params`, `ws.data`, `ws.services`) works unchanged on Bun, Node, Cloudflare Workers, and Deno.

## Node.js

BurgerAPI's WebSocket routes are built on Bun's native `ServerWebSocket`. Plain
Node has no equivalent built in. The official
[`@burger-api/node-server`](/docs/deployment/node) adapter bridges this for
you:

```ts
import { serve } from "@burger-api/node-server";
import { Burger } from "burger-api";

const app = new Burger({ apiRoutes, wsRoutes }); // AOT routes (see Deployment)

serve(app, { port: 3000 });
```

`serve()` detects whether the app has WebSocket routes configured (`wsDir`,
`wsRoutes`, or `app.websocket()`) and wires `createNodeWsBridge()` + the `ws`
package automatically. An app with none just gets a plain HTTP server, no
extra setup either way.

Under the hood, `serve()` does what `createNodeWsBridge()` itself needs: a
request/response bridge for the plain HTTP path (`toFetchHandler` expects a
Fetch API `Request`, not a raw `node:http` `IncomingMessage`), and calls
`app.fetchHandler()` once up front, which is the lazy route-processing step
`createNodeWsBridge()` requires before it stops throwing "no WebSocket routes
configured." You don't need to know any of that to use it; see
[Deploy on Node.js](/docs/deployment/node) for the full picture, including
what to do if you'd rather wire it by hand.

This bridge is Node-specific: it exists because Node has no `fetch`-handler
upgrade path at all, unlike the runtimes below.

## Cloudflare Workers

WebSocket works natively here, with no bridge and no extra package. Workers expose
`WebSocketPair` directly, and `burger-api build --target=cloudflare` wires it
in automatically: the generated entry's `toFetchHandler(app)` handles the
upgrade the same way it handles any other request.

```bash
burger-api build src/index.ts --target=cloudflare
wrangler dev
```

Nothing route-level changes: the same `src/websocket/chat/ws.ts` file that
runs on Bun runs on Workers unmodified. Pub/sub (`subscribe`/`publish`) is the
one exception: it's Bun's own native primitive and isn't available here. See
the Pub/sub section above for the portable `Set<BurgerWS>` fallback pattern.

## Deno

Same story: `Deno.upgradeWebSocket()` is native, and `burger-api build
--target=deno` wires it in automatically.

```bash
burger-api build src/index.ts --target=deno
deno serve --port 8000 .build/deno/index.ts
```

## Vercel (not supported)

Vercel Functions have no persistent-connection model to upgrade a request
into, since there's no runtime primitive to bridge to, unlike Node (which at least
has `node:http`'s `'upgrade'` event). `burger-api build --target=vercel`
**fails at build time** if the project has any WebSocket routes, rather than
shipping a build that would 501 on every real connection attempt:

```
--target=vercel does not support WebSocket routes, but 1 were found under
./src/websocket. This platform has no persistent-connection model for
WebSocket upgrades. See the compatibility docs for what each runtime
supports.
```

If you need both an HTTP API on Vercel and real-time features, keep the
WebSocket routes on a different target (Bun, Node, Cloudflare, or Deno) and
call that service from your Vercel-hosted app, the same way you'd reach for
any other external realtime provider from a serverless function.

## Runtime summary

| Runtime | WebSocket | How |
|---|---|---|
| Bun | Yes | Native `ServerWebSocket` |
| Node.js | Yes | `@burger-api/node-server`'s bridge (`createNodeWsBridge` + `ws`) |
| Cloudflare Workers | Yes | Native `WebSocketPair` |
| Deno | Yes | Native `Deno.upgradeWebSocket` |
| Vercel | No | No persistent-connection model, so build fails if WS routes exist |

See [Compatibility](/docs/compatibility) for the full feature-by-runtime
matrix, and [`burger-api build --target`](/docs/cli/build) for how each of
these gets built.

## Check your code

```bash
bun run typecheck
```

## Related

- [TypeScript Types](/docs/advanced/type-safety)
- [Routing](/docs/routing/file-based-routing)
- [Compatibility](/docs/compatibility)
- [Build Command](/docs/cli/build)
- [Deploy on Node.js](/docs/deployment/node)
