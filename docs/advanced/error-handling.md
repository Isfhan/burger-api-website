---
sidebar_label: Error Handling Patterns
---

# Error Handling Patterns

- **Validation errors:** BurgerAPI returns 422 with an RFC 9457 Problem Details body when validation fails. See [Validation Error Handling](/docs/validation/errors).
- **Unmatched routes:** Requests to paths with no matching route return `404` with an RFC 9457 `application/problem+json` body.
- **Framework errors:** Throw an `HTTPError` subclass (`ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `MethodNotAllowedError`) and let `onError` render it.
- **Hooks:** Return a `Response` (e.g. 401, 403) from a hook to short-circuit the pipeline and send that error directly.
- **Handlers:** Return `Response.json({ error: "..." }, { status: 404 })` or use try/catch and return 500.
- **Debug:** Set `debug: true` in the Burger constructor for stack traces in error responses. See [Configuration](/docs/core/configuration).


## Related

- [Type Safety](/docs/advanced/type-safety)
- [Deployment](/docs/advanced/deployment)
