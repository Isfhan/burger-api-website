---
sidebar_label: Quick Start
sidebar_position: 0
---

# Quick Start

Get a BurgerAPI app running in under a minute.

## Prerequisites

- **[Bun](https://bun.sh/)**: the CLI and the dev server run on Bun, wherever you deploy later.

## Steps

1. **Install the CLI:**

    ```bash
    bun add -g @burger-api/cli
    ```

    You can also skip the install and run `bunx @burger-api/cli <command>`.

    If you see `burger-api: command not found`, add `~/.bun/bin` to your `PATH` (`%USERPROFILE%\.bun\bin` on Windows) and open a new terminal.

2. **Create a project and start the dev server:**

    ```bash
    burger-api create my-api
    cd my-api
    bun run dev
    ```

3. **Open** [http://localhost:4000/api](http://localhost:4000/api) for the starter route and [http://localhost:4000/docs](http://localhost:4000/docs) for the API docs.

## JavaScript

The project uses TypeScript by default. For JavaScript, pass `--lang js`:

```bash
burger-api create my-api --lang js
```

See [JavaScript](/docs/javascript).

## Deploy anywhere

When you are ready to ship, build for your platform: `bun` (default), `node`, `cloudflare`, `deno`, or `vercel`.

```bash
burger-api build src/index.ts --target=cloudflare
```

See [Deployment](/docs/deployment/bun) for each target and [Compatibility](/docs/compatibility) for what works where.

## Next steps

- [Installation](/docs/getting-started/installation): other install options.
- [CLI Tool](/docs/getting-started/cli): all CLI commands.
- [Key Concepts](/docs/key-concepts): routing, hooks, plugins, validation.
- [JavaScript](/docs/javascript): JavaScript with JSDoc types.
- [Deployment](/docs/deployment/bun): Bun, Node.js, Cloudflare Workers, Deno, Vercel.
