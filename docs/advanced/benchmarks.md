---
sidebar_label: Benchmarks
---

# Benchmarks

BurgerAPI's performance work is architectural, not a hand-tuned hot loop: routes resolve through Bun's native route map first, fall back to a precompiled radix trie otherwise, each route's hook chain is flattened once at boot into a frozen `HookPlan`, validators are compiled once and cached by structural identity, and a JIT compiler collapses a route's whole hook chain into one function (on by default). None of that work happens per request.

The numbers below come from `burger-api-benchmarks`, a dedicated sibling repository that is the single home for measuring BurgerAPI performance, run with [Bombardier](https://github.com/codesenberg/bombardier) against Bun 1.4.0. Full methodology, raw JSON, and the harness itself live in that repository.

## Against other frameworks

Identical route shapes implemented in each framework (`bun run battle --profile ci`), so the difference measured is framework overhead, not application logic. Same load settings applied to every contestant: 128 connections, 8s duration, 2s warm-up.

| Scenario | BurgerAPI | Elysia | Elysia 2 <sup>†</sup> | Hono | Express <sup>‡</sup> |
| --- | --- | --- | --- | --- | --- |
| routing/static | 109,823 req/s | 107,370 req/s | 111,461 req/s | 105,958 req/s | 64,003 req/s |
| routing/param | 103,587 req/s | 108,327 req/s | 115,671 req/s | 112,215 req/s | 62,526 req/s |
| json/echo | 113,864 req/s | 111,175 req/s | 109,254 req/s | 110,667 req/s | 63,431 req/s |
| validation/body | 97,779 req/s | 99,105 req/s | 102,498 req/s | 94,726 req/s | 45,201 req/s |

<sup>†</sup> Elysia 2 (`elysia@experimental`) is included for evaluation only — it is not yet Elysia's default release.
<sup>‡</sup> Express is Node-based and ran under Bun's Node compatibility layer, not native Node; treat its column as "Express-on-Bun."

BurgerAPI lands within a few percent of Elysia, Elysia 2, and Hono on every scenario — none of them are the outlier here, Express is. That's the honest takeaway: **not fastest on every row, competitive on all of them**, at a considerably higher level of built-in structure (file-based routing, lifecycle hooks, schema validation, OpenAPI generation) than a raw router benchmark implies.

Reproduce it yourself: `bun run battle --profile ci` in `burger-api-benchmarks`, or `--profile full` for a longer, higher-concurrency run.

## What the JIT hook compiler actually buys you

`optimize/hooks-jit` vs `optimize/hooks-interpreter` runs the identical route — 2 `beforeRoute` hooks + 1 `afterRoute` hook — once through the standard interpreter loop (`jit: false`) and once through the JIT-compiled `HookPlan` (`jit: true`, the default):

| Scenario | req/s | p99 |
| --- | --- | --- |
| optimize/hooks-interpreter (`jit: false`) | 112,615 req/s | 3.37 ms |
| optimize/hooks-jit (`jit: true`, default) | 115,309 req/s | 3.30 ms |

A measured, modest gain on this hook shape — the JIT compiler is capability-probed per process and enabled by default; there is no reason to turn it off outside of debugging the compiler itself.

## Solo scenario suite

`bun run bench` runs 25 scenarios covering routing (static/dynamic/wildcard/nested), validation (query/params/body/coercion/response), request parsing, error paths, and the dispatch-engine comparisons above — request rate stays in the ~90k–115k req/s band across the board on Bun 1.4.0, with the notable exception of `errors/validation` (a POST with an intentionally invalid body, exercising the full Zod validation-error-formatting path) at ~43k req/s. See the repo's `reports/` directory for the complete, dated JSON output this table is generated from.

## Related

- [Type Safety](/docs/advanced/type-safety)
- [Deployment](/docs/advanced/deployment)
