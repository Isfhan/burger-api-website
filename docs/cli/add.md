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


## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [List Command](/docs/cli/list)
- [Burger API CLI Tool](/docs/getting-started/cli)
