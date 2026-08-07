---
slug: burger-api-v1.0.0-release
title: BurgerAPI v1.0.0 Released
authors: [isfhan]
tags: [release, stable, 1.0, typescript, javascript, wintercg]
---

**BurgerAPI 1.0.0 is the first stable release. The architecture is locked, and `burger-api` and `@burger-api/cli` both ship at 1.0.0 with the scaffold pinned to `^1.0.0`.**

<!-- truncate -->

## What 1.0 means

Version 1.0 is the stabilization pass: every public API is final, the
lifecycle is the six hook points, and the type surface is `BurgerContext`
throughout. The framework is ready for production use.

## TypeScript and JavaScript, both first-class

The same conventions work in both languages: `route.ts` / `route.js` / `route.mjs`, `schema.*`, `hooks.*`, `openapi.*`, `config.*`. Scaffold with `burger-api create <name> --lang ts|js`. JavaScript projects get a `jsconfig.json` with `checkJs: true` and JSDoc-typed routes.

## Type safety end to end

`ctx.validated` is inferred from the route's `schema.ts` with the type-helper pattern:

```ts
// schema.ts
export const GET = { query: z.object({ q: z.string() }) };

// route.ts
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  ctx.validated.query.q; // typed: { q: string }
}
```

Zod v4 is the default validator; any Standard Schema library (Valibot, ArkType, Effect Schema) works through the same `schema.ts` exports.

## WinterCG deployment surface

`toFetchHandler(burger)` returns a standard `(request, ...env) => Promise<Response>` that runs on Cloudflare Workers, Vercel, Deno Deploy, and Node 24+. The Bun adapter is lazy-loaded, so WinterCG bundles never contain a `bun` import. Edge deployments use AOT-compiled routes (`burger-api build`) with no runtime filesystem scanning.

## What stayed

The hybrid router (Bun native static routes plus trie dispatch), the six hook points, RFC 9457 problem-detail errors, automatic OpenAPI with Scalar / Swagger / Redoc docs, the plugin and macro systems, providers, file-based WebSocket under `src/ws/`, and page routing are all part of the stable surface.

## Verification

- 728 tests pass across 19 suites, zero failures
- Typecheck and production builds are clean
- Create E2E green for both the TypeScript and JavaScript scaffold legs (create → dev 200 → build → start 200)
- WinterCG fetch adapter tests green, including a bundle-content check that no `bun` import leaks in

Benchmark results live in the [burger-api-benchmarks](https://github.com/isfhan/burger-api-benchmarks) repository, the single home for performance data.

## What is next

Stable public APIs from here. New features land in minor versions, bug fixes in patches. Updated AI skills ship with every release so assistants can help migrate projects accurately.

Thank you for following BurgerAPI to this point. The architecture is locked and the framework is stable. Build something.
