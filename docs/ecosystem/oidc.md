---
sidebar_label: OIDC
---

# OIDC Plugin

The OIDC plugin verifies a token from an OpenID Connect provider against the provider's published signing keys. It checks expiry, issuer, audience, and roles, then puts the token claims on `ctx.user`. Use it when your tokens come from an identity provider such as Google, Auth0, or Entra ID rather than a secret you control.

Install it with:

```bash
burger-api add oidc
```

## Usage

Register the plugin in `src/plugins.ts`:

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

The plugin reads the discovery document from `<issuer>/.well-known/openid-configuration` the first time it has to verify a token. Verification runs in `beforeRoute`, so it finishes before the handler.

Public routes opt out with `auth: false`; protected routes require a token and may list roles:

```ts title="api/public/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

See [JWT Auth](/docs/ecosystem/jwt-auth) for typing `auth` in `RouteConfig`.

## Options

- `issuer`: provider issuer URL. Required. Must match the token `iss` exactly.
- `audience`: audience value. When set, the token `aud` must contain it. Default unset, so audience is not checked.
- `header`: header to read the token from. Default `"Authorization"`.
- `prefix`: prefix before the token. Default `"Bearer"`. Must match exactly, including case and the space.
- `clockTolerance`: allowed clock skew in seconds. Default `0`.
- `jwksCacheTtl`: how long fetched signing keys stay cached, in seconds. Default `3600`.
- `algorithms`: allowed token `alg` values. Default `["RS256", "ES256"]`.
- `requireExpiration`: reject tokens without an `exp` claim. Default `true`.

A token is also rejected when `nbf` is in the future or when `iss` differs from `issuer`.

## Roles

A route that lists `auth.roles` needs at least one match in the token's `roles` claim:

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin", "ops"] } };
```

Any listed role is enough. A non-array `roles` claim counts as no roles, so a string claim never matches by substring. An empty `roles: []`, or plain `auth: true`, means no role is required. If nothing matches, the route answers `403 Forbidden`.

## What the handler sees

`ctx.user` holds the verified token claims:

```ts title="api/me/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ sub: ctx.user?.sub, roles: ctx.user?.roles });
}
```

The plugin augments `BurgerAuthUser` with `sub`, `iss`, `aud`, `exp`, and `roles`. The full decoded payload is available, so provider-specific claims such as `email` are there too.

## Good to know

- When a token names a `kid` that is not in the cache, the plugin refetches the keys once and retries. Forced refetches are limited to one every 30 seconds, so forged `kid` values cannot hammer the provider.
- If discovery or the key set cannot be fetched, the plugin logs the error and answers `503`, not `401`. The token itself was never evaluated, so the client should retry.
- Only `RS256` and `ES256` are implemented. Adding another algorithm to `algorithms` does not enable it, and tokens that use it are rejected as invalid.
- `exp` equal to the current second already counts as expired. `clockTolerance` is the only allowance.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Ecosystem](/docs/ecosystem/introduction)
