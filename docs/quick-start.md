---
sidebar_label: Quick Start
sidebar_position: 0
---

# Quick Start

Get a BurgerAPI app running in under a minute.

Full install options (standalone executable, manual setup): [Installation](/docs/getting-started/installation).

## Prerequisites

- **[Bun](https://bun.sh/)** — BurgerAPI is built for Bun. Install it from [bun.sh](https://bun.sh).

## Steps

This is the short version. For every install method, see [Installation](/docs/getting-started/installation).

1. **Install the CLI** (if you have Bun) or use **bunx** without installing:

    ```bash
    bun add -g @burger-api/cli
    # or, no install needed:
    bunx @burger-api/cli create my-app
    ```

2. **Create a project, enter it, and start the dev server:**

    ```bash
    burger-api create my-api
    cd my-api
    bun run dev
    ```

3. **Open** [http://localhost:4000](http://localhost:4000) in your browser.

## Language choice

BurgerAPI treats TypeScript and JavaScript as first-class languages. The
scaffold defaults to TypeScript; pass `--lang js` for a JavaScript project
(`jsconfig.json` with `checkJs`, `.js` / `.mjs` route files, JSDoc types):

```bash
burger-api create my-api --lang js
```

See [JavaScript](/docs/javascript) for details.

## Next steps

- [Installation](/docs/getting-started/installation) — Full install options (standalone executable, manual setup).
- [CLI Tool](/docs/getting-started/cli) — All CLI commands (create, add, list, dev, build, start).
- [Key Concepts](/docs/key-concepts) — Routing, hooks, plugins, validation.
- [JavaScript](/docs/javascript) — JavaScript with JSDoc types.
