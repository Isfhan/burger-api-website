---
sidebar_label: Installation
sidebar_position: 1 # Position it early in the Getting Started section
---

# Installation

BurgerAPI is built for the [Bun.js](https://bun.sh/) runtime. Make sure you have Bun installed before you begin.

## Prerequisites

- **Bun:** Follow the official [Bun installation guide](https://bun.sh/docs/installation) to install it on your system.

  You can verify your installation by running:

  ```bash
  bun --version
  ```

## Recommended: Using the Burger API CLI

Burger API comes with a powerful CLI tool that makes it easy to scaffold new projects and manage hooks and plugins. Install it globally to get started:

### Installation

#### Option 1: Bun Global Installation (Recommended if you have Bun installed)

```bash
# Global installation
bun add -g @burger-api/cli
```

Or use with **bunx** (No Installation Needed):

```bash
bunx @burger-api/cli create my-project
```

#### Option 2: Standalone Executable (Alternative Installation Method)

- **macOS/Linux/WSL:**
  ```bash
  curl -fsSL https://burger-api.com/install.sh | bash
  ```
- **Windows PowerShell:**
  ```powershell
  irm https://burger-api.com/install.ps1 | iex
  ```

### Create your project

Once installed, you can create a new project by running:

```bash
burger-api create my-awesome-api
```

### Run your project

```bash
cd my-awesome-api
bun run dev
```

For detailed CLI usage, check out the [CLI Tool Guide](./cli.md).

---

## Alternative: Manual Setup (Standard Bun)

If you prefer not to use the CLI, you can set up a project manually using standard Bun commands:

1. **Initialize a new Bun project:**
   Navigate to your project directory and run:
   ```bash
   bun init
   ```
   Follow the prompts to create a basic Bun project.

2. **Install BurgerAPI and Zod:**
   ```bash
   bun add burger-api zod
   ```

3. **Create your entry file** (`src/index.ts`):
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

4. **Create your first route.** The runtime reads validation from a route's `schema.ts`, so declare the schema there and import it into `route.ts`:
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

5. **Run it:**
   ```bash
   bun run src/index.ts
   ```

   Open `http://localhost:4000/api` (try `?name=Burger`) and `http://localhost:4000/docs`.

---

## Ready to Go!

That's it! You now have a Bun project set up with BurgerAPI installed.

Next, you might want to check out the [Configuration](./../core/configuration.md) guide to see how to create your first BurgerAPI instance.


## Related

- [Quick Start](/docs/quick-start)
- [Key Concepts](/docs/key-concepts)
- [Burger API CLI Tool](/docs/getting-started/cli)
- [Request Context](/docs/core/request-handling)
