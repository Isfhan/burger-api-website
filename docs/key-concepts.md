---
sidebar_label: Key Concepts
sidebar_position: 2
---

# Key Concepts

These are the main ideas in BurgerAPI. Each section links to a page with more detail.

## File-based routing

Your folders are your URLs. A folder under `src/api/` with a `route.ts` file is a route. Next to it you can add `schema.ts`, `hooks.ts`, `openapi.ts`, and `config.ts`. Each route folder stands on its own: child folders do not inherit these files.

See [File-Based Routing](/docs/routing/file-based-routing).

## Burger instance

`src/index.ts` creates one `Burger` instance and starts the server. Build settings live in `burger.build.ts` and are read by the CLI.

See [Burger Class](/docs/core/burger-class) and [Configuration](/docs/core/configuration).

## Context

Every handler gets one object, `ctx` (type `BurgerContext`). It holds the request, `ctx.params`, `ctx.query`, validated data in `ctx.validated`, and your services in `ctx.services`. Handlers return a standard `Response`.

```ts
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
    return Response.json({ id: ctx.params.id });
}
```

See [Request Context](/docs/core/request-handling).

## Validation

Define a schema per method in `schema.ts`. BurgerAPI checks the request before your handler runs. Bad input gets a `422` error. Wrap the handler in `defineRoute(schema, handler)` to get `ctx.validated` typed for you.

See [Zod Validation](/docs/validation/zod) and [Type Safety](/docs/advanced/type-safety).

## Hooks and plugins

- **Hooks** run at steps of a request: `onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`. Put global hooks in `src/hooks.ts` and route hooks in the route's `hooks.ts`.
- **Plugins** add features to your app. Register them in `src/plugins.ts`.
- **Providers** register shared services in `src/providers.ts`. You read them from `ctx.services`.

See [Hooks](/docs/hooks/system) and [Ecosystem](/docs/ecosystem/introduction).

## OpenAPI

BurgerAPI builds an OpenAPI document from your routes and schemas. It serves the docs UI at `/docs`.

See [OpenAPI & Swagger](/docs/api/openapi).

## CLI and deployment

The CLI creates projects (`create`), adds hooks and plugins (`add`), runs the dev server (`dev`), and builds for production (`build`). Pick a platform with `--target`: `bun` (default), `node`, `cloudflare`, `deno`, or `vercel`.

WebSocket routes work on every target except Vercel.

See [CLI Tool](/docs/getting-started/cli), [Deployment](/docs/deployment/bun), and [Compatibility](/docs/compatibility).

## Related

- [Quick Start](/docs/quick-start)
- [Installation](/docs/getting-started/installation)
- [JavaScript](/docs/javascript)
