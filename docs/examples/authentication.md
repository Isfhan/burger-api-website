---
sidebar_label: Authentication
---

# Authentication Example

Protect routes with an auth plugin. The core framework is auth-agnostic: authentication is always packaged as a plugin under `ecosystem/plugins/` and integrates with hooks and route `config.ts`.

## Install an auth plugin

Choose a plugin and install it with the CLI:

```bash
burger-api add api-key
```

or for JWT:

```bash
burger-api add jwt-auth
```

See [API Key Auth](/docs/ecosystem/api-key-auth) and [JWT Auth](/docs/ecosystem/jwt-auth).

## Register the plugin

Register it in `src/plugins.ts` with `burger.usePlugin(...)`:

```ts
// src/plugins.ts
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger) => {
  burger.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
};
```

## Protect a route

The plugin enforces route `config.ts`. Protected routes require auth; open routes opt out:

```ts
// src/api/admin/config.ts
export default { auth: true };
```

```ts
// src/api/public/health/config.ts
export default { auth: false };
```

A missing or invalid key produces `401 Unauthorized`; the handler runs only after auth passes:

```ts
// src/api/admin/route.ts
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ secret: "accessible only with a valid key" });
}
```

## Read the authenticated identity

The plugin attaches the authenticated identity to the context. With the API key plugin it is `ctx.apiKey`; with the JWT plugin it is the decoded payload as `ctx.user`:

```ts
export async function GET(ctx: BurgerContext) {
  return Response.json({ apiKey: ctx.apiKey });
}
```

## What about manual checks?

A hand-rolled check in the handler works, but it runs per method, per route, and does not integrate with `config.ts`. Prefer a `beforeRoute` hook for a single-route check, and a plugin when the same rule protects many routes. See [Hooks](/docs/hooks/system).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
