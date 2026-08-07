---
sidebar_position: 1
---

# Deploy on Bun

Bun is BurgerAPI's primary runtime. A Bun deployment uses the Bun adapter
directly: `burger.serve(port)` runs a long-lived HTTP server with the full
feature set (native static route map, WebSockets, pages).

## How it works

- `src/index.ts` creates the `Burger` app and calls `burger.serve(port)`.
- `burger-api build` compiles routes ahead of time (AOT) into the production
  bundle.
- `burger-api start` runs the production build on your server.

## Entry file

```ts
// src/index.ts
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
});

burger.serve(3000);
```

The generated `package.json` maps the CLI commands to Bun scripts:

```json
{
  "scripts": {
    "dev": "burger-api dev",
    "build": "burger-api build",
    "start": "burger-api start"
  }
}
```

## Local development

```bash
bun run dev
```

## Production build

```bash
bun run build   # AOT route scan + production bundle
bun run start   # serve the production build
```

## VPS or Docker

Build and run the production bundle, then expose the port:

```dockerfile
FROM oven/bun
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
```

## Related

- [Quick Start](/docs/quick-start)
- [Build Command](/docs/cli/build)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Vercel](/docs/deployment/vercel)
- [Deploy on Deno](/docs/deployment/deno)
