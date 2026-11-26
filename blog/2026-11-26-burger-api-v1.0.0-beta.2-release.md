---
slug: burger-api-v1.0.0-beta.2-release
title: BurgerAPI 1.0.0-beta.2 and CLI 1.0.0-beta.3
authors: [isfhan]
tags: [release, beta, cli, security]
---

**`burger-api` 1.0.0-beta.2 and `@burger-api/cli` 1.0.0-beta.3 are out. This release fixes problems found while testing the beta. `@burger-api/node-server` stays at 0.1.1.**

Both packages are on npm as `latest`. Updating takes two commands, plus one step for the auth plugins.

{/* truncate */}

## Update

```bash
bun add burger-api@latest
bun add -g @burger-api/cli@latest
```

Installed the CLI with the install script? Run the script again. It removes the old version and installs the latest one.

The auth plugins are copies in your project, so the update does not reach them. Refresh each one you use:

```bash
burger-api add jwt-auth --force
burger-api add api-key --force
burger-api add basic-auth --force
burger-api add session --force
burger-api add oidc --force
```

`--force` overwrites the file, so keep your own edits elsewhere or re-apply them. See [Installation](/docs/getting-started/installation) for the full update flow.

## Security: auth runs before validation

The five auth plugins now authenticate in `transform` instead of `beforeRoute`. That changes what an anonymous request sees:

- Before: an invalid body or query got `422` with the validation details, even without credentials. That told anonymous clients about the route's schema.
- Now: the plugin checks credentials first, so a request without a valid user gets `401`.

`ctx.user`, `ctx.apiKey` and `ctx.session` are still set for your hooks and handlers, so route code does not change.

`HTTPError` and its subclasses can also carry response headers now. This is useful when a challenge header is part of the 401:

```ts
import { UnauthorizedError } from "burger-api";

throw new UnauthorizedError("Login required", {
    headers: { "WWW-Authenticate": 'Basic realm="app"' },
});
```

The error response keeps `Content-Type: application/problem+json`. The header option works even when a plugin imports its own copy of `burger-api`.

## Changes you may notice

- **CLI exit codes changed.** Ctrl+C now exits `130`, `SIGTERM` `143`, `SIGHUP` `129`. `dev` and `start` pass these signals to the server and wait for it to stop, so a stopped CLI no longer leaves the server running and holding its port. If the server does not stop within 5 seconds it is killed, and a second signal kills it at once.
- **`skills install` re-run without a terminal exits `0`.** A skill that is already installed is skipped with a warning, the same as `add`.
- **`create --no-api` needs `--pages` and/or `--ws`.** Without them the project would serve nothing, so `create` stops with an error before writing anything.
- **OpenAPI `requestBody`:** a route body schema that cannot be turned into JSON Schema now shows as a `requestBody` with `schema: {}`, instead of having no `requestBody` at all.

## Other fixes

- The standalone executable finds the project's own packages, so `doctor` no longer reports `burger-api` as missing in a project that has it.
- `build --target=node` checks that `@burger-api/node-server` is installed before it removes the old build, so a failed build keeps your last one.
- `start` without a build says it is running from source and suggests `burger-api build`.
- `doctor` warns about route files that export lowercase methods (`get` instead of `GET`) or an uppercase method that is not a function.
- `add` prints `onRequest` as the place for logger, security-headers and compression, so they cover every response. See [Logger](/docs/ecosystem/logger).

## Tell us what breaks

If something breaks or feels wrong, [open an issue](https://github.com/isfhan/burger-api/issues).
