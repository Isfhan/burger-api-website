---
sidebar_label: Error Handling
---

# Validation Error Handling

When validation fails, BurgerAPI throws a `ValidationError`, which is rendered as a **422** response with a structured error payload. The format is consistent and easy for a frontend to parse into field-level errors.

## Default: Problem Details

By default a failed request gets a `422` with an RFC 9457 Problem Details body. Issues are grouped by the validation slot that failed (query, params, headers, cookies, or body). This is the actual response for `GET /api/items?limit=abc` against a `query: z.object({ limit: z.number() })` schema:

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

`detail` is `"<slot>: <first issue message>"` for one issue, or `"<slot>: N validation errors"` for several. See [Problem Details](/docs/validation/problem-details) for the full shape.

## Plain format

Set `errorFormat: "plain"` in [configuration](/docs/validation/configuration) to drop the Problem Details wrapper:

```json
{
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

Each issue has a `path` (where the problem is) and a `message` (what went wrong); Zod issues also carry a `code`. In development the plain body adds `"dev": true`; production omits it.

## Safe in production

Production error bodies never include stack traces, source paths, or schema internals. They include only the `path` and `message` of each issue. Development mode may include a little more detail to help you debug, but it never leaks internals in production.

## Fully custom errors

If neither format fits, provide an `errorRenderer` in [configuration](/docs/validation/configuration). It receives the validation result and returns the `Response` you want.


## Related

- [Zod Validation](/docs/validation/zod)
- [Problem Details](/docs/validation/problem-details)
- [Validation Configuration](/docs/validation/configuration)
- [Validation Types](/docs/api/validation-types)
