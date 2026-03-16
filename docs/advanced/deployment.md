---
sidebar_label: Deployment
---

# Deployment

Deploy BurgerAPI by building for production and running the output:

1. **Bundle:** `burger-api build src/index.ts` → run with `bun .build/bundle/app.js` (default path). Deploy this single file and run it with Bun on the server.
2. **Executable:** `burger-api build:exec src/index.ts` → output in `.build/executable/`. Deploy the binary; no Bun install required on the target.

Routes and options are embedded at build time (AOT). For pages, the build may output assets to a directory—deploy that directory together with the bundle or binary. See [CLI Build](/docs/cli/build), [Build Exec](/docs/cli/build-exec), and [Deployment Overview](/docs/deployment/overview).
