---
sidebar_label: Route Hooks
---

# Route Hooks

Route hooks run only for one route. Put them in a `hooks.ts` file next to the route's `route.ts`.

```ts title="src/api/users/hooks.ts"
import { ForbiddenError } from "burger-api";
import type { RouteHooks } from "burger-api";

export const transform: RouteHooks["transform"] = {
  admin: (ctx) => {
    if (ctx.query.admin !== "true") {
      throw new ForbiddenError("Admin only");
    }
    return true;
  },
};
```

A route `hooks.ts` can export `transform`, `beforeRoute`, `afterRoute`, `mapResponse` and `onError`.

- `onRequest` is not allowed here. It runs before routing, so put it in `src/hooks.ts` or a plugin. A route `onRequest` export is ignored with a warning.
- Route hooks run after global hooks for `transform` and `beforeRoute`, and before global hooks for `afterRoute`, `mapResponse` and `onError`.
- Hooks are not inherited. They apply only to their own route folder.

## Typed ctx.validated

If a hook reads `ctx.validated`, wrap the hooks with `defineHooks(schema, hooks)`. It types `ctx` from the route's schema.

```ts title="src/api/users/hooks.ts"
import { defineHooks } from "burger-api";
import { GET as GetSchema } from "./schema";

export const { beforeRoute } = defineHooks(GetSchema, {
  beforeRoute: (ctx) => {
    ctx.validated.query; // typed from schema.ts
  },
});
```

Route hooks run for every method of the route. A slot that only one method has, like `body`, may be `undefined`. Read it with `ctx.validated.body?.name`.

## Related

- [Hook System](/docs/hooks/system)
- [Global Hooks](/docs/hooks/global)
- [Hook Return Types](/docs/hooks/return-types)
- [Type Safety](/docs/advanced/type-safety)
