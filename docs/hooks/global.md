---
sidebar_label: Global Hooks
---

# Global Hooks

Global hooks run on every request. Define them in `src/hooks.ts` with one named export per hook point:

```ts
// src/hooks.ts
import type { BurgerContext } from "burger-api";

export const beforeRoute = [
  async (ctx: BurgerContext) => {
    if (!ctx.headers.get("authorization")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  },
];
```

You can export any of the six hook points: `onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`.

Hook factories from `ecosystem/hooks/` compose here too:

```ts
// src/hooks.ts
import { cors } from "../ecosystem/hooks/cors/cors";
import { logger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [logger(), cors({ origin: ["https://app.example.com"] })];
```

Scope order: Framework → Plugin → Global → Route for request hooks. Response hooks (`afterRoute`, `mapResponse`) and error hooks (`onError`) run nearest-first: Route → Global → Plugin → Framework.

## transform

`transform` is not a function: it is a map of field names to factory functions. Each factory receives `ctx` and its result is shallow-assigned onto the context before validation runs, so handlers and later hooks can read it.

```ts
// src/hooks.ts
import type { GlobalHooks } from "burger-api";

export const transform: GlobalHooks["transform"] = {
  tenant: (ctx) => ctx.headers.get("x-tenant"),
};
```

Built-in fields are reserved and cannot be replaced: `params`, `wildcardParams`, `query`, `cookies`, `headers`, `method`, `url`, `signal`, `body`, `bodyUsed`, `validated`, `set`, `route`, `request`, `services`, `config`, `env`, `executionCtx`, and internal `_`-prefixed keys. A transform entry with a reserved name is dropped (with a warning in debug mode). Global transform entries apply before route-level entries, so a route can override a global value.

Use global hooks for logging, CORS, auth checks, or any logic that should run for all routes. See [Hook System](/docs/hooks/system) and [Ecosystem](/docs/ecosystem/introduction).


## Related

- [Hook System](/docs/hooks/system)
- [Route Hooks](/docs/hooks/route-specific)
- [Hook Return Types](/docs/hooks/return-types)
- [Request Context](/docs/core/request-handling)
