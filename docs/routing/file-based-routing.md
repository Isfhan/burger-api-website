---
sidebar_label: File-Based Routing
---

# File-Based Routing

In BurgerAPI, folders under your `apiDir` become URL paths. A `route.ts` file in a folder defines the handlers for that path. You do not register routes by hand.

## Example

```
api/products/route.ts     →  /api/products
api/users/[id]/route.ts   →  /api/users/:id
```

In `route.ts`, export a function for each HTTP method you support: `GET`, `POST`, `PUT`, `DELETE`, and so on. JavaScript projects use `route.js` or `route.mjs`.

## Route types

- **Static routes**: fixed paths. See [Static API Routes](/docs/routing/api/static-routes).
- **Dynamic routes**: a `[param]` folder captures one segment. See [Dynamic Routes](/docs/routing/api/dynamic-routes).
- **Wildcard routes**: a `[...]` folder matches the rest of the path. Named folders such as `[...slug]` are an error. See [Wildcard Routes](/docs/routing/api/wildcard-routes).
- **Route groups**: a `(folder)` organizes files without changing the URL. See [Route Groups](/docs/routing/api/route-groups).

These nest by folder depth. See [Nested Routes](/docs/routing/api/nested-routes).

You do not need `HEAD` or `OPTIONS` handlers. See [Automatic HEAD](/docs/routing/api/static-routes#automatic-head) and [Automatic OPTIONS](/docs/routing/api/static-routes#automatic-options).

## Route collisions

API routes, pages, assets, `/openapi.json` and `/docs` share one URL space. If two of them resolve to the same path, the app fails at startup with an error that names both. Rename one of them.

## Types

Handlers take one argument, `BurgerContext`. If the route has a `schema.ts`, wrap the handler with `defineRoute` to get typed `ctx.validated`:

```typescript title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  ctx.validated.query; // typed from schema.ts
  return Response.json({ ok: true });
});
```

See [Type Safety](/docs/advanced/type-safety).

## Related

- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
- [Wildcard Routes](/docs/routing/api/wildcard-routes)
- [Static Pages](/docs/routing/pages/static-pages)
