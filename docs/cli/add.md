---
sidebar_label: Add Command
---

# Add Command

`burger-api add <name...>` adds hooks and plugins from the ecosystem to your project.

- Downloads the package from GitHub.
- Hooks install to `ecosystem/hooks/`; plugins install to `ecosystem/plugins/`.
- Prints usage instructions after install: compose hooks in `src/hooks.ts`, register plugins in `src/plugins.ts`.

**Examples:**

```bash
burger-api add cors
burger-api add cors logger rate-limiter
burger-api add jwt api-key
```

List available hooks and plugins with `burger-api list`. See [CLI Tool](/docs/getting-started/cli) and [Ecosystem](/docs/ecosystem/introduction).

`burger-api generate hook <name>` / `generate plugin <name>` scaffold a blank local stub instead — if the name you pick already matches a real, working implementation in the ecosystem catalog, `generate` warns and suggests `burger-api add <name>` instead, though it still creates the stub either way (the check is a hint, not a block).


## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [List Command](/docs/cli/list)
- [Burger API CLI Tool](/docs/getting-started/cli)
