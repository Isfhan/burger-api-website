---
sidebar_label: CLI Tool
sidebar_position: 2
---

# Burger API CLI Tool

The Burger API CLI creates, manages, and builds Burger API projects. Use it to scaffold new projects, install hooks and plugins, run the dev server, and compile your application for production.

## Installation

Install the CLI as described in [Installation](/docs/getting-started/installation), then use the commands below.

## Quick Start

Get a new project running in seconds:

```bash
# 1. Create a new project
burger-api create my-api

# 2. Navigate to your project
cd my-api

# 3. Start the development server
bun run dev

# 4. Open http://localhost:4000/api and http://localhost:4000/docs
```

See [Quick Start](/docs/quick-start) for the full walkthrough.

## Command reference

### `burger-api create <project-name>`

Scaffolds a new project with interactive prompts.

- Creates the project structure and installs dependencies.
- Writes `burger.build.ts` at the project root (apiDir, pageDir, apiPrefix, pagePrefix, debug). This file is build-time only.
- Generates the `dev`, `build`, and `start` scripts.
- Options: `--lang ts|js` (default `ts`), `--yes` / `--defaults` (skip prompts), `--pages` (include `src/pages`), `--ws` (include file-based WebSocket routes), `--no-api` (skip API routes), `--api-dir <dir>`, `--api-prefix <prefix>`, `--no-skills`.

```bash
burger-api create my-api
burger-api create my-api --lang js
burger-api create my-app --pages --ws
```

Next steps: run `bun run dev`, then add hooks and plugins with `burger-api add`. See [Create Command](/docs/cli/create).

### `burger-api list` (alias: `ls`)

Shows available hooks and plugins from the official ecosystem.

```bash
burger-api list
```

See [List Command](/docs/cli/list).

### `burger-api add <name...>`

Installs hooks and plugins from the ecosystem into your project.

- Hooks install to `ecosystem/hooks/` and compose in `src/hooks.ts`.
- Plugins install to `ecosystem/plugins/` and register in `src/plugins.ts`.
- Prints usage instructions after install.

```bash
burger-api add cors
burger-api add cors logger rate-limiter
burger-api add jwt-auth api-key
```

See [Add Command](/docs/cli/add) and [Ecosystem](/docs/ecosystem/introduction).

### `burger-api dev`

Starts the development server with hot reload. The server restarts when you change files.

- Options: `-p, --port <port>` (default `4000`), `-f, --file <file>` (default `src/index.ts`).

```bash
burger-api dev
```

`bun run dev` runs the same command through the project's `dev` script.

### `burger-api build <file>`

Builds your project for a deployment target. Routes are discovered at build time (via `burger.build.ts` or conventions) and compiled ahead of time (AOT), so production never depends on the filesystem.

- Options: `--target <platform>` (`bun` default, `node`, `cloudflare`, `deno`, `vercel`), `--outfile <path>` (default depends on `--target`), `--compile` (standalone executable, `bun` target only), `--minify`, `--sourcemap <type>`.

```bash
burger-api build src/index.ts --target=cloudflare
burger-api build src/index.ts --target=node --outfile=dist/server.js
burger-api build src/index.ts --compile --outfile=my-app
```

Bun and Node targets produce a single self-contained bundle. Cloudflare, Deno, and Vercel produce a portable entry (`index.ts`, with relative imports and no machine-absolute paths) plus a generated options module (`__burger_build_options__.ts`), and a scaffolded platform config (`wrangler.toml` / `deno.json` / `vercel.json`, only if one doesn't already exist). The platform's own tool (`wrangler`/`deno`/`vercel`) does the actual bundling from there.

See [Build Command](/docs/cli/build) and [Compatibility](/docs/compatibility) for what each target supports.

### `burger-api start`

Runs the production server (no hot reload) for a **Bun** build. Run `burger-api build` first. For other targets, run the build's own output directly: `node dist/server.js` (Node), `wrangler dev`/`deploy` (Cloudflare), `deno serve` (Deno), `vercel dev`/`--prod` (Vercel). See [Deployment](/docs/deployment/bun).

- Options: `-p, --port <port>` (default `4000`), `-f, --file <file>`.

```bash
burger-api start
```

`bun run start` runs the same command through the project's `start` script.

### `burger-api build:exec <file>`

Compiles your project into a standalone executable that runs without Bun installed.

- Options: `--outfile <path>`, `--target <target>` (e.g. `bun-windows-x64`, `bun-linux-x64`, `bun-darwin-arm64`), `--minify` (default on), `--no-bytecode`.

```bash
burger-api build:exec src/index.ts --target bun-linux-x64
```

See [Build Exec Command](/docs/cli/build-exec).

### `burger-api generate <type> <name>` (alias: `g`)

Scaffolds a route directory, a WebSocket route directory, or a local hook/plugin stub:

```bash
burger-api generate route products/[id]
burger-api generate ws chat
burger-api generate hook rate-limit
burger-api generate plugin audit-log
```

See [Generate Command](/docs/cli/generate).

### `burger-api inspect`

Prints everything the CLI discovers in your project: config, API/page/WebSocket routes, hooks, plugins, and convention-file coverage.

```bash
burger-api inspect
burger-api inspect --json
```

See [Inspect Command](/docs/cli/inspect).

### `burger-api doctor`

Validates your project structure and exits non-zero when a check fails. Useful in CI alongside `bun run typecheck`.

```bash
burger-api doctor
burger-api doctor --json
```

See [Doctor Command](/docs/cli/doctor).

### `burger-api skills`

Manages AI agent skills for agentic IDEs.

- `skills install [name]`: Install a skill (defaults to `burger-api`) to `.agents/skills/<name>/`.
- `skills list`: Show locally installed skills.
- `skills available`: Browse the remote catalog.

```bash
burger-api skills install
burger-api skills list
burger-api skills available
```

See [Skills Command](/docs/cli/skills).

## Project structure

`burger-api create` generates:

```text
my-api/
├── src/
│   ├── index.ts           # Main entry point
│   ├── hooks.ts           # Global hooks
│   ├── plugins.ts         # Register plugins
│   ├── providers.ts       # Declare shared services
│   ├── openapi.config.ts  # OpenAPI metadata and docs UI
│   └── api/               # File-based API routes
├── ecosystem/
│   └── hooks/             # Installed hooks (plugins dir is created by `burger-api add`)
├── .agents/
│   └── skills/            # AI agent skills (optional)
├── burger.build.ts        # Build-time config: apiDir, pageDir, apiPrefix, pagePrefix, debug
├── package.json
└── tsconfig.json
```

## Common workflows

### Create and run

1. `burger-api create my-api`
2. `cd my-api`
3. `bun run dev`

### Add hooks and plugins

1. Browse available hooks and plugins with `burger-api list`.
2. Install them with `burger-api add <name>`.
3. Compose hooks in `src/hooks.ts`; register plugins in `src/plugins.ts`.

### Build for production

1. `burger-api build src/index.ts --target=<platform>`: `bun` (default), `node`, `cloudflare`, `deno`, or `vercel`.
2. Run it: `burger-api start` (Bun), `node dist/server.js` (Node), or hand off to the platform's own tool: `wrangler dev`/`deploy`, `deno serve`, `vercel dev`/`--prod`.
3. `burger-api build src/index.ts --compile --outfile=my-app` for a standalone Bun binary (or `burger-api build:exec src/index.ts --target bun-linux-x64` for a specific OS/arch).

## Environment variables

- `GITHUB_TOKEN`: token sent to the GitHub API when fetching the ecosystem catalog for `add`, `list`, and `skills`. Setting it raises the unauthenticated rate limit; the CLI prints a hint when GitHub answers `403`.
- `BURGER_API_BRANCH`: overrides the GitHub branch the CLI reads ecosystem content from. Defaults to `main` on stable CLI releases, and to the matching prerelease branch (for example `feat/burger-api-v1`) on beta/RC builds.
- `BURGER_API_CACHE_DIR`: overrides the ecosystem catalog cache directory. Defaults to `~/.burger-api/cache/`, with a four-hour TTL. A stale cache is used with a warning when a live refresh fails.

## Troubleshooting

- **`burger-api: command not found`**: Ensure the directory holding the `burger-api` executable is in your system's `PATH` and restart your terminal. The standalone installer uses `~/.burger-api/bin`; a package-manager install (`bun add -g @burger-api/cli` or `npm i -g @burger-api/cli`) uses the package manager's global bin directory instead.
- **`Directory already exists`**: The `create` command requires a target directory that does not exist yet. Choose a new name or remove the existing folder.
- **Could not fetch the hooks and plugins list**: Check your internet connection. The CLI needs to reach GitHub to fetch the list.
- **Entry file not found**: Ensure you are running the command from the root of your project or specify the correct path with `-f`.
- **Build failures on Windows (D:\ drive)**: If you hit issues compiling executables on a secondary drive (like `D:\`), try moving the project to the `C:\` drive or ensure your user has full permissions for the output directory.

## Related

- [Quick Start](/docs/quick-start)
- [Key Concepts](/docs/key-concepts)
- [Installation](/docs/getting-started/installation)
- [Request Context](/docs/core/request-handling)
