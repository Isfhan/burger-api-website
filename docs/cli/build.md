---
sidebar_label: Build Command
---

# Build Command

`burger-api build` builds your app for production. It finds your routes at build time, so the deployed app does not need your source folders.

```bash
burger-api build
```

The entry defaults to `src/index.ts` (or `.js`/`.mjs`). Pass another file as the first argument if yours is elsewhere.

## Targets

Choose where the app will run with `--target`:

| Target | Output | Run or deploy it with |
|---|---|---|
| `bun` (default) | `.build/bundle/app.js` | `burger-api start` |
| `node` | `.build/bundle/app.js` | `node .build/bundle/app.js` |
| `cloudflare` | `.build/cloudflare/index.ts` | `wrangler dev` / `wrangler deploy` |
| `deno` | `.build/deno/index.ts` | `deno serve .build/deno/index.ts` |
| `vercel` | `api/index.ts` | `vercel dev` / `vercel --prod` |

```bash
burger-api build                        # Bun
burger-api build --target=node          # Node: run "bun add @burger-api/node-server" first
burger-api build --target=cloudflare    # also creates wrangler.toml if you have none
```

For Cloudflare, Deno and Vercel, the build also creates the platform's config file (`wrangler.toml`, `deno.json` or `vercel.json`) when you do not have one. It never overwrites yours.

If your app has pages, the Bun and Node builds put the page files next to `app.js`. Deploy the whole `.build/bundle/` folder.

See the [Deployment](/docs/deployment/bun) guides for each platform, and [Compatibility](/docs/compatibility) for what each target supports.

## Bun-only code

When you build for Node, Cloudflare, Deno or Vercel, the CLI warns about files that use Bun-only APIs (`Bun.*`, `bun:*` imports, or WebSocket publish), because they will fail on that platform. Remove that code before you deploy. A WebSocket route on Vercel fails the build, because Vercel does not support WebSockets.

## Options

- `--target <platform>`: `bun` (default), `node`, `cloudflare`, `deno` or `vercel`.
- `--outfile <path>`: where to write the build.
- `--minify`: minify the output (Bun and Node).
- `--sourcemap <type>`: `inline`, `linked` or `none` (Bun and Node).
- `--compile`: build a standalone executable instead. See [Build Exec](/docs/cli/build-exec).
- `--no-bun-check`: skip the Bun-only code warning.

## Related

- [Build Exec](/docs/cli/build-exec)
- [Compatibility](/docs/compatibility)
- [Burger API CLI Tool](/docs/getting-started/cli)
