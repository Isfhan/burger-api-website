---
sidebar_label: Build Exec Command (build:exec)
---

# Build Exec Command (build:exec)

`burger-api build:exec <file>` compiles your project into a **standalone executable** that runs without Bun installed. Routes, pages, and assets are embedded.

**Options:**

- `--outfile <path>` — Output path (default: `.build/executable/<project>.exe` on Windows, `.build/executable/<project>` on Unix)
- `--target <target>` — e.g. `bun-windows-x64`, `bun-linux-x64`, `bun-darwin-arm64`
- `--minify` — Minify (default: on)
- `--no-bytecode` — Disable bytecode compilation

**Example:**

```bash
burger-api build:exec src/index.ts --target bun-linux-x64
```

See [CLI Tool](/docs/getting-started/cli) and [Migrating to 0.9](/docs/migration/migrating-to-0.9) for the rename from `build:executable`.
