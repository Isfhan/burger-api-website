---
sidebar_label: Quick Start
sidebar_position: 0
---

# Quick Start

Get a BurgerAPI app running in under a minute.

## Prerequisites

- **[Bun](https://bun.sh/)** — BurgerAPI is built for Bun. Install it from [bun.sh](https://bun.sh).

## Steps

1. **Install the CLI** (if you have Bun):

   ```bash
   bun add -g @burger-api/cli
   ```

   Or use **bunx** without installing:

   ```bash
   bunx @burger-api/cli create my-app
   ```

2. **Create a project:**

   ```bash
   burger-api create my-app
   ```

3. **Enter the project and start the dev server:**

   ```bash
   cd my-app
   bun run dev
   ```

4. **Open** [http://localhost:4000](http://localhost:4000) in your browser.

## Next steps

- [Installation](/docs/getting-started/installation) — Full install options (standalone executable, manual setup).
- [CLI Tool](/docs/getting-started/cli) — All CLI commands (create, add, list, serve, build, build:exec).
- [Configuration](/docs/core/configuration) — Configure the Burger instance (apiDir, middleware, OpenAPI).
