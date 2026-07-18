---
sidebar_label: Validation Config
---

# Validation Configuration

Validation behavior is controlled by the `validation` option in your server config (or `burger.config.ts`) and by the `models` option for reusable shapes.

## `validation`

```typescript
// burger.config.ts
export default {
  validation: {
    // Turn on automatic type conversion app-wide (default: false)
    coerce: true,

    // How to handle response validation: "off" | "dev" | "enforce" (default: "dev")
    responseValidation: "dev",

    // Error body shape: "plain" | "problem+json" (default: "plain")
    errorFormat: "problem+json",

    // Fully custom error body (optional)
    errorRenderer: (result, ctx) => {
      return Response.json(
        { ok: false, issues: result.issues },
        { status: 400 }
      );
    },
  },
};
```

| Option | Values | Default | What it does |
|--------|--------|---------|--------------|
| `coerce` | `boolean` | `false` | Enable automatic type conversion for query/params/headers/cookie. |
| `responseValidation` | `"off"` \| `"dev"` \| `"enforce"` | `"dev"` | Observe-only in `dev`; `enforce` returns a safe error on mismatch. |
| `errorFormat` | `"plain"` \| `"problem+json"` | `"plain"` | The shape of the error body. |
| `errorRenderer` | `(result, ctx) => Response` | — | Override the error body completely. |

## `models`

```typescript
// burger.config.ts
import { z } from "zod";

export default {
  models: {
    Pagination: z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
    }),
  },
};
```

Registered models are referenced by string from any route's `schema`. See [Model Registry](/docs/validation/models).

## Setting config without a config file

You can pass the same options directly to the `Burger` class:

```typescript
import { Burger } from "burger-api";
import { z } from "zod";

const app = new Burger({
  apiDir: "./api",
  validation: { coerce: true, responseValidation: "enforce" },
  models: {
    Pagination: z.object({ page: z.number().min(1).default(1) }),
  },
});
```


## Related

- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Problem Details](/docs/validation/problem-details)
- [Model Registry](/docs/validation/models)
- [Server Options](/docs/core/server-options)
