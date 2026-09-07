---
sidebar_label: Benchmarks
---

# Benchmarks

BurgerAPI's performance work is architectural, not a hand-tuned hot loop: routes resolve through Bun's native route map first, fall back to a precompiled radix trie otherwise, each route's hook chain is flattened once at boot into a frozen `HookPlan`, validators are compiled once and cached by structural identity, and a JIT compiler collapses a route's whole hook chain into one function (on by default). None of that work happens per request.

The numbers below come from `burger-api-benchmarks`, a dedicated sibling repository that is the single home for measuring BurgerAPI performance, run with [Bombardier](https://github.com/codesenberg/bombardier) against Bun 1.4.0. Full methodology, raw JSON, and the harness itself live in that repository.

**Hardware:** Intel Core i5-14400F (16 threads), 32 GB RAM, Windows 10 x64, Bun 1.4.0. A single consumer desktop, not a dedicated benchmark server — see the noise note below.

## Against other frameworks

Identical route shapes implemented in each framework (`bun run battle --profile ci`), so the difference measured is framework overhead, not application logic. Same load settings applied to every contestant: 128 connections, 8s duration, 2s warm-up. Figures are the **mean of 3 consecutive runs** on the same machine, not a single sample — single-run throughput on shared, non-dedicated hardware varies by 10-15% run to run, and averaging is what makes these numbers trustworthy rather than a lucky (or unlucky) roll.

| Scenario | BurgerAPI | Elysia | Elysia 2 <sup>†</sup> | Hono | Express <sup>‡</sup> |
| --- | --- | --- | --- | --- | --- |
| routing/static | 104,234 req/s | 111,869 req/s | 107,121 req/s | 103,928 req/s | 62,240 req/s |
| routing/param | 98,269 req/s | 110,834 req/s | 108,139 req/s | 104,398 req/s | 59,827 req/s |
| json/echo | **107,109 req/s** | 105,569 req/s | 100,960 req/s | 100,513 req/s | 57,200 req/s |
| validation/body | **88,676 req/s** | 88,142 req/s | 89,467 req/s | 83,378 req/s | 43,994 req/s |
| **Average** | 99,572 req/s | 104,103 req/s | 101,422 req/s | 98,054 req/s | 55,815 req/s |

<sup>†</sup> Elysia 2 (`elysia@experimental`) is included for evaluation only: it is not yet Elysia's default release.
<sup>‡</sup> Express is Node-based and ran under Bun's Node compatibility layer, not native Node; treat its column as "Express-on-Bun."

The honest takeaway: BurgerAPI **beats Hono in 3 of 4 scenarios** (static routing narrowly, then JSON serialization and Zod validation outright), trails Hono only on dynamic (`:param`) routing, and lands a few percent behind Elysia overall — mostly on raw routing dispatch, where Elysia's compile-time route optimization has an edge. Once Zod validation enters the request path, BurgerAPI comes out fastest of the four. Against Express, the gap is not close: **roughly 1.8x its throughput** in every scenario.

Reproduce it yourself: `bun run battle --profile ci` in `burger-api-benchmarks`, run 2-3 times and compare. We don't recommend `--profile full` (512 connections) on non-server hardware — on a desktop also running a browser, editor, and OS background work, that concurrency level saturates the machine itself rather than isolating framework overhead, and swings results by 30%+ between runs.

## What the JIT hook compiler actually buys you

`optimize/hooks-jit` vs `optimize/hooks-interpreter` runs the identical route (2 `beforeRoute` hooks + 1 `afterRoute` hook) once through the standard interpreter loop (`jit: false`) and once through the JIT-compiled `HookPlan` (`jit: true`, the default):

| Scenario | req/s | p99 |
| --- | --- | --- |
| optimize/hooks-interpreter (`jit: false`) | 100,778 req/s | 3.64 ms |
| optimize/hooks-jit (`jit: true`, default) | 104,833 req/s | 3.47 ms |

A measured, modest gain (~4%) on this hook shape. The JIT compiler is capability-probed per process and enabled by default; there is no reason to turn it off outside of debugging the compiler itself.

## Solo scenario suite

`bun run bench` runs 25 scenarios covering routing (static/dynamic/wildcard/nested), validation (query/params/body/coercion/response), request parsing, error paths, and the dispatch-engine comparisons above. Request rate stays in the ~78k–105k req/s band across the board on Bun 1.4.0, with the notable exception of `errors/validation` (a POST with an intentionally invalid body, exercising the full Zod validation-error-formatting path) at ~46k req/s. See the repo's `reports/` directory for the complete, dated JSON output this table is generated from.

## Related

- [Type Safety](/docs/advanced/type-safety)
- [Deployment](/docs/advanced/deployment)
