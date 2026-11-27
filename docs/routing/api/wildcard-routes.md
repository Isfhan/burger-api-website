---
sidebar_label: "Wildcard Routes"
---

# Wildcard Routes

A wildcard route matches every path below a point in the URL. Name a folder `[...]`. The captured segments are in `ctx.wildcardParams`, an array of strings.

## Example

```
api/
  files/
    [...]/
      route.ts         → /api/files/*
```

```typescript title="api/files/[...]/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const segments = ctx.wildcardParams;

  if (segments.length === 0) {
    return Response.json({ error: "No file path" }, { status: 400 });
  }

  return Response.json({ path: segments.join("/") });
}
```

```
GET /api/files                         → wildcardParams = []
GET /api/files/report.pdf              → wildcardParams = ["report.pdf"]
GET /api/files/docs/2024/report.pdf    → wildcardParams = ["docs", "2024", "report.pdf"]
```

The wildcard also matches its base path (`/api/files`) with an empty array. Check `segments.length` if you need to handle that case.

## With a dynamic segment

You can put a wildcard under a `[param]` folder. Validate the param with a schema. Check the wildcard segments yourself: schemas do not validate them.

```
api/users/[userId]/[...]/route.ts   → /api/users/:userId/*
```

```typescript title="api/users/[userId]/[...]/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { userId } = ctx.params;
  const rest = ctx.wildcardParams;
  // GET /api/users/123/posts/456 → userId = "123", rest = ["posts", "456"]
  return Response.json({ userId, rest });
}
```

## Rules to know

- **Use `[...]` only.** A named folder such as `[...slug]` is an error in dev and in builds. Read `ctx.wildcardParams` instead.
- **Wildcards match last.** Order is static, then `[param]`, then `[...]`. A wildcard only gets requests no other route matches.
- **A wildcard must be the last folder.** A folder after `[...]`, or two wildcards at the same level, fails at startup.
- **Not typed by name.** `ctx.wildcardParams` is always `string[]`. If you need named, typed values, use [dynamic segments](./dynamic-routes.md).

Example of the order:

```
api/admin/settings/route.ts    → /api/admin/settings
api/admin/[section]/route.ts   → /api/admin/users
api/admin/[...]/route.ts       → /api/admin/users/list
```

## Related

- [Static Routes](./static-routes.md)
- [Dynamic Routes](./dynamic-routes.md)
- [Route Groups](./route-groups.md)
- [File-Based Routing](/docs/routing/file-based-routing)
