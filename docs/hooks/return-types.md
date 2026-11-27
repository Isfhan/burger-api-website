---
sidebar_label: Hook Return Types
---

# Hook Return Types

A hook returns one of three things.

| Return | `onRequest`, `beforeRoute` | `afterRoute`, `mapResponse` |
|--------|----------------------------|-----------------------------|
| `undefined` | Continue | Continue |
| `Response` | Stop. Skip the handler and send this response | Replace the current response |
| `(response) => Response` | Change the response after the handler runs | Change the response now |

When a forward hook stops the request, `afterRoute` and `mapResponse` still run. So headers such as CORS still reach a 401 or 429.

`onError` returns a `Response` to handle the error, or `undefined` to let the next `onError` hook try.

```ts title="src/api/users/hooks.ts"
import type { RouteHooks } from "burger-api";

export const beforeRoute: RouteHooks["beforeRoute"] = [
  (ctx) => {
    if (!ctx.headers.get("authorization")) {
      return new Response("Unauthorized", { status: 401 }); // stop
    }
    return undefined; // continue
  },
];

export const afterRoute: RouteHooks["afterRoute"] = [
  () => (response) => {
    const headers = new Headers(response.headers);
    headers.set("X-Custom", "value");
    return new Response(response.body, { status: response.status, headers });
  },
];
```

## Types

Import these from `burger-api`:

- `RouteHooks`: the shape of a route `hooks.ts` (no `onRequest`).
- `GlobalHooks`: the shape of `src/hooks.ts` and plugin hooks (adds `onRequest`).
- `ForwardHook`, `ResponseHook`, `ErrorHook`: one hook function.

TypeScript rejects a wrong return value:

```ts
export const beforeRoute: RouteHooks["beforeRoute"] = [
  () => "yes", // ❌ Type 'string' is not assignable
];
```

Run `bun run typecheck` to check your code. See [Hook Types](/docs/api/hook-types) for the full signatures.

## Related

- [Hook System](/docs/hooks/system)
- [After Hooks](/docs/hooks/after)
- [Hook Types](/docs/api/hook-types)
- [Type Safety](/docs/advanced/type-safety)
