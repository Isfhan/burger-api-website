---
slug: burger-api-v1.0.0-beta-release
title: BurgerAPI v1.0.0-beta Released
authors: [isfhan]
tags: [release, beta, 1.0, typescript, javascript, wintercg, cli, benchmarks]
---

**`burger-api` and `@burger-api/cli` both ship `1.0.0-beta` today. `bun add burger-api` and `bun add -g @burger-api/cli` install it by default. It's a vision-locked rewrite of the framework, not an incremental update, and it's a beta, so we're not calling it production-ready yet. If you're running something in production today, stay on the `0.9.x` line (`bun add burger-api@0.9.7`, `bun add -g @burger-api/cli@0.9.9`) until we cut a stable 1.0.0.**

{/* truncate */}

## What changed since 0.9.x

This is a breaking rewrite, not a patch. The highlights:

- **`BurgerContext` replaces `BurgerRequest`.** Every hook and handler takes
  one context object.
- **Hooks replace middleware.** `onRequest`, `transform`, `beforeRoute`,
  `afterRoute`, `mapResponse`, `onError`: six named lifecycle points instead
  of a middleware chain. Plugins (`burger.usePlugin()`) are a separate
  concept for extending the app, not a middleware alternative.
- **`defineRoute` / `defineHooks`.** New helpers that infer `ctx.validated`
  straight from a route's `schema.ts` export, with no generic to write by
  hand.
- **`burger-api build --target=bun|node|cloudflare|deno|vercel`.** One CLI
  build command generates the right entry and platform config for every
  supported target.
- **Full JavaScript support.** The same route/schema/hooks/openapi/config
  conventions work in `.ts`, `.js`, and `.mjs`.
- **`burger-api inspect` / `doctor`**, both with `--json` for tooling and AI
  agents that need a project's shape programmatically.
- **Auth moved out of core.** Auth factories now live under
  `ecosystem/plugins/` (`jwt-auth`, `session`, `oidc`, `api-key`,
  `basic-auth`, `env`): core stays auth-agnostic.

See `CHANGELOG.md` in the [burger-api repo](https://github.com/isfhan/burger-api)
for the complete list, including several real bugs found and fixed during
this beta's own testing pass: a dead constant that crashed every Cloudflare
Worker on boot, `config.ts` silently dropping in production builds, `dist`
not resolving under stock Node ESM, and `createNodeWsBridge()` being
completely non-functional (five separate bugs, all fixed and now covered by
a real two-client WebSocket round-trip test).

## Known limitations in this beta

We'd rather list these than have you discover them:

- **Pages (`src/pages/`) are Bun-only.** No page routing on Cloudflare
  Workers, Vercel, Deno Deploy, or Node in this release. API routes are
  fully portable across all of them; pages are not, yet.
- **`burger-api add` / `list` / `skills install` need
  `BURGER_API_BRANCH=feat/burger-api-v1`** set in your environment for now.
  The default (`main`) still serves the pre-1.0 ecosystem catalog until it's
  updated to match this release. `burger-api create` prints this as a note
  on scaffold.

## Verification

Before calling this a beta rather than a draft, we ran it, not just
compiled it:

- **958 tests pass, 0 failures**, across 19 suites: routing, lifecycle,
  context, validation, the compiler, every adapter, providers, and
  WebSocket, plus the CLI's own suite.
- Typecheck and production builds are clean.
- `@burger-api/node-server`'s adapter is verified against a real
  `node:http` server and a real two-client WebSocket broadcast, running
  under plain Node, not simulated.
- `bun audit`: no known vulnerabilities in the dependency tree.

## Benchmarks

We measure BurgerAPI against other frameworks with identical route shapes in
each, and we average three separate runs rather than report a single sample
(single-run throughput on shared hardware varies 10-15% run to run). The raw
numbers, harness, and dated reports live in
[burger-api-benchmarks](https://github.com/isfhan/burger-api-benchmarks), the
single home for BurgerAPI performance data. Reproduce it yourself with
`bun run battle --profile ci`.

## Try it

```bash
bun add burger-api
bun add -g @burger-api/cli
burger-api create my-app
```

Read the docs at [burger-api.com](https://burger-api.com), file issues on
[GitHub](https://github.com/isfhan/burger-api/issues), and if you hit
something this beta didn't catch, that's exactly what a beta is for.
