---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Welcome to BurgerAPI

BurgerAPI is a Bun-first framework for building APIs. You create folders and files, and BurgerAPI turns them into routes. It works with TypeScript and JavaScript.

:::info A new BurgerAPI
`burger-api` and `@burger-api/cli` 1.0.0-beta are rebuilt from the ground up and install by default. Please try them and [open an issue](https://github.com/isfhan/burger-api/issues) if anything breaks or feels wrong. See the [release notes](/blog/burger-api-v1.0.0-beta-release) for what is new. Coming from `burger-api@0.9.7` or `@burger-api/cli@0.9.9`? The [migration guide](/docs/migration) covers every breaking change.
:::

### What you get

- **File-based routing:** a folder with a `route.ts` file is a route.
- **Validation:** define schemas in `schema.ts` and read typed data from `ctx.validated`.
- **Hooks:** run code at each step of a request, for example to log or check auth.
- **Plugins and providers:** add features in `src/plugins.ts` and shared services in `src/providers.ts`.
- **OpenAPI:** API docs generated from your routes, served at `/docs`.
- **WebSocket:** real-time routes under `src/websocket/`.
- **Deploy anywhere:** `burger-api build --target=bun|node|cloudflare|deno|vercel`.

### Getting started

- **[Quick Start](./quick-start.md)**
- **[CLI](./getting-started/cli.md)**
- **[Key Concepts](./key-concepts.md)**
- **[JavaScript](./javascript.md)**
- **[Routing](./routing/file-based-routing.md)**
- **[Hooks](./hooks/system.md)**
- **[Validation](./validation/zod.md)**
- **[OpenAPI](./api/openapi.md)**
- **[Deployment](./deployment/bun.md)**: Bun, [Node.js](./deployment/node.md), [Cloudflare Workers](./deployment/cloudflare.md), [Deno](./deployment/deno.md), [Vercel](./deployment/vercel.md)
- **[Ecosystem](./ecosystem/introduction.md)**
- **[Compatibility](./compatibility.md)**: what works on each runtime

## Related

- [Key Concepts](/docs/key-concepts)
- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
