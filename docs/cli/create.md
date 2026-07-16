---
sidebar_label: Create Command
---

# Create Command

`burger-api create <project-name>` scaffolds a new Burger API project with interactive prompts.

- Creates directory structure, config, and installs dependencies.
- New projects get **`burger.config.ts`** at the root (apiDir, pageDir, apiPrefix, pagePrefix).
- Prompts: API routes, API directory, API prefix, debug mode, Page routes, Page directory, Page prefix, AI agent skills.

**Example:**

```bash
burger-api create my-api
```

**Next steps:** Edit `burger.config.ts` if needed, run `bun run dev`, add middleware with `burger-api add`. AI agent skills are installed at `.agents/skills/burger-api/` when opted in. See [CLI Tool](/docs/getting-started/cli).


## Related

- [CLI Installation](/docs/cli/installation)
- [Add Command](/docs/cli/add)
- [List Command](/docs/cli/list)
- [Burger API CLI Tool](/docs/getting-started/cli)
