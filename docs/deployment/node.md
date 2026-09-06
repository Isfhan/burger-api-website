---
sidebar_position: 2
---

# Deploy on Node.js

Run BurgerAPI on plain Node.js: a real long-lived `node:http` server, not
just the WinterCG fetch entry other targets use. The official
`@burger-api/node-server` adapter bridges `node:http` to burger-api's
Fetch-standard handler and wires WebSocket routes automatically, so you
don't hand-write an `IncomingMessage`⇄`Request` bridge yourself.

## How it works

- `serve(app, options?)` starts a real `node:http` server and returns it.
- Routes are declared via `apiRoutes` (AOT), the same as every other WinterCG
  target; plain Node has no dev-time filesystem route scanner either.
- If the app has WebSocket routes configured (`wsRoutes`, `wsDir`, or
  `app.websocket()`), `serve()` wires `createNodeWsBridge()` and the `ws`
  package automatically, since Node has no `fetch`-handler upgrade path of its
  own, unlike Bun, Cloudflare Workers, and Deno, which all support
  WebSocket natively (see [Compatibility](/docs/compatibility)). Vercel is
  the one target that genuinely can't do WebSocket at all.
- An app with no WebSocket routes just gets a plain HTTP server. Nothing
  extra happens.

## Install

```bash
npm install @burger-api/node-server
```

## Quick start: `burger-api build --target=node`

If you're using file-based routing (`route.ts`/`schema.ts`/`hooks.ts` under
`apiDir`), the CLI generates the entry shown below for you:

```bash
burger-api build src/index.ts --target=node --outfile=.build/bundle/app.js
node .build/bundle/app.js
```

The generated bundle already imports `serve` from `@burger-api/node-server`
and calls it with your compiled `apiRoutes`/`wsRoutes`. Nothing to hand-write.
The rest of this page shows the equivalent by hand, useful if you're
declaring routes programmatically instead of via the file convention.

## Entry file

```ts
// src/index.ts
import { Burger } from "burger-api";
import type { BurgerContext } from "burger-api";

export const burger = new Burger({
  title: "My API on Node.js",
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: (ctx: BurgerContext) =>
          Response.json({ message: "Hello from Node.js!" }),
      },
      openapi: { get: { summary: "Greeting", tags: ["hello"] } },
    },
  ],
});
```

```ts
// src/server.ts
import { serve } from "@burger-api/node-server";
import { burger } from "./index";

const server = serve(burger, { port: 3000 });
server.on("listening", () => {
  console.log("Server running on http://localhost:3000");
});
```

## WebSocket

Add `wsRoutes` (or `wsDir` / `app.websocket()`) to the same `Burger`
instance: no separate wiring needed:

```ts
const burger = new Burger({
  apiRoutes,
  wsRoutes: [
    {
      path: "/chat",
      handlers: {
        open(ws) {
          ws.sendText("connected");
        },
        message(ws, message) {
          // fan out manually: ws.subscribe()/publish() are Bun-only
          // native pub/sub and throw on every other runtime, Node included
        },
      },
    },
  ],
});
```

`serve(burger)` detects the WebSocket routes and wires the bridge for you.

## Run

```bash
node src/server.ts   # Node 22.6+ can run TypeScript directly
# or build first with your own toolchain (tsc, esbuild, bun build --target node)
```

## Related

- [WebSocket → Node.js](/docs/websocket/overview#nodejs)
- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Vercel](/docs/deployment/vercel)
- [Deploy on Deno](/docs/deployment/deno)
