---
sidebar_label: Hooks & Plugins
---

# Hooks and Plugins

The ecosystem has two kinds of packages. They are separate ideas.

- Need code to run around requests, like headers or logging? Use a **hook**.
- Need an app feature, like auth or env checks? Use a **plugin**.

## Hooks

A hook runs at a lifecycle point: `onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse` or `onError`. Add ecosystem hooks in `src/hooks.ts` (every request) or in a route's `hooks.ts` (that route only):

```ts title="src/hooks.ts"
import { cors } from "../ecosystem/hooks/cors/cors";

export const onRequest = [cors({ origin: ["https://app.example.com"] })];
```

## Plugins

A plugin is `{ name, hooks? }`. Register plugins in `src/plugins.ts`:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
};
```

Plugins add hooks only. Services go in `src/providers.ts` with `burger.provide()`.

To register the same plugin twice (for example two JWT plugins with different secrets), pass a third `seed` argument: `usePlugin(plugin, undefined, "admin")`.

## Write your own plugin

This plugin adds `ctx.tenant` to every request:

```ts title="src/plugins.ts"
import type { Plugin, PluginRegistrar } from "burger-api";

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

export default (burger: PluginRegistrar) => {
  burger.usePlugin(tenant);
};
```

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
- [CLI Add](/docs/cli/add)
