---
sidebar_label: Error Handling Patterns
---

# Error Handling Patterns

- **Validation errors:** BurgerAPI returns 400 with a structured body when Zod validation fails. See [Validation Error Handling](/docs/validation/errors).
- **Middleware:** Return a `Response` (e.g. 401, 403) from middleware to short-circuit and send an error.
- **Handlers:** Return `Response.json({ error: "..." }, { status: 404 })` or use try/catch and return 500.
- **Debug:** Set `debug: true` in the Burger constructor for stack traces in error responses. See [Configuration](/docs/core/configuration).
