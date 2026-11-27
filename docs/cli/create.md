---
sidebar_label: Create Command
---

# Create Command

`burger-api create <project-name>` creates a new project and installs its dependencies. It asks a few questions: whether you want API routes, pages or WebSocket routes, their folders and prefixes, and whether to add AI agent skills.

```bash
burger-api create my-api
```

Then:

```bash
cd my-api
bun run dev
```

## Options

- `--lang ts|js`: TypeScript (default) or JavaScript.
- `--yes`: skip the questions and use the defaults.
- `--pages`: add a `src/pages/` folder for web pages.
- `--ws`: add WebSocket routes.
- `--no-api`: no API routes (use with `--pages` or `--ws`).
- `--api-dir <dir>`, `--api-prefix <prefix>`: change where API routes live and their URL prefix.
- `--no-skills`: do not add AI agent skills.

```bash
burger-api create my-api --lang js
burger-api create my-app --pages --ws
```

## What you get

Every project gets `src/index.ts`, an `src/api/` folder with an example route, `burger.build.ts` with your build settings, and `AGENTS.md` with project rules for AI coding agents. See [CLI Tool](/docs/getting-started/cli#project-structure) for the full layout.

## Related

- [Add Command](/docs/cli/add)
- [Dev Command](/docs/cli/dev)
- [Burger API CLI Tool](/docs/getting-started/cli)
