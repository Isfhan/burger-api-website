---
sidebar_label: Response Validation
---

# Response Validation

BurgerAPI can also check what your handler **returns**. Declare a `response` schema and BurgerAPI validates the handler's output after it runs — helping you catch contract drift and bugs early.

## Example

```typescript title="api/status/schema.ts"
import { z } from "zod";

export const GET = {
  response: { 200: z.object({ ok: z.boolean() }) },
};
```

```typescript title="api/status/route.ts"
export function GET() {
  return Response.json({ ok: true });
}
```

## Modes

Response validation has three modes, set in [configuration](/docs/validation/configuration) under `responseValidation`:

- **`dev`** (default) — observe only. In development, a mismatch is logged to the console but the response is returned unchanged. Nothing breaks.
- **`enforce`** — a mismatch returns a safe `500` error (or `422` if the handler itself returned `422`). No internal details leak.
- **`off`** — never validate responses.

The default `dev` mode means adding a `response` schema is **free and safe**: existing apps that declare none are unaffected, and apps that declare one get helpful feedback without risking a broken response.

## Status selection

BurgerAPI picks the schema by status code: an exact code first (`200`), then a class (`2xx`). So `response: { "2xx": ... }` covers every success status.

## When to use it

- Catching a handler that returns the wrong shape.
- Documenting the contract your route promises.
- Enforcing strict contracts in `enforce` mode for production-critical routes.

For full RFC-style error documents on request failures, see [Problem Details](/docs/validation/problem-details).


## Related

- [Validation Configuration](/docs/validation/configuration)
- [Schema Definition](/docs/validation/schema)
- [Problem Details](/docs/validation/problem-details)
- [Validation Best Practices](/docs/validation/best-practices)
