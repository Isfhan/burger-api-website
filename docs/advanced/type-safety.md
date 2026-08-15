---
sidebar_label: Type Safety
---

# TypeScript Types

BurgerAPI is built with TypeScript. TypeScript checks your code before it runs. Wrong code fails before your server starts.

This page is the starting point for types. Each feature page has a short **"Types for this feature"** section at the bottom. This page explains the shared ideas behind all of them.

## The one pattern to remember

Most typing comes from one idea: **the handler knows its own schema**.

Annotate the handler with `BurgerContext<typeof GET>`. The `GET` inside is the schema export from `schema.ts`. TypeScript then knows exactly what `ctx.validated` contains.

```ts
// schema.ts
import { z } from "zod";
export const GET = { query: z.object({ q: z.string().optional() }) };

// route.ts
import type { BurgerContext } from "burger-api";
import type { GET } from "./schema";

export async function GET(ctx: BurgerContext<typeof GET>) {
    ctx.validated.query; // { q?: string } | undefined — typed
}
```

For a route without a schema, keep plain `BurgerContext`. Every slot stays `unknown`.

## Words we use

- **Type** — the shape of a value. Example: `string` is the type of text.
- **Compile time** — when TypeScript checks your code, before it runs.
- **Runtime** — when your code actually runs.
- **Inference** — TypeScript figures out a type by itself, without you writing it.
- **Generic** — a type that takes another type as input. Example: `BurgerContext<typeof GET>` uses the schema type `typeof GET`.
- **Augmentation** — you add your own types to a BurgerAPI type. See below.
- **Compile error** — TypeScript says your code is wrong. The server does not start.

## How to check your code

In your project folder, run:

```bash
bun run typecheck
```

No errors means your types are correct. Your editor shows the same problems while you type (red squiggly lines).

## The types BurgerAPI gives you

| Type | What it does | Where you use it |
|------|--------------|------------------|
| `BurgerContext` | The request object passed to handlers and hooks | Handler and hook parameters |
| `BurgerContext<typeof GET>` | The request object, with `ctx.validated` typed from your schema | Route handlers |
| `RequestHandler` | A handler function: takes `BurgerContext`, returns `Response` | Typing handler variables |
| `HTTPMethod` | The allowed methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS` | Typing method keys |
| `RouteDefinition` | A route with handlers, schema, and openapi metadata | Programmatic `apiRoutes` |
| `RouteSchema` | The shape of a `schema.ts` export | Programmatic `schema` |
| `ForwardHook` | A before-handler hook: returns `Response` or `undefined` | `onRequest`, `beforeRoute` |
| `ResponseHook` | An after-handler hook: can also return a transform function | `afterRoute`, `mapResponse` |
| `ErrorHook` | An error hook: takes `(error, ctx)`, returns `Response` or `undefined` | `onError` |
| `RouteHooks` | All hook points of a route in one object | `hooks.ts` files |
| `Plugin` | A plugin: name plus optional hooks | `usePlugin()` |
| `BurgerServices` | The services on `ctx.services` — you extend it | Providers, `ctx.services` |
| `WebSocketData` | The data on `ws.data` — you extend it | WebSocket handlers |
| `BurgerWS` | The WebSocket object passed to WS handlers | WS handlers |
| `openapi` | OpenAPI metadata, keyed by lowercase method | Programmatic `openapi` |

## Augmentation: add your own types

Some BurgerAPI types start empty. You fill them with your own types. This is called **augmentation**. Put this block in any file of your app (for example `src/types.ts`):

```ts
import type { Database, Logger, User } from "./my-types";

declare module "burger-api" {
    // Types for ctx.services (from burger.provide)
    interface BurgerServices {
        db: Database;
        logger: Logger;
    }

    // Custom properties you set in transform hooks
    interface BurgerContext {
        user: User;
        tenant: string;
    }

    // Types for ws.data in WebSocket handlers
    interface WebSocketData {
        userId?: string;
    }
}
```

After this block, `ctx.services.db`, `ctx.user`, and `ws.data.userId` are all typed.

## What is NOT typed

These stay untyped on purpose:

- **`ctx.params`** — the raw URL parameters, always `Record<string, string> | undefined`. For typed parameters, add a `params` schema and use `ctx.validated.params`. See [Dynamic Routes](/docs/routing/api/dynamic-routes).
- **`ctx.wildcardParams`** — always `string[] | undefined`. There is no schema for wildcard segments.
- **`ctx.json()`** — the default is `any` (the same as the browser `Request`). Use `ctx.json<T>()` to give it a type: `await ctx.json<{ id: number }>()`.

## Where types live in each feature

- [Routing](/docs/routing/file-based-routing) — typed handlers and parameters
- [Hooks](/docs/hooks/system) — typed hook contracts
- [Request handling](/docs/core/request-handling) — `BurgerContext` and body reading
- [Validation](/docs/validation/zod) — typed `ctx.validated`
- [Configuration](/docs/core/configuration) — `ServerOptions` and route definitions
- [Plugins](/docs/ecosystem/hooks-plugins) — `Plugin` and services
- [OpenAPI](/docs/api/openapi) — typed metadata
- [WebSocket](/docs/websocket/overview) — `BurgerWS` and `ws.data`

## Related

- [Error Handling Patterns](/docs/advanced/error-handling)
- [Deployment](/docs/advanced/deployment)
