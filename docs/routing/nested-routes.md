---
sidebar_label: Nested Routes
---

# Nested Routes

Nested routes are created by **folder depth** under your `apiDir`: each folder adds a segment to the URL. Combine static segments, [dynamic segments](/docs/routing/dynamic-routes), and [route groups](/docs/routing/route-groups) to build nested paths.

## Example

- `api/users/route.ts` → `/api/users`
- `api/users/[id]/route.ts` → `/api/users/:id`
- `api/users/[id]/posts/route.ts` → `/api/users/:id/posts`

For static and dynamic behavior, see [Static Routes](/docs/routing/static-routes), [Dynamic Routes](/docs/routing/dynamic-routes), and [Route Groups](/docs/routing/route-groups).
