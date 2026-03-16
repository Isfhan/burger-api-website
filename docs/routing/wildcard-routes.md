---
sidebar_label: Wildcard Routes
---

# Wildcard Routes

Wildcard routes match **the rest of the path** using a folder named `[...param]`. They are useful for catch-all or proxy-style endpoints.

## Syntax

- Folder name: `[...paramName]` — captures all remaining segments.
- Example: `api/files/[...path]/route.ts` matches `/api/files/a`, `/api/files/a/b/c`, etc. The full path is in `req.params.path` (as a string or array depending on the framework version).

Wildcards are matched after static and dynamic routes. See the full guide for priority and examples.

For full documentation and routing order, see [Wildcard Routes](/docs/routing/api/wildcard-routes).
