---
sidebar_label: "Route Groups"
---

# Route Groups

A route group is a folder name in parentheses, such as `(admin)`. It helps you organize files. It does not appear in the URL.

## Example

```
api/
  (public)/
    products/
      route.ts         → /api/products
  (admin)/
    users/
      route.ts         → /api/users
      [userId]/
        route.ts       → /api/users/:userId
```

The URL is `/api/users`, not `/api/admin/users`. Groups work with dynamic and wildcard folders, and you can nest them.

| Folder | In the URL? | Example |
| --- | --- | --- |
| `(admin)/users/` | No | `/api/users` |
| `admin/users/` | Yes | `/api/admin/users` |

## Rules to know

### Groups do not apply files to their children

A group only changes the URL. A `hooks.ts` or `config.ts` inside `(admin)/` does not apply to the routes in it. Routes never inherit files from parent folders.

Put `hooks.ts` and `config.ts` next to each `route.ts` they should affect. To protect many routes at once, use a plugin or a global hook.

If a folder has convention files but no `route.ts`, BurgerAPI prints a startup warning:

```
[burger-api] (authenticated) has config.ts, hooks.ts but no route.ts, so they apply to nothing.
```

### Two routes cannot share a URL

Groups are removed from the path, so the same route in two groups gives the same URL. The app fails at startup:

```
api/(v1)/users/route.ts   → /api/users
api/(v2)/users/route.ts   → /api/users   ❌ startup error
```

If the version should be in the URL, use a normal folder: `api/v1/users/route.ts` → `/api/v1/users`.

## Related

- [Static Routes](./static-routes.md)
- [Dynamic Routes](./dynamic-routes.md)
- [Wildcard Routes](./wildcard-routes.md)
- [File-Based Routing](/docs/routing/file-based-routing)
