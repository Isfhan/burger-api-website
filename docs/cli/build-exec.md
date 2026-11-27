---
sidebar_label: Build Exec Command (build:exec)
---

# Build Exec Command (build:exec)

`burger-api build:exec` builds your app into a single executable file. It runs on a machine without Bun installed. Your routes, pages and files are inside it.

```bash
burger-api build:exec
```

The file is written to `.build/executable/`. To build for another operating system, pass `--target`:

```bash
burger-api build:exec --target bun-linux-x64
burger-api build:exec --target bun-windows-x64
burger-api build:exec --target bun-darwin-arm64
```

Options:

- `--outfile <path>`: where to write the executable. On Windows, `.exe` is added if missing.
- `--target <target>`: the operating system and CPU to build for.
- `--no-bytecode`: build without bytecode (the app starts more slowly).

`burger-api build --compile` does the same thing.

## Related

- [Build Command](/docs/cli/build)
- [Burger API CLI Tool](/docs/getting-started/cli)
