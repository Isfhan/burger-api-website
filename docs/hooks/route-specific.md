---
sidebar_label: Route Hooks
---

# Route Hooks

Route hooks run only for a given route. Define them in the route's `hooks.ts` file:

```ts
// src/api/users/hooks.ts
import type { BurgerContext } from "burger-api";

export const beforeRoute = [
  async (ctx: BurgerContext) => {
    if (ctx.query.admin !== "true") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  },
];
```

The handler lives in `route.ts`:

```ts
// src/api/users/route.ts
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ users: [] });
}
```

A route's `hooks.ts` can export any of: `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`. `onRequest` is app-level only: define it in `src/hooks.ts` or a plugin, never in a route's `hooks.ts` (a route-level `onRequest` is ignored).

Route hooks run after global hooks and validation, and before the route handler. There is no folder or group inheritance: hooks apply only to their own route directory.

Use route hooks for admin checks, loading route-specific data, or any logic that applies to a single endpoint. See [Hook System](/docs/hooks/system).

When a route hook reads `ctx.validated` (the route has a `schema.ts`), wrap the hooks with `defineHooks(schema, hooks)` (the `defineRoute` counterpart for hooks files) to get it typed:

```ts
// src/api/users/hooks.ts
import { defineHooks } from "burger-api";
import { GET as GetSchema } from "./schema";

export const { beforeRoute } = defineHooks(GetSchema, {
  beforeRoute: (ctx) => {
    ctx.validated.query; // typed, same schema as route.ts
  },
});
```

See [Type Safety](/docs/advanced/type-safety).


## Related

- [Hook System](/docs/hooks/system)
- [Global Hooks](/docs/hooks/global)
- [Hook Return Types](/docs/hooks/return-types)
- [Request Context](/docs/core/request-handling)
