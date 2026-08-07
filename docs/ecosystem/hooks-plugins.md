---
sidebar_label: Hooks & Plugins
---

# Hooks and Plugins

The BurgerAPI ecosystem ships two kinds of packages, plus AI agent skills. See [Ecosystem](/docs/ecosystem/introduction) for the folder layout and CLI commands.

## Hooks

Hooks are small request lifecycle factories. They control when code runs on a request.

- **What they do:** run at a named lifecycle stage (`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`).
- **Where they live:** `ecosystem/hooks/` after install.
- **Where you compose them:** `src/hooks.ts` (global) or a route's `hooks.ts` (route-specific).
- **Examples:** cors, logger, rate-limiter, compression, timeout, security-headers.

```ts title="src/hooks.ts"
import { cors } from "../ecosystem/hooks/cors/cors";

export const onRequest = [cors({ origin: ["https://app.example.com"] })];
```

## Plugins

Plugins are application extensions. They can register hooks, register providers, and extend `BurgerContext`.

- **What they do:** integrate with the application, often combining hooks with route `config.ts` (for example, auth).
- **Where they live:** `ecosystem/plugins/` after install.
- **Where you register them:** `src/plugins.ts` via `burger.usePlugin(...)`.
- **Examples:** jwt-auth, api-key, session, oidc, basic-auth, env.

```ts title="src/plugins.ts"
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger) => {
  burger.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
};
```

## Which one to use?

- Need code to run around requests, like adding headers or logging? Use a **hook**.
- Need an application feature like authentication or environment validation? Use a **plugin**.

Hooks control the request lifecycle. Plugins extend the application. They are separate concepts. Do not treat plugins as a replacement for hooks.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
- [CLI Add](/docs/cli/add)
