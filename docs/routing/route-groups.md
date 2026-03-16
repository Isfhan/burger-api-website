---
sidebar_label: Route Groups
---

# Route Groups

Route groups let you **organize route files** in folders without changing the URL. Use parentheses in the folder name: `(groupName)`. The parenthesized folder is ignored when building the route path.

## Example

- `api/(admin)/users/route.ts` → `/api/users` (not `/api/admin/users`).
- Use `(v1)` or `(api)` to group by version or area while keeping flat URLs.

For full documentation and examples, see [Route Groups](/docs/routing/api/route-groups).
