---
sidebar_label: Inspect Command
---

# Inspect Command

`burger-api inspect` shows what the CLI finds in your project: your settings, API routes with their methods, pages, WebSocket routes, hooks and plugins. Run it from your project root.

```bash
burger-api inspect
```

Use it to check a project after adding routes. If a route is missing from the list, check its folder name and that it is inside your API folder (`src/api` by default).

## `--json`

```bash
burger-api inspect --json
```

Prints the same information as one JSON object, for scripts and AI agents.

## Related

- [Doctor Command](/docs/cli/doctor)
- [Burger API CLI Tool](/docs/getting-started/cli)
