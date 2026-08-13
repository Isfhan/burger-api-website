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

- `BurgerWS` — the WebSocket object: `send`, `data`, `services`, `close`
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

❌ Wrong — `sendText` does not exist on `BurgerWS`. This does not compile:

```ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
    ws.sendText("hello"); // ❌ Property 'sendText' does not exist
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

## Check your code

```bash
bun run typecheck
```

## Related

- [TypeScript Types](/docs/advanced/type-safety)
- [Routing](/docs/routing/file-based-routing)
