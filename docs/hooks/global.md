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
import { cors } from "./ecosystem/hooks/cors/cors";
import { logger } from "./ecosystem/hooks/logger/logger";

export const onRequest = [logger(), cors({ origin: ["https://app.example.com"] })];
```

Scope order: Framework → Plugin → Global → Route for request hooks. Response hooks (`afterRoute`, `mapResponse`) run Route → Global → Plugin → Framework. Error hooks (`onError`) run nearest-first, Route → Global.

Use global hooks for logging, CORS, auth checks, or any logic that should run for all routes. See [Hook System](/docs/hooks/system) and [Ecosystem](/docs/ecosystem/introduction).


## Related

- [Hook System](/docs/hooks/system)
- [Route Hooks](/docs/hooks/route-specific)
- [Hook Return Types](/docs/hooks/return-types)
- [Request Context](/docs/core/request-handling)
