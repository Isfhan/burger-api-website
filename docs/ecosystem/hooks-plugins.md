---
sidebar_label: Hooks & Plugins
---

# Hooks and Plugins

The BurgerAPI ecosystem ships two kinds of packages, plus AI agent skills. See [Ecosystem](/docs/ecosystem/introduction) for the folder layout and CLI commands.

## Hooks

Hooks are small request lifecycle factories. They control when code runs on a request.

- **What they do:** run at a named lifecycle stage (`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`).
- **Where they live:** `ecosystem/hooks/` after install.
- **Where you compose them:** `src/hooks.ts` (global) or a route's `hooks.ts` (route-specific).
- **Examples:** cors, logger, rate-limiter, compression, timeout, security-headers.

```ts title="src/hooks.ts"
import { cors } from "../ecosystem/hooks/cors/cors";

export const onRequest = [cors({ origin: ["https://app.example.com"] })];
```

## Plugins

Plugins are application extensions. They package hooks and inject request-scoped values onto `BurgerContext` through `transform` (for example `ctx.user` or `ctx.apiKey`). They cannot register providers: services are registered in `src/providers.ts` with `burger.provide()`.

- **What they do:** integrate with the application, often combining hooks with route `config.ts` (for example, auth).
- **Where they live:** `ecosystem/plugins/` after install.
- **Where you register them:** `src/plugins.ts`.
- **Examples:** jwt-auth, api-key, session, oidc, basic-auth, env.

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
};
```

`usePlugin()` accepts a plugin object or a factory function, plus two optional arguments:

```ts
usePlugin(plugin: Plugin | PluginFactory, scope?: Scope, seed?: string): this
```

`scope` overrides where the plugin's hooks sit in the chain (default `"plugin"`). `seed` disambiguates two registrations of the same plugin, for example two JWT plugins with different secrets.

## Which one to use?

- Need code to run around requests, like adding headers or logging? Use a **hook**.
- Need an application feature like authentication or environment validation? Use a **plugin**.

Hooks control the request lifecycle. Plugins extend the application. They are separate concepts. Do not treat plugins as a replacement for hooks.

## Types for this feature

The types you use (all from `burger-api`):

- `Plugin` is a plugin: `{ name, hooks? }`
- `PluginFactory` is a function returning a plugin (or a promise of one)
- `GlobalHooks` is the hook object a plugin uses
- `RouteHooks` is the hook object (for typing `hooks.ts` files)
- `BurgerContext` is augmented to type values injected by `transform`

✅ Correct: type the plugin when you write one:

```ts title="src/plugins.ts"
import type { Plugin, PluginRegistrar } from "burger-api";

const logger: Plugin = {
    name: "logger",
    hooks: {
        afterRoute: [(ctx) => (res) => res],
    },
};

export default (burger: PluginRegistrar) => {
    burger.usePlugin(logger);
};
```

✅ Correct: inject a typed value with `transform` (augment `BurgerContext` in any app file):

```ts
import type { Plugin } from "burger-api";

declare module "burger-api" {
    interface BurgerContext {
        tenant: string;
    }
}

const tenant: Plugin = {
    name: "tenant",
    hooks: {
        transform: {
            tenant: (ctx) => ctx.headers.get("x-tenant") ?? "public",
        },
    },
};

// In a handler: ctx.tenant (typed)
```

❌ Wrong: an unknown hook point on a plugin:

```ts
const bad: Plugin = {
    name: "bad",
    hooks: {
        // ❌ Property 'beforeHandle' does not exist (the hook is beforeRoute)
        beforeHandle: [],
    },
};
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
- [CLI Add](/docs/cli/add)
