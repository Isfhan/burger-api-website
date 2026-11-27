---
sidebar_label: WebSocket Overview
---

# WebSocket

WebSocket routes keep a connection open so the server and client can send messages both ways. Use them for chat, live updates, and notifications.

## Create a route

Add a folder under `src/websocket/`. The folder path becomes the URL. Put a `ws.ts` file inside with three handlers: `open`, `message`, and `close`.

```ts
// src/websocket/chat/ws.ts  →  ws://localhost:4000/chat
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

The dev server finds the route on its own. No registration is needed.

Next to `ws.ts` you can add:

- `hooks.ts`: `onOpen`, `onMessage`, `onClose` hooks for this route.
- `config.ts`: route options. If you use an auth plugin, set `auth: false` to make the route public.

Folder names work like API routes: `[roomId]` is a parameter and `[...]` is a wildcard.

## Register a route in code

You can also add a route with `burger.websocket()`. Set connection options for the whole server with `burger.wsConfig()`:

```ts
burger.websocket("/chat", {
    open(ws) {
        ws.send("connected");
    },
    message(ws, message) {
        ws.send(message);
    },
});

burger.wsConfig({
    maxPayloadLength: 1024 * 1024, // 1 MB
    idleTimeout: 30, // seconds
});
```

## What is on `ws`

Each handler gets a `BurgerWS` object:

- `ws.send(message)`: send a string or a `Buffer`.
- `ws.close(code?, reason?)`: close the connection.
- `ws.params`: route parameters, for example `ws.params.roomId`.
- `ws.wildcardParams`: wildcard segments.
- `ws.query` and `ws.url`: the query string and URL the client connected with.
- `ws.data`: your own data for this connection.
- `ws.services`: services from `src/providers.ts`, the same as `ctx.services`.
- `ws.user`: the user set by an auth plugin.

Messages for one connection arrive in order. The first `message` runs only after `open` finishes, so an `async open` is safe.

## Reject a connection

Check the query in `open`. Close with code `1008` when it is not valid:

```ts
export function open(ws: BurgerWS) {
    const roomId = ws.query.get("roomId");
    if (!roomId) {
        ws.close(1008, "Missing roomId");
        return;
    }
    ws.data.roomId = roomId;
}
```

## Type `ws.data`

`ws.data` starts empty. Declare your fields once, usually in `src/types.ts`:

```ts
declare module "burger-api" {
    interface WebSocketData {
        roomId?: string;
    }
}
```

TypeScript now checks every read and write of `ws.data`. Services and `ws.user` use the same pattern with `BurgerServices` and `BurgerAuthUser`. See [Type Safety](/docs/advanced/type-safety).

## Pub/sub

A connection can join a topic and send a message to everyone else in that topic:

```ts
export function open(ws: BurgerWS) {
    ws.subscribe("room:general");
}

export function message(ws: BurgerWS, message: string | Buffer) {
    ws.publish("room:general", message); // the sender does not get it
}
```

A connection leaves all its topics when it closes.

To send to a topic from an HTTP route, use `ctx.publish`. It reaches every subscriber:

```ts
// src/api/announce/route.ts
import type { BurgerContext } from "burger-api";

export async function POST(ctx: BurgerContext) {
    ctx.publish("room:general", "server announcement");
    return Response.json({ ok: true });
}
```

:::warning Bun only
`ws.subscribe`, `ws.publish`, and `ctx.publish` work only on Bun. They throw on Node.js, Cloudflare Workers, and Deno. On those runtimes, keep your own set of connections and loop over it:

```ts
const clients = new Set<BurgerWS>();

export function open(ws: BurgerWS) {
    clients.add(ws);
}

export function message(ws: BurgerWS, message: string | Buffer) {
    for (const client of clients) {
        if (client !== ws) client.send(message);
    }
}

export function close(ws: BurgerWS) {
    clients.delete(ws);
}
```
:::

## Runtime support

| Runtime | WebSocket |
|---|---|
| Bun | Yes |
| Node.js | Yes, with `@burger-api/node-server` |
| Cloudflare Workers | Yes |
| Deno | Yes |
| Vercel | No |

Your `ws.ts` files work the same on every supported runtime. Only pub/sub is Bun-only.

### Node.js

Install `@burger-api/node-server` and build with `burger-api build --target=node`. WebSocket routes work with no extra setup. See [Deploy on Node.js](/docs/deployment/node).

### Vercel

Vercel does not support WebSocket. `burger-api build --target=vercel` fails if your project has WebSocket routes. Host the WebSocket routes on another target and call that service from your Vercel app.

## Related

- [Type Safety](/docs/advanced/type-safety)
- [Routing](/docs/routing/file-based-routing)
- [Compatibility](/docs/compatibility)
- [Build Command](/docs/cli/build)
- [Deploy on Node.js](/docs/deployment/node)
