---
sidebar_label: Authentication
---

# Authentication Example

Protect routes with a middleware that checks a bearer token. Middleware can short-circuit with a `Response` when a request is not authorized.

## Require-auth middleware

```ts title="api/admin/route.ts"
import type { BurgerRequest, Middleware } from "burger-api";

const requireAuth: Middleware = (req) => {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // validate the token here (e.g. verify a JWT signature)
  return undefined; // continue to the handler
};

export const middleware = [requireAuth];

export async function GET(req: BurgerRequest) {
  return Response.json({ secret: "accessible only with a valid token" });
}
```

The middleware runs before the handler, so unauthorized requests never reach it. Because middleware is part of the single pipeline, the same rules apply consistently across every method.

For JWT specifically, see the [JWT Auth](../ecosystem/jwt-auth.md) ecosystem middleware.


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
