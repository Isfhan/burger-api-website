---
sidebar_label: Deployment
---

# Deployment

Build your app with `burger-api build`, then run it on your target. Each target has its own guide:

- [Bun](/docs/deployment/bun): `burger-api build`, then `burger-api start`.
- [Node.js](/docs/deployment/node): `serve(app)` from `@burger-api/node-server`.
- [Cloudflare Workers](/docs/deployment/cloudflare)
- [Vercel](/docs/deployment/vercel)
- [Deno](/docs/deployment/deno)

Edge targets use `toFetchHandler(app)`. See [CLI Build](/docs/cli/build) and [Build Exec](/docs/cli/build-exec).

## Related

- [Error Handling Patterns](/docs/advanced/error-handling)
- [Type Safety](/docs/advanced/type-safety)
- [Benchmarks](/docs/advanced/benchmarks)
