---
sidebar_label: List Command
---

# List Command

`burger-api list` (alias: `ls`) shows all available hooks and plugins from the official ecosystem.

- Fetches the latest list and displays names and descriptions in a table.
- Use with `burger-api add <name>` to install hooks or plugins.
- The catalog is cached locally (`~/.burger-api/cache/`, a few hours) so repeat runs don't hit GitHub every time. If GitHub is unreachable, `list` falls back to the cached catalog with a warning instead of failing outright, as long as a cache already exists from a prior successful run.

**Example:**

```bash
burger-api list
```

See [CLI Tool](/docs/getting-started/cli) and [Ecosystem](/docs/ecosystem/introduction).


## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [Add Command](/docs/cli/add)
- [Burger API CLI Tool](/docs/getting-started/cli)
