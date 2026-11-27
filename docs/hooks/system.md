---
sidebar_label: Hook System
---

# Hook System

Hooks let you run code at fixed points of a request. Use them for auth, logging, headers and error handling.

Hooks and plugins are separate things. A hook runs at one point of a request. A plugin is a package of hooks that you register in `src/plugins.ts`.

## The six hooks

| Hook | When it runs |
|------|------|
| `onRequest` | The request enters the app, before routing |
| `transform` | After routing, before validation. Adds fields to `ctx` |
| `beforeRoute` | After validation, before the handler |
| `afterRoute` | After the handler returns |
| `mapResponse` | Right before the response is sent |
| `onError` | When an error is thrown |

```
onRequest → Routing → transform → Validation → beforeRoute
  → Handler → afterRoute → mapResponse
```

An error thrown in any step goes to `onError`. A request that matches no route gets a 404.

## What a hook returns

- `undefined`: continue.
- A `Response` from `onRequest` or `beforeRoute`: stop here and send this response. The handler does not run. `afterRoute` and `mapResponse` still run on it.
- A `Response` from `afterRoute` or `mapResponse`: replace the current response.
- A function `(response) => Response`: change the response.

See [Hook Return Types](/docs/hooks/return-types) for details and examples.

```ts title="src/api/users/hooks.ts"
import type { RouteHooks } from "burger-api";

export const beforeRoute: RouteHooks["beforeRoute"] = [
  (ctx) => {
    if (!ctx.headers.get("x-api-key")) {
      return new Response("Unauthorized", { status: 401 });
    }
  },
];
```

## Where hooks live

- **Global**: `src/hooks.ts`. See [Global Hooks](/docs/hooks/global).
- **Route**: `hooks.ts` next to a `route.ts`. See [Route Hooks](/docs/hooks/route-specific).
- **Plugin**: the `hooks` of a plugin registered in `src/plugins.ts`. See [Hooks and Plugins](/docs/ecosystem/hooks-plugins).

Global and plugin `afterRoute` and `mapResponse` run for every response: 404s, errors, pages, assets and `/docs` too. Route hooks run only when their route matches.

`onRequest` is not allowed in a route `hooks.ts`. It runs before routing, so put it in `src/hooks.ts` or a plugin.

Hooks are not inherited. A route's `hooks.ts` applies to that route only, not to sub-folders.

## Order

- `onRequest`, `transform`, `beforeRoute`: plugin hooks first, then global, then route.
- `afterRoute`, `mapResponse`, `onError`: route hooks first, then global, then plugin.

## Auth goes in transform

`transform` runs before validation. If you check auth there, a caller without a token gets a 401, not a 422 that lists your schema fields. Throw `UnauthorizedError` to reject. Use `beforeRoute` for checks that need `ctx.validated`.

## Changing status and headers

Set `ctx.set.status` and `ctx.set.headers` from any hook or handler. See [Response Mutation](/docs/api/response-mutation).

## Related

- [Global Hooks](/docs/hooks/global)
- [Route Hooks](/docs/hooks/route-specific)
- [After Hooks](/docs/hooks/after)
- [Hook Return Types](/docs/hooks/return-types)
- [Hook Types](/docs/api/hook-types)
