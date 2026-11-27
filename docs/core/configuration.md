---
sidebar_label: "Configuration"
---

# Configuration

Settings live in a few files, each for one job:

| File | What it sets |
|------|--------------|
| `src/index.ts` | Your app: `new Burger({...})` with the route folders and prefixes |
| `src/openapi.config.ts` | API docs: title, version, servers, docs page |
| `src/plugins.ts` | Which plugins run |
| `src/providers.ts` | Shared services, such as a database client |
| `api/**/config.ts` | Settings for one route, such as `auth` |
| `burger.build.ts` | Settings for the CLI when it builds and checks your project |

## App

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
  apiPrefix: "/api",
});

burger.serve(4000);
```

Folder paths can be relative to the project root (`./src/api`) or to `src/` (`api`). If a folder is not found, the error lists the paths that were tried.

## API docs

```typescript title="src/openapi.config.ts"
import type { OpenAPIConfig } from "burger-api";

export default {
  title: "My Burger API",
  version: "1.0.0",
  description: "An API built with BurgerAPI",
  servers: [{ url: "https://api.example.com", description: "Production" }],
} satisfies OpenAPIConfig;
```

See [OpenAPI](/docs/api/openapi) for every field.

## Build settings

```typescript title="burger.build.ts"
export default {
  apiDir: "./src/api",
  apiPrefix: "/api",
  debug: false,
};
```

`burger-api create` writes this file. The CLI reads it when it builds or checks your project; your running app does not. Keep `apiDir` and `apiPrefix` the same here and in `src/index.ts`. `burger-api doctor` warns when they differ.

## Plugins and providers

`src/plugins.ts` registers plugins with `burger.usePlugin()`. See [Hooks and Plugins](/docs/ecosystem/hooks-plugins).

`src/providers.ts` registers shared services with `burger.provide()`. Handlers read them from `ctx.services`. See [Providers](/docs/core-concepts/providers).

## Route settings

A route's `config.ts` holds settings for that route. Plugins and hooks read them from `ctx.config`:

```typescript title="src/api/admin/config.ts"
export default {
  auth: { required: true, roles: ["admin"] },
};
```

To change a setting for one method, export it by method name:

```typescript title="src/api/items/config.ts"
export default { auth: false };

export const POST = { auth: { required: true } };
```

Here GET is public and POST needs a logged-in user.

A route folder's `config.ts` applies to that route only, not to folders below it. The framework itself reads one key, `responseValidation`. See [Validation Configuration](/docs/validation/configuration).

To type your own keys, add them to `RouteConfig` in `src/types.ts`:

```typescript title="src/types.ts"
declare module "burger-api" {
  interface RouteConfig {
    auth?: boolean | { required?: boolean; roles?: string[] };
  }
}
```

## Environment variables

Bun loads `.env` files on its own, so you do not need a loader. To check that required variables are set, use the [env plugin](/docs/ecosystem/env).

## Types

All from `burger-api`:

- `ServerOptions`: the `new Burger({...})` options
- `OpenAPIConfig`: `src/openapi.config.ts`
- `BuildConfig`: `burger.build.ts`
- `RouteConfig`: `config.ts`
- `GlobalHooks`: `src/hooks.ts`

See [Type Safety](/docs/advanced/type-safety).

## Related

- [Applications](/docs/core-concepts/applications)
- [Hooks](/docs/hooks/system)
- [Providers](/docs/core-concepts/providers)
- [Ecosystem](/docs/ecosystem/introduction)
