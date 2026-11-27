---
sidebar_label: Response Validation
---

# Response Validation

Add a `response` schema to check what your handler returns. Only JSON responses are checked (`application/json` and `application/*+json`).

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

- **`dev`** (default): in development, a mismatch is logged. The response is sent unchanged.
- **`enforce`**: a mismatch becomes a `500` problem+json response. Production hides the issues. `afterRoute` and `mapResponse` still run, so headers such as CORS stay.
- **`off`**: responses are not checked.

Set the app-wide mode with `validation.responseValidation`. Override it for one route in `config.ts`:

```typescript title="src/api/reports/config.ts"
export default {
  responseValidation: "enforce",
};
```

## Status keys

Key each schema by status code (`200`) or status class (`2xx`). An exact code wins over a class. Any other key is a startup error.

## Related

- [Validation Configuration](/docs/validation/configuration)
- [Schema Definition](/docs/validation/schema)
- [Problem Details](/docs/validation/problem-details)
- [Validation Best Practices](/docs/validation/best-practices)
