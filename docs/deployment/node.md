---
sidebar_position: 2
---

# Deploy on Node.js

BurgerAPI runs on Node.js 24 and newer with the `@burger-api/node-server` package.

## Build and run

```bash
bun add @burger-api/node-server
burger-api build --target=node
node .build/bundle/app.js
```

The build contains your routes, so the server does not need your `src/` folder. Copy `.build/bundle/` to your server and run it with Node. The port comes from `$PORT` (default `4000`).

WebSocket routes work too. `ws.subscribe()`, `ws.publish()` and `ctx.publish()` are Bun-only: on Node, keep your own list of connections. See [Compatibility](/docs/compatibility).

## Without the CLI

If you define routes in code instead of files, start the server yourself with `serve()`:

```ts title="src/index.ts"
import { Burger } from "burger-api";

export const burger = new Burger({
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: () => Response.json({ message: "Hello from Node.js!" }),
      },
    },
  ],
});
```

```ts title="src/server.ts"
import { serve } from "@burger-api/node-server";
import { burger } from "./index.ts";

const server = serve(burger, { port: 3000 });
server.on("listening", () => {
  console.log("Server running on http://localhost:3000");
});
```

```bash
node src/server.ts
```

Node runs TypeScript files directly. Write the `.ts` extension in relative imports (`./index.ts`), as above.

## Related

- [Build Command](/docs/cli/build)
- [WebSocket on Node.js](/docs/websocket/overview#nodejs)
- [Deploy on Bun](/docs/deployment/bun)
