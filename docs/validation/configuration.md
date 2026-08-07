---
sidebar_label: Validation Config
---

# Validation Configuration

Validation behavior is controlled by the `validation` option in the `Burger` constructor, and by the `models` option for reusable shapes.

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
| `errorRenderer` | `(result, { slot, status }) => Response` | — | Override the error body completely. |

## `models`

```typescript title="src/index.ts"
import { Burger } from "burger-api";
import { z } from "zod";

const app = new Burger({
  models: {
    Pagination: z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
    }),
  },
});
```

Registered models are referenced by string from any route's `schema.ts`. See [Model Registry](/docs/validation/models).

## Build-time seeds

The CLI can seed `models` from `burger.build.ts` when it generates the production app. `burger.build.ts` itself is build-time only (dirs, prefixes, debug); runtime behavior belongs in `new Burger({...})`. See [Configuration](/docs/core/configuration).


## Related

- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Problem Details](/docs/validation/problem-details)
- [Model Registry](/docs/validation/models)
- [Server Options](/docs/core/server-options)
