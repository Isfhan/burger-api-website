---
sidebar_label: Burger Options
---

# Server Options

The `Burger` constructor accepts a **ServerOptions** object. These are the main options:

| Option | Type | Description |
|--------|------|-------------|
| `apiDir` | `string` | Directory containing API route files (e.g. `./src/api`). Defaults to `./src/api` in filesystem mode when that directory exists. Relative to the project root, with an entry-file fallback (`src/`) under `burger-api dev`. See [How directories resolve](/docs/core/configuration#how-directories-resolve). |
| `apiRoutes` | `RouteDefinition[]` | Pre-built API routes from the CLI build. When present, `apiDir` is ignored and no runtime filesystem scan happens. |
| `pageDir` | `string` | Directory for page files. Defaults to `./src/pages` when that directory exists. |
| `pageRoutes` | `PageDefinition[]` | Pre-built page routes from the CLI build. When present, `pageDir` is ignored. |
| `wsDir` | `string` | Directory for WebSocket route files. Defaults to `./src/websocket` when that directory exists, so file-based WS routes work in dev without configuration. |
| `wsRoutes` | `WebSocketRouteDefinition[]` | Pre-built WebSocket routes from the CLI build. When present, `wsDir` is ignored. |
| `assetRoutes` | `EmbeddedAsset[]` | Embedded static assets from the CLI build (files under `<pageDir>/assets/`). When present, assets are served from the table; otherwise dev reads them from disk under `pageDir`. |
| `apiPrefix` | `string` | URL prefix for API routes (default: `'api'`; `''` mounts them at `/`). |
| `pagePrefix` | `string` | URL prefix for page routes (default: `''`). |
| `title` | `string` | Fallback API title for the OpenAPI document when no `openapi.config.ts` exists. Prefer [OpenAPI config](/docs/api/openapi). |
| `description` | `string` | Fallback API description, same rules as `title`. |
| `version` | `string` | Fallback API version, same rules as `title`. |
| `debug` | `boolean` | Enable debug mode (e.g. richer error rendering, dev-mode logging). |
| `validation` | object | Validation settings: `coerce` (`boolean`), `responseValidation` (`'off' \| 'dev' \| 'enforce'`), `errorFormat` (`'plain' \| 'problem+json'`), `status` (`number`), `errorRenderer`. See [Validation Configuration](/docs/validation/configuration). |
| `openapi` | `OpenAPIConfig` | OpenAPI configuration for programmatic apps. In dev, `openapi.config.ts` is auto-discovered; `burger-api build` embeds the convention file, so you rarely set this. See [OpenAPI](/docs/api/openapi). |
| `globalHooks` | `Record<string, unknown>` | Pre-resolved global hooks module (from `src/hooks.ts`). Used in production builds with `apiRoutes`; in dev, `src/hooks.ts` is auto-discovered and this field is ignored. |
| `pluginsModule` | `Record<string, unknown>` | Pre-resolved plugins module (from `src/plugins.ts`). In dev, `src/plugins.ts` is auto-discovered. |
| `providersModule` | `Record<string, unknown>` | Pre-resolved providers module (from `src/providers.ts`). In dev, `src/providers.ts` is auto-discovered. |
| `jit` | `boolean` | JIT-compile each route's hook plan into one function. Default `true`; runtimes that forbid dynamic code generation keep the interpreter. Set `false` to opt out. |
| `engine` | `'auto' \| 'regex' \| 'trie'` | Dynamic-route dispatch engine for the fetch fallback. Default `'auto'` (trie). Static dispatch is unaffected. |
| `hostname` | `string` | Hostname to bind for `serve()`. |
| `adapter` | `RuntimeAdapter` | Runtime adapter override (test/embed seam). Defaults to the Bun adapter, loaded on first `serve()`. |
| `runtimeTarget` | `RuntimeTarget` | Deployment target this build was produced for. Set automatically by `burger-api build --target=<platform>`; resolves WebSocket upgrade handling on targets that cannot be detected at runtime. |
| `maxRequestBodySize` | `number` | Maximum request body size in bytes for `serve()` (Bun's default is 128 MB). Larger bodies are rejected by the runtime with `413`. |

## Dev vs production

You must provide either `apiDir`/`pageDir`/`wsDir` (development) or the prebuilt `apiRoutes`/`pageRoutes`/`wsRoutes` (production builds). In filesystem mode, an unset directory defaults to `./src/api`, `./src/pages`, or `./src/websocket` when that directory exists, matching the CLI build defaults. The CLI build produces the AOT route tables: `burger-api build` embeds them into the bundle, so production never scans the filesystem at runtime. See [CLI Tool](/docs/getting-started/cli) and [Burger Class](/docs/core/burger-class).

## Types for this feature

The options object is typed as `ServerOptions`. TypeScript checks every option you pass.

The types you use (all from `burger-api`):

- `ServerOptions`: the options of `new Burger({...})`
- `RouteDefinition`: a route for `apiRoutes`
- `RouteSchema`: a route's full schema map
- `HTTPMethod`: the allowed method names

✅ Correct, typed options and a typed route definition:

```typescript
import { Burger } from "burger-api";
import type { RouteDefinition } from "burger-api";

const routes: RouteDefinition[] = [
    {
        path: "/users",
        handlers: { GET: (ctx) => Response.json({ ok: true }) },
    },
];

const app = new Burger({
    apiDir: "./src/api",
    apiRoutes: routes,
    debug: true,
});
```

❌ Wrong, an unknown option or a bad method key:

```typescript
new Burger({
    apiDir: "./src/api",
    apiDri: "./src/api", // ❌ Property 'apiDri' does not exist
});

const bad: RouteDefinition = {
    path: "/x",
    handlers: { Get: () => new Response() }, // ❌ 'Get' is not an HTTP method
};
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Burger Class](/docs/core/burger-class)
- [Configuration](/docs/core/configuration)
- [CLI Tool](/docs/getting-started/cli)
- [Validation Configuration](/docs/validation/configuration)
