---
sidebar_position: 3
---

# Deploy on Vercel

Deploy BurgerAPI to Vercel as a web-standard Function. The same WinterCG
entry works on Vercel, Cloudflare Workers, and Deno; only the entry file and
platform config differ.

## How it works

- `api/index.ts` exports the Vercel web-standard shape:
  `export default { fetch: toFetchHandler(burger) }` on the Node.js runtime
  (`export const runtime = "nodejs"`).
- `vercel.json` rewrites every path to `/api`, so `toFetchHandler` does the
  routing: dynamic params, 404s, and method handling all work as they do on
  Bun.
- Routes are declared via `apiRoutes` (AOT). Vercel Functions have no
  filesystem, so there is no runtime route scanning.
- The module graph contains no `bun` imports.

## Entry file

```ts
// api/index.ts
import { Burger } from "burger-api";
import { toFetchHandler } from "burger-api/adapter/web-standard";
import type { BurgerContext } from "burger-api";

const burger = new Burger({
  title: "My API on Vercel",
  description: "Deploy the same code to any WinterCG runtime",
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: (ctx: BurgerContext) =>
          Response.json({ message: "Hello from Vercel!" }),
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

export const runtime = "nodejs";

export default { fetch: toFetchHandler(burger) };
```

## vercel.json

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ]
}
```

## Run locally

```bash
npx vercel dev
```

## Deploy

```bash
npx vercel --prod
```

## Related

- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Deno](/docs/deployment/deno)
