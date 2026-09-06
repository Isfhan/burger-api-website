---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Welcome to BurgerAPI

BurgerAPI is a Bun-first, WinterCG-compatible framework for building modern APIs with file-based routing, end-to-end type safety, and a clear project structure. TypeScript and JavaScript are both first-class: the same conventions work with `.ts`, `.js`, and `.mjs` route files, and JavaScript projects get full JSDoc type-checking.

Version 1.0.0 is out: `burger-api` and `@burger-api/cli` are stable at `1.0.0`.

### What BurgerAPI is built around

- **File-based routing:** A route is a directory of sibling files.
- **Route convention files:** `route.ts`, `schema.ts`, `hooks.ts`, `openapi.ts`, `config.ts` (self-contained; no group inheritance).
- **Hooks:** Request lifecycle (`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`).
- **Plugins:** Application extensions (`src/plugins.ts`). Hooks and plugins are separate concepts.
- **Providers:** App services via `src/providers.ts` → `ctx.services`.
- **Validation:** Standard Schema (Zod default) in `schema.ts` with per-method exports (`GET`, `POST`, …).
- **Context:** Public type **`BurgerContext`**. Handlers return standard Web **`Response`**.
- **Type inference:** `defineRoute(schema, handler)` / `defineHooks(schema, hooks)` infer `ctx.validated` from your schema — no generic to write by hand.
- **OpenAPI:** Spec + docs UI.
- **Ecosystem:** `ecosystem/hooks/`, `ecosystem/plugins/`, `ecosystem/skills/`.
- **Build config:** `burger.build.ts` (CLI only). Runtime config lives in `new Burger({...})`, plugins, and route `config.ts`.
- **Deploy targets:** `burger-api build --target=bun|node|cloudflare|deno|vercel` — one command per platform, no hand-written entry files.

### Getting started

- **[CLI Quick Start](./getting-started/cli.md)**
- **[Key Concepts](./key-concepts.md)**
- **[JavaScript](./javascript.md)**
- **[Routing](./routing/file-based-routing.md)**
- **[Hooks](./hooks/system.md)**
- **[Validation](./validation/zod.md)**
- **[OpenAPI](./api/openapi.md)**
- **[Deployment](./deployment/bun.md)** — Bun, [Node.js](./deployment/node.md), [Cloudflare Workers](./deployment/cloudflare.md), [Deno](./deployment/deno.md), [Vercel](./deployment/vercel.md)
- **[Ecosystem](./ecosystem/introduction.md)**

### Core ideas

- **[Performance](./performance/overview.md)** and **[Benchmarks](./advanced/benchmarks.md)**
- **[Type Safety](./advanced/type-safety.md)**
- **[Compatibility](./compatibility.md)** — what works on each runtime

## Related

- [Key Concepts](/docs/key-concepts)
- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
