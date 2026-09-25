---
sidebar_label: Generate Command
---

# Generate Command

`burger-api generate <type> <name>` (alias `g`) scaffolds route directories, WebSocket route directories, and local hook/plugin stubs. Run it from your project root.

It follows your project language: pass `--lang js`, or the CLI detects a JavaScript project from `jsconfig.json`. Otherwise it generates `.ts` files.

## `burger-api generate route <path>`

Creates a route directory under the configured `apiDir` (default `src/api`) with convention files: `route`, `schema`, `openapi`, `hooks`, and `config`.

**Options:**

- `-l, --lang <lang>`: `ts` or `js` (detected from `jsconfig.json`)
- `--no-schema`: skip `schema.ts`
- `--no-openapi`: skip `openapi.ts`
- `--no-hooks`: skip `hooks.ts`
- `--no-config`: skip `config.ts`

```bash
burger-api generate route users
burger-api generate route products/[id]
burger-api generate route files/[...]
burger-api generate route users --no-hooks --no-config
```

## `burger-api generate ws <path>`

Creates a WebSocket handler directory under the configured `wsDir` (default `src/websocket`) with `ws`, `hooks`, and `config` convention files.

**Options:**

- `-l, --lang <lang>`: `ts` or `js` (detected from `jsconfig.json`)
- `--no-hooks`: skip `hooks.ts`
- `--no-config`: skip `config.ts`

```bash
burger-api generate ws chat
burger-api generate ws notifications/[room]
```

## `burger-api generate hook <name>`

Creates a local hook factory in `ecosystem/hooks/<name>/`.

**Options:**

- `-l, --lang <lang>`: `ts` or `js` (detected from `jsconfig.json`)

```bash
burger-api generate hook rate-limit
```

If a working implementation with that name already exists in the official ecosystem, the CLI prints a warning suggesting `burger-api add <name>` instead. The local stub is still created.

## `burger-api generate plugin <name>`

Creates a local plugin in `ecosystem/plugins/<name>/`.

**Options:**

- `-l, --lang <lang>`: `ts` or `js` (detected from `jsconfig.json`)

```bash
burger-api generate plugin audit-log
```

The same ecosystem warning as `generate hook` applies.

## Related

- [CLI Tool](/docs/getting-started/cli)
- [Create Command](/docs/cli/create)
- [Add Command](/docs/cli/add)
- [File-Based Routing](/docs/routing/file-based-routing)
- [WebSocket Overview](/docs/websocket/overview)
