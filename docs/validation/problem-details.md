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

```json
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 422,
  "errors": {
    "query": [
      { "path": ["limit"], "message": "Expected number, received string" }
    ]
  }
}
```

`errors` groups issues by the validation slot that failed (query, params, headers, cookies, or body). Each entry carries the `path` (where the problem is) and a `message` (what went wrong). The `Content-Type` is `application/problem+json`.

## Safe in production

Whether you use the default format or the plain alternative, production error bodies never include stack traces, source paths, or schema internals. Only the `path` and `message` of each issue are returned.

## Custom errors

If you need a different shape entirely, provide your own `errorRenderer` in [configuration](/docs/validation/configuration). It receives the validation result and returns the `Response` you want.


## Related

- [Validation Errors](/docs/validation/errors)
- [Validation Configuration](/docs/validation/configuration)
- [Response Validation](/docs/validation/response)
