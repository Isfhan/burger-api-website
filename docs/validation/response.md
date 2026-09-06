---
sidebar_label: Response Validation
---

# Response Validation

BurgerAPI can also check what your handler **returns**. Declare a `response` schema and BurgerAPI validates the handler's output after it runs, helping you catch contract drift and bugs early.

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

- **`dev`** (default): observe only. In development, a mismatch is logged to the console but the response is returned unchanged. Nothing breaks.
- **`enforce`**: a mismatch returns a safe `500` error (or `422` if the handler itself returned `422`). No internal details leak.
- **`off`**: never validate responses.

The default `dev` mode means adding a `response` schema is **free and safe**: existing apps that declare none are unaffected, and apps that declare one get helpful feedback without risking a broken response.

## Status selection

BurgerAPI picks the schema by status code: an exact code first (`200`), then a class (`2xx`). So `response: { "2xx": ... }` covers every success status.

## When to use it

- Catching a handler that returns the wrong shape.
- Documenting the contract your route promises.
- Enforcing strict contracts in `enforce` mode for production-critical routes.

For full RFC-style error documents on request failures, see [Problem Details](/docs/validation/problem-details).

## Types for this feature

The `response` schema describes the shape your handler should return. It is checked at runtime (in `dev` mode it only logs); the type of the handler itself is still `Response`, so the schema's output type is not connected to the handler return type.

The types you use (from `burger-api`):

- `RouteSchema`: a route's full schema map (for programmatic routes)
- `z.infer<typeof GET.response["200"]>`: the documented response shape, for reuse

✅ Correct. Declare the response shape, and reuse its type for helper functions:

```typescript title="api/status/schema.ts"
import { z } from "zod";
export const GET = { response: { 200: z.object({ ok: z.boolean() }) } };
```

```typescript
import type { GET } from "./schema";
type StatusResponse = z.infer<typeof GET.response["200"]>; // { ok: boolean }
```

❌ Wrong. The schema key is not a status code or class:

```typescript
export const GET = {
    // ❌ Only status codes like "200" or classes like "2xx" are valid
    response: { good: z.object({ ok: z.boolean() }) },
};
```

The runtime check happens after the handler; for strict typing of what the handler produces, keep the schema and handler in the same file pair. See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Validation Configuration](/docs/validation/configuration)
- [Schema Definition](/docs/validation/schema)
- [Problem Details](/docs/validation/problem-details)
- [Validation Best Practices](/docs/validation/best-practices)
