---
sidebar_label: Quick Start
sidebar_position: 0
---

# Quick Start

Get a BurgerAPI app running in under a minute.

Full install options (standalone executable, manual setup): [Installation](/docs/getting-started/installation).

## Prerequisites

- **[Bun](https://bun.sh/)** — BurgerAPI is built for Bun. Install it from [bun.sh](https://bun.sh). Bun runs the CLI and local dev server regardless of where you deploy — see [Deploy anywhere](#deploy-anywhere) below.

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

## Deploy anywhere

`bun run dev` above is local development. When you're ready to ship, `burger-api build --target=<platform>` builds for the platform you're deploying to — Bun (default), Node.js, Cloudflare Workers, Deno, or Vercel:

```bash
burger-api build src/index.ts --target=cloudflare
wrangler dev   # boots the generated build locally, then `wrangler deploy`
```

See [Deployment](/docs/deployment/bun) for each target and [Compatibility](/docs/compatibility) for what works where (WebSocket, for example, works on every target except Vercel).

## Next steps

- [Installation](/docs/getting-started/installation) — Full install options (standalone executable, manual setup).
- [CLI Tool](/docs/getting-started/cli) — All CLI commands (create, add, list, dev, build, start).
- [Key Concepts](/docs/key-concepts) — Routing, hooks, plugins, validation.
- [JavaScript](/docs/javascript) — JavaScript with JSDoc types.
- [Deployment](/docs/deployment/bun) — Bun, Node.js, Cloudflare Workers, Deno, Vercel.
