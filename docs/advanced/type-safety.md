---
sidebar_label: Type Safety
---

# Type Safety

BurgerAPI is designed for TypeScript:

- **BurgerContext** is generic over the route's schema: annotate the handler with `BurgerContext<typeof GET>` (imported from `./schema`) so `ctx.validated` is typed. `ctx.validated` can carry `params`, `query`, `headers`, `cookies`, and `body` — each only when that slot has a schema.
- **Hooks** are typed as `Hook` or `Hook[]` (`ErrorHook` for `onError`). A hook returns `undefined` to continue, a `Response` to short-circuit, or a function to transform the response (`afterRoute`, `mapResponse`).
- **Pre-built routes** are passed as `apiRoutes` / `pageRoutes` (produced by `burger-api build`); the CLI and build tooling own the `RouteDefinition` / `PageDefinition` shapes, which are not exported from the package root.

Define Zod schemas in `schema.ts` and use `z.infer<typeof GET.query>` (etc.) for handler parameters. Shared shapes can be registered as [models](/docs/validation/models) and referenced by name. See [Validation](/docs/validation/zod) and [Configuration](/docs/core/configuration).


## Related

- [Error Handling Patterns](/docs/advanced/error-handling)
- [Deployment](/docs/advanced/deployment)
