---
sidebar_label: Nested Routes
---

# Nested Routes

Nested routes are built from folder depth: each folder under your `apiDir` adds one segment to the URL. You can mix static segments, [dynamic segments](/docs/routing/api/dynamic-routes), and [route groups](/docs/routing/api/route-groups) at any level.

Use nesting to model real structures, such as a user's posts.

## Example

```
api/users/route.ts            →  /api/users
api/users/[id]/route.ts       →  /api/users/:id
api/users/[id]/posts/route.ts →  /api/users/:id/posts
```

Each deeper folder extends the path. Static, dynamic, and grouped routes all nest the same way.

For each route type, see [Static API Routes](/docs/routing/api/static-routes), [Dynamic Routes](/docs/routing/api/dynamic-routes), and [Route Groups](/docs/routing/api/route-groups).

## Types for this feature

Nesting does not change the types. Each dynamic segment still needs a `params` schema in `schema.ts` to be typed.

✅ Correct — one schema for all segments, wrapped with `defineRoute`:

```typescript
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    const { userId, postId } = ctx.validated.params; // both typed
    return Response.json({ userId, postId });
});
```

```typescript
// schema.ts
export const GET = {
    params: z.object({
        userId: z.string(),
        postId: z.string(),
    }),
};
```

The manual generic — `BurgerContext<typeof GetSchema>` — is the same inference, written by hand.

❌ Wrong — a segment without a schema is `unknown`:

```typescript
export const GET = defineRoute(GetSchema, (ctx) => {
    ctx.validated.params.missing; // ❌ Property 'missing' does not exist
});
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
