---
sidebar_label: File-Based Routing
---

# File-Based Routing

BurgerAPI uses file-based routing: the folders and files under your `apiDir` (with `apiPrefix` applied) become the URL paths. There is no manual route registration. Each folder adds a segment to the URL, and a file named `route.ts` at a path defines the handlers for that path.

## Example

```
api/products/route.ts     →  /api/products
api/users/[id]/route.ts   →  /api/users/:id
```

Inside `route.ts`, export a function for each HTTP method you want to support (`GET`, `POST`, `PUT`, `DELETE`, and so on).

## Route types

BurgerAPI supports a few route shapes, all built from the same folder rules:

 - **Static routes** — fixed paths. See [Static API Routes](/docs/routing/api/static-routes).
 - **Dynamic routes** — capture a segment with `[param]`. See [Dynamic Routes](/docs/routing/api/dynamic-routes).
 - **Wildcard routes** — match the rest of the path with a `[...]` folder. See [Wildcard Routes](/docs/routing/api/wildcard-routes).
 - **Route groups** — organize with `(folder)` without changing the URL. See [Route Groups](/docs/routing/api/route-groups).

These shapes nest freely by folder depth. See [Nested Routes](/docs/routing/api/nested-routes) for how paths grow with folders.

For full API details and examples, see [Static API Routes](/docs/routing/api/static-routes) (API) and [Static Pages](/docs/routing/pages/static-pages) (pages).

## Types for this feature

Handlers take one argument: `BurgerContext`. When a route has a `schema.ts`, wrap the handler with `defineRoute(schema, handler)` and `ctx.validated` becomes typed from that schema automatically:

```typescript
// api/products/route.ts
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    ctx.validated.query; // typed from schema.ts
    return Response.json({ ok: true });
});
```

The equivalent manual form — `export async function GET(ctx: BurgerContext<typeof GetSchema>)` — still works if you'd rather write the generic by hand.

Each route type has its own type notes: [Static](/docs/routing/api/static-routes), [Dynamic](/docs/routing/api/dynamic-routes), [Wildcard](/docs/routing/api/wildcard-routes), [Nested](/docs/routing/api/nested-routes). The full picture is in the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
- [Wildcard Routes](/docs/routing/api/wildcard-routes)
