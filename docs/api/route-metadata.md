---
sidebar_label: Route Metadata
---

# Route Metadata

`ctx.route` tells you which route handled the request.

```ts
interface RouteMeta {
  path: string;    // the requested path, e.g. "/api/users/123"
  pattern: string; // the route pattern, e.g. "/api/users/:id"
}
```

`pattern` includes the API prefix. For a static route, `path` and `pattern` are the same.

```ts title="src/api/products/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  console.log(`served by ${ctx.route?.pattern}`); // "/api/products"
  return Response.json({ ok: true });
}
```

The type is `RouteMeta | undefined`, so use `?.`. In a matched handler it is always set.

Use it for logs, metrics keyed by route, or building links.

## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Request API](/docs/api/request-api)
