---
sidebar_label: Session
---

# Session Plugin

The session plugin keeps per-visitor state in a cookie-backed store and exposes it as `ctx.session`. Whatever your handler writes is saved, and setting `ctx.session = undefined` destroys the session. Use it for login state, carts, or preferences without issuing your own token.

Install it with:

```bash
burger-api add session
```

## Usage

Register the plugin in `src/plugins.ts`:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { session } from "../ecosystem/plugins/session/session";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(session({ secret: process.env.SESSION_SECRET }));
};
```

By default every route requires an existing session. The plugin checks it in `transform`, before validation, so an unauthenticated request gets a 401 even when the body is invalid. Mark the routes that must work without one, at least login, with `auth: false` (or `auth: { required: false }`):

```ts title="api/login/config.ts"
export default { auth: false };
```

```ts title="api/login/route.ts"
import type { BurgerContext } from "burger-api";

export async function POST(ctx: BurgerContext) {
  const { username } = await ctx.json();
  // ...check the credentials...
  ctx.session = { userId: "42", username }; // stored, cookie issued
  return Response.json({ ok: true });
}
```

```ts title="api/logout/route.ts"
import type { BurgerContext } from "burger-api";

export async function POST(ctx: BurgerContext) {
  ctx.session = undefined; // destroyed, cookie expired
  return Response.json({ ok: true });
}
```

The session is loaded on every route, including routes with `auth: false`. Only the check is skipped there.

## Options

- `cookie`: name of the session cookie. Default `"session_id"`.
- `maxAge`: session lifetime in seconds. Default `86400` (24 hours).
- `store`: object with `get`, `set`, and `destroy`. Default `new MemorySessionStore()`.
- `secure`: add the `Secure` cookie flag. Default `process.env.NODE_ENV === "production"`.
- `path`: cookie path. Default `"/"`.
- `domain`: cookie domain. Default unset.
- `sameSite`: `"strict"`, `"lax"`, or `"none"`. Default `"lax"`.
- `secret`: HMAC key used to sign session IDs. Default unset, which leaves IDs unsigned.
- `regenerateOnAuth`: rotate the session ID when the data changes. Default `true`.

A store is any object with this shape:

```ts
interface SessionStore {
  get(id: string): Promise<Record<string, unknown> | null>;
  set(id: string, data: Record<string, unknown>, maxAge?: number): Promise<void>;
  destroy(id: string): Promise<void>;
}
```

## Roles

Sessions have no roles concept. If a route's `config.auth` lists `roles`, the plugin answers `403 Forbidden` after the session check. It never lets the request through. Authorise with a route `transform` entry that reads the fields your login handler stored:

```ts title="api/admin/hooks.ts"
import type { BurgerContext } from "burger-api";
import { ForbiddenError } from "burger-api";

export const transform = {
  admin: (ctx: BurgerContext) => {
    if (ctx.session?.role !== "admin") {
      throw new ForbiddenError("Admin only");
    }
    return true;
  },
};
```

## What the handler sees

`ctx.session` is `Record<string, unknown> | undefined`. It is `undefined` when the request has no valid session:

```ts title="api/profile/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ userId: ctx.session?.userId ?? null });
}
```

The plugin augments `BurgerContext` with `session`, so importing it in `src/plugins.ts` types the property in your routes.

## Good to know

- Sessions are created lazily: no store entry and no `Set-Cookie` until a handler writes at least one key.
- Any change to the session data rotates the ID and issues a new cookie, unless you set `regenerateOnAuth: false`. Then the data is written back under the same ID.
- A session existing is not authentication. The default check only proves the client holds a valid session cookie. Check a field your login handler sets, such as `ctx.session?.userId`, to require a login.
- Without `secret` in production the plugin logs a warning and session IDs are unsigned, which leaves them open to fixation. The default in-memory store is per-process and lost on restart, so use a shared store in production.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Ecosystem](/docs/ecosystem/introduction)
