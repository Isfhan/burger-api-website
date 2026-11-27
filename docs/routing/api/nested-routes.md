---
sidebar_label: Nested Routes
---

# Nested Routes

Each folder under your `apiDir` adds one segment to the URL. You can mix static folders, [dynamic segments](/docs/routing/api/dynamic-routes) and [route groups](/docs/routing/api/route-groups) at any depth.

## Example

```
api/users/route.ts                     →  /api/users
api/users/[id]/route.ts                →  /api/users/:id
api/users/[id]/posts/route.ts          →  /api/users/:id/posts
api/users/[id]/posts/[postId]/route.ts →  /api/users/:id/posts/:postId
```

A deeper route gets every parameter above it:

```typescript title="api/users/[id]/posts/[postId]/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { id, postId } = ctx.params;
  return Response.json({ id, postId });
}
```

Each route folder is separate. A child route does not inherit `schema.ts`, `hooks.ts` or `config.ts` from its parent folder. Add the files you need next to each `route.ts`.

## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
