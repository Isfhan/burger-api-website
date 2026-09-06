---
sidebar_label: Build Exec Command (build:exec)
---

# Build Exec Command (build:exec)

`burger-api build:exec <file>` compiles your project into a **standalone executable** that runs without Bun installed. Routes, pages, and assets are embedded.

**Options:**

- `--outfile <path>`: Output path (default: `.build/executable/<project>.exe` on Windows, `.build/executable/<project>` on Unix)
- `--target <target>`: e.g. `bun-windows-x64`, `bun-linux-x64`, `bun-darwin-arm64`
- `--minify`: Minify (default: on)
- `--no-bytecode`: Disable bytecode compilation

**Example:**

```bash
burger-api build:exec src/index.ts --target bun-linux-x64
```

`burger-api build --compile` is equivalent sugar on the `build` command
itself (`--target` there means a deployment platform, not an OS/arch
triple; `--compile` is only valid combined with `--target=bun` or no
`--target` at all). Use whichever reads better in your scripts; both reuse
the same compile path.

See [CLI Tool](/docs/getting-started/cli).


## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [Add Command](/docs/cli/add)
- [Burger API CLI Tool](/docs/getting-started/cli)
