---
sidebar_label: Response Mutation
---

# Response Mutation

Handlers return a standard `Response`. To change the status, headers or cookies from a hook or a handler, use `ctx.set`. BurgerAPI applies it to the response at the end of the request.

```ts title="src/api/users/route.ts"
import type { BurgerContext } from "burger-api";

export async function POST(ctx: BurgerContext) {
  ctx.set.status = 201;
  ctx.set.headers = {
    "x-total": "42",
    "set-cookie": "session=abc; HttpOnly; Path=/",
  };
  return Response.json({ created: true });
}
```

What you get:

- `ctx.set.status` changes the status of a success response. An error status (400 or higher) stays as it is.
- `ctx.set.headers` adds headers. Your values win over the response's own headers.
- An array value adds every entry. `set-cookie` is always added, so cookies from the handler and from `ctx.set` both reach the client.
- A `ctx.set` from `onRequest` also applies to 404s, errors, pages and `/docs`.

To change the response body or read the response, use an [after hook](/docs/hooks/after) instead.

## Related

- [ContextSet](/docs/api/context-set)
- [After Hooks](/docs/hooks/after)
- [Hook System](/docs/hooks/system)
