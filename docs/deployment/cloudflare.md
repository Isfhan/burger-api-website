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

- If you compile your routes with `burger-api build`, deploy the AOT bundle
  and point `main` at it. Either way, never rely on filesystem scanning at
  runtime: Workers has no filesystem.
- Pages and WebSockets are Bun-only in 1.0 and are not available on Workers.

## Related

- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Node.js](/docs/deployment/node)
- [Deploy on Vercel](/docs/deployment/vercel)
- [Deploy on Deno](/docs/deployment/deno)
