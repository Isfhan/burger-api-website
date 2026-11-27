---
sidebar_label: Hooks Example
---

# Hooks Example

## Global hook

Export a hook list from `src/hooks.ts`. It runs for every request:

```ts title="src/hooks.ts"
import type { BurgerContext } from "burger-api";

export const onRequest = [
  async (ctx: BurgerContext) => {
    console.log(`${ctx.method} ${ctx.url}`);
  },
];
```

## Route hook

Export hooks from a route's `hooks.ts`. They run only for that route. This `transform` hook blocks non-admin requests:

```ts title="src/api/products/hooks.ts"
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

```ts title="src/api/products/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ data: [] });
}
```

A hook returns a `Response` to stop the request, or nothing to continue.

See [Hook System](/docs/hooks/system), [Global Hooks](/docs/hooks/global) and [Route Hooks](/docs/hooks/route-specific).

## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
