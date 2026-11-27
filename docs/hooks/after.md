---
sidebar_label: After Hooks
---

# After Hooks

`afterRoute` runs after the handler returns. `mapResponse` runs right before the response is sent. Use them to change the response, for example to add headers.

Return a function from the hook. It gets the current `Response` and returns a new one.

```ts title="src/hooks.ts"
import type { GlobalHooks } from "burger-api";

export const afterRoute: GlobalHooks["afterRoute"] = [
  () => (response) => {
    const headers = new Headers(response.headers);
    headers.set("X-Powered-By", "BurgerAPI");
    return new Response(response.body, { status: response.status, headers });
  },
];
```

Global and plugin after hooks run for every response: matched routes, 404s, errors, pages, assets and `/docs`. Route after hooks run only for their route.

For CORS, use the [cors hook](/docs/ecosystem/cors). For a simple status or header change, `ctx.set` is often easier. See [Response Mutation](/docs/api/response-mutation).

## Related

- [Hook System](/docs/hooks/system)
- [Hook Return Types](/docs/hooks/return-types)
- [Global Hooks](/docs/hooks/global)
- [Route Hooks](/docs/hooks/route-specific)
