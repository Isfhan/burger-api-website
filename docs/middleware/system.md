---
sidebar_label: Hook System
---

# Hook System

BurgerAPI uses a **hook-based request lifecycle**. Hooks are not a traditional middleware stack renamed. They are named stages with clear jobs.

**Hooks** control when code runs on a request.  
**Plugins** extend the application (and may register hooks). Keep them separate.

## Six hooks (vision)

| Hook | When |
|------|------|
| `onRequest` | Request enters the app |
| `transform` | After routing, before validation (context decoration) |
| `beforeRoute` | After validation, before the handler |
| `afterRoute` | After the handler returns |
| `mapResponse` | Before the response is sent (headers, cookies, etc.) |
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

Request hooks run Framework → Plugin → Global → Route.  
Response and error hooks run in reverse (Route first).

There is **no** folder or group inheritance of hooks. Each route directory is self-contained.

## Route convention files

Alongside `route.ts`:

- `hooks.ts` : route hooks  
- `schema.ts` : validation  
- `openapi.ts` : OpenAPI  
- `config.ts` : route options (auth, cache, timeout, …)

## Related

- [Global hooks](/docs/middleware/global)
- [Route hooks](/docs/middleware/route-specific)
- [Request lifecycle](/docs/architecture/request-lifecycle)
- [BurgerContext](/docs/architecture/burger-context)
