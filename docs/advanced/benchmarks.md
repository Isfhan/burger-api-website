---
sidebar_label: Benchmarks
---

# Benchmarks

BurgerAPI's performance work is architectural, not a hand-tuned hot loop: routes resolve through Bun's native route map first, fall back to a precompiled radix trie otherwise, each route's hook chain is flattened once at boot into a frozen `HookPlan`, validators are compiled once and cached by structural identity, and a JIT compiler collapses a route's whole hook chain into one function (on by default). None of that work happens per request.

All measured numbers live in [burger-api-benchmarks](https://github.com/isfhan/burger-api-benchmarks), a dedicated sibling repository and the single home for BurgerAPI performance data. It contains the harness, the methodology, the raw JSON, and dated reports, so results can be reproduced and audited instead of copied out of date.

## Reproduce it yourself

Clone the repository and run:

```bash
bun run battle --profile ci
```

`--profile ci` uses modest load settings suitable for a developer machine. Raw output lands in the repository's `reports/` directory. Run it a few times and compare: single-run throughput on shared, non-dedicated hardware varies by 10-15% run to run, so averages are more trustworthy than a single sample.

## What the JIT hook compiler does

`optimize/hooks-jit` vs `optimize/hooks-interpreter` runs the identical route (2 `beforeRoute` hooks + 1 `afterRoute` hook) once through the standard interpreter loop (`jit: false`) and once through the JIT-compiled `HookPlan` (`jit: true`, the default). The JIT compiler is capability-probed per process and enabled by default; the interpreter is kept for runtimes that forbid dynamic code generation (Cloudflare Workers) and for debugging the compiler itself.

## Related

- [Performance](/docs/performance/overview)
- [Type Safety](/docs/advanced/type-safety)
- [Deployment](/docs/advanced/deployment)
