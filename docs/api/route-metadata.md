---
sidebar_label: Route Metadata
---

# Route Metadata

`ctx.route` identifies the route that handled a request.

```ts
interface RouteMeta {
  path: string;    // the requested pathname, e.g. "/users/123"
  pattern: string; // the route pattern, e.g. "/users/:id"
}
```

## Available on every matched route

`ctx.route` is set for static routes served through Bun's native router as well as for dynamic and wildcard routes resolved by the trie. For a static route, `path` and `pattern` are the same value.

## Uses

- Logging which pattern served a request.
- Building links or HAL-style responses from the current pattern.
- Instrumentation and analytics keyed by route pattern.

```ts title="api/products/route.ts"
export async function GET(ctx: BurgerContext) {
  console.log(`served by ${ctx.route.pattern}`);
  return Response.json({ ok: true });
}
```

## Route convention files

`ctx.route` comes from the route directory. Each route directory is self-contained, with optional sibling convention files:

| File | Role |
|------|------|
| `route.ts` | `export async function GET(ctx: BurgerContext)` returns a `Response` |
| `schema.ts` | `export const GET = { body, query, ... }` |
| `hooks.ts` | Route hooks |
| `openapi.ts` | `export const GET = { summary, tags, ... }` |
| `config.ts` | Route options (auth, cache, timeout, ...) |

Per-method named exports (`GET`, `POST`, ...) are used on `route.ts`, `schema.ts`, and `openapi.ts`. See [File-Based Routing](/docs/routing/file-based-routing).

## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Request API](/docs/api/request-api)
