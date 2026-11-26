---
sidebar_label: Doctor Command
---

# Doctor Command

`burger-api doctor` validates your project structure and reports issues: a quick health check before you dig into a bug that might just be a missing file. Run it from your project root.

```bash
burger-api doctor
```

It checks, in order:

- Bun is 1.4.4 or newer (older versions miss the October 2026 security fixes): an older Bun is an error.
- When Node is installed, it is 24.22.1+ or 26.12.1+ (needed only for the `node` build target): an older Node is a warning.
- `package.json` exists.
- `burger-api` is listed in `dependencies`/`devDependencies` and resolves from the project. A listed but not installed package tells you to run `bun install`.
- A build config (`burger.build.ts`/`.js`): when found it must load, otherwise the check fails. When missing, the check is informational and convention defaults apply. Build settings belong in `burger.build.ts`.
- `src/index.ts` (or `src/index.js`/`src/index.mjs`) exists.
- API routes under the configured `apiDir`: a missing default `src/api` is informational (fine for pages-only apps), a missing custom directory is an error, and every discovered route and convention file must import without errors.
- `tsconfig.json` (or `jsconfig.json` for JavaScript projects) exists.
- No `burger.config.ts`/`.js` file: doctor reports it as an error if found.
- The scan options in `src/index.*` agree with `burger.build.ts`: a mismatch is a warning, not an error.
- Official hooks and plugins copied into `ecosystem/hooks/` and `ecosystem/plugins/` by `burger-api add` are up to date (see [below](#copied-hooks-and-plugins)).
- `src/hooks.ts`, `src/plugins.ts`, `src/providers.ts`, `src/openapi.config.ts`: reported as found or not found, but never as errors (all are optional).

Exits `0` when every check passes, `1` otherwise, so it's safe to wire into a pre-commit hook or CI step alongside `bun run typecheck`.

## Copied hooks and plugins

`burger-api add` copies a hook or plugin into your project, so updating the CLI or the framework does not change it. Each official hook and plugin ships a `package.json` with its version, and doctor compares your copy with the latest one:

- **Security issue (error):** an auth plugin (`jwt-auth`, `api-key`, `basic-auth`, `session`, `oidc`) copied before CLI 1.0.0-beta.3 still checks credentials after validation, so a request without credentials can get a `422` that describes the route's schema instead of a `401`. Doctor finds these copies by version, and by their code when the `package.json` is missing.
- **Warning:** any other copy that is older than the latest version, or has no version.
- **Pass:** the copy is up to date. Your own edits to an up-to-date copy are fine.

Hooks and plugins you wrote yourself are not checked. To update a copy, run the command doctor prints:

```bash
burger-api add jwt-auth --force
```

`--force` overwrites the file, so keep your own edits elsewhere or re-apply them.

## `--json`

```bash
burger-api doctor --json
```

Emits a single structured, versioned JSON object (`{ version: 1, ok, errorCount, checks: [{ name, pass, message }] }`) instead of colored console lines; a check may also carry a `severity` (`info` or `warning`). The exit code behavior is unchanged either way. Meant for tooling/CI that wants to read individual check results rather than grep formatted text.

## Related

- [Inspect Command](/docs/cli/inspect)
- [Create Command](/docs/cli/create)
- [CLI Installation](/docs/cli/installation)
