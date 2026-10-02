---
sidebar_label: JWT Auth
---

# JWT Auth Plugin

The JWT auth plugin parses a JSON Web Token from the `Authorization` header, verifies the signature, and attaches the decoded payload to the context. Install it with:

```bash
burger-api add jwt-auth
```

## Usage

Register the plugin in `src/plugins.ts`:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { jwtAuth } from "../ecosystem/plugins/jwt-auth/jwt-auth";

export default (burger: PluginRegistrar) => {
  // HMAC secrets must be at least 32 bytes; the plugin throws at startup
  // with the byte count otherwise.
  burger.usePlugin(jwtAuth({ secret: process.env.JWT_SECRET }));
};
```

## Options

- `secret`: secret key for HMAC algorithms (HS256, HS384, HS512). A string secret must be at least 32 bytes; generate one with `openssl rand -base64 32`.
- `publicKey`: public key for asymmetric algorithms (RS256, RS384, RS512, ES256, ...).
- `algorithm`: signing algorithm. Default `"HS256"`.
- `header` / `prefix`: where to read the token. Defaults to the `Authorization` header with the `Bearer` prefix.
- `issuer`, `audience`: required claims.
- `clockTolerance`: clock skew allowance in seconds. Default `0`.
- `requireExpiration`: require an `exp` claim. Default `true`, so tokens without an expiry are rejected.

After a successful login flow the plugin attaches the decoded payload as `ctx.user`. The plugin augments `BurgerContext` with `user?: BurgerAuthUser & Record<string, unknown>`, so importing it in `src/plugins.ts` is enough for TypeScript to type `ctx.user` in your routes (no local cast needed):

```ts title="api/me/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ userId: ctx.user?.sub });
}
```

Route `config.ts` keys such as `auth` are typed too once you augment `RouteConfig` in `src/types.ts`:

```ts
declare module "burger-api" {
  interface RouteConfig {
    auth?: boolean | { required?: boolean; roles?: string[] };
  }
}
```

## Signing tokens

The plugin verifies tokens. `signJwt` signs them, so a login route can create a token the plugin accepts. It uses Web Crypto only and always sets `iat`. Pass `expiresIn` (seconds) to set `exp`: the plugin requires an `exp` claim by default (`requireExpiration: true`), so a token signed without one is rejected with 401.

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

Use the same `secret` and `algorithm` (default `HS256`) the plugin is configured with. For asymmetric algorithms, pass `privateKey` instead of `secret`; the plugin verifies with the matching `publicKey`. HMAC secrets must be at least 32 bytes, the same minimum the plugin enforces.

## Route configuration

The plugin integrates with route `config.ts`. Open routes opt out with `auth: false`; protected routes require auth and optionally roles:

```ts title="api/public/health/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

Invalid or missing tokens produce `401 Unauthorized`; insufficient permissions produce `403 Forbidden`. The framework core stays auth-agnostic; authentication is always a plugin.

### Per method

The default export applies route-wide; an uppercase method export overrides it for that method (shallow merge, method wins):

```ts title="api/items/config.ts"
export default { auth: false };

export const POST = { auth: { required: true } };
```

Here GET stays public while POST needs a valid token.

### WebSocket routes

The plugin gates WebSocket upgrades too. A public WS route needs `auth: false` in its `config.ts`, or the upgrade is rejected:

```ts title="src/websocket/chat/config.ts"
export default { auth: false };
```

Check the package README in `ecosystem/plugins/jwt-auth/` for the full option list and security notes.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
