---
sidebar_position: 5
---

# Deploy on Deno

:::warning Deno is in maintenance mode
In October 2026 the Deno team [joined Cloudflare](https://deno.com/blog/cloudflare).
The Deno runtime gets bug-fix and security releases for about one year, and
Deno Deploy shuts down about six months after the announcement. BurgerAPI keeps
the Deno target working, but for new hosted projects we recommend
[Cloudflare Workers](/docs/deployment/cloudflare): the same entry file works there.
:::

Run BurgerAPI on any Deno server through the web-standard adapter. The same WinterCG entry works on Deno, Cloudflare
Workers, and Vercel; only the entry file and platform config differ.

## How it works

- `deno.json` maps `burger-api` and its subpaths to the npm package, pinned to
  the project's range (`npm:burger-api@^1.0.0-beta`), and enables
  `sloppy-imports` so extensionless relative imports resolve.
- `src/index.ts` exports the `deno serve` shape:
  `export default { fetch: toFetchHandler(burger) }`.
- Routes are declared via `apiRoutes` (AOT), so there is no runtime route
  scanning.
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
        GET: (ctx: BurgerContext) => Response.json({ id: ctx.params.id }),
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
  "unstable": ["sloppy-imports"],
  "imports": {
    "burger-api": "npm:burger-api@^1.0.0-beta",
    "burger-api/": "npm:burger-api@^1.0.0-beta/"
  }
}
```

A local-mode project (`--local` links) gets `"nodeModulesDir": "manual"`
instead of the `imports` map.

## Run locally

```bash
deno serve --port 8000 src/index.ts
```

## Deploy

Run `deno serve` on your own server or container with the generated
`.build/deno/index.ts` entry (or your own `src/index.ts` if you wrote the
entry by hand). To move a Deno Deploy project, deploy the same entry to
[Cloudflare Workers](/docs/deployment/cloudflare) instead.

## Related

- [Deploy on Bun](/docs/deployment/bun)
- [Deploy on Node.js](/docs/deployment/node)
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Vercel](/docs/deployment/vercel)
