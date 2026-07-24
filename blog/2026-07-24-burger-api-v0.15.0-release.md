---
slug: burger-api-v0.15.0-release
title: BurgerAPI v0.15.0 Released
authors: [isfhan]
tags: [release, hooks, lifecycle, global-hooks]
---

**v0.15.0 completes the hooks foundation: global hooks are auto-discovered at the app root, vision hook names work alongside legacy names, and group inheritance is fully removed.**

<!-- truncate -->

## Global hooks

Define app-wide hooks in `hooks.ts` at your app root (sibling of `index.ts`). The scanner auto-discovers them and applies to every request.

When `apiDir` is `./src/api`, global hooks live in `./src/hooks.ts`.
When `apiDir` is `./api`, global hooks live in `./hooks.ts`.

```ts
// hooks.ts (at app root, sibling of index.ts)
export const beforeRoute = [
  (ctx) => {
    console.log('before every route');
  },
];
```

Route-specific hooks go in `api/**/hooks.ts`. They run after global hooks.

```ts
// api/users/hooks.ts
export const beforeRoute = [
  (ctx) => {
    console.log('before /users routes only');
  },
];
```

## Hook name aliases

The vision defines six hook points. You can use either the vision names or the legacy names. The framework normalizes at compile time.

| Vision Name | Legacy Name | Purpose |
|-------------|-------------|---------|
| `onRequest` | - | Request entry: logging, CORS, early rejection |
| `transform` | `provide` | Context decoration: session, user, tenant |
| `beforeRoute` | `beforeHandle` | Auth, guards after validation |
| `afterRoute` | `afterHandle` | Post-handler response work |
| `mapResponse` | `onResponse` | Final response decoration |
| `onError` | `onError` | Error handling |

Both work. Vision names take precedence when legacy names are absent.

## Self-contained routes

Group inheritance is removed. Each route directory is fully independent. Groups only strip from the URL path.

Convention files in a route directory:

| File | Purpose |
|------|---------|
| `route.ts` | HTTP method handlers |
| `schema.ts` | Validation schemas |
| `hooks.ts` | Route-specific lifecycle hooks |
| `openapi.ts` | OpenAPI metadata |
| `config.ts` | Route options (auth, cache, timeout) |

`use.ts` and `webhook.ts` are removed. Use ecosystem plugins instead.

## Execution priority

```
Request:  Framework > Plugin > Global > Route
Response: Route > Global > Plugin > Framework
```

## Upgrading

Install the latest version:

```bash
bun add burger-api@latest
bun add -d @burger-api/cli@latest
```

No breaking changes to your route handlers. If you used `beforeHandle`, it still works. If you prefer the vision names, switch to `beforeRoute`. The old names will be removed in a future release.
