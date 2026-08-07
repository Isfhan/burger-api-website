---
sidebar_label: Hook Return Types
---

# Hook Return Types

A hook can return one of three things:

1. **`undefined`**: Continue to the next hook or the route handler.
2. **`Response`**: Short-circuit: stop the lifecycle and send this response (e.g. 401 Unauthorized).
3. **A function**: Transform the response. The function runs after the handler (`afterRoute` / `mapResponse`), receives the handler's `Response`, and returns a modified `Response` (e.g. for CORS headers).

```ts
// Continue
return undefined;

// Stop and respond
return new Response("Unauthorized", { status: 401 });

// Transform the response (afterRoute / mapResponse)
return (response) => {
  const headers = new Headers(response.headers);
  headers.set("X-Custom", "value");
  return new Response(response.body, { status: response.status, headers });
};
```

Hook types come from `burger-api`:

```ts
import type { Hook, ErrorHook } from "burger-api";

export const onRequest: Hook[] = [];
export const onError: ErrorHook[] = [];
```

`onError` uses `ErrorHook` because it receives the error.

See [Hook System](/docs/hooks/system) and [After Hooks](/docs/hooks/after).


## Related

- [Hook System](/docs/hooks/system)
- [Global Hooks](/docs/hooks/global)
- [Route Hooks](/docs/hooks/route-specific)
- [Request Context](/docs/core/request-handling)
