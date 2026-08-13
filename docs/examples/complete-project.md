---
sidebar_label: Complete Project Example
---

# Complete Project Example

A full BurgerAPI project follows the 1.0 layout. App-level files live in `src/`, each with one job:

```
src/
├── index.ts           # Burger instance + burger.serve(port)
├── plugins.ts         # register plugins
├── providers.ts       # declare shared services
├── hooks.ts           # global hooks (onRequest, beforeRoute, ...)
├── openapi.config.ts  # OpenAPI metadata and docs config
└── api/               # routes
    └── products/
        ├── route.ts   # export async function GET(ctx: BurgerContext)
        ├── schema.ts  # per-method validation schemas
        ├── hooks.ts   # route hooks
        ├── openapi.ts # per-method OpenAPI metadata
        └── config.ts  # route options (auth, cache, timeout, ...)
```

```ts title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({ apiDir: "./src/api" });

burger.serve(4000);
```

```ts title="src/plugins.ts"
export default (burger) => {
  burger.usePlugin(/* ... */);
};
```

```ts title="src/providers.ts"
export default (burger) => {
  burger.provide("db", createDb());
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

Build-time concerns (dirs, prefixes, debug) live in `burger.build.ts` and are used by the CLI only. Runtime options belong in `new Burger({...})`, `src/plugins.ts`, and route `config.ts`.

Use `burger-api create my-app` to scaffold this structure. Run the dev server with `bun run dev`; build and start with `burger-api build` and `burger-api start`. For step-by-step builds, see the [Blog API](/docs/tutorials/blog-api) and [Todo API](/docs/tutorials/todo-api) tutorials.


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
