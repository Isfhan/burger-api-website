---
sidebar_position: 4
---

# Deploy on Vercel

Your BurgerAPI app runs as a Vercel Function without code changes. The CLI builds it, and the `vercel` tool runs and deploys it.

## Build and deploy

```bash
burger-api build --target=vercel
npx vercel dev       # run it locally
npx vercel --prod    # deploy it
```

The build writes `api/index.ts`, the place Vercel looks for functions. If you do not have a `vercel.json` yet, it also creates one that sends every request to your app:

```json title="vercel.json"
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```

Run the build again after you change your code.

## What works on Vercel

API routes, hooks, plugins, validation and OpenAPI work. WebSocket routes do not: Vercel Functions cannot keep a connection open, so the build fails if your app has any. Pages from `src/pages/` and code that uses `Bun.*` are Bun-only. See [Compatibility](/docs/compatibility).

## Without the CLI

If you define routes in code instead of files, write `api/index.ts` yourself:

```ts title="api/index.ts"
import { Burger, toFetchHandler } from "burger-api";

const burger = new Burger({
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: () => Response.json({ message: "Hello from Vercel!" }),
      },
    },
  ],
});

export const runtime = "nodejs";

export default { fetch: toFetchHandler(burger) };
```

Add the `vercel.json` above so every path reaches it.

## Related

- [Build Command](/docs/cli/build)
- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
