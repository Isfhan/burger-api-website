---
sidebar_label: CLI Tool
sidebar_position: 2
---

# Burger API CLI Tool

The `burger-api` CLI creates projects, adds hooks and plugins, runs your app while you develop, and builds it for production. Install it as described in [Installation](/docs/getting-started/installation).

## Quick start

```bash
burger-api create my-api
cd my-api
bun run dev
```

Open `http://localhost:4000/api` and `http://localhost:4000/docs`. See [Quick Start](/docs/quick-start) for the full walkthrough.

## Commands

| Command | What it does |
|---------|--------------|
| [`create <name>`](/docs/cli/create) | Creates a new project. |
| [`dev`](/docs/cli/dev) | Runs your app and restarts it when you save a file. |
| [`build`](/docs/cli/build) | Builds your app for Bun, Node, Cloudflare Workers, Deno or Vercel. |
| `start` | Runs the Bun build from `burger-api build`. |
| [`build:exec`](/docs/cli/build-exec) | Builds a single executable that runs without Bun installed. |
| [`list`](/docs/cli/list) | Shows the official hooks and plugins. |
| [`add <name...>`](/docs/cli/add) | Copies official hooks and plugins into your project. |
| [`generate <type> <name>`](/docs/cli/generate) | Creates a route, WebSocket route, hook or plugin from a template. |
| [`inspect`](/docs/cli/inspect) | Shows the routes, hooks and plugins the CLI finds in your project. |
| [`doctor`](/docs/cli/doctor) | Checks your project for problems. |
| [`skills`](/docs/cli/skills) | Installs AI agent skills into your project. |

Run `burger-api <command> --help` to see every option.

### `start`

`burger-api start` runs `.build/bundle/app.js`, the output of `burger-api build` for Bun. If you change your code after building, `start` warns that the build is out of date: run `burger-api build` again. For other targets, run the build with the platform's own tool. See [Deployment](/docs/deployment/bun).

```bash
burger-api build
burger-api start
```

Options:

- `-p, --port <port>`: the port (default `$PORT`, else `4000`).
- `-f, --file <file>`: the file to run (default `.build/bundle/app.js`, else `src/index.ts`).

## Common workflows

**Create and run a project**

```bash
burger-api create my-api
cd my-api
bun run dev
```

**Add hooks and plugins**

```bash
burger-api list
burger-api add cors logger
```

The CLI prints where to register each one: hooks in `src/hooks.ts`, plugins in `src/plugins.ts`.

**Build for production**

```bash
burger-api build                  # Bun (default)
burger-api build --target=node    # Node: run "bun add @burger-api/node-server" first
burger-api build --target=cloudflare
```

## Project structure

`burger-api create` generates:

```text
my-api/
├── src/
│   ├── index.ts           # App entry
│   ├── hooks.ts           # Global hooks
│   ├── plugins.ts         # Plugins
│   ├── providers.ts       # Shared services
│   ├── openapi.config.ts  # OpenAPI and docs page settings
│   ├── types.ts           # App-wide types (TypeScript projects)
│   └── api/               # API routes
├── AGENTS.md              # Project rules for AI agents
├── burger.build.ts        # Build settings
├── package.json
└── tsconfig.json          # jsconfig.json in a JavaScript project
```

`burger-api add` creates `ecosystem/` for the hooks and plugins it copies.

## Environment variables

- `GITHUB_TOKEN`: used when the CLI downloads hooks, plugins and skills from GitHub. Set it if you hit GitHub's rate limit.
- `BURGER_API_LOCAL`: set to `1` to turn on [local mode](#local-mode).

## Troubleshooting

- **`burger-api: command not found`**: the folder with the `burger-api` executable is not on your `PATH`. Restart your terminal after installing. See [Installation](/docs/getting-started/installation).
- **`Directory already exists`**: `create` needs a folder name that does not exist yet.
- **Could not fetch the hooks and plugins list**: the CLI could not reach GitHub. Check your connection.
- **Entry file not found**: run the command from your project root, or pass the entry with `-f`.

## Local mode

For working on BurgerAPI itself: `--local` (or `BURGER_API_LOCAL=1`) makes the CLI use your local checkout instead of npm and GitHub. See `LOCAL_TESTING.md` in the [burger-api repository](https://github.com/isfhan/burger-api).

## Related

- [Quick Start](/docs/quick-start)
- [Key Concepts](/docs/key-concepts)
- [Installation](/docs/getting-started/installation)
