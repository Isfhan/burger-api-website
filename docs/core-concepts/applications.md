---
sidebar_label: Applications
---

# Applications

A BurgerAPI application is an instance of the `Burger` class. You configure it once and start it with `serve`.

```ts
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
  title: "My API",
  version: "1.0.0",
});

burger.serve(4000);
```

The application brings together:

- **Routes** discovered from the file system (see [Routing](./routing.md)).
- **Hooks** that run at named stages of the request lifecycle (see [Hook System](/docs/hooks/system)).
- **Plugins** that extend the application, registered with `burger.usePlugin(...)`.
- **Providers** that inject shared services into `ctx.services`, registered with `burger.provide(...)`.
- **Validation** schemas that guard requests (see [Validation](./validation.md)).
- **OpenAPI** documentation generated automatically from your routes (see [OpenAPI](./openapi.md)).

## Where things live

Scaffolded projects split configuration across convention files:

| Concern | Where |
|---------|-------|
| Runtime options | `new Burger({...})` in `src/index.ts` |
| Global hooks | `src/hooks.ts` |
| Plugins | `src/plugins.ts` via `burger.usePlugin(...)` |
| Providers | `src/providers.ts` via `burger.provide(...)` |
| Build-time settings | `burger.build.ts` (CLI only) |

Runtime options such as `apiDir`, `apiPrefix`, and `version` are described in [Server Options](../core/server-options.md) and [Configuration](../core/configuration.md).

## Related

- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
- [Ecosystem](/docs/ecosystem/introduction)
