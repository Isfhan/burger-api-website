---
sidebar_label: Error Handling
---

# Validation Error Handling

When validation fails, BurgerAPI returns a **400** response with a structured error payload. The format is consistent and easy for a frontend to parse into field-level errors.

## Default (plain) format

By default the body groups issues by slot:

```json
{
  "errors": {
    "query": [
      { "path": ["query", "limit"], "message": "Expected number, received string" }
    ]
  }
}
```

Each issue has a `path` (where the problem is) and a `message` (what went wrong).

## Problem Details format

Set `errorFormat: "problem+json"` in [configuration](/docs/validation/configuration) to get an RFC 9457-style body:

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

See [Problem Details](/docs/validation/problem-details) for the full shape.

## Safe in production

Production error bodies never include stack traces, source paths, or schema internals — only the `path` and `message` of each issue. Development mode may include a little more detail to help you debug, but it never leaks internals in production.

## Fully custom errors

If neither format fits, provide an `errorRenderer` in [configuration](/docs/validation/configuration). It receives the validation result and returns the `Response` you want.


## Related

- [Zod Validation](/docs/validation/zod)
- [Problem Details](/docs/validation/problem-details)
- [Validation Configuration](/docs/validation/configuration)
- [Validation Types](/docs/api/validation-types)
