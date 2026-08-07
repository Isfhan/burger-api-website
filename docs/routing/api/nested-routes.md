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


## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
