---
sidebar_label: Hook Return Types
---

# Hook Return Types

A hook can return one of three things:

1. **`undefined`**: Continue to the next hook or the route handler.
2. **`Response`**: For a forward hook (`onRequest`, `beforeRoute`), stop the pipeline and send this response (e.g. 401 Unauthorized). For a response hook (`afterRoute`, `mapResponse`), replace the current response; the remaining hooks still run on the replacement.
3. **A function**: Transform the response. A forward hook's function runs right after the handler returns, before response validation and `afterRoute`. A response hook's function runs immediately at its stage. Either receives the current `Response` and returns a modified `Response` (e.g. for CORS headers).

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

## Types for this feature

Each hook point has a precise type. TypeScript checks your hook's return value against it.

The types you use (all from `burger-api`):

- `ForwardHook`: `onRequest`, `beforeRoute`. Returns `Response`, a transform function, or `undefined`.
- `ResponseHook`: `afterRoute`, `mapResponse`. Returns `Response`, a transform function, or `undefined`.
- `ErrorHook`: `onError`. Returns `Response` or `undefined`.
- `RouteHooks`: the per-route hook object, for `hooks.ts` files (no `onRequest`).
- `GlobalHooks`: extends `RouteHooks` with `onRequest`, for `src/hooks.ts` and plugin hooks.

✅ Correct: a transform function on a response hook:

```ts
import type { RouteHooks } from "burger-api";

export const afterRoute: RouteHooks["afterRoute"] = [
    (ctx) => (response) => {
        const headers = new Headers(response.headers);
        headers.set("X-Custom", "value");
        return new Response(response.body, { status: response.status, headers });
    },
];
```

✅ Correct: a transform function on a forward hook. The mapper is queued and runs right after the handler returns, before response validation and `afterRoute`:

```ts
import type { RouteHooks } from "burger-api";

export const beforeRoute: RouteHooks["beforeRoute"] = [
    () => (response) => {
        const headers = new Headers(response.headers);
        headers.set("X-Custom", "value");
        return new Response(response.body, { status: response.status, headers });
    },
];
```

❌ Wrong: a hook returns an invalid value:

```ts
export const beforeRoute: RouteHooks["beforeRoute"] = [
    () => "yes", // ❌ Type 'string' is not assignable
];
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

See [Hook System](/docs/hooks/system) and [After Hooks](/docs/hooks/after).


## Related

- [Hook System](/docs/hooks/system)
- [Global Hooks](/docs/hooks/global)
- [Route Hooks](/docs/hooks/route-specific)
- [Request Context](/docs/core/request-handling)
