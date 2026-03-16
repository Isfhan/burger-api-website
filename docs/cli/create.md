---
sidebar_label: Create Command
---

# Create Command

`burger-api create <project-name>` scaffolds a new Burger API project with interactive prompts.

- Creates directory structure, config, and installs dependencies.
- New projects get **`burger.config.ts`** at the root (apiDir, pageDir, apiPrefix, pagePrefix).
- Prompts: API routes, API directory, API prefix, debug mode, Page routes, Page directory, Page prefix.

**Example:**

```bash
burger-api create my-api
```

**Next steps:** Edit `burger.config.ts` if needed, run `bun run dev`, add middleware with `burger-api add`. See [CLI Tool](/docs/getting-started/cli).
