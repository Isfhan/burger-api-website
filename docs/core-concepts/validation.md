---
sidebar_label: Validation
---

# Validation

Describe the request you expect with a schema. BurgerAPI checks each request against it. Bad requests get a clear error. Good data lands on `ctx.validated`, fully typed.

Schemas use [Zod](https://zod.dev/) or any [Standard Schema](https://standardschema.dev/) library. Put them in the route's `schema.ts`, one export per method:

```ts title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({ limit: z.coerce.number().int().min(1).max(100).optional() }),
};
```

```ts title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { limit } = ctx.validated.query;
  return Response.json({ limit });
});
```

Query values arrive as text. `z.coerce.number()` turns `"50"` into `50`. You can also turn on [coercion](/docs/validation/coercion) for the whole app.

Validation runs after `transform` and before `beforeRoute`.

## What you can validate

- `params`: path values, like `[id]`
- `query`: the query string
- `headers`: request headers
- `cookies`: cookies
- `body`: the JSON body
- `response`: what the handler returns. See [Response Validation](/docs/validation/response)

## Errors

A failed check returns `422` with an RFC 9457 Problem Details body. A route with a `body` schema rejects non-JSON requests with `415`. To change the error, handle `ValidationError` in an `onError` hook. See [Validation Errors](/docs/validation/errors).

## Related

- [Schema Definition](/docs/validation/schema)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Coercion](/docs/validation/coercion)
- [Response Validation](/docs/validation/response)
- [Validation Types](/docs/api/validation-types)
