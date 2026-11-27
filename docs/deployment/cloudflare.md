---
sidebar_position: 3
---

# Deploy on Cloudflare Workers

Your BurgerAPI app runs on Cloudflare Workers without code changes. The CLI builds it, and Cloudflare's `wrangler` tool runs and deploys it.

## Build and deploy

```bash
burger-api build --target=cloudflare
npx wrangler dev        # run it locally
npx wrangler deploy     # deploy it
```

The build writes `.build/cloudflare/index.ts`. If you do not have a `wrangler.toml` yet, it also creates one:

```toml title="wrangler.toml"
name = "my-api"
main = ".build/cloudflare/index.ts"
compatibility_date = "2025-06-01"
compatibility_flags = ["nodejs_compat"]
```

Run the build again after you change your code.

## What works on Workers

API routes, hooks, plugins, validation, OpenAPI and WebSocket routes all work. Pages from `src/pages/` and WebSocket pub/sub (`ws.publish()`, `ctx.publish()`) are Bun-only. Code that uses `Bun.*` does not run on Workers; the build warns you about it. See [Compatibility](/docs/compatibility).

## Without the CLI

If you define routes in code instead of files, export a fetch handler yourself:

```ts title="src/index.ts"
import { Burger, toFetchHandler } from "burger-api";

const burger = new Burger({
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: () => Response.json({ message: "Hello from Cloudflare Workers!" }),
      },
    },
  ],
});

export default { fetch: toFetchHandler(burger) };
```

Then set `main = "src/index.ts"` in `wrangler.toml`.

## Related

- [Build Command](/docs/cli/build)
- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Node.js](/docs/deployment/node)
