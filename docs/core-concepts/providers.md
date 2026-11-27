---
sidebar_label: Providers
---

# Providers

A provider is a service your app shares across requests: a database client, a mailer, a cache. It is created once when the app starts. Handlers read it from `ctx.services`.

## Register a provider

`src/providers.ts` default-exports a function. Call `provide(name, service)` inside it. The function may be async.

```ts title="src/providers.ts"
import type { ProviderRegistrar } from "burger-api";
import { db } from "./db";

export default (burger: ProviderRegistrar) => {
  burger.provide("db", db);
};
```

A service can be any value: a class instance, an object or a function.

```ts title="src/db.ts"
export class Database {
  private users = [{ id: 1, name: "Ada" }];

  async listUsers() {
    return this.users;
  }
}

export const db = new Database();
```

## Read a provider

```ts title="src/api/users/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const users = await ctx.services.db.listUsers();
  return Response.json({ users });
}
```

`ctx.services` works the same in hooks and plugins. WebSocket handlers use `ws.services`.

## Type the service

Add your services to `BurgerServices` in `src/types.ts`. The scaffold creates this file.

```ts title="src/types.ts"
import type { Database } from "./db";

declare module "burger-api" {
  interface BurgerServices {
    db: Database;
  }
}

export {};
```

Now `ctx.services.db` is typed as `Database` everywhere.

## Services are read-only

`ctx.services` is shared by all requests and frozen. Assigning to it, like `ctx.services.db = otherDb`, throws a `TypeError`.

For per-request values, such as a request ID, use a [transform](/docs/hooks/global#transform) hook instead.

## Providers vs plugins

| | Providers | Plugins |
|-------|-----------|---------|
| What they add | Shared services | Hooks |
| Where you register them | `src/providers.ts` | `src/plugins.ts` |
| How you read them | `ctx.services.<name>` | Fields they add to `ctx` |

A plugin cannot register a provider. If a plugin needs a database, register it in `src/providers.ts` and read `ctx.services` in the plugin's hook. See [Hooks and Plugins](/docs/ecosystem/hooks-plugins).

## Related

- [Applications](/docs/core-concepts/applications)
- [Hooks](/docs/core-concepts/hooks)
- [Configuration](/docs/core/configuration)
- [Testing](/docs/advanced/testing)
