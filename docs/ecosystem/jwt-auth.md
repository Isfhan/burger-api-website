---
sidebar_label: JWT Auth
---

# JWT Auth Plugin

The JWT auth plugin parses a JSON Web Token from the `Authorization` header, verifies the signature, and attaches the decoded payload to the context. Install it with:

```bash
burger-api add jwt-auth
```

## Usage

Register the plugin in `src/plugins.ts` with `burger.usePlugin(...)`:

```ts title="src/plugins.ts"
import { jwtAuth } from "../ecosystem/plugins/jwt-auth/jwt-auth";

export default (burger) => {
  burger.usePlugin(jwtAuth({ secret: process.env.JWT_SECRET }));
};
```

## Options

- `secret`: secret key for HMAC algorithms (HS256, HS384, HS512).
- `publicKey`: public key for asymmetric algorithms (RS256, RS384, RS512, ES256, ...).
- `algorithm`: signing algorithm. Default `"HS256"`.
- `header` / `prefix`: where to read the token. Defaults to the `Authorization` header with the `Bearer` prefix.
- `issuer`, `audience`: required claims.
- `clockTolerance`: clock skew allowance in seconds.

After a successful login flow the plugin attaches the decoded payload as `ctx.user`:

```ts title="api/me/route.ts"
export async function GET(ctx: BurgerContext) {
  return Response.json({ userId: ctx.user.sub });
}
```

## Route configuration

The plugin integrates with route `config.ts`. Open routes opt out with `auth: false`; protected routes require auth and optionally roles:

```ts title="api/public/health/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

Invalid or missing tokens produce `401 Unauthorized`; insufficient permissions produce `403 Forbidden`. The framework core stays auth-agnostic; authentication is always a plugin.

Check the package README in `ecosystem/plugins/jwt-auth/` for the full option list and security notes.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
