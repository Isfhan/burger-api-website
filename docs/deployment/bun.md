---
sidebar_position: 1
---

# Deploy on Bun

Bun is BurgerAPI's main runtime (Bun 1.4.4 or newer). Every feature works on Bun, including pages and WebSocket pub/sub.

You build your app with `burger-api build` and run the build with `burger-api start`.

## Entry file

```ts
// src/index.ts
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
});

// Read PORT so the host platform can assign one; fall back to 4000 locally.
const port = Number(process.env.PORT) || 4000;
app.serve(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

The generated `package.json` maps the CLI commands to Bun scripts:

```json
{
  "scripts": {
    "dev": "burger-api dev",
    "start": "burger-api start",
    "build": "burger-api build src/index.ts",
    "typecheck": "bun check"
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

## HTTPS

Most apps get HTTPS from what sits in front of them: a load balancer, a CDN such as Cloudflare, or a proxy such as nginx or Caddy. It handles the certificate and HTTP/2, and your app serves plain HTTP behind it. Your hosting platform usually sets this up for you. For WebSocket routes, the proxy must forward upgrade requests.

To serve HTTPS from the app itself, pass a certificate and key with the `tls` option:

```ts
// src/index.ts
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
  tls: process.env.TLS_CERT
    ? {
        cert: Bun.file(process.env.TLS_CERT),
        key: Bun.file(process.env.TLS_KEY!),
      }
    : undefined,
});

const port = Number(process.env.PORT) || 4000;
app.serve(port);
```

- Set `TLS_CERT` and `TLS_KEY` to the full paths of your PEM files. Use full paths: the production build runs from its own folder, so relative paths do not work.
- Without the variables, the app serves plain HTTP. That keeps local development simple.
- WebSocket routes use `wss://` when `tls` is set.
- `tls` works with `serve()` on Bun. On Node, Cloudflare Workers, Deno and Vercel, the platform handles HTTPS and the option is ignored.

## VPS or Docker

Build and run the production bundle, then expose the port:

```dockerfile
FROM oven/bun
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
EXPOSE 4000
CMD ["bun", "run", "start"]
```

`@burger-api/cli` is a devDependency, so run a plain `bun install` (not a production-only install) before `bun run build` and `bun run start`; both scripts invoke the CLI. Alternatively, skip the CLI at runtime by starting the bundle directly with `CMD ["bun", ".build/bundle/app.js"]`, which works from a production-only install.

## Related

- [Quick Start](/docs/quick-start)
- [Build Command](/docs/cli/build)
- [Deploy on Node.js](/docs/deployment/node)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Vercel](/docs/deployment/vercel)
- [Deploy on Deno](/docs/deployment/deno)
