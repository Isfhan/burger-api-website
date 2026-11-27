---
sidebar_label: Burger Options
---

# Server Options

`new Burger({...})` takes a `ServerOptions` object. All options are optional. Most apps set none or only a few.

```ts title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiPrefix: "v1",
  debug: true,
});

burger.serve(4000);
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `apiDir` | `string` | Folder with API routes. Default `./src/api`. |
| `pageDir` | `string` | Folder with pages. Default `./src/pages` if it exists. |
| `wsDir` | `string` | Folder with WebSocket routes. Default `./src/websocket` if it exists. |
| `apiPrefix` | `string` | URL prefix for API routes. Default `'api'`. Use `''` to mount at `/`. |
| `pagePrefix` | `string` | URL prefix for pages. Default `''`. |
| `debug` | `boolean` | Show stack traces and response validation details. On by default when `NODE_ENV=development` (`burger-api dev` sets it). `false` turns it off. |
| `validation` | object | `coerce`, `responseValidation` (`'off' \| 'dev' \| 'enforce'`), `errorFormat` (`'plain' \| 'problem+json'`), `status`, `errorRenderer`. See [Validation Configuration](/docs/validation/configuration). |
| `openapi` | `OpenAPIConfig` | OpenAPI settings for apps without `src/openapi.config.ts`. See [OpenAPI](/docs/api/openapi). |
| `title`, `description`, `version` | `string` | Fallback OpenAPI metadata. Prefer `src/openapi.config.ts`. |
| `hostname` | `string` | Hostname for `serve()` to bind. |
| `maxRequestBodySize` | `number` | Largest request body in bytes for `serve()`. Bigger bodies get `413`. Bun's default is 128 MB. |

## Set by the build

`burger-api build` fills these in for you. You do not set them by hand in a normal project.

| Option | What the build puts there |
|--------|-------------|
| `apiRoutes`, `pageRoutes`, `wsRoutes` | Routes found at build time. They replace `apiDir`, `pageDir`, `wsDir`. |
| `assetRoutes` | Files from `<pageDir>/assets/`. |
| `globalHooks`, `pluginsModule`, `providersModule` | Your `src/hooks.ts`, `src/plugins.ts` and `src/providers.ts`. |
| `runtimeTarget` | The `--target` platform. |

In dev, BurgerAPI reads your folders and app files directly. See [CLI Tool](/docs/getting-started/cli).

## Advanced

`jit`, `engine` and `adapter` are for tests and special runtimes. Leave them at their defaults.

## Types

Import `ServerOptions` from `burger-api` if you build the options object separately. TypeScript flags a typo such as `apiDri`. Run `bun run typecheck` to check.

## Related

- [Burger Class](/docs/core/burger-class)
- [Configuration](/docs/core/configuration)
- [CLI Tool](/docs/getting-started/cli)
- [Validation Configuration](/docs/validation/configuration)
