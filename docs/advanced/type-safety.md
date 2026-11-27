---
sidebar_label: Type Safety
---

# TypeScript Types

TypeScript checks your code before it runs. BurgerAPI gives you types for requests, schemas, hooks and plugins.

Check your project with:

```bash
bun run typecheck
```

## Type a handler from its schema

Wrap the handler with `defineRoute(schema, handler)`. Pass the export from `schema.ts`, and `ctx.validated` gets its types:

```ts title="api/search/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ q: z.string().optional() }) };
```

```ts title="api/search/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  ctx.validated.query; // { q?: string }
  return Response.json(ctx.validated.query);
});
```

You can also write the type by hand: `ctx: BurgerContext<typeof GetSchema>`. A route without a schema uses plain `BurgerContext`.

Route hooks that read `ctx.validated` use `defineHooks(schema, hooks)` the same way.

## Types for convention files

| File | Type |
|------|------|
| route `schema.ts` | `export const GET = {...} satisfies MethodSchema;` |
| route `openapi.ts` | `export const GET = {...} satisfies OpenAPIMeta;` |
| route `hooks.ts` | `RouteHooks` |
| route `config.ts` | `RouteConfig` |
| `src/hooks.ts` | `GlobalHooks` |
| `src/plugins.ts` | `PluginRegistrar`, `Plugin` |
| `src/providers.ts` | `ProviderRegistrar` |
| `openapi.config.ts` | `satisfies OpenAPIConfig` |
| `burger.build.ts` | `satisfies Partial<BuildConfig>` |

JavaScript projects get the same checks through JSDoc, for example `/** @type {Partial<import('burger-api').BuildConfig>} */`.

## Add your own types

Some types start empty, and you fill them in. Put this in `src/types.ts` (`burger-api create` makes this file for you):

```ts title="src/types.ts"
import type { Database, User } from "./my-types";

declare module "burger-api" {
  // ctx.services, from burger.provide()
  interface BurgerServices {
    db: Database;
  }

  // values you set in transform hooks
  interface BurgerContext {
    tenant: string;
  }

  // ctx.user and ws.user (auth plugins add their fields here too)
  interface BurgerAuthUser {
    userId?: string;
  }

  // your own config.ts keys
  interface RouteConfig {
    auth?: boolean | { required?: boolean; roles?: string[] };
  }
}
```

## What is not typed

- `ctx.params` is always `Record<string, string>`. Add a `params` schema and use `ctx.validated.params` for typed values.
- `ctx.wildcardParams` is always `string[]`.
- `ctx.json()` returns `any`. Use `ctx.json<T>()` to give it a type.

## Related

- [Error Handling Patterns](/docs/advanced/error-handling)
- [Benchmarks](/docs/advanced/benchmarks)
- [Deployment](/docs/advanced/deployment)
