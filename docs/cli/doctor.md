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
- A build config (`burger.build.ts`/`.js`, or the legacy `burger.config.ts`/`.js`): when found it must load, otherwise the check fails. When missing, the check is informational and convention defaults apply.
- `src/index.ts` (or `src/index.js`/`src/index.mjs`) exists.
- API routes under the configured `apiDir`: a missing default `src/api` is informational (fine for pages-only apps), a missing custom directory is an error, and every discovered route and convention file must import without errors.
- `tsconfig.json` (or `jsconfig.json` for JavaScript projects) exists.
- No legacy `burger.config.ts`/`.js` left over: the config file was renamed to `burger.build.ts` at some point; doctor flags the old name as an error if found.
- The scan options in `src/index.*` agree with `burger.build.ts`: a mismatch is a warning, not an error.
- `src/hooks.ts`, `src/plugins.ts`, `src/providers.ts`, `src/openapi.config.ts`: reported as found or not found, but never as errors (all are optional).

Exits `0` when every check passes, `1` otherwise, so it's safe to wire into a pre-commit hook or CI step alongside `bun run typecheck`.

## `--json`

```bash
burger-api doctor --json
```

Emits a single structured, versioned JSON object (`{ version: 1, ok, errorCount, checks: [{ name, pass, message }] }`) instead of colored console lines; a check may also carry a `severity` (`info` or `warning`). The exit code behavior is unchanged either way. Meant for tooling/CI that wants to read individual check results rather than grep formatted text.

## Related

- [Inspect Command](/docs/cli/inspect)
- [Create Command](/docs/cli/create)
- [CLI Installation](/docs/cli/installation)
