---
sidebar_label: RouteMeta
---

# RouteMeta

`RouteMeta` describes the matched route. It is exposed as `ctx.route` and has two fields: `path` (the requested pathname, never the query string) and `pattern` (the route definition pattern, e.g. `/users/:id`).

```ts
interface RouteMeta {
  path: string;    // the requested pathname, e.g. "/users/123"
  pattern: string; // the route pattern, e.g. "/users/:id"
}
```

For a static route, `path` and `pattern` are the same value. `ctx.route` is present on every matched route, including static routes.

See [Route Metadata](/docs/api/route-metadata) for how to use it in handlers.

## Related

- [Route Metadata](/docs/api/route-metadata)
- [Request API](/docs/api/request-api)
