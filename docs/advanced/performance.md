---
sidebar_label: Performance Optimization
---

# Performance Optimization

BurgerAPI is built on Bun for fast startup and request handling. To get the most out of it:

- Use **production builds** (`burger-api build` or `burger-api build:exec`) so routes are discovered at build time and no filesystem scanning happens at runtime.
- Keep **global middleware** minimal; use route-specific middleware where possible.
- Use **Zod** schemas so validation runs once before handlers.
- For deployment, run the bundle or executable; see [Deployment](/docs/advanced/deployment) and [Deployment Overview](/docs/deployment/overview).
