---
sidebar_label: JWT Auth
---

# JWT Auth Plugin

This plugin reads a JSON Web Token from the `Authorization: Bearer` header and checks its signature. The token payload is put on `ctx.user`.

## Install

```bash
burger-api add jwt-auth
```

To update the copy later, run `burger-api add jwt-auth --force`.

## Register

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { jwtAuth } from "../ecosystem/plugins/jwt-auth/jwt-auth";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(jwtAuth({ secret: process.env.JWT_SECRET }));
};
```

The secret must be at least 32 bytes. Make one with `openssl rand -base64 32`.

## Options

- `secret`: key for HMAC algorithms (HS256, HS384, HS512).
- `publicKey`: key for RS and ES algorithms.
- `algorithm`: default `"HS256"`.
- `issuer`, `audience`: claims the token must have.
- `requireExpiration`: reject tokens without `exp`. Default `true`.

The full list is in `ecosystem/plugins/jwt-auth/README.md`.

## Protect routes

Once registered, every route needs a valid token. Open a route with `auth: false` in its `config.ts`. Require a role with `roles`:

```ts title="api/health/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

- A missing or bad token gets `401`. A missing role gets `403`.
- The token is checked before validation, so `401` comes before `422`.
- A method export overrides the route default: `export const POST = { auth: true };`.
- WebSocket routes follow the same `config.ts` rule.

To type the `auth` key in `config.ts`, add this to `src/types.ts`:

```ts title="src/types.ts"
declare module "burger-api" {
  interface RouteConfig {
    auth?: boolean | { required?: boolean; roles?: string[] };
  }
}
```

## Sign tokens

Use `signJwt` in a login route. Set `expiresIn` (seconds), because tokens without `exp` are rejected.

```ts title="api/login/route.ts"
import type { BurgerContext } from "burger-api";
import { signJwt } from "../../../ecosystem/plugins/jwt-auth/jwt-auth";

export async function POST(ctx: BurgerContext) {
  // Check the credentials first, then sign.
  const token = await signJwt(
    { sub: "user-123", roles: ["admin"] },
    { secret: process.env.JWT_SECRET!, expiresIn: 3600 }
  );
  return Response.json({ token });
}
```

```ts title="api/login/config.ts"
export default { auth: false };
```

## Use it in a handler

```ts title="api/me/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ userId: ctx.user?.sub });
}
```

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [OIDC](/docs/ecosystem/oidc)
- [Authentication Example](/docs/examples/authentication)
