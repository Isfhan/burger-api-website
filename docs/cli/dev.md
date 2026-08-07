---
sidebar_label: Dev Command
---

# Dev Command

`burger-api dev` runs your API in development mode with hot reload. It is the default script in new projects (`bun run dev`).

Options: `-p, --port <port>` (default `4000`), `-f, --file <file>` (default `src/index.ts`).

```bash
burger-api dev
# or, in a scaffolded project:
bun run dev
```

For production, run `burger-api build` first and then `burger-api start`. See [CLI Tool](/docs/getting-started/cli).

## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [Add Command](/docs/cli/add)
- [Burger API CLI Tool](/docs/getting-started/cli)
