---
sidebar_label: Validation Types
---

# Validation Types

Validation is declared with Zod (or any [Standard Schema](https://standardschema.dev/) library). Each route directory carries a `schema.ts` file with per-method named exports. BurgerAPI validates the request after `transform` and before `beforeRoute`.

## Per-method schema

Each HTTP method maps to an object of optional schemas:

```ts title="api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
export const POST = {
  body: z.object({ name: z.string().min(1) }),
  response: { 200: z.object({ id: z.string() }) },
};
```

The available slots are `params`, `query`, `headers`, `cookies`, and `body`. A slot accepts either a schema or a **string** that references a registered model. Per-status-code `response` schemas are validated after the handler. See [Schema Definition](/docs/validation/schema) for every slot.

## Validated data

After validation, the result is available on `ctx.validated`. Each key exists only if that slot had a schema:

- `ctx.validated.params`
- `ctx.validated.query`
- `ctx.validated.headers`
- `ctx.validated.cookies`
- `ctx.validated.body`

Typing flows from `schema.ts`. The recommended way to wire it up is `defineRoute(schema, handler)`, imported from `burger-api`, with `schema` the same object you already export from `./schema`:

```ts title="api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  ctx.validated.query; // inferred, no generic to write
});
```

The older, equivalent form still works: annotate the handler with `BurgerContext<typeof GET>` directly. See [Validation](/docs/validation/zod) and [Type Safety](/docs/advanced/type-safety).

## Errors

Failed validation throws a `ValidationError`, which carries the failing `slot` and structured `ValidationIssue[]`:

```ts
interface ValidationIssue {
  path: (string | number)[];
  message: string;
  code?: string;
}
```

`ValidationError` extends `HTTPError` with status 422. If no `onError` hook handles it, the framework renders an RFC 9457 Problem Details response. See [Validation Errors](/docs/validation/errors) and [Problem Details](/docs/validation/problem-details).

## Validation configuration

The server accepts a `validation` option (`coerce`, `responseValidation`, `errorFormat`). See [Validation Configuration](/docs/validation/configuration).

## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [Validation](/docs/validation/zod)
- [Validation Configuration](/docs/validation/configuration)
