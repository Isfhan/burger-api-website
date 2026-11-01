---
sidebar_label: Inspect Command
---

# Inspect Command

`burger-api inspect` prints a summary of everything the CLI discovers in your project: config, routes, hooks, plugins, and convention-file coverage. Run it from your project root.

```bash
burger-api inspect
```

It prints, in order:

- **Config**: the resolved `apiDir`, `pageDir`, `apiPrefix`, `pagePrefix`, `wsDir`, `debug` (from `burger.build.ts`/convention defaults).
- **API Routes**: every discovered `route.ts`, its methods, and its path.
- **Page Routes**: every discovered page under `pageDir`.
- **WebSocket Routes**: every discovered route under `wsDir`, flagging which ones carry `hooks.ts`/`config.ts`.
- **Hooks**: whether `src/hooks.ts` exists and which hook names it exports, plus which routes carry their own `hooks.ts`.
- **Plugins**: whether `src/plugins.ts` exists.
- **Convention Files**: how many routes have a `schema.ts`, `openapi.ts`, `config.ts`, and `hooks.ts` (as a fraction of total routes).

Use it to sanity-check a project after scaffolding or generating routes. A route that's missing from the "API Routes" list usually means a naming or `apiDir` mismatch, not a routing bug.

## `--json`

```bash
burger-api inspect --json
```

Emits the same information as a single structured, versioned JSON object (`{ version: 1, config, apiRoutes, pageRoutes, wsRoutes, hooks, plugins, conventionFiles }`) instead of colored console text, meant for tooling and AI agents that need to read a project's shape programmatically rather than parse formatted output. The schema is documented as the `InspectResult` type in `packages/cli/src/commands/inspect.ts`; a future breaking change to the shape bumps `version`.

## Related

- [Doctor Command](/docs/cli/doctor)
- [Create Command](/docs/cli/create)
- [CLI Installation](/docs/cli/installation)
