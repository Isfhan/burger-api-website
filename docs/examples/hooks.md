---
sidebar_label: Hooks Example
---

# Hooks Example

Using global and route-specific hooks:

**Global:** Export a hook array from `src/hooks.ts`. It runs for every request in the app (e.g. logger, CORS).

```ts
// src/hooks.ts
import type { BurgerContext } from "burger-api";

export const onRequest = [
  async (ctx: BurgerContext) => {
    console.log(`${ctx.method} ${ctx.url}`);
  },
];
```

**Route-specific:** Export hook points (`transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`) from a route's `hooks.ts`. They run only for that route directory. `beforeRoute` runs after global hooks and validation, before the handler.

```ts
// src/api/products/hooks.ts
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

```ts
// src/api/products/route.ts
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ data: [] });
}
```

A hook returns a `Response` to short-circuit the request, or `undefined` to continue. `afterRoute` and `mapResponse` can also return a function that transforms the response.

See [Hook System](/docs/hooks/system), [Global Hooks](/docs/hooks/global), and [Route Hooks](/docs/hooks/route-specific).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
