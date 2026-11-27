---
sidebar_label: Dev Command
---

# Dev Command

`burger-api dev` runs your app while you develop. When you save a file in `src/`, `ecosystem/` or `burger.build.ts`, it restarts the app. New projects run it with `bun run dev`.

```bash
burger-api dev
burger-api dev --port 3000
```

Options:

- `-p, --port <port>`: the port (default `$PORT`, else `4000`).
- `-f, --file <file>`: the entry file (default `src/index.ts`).

`dev` turns on debug output, so errors show stack traces and response validation problems in detail. If the app crashes, `dev` keeps running and starts it again when you save a fix.

For production, use `burger-api build`. See [Build Command](/docs/cli/build).

## Related

- [Create Command](/docs/cli/create)
- [Build Command](/docs/cli/build)
- [Burger API CLI Tool](/docs/getting-started/cli)
