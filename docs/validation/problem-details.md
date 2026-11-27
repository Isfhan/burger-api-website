---
sidebar_label: Problem Details
---

# Problem Details (problem+json)

By default, a failed request gets a `422` with an `application/problem+json` body. The shape follows [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). You do not need to turn it on.

## The response shape

For `GET /api/items?limit=abc` with `query: z.object({ limit: z.number() })`:

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

- `title`: `"Validation Error"` for validation failures. Other errors use the status phrase, such as `"Not Found"`.
- `detail`: the slot and the first message, or the number of errors.
- `errors`: issues grouped by slot. Each issue has a `path`, a `message`, and for Zod a `code`.

Production bodies never include stack traces or source paths. In development, extra details such as `stack` may appear.

To use a simpler body, set `errorFormat: "plain"`. To build your own, pass an `errorRenderer`. See [Validation Configuration](/docs/validation/configuration).

## Related

- [Validation Errors](/docs/validation/errors)
- [Validation Configuration](/docs/validation/configuration)
- [Response Validation](/docs/validation/response)
