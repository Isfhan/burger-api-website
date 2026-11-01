---
sidebar_label: Problem Details
---

# Problem Details (problem+json)

When a request fails validation, BurgerAPI returns a `422` with a structured error body in the **Problem Details** format (`application/problem+json`), which follows the shape described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457).

## Set it explicitly

Problem Details is the default. If you want to be explicit, set `errorFormat: "problem+json"` in the `Burger` constructor:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
  validation: { errorFormat: "problem+json" },
});
```

## The response shape

This is the actual response for `GET /api/items?limit=abc` against a `query: z.object({ limit: z.number() })` schema:

```json
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 422,
  "detail": "query: Invalid input: expected number, received string",
  "errors": {
    "query": [
      {
        "path": ["limit"],
        "message": "Invalid input: expected number, received string",
        "code": "invalid_type"
      }
    ]
  }
}
```

`title` is always `"Validation Error"` for request validation failures; for other framework errors it is the HTTP status phrase (`"Not Found"`, `"Unsupported Media Type"`, `"Internal Server Error"`, and so on). `errors` groups issues by the validation slot that failed (query, params, headers, cookies, or body). Each entry carries the `path` (where the problem is), a `message` (what went wrong), and (for Zod) a `code`. The `Content-Type` is `application/problem+json`.

## Safe in production

Whether you use the default format or the plain alternative, production error bodies never include stack traces, source paths, or schema internals. Only the `path`, `message`, and `code` of each issue are returned. Development responses add diagnostics such as `stack` and `cause`, and 500 details are replaced with `"Internal Server Error"` in production.

## Custom errors

If you need a different shape entirely, provide your own `errorRenderer` in [configuration](/docs/validation/configuration). It receives the validation result and returns the `Response` you want.


## Related

- [Validation Errors](/docs/validation/errors)
- [Validation Configuration](/docs/validation/configuration)
- [Response Validation](/docs/validation/response)
