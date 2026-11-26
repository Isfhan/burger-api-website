---
sidebar_label: Providers
---

# Providers

A provider is a service your app needs at runtime: a database client, a mailer, a cache. You create it once when the app starts and share it across requests.

Register providers in `src/providers.ts`. Handlers read them from `ctx.services`.

## Why use a provider

A database client holds a connection pool. Creating one per request wastes connections and slows the route down. A provider creates the service once at startup, and every request reuses it.

## Register a provider

`src/providers.ts` default-exports a function. It receives a `ProviderRegistrar` with one method: `provide(name, service)`.

```ts title="src/providers.ts"
import type { ProviderRegistrar } from "burger-api";
import { db } from "./db";

export default (burger: ProviderRegistrar) => {
  burger.provide("db", db);
};
```

`src/db.ts` builds the service. A service can be any value: a class instance, a plain object, or a function.

```ts title="src/db.ts"
export class Database {
  private users = [{ id: 1, name: "Ada" }];

  async listUsers() {
    return this.users;
  }
}

export const db = new Database();
```

The function may be async. A `providers.ts` file that has no default function export fails at startup.

## Read a provider

Use `ctx.services` in a handler. The same object is available in hooks and plugins.

```ts title="src/api/users/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const users = await ctx.services.db.listUsers();
  return Response.json({ users });
}
```

## Type the service

`ctx.services` starts empty and untyped. Augment `BurgerServices` in `src/types.ts` to describe your services. The scaffold creates this file.

```ts title="src/types.ts"
import type { Database } from "./db";

declare module "burger-api" {
  interface BurgerServices {
    db: Database;
  }
}

export {};
```

Now `ctx.services.db` is typed as `Database` in every handler, hook, and plugin. WebSocket handlers read the same services as `ws.services`; see [WebSocket](/docs/websocket/overview).

## Services are shared and frozen

Each service is created once and reused. `ctx.services` is frozen, so assigning a key throws a `TypeError`. For example, `ctx.services.db = otherDb` throws.

This is deliberate. Two requests may run at the same time, and a mutable shared bag would leak data from one request into another.

Per-request data belongs in a `transform` hook instead. `transform` returns fields, and each field is copied onto the context for that request only.

```ts title="src/hooks.ts"
import type { GlobalHooks } from "burger-api";

export const transform: GlobalHooks["transform"] = {
  requestId: () => crypto.randomUUID(),
};
```

```ts title="src/api/whoami/route.ts"
import type { BurgerContext } from "burger-api";

export function GET(ctx: BurgerContext) {
  return Response.json({ requestId: ctx.requestId ?? null });
}
```

Add `requestId` to `BurgerContext` in the same `src/types.ts` block so TypeScript knows the field:

```ts
declare module "burger-api" {
  interface BurgerContext {
    requestId?: string;
  }
}
```

`requestId` is optional because a hook can leave it unset for some requests. The logger hook declares the same field, so the two declarations must agree.

See [Global Hooks](/docs/hooks/global#transform) for the full `transform` contract.

## Providers vs plugins

The two files do different jobs:

| | Providers | Plugins |
|-------|-----------|---------|
| What they add | Shared services | Hooks and route behavior |
| Where you register them | `src/providers.ts` | `src/plugins.ts` |
| How you read them | `ctx.services.<name>` | `ctx` fields, `ctx.config` |

A plugin cannot register a provider. If a plugin needs a database, register the database in `src/providers.ts` and read it from `ctx.services` inside the plugin's hook. See [Hooks and Plugins](/docs/ecosystem/hooks-plugins) for plugin structure.

## Related

- [Applications](/docs/core-concepts/applications)
- [Hooks](/docs/core-concepts/hooks)
- [Configuration](/docs/core/configuration)
- [Testing](/docs/advanced/testing)
