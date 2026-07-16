---
sidebar_label: Routing Engine
---

# Routing Engine

BurgerAPI routes requests with a **hybrid router** that combines two matching strategies:

- **Bun's native router** serves static paths. Bun dispatches these directly, so static traffic avoids a catch-all handler and stays as fast as the runtime allows.
- **A trie** matches dynamic (`:param`) and wildcard (`*`) paths. The trie encodes the route tree so lookups are cheap even with many routes.

## Matching priority

When more than one pattern could match a path, the router resolves in this order:

1. **Static** — an exact path segment (e.g. `/users/me`).
2. **Dynamic** — a single parameter segment (e.g. `/users/:id`).
3. **Wildcard** — a catch-all segment (e.g. `/files/*`).

This priority is what lets you define both `/users/me` and `/users/:id` and have each match the right requests.

## Route discovery

Routes are discovered from the file system: files and folders under your API directory become routes, with `[param]` and `[...slug]` as dynamic and wildcard segments. In production builds, routes can be supplied pre-built so the running server does not scan the filesystem at request time.

See [Routing](../routing/file-based-routing.md) for the full set of route shapes, including static, dynamic, wildcard, nested, and grouped routes.


## Related

- [Architecture Overview](/docs/architecture/overview)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
- [BurgerContext](/docs/architecture/burger-context)
- [Request Context](/docs/core/request-handling)
