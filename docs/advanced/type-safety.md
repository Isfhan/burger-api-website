---
sidebar_label: Type Safety
---

# Type Safety

BurgerAPI is designed for TypeScript:

- **BurgerRequest** is generic; use `BurgerRequest<{ query: MyQuery; body: MyBody }>` when you have validation so `req.validated` is typed. `req.validated` can carry `params`, `query`, `headers`, `cookie`, and `body` — each only when that slot has a schema.
- **Middleware** is typed as `Middleware`; return type is `BurgerNext | Response`.
- **RouteDefinition** and **PageDefinition** are exported for pre-built route lists and custom tooling.

Define Zod schemas and use `z.infer<typeof schema.get.query>` (etc.) for handler parameters. Shared shapes can be registered as [models](/docs/validation/models) and referenced by name. See [Validation](/docs/validation/zod) and [Configuration](/docs/core/configuration).


## Related

- [Error Handling Patterns](/docs/advanced/error-handling)
- [Deployment](/docs/advanced/deployment)
