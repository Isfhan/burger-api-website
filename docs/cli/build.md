---
sidebar_label: Build Command
---

# Build Command

`burger-api build <file>` builds your project for a deployment target. Routes are discovered at build time (via `burger.build.ts` or conventions) and compiled ahead of time (AOT) so production never depends on filesystem scanning.

**Options:**

- `--target <platform>`: `bun` (default), `node`, `cloudflare`, `deno`, `vercel` (or `browser`, a legacy raw `Bun.build` passthrough for bundling client-side code)
- `--outfile <path>`: Output path; defaults depend on `--target` (see table below)
- `--compile`: Compile to a standalone executable instead of bundling (`--target=bun` only, see [Build Exec](/docs/cli/build-exec))
- `--minify`: Minify output (`bun`/`node` targets only)
- `--sourcemap <type>`: `inline`, `linked`, or `none` (`bun`/`node` targets only)

**Default `--outfile` per target:**

| Target | Default output | What builds it |
|---|---|---|
| `bun` | `.build/bundle/app.js` | `Bun.build()`, a self-contained single file |
| `node` | `.build/bundle/app.js` | `Bun.build({ target: 'node' })` |
| `cloudflare` | `.build/cloudflare/index.ts` | `wrangler` (not this CLI) |
| `deno` | `.build/deno/index.ts` | `deno` (not this CLI) |
| `vercel` | `api/index.ts` | `vercel` (not this CLI) |

## Examples

```bash
# Bun (default), self-contained bundle
burger-api build src/index.ts

# Node.js, uses @burger-api/node-server's serve() instead of app.serve()
burger-api build src/index.ts --target=node

# Cloudflare Workers, generates .build/cloudflare/index.ts + wrangler.toml
# (only if wrangler.toml doesn't already exist), then hand off to wrangler
burger-api build src/index.ts --target=cloudflare
wrangler dev

# Deno, generates .build/deno/index.ts + deno.json
burger-api build src/index.ts --target=deno
deno serve --port 8000 .build/deno/index.ts

# Vercel, generates api/index.ts + vercel.json
burger-api build src/index.ts --target=vercel
vercel dev

# Standalone binary (Bun only)
burger-api build src/index.ts --compile --outfile=my-app
```

## What differs per target

For `bun` and `node`, this command runs `Bun.build()` and produces a single
bundled file. For `cloudflare`, `deno`, and `vercel`, there's no long-running
process to bundle for. The generated entry (a plain `.ts` file exporting
`{ fetch: toFetchHandler(app) }`) is handed to the platform's own tool to
bundle and deploy, the same way a hand-written project on that platform
already works. `burger-api build` never re-implements `wrangler`/`deno`/
`vercel`'s own bundler.

A project's declared target is baked into the build as
`ServerOptions.runtimeTarget`, and a WebSocket route on a target that can't
support it (`vercel`) fails the build immediately with a clear error. See
[Compatibility](/docs/compatibility) for what each target supports.

Platform config files (`wrangler.toml`, `deno.json`, `vercel.json`) are
scaffolded automatically **only when one doesn't already exist**; an
existing config is never overwritten.

Production flow on Bun/Node: run `burger-api build`, then start the server
with `burger-api start` (Bun) or `node <outfile>` (Node, via
`@burger-api/node-server`). On Cloudflare/Deno/Vercel, `wrangler
deploy`/`deno deploy`/`vercel --prod` take over from there.

See [CLI Tool](/docs/getting-started/cli).

## Related

- [CLI Installation](/docs/cli/installation)
- [Build Exec](/docs/cli/build-exec)
- [Create Command](/docs/cli/create)
- [Add Command](/docs/cli/add)
- [Compatibility](/docs/compatibility)
- [Burger API CLI Tool](/docs/getting-started/cli)
