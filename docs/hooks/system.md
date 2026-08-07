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

## Related

- [Global hooks](/docs/hooks/global)
- [Route hooks](/docs/hooks/route-specific)
