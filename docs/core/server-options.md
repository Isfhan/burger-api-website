---
sidebar_label: Burger Options
---

# Server Options

The `Burger` constructor accepts a **ServerOptions** object. These are the main options:

| Option | Type | Description |
|--------|------|-------------|
| `apiDir` | `string` | Directory containing API route files (e.g. `./src/api`). Required unless `apiRoutes` is set. Relative to the project root, with an entry-file fallback (`src/`) under `burger-api dev`. See [How directories resolve](/docs/core/configuration#how-directories-resolve). |
| `apiRoutes` | `RouteDefinition[]` | Pre-built API routes from the CLI build. When present, `apiDir` is ignored and no runtime filesystem scan happens. |
| `pageDir` | `string` | Directory for page files. Optional. |
| `pageRoutes` | `PageDefinition[]` | Pre-built page routes from the CLI build. When present, `pageDir` is ignored. |
| `apiPrefix` | `string` | URL prefix for API routes (default: `'api'`). |
| `pagePrefix` | `string` | URL prefix for page routes (default: `''`). |
| `title` | `string` | API title for the OpenAPI document. |
| `description` | `string` | API description for the OpenAPI document. |
| `version` | `string` | API version for the OpenAPI document. |
| `debug` | `boolean` | Enable debug mode (e.g. richer error rendering). |
| `validation` | `ValidatorConfig` | Validation settings: `coerce`, `responseValidation`, `errorFormat`. See [Validation Configuration](/docs/validation/configuration). |
| `openapi` | `OpenAPIConfig` | OpenAPI configuration for production builds. In dev, `openapi.config.ts` is auto-discovered and this field is ignored. |
| `globalHooks` | `Record<string, unknown>` | Pre-resolved global hooks module (from `src/hooks.ts`). Used in production builds with `apiRoutes`; in dev, `src/hooks.ts` is auto-discovered and this field is ignored. |
| `pluginsModule` | `Record<string, unknown>` | Pre-resolved plugins module (from `src/plugins.ts`). In dev, `src/plugins.ts` is auto-discovered. |
| `providersModule` | `Record<string, unknown>` | Pre-resolved providers module (from `src/providers.ts`). In dev, `src/providers.ts` is auto-discovered. |

## Dev vs production

You must provide either `apiDir`/`pageDir` (development) or `apiRoutes`/`pageRoutes` (production builds). The CLI build produces the AOT route tables: `burger-api build` embeds them into the bundle, so production never scans the filesystem at runtime. See [CLI Tool](/docs/getting-started/cli) and [Burger Class](/docs/core/burger-class).

## Types for this feature

The options object is typed as `ServerOptions`. TypeScript checks every option you pass.

The types you use (all from `burger-api`):

- `ServerOptions` — the options of `new Burger({...})`
- `RouteDefinition` — a route for `apiRoutes`
- `RouteSchema` — the shape of a `schema.ts` export
- `HTTPMethod` — the allowed method names

✅ Correct — typed options and a typed route definition:

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

❌ Wrong — an unknown option or a bad method key:

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
