---
sidebar_label: Routing
---

# Routing

BurgerAPI uses file-based routing: the files and folders under your API directory become HTTP routes. A folder named `[id]` becomes a dynamic segment, and `[...slug]` becomes a catch-all.

Under the hood, a **hybrid router** matches each request on the fastest strategy:

- Static paths are served through Bun's native router.
- Dynamic (`:param`) and wildcard (`*`) paths are matched with a trie.

This keeps static traffic as fast as the runtime allows while still supporting expressive dynamic routes. See [Routing](../routing/file-based-routing.md) for the full reference, including static, dynamic, wildcard, nested, and grouped routes.


## Related

- [Applications](/docs/core-concepts/applications)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)

