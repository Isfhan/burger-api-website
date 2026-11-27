---
sidebar_label: Global Hooks
---

# Global Hooks

Global hooks run for every request. Put them in `src/hooks.ts`, with one named export per hook.

```ts title="src/hooks.ts"
import { cors } from "../ecosystem/hooks/cors/cors";
import { logger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [logger(), cors({ origin: ["https://app.example.com"] })];
```

You can export any of the six hooks: `onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`. Ready-made hooks such as `cors` and `logger` come from the [Ecosystem](/docs/ecosystem/introduction).

Global `onRequest`, `afterRoute` and `mapResponse` run for every response, including 404s, pages, assets and `/docs`. Global `transform` and `beforeRoute` run for matched API routes.

## transform

`transform` is an object, not a function. Each key is a field name. Each value is a function that gets `ctx` and returns the field's value. The field is added to `ctx` before validation, so later hooks and the handler can read it.

```ts title="src/hooks.ts"
import { UnauthorizedError } from "burger-api";
import type { GlobalHooks } from "burger-api";

export const transform: GlobalHooks["transform"] = {
  user: (ctx) => {
    const token = ctx.headers.get("authorization");
    if (!token) {
      throw new UnauthorizedError("Missing token");
    }
    return { token };
  },
};
```

Rules:

- You cannot use a name that `ctx` already has, such as `params`, `query` or `set`. The app fails at startup if you do.
- A route `transform` with the same name overrides the global one.
- Add the field to `BurgerContext` in `src/types.ts` to type it. See [Providers](/docs/core-concepts/providers#type-the-service).

## Related

- [Hook System](/docs/hooks/system)
- [Route Hooks](/docs/hooks/route-specific)
- [Hook Return Types](/docs/hooks/return-types)
- [Request Context](/docs/core/request-handling)
