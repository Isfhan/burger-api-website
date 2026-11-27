---
sidebar_label: Installation
sidebar_position: 1 # Position it early in the Getting Started section
---

# Installation

BurgerAPI runs on [Bun](https://bun.sh/). Install Bun 1.4.4 or newer first ([guide](https://bun.sh/docs/installation)), then check it:

```bash
bun --version
```

## Install the CLI

The `burger-api` CLI creates projects and adds hooks and plugins. Pick one way to install it:

- **With Bun** (recommended):

  ```bash
  bun add -g @burger-api/cli
  ```

  If you then see `burger-api: command not found`, add `~/.bun/bin` to your `PATH` (`%USERPROFILE%\.bun\bin` on Windows) and open a new terminal.

- **With the install script**, which installs a standalone executable:

  ```bash
  # macOS, Linux, WSL
  curl -fsSL https://burger-api.com/install.sh | bash
  ```

  ```powershell
  # Windows PowerShell
  irm https://burger-api.com/install.ps1 | iex
  ```

- **From [GitHub Releases](https://github.com/isfhan/burger-api/releases/latest)**: download the executable for your system and put it on your `PATH`. On Linux and macOS, run `chmod +x burger-api`.

You can also run it once without installing: `bunx @burger-api/cli create my-api`.

## Create and run a project

```bash
burger-api create my-api
cd my-api
bun run dev
```

See the [CLI Tool](./cli.md) guide for every command.

## Update

:::tip Getting an error?
Update the CLI and the framework first. Most problems are already fixed there.
:::

```bash
bun add -g @burger-api/cli@latest   # the CLI (or run the install script again)
bun add burger-api@latest           # the framework, in your project
burger-api doctor                   # finds hooks and plugins to refresh
```

Hooks and plugins you added with `burger-api add` are copies in your project, so these updates do not change them. `burger-api doctor` tells you which ones are out of date and prints the command to refresh each one. See [Add Command](/docs/cli/add#updating-a-copy).

Run `burger-api --version` to see which version you have. If it still shows an old version, another `burger-api` comes first on your `PATH`: remove it, or run the install script, which tells you where it is.

## Without the CLI

You can also set up a project by hand:

1. Create a Bun project and install BurgerAPI and Zod:

   ```bash
   bun init
   bun add burger-api zod
   ```

2. Create your entry file:

   ```typescript title="src/index.ts"
   import { Burger } from "burger-api";

   const app = new Burger({
     apiDir: "./src/api",
   });

   const port = Number(process.env.PORT) || 4000;
   app.serve(port, () => {
     console.log(`Server running on http://localhost:${port}`);
   });
   ```

3. Create your first route. Validation goes in the route's `schema.ts`:

   ```typescript title="src/api/schema.ts"
   import { z } from "zod";
   import type { MethodSchema } from "burger-api";

   export const GET = {
     query: z.object({ name: z.string().default("world") }),
   } satisfies MethodSchema;
   ```

   ```typescript title="src/api/route.ts"
   import { defineRoute } from "burger-api";
   import { GET as GetSchema } from "./schema";

   export const GET = defineRoute(GetSchema, (ctx) => {
     return Response.json({ message: `Hello, ${ctx.validated.query.name}!` });
   });
   ```

4. Run it:

   ```bash
   bun run src/index.ts
   ```

   Open `http://localhost:4000/api` (try `?name=Burger`) and `http://localhost:4000/docs`.

Next, see [Configuration](./../core/configuration.md) to learn how to set up your app.

## Related

- [Quick Start](/docs/quick-start)
- [Key Concepts](/docs/key-concepts)
- [Burger API CLI Tool](/docs/getting-started/cli)
