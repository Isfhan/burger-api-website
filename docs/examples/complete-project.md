---
sidebar_label: Complete Project Example
---

# Complete Project Example

A full BurgerAPI project includes:

- **Entry:** `src/index.ts` with `new Burger({ apiDir, globalMiddleware, title, version })` and `serve(4000)`.
- **Routes:** `route.ts` files under `apiDir` with GET/POST/etc. and optional `schema`, `middleware`, `openapi`.
- **Middleware:** In `ecosystem/middleware/` or your own folder, imported and passed as `globalMiddleware` or per-route.

Use `burger-api create my-app` to scaffold this structure. For step-by-step builds, see the [Blog API](/docs/tutorials/blog-api) and [Todo API](/docs/tutorials/todo-api) tutorials.


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
