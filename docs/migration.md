---
id: migration
title: Migrating from 0.9.x
sidebar_label: Migrating from 0.9.x
---

# Migrating from 0.9.x

This guide is for apps running `burger-api` `0.9.x` and `@burger-api/cli` `0.9.x`. The `0.9.x` line stays on npm (`burger-api@0.9.7`, `@burger-api/cli@0.9.9`), so the move is not urgent, but it is a rewrite rather than a patch. Three things changed at the core:

- Middleware became **hooks**: six named lifecycle points instead of a middleware chain.
- `BurgerRequest` became **`BurgerContext`**: one typed context for every hook and handler.
- Configuration moved into convention files: `src/hooks.ts`, `src/plugins.ts`, `burger.build.ts`.

Plan for an afternoon for a small API, longer if you have custom auth or global middleware. The [hook system](/docs/hooks/system), [validation](/docs/validation/zod), and [configuration](/docs/core/configuration) pages explain the new model in full; this page is about getting your old code across.

## Upgrade the packages

```bash
bun add burger-api@latest
bun add -g @burger-api/cli@latest
```

Deploying to plain Node.js? Add the official adapter as well:

```bash
bun add @burger-api/node-server
```

## Checklist

| 0.9.x | 1.0.0-beta | What to do |
|-------|------------|------------|
| `BurgerRequest` | `BurgerContext` | Rename the import and the parameter. Handlers are `export async function GET(ctx: BurgerContext)`. See [Request Context](/docs/core/request-handling). |
| `Middleware` type and the middleware chain | Hooks (`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`) | Decide what each middleware was doing: stop, decorate, or transform. Map it to the matching hook. See [Hook System](/docs/hooks/system). |
| Route `export const middleware` in `route.ts` | Route `hooks.ts` | Move the code to a `hooks.ts` next to `route.ts`. `beforeRoute` replaces a middleware that short-circuits; `afterRoute` / `mapResponse` replace one that returns a response transform. |
| `globalMiddleware` in `new Burger({...})` | `src/hooks.ts` | Export global hooks from `src/hooks.ts` (`onRequest` for work before routing, `beforeRoute` for work after validation). |
| CLI `burger-api serve` | `burger-api dev` | Rename the command and any package script that calls it. |
| `burger.config.ts` | `burger.build.ts` | Rename the file. It is build-time only; `dev` and `start` read `new Burger({...})`. `doctor` flags the old name as an error. |
| `use.ts` / `webhook.ts` route files | `config.ts` | These convention files were reserved and never executed in 0.9.x. Route options now live in `config.ts`. |
| Auth factories in `ecosystem/middlewares/` (`jwt`, `apiKey`, ...) | Plugins in `ecosystem/plugins/` (`jwtAuth`, `apiKey`, ...) | Install with `burger-api add jwt-auth` and register in `src/plugins.ts`. See [Ecosystem](/docs/ecosystem/introduction). |
| Group/folder files shared across routes | Self-contained route directories | Groups only strip the URL. Copy shared `schema.ts` / `hooks.ts` code into each route that needs it, or import a shared module. See [File-Based Routing](/docs/routing/file-based-routing). |
| `req.validated?.query` with a manual generic | `ctx.validated.query` via `defineRoute` / `defineHooks` | Per-method `schema.ts` exports plus `defineRoute` infer `ctx.validated` with no generic to write. |
| Validation errors: `400` with `{ errors }` | `422` Problem Details (RFC 9457) | Update clients and tests. `errorFormat: "plain"` in validation config gets the old-style body shape back. See [Validation Errors](/docs/validation/errors). |
| Body schema skipped non-JSON bodies | Body schema rejects non-JSON with `415` | Send `application/json` (or `application/*+json`), or drop the body schema for form endpoints. |
| `req.validated` optionally populated | `ctx.validated` always an object after validation | The slots you declared are typed non-optional; other slots are `unknown`. |
| `req.params` and `req.wildcardParams` optional | `ctx.params` object, `ctx.wildcardParams` array, both always present | Remove null checks; `{}` / `[]` are the empty values. |
| Mutable `ctx.services` per request | One frozen, shared `ctx.services` | Assigning keys now throws. Put per-request values in a `transform` hook instead. |
| `ctx.set` plain object | Tracked `ctx.set` | Keep using `ctx.set` for status and headers; it now tracks changes so untouched responses are returned as-is. |
| OpenAPI metadata `openapi` export in `route.ts`, title in `new Burger({...})` | `openapi.ts` per-method exports, document metadata in `src/openapi.config.ts` | Move metadata into its own file; `new Burger({ title })` still works as a fallback. See [OpenAPI](/docs/api/openapi). |
| A handler could return a non-`Response` | Non-`Response` returns fail loud with a 500 | Always return `Response.json(...)` or `new Response(...)`. |

## Step by step

### 1. A route handler

Before (`0.9.x`):

```ts title="api/products/route.ts"
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
    const query = new URL(req.url).searchParams;
    return Response.json({ search: query.get("search") });
}
```

After (`1.0.0-beta`):

```ts title="src/api/products/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
    return Response.json({ search: ctx.query.search });
}
```

`ctx.query` is parsed lazily from the request, so you no longer build a `URL` by hand. See [Request Context](/docs/core/request-handling) for every property.

### 2. Route middleware becomes route hooks

Before (`0.9.x`), middleware in `route.ts` did three different jobs in one shape:

```ts title="api/products/route.ts"
import type { BurgerRequest, Middleware } from "burger-api";

export const middleware: Middleware[] = [
    (req: BurgerRequest) => {
        if (req.headers.get("x-admin") !== "true") {
            return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        return async (response) => {
            response.headers.set("x-products", "1");
            return response;
        };
    },
];

export async function GET(req: BurgerRequest) {
    return Response.json({ items: [] });
}
```

After (`1.0.0-beta`), the stop and the transform are separate hook points in `hooks.ts`:

```ts title="src/api/products/hooks.ts"
import type { RouteHooks } from "burger-api";

export const beforeRoute: RouteHooks["beforeRoute"] = (ctx) => {
    if (ctx.headers.get("x-admin") !== "true") {
        return Response.json({ error: "Forbidden" }, { status: 403 });
    }
};

export const afterRoute: RouteHooks["afterRoute"] = () => (response) => {
    response.headers.set("x-products", "1");
    return response;
};
```

Mapping rules:

- A middleware that returned a `Response` becomes a `beforeRoute` hook that returns a `Response`.
- A middleware that returned a function `(response) => response` becomes `afterRoute` or `mapResponse` returning that function. `mapResponse` is the last chance to change headers.
- A middleware that returned `undefined` becomes a hook that returns `undefined`.

`onRequest` is app-level only. You cannot scope it to one route, and declaring it in a route's `hooks.ts` is a compile error. See [Route Hooks](/docs/hooks/route-specific).

### 3. Global middleware becomes `src/hooks.ts`

Before (`0.9.x`):

```ts title="index.ts"
import { Burger } from "burger-api";
import { logger } from "./middleware/logger";

const burger = new Burger({
    apiDir: "./api",
    globalMiddleware: [logger],
});

burger.serve(4000);
```

After (`1.0.0-beta`), the entry stays small and the hooks live in a convention file:

```ts title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
    apiDir: "./src/api",
});

burger.serve(4000);
```

```ts title="src/hooks.ts"
import { logger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [logger()];
```

The same applies to CORS and rate limiting: install the hook from the ecosystem with `burger-api add cors` and compose it in `src/hooks.ts`. See [Global Hooks](/docs/hooks/global) and [Ecosystem](/docs/ecosystem/introduction).

### 4. Validation schema

Before (`0.9.x`), schema and handler were coupled in one file with lowercase method keys:

```ts title="api/products/route.ts"
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
    get: {
        query: z.object({ search: z.string() }),
    },
    post: {
        body: z.object({ name: z.string() }),
    },
};

export async function GET(
    req: BurgerRequest<{ query: z.infer<typeof schema.get.query> }>
) {
    return Response.json({ search: req.validated?.query });
}

export async function POST(
    req: BurgerRequest<{ body: z.infer<typeof schema.post.body> }>
) {
    return Response.json({ name: req.validated?.body?.name });
}
```

After (`1.0.0-beta`), the schema is its own file with uppercase per-method exports, and `defineRoute` infers the types:

```ts title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ search: z.string() }) };
export const POST = { body: z.object({ name: z.string() }) };
```

```ts title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema, POST as PostSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    const { search } = ctx.validated.query;
    return Response.json({ search });
});

export const POST = defineRoute(PostSchema, (ctx) => {
    const { name } = ctx.validated.body;
    return Response.json({ name });
});
```

Two behavior changes to watch for:

- A failed validation is now a `422` Problem Details response, not a `400` with `{ errors }`. See [Validation Errors](/docs/validation/errors).
- When a body schema is declared, a non-JSON body (`text/plain`, form data) is rejected with `415 Unsupported Media Type` instead of skipping validation.

The old manual generic (`BurgerContext<typeof RouteSchema>`) still works when you prefer it. See [Schema Definition](/docs/validation/schema).

### 5. Auth middleware becomes a plugin

Before (`0.9.x`), auth was middleware added to `globalMiddleware`:

```ts title="index.ts"
import { Burger } from "burger-api";
import { jwt } from "./ecosystem/middleware/jwt-auth/jwt-auth";

const burger = new Burger({
    apiDir: "./api",
    globalMiddleware: [jwt({ secret: process.env.JWT_SECRET! })],
});

burger.serve(4000);
```

After (`1.0.0-beta`), auth is a plugin registered in `src/plugins.ts`, and routes opt in or out in `config.ts`:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { jwtAuth } from "../ecosystem/plugins/jwt-auth/jwt-auth";

export default (burger: PluginRegistrar) => {
    burger.usePlugin(jwtAuth({ secret: process.env.JWT_SECRET }));
};
```

```ts title="src/api/public/health/config.ts"
export default { auth: false };
```

```ts title="src/api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

The plugin attaches the decoded token as `ctx.user`. API keys work the same way with `apiKey({ keys: [...] })`. See [JWT Auth](/docs/ecosystem/jwt-auth) and [API Key Auth](/docs/ecosystem/api-key-auth).

### 6. Build config

Before (`0.9.x`):

```ts title="burger.config.ts"
export default {
    apiDir: "./api",
    pageDir: "./pages",
    apiPrefix: "/api",
    pagePrefix: "/",
    debug: false,
};
```

After (`1.0.0-beta`):

```ts title="burger.build.ts"
import type { BuildConfig } from "burger-api";

export default {
    apiDir: "./src/api",
    pageDir: "./src/pages",
    apiPrefix: "/api",
    pagePrefix: "/",
    debug: false,
} satisfies Partial<BuildConfig>;
```

`burger.build.ts` is read by `burger-api build`, `inspect`, and `doctor` only. Runtime options live in `new Burger({...})`, and `doctor` warns when the two disagree. See [Configuration](/docs/core/configuration).

### 7. CLI commands in package.json

Before (`0.9.x`), scripts called Bun directly:

```json title="package.json"
{
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "start": "bun src/index.ts",
    "build": "bun build src/index.ts --outdir ./dist"
  }
}
```

After (`1.0.0-beta`), scripts call the CLI, which the project should carry as a dependency:

```json title="package.json"
{
  "scripts": {
    "dev": "burger-api dev",
    "start": "burger-api start",
    "build": "burger-api build src/index.ts",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@burger-api/cli": "^1.0.0-beta"
  }
}
```

Add `--target=<platform>` when you build for something other than Bun: `burger-api build src/index.ts --target=node`. See [CLI Tool](/docs/getting-started/cli) and [Build Command](/docs/cli/build).

### 8. OpenAPI metadata

Before (`0.9.x`), metadata was an `openapi` export in `route.ts` and a title in the constructor:

```ts title="api/products/route.ts"
export const openapi = {
    get: {
        summary: "List products",
        tags: ["Products"],
    },
};
```

```ts title="index.ts"
const burger = new Burger({
    apiDir: "./api",
    title: "My API",
    description: "Products and orders",
});
```

After (`1.0.0-beta`), route metadata moves to `openapi.ts` with per-method exports, and document metadata moves to `src/openapi.config.ts`:

```ts title="src/api/products/openapi.ts"
export const GET = {
    summary: "List products",
    tags: ["Products"],
};
```

```ts title="src/openapi.config.ts"
import type { OpenAPIConfig } from "burger-api";

export default {
    title: "My API",
    description: "Products and orders",
    version: "1.0.0",
} satisfies OpenAPIConfig;
```

The spec is served at `/openapi.json` and the docs UI at `/docs`, as before. Swagger UI is still the default; `scalarDocs()` and `redocDocs()` are also built in. See [OpenAPI](/docs/api/openapi).

## Verify the upgrade

Run these from the project root:

```bash
burger-api doctor
burger-api inspect
bun run dev
bun run typecheck
bun test
```

- `doctor` checks the project shape and fails on leftover `burger.config.ts`. See [Doctor](/docs/cli/doctor).
- `inspect` lists the config, routes, hooks, and plugins the CLI actually discovers, which catches files the scanner is not loading. See [Inspect](/docs/cli/inspect).
- `bun run dev` starts the server with hot reload. Open `/docs` to confirm the spec still generates.

## Getting help

If something here does not work, or the migration guide is missing a case, [open an issue](https://github.com/isfhan/burger-api/issues). The `0.9.7` release stays on npm while you work through the upgrade.

## Related

- [Hook System](/docs/hooks/system)
- [Request Context](/docs/core/request-handling)
- [Validation](/docs/validation/zod)
- [Configuration](/docs/core/configuration)
- [CLI Tool](/docs/getting-started/cli)
