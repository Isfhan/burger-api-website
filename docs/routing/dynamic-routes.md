---
sidebar_label: Dynamic Routes
---

# Dynamic Routes

Dynamic routes capture **URL segments** as parameters. Use folder names in square brackets, e.g. `[id]` or `[slug]`. The captured values are available in your handler as `req.params`.

## Syntax

- Folder name: `[paramName]` — one segment.
- Example: `api/products/[id]/route.ts` → `/api/products/123` with `req.params.id === "123"`.

For multiple segments or validation, see the full guide.

For full documentation, examples, and validation, see [Dynamic Routes](/docs/routing/api/dynamic-routes).
