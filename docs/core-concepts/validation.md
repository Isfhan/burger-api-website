---
sidebar_label: Validation
---

# Validation

Validation checks the incoming request at a fixed point in the lifecycle: after `transform`, before `beforeRoute`. With BurgerAPI you describe the expected shape of the request using a **schema**, written with [Zod](https://zod.dev/) or any [Standard Schema](https://standardschema.dev/) library. Requests that do not match receive a clear error, and the clean values are made available on `ctx.validated`.

A route declares validation in `schema.ts` with one per-method named export:

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({ limit: z.coerce.number().int().min(1).max(100).optional() }),
};
```

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
});
```

`defineRoute(schema, handler)` infers `ctx.validated`'s shape from `schema`, though the older `BurgerContext<typeof RouteSchema>` generic form still works if you'd rather annotate by hand.

Here `z.coerce.number()` uses automatic type conversion: query values always arrive as text, so `"50"` is turned into the number `50` before the checks run. BurgerAPI also offers built-in [coercion](/docs/validation/coercion) you can turn on for a whole app.

## What you can validate

For each method you may describe:

- `params`: values from the URL path (e.g. `/users/:id`)
- `query`: the query string (e.g. `?limit=10`)
- `headers`: request headers (e.g. an API key)
- `cookies`: cookie values
- `body`: the JSON sent in POST/PUT
- `response`: what your handler returns (see [Response Validation](/docs/validation/response))

You can also reuse a shared shape across routes (see [Schema Definition](/docs/validation/schema)), get better errors with [Problem Details](/docs/validation/problem-details), and validate other schema libraries via [Standard Schema Support](/docs/validation/standard-schema).

## Errors

Failed validation throws a `ValidationError` (status 422) with structured issues. It enters the `onError` pipeline; if no hook handles it, the framework renders an RFC 9457 Problem Details response. See [Validation Errors](/docs/validation/errors).

## Why it helps

- Your handler receives clean, typed data, no manual checks.
- Invalid requests are rejected early with a clear `422`.
- Shared shapes live in one place, so contracts don't drift.

See [Schema Definition](/docs/validation/schema) for the full shape and [Validation Best Practices](/docs/validation/best-practices) for guidance.

## Related

- [Schema Definition](/docs/validation/schema)
- [Zod Validation](/docs/validation/zod)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
