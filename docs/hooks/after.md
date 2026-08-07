---
sidebar_label: After Hooks
---

# After Hooks

`afterRoute` runs after the route handler returns. `mapResponse` runs before the response is sent. Both use the response-transform contract: return a function from the hook. The function receives the handler's `Response` and returns a new `Response` (e.g. with added or modified headers).

```ts
// src/hooks.ts
export const afterRoute = [
  () => (response) => {
    const headers = new Headers(response.headers);
    headers.set("X-Powered-By", "BurgerAPI");
    return new Response(response.body, { status: response.status, headers });
  },
];
```

Common use: adding CORS headers or other response transforms. For CORS, prefer the [cors hook](/docs/ecosystem/cors) from the ecosystem.

Use `mapResponse` for work that must happen right before the response is sent, such as final headers.

See [Hook Return Types](/docs/hooks/return-types) and [Hook System](/docs/hooks/system).


## Related

- [Hook System](/docs/hooks/system)
- [Global Hooks](/docs/hooks/global)
- [Route Hooks](/docs/hooks/route-specific)
- [Request Context](/docs/core/request-handling)
