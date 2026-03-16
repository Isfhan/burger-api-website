---
sidebar_label: Key Concepts
sidebar_position: 2
---

# Key Concepts

BurgerAPI is a Bun-native framework for APIs and web apps. Here are the main ideas.

## File-based routing

Routes are defined by your **file and folder structure**. Put `route.ts` files under your API directory (e.g. `src/api`), and BurgerAPI maps them to URLs. Same idea for static or dynamic pages. No manual route registration.

See [File-Based Routing](/docs/routing/file-based-routing), [Static Routes](/docs/routing/static-routes), and [Configuration](/docs/core/configuration).

## Burger instance and configuration

You create one **`Burger`** instance with options: `apiDir`, `pageDir`, `apiPrefix`, `pagePrefix`, `globalMiddleware`, and OpenAPI metadata. For production builds you can pass pre-built **`apiRoutes`** and **`pageRoutes`** instead of dirs.

See [Burger Class](/docs/core/burger-class), [Server Options](/docs/core/server-options), and [Configuration](/docs/core/configuration).

## Middleware

**Middleware** runs before (and optionally after) your route handlers. Use it for auth, logging, CORS, etc. You can attach middleware globally or per route.

See [Middleware System](/docs/middleware/system), [Global Middleware](/docs/middleware/global), and [Request Handling](/docs/core/request-handling).

## Zod validation

Request **validation** is done with [Zod](https://zod.dev/) schemas. Define schemas for query, params, and body; BurgerAPI validates and attaches the result to `req.validated`.

See [Zod Validation](/docs/validation/zod), [Schema Definition](/docs/validation/schema), and [Request Handling](/docs/core/request-handling).

## OpenAPI and Swagger UI

BurgerAPI can **generate OpenAPI 3.0** from your routes and Zod schemas and serve **Swagger UI** for interactive docs.

See [OpenAPI Generation](/docs/openapi/generation), [Swagger UI](/docs/openapi/swagger-ui), and [API Documentation](/docs/api/openapi).

## CLI and builds

The **Burger API CLI** lets you create projects, add middleware, run a dev server, and build for production (`burger-api build`, `burger-api build:exec`). New projects get a `burger.config.ts` at the root.

See [CLI Tool](/docs/getting-started/cli) and [Build Command](/docs/cli/build).
