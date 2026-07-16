---
sidebar_label: Wildcard Routes
---

# Wildcard Routes

Wildcard routes capture the rest of the URL after a point. Use a folder named `[...path]`, and all remaining segments are collected for your handler in `req.wildcardParams`.

Use wildcard routes for catch-all or proxy-style endpoints, such as file paths or auth callbacks.

## Example

```
api/files/[...path]/route.ts  →  /api/files/a/b/c
```

A request to `/api/files/a/b/c` captures the segments `["a", "b", "c"]`.

Wildcards are matched last, after static and dynamic routes. For routing order, nesting, and real-world examples, see [Wildcard Routes](/docs/routing/api/wildcard-routes).


## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static Routes](/docs/routing/static-routes)
- [Dynamic Routes](/docs/routing/dynamic-routes)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
