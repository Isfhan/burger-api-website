---
sidebar_label: Problem Details
---

# Problem Details (problem+json)

When a request fails validation, BurgerAPI returns a `400` with a structured error body. By default the body is a simple JSON object grouped by slot. You can switch to the **Problem Details** format (`application/problem+json`), which follows the shape described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457).

## Enable it

```typescript
// burger.config.ts
export default {
  validation: { errorFormat: "problem+json" },
};
```

## The response shape

```json
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 400,
  "detail": "Request validation failed.",
  "errors": [
    { "path": ["query", "limit"], "message": "Expected number, received string" }
  ]
}
```

Each entry in `errors` carries the `path` (where the problem is) and a `message` (what went wrong). The `Content-Type` is `application/problem+json`.

## Safe in production

Whether you use the default format or Problem Details, production error bodies never include stack traces, source paths, or schema internals. Only the `path` and `message` of each issue are returned.

## Custom errors

If you need a different shape entirely, provide your own `errorRenderer` in [configuration](/docs/validation/configuration). It receives the validation result and returns the `Response` you want.


## Related

- [Validation Errors](/docs/validation/errors)
- [Validation Configuration](/docs/validation/configuration)
- [Response Validation](/docs/validation/response)
