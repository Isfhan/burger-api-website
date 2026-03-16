---
slug: burger-api-v0.9.0-release
title: BurgerAPI v0.9.0 Released
authors: [isfhan]
tags: [release, production, cli, config]
---

**v0.9.0** focuses on production readiness and consistency. Builds use **AOT route discovery**: the CLI discovers routes at build time and embeds them so your app doesn't depend on the filesystem in production. New projects get a **`burger.config.ts`** for API/page dirs and prefixes, and the Burger constructor supports **`apiRoutes`** and **`pageRoutes`** for pre-built route lists. The CLI command for standalone executables is now **`burger-api build:exec`**, with default outputs under `.build/bundle/` and `.build/executable/`. Your middleware and options are preserved in the generated build entry.

{/* truncate */}

## What's New in v0.9.0

- **Production builds that match development.** Use `burger-api build` or `burger-api build:exec`; routes are discovered at build time and embedded so production doesn't scan the filesystem. Your middleware and server options are preserved in the bundle or binary.
- **One config for your project.** New projects get a `burger.config.ts` at the root. Set API and page directories and URL prefixes in one place; the CLI uses it for builds so dev and production stay in sync.
- **Pre-built routes for the server.** You can pass `apiRoutes` and `pageRoutes` into the Burger constructor. The CLI's build does this for you automatically; advanced users can plug in their own build pipeline.
- **Clearer CLI commands and outputs.** The executable command is now `burger-api build:exec` (replacing `build:executable`). Default outputs are `.build/bundle/app.js` and `.build/executable/<project>`. Build output explains whether you have an API-only bundle or a full directory to deploy.
- **Stronger typing.** The framework exports `RouteDefinition` and `PageDefinition` so you can type pre-built route lists and custom tooling.

## Pre-built Routes for Production

In production (bundled or executable), you don't want to depend on the filesystem. The CLI's build pipeline discovers routes at build time and injects them into your entry file. Your app then starts without scanning—faster startup and no path issues in single-file or binary deploys.

You can pass route lists into the `Burger` constructor instead of relying on runtime file scanning. When **either** `apiRoutes` or `pageRoutes` is provided, the corresponding `apiDir` / `pageDir` is ignored for that type.

```typescript
import { Burger } from 'burger-api';
import type { RouteDefinition, PageDefinition } from 'burger-api';

const apiRoutes: RouteDefinition[] = [/* from your build */];
const pageRoutes: PageDefinition[] = [/* from your build */];

const app = new Burger({
  apiRoutes,
  pageRoutes,
  globalMiddleware: [/* ... */],
});

await app.serve(4000);
```

Typically you don't set these by hand; the CLI generates an entry that passes pre-built routes. If you wire a custom build, you'd use the pattern above.

## Project Config File: burger.config.ts

New projects created with `burger-api create` get a `burger.config.ts` (or `.js`) at the project root. The CLI uses it for build (route dirs and prefixes). You can also load it in your app if you want one place for paths and prefixes.

After `burger-api create my-app`, you get something like:

```typescript
// burger.config.ts
export default {
  apiDir: './src/api',      // folder with API route files
  pageDir: './src/pages',   // folder with HTML pages
  apiPrefix: '/api',        // URL prefix for API routes
  pagePrefix: '/',         // URL prefix for pages
  debug: false,             // extra logging when true
};
```

Edit as needed. For build, the CLI resolves config from the current working directory (convention defaults: `./src/api`, `./src/pages`, `/api`, `/`).

## Build-Time (AOT) Route Discovery

`burger-api build` and `burger-api build:exec` no longer rely on runtime file scanning. The CLI discovers routes at build time, generates a virtual entry that imports them and passes `apiRoutes` / `pageRoutes` into `new Burger({ ... })`, then runs Bun's build. Your middleware and other options are preserved in that generated entry.

Production runs without filesystem dependency: one bundle or one binary, with routes and options baked in. Same route behavior as dev, with no runtime scanning.

```bash
# Bundle to .build/bundle/app.js (and assets if you have pages)
burger-api build src/index.ts

# Standalone executable to .build/executable/<project> or .exe
burger-api build:exec src/index.ts
```

Ensure your project has a valid `api`/`pages` layout (or override with `burger.config.ts`). Invalid route combinations (e.g. conflicting dynamic/wildcard siblings) are reported at build time.

## API & Configuration Changes

**ServerOptions (Burger constructor):**

| Option | Type | Description |
|--------|------|-------------|
| `apiRoutes?` | `RouteDefinition[]` | Pre-built API routes; when set, `apiDir` is ignored and no API route scanning runs. |
| `pageRoutes?` | `PageDefinition[]` | Pre-built page routes; when set, `pageDir` is ignored and no page scanning runs. |

Both are optional. Existing code using only `apiDir` / `pageDir` is unchanged.

**New / re-exported types:** `RouteDefinition` and `PageDefinition` are exported from `burger-api` for type-safe pre-built route lists or custom tooling.

**Error message when no routes:** The message now says: *"Please provide apiDir/pageDir (for dev) or apiRoutes/pageRoutes (for production builds) when initializing the Burger class."*

## Upgrade and Migration

If you use `burger-api build:executable` or rely on the old default output paths, see **[Migrating to BurgerAPI 0.9](/docs/migration/migrating-to-0.9)** for a short checklist.

Otherwise, upgrade and enjoy production-ready builds:

```bash
bun add burger-api@latest
```

## Get Involved

BurgerAPI is open source and we welcome contributions!

- ⭐ [Star us on GitHub](https://github.com/isfhan/burger-api)
- 🐛 [Report issues](https://github.com/isfhan/burger-api/issues)
- 💡 [Share ideas](https://github.com/isfhan/burger-api/discussions)
- 🤝 [Contribute code](https://github.com/isfhan/burger-api/pulls)

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
