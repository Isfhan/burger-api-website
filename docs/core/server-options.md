---
sidebar_label: Burger Options
---

# Server Options

The `Burger` constructor accepts a **ServerOptions** object. These are the main options:

| Option | Type | Description |
|--------|------|-------------|
| `apiDir` | `string` | Directory containing API route files (e.g. `./src/api`). Required unless `apiRoutes` is set. |
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
| `models` | `Record<string, Schema>` | Named, reusable validation shapes referenced by string from any route's `schema`. See [Model Registry](/docs/validation/models). |
| `openapi` | `OpenAPIConfig` | OpenAPI configuration for production builds. In dev, `openapi.config.ts` is auto-discovered and this field is ignored. |
| `globalHooks` | `Record<string, unknown>` | Pre-resolved global hooks module (from `src/hooks.ts`). Used in production builds with `apiRoutes`; in dev, `src/hooks.ts` is auto-discovered and this field is ignored. |
| `pluginsModule` | `Record<string, unknown>` | Pre-resolved plugins module (from `src/plugins.ts`). In dev, `src/plugins.ts` is auto-discovered. |
| `providersModule` | `Record<string, unknown>` | Pre-resolved providers module (from `src/providers.ts`). In dev, `src/providers.ts` is auto-discovered. |

## Dev vs production

You must provide either `apiDir`/`pageDir` (development) or `apiRoutes`/`pageRoutes` (production builds). The CLI build produces the AOT route tables: `burger-api build` embeds them into the bundle, so production never scans the filesystem at runtime. See [CLI Tool](/docs/getting-started/cli) and [Burger Class](/docs/core/burger-class).

## Related

- [Burger Class](/docs/core/burger-class)
- [Configuration](/docs/core/configuration)
- [CLI Tool](/docs/getting-started/cli)
- [Validation Configuration](/docs/validation/configuration)
