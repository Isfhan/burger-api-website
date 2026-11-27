---
sidebar_position: 5
---

# Deploy on Deno

:::warning Deno is in maintenance mode
In October 2026 the Deno team [joined Cloudflare](https://deno.com/blog/cloudflare).
The Deno runtime gets bug-fix and security releases for about one year, and
Deno Deploy shuts down about six months after the announcement. BurgerAPI keeps
the Deno target working, but for new hosted projects we recommend
[Cloudflare Workers](/docs/deployment/cloudflare).
:::

Your BurgerAPI app runs on Deno without code changes. The CLI builds it, and `deno serve` runs it.

## Build and run

```bash
burger-api build --target=deno
deno serve --port 8000 .build/deno/index.ts
```

The build writes `.build/deno/index.ts`. If you do not have a `deno.json` yet, it also creates one that tells Deno where to find `burger-api`. Run `deno serve` on your own server or in a container.

Run the build again after you change your code.

## What works on Deno

API routes, hooks, plugins, validation, OpenAPI and WebSocket routes work. Pages from `src/pages/`, WebSocket pub/sub and code that uses `Bun.*` are Bun-only. See [Compatibility](/docs/compatibility).

## Without the CLI

If you define routes in code instead of files, export a fetch handler yourself:

```ts title="src/index.ts"
import { Burger, toFetchHandler } from "burger-api";

const burger = new Burger({
  apiRoutes: [
    {
      path: "/api/hello",
      handlers: {
        GET: () => Response.json({ message: "Hello from Deno!" }),
      },
    },
  ],
});

export default { fetch: toFetchHandler(burger) };
```

```json title="deno.json"
{
  "imports": {
    "burger-api": "npm:burger-api@^1.0.0-beta",
    "burger-api/": "npm:burger-api@^1.0.0-beta/"
  }
}
```

```bash
deno serve --port 8000 src/index.ts
```

## Related

- [Build Command](/docs/cli/build)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Bun](/docs/deployment/bun)
