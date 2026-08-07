---
sidebar_label: Deployment
---

# Deployment

Deployment depends on your runtime. BurgerAPI's deployment guides cover each target:

- [Deploy on Bun](/docs/deployment/bun) — `burger.serve(port)` with `burger-api build` and `burger-api start`.
- [Deploy on Cloudflare Workers](/docs/deployment/cloudflare)
- [Deploy on Vercel](/docs/deployment/vercel)
- [Deploy on Deno](/docs/deployment/deno)

The production flow is `burger-api build` (routes and options are embedded at build time), then `burger-api start` for Bun, or `toFetchHandler(app)` for WinterCG targets. See [CLI Build](/docs/cli/build) and [Build Exec](/docs/cli/build-exec).


## Related

- [Error Handling Patterns](/docs/advanced/error-handling)
- [Type Safety](/docs/advanced/type-safety)
