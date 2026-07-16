---
sidebar_label: Route Metadata
---

# Route Metadata

`req.route` identifies the route that handled a request.

```ts
interface RouteMeta {
  path: string;   // the requested pathname, e.g. "/users/123"
  pattern: string; // the route pattern, e.g. "/users/:id"
}
```

## Available on every matched route

`req.route` is set for static routes served through Bun's native router as well as for dynamic and wildcard routes resolved by the trie. For a static route, `path` and `pattern` are the same value.

## Uses

- Logging which pattern served a request.
- Building links or HAL-style responses from the current pattern.
- Instrumentation and analytics keyed by route pattern.

```ts title="api/products/route.ts"
export async function GET(req: BurgerRequest) {
  console.log(`served by ${req.route.pattern}`);
  return Response.json({ ok: true });
}
```


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
