---
sidebar_label: API Key Auth
---

# API Key Auth Plugin

The API key auth plugin reads an API key from a header, validates it against a static list or a custom function, and attaches it to the context. Install it with:

```bash
burger-api add api-key
```

## Usage

Register the plugin in `src/plugins.ts`:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(apiKey({ keys: ["demo-api-key-123"] }));
};
```

## Options

- `keys`: static list of valid keys.
- `validate`: async function for dynamic validation, for example against a database.
- `header`: header name to read the key from. Default `"X-API-Key"`.
- `extract`: custom extraction function, for example from the query string.
- `attachToContext`: attach the key to the context. Default `true`.

After successful validation the key is available as `ctx.apiKey`:

```ts title="api/private/route.ts"
export async function GET(ctx: BurgerContext) {
  return Response.json({ apiKey: ctx.apiKey });
}
```

## Route configuration

The plugin integrates with route `config.ts`. Open routes opt out with `auth: false`; protected routes require auth:

```ts title="api/public/health/config.ts"
export default { auth: false };
```

```ts title="api/private/config.ts"
export default { auth: { required: true } };
```

A missing or invalid key produces `401 Unauthorized`. The framework core stays auth-agnostic; authentication is always a plugin.

Check the package README in `ecosystem/plugins/api-key/` for the full option list and security notes.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
