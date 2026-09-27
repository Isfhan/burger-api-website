---
slug: burger-api-v1.0.0-beta-release
title: BurgerAPI v1.0.0-beta Released
authors: [isfhan]
tags: [release, beta, 1.0, typescript, javascript, wintercg, cli, benchmarks]
---

**`burger-api` and `@burger-api/cli` both ship `1.0.0-beta` today: our biggest release yet, and the first since `0.9.7` / `0.9.9` on npm. `bun add burger-api` and `bun add -g @burger-api/cli` install it by default. It's a full rewrite of the framework, not an incremental update, so please try it and [open an issue](https://github.com/isfhan/burger-api/issues) if anything breaks or feels wrong. Coming from `0.9.x`? The [migration guide](/docs/migration) covers every breaking change; the `0.9.x` line is still on npm (`burger-api@0.9.7`, `@burger-api/cli@0.9.9`).**

{/* truncate */}

## Where we started

0.9.x was a good first chapter. You dropped a `route.ts` into a folder and it became an endpoint. Requests arrived as a `BurgerRequest`. Logic shared across routes went into a middleware array: pass `globalMiddleware` to `new Burger({...})` for app-wide work, or export a `middleware` array from `route.ts` for one route. Zod schemas lived in the same file as the handlers.

It worked. But as apps grew, the middleware shape started to strain.

One type had to do three jobs: stop the request, decorate it, or transform the response later. The "transform later" part returned a function that ran in reverse order, which was easy to get backwards. There was no named slot for "after validation, before the handler", so auth checks and data loading all piled into the same list. Every route carried middleware types even when it just wanted to log a line, and config lived in the same file as the handler.

We also wanted to stop borrowing patterns from previous generations of servers. Bun gives a framework native routing, fast request objects, and real WebSockets. 0.9.x was designed before we knew how far we could lean on that.

## What we wanted

Four goals shaped the rewrite:

- **Simple DX.** A route is a folder of clearly named files. No registration, no ceremony.
- **Fast on Bun.** Use Bun's native router and per-method dispatch instead of routing through a catch-all handler.
- **Runs everywhere.** The same app should build for Bun, Node.js, Cloudflare Workers, Deno, and Vercel.
- **TypeScript and JavaScript as equals.** The same conventions in `.ts`, `.js`, and `.mjs`.

## What 1.0.0-beta brings

### Hooks replace middleware

Six named lifecycle points, each with one job: `onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`. Hooks are not a renamed middleware stack. They are stages, and each stage returns a defined shape: a `Response` to stop, `undefined` to continue, or a mapper function to change the final response.

Global hooks live in `src/hooks.ts`. Route hooks live in a `hooks.ts` next to `route.ts`:

```ts
// src/api/products/hooks.ts
import type { BurgerContext } from "burger-api";

export const beforeRoute = [
    async (ctx: BurgerContext) => {
        if (!ctx.headers.get("authorization")) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
    },
];
```

Plugins are a separate concept: they extend the app, and they may register hooks. See the [hook system](/docs/hooks/system).

### One context: BurgerContext

`BurgerRequest` is gone. Every hook and handler receives `BurgerContext` (`ctx`), with lazy `ctx.query` and `ctx.cookies`, plus `ctx.params`, `ctx.validated`, `ctx.set`, `ctx.services`, and `ctx.ip`. Handlers return a standard Web `Response`.

`defineRoute(schema, handler)` infers `ctx.validated` straight from a route's `schema.ts`, so there is no generic to write by hand. `defineHooks(schema, hooks)` does the same for a route's `hooks.ts`.

```ts
// src/api/products/route.ts
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    const { limit } = ctx.validated.query; // typed from schema.ts
    return Response.json({ limit });
});
```

### Validation and OpenAPI

Validation is Standard Schema, with Zod as the default. Query, params, headers, cookies, and body are all first-class slots, plus optional response validation. Failures return RFC 9457 Problem Details with a `422`.

The OpenAPI spec and the docs UI are generated from the same schemas. `/openapi.json` serves the spec, `/docs` serves the UI, and Swagger UI, Scalar, and Redoc are all built in.

```ts
// src/api/products/schema.ts
import { z } from "zod";

export const GET = {
    query: z.object({ limit: z.coerce.number().optional() }),
};
```

### Plugins and providers

Plugins extend the app: they register hooks, inject context values, and keep concerns like auth out of core. Providers register shared services on `ctx.services`. Both live in their own convention files.

```ts
// src/plugins.ts
import type { PluginRegistrar } from "burger-api";
import { jwtAuth } from "../ecosystem/plugins/jwt-auth/jwt-auth";

export default (burger: PluginRegistrar) => {
    burger.usePlugin(jwtAuth({ secret: process.env.JWT_SECRET }));
};
```

### WebSocket and pages

WebSocket routes are file-based under `src/websocket/`, with the same convention files as API routes. Page routes and static assets live under `src/pages/`.

```ts
// src/websocket/chat/ws.ts
import type { BurgerWS } from "burger-api";

export function message(ws: BurgerWS, message: string | Buffer) {
    ws.send(message); // echo
}
```

### JavaScript is first-class

Every convention works in `.js` and `.mjs`: routes, schemas, hooks, OpenAPI, config, and the app-level files. `burger-api create --lang js` scaffolds a `jsconfig.json` with `checkJs` and JSDoc-typed files. The scanner fails loud when a route directory mixes extensions, like `route.ts` next to `route.js`.

### Deploy anywhere

`burger-api build --target=bun|node|cloudflare|deno|vercel` generates the right entry for each platform. Bun and Node get self-contained bundles. Edge targets get a portable `export default { fetch: toFetchHandler(app) }` entry plus platform config. The core no longer imports Bun in shared types, so the same package works on every target. On plain Node.js, `@burger-api/node-server` bridges `node:http` and wires WebSocket routes automatically.

### CLI

The CLI grew up with the framework:

- `create` now takes flags: `--lang ts|js`, `--yes`, `--pages`, `--ws`, `--no-api`, `--api-dir`, `--api-prefix`, `--no-skills`.
- `generate route|ws|hook|plugin` scaffolds in the project's language.
- `inspect` prints the project's shape, with `--json` for tooling.
- `doctor` validates the project shape and fails on legacy files, with `--json` too.
- `skills` installs AI agent skills for agentic IDEs.

## Faster than before

The performance work is architectural, not a hand-tuned hot loop:

- Routes register with Bun as per-method native handlers, so there is no per-request method lookup.
- Each route and method compiles to one flattened function. Routes without hooks call the handler directly, with no extra `async` layers.
- Dynamic params come from Bun's already-decoded `req.params`.
- `ctx.services` is built once per app as a shared, frozen object, and `ctx.ip` is resolved lazily on first read.
- Hooks, transforms, and validation run sync-first: `await` only happens when a step really returns a promise.
- Query strings parse in one pass. `ctx.set` tracks what changed, so untouched responses are returned as they are.
- The fetch path used by Node, Cloudflare, Deno, and Vercel matches hard cases with a radix matcher instead of walking every segment.

Measured numbers, the harness, and dated reports live in [burger-api-benchmarks](https://github.com/isfhan/buger-api-benchmarks), the single home for BurgerAPI performance data. The architectural summary is on the [benchmarks page](/docs/advanced/benchmarks). We keep numbers out of this post on purpose: run `bun run battle --profile ci` in that repository and see for yourself.

## Verification

Before calling this a beta rather than a draft, we ran it, not just compiled it:

- **More than 1,000 tests pass, 0 failures**: routing, lifecycle, context, validation, the compiler, every adapter, providers, and WebSocket, plus the CLI's own suite.
- Typecheck and production builds are clean.
- `@burger-api/node-server`'s adapter is verified against a real `node:http` server and a real two-client WebSocket broadcast, running under plain Node, not simulated.
- `bun audit`: no known vulnerabilities in the dependency tree.

## Upgrading from 0.9.x

This is a breaking rewrite: middleware became hooks, `BurgerRequest` became `BurgerContext`, and configuration moved into convention files. The [migration guide](/docs/migration) walks through every change with before and after code, including routes, auth, validation, and `burger.config.ts`. The `0.9.x` line stays on npm while you work through it.

## Known limitations in this beta

We'd rather list these than have you discover them:

- **Pages (`src/pages/`) are mostly Bun-only.** `serve()` on Bun covers every page feature. On other runtimes, `toFetchHandler` serves function pages and embedded assets; HTML-import pages stay Bun-only. API routes are fully portable across all targets.

## What's next

The beta is how we find the things our own tests cannot: your routes, your edge cases, your runtime. Report what breaks, and it gets fixed. Your feedback shapes the beta, and we read every issue.

## Try it and tell us

```bash
bun add burger-api
bun add -g @burger-api/cli
burger-api create my-app
```

Read the docs at [burger-api.com](https://burger-api.com), file issues on [GitHub](https://github.com/isfhan/burger-api/issues), and if you hit something this beta did not catch, that is exactly what a beta is for. Thank you to everyone who tested early builds, reported bugs, and asked hard questions along the way.
