---
sidebar_label: Basic Auth
---

# Basic Auth Plugin

This plugin checks HTTP Basic credentials (username and password in the `Authorization` header). It calls your `validate` function and puts the returned user on `ctx.user`. Use it for internal tools and admin panels.

## Install

```bash
burger-api add basic-auth
```

To update the copy later, run `burger-api add basic-auth --force`.

## Register

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { basicAuth } from "../ecosystem/plugins/basic-auth/basic-auth";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(
    basicAuth({
      validate: async (username, password) => {
        const user = await db.users.findByUsername(username);
        if (user && (await Bun.password.verify(password, user.passwordHash))) {
          return { id: user.id, username: user.username, roles: user.roles };
        }
        return null;
      },
    })
  );
};
```

`validate` must return a user (`id`, `username`, optional `roles`) or `null`.

## Options

- `validate`: `(username, password) => Promise<user | null>`. Required.
- `realm`: name shown in the browser login prompt. Default `"Restricted"`.

The full list is in `ecosystem/plugins/basic-auth/README.md`.

## Protect routes

Once registered, every route needs credentials. Open a route with `auth: false` in its `config.ts`. Require a role with `roles`:

```ts title="api/health/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

- Bad or missing credentials get `401`, and the browser shows its login prompt.
- A user without a listed role gets `403`.
- Credentials are checked before validation, so `401` comes before `422`.

## Use it in a handler

```ts title="api/me/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ id: ctx.user?.id, username: ctx.user?.username });
}
```

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Ecosystem](/docs/ecosystem/introduction)
