---
sidebar_label: Applications
---

# Applications

A BurgerAPI app is an instance of the `Burger` class. Create it in `src/index.ts` and start it with `serve`.

```ts title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
});

burger.serve(4000);
```

## Where things live

Each concern has its own file:

| Concern | Where |
|---------|-------|
| Runtime options | `new Burger({...})` in `src/index.ts` |
| Routes | `src/api/**/route.ts`. See [Routing](/docs/core-concepts/routing) |
| Global hooks | `src/hooks.ts`. See [Hook System](/docs/hooks/system) |
| Plugins | `src/plugins.ts`. See [Hooks and Plugins](/docs/ecosystem/hooks-plugins) |
| Shared services | `src/providers.ts`. See [Providers](/docs/core-concepts/providers) |
| OpenAPI metadata | `src/openapi.config.ts`. See [OpenAPI & Swagger](/docs/api/openapi) |
| Build settings | `burger.build.ts` (CLI only) |

All files except `src/index.ts` are optional. For the options of `new Burger`, see [Server Options](/docs/core/server-options).

## Related

- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Configuration](/docs/core/configuration)
- [Burger Class](/docs/core/burger-class)
