---
sidebar_label: Validation Types
---

# Validation Types

Type reference for validation. For how validation works, see [Validation](/docs/core-concepts/validation).

## Per-method schema

`schema.ts` exports one object per HTTP method. Each slot is optional and takes a Zod or [Standard Schema](https://standardschema.dev/) schema.

```ts title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
export const POST = {
  body: z.object({ name: z.string().min(1) }),
  response: { 200: z.object({ id: z.string() }) },
};
```

| Slot | Checks |
|------|--------|
| `params` | Path parameters |
| `query` | Query string |
| `headers` | Request headers |
| `cookies` | Cookies |
| `body` | JSON body |
| `response` | Handler output, keyed by status (`200`) or class (`2xx`) |

## ctx.validated

Valid data lands on `ctx.validated.params`, `.query`, `.headers`, `.cookies` and `.body`. A key exists only if its slot has a schema. Wrap the handler with `defineRoute` to type it:

```ts title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  return Response.json({ limit: ctx.validated.query.limit });
});
```

## ValidationError

A failed check throws `ValidationError` (status 422). It has the failing `slot` and a list of issues:

```ts
interface ValidationIssue {
  path: (string | number)[];
  message: string;
  code?: string;
}
```

If no `onError` hook handles it, the client gets an RFC 9457 Problem Details response. See [Validation Errors](/docs/validation/errors).

## Options

`new Burger({ validation: { ... } })` takes `coerce`, `responseValidation` and `errorFormat`. See [Validation Configuration](/docs/validation/configuration).

## Related

- [Validation](/docs/core-concepts/validation)
- [Schema Definition](/docs/validation/schema)
- [Validation Configuration](/docs/validation/configuration)
- [Server Options](/docs/core/server-options)
