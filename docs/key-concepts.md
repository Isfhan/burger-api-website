---
sidebar_label: Key Concepts
sidebar_position: 2
---

# Key Concepts

BurgerAPI is a Bun-first, WinterCG-compatible framework for APIs and web apps.
TypeScript and JavaScript are both first-class. Here are the main ideas.

## File-based routing

Routes are defined by your **file and folder structure**. Put `route.ts` (or
`route.js`, `route.mjs`) files under your API directory (e.g. `src/api`), and
BurgerAPI maps them to URLs. Each route directory is self-contained with
optional sibling convention files: `schema.ts`, `hooks.ts`, `openapi.ts`,
`config.ts`. No manual route registration.

See [File-Based Routing](/docs/routing/file-based-routing), [Static API Routes](/docs/routing/api/static-routes), and [Configuration](/docs/core/configuration).

## Burger instance and configuration

You create one **`Burger`** instance with runtime options (`apiDir`,
`apiPrefix`, validation settings, OpenAPI metadata). Build-time concerns
(dirs, prefixes, debug) live in **`burger.build.ts`** and are used by the CLI
only. For WinterCG deployments you pass pre-built **`apiRoutes`** instead of
directories.

See [Burger Class](/docs/core/burger-class), [Server Options](/docs/core/server-options), and [Configuration](/docs/core/configuration).

## Hooks and plugins

**Hooks** control the request lifecycle: `onRequest`, `transform`,
`beforeRoute`, `afterRoute`, `mapResponse`, `onError`. Global hooks live in
`src/hooks.ts`; route hooks in `api/**/hooks.ts`.

**Plugins** extend the application. They are registered in `src/plugins.ts`
and may register hooks, register providers, and
extend `BurgerContext`. Hooks and plugins are separate concepts.

See [Hooks](/docs/hooks/system) and [Ecosystem](/docs/ecosystem/introduction).

## Context

The single object flowing through the request lifecycle is **`BurgerContext`**
(`ctx`). It exposes the original request (`ctx.request`), parsed data
(`ctx.query`, `ctx.params`, `ctx.json()`), validated input (`ctx.validated`),
injected services (`ctx.services`), and more. Handlers always return a
standard Web **`Response`**.

See [Validation](/docs/validation/zod).

## Validation

Request **validation** uses Standard Schema libraries, with Zod as the
default. Define per-method schemas in `schema.ts` for query, params, headers,
cookies, and body; BurgerAPI validates before your handler runs and attaches
the result to `ctx.validated`. Errors follow the RFC 9457 Problem Details
format.

See [Zod Validation](/docs/validation/zod), [Schema Definition](/docs/validation/schema), and [Validation Errors](/docs/validation/errors).

## OpenAPI

BurgerAPI can **generate an OpenAPI 3.0 specification** from your routes and
schemas and serve an interactive docs UI.

See [OpenAPI Generation](/docs/openapi/generation) and [Swagger UI](/docs/openapi/swagger-ui).

## CLI and builds

The **Burger API CLI** lets you create projects (`create`, with `--lang ts|js`),
add ecosystem hooks and plugins (`add`, `list`), run the dev server (`dev`),
and build for production (`build`, `start`). AOT route discovery means
production builds never scan the filesystem at runtime.

See [CLI Tool](/docs/getting-started/cli) and [Build Command](/docs/cli/build).

## Deployment

Bun deployments use `burger.serve(port)` with `burger-api build` and
`burger-api start`. WinterCG targets (Cloudflare Workers, Vercel, Deno Deploy)
use `toFetchHandler(app)` with AOT routes.

See [Deployment](/docs/deployment/bun).

## Related

- [Quick Start](/docs/quick-start)
- [Installation](/docs/getting-started/installation)
- [JavaScript](/docs/javascript)
