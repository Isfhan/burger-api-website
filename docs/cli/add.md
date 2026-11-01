---
sidebar_label: Add Command
---

# Add Command

`burger-api add <name...>` adds hooks and plugins from the ecosystem to your project.

- Downloads the package from GitHub.
- Hooks install to `ecosystem/hooks/`; plugins install to `ecosystem/plugins/`.
- Prints usage instructions after install: compose hooks in `src/hooks.ts`, register plugins in `src/plugins.ts`.
- `--force` replaces an existing install without a prompt, also with no TTY. Without it, a non-TTY run skips the package and tells you to pass `--force`.
- `--local` reads the local checkout instead of GitHub. See [Local mode](/docs/getting-started/cli#local-mode).

**Examples:**

```bash
burger-api add cors
burger-api add cors logger rate-limiter
burger-api add jwt-auth api-key
burger-api add cors --force
```

List available hooks and plugins with `burger-api list`. See [CLI Tool](/docs/getting-started/cli) and [Ecosystem](/docs/ecosystem/introduction).

`burger-api generate hook <name>` / `generate plugin <name>` scaffold a blank local stub instead. If the name you pick already matches a real, working implementation in the ecosystem catalog, `generate` warns and suggests `burger-api add <name>` instead, though it still creates the stub either way (the check is a hint, not a block).


## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [List Command](/docs/cli/list)
- [Burger API CLI Tool](/docs/getting-started/cli)
