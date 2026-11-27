---
sidebar_label: Request Context
---

# Request Context

Every handler and hook gets `ctx`, a `BurgerContext`. It holds everything about the current request.

```ts title="src/api/users/[id]/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { id } = ctx.params;
  return Response.json({ id });
}
```

What you get on `ctx`:

- `ctx.params` and `ctx.wildcardParams`: path parameters.
- `ctx.query`: the query string.
- `ctx.cookies`: cookies.
- `ctx.headers`, `ctx.method`, `ctx.url`, `ctx.json()`, `ctx.text()`: the usual request fields.
- `ctx.request`: the original `Request`.
- `ctx.validated`: data that passed your schemas.
- `ctx.route`: the matched route.
- `ctx.config`: the route's `config.ts` values.
- `ctx.services`: services from `src/providers.ts`.
- `ctx.set`: status, headers and cookies for the response.

`ctx` is not a `Request`. Use `ctx.request` when you need the raw object.

See [Request API](/docs/api/request-api) for examples of each field.

## Typed validated data

Wrap the handler with `defineRoute` to type `ctx.validated` from the route's `schema.ts`:

```ts title="src/api/users/[id]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { id } = ctx.validated.params; // typed from the schema
  return Response.json({ id });
});
```

See [Type Safety](/docs/advanced/type-safety).

## Related

- [Request API](/docs/api/request-api)
- [Handlers](/docs/core-concepts/handlers)
- [Response Mutation](/docs/api/response-mutation)
- [Routing](/docs/core-concepts/routing)
