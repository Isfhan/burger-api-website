---
sidebar_label: Doctor Command
---

# Doctor Command

`burger-api doctor` checks your project for common problems. Run it from your project root when something does not work, or in CI.

```bash
burger-api doctor
```

It checks that:

- Bun is 1.4.4 or newer, and Node (if installed) is new enough for the `node` build target.
- `burger-api` is installed.
- Your entry file (`src/index.ts`), `tsconfig.json` and `burger.build.ts` exist and load.
- Every route file loads without errors.
- Hooks and plugins you added with `burger-api add` are up to date.

Each problem comes with what to do about it. Doctor exits `0` when every check passes and `1` when one fails, so you can run it in CI next to `bun run typecheck`.

## Out-of-date hooks and plugins

`burger-api add` copies hooks and plugins into your project, so updating the CLI does not update them. Doctor tells you when a copy is out of date and prints the command to refresh it:

```bash
burger-api add jwt-auth --force
```

An auth plugin (`jwt-auth`, `api-key`, `basic-auth`, `session`, `oidc`) that misses a security fix makes doctor fail. Other out-of-date copies are warnings. Hooks and plugins you wrote yourself are not checked.

`--force` overwrites the copy, so re-apply any edits you made to it.

## `--json`

```bash
burger-api doctor --json
```

Prints the results as one JSON object (`{ version, ok, errorCount, checks: [{ name, pass, message }] }`) for scripts and CI. The exit code is the same.

## Related

- [Inspect Command](/docs/cli/inspect)
- [Create Command](/docs/cli/create)
- [CLI Installation](/docs/cli/installation)
