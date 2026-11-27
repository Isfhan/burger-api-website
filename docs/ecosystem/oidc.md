---
sidebar_label: OIDC
---

# OIDC Plugin

This plugin checks tokens from an OpenID Connect provider, such as Google, Auth0 or Entra ID. It verifies the token with the provider's public keys and puts the claims on `ctx.user`.

## Install

```bash
burger-api add oidc
```

To update the copy later, run `burger-api add oidc --force`.

## Register

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { oidc } from "../ecosystem/plugins/oidc/oidc";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(
    oidc({
      issuer: "https://accounts.google.com",
      audience: "my-client-id",
    })
  );
};
```

## Options

- `issuer`: provider URL. Required. Must match the token `iss` exactly.
- `audience`: when set, the token `aud` must contain it.
- `algorithms`: allowed algorithms. Default `["RS256", "ES256"]`. Only these two are supported.

The full list is in `ecosystem/plugins/oidc/README.md`.

## Protect routes

Once registered, every route needs a valid token. Open a route with `auth: false` in its `config.ts`. Require a role with `roles` (read from the token's `roles` claim):

```ts title="api/public/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

- A missing or bad token gets `401`. A missing role gets `403`.
- The token is checked before validation, so `401` comes before `422`.
- If the provider cannot be reached, the request gets `503`. The client can retry.

## Use it in a handler

```ts title="api/me/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ sub: ctx.user?.sub, email: ctx.user?.email });
}
```

All token claims are on `ctx.user`.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Ecosystem](/docs/ecosystem/introduction)
