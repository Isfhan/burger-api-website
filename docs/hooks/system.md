---
sidebar_label: Hook System
---

# Hook System

BurgerAPI uses a **hook-based request lifecycle**. Six named stages with clear jobs, each returning a defined shape.

**Hooks** control when code runs on a request.  
**Plugins** extend the application (and may register hooks). Keep them separate.

## Six hooks (vision)

| Hook | When |
|------|------|
| `onRequest` | Request enters the app |
| `transform` | After routing, before validation (context decoration) |
| `beforeRoute` | After validation, before the handler |
| `afterRoute` | After the handler returns |
| `mapResponse` | Before the response is sent (final headers) |
| `onError` | Any error in the lifecycle |

```
onRequest → Routing → transform → Validation → beforeRoute
  → Handler → afterRoute → mapResponse
```

Errors jump to `onError`.

## Scopes

1. Framework  
2. Plugin  
3. Global (`src/hooks.ts`)  
4. Route (`api/**/hooks.ts`)

Request hooks run Framework → Plugin → Global → Route. Response hooks (`afterRoute`, `mapResponse`) run Global → Route → Plugin → Framework. Error hooks (`onError`) run nearest-first, Route → Global.

There is **no** folder or group inheritance of hooks. Each route directory is self-contained.

## Route convention files

Alongside `route.ts`:

- `hooks.ts` : route hooks  
- `schema.ts` : validation  
- `openapi.ts` : OpenAPI  
- `config.ts` : route options (auth, cache, timeout, …)

## Types for this feature

Each hook point has its own type. TypeScript checks the return value of your hook against that type.

The types you use (all from `burger-api`):

- `ForwardHook` — for `onRequest` and `beforeRoute`: returns `Response` (stop) or `undefined` (continue)
- `ResponseHook` — for `afterRoute` and `mapResponse`: can also return a function to change the response
- `ErrorHook` — for `onError`: takes `(error, ctx)`, returns `Response` or `undefined`
- `RouteHooks` — the object with all hook points, for typing `hooks.ts` files

✅ Correct — each hook returns something from its contract:

```typescript
// hooks.ts
import type { RouteHooks } from "burger-api";

export const beforeRoute: RouteHooks["beforeRoute"] = [
    (ctx) => new Response("blocked", { status: 401 }), // stop
    () => undefined, // continue
];

export const afterRoute: RouteHooks["afterRoute"] = [
    (ctx) => (res) => res, // change the response
];
```

❌ Wrong — a hook returns a value that is not in the contract:

```typescript
export const beforeRoute: RouteHooks["beforeRoute"] = [
    () => 42, // ❌ Type 'number' is not assignable to 'Response | undefined'
];
```

The full rules for each return value are on the [Hook Return Types](/docs/hooks/return-types) page. See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Global hooks](/docs/hooks/global)
- [Route hooks](/docs/hooks/route-specific)
