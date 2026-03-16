---
sidebar_label: Type Safety
---

# Type Safety

BurgerAPI is designed for TypeScript:

- **BurgerRequest** is generic; use `BurgerRequest<{ query: MyQuery; body: MyBody }>` when you have validation so `req.validated` is typed.
- **Middleware** is typed as `Middleware`; return type is `BurgerNext | Response`.
- **RouteDefinition** and **PageDefinition** are exported for pre-built route lists and custom tooling.

Define Zod schemas and use `z.infer<typeof schema.get.query>` (etc.) for handler parameters. See [Validation](/docs/request-handling/validation) and [Configuration](/docs/core/configuration).
