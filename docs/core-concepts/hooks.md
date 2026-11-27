---
sidebar_label: Hooks
---

# Hooks

Hooks run your code at fixed points of a request. There are six: `onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse` and `onError`.

```
onRequest → Routing → transform → Validation → beforeRoute
  → Handler → afterRoute → mapResponse
```

Errors go to `onError`.

```ts title="src/hooks.ts"
import type { GlobalHooks } from "burger-api";

export const beforeRoute: GlobalHooks["beforeRoute"] = [
  () => {
    if (process.env.MAINTENANCE === "1") {
      return new Response("Down for maintenance", { status: 503 });
    }
  },
];
```

For auth, check credentials in `transform` instead, so a caller without a token gets a 401 before validation runs. See [Auth goes in transform](/docs/hooks/system#auth-goes-in-transform).

Returning a `Response` from `onRequest` or `beforeRoute` stops the request. The handler does not run, but `afterRoute` and `mapResponse` still do.

Hooks live in `src/hooks.ts` (every request) or in a route's `hooks.ts` (that route only). Plugins are a separate thing: they package hooks for reuse.

See [Hook System](/docs/hooks/system) for the full guide.

## Related

- [Hook System](/docs/hooks/system)
- [Global Hooks](/docs/hooks/global)
- [Route Hooks](/docs/hooks/route-specific)
- [Hooks and Plugins](/docs/ecosystem/hooks-plugins)
