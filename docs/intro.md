---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Welcome to BurgerAPI

BurgerAPI is a Bun-first, WinterCG-compatible TypeScript framework for building modern APIs with file-based routing, end-to-end type safety, and a clear project structure.


### What BurgerAPI is built around

- **File-based routing:** A route is a directory of sibling files.
- **Route convention files:** `route.ts`, `schema.ts`, `hooks.ts`, `openapi.ts`, `config.ts` (self-contained; no group inheritance).
- **Hooks:** Request lifecycle (`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`).
- **Plugins:** Application extensions (`src/plugins.ts`). Hooks and plugins are separate concepts.
- **Providers:** App services via `src/providers.ts` → `ctx.services`.
- **Validation:** Standard Schema (Zod default) in `schema.ts` with per-method exports (`GET`, `POST`, …).
- **Context:** Public type **`BurgerContext`**. Handlers return standard Web **`Response`**.
- **OpenAPI:** Spec + docs UI.
- **Ecosystem:** `ecosystem/hooks/`, `ecosystem/plugins/`, `ecosystem/skills/`.
- **Build config:** `burger.build.ts` (CLI only). Runtime config lives in `new Burger({...})`, plugins, and route `config.ts`.

### Getting started

- **[CLI Quick Start](./getting-started/cli.md)**
- **[Key Concepts](./key-concepts.md)**
- **[Routing](./routing/file-based-routing.md)**
- **[Hooks](./middleware/system.md)** (sidebar label: Hooks; path may still say middleware until pages are renamed)
- **[Validation](./validation/zod.md)**
- **[OpenAPI](./api/openapi.md)**
- **[Ecosystem](./ecosystem/introduction.md)**

### Core ideas

- **[Architecture](./architecture/overview.md)**
- **[BurgerContext](./architecture/burger-context.md)**
- **[Performance](./performance/overview.md)**

### Planned / not planned

- **Planned:** file-based WebSocket router under `src/websocket/`.
- **Not planned:** dedicated webhook router (use normal HTTP routes), ORM, group inheritance.

## Related

- [Key Concepts](/docs/key-concepts)
- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
