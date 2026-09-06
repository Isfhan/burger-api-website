---
sidebar_label: Validation Config
---

# Validation Configuration

Validation behavior is controlled by the `validation` option in the `Burger` constructor.

## `validation`

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
  validation: {
    // Turn on automatic type conversion app-wide (default: false)
    coerce: true,

    // How to handle response validation: "off" | "dev" | "enforce" (default: "dev")
    responseValidation: "dev",

    // Error body shape: "plain" | "problem+json" (default: "problem+json")
    errorFormat: "problem+json",

    // Fully custom error body (optional)
    errorRenderer: (result, { slot, status }) => {
      return Response.json(
        { ok: false, issues: result.issues },
        { status }
      );
    },
  },
});
```

| Option | Values | Default | What it does |
|--------|--------|---------|--------------|
| `coerce` | `boolean` | `false` | Enable automatic type conversion for query/params/headers/cookies. |
| `responseValidation` | `"off"` \| `"dev"` \| `"enforce"` | `"dev"` | Observe-only in `dev`; `enforce` returns a safe error on mismatch. |
| `errorFormat` | `"plain"` \| `"problem+json"` | `"problem+json"` | The shape of the error body. |
| `errorRenderer` | `(result, { slot, status }) => Response` | None | Override the error body completely. |

## Reusing schemas across routes

To share a shape between routes, define it once in its own file and import it:

```typescript title="src/schemas.ts"
import { z } from "zod";

export const Pagination = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});
```

```typescript title="api/items/schema.ts"
import { Pagination } from "../../schemas";

export const GET = { query: Pagination };
```

## Related

- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Problem Details](/docs/validation/problem-details)
- [Server Options](/docs/core/server-options)
