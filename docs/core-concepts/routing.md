---
sidebar_label: Routing
---

# Routing

BurgerAPI uses file-based routing. The folders and files under your API directory become HTTP routes. You do not register routes by hand.

- `products/route.ts` becomes `/api/products`.
- A folder named `[id]` captures one segment into `ctx.params.id`.
- A folder named `[...]` captures the rest of the path into `ctx.wildcardParams`.
- A folder named `(group)` organizes files and does not appear in the URL.

When several routes match, the most specific wins: static, then `[param]`, then `[...]`.

See [File-Based Routing](../routing/file-based-routing.md) for the full guide.

## Related

- [Applications](/docs/core-concepts/applications)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
