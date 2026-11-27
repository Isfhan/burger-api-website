---
sidebar_label: Authentication
---

# Authentication Example

Protect routes with an auth plugin. This example uses API keys.

## 1. Add the plugin

```bash
burger-api add api-key
```

## 2. Register it

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(apiKey({ keys: [process.env.API_KEY!] }));
};
```

Now every route needs a valid key. A request without one gets `401`.

## 3. Open public routes

```ts title="src/api/health/config.ts"
export default { auth: false };
```

## 4. Read the identity

```ts title="src/api/admin/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ apiKey: ctx.apiKey });
}
```

The handler runs only after the key passes. For JWT, use `burger-api add jwt-auth`; the user is then on `ctx.user`.

See [API Key Auth](/docs/ecosystem/api-key-auth) and [JWT Auth](/docs/ecosystem/jwt-auth).

## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
