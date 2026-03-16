---
sidebar_label: Server Options
---

# Server Options

The `Burger` constructor accepts a **ServerOptions** object. These are the main options:

| Option | Type | Description |
|--------|------|-------------|
| `apiDir` | `string` | Directory containing API route files (e.g. `route.ts`). Required unless `apiRoutes` is set. |
| `apiRoutes` | `RouteDefinition[]` | Pre-built API routes for production; when set, `apiDir` is ignored. |
| `pageDir` | `string` | Directory for static/dynamic page files. Optional unless you serve pages. |
| `pageRoutes` | `PageDefinition[]` | Pre-built page routes for production; when set, `pageDir` is ignored. |
| `apiPrefix` | `string` | URL prefix for API routes (default: `'api'`). |
| `pagePrefix` | `string` | URL prefix for page routes (default: `''`). |
| `globalMiddleware` | `Middleware[]` | Middleware that runs on every request. |
| `title` | `string` | API title for OpenAPI docs. |
| `description` | `string` | API description for OpenAPI. |
| `version` | `string` | API version for OpenAPI. |
| `debug` | `boolean` | Enable debug mode (e.g. stack traces). |

You must provide either `apiDir`/`pageDir` (for development) or `apiRoutes`/`pageRoutes` (for production builds). See [Configuration](/docs/core/configuration) for full details and examples.
