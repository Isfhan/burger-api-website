---
sidebar_label: API Key Auth
---

# API Key Auth Plugin

This plugin reads an API key from a request header and checks it. A valid key is put on `ctx.apiKey`.

## Install

```bash
burger-api add api-key
```

To update the copy later, run `burger-api add api-key --force`.

## Register

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(apiKey({ keys: [process.env.API_KEY!] }));
};
```

## Options

- `keys`: list of valid keys.
- `validate`: async function to check a key yourself, for example against a database.
- `header`: header to read. Default `"X-API-Key"`.

The full list is in `ecosystem/plugins/api-key/README.md`.

## Protect routes

Once registered, every route needs a valid key. Open a route with `auth: false` in its `config.ts`:

```ts title="api/health/config.ts"
export default { auth: false };
```

Change one method only with a method export:

```ts title="api/items/config.ts"
export default { auth: false };      // GET stays public
export const POST = { auth: true };  // POST needs a key
```

A missing or wrong key gets `401`. The key is checked before validation, so a bad key gets `401` even when the body is invalid. WebSocket routes follow the same `config.ts` rule.

## Use it in a handler

```ts title="api/private/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ apiKey: ctx.apiKey });
}
```

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Authentication Example](/docs/examples/authentication)
