---
sidebar_label: Validation
---

# Validation

Validation checks the incoming request before your handler runs. With BurgerAPI you describe the expected shape of the request using a **schema** — a small description written with [Zod](https://zod.dev/) (or any [Standard Schema](https://standardschema.dev/) library). For example, you can say "the query string must include a `limit` that is a number". Requests that do not match receive a clear error, and the clean values are made available on `req.validated` so your handler can use them with confidence.

A route declares validation by exporting a `schema` object with one key per HTTP method:

```ts title="api/products/route.ts"
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
  get: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100).optional(),
    }),
  },
};

export function GET(req: BurgerRequest) {
  const { limit } = req.validated.query;
  return Response.json({ limit });
}
```

Here `z.coerce.number()` uses automatic type conversion: query values always arrive as text, so `"50"` is turned into the number `50` before the checks run. BurgerAPI also offers built-in [coercion](/docs/validation/coercion) you can turn on for a whole app.

## What you can validate

For each method you may describe:

- `params` — values from the URL path (e.g. `/users/:id`)
- `query` — the query string (e.g. `?limit=10`)
- `headers` — request headers (e.g. an API key)
- `cookie` — cookie values
- `body` — the JSON sent in POST/PUT
- `response` — what your handler returns (see [Response Validation](/docs/validation/response))

You can also reuse a shared shape by name with the [Model Registry](/docs/validation/models), get better errors with [Problem Details](/docs/validation/problem-details), and validate other schema libraries via [Standard Schema Support](/docs/validation/standard-schema).

## Why it helps

- Your handler receives clean, typed data — no manual checks.
- Invalid requests are rejected early with a clear `400`.
- Shared shapes live in one place, so contracts don't drift.

See [Schema Definition](/docs/validation/schema) for the full shape and [Validation Best Practices](/docs/validation/best-practices) for guidance.


## Related

- [Schema Definition](/docs/validation/schema)
- [Zod Validation](/docs/validation/zod)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Coercion](/docs/validation/coercion)
- [Model Registry](/docs/validation/models)
- [Response Validation](/docs/validation/response)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
