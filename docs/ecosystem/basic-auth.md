---
sidebar_label: Basic Auth
---

# Basic Auth Plugin

HTTP Basic sends `username:password` in a Base64 `Authorization` header. This plugin decodes the header, calls your `validate` function, and puts the returned user on `ctx.user`. Use it for internal tools, admin panels, or a quick gate in front of an API.

Install it with:

```bash
burger-api add basic-auth
```

## Usage

Register the plugin in `src/plugins.ts`:

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { basicAuth } from "../ecosystem/plugins/basic-auth/basic-auth";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(
    basicAuth({
      validate: async (username, password) => {
        const user = await db.users.findByUsername(username);
        // Never compare secrets with === (timing side channel).
        if (user && (await Bun.password.verify(password, user.passwordHash))) {
          return { id: user.id, username: user.username, roles: user.roles };
        }
        return null;
      },
    })
  );
};
```

`validate` is required and must return a user object or `null`. The object needs `id` and `username`; `roles` is optional and any extra fields are kept. `basicAuth()` without `validate` throws at startup.

Once the plugin is registered, every route asks for credentials unless its `config.ts` says otherwise:

```ts title="api/health/config.ts"
export default { auth: false };
```

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin"] } };
```

See [JWT Auth](/docs/ecosystem/jwt-auth) for typing `auth` in `RouteConfig`.

## Options

- `validate`: `(username, password) => Promise<user | null>`. Required.
- `header`: header to read the credentials from. Default `"Authorization"`.
- `realm`: realm shown in the `WWW-Authenticate` challenge. Default `"Restricted"`.
- `attachToContext`: set `ctx.user` after a successful check. Default `true`.

## Roles

A route that lists `auth.roles` needs at least one match in the `roles` array of the user your `validate` returns:

```ts title="api/admin/config.ts"
export default { auth: { required: true, roles: ["admin", "ops"] } };
```

Any listed role is enough. A non-array `roles` value on the user counts as no roles, so a string claim never matches by substring. An empty `roles: []`, or plain `auth: true`, means no role is required. If nothing matches, the route answers `403 Forbidden`.

## What the handler sees

`ctx.user` holds the object `validate` returned:

```ts title="api/me/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({
    id: ctx.user?.id,
    username: ctx.user?.username,
    roles: ctx.user?.roles,
  });
}
```

The plugin augments `BurgerAuthUser` with `id`, `username`, and `roles`. Importing the plugin in `src/plugins.ts` is enough for TypeScript to type `ctx.user` in your routes.

## Good to know

- Usernames and passwords are decoded as UTF-8, and the challenge advertises `charset="UTF-8"`, so non-ASCII credentials work.
- The username is everything before the first colon and the password is everything after it, so a password may contain colons but a username may not.
- A failed check returns `401` with `WWW-Authenticate: Basic realm="<realm>", charset="UTF-8"`, so browsers show their login prompt. The body is RFC 9457 problem+json.
- On a route with `auth: false` the credentials are never validated and `ctx.user` stays `undefined`, so unverified input never reaches the handler.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [JWT Auth](/docs/ecosystem/jwt-auth)
- [Ecosystem](/docs/ecosystem/introduction)
