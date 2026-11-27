---
sidebar_label: Session
---

# Session Plugin

This plugin keeps per-visitor data behind a cookie and exposes it as `ctx.session`. Use it for login state, carts or preferences.

## Install

```bash
burger-api add session
```

To update the copy later, run `burger-api add session --force`.

## Register

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { session } from "../ecosystem/plugins/session/session";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(session({ secret: process.env.SESSION_SECRET }));
};
```

Always set `secret` in production. It signs the session ID.

## Options

- `secret`: key that signs session IDs.
- `cookie`: cookie name. Default `"session_id"`.
- `maxAge`: session lifetime in seconds. Default `86400` (24 hours).
- `store`: where sessions are kept. Default is in memory, which is lost on restart. Use a shared store in production.

The full list, including the store interface, is in `ecosystem/plugins/session/README.md`.

## Protect routes

By default every route needs a session. The check runs before validation, so `401` comes before `422`. Open routes, such as login, with `auth: false` in `config.ts`:

```ts title="api/login/config.ts"
export default { auth: false };
```

## Log in and log out

Write to `ctx.session` to save data and set the cookie. Set it to `undefined` to end the session.

```ts title="api/login/route.ts"
import type { BurgerContext } from "burger-api";

export async function POST(ctx: BurgerContext) {
  const { username } = await ctx.json();
  // ...check the credentials...
  ctx.session = { userId: "42", username };
  return Response.json({ ok: true });
}
```

```ts title="api/logout/route.ts"
import type { BurgerContext } from "burger-api";

export async function POST(ctx: BurgerContext) {
  ctx.session = undefined;
  return Response.json({ ok: true });
}
```

## Good to know

- Having a session does not mean the user logged in. Check a field your login sets, such as `ctx.session?.userId`.
- Sessions have no roles. A route that lists `auth.roles` always gets `403`. Check roles yourself in a route `transform` hook instead.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Ecosystem](/docs/ecosystem/introduction)
