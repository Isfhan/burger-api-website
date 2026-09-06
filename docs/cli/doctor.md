---
sidebar_label: Doctor Command
---

# Doctor Command

`burger-api doctor` validates your project structure and reports issues: a quick health check before you dig into a bug that might just be a missing file. Run it from your project root.

```bash
burger-api doctor
```

It checks, in order:

- `package.json` exists.
- `burger-api` is listed in `dependencies`/`devDependencies`.
- A build config (`burger.build.ts`/`.js`, or the legacy `burger.config.ts`/`.js`): informational only, convention defaults apply if none is found.
- `src/index.ts` exists.
- `src/api/` exists, and if it does, that at least one `route.ts` is discoverable under it.
- `tsconfig.json` exists.
- No legacy `burger.config.ts`/`.js` left over: the config file was renamed to `burger.build.ts` at some point; doctor flags the old name as an error if found.
- `src/hooks.ts`, `src/plugins.ts`, `src/openapi.config.ts`: reported as found or not found, but never as errors (all three are optional).

Exits `0` when every check passes, `1` otherwise, so it's safe to wire into a pre-commit hook or CI step alongside `bun run typecheck`.

## `--json`

```bash
burger-api doctor --json
```

Emits a single structured, versioned JSON object (`{ version: 1, ok, errorCount, checks: [{ name, pass, message }] }`) instead of colored console lines; the exit code behavior is unchanged either way. Meant for tooling/CI that wants to read individual check results rather than grep formatted text.

## Related

- [Inspect Command](/docs/cli/inspect)
- [Create Command](/docs/cli/create)
- [CLI Installation](/docs/cli/installation)
