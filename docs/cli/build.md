---
sidebar_label: Build Command
---

# Build Command

`burger-api build <file>` bundles your project into a single JavaScript file. Routes are discovered at build time (via `burger.config.ts` or conventions) and embedded so production doesn’t depend on the filesystem.

**Options:**

- `--outfile <path>` — Output path (default: `.build/bundle/app.js`)
- `--minify` — Minify output
- `--sourcemap <type>` — `inline`, `linked`, or `none`
- `--target <target>` — e.g. `bun`, `node`

**Example:**

```bash
burger-api build src/index.ts --minify
```

See [CLI Tool](/docs/getting-started/cli).
