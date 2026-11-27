---
sidebar_label: Complete Project Example
---

# Complete Project Example

A full BurgerAPI project. Each file has one job:

```
burger.build.ts        # build settings (CLI only)
src/
├── index.ts           # new Burger(...) + serve()
├── plugins.ts         # register plugins
├── providers.ts       # shared services
├── hooks.ts           # global hooks
├── openapi.config.ts  # OpenAPI and docs settings
├── types.ts           # your type extensions
└── api/
    └── products/
        ├── route.ts   # handlers
        ├── schema.ts  # validation
        ├── hooks.ts   # route hooks
        ├── openapi.ts # OpenAPI metadata
        └── config.ts  # route options (auth, ...)
```

```ts title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({ apiDir: "./src/api" });

burger.serve(4000);
```

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";

export default (burger: PluginRegistrar) => {
  // burger.usePlugin(myPlugin);
};
```

```ts title="src/providers.ts"
import type { ProviderRegistrar } from "burger-api";

export default (burger: ProviderRegistrar) => {
  // burger.provide("db", db);
};
```

```ts title="src/hooks.ts"
import type { BurgerContext } from "burger-api";

export const onRequest = [
  async (ctx: BurgerContext) => {
    // runs for every request
  },
];
```

Create this layout with `burger-api create my-app`. Run `bun run dev` while you work. For production, run `burger-api build`, then `burger-api start`.

For step-by-step guides, see the [Blog API](/docs/tutorials/blog-api) and [Todo API](/docs/tutorials/todo-api) tutorials.

## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
