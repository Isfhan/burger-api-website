---
sidebar_label: Dynamic Routes
---

# Dynamic Routes

Dynamic routes capture part of the URL as a value you can read in your handler. Use a folder name in square brackets, like `[id]`, and the captured value appears in `req.params`.

Use dynamic routes for resources addressed by an id or slug, such as `/api/products/123`.

## Example

```
api/products/[id]/route.ts  →  /api/products/123
```

A request to `/api/products/123` gives `req.params.id === "123"`.

For multiple segments, validation with Zod, and matching rules, see [Dynamic Routes](/docs/routing/api/dynamic-routes).


## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static Routes](/docs/routing/static-routes)
- [Wildcard Routes](/docs/routing/wildcard-routes)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
