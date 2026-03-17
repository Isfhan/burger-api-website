---
sidebar_label: Zod Validation
---

# Zod Validation

BurgerAPI uses [Zod](https://zod.dev/) for request validation. Define schemas for query parameters, path params, and request body; BurgerAPI validates before your handler runs and attaches the result to `req.validated`.

BurgerAPI v0.3.0+ uses Zod 4.x for better performance and error format. See [Schema Definition](/docs/validation/schema) and the full [Validation](/docs/request-handling/validation) guide.
