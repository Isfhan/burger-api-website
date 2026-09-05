---
sidebar_label: WebSocket Overview
---

# WebSocket

BurgerAPI supports WebSocket routes. A route has three parts: the connection, the messages, and the close. The handlers for these live in one file.

## Two ways to define a route

**1. File-based (dev, auto-discovered)**

Create a folder under your `wsDir` (default `src/websocket/`). The folder name becomes the URL. Inside, add `ws.ts`:

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

- `hooks.ts` — `onOpen`, `onMessage`, `onClose` lifecycle hooks
- `config.ts` — route options (`maxPayloadLength`, `idleTimeout`, `auth`)

**2. Programmatic (production builds)**

```ts
import { Burger } from "burger-api";

const app = new Burger({
    wsRoutes: [
        {
            path: "/chat",
            handlers: {
                open(ws) {
                    ws.send("connected");
                },
                message(ws, message) {
                    ws.send(message);
                },
            },
        },
    ],
});

app.serve(4000);
```

## Types for this feature

TypeScript checks your WebSocket handlers before they run.

The types you use (all from `burger-api`):

- `BurgerWS` — the WebSocket object: `send`, `sendText`, `sendBinary`, `data`, `services`, `user`, `subscribe`/`unsubscribe`/`publish` (pub/sub — see below), `close`, `terminate`, `cork`, `remoteAddress`, `readyState`, `raw`
- `WebSocketData` — the data on `ws.data`. You extend it (see below).
- `WebSocketHandlers` — the shape of `open`, `message`, `close`, `drain`, `ping`, `pong`
- `WebSocketHooks` — the shape of `onOpen`, `onMessage`, `onClose`
- `WebSocketConfig` — the route options

✅ Correct — annotate handlers with `BurgerWS`:

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.send("hello");
}
```

`send` accepts a `string | Buffer`. If you already know which one you're sending, `sendText(message: string)` and `sendBinary(message: Buffer)` are the same operation with a narrower, self-documenting signature — both are real `BurgerWS` methods:

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.sendText("hello"); // ✅ compiles — same as ws.send("hello")
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

❌ Wrong — a field you did not declare fails:

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

Dynamic segments (`/room/[id]`) appear in `ws.data` at runtime. There is no schema for them yet, so read them through a cast:

```ts
export function message(ws: BurgerWS, message: string | Buffer) {
    const roomId = (ws.data as Record<string, unknown>).roomId as
        | string
        | undefined;
}
```

## Pub/sub

Every `BurgerWS` connection can subscribe to named topics and publish messages to every other connection subscribed to a topic — this is Bun's native pub/sub, exposed directly on `BurgerWS`, with no separate broker to run.

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

- `subscribe(topic: string): void` — join a topic.
- `unsubscribe(topic: string): void` — leave a topic.
- `isSubscribed(topic: string): boolean` — check membership.
- `publish(topic: string, message: string | Buffer): void` — broadcast to the topic's other subscribers.
- `publishText(topic: string, message: string): void` — same as `publish`, narrowed to text.
- `publishBinary(topic: string, message: Buffer): void` — same as `publish`, narrowed to binary.

A connection is automatically unsubscribed from every topic when it closes — you don't need to call `unsubscribe` yourself in `close`, though doing so is harmless.

## Node.js

BurgerAPI's WebSocket routes are built on Bun's native `ServerWebSocket`. Plain
Node has no equivalent built in, so running the same routes on Node needs two
extra pieces: a framing library (e.g. the `ws` package) plus
`app.createNodeWsBridge()`, which bridges `node:http`'s `'upgrade'` event into
the framework's WebSocket pipeline — and a request/response bridge for the
plain HTTP path, since `toFetchHandler` expects a Fetch API `Request`, not a
raw `IncomingMessage` (write your own, matching your body/streaming needs, or
reuse an existing WinterCG-to-Node adapter):

```ts
import http from "node:http";
import { WebSocketServer } from "ws";
import { Burger, toFetchHandler } from "burger-api";
import { toWebRequest, sendWebResponse } from "./node-bridge"; // your own bridge

const app = new Burger({ apiRoutes, wsRoutes }); // AOT routes — see Deployment

// fetchHandler() lazily processes routes (including WS ones) the first time
// it runs — call/await it before createNodeWsBridge(), not just for HTTP.
const fetchHandler = await app.fetchHandler();
const bridge = app.createNodeWsBridge({ WebSocketServer });

http
  .createServer(async (req, res) => {
    const response = await fetchHandler(toWebRequest(req));
    await sendWebResponse(res, response);
  })
  .on("upgrade", (req, socket, head) => bridge.handleUpgrade(req, socket, head))
  .listen(3000);
```

`createNodeWsBridge()` throws if no WebSocket routes are configured
(`wsDir`, `wsRoutes`, or `app.websocket()`), or if called before
`fetchHandler()`/`serve()` has run at least once. This is Node-specific — it
needs raw socket access to `node:http`'s `'upgrade'` event, which true edge
runtimes (Cloudflare Workers, Vercel, Deno Deploy) don't expose. See
[Compatibility](/docs/compatibility) for the full runtime matrix.

## Check your code

```bash
bun run typecheck
```

## Related

- [TypeScript Types](/docs/advanced/type-safety)
- [Routing](/docs/routing/file-based-routing)
