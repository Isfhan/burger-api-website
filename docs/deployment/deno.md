---
sidebar_position: 5
---

# Deploy on Deno

Deploy BurgerAPI to Deno Deploy (or any Deno server) through the
web-standard adapter. The same WinterCG entry works on Deno, Cloudflare
Workers, and Vercel; only the entry file and platform config differ.

## How it works

- `deno.json` maps `burger-api` to the npm package (`npm:burger-api`).
- `src/index.ts` exports the `deno serve` shape:
  `export default { fetch: toFetchHandler(burger) }`.
- Routes are declared via `apiRoutes` (AOT). Deno Deploy has no filesystem,
  so there is no runtime route scanning.
- The module graph contains no `bun` imports.

## Quick start: `burger-api build --target=deno`

If you're using file-based routing, the CLI generates the entry file and
`deno.json` below for you:

```bash
burger-api build src/index.ts --target=deno
deno serve --port 8000 .build/deno/index.ts
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
  title: "My API on Deno",
  description: "Deploy the same code to any WinterCG runtime",
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: (ctx: BurgerContext) =>
          Response.json({ message: "Hello from Deno!" }),
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

export default { fetch: toFetchHandler(burger) } satisfies {
  fetch(request: Request): Response | Promise<Response>;
};
```

## deno.json

```json
{
  "imports": {
    "burger-api": "npm:burger-api"
  }
}
```

## Run locally

```bash
deno serve --port 8000 src/index.ts
```

## Deploy

Push the project to Deno Deploy and point it at `src/index.ts` (Deno Deploy
uses `deno serve` under the hood).

## Related

- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Node.js](/docs/deployment/node)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Vercel](/docs/deployment/vercel)
