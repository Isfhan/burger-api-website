---
sidebar_label: Validation Config
---

# Validation Configuration

Set validation options with the `validation` option of `new Burger()`.

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
  validation: {
    coerce: true,
    responseValidation: "dev",
    errorFormat: "problem+json",
  },
});
```

| Option | Values | Default | What it does |
|--------|--------|---------|--------------|
| `coerce` | `boolean` | `false` | Convert text in query, params, headers and cookies. See [Coercion](/docs/validation/coercion). |
| `responseValidation` | `"off"` \| `"dev"` \| `"enforce"` | `"dev"` | How response schemas are checked. See [Response Validation](/docs/validation/response). |
| `errorFormat` | `"plain"` \| `"problem+json"` | `"problem+json"` | Shape of the error body. |
| `status` | `number` | `422` | Status for request validation failures. |
| `errorRenderer` | `(result, { slot, status }) => Response` | none | Build the error response yourself. |

A custom renderer:

```typescript title="src/index.ts"
const app = new Burger({
  apiDir: "./src/api",
  validation: {
    errorRenderer: (result, { status }) =>
      Response.json({ ok: false, issues: result.issues }, { status }),
  },
});
```

A route can override `responseValidation` in its `config.ts`.

## Related

- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Problem Details](/docs/validation/problem-details)
- [Server Options](/docs/core/server-options)
