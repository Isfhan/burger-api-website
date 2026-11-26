---
sidebar_label: Hooks
---

# Hooks

Hooks control when code runs on a request. They are named stages in the request lifecycle:

`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`.

Forward hooks (`onRequest`, `beforeRoute`) can return a `Response` to skip the handler and every later forward hook. Response mappers returned by earlier hooks still run, and so do `afterRoute` and `mapResponse`. That keeps headers such as CORS on early responses like a 401 or 429.

```ts
// src/hooks.ts
import { cors } from "../ecosystem/hooks/cors/cors";

export const onRequest = [
  cors({ origin: ["https://app.example.com"] }),
  () => new Response("Too many requests", { status: 429 }),
];
```

The second hook short-circuits the request. The handler and later forward hooks do not run, but the CORS mapper from the first hook still applies to the 429.

Response hooks (`afterRoute`, `mapResponse`) run after the handler. Returning a `Response` replaces the current response and later hooks still run; returning a function transforms it. `onError` returns a `Response` to handle an error. Returning `undefined` continues.

Hooks live in two scopes:

- Global: `src/hooks.ts`, for every request.
- Route: `api/**/hooks.ts`, for a single route directory.

Plugins are a separate concept: they extend the application and may register hooks. Keep the two separate.

See [Hook System](/docs/hooks/system) for the full model: scope order, route convention files, and the return contract. See [Ecosystem](/docs/ecosystem/introduction) for how hooks and plugins are packaged.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
