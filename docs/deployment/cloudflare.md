---
sidebar_position: 3
---

# Deploy on Cloudflare Workers

BurgerAPI apps are WinterCG-compatible, so the same code that runs on Bun runs
on Cloudflare Workers through the web-standard adapter. Only the entry file
and `wrangler` config differ from a Bun deployment.

## How it works

- `src/index.ts` exports the Workers shape:
  `export default { fetch: toFetchHandler(burger) }`.
- `toFetchHandler` comes from the web-standard adapter:
  `import { toFetchHandler } from "burger-api/adapter/web-standard"` (it is
  also re-exported from the package root).
- Routes are declared via `apiRoutes`. WinterCG runtimes have no filesystem,
  so there is no runtime route scanning: your routes must be compiled ahead of
  time (AOT) or passed explicitly, as in the example below.
- The module graph contains no `bun` imports, so `wrangler` (esbuild) bundles
  the entry as-is for the Workers runtime.

## Quick start: `burger-api build --target=cloudflare`

If you're using file-based routing, the CLI generates the entry file and
`wrangler.toml` below for you:

```bash
burger-api build src/index.ts --target=cloudflare
wrangler dev      # boots .build/cloudflare/index.ts
wrangler deploy
```

The rest of this page shows the equivalent by hand, useful if you're
declaring routes programmatically instead of via the file convention.

## Entry file

```ts
// src/index.ts
import { Burger } from "burger-api";
import { toFetchHandler } from "burger-api/adapter/web-standard";
import type { BurgerContext } from "burger-api";

const burger = new Burger({
  title: "My API on Cloudflare Workers",
  description: "Deploy the same code to any WinterCG runtime",
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: (ctx: BurgerContext) =>
          Response.json({ message: "Hello from Cloudflare Workers!" }),
      },
      openapi: { get: { summary: "Greeting", tags: ["hello"] } },
    },
    {
      path: "/api/users/:id",
      handlers: {
        GET: (ctx: BurgerContext) => Response.json({ id: ctx.params?.id }),
      },
      openapi: { get: { summary: "Get user by id", tags: ["users"] } },
    },
  ],
});

export default { fetch: toFetchHandler(burger) };
```

## wrangler.toml

```toml
name = "my-api"
main = "src/index.ts"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]
```

## Run locally

```bash
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```

## Notes

- If you compile your routes with `burger-api build --target=cloudflare`,
  deploy the generated bundle and point `main` at it (the CLI does this for
  you when it scaffolds `wrangler.toml`). Either way, never rely on
  filesystem scanning at runtime: Workers has no filesystem.
- WebSocket **does** work on Workers, natively, via `WebSocketPair` (see
  [Compatibility](/docs/compatibility)). Pages (`HTMLBundle`) is Bun-only in
  1.0 and not available on Workers.

## Related

- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Node.js](/docs/deployment/node)
- [Deploy on Vercel](/docs/deployment/vercel)
- [Deploy on Deno](/docs/deployment/deno)
