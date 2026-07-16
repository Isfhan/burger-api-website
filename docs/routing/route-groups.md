---
sidebar_label: Route Groups
---

# Route Groups

Route groups let you organize route files in folders without changing the URL. Wrap a folder name in parentheses, like `(admin)`, and BurgerAPI ignores it when building the path.

Use route groups to group routes by area, access level, or version while keeping URLs clean.

## Example

```
api/(admin)/users/route.ts  →  /api/users
```

The `(admin)` folder does not appear in the URL.

For nesting, combining with other route types, and naming tips, see [Route Groups](/docs/routing/api/route-groups).


## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static Routes](/docs/routing/static-routes)
- [Dynamic Routes](/docs/routing/dynamic-routes)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
