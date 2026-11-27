---
sidebar_label: Overview
---

# Performance

BurgerAPI does most of its work once, when the app starts. Each request then does only what it needs. You do not need to configure anything to get this.

## What this means for your code

- **Write routes the normal way.** Static, `[param]`, and wildcard routes are all fast to match.
- **Read only what you use.** `ctx.query` and other context fields are parsed when you first read them. A handler that never reads the query never parses it.
- **Set response changes on `ctx.set`.** Status, headers, and cookies are applied once at the end. If you set nothing, your `Response` is returned as is.
- **Hooks cost little.** Each route's hooks are prepared at startup, not looked up on every request.

For measured results, see [burger-api-benchmarks](https://github.com/isfhan/burger-api-benchmarks).

## Related

- [Request Context](/docs/core/request-handling)
- [Benchmarks](/docs/advanced/benchmarks)
