---
sidebar_label: Error Handling
---

# Validation Error Handling

When a request fails validation, BurgerAPI answers `422`. The handler does not run.

## Default body

The default body follows RFC 9457 (`application/problem+json`). Issues are grouped by slot (`query`, `params`, `headers`, `cookies`, `body`):

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

See [Problem Details](/docs/validation/problem-details) for each field.

## Plain body

Set `errorFormat: "plain"` in [configuration](/docs/validation/configuration) to send only the `errors` object:

```json
{
  "errors": {
    "query": [{ "path": ["limit"], "message": "Invalid input: expected number, received string", "code": "invalid_type" }]
  }
}
```

## Custom body

Pass an `errorRenderer` in [configuration](/docs/validation/configuration) to build the response yourself.

Production error bodies never include stack traces or source paths.

## Related

- [Zod Validation](/docs/validation/zod)
- [Problem Details](/docs/validation/problem-details)
- [Validation Configuration](/docs/validation/configuration)
- [Validation Types](/docs/api/validation-types)
