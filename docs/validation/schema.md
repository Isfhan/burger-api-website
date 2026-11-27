---
sidebar_label: Schema Definition
---

# Schema Definition

Put validation schemas in `schema.ts`, next to `route.ts`. Export one object per HTTP method (`GET`, `POST`, and so on).

Validation runs after `transform` hooks and before `beforeRoute` hooks. If it fails, the request gets `422` and the handler does not run.

## The full shape

Every slot is optional. Describe only what you use.

```typescript title="api/products/[id]/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({ id: z.string() }),         // path params
  query: z.object({ limit: z.coerce.number() }), // query string
  headers: z.object({ "x-api-key": z.string() }),
  cookies: z.object({ session: z.string() }),
  coerce: true,                                  // convert text values
};

export const PUT = {
  params: z.object({ id: z.string() }),
  body: z.object({ name: z.string() }),          // JSON body
  response: { 200: z.object({ id: z.string() }) },
};
```

## Use the validated data

Wrap the handler with `defineRoute` to get types from the schema:

```typescript title="api/products/[id]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { id } = ctx.validated.params;   // string
  const { limit } = ctx.validated.query; // number
  return Response.json({ id, limit });
});
```

The data is on `ctx.validated.params`, `.query`, `.headers`, `.cookies` and `.body`.

## Share a schema

Define a shape once and import it:

```typescript title="src/schemas.ts"
import { z } from "zod";

export const Pagination = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
```

```typescript title="api/items/schema.ts"
import { Pagination } from "../../schemas";

export const GET = { query: Pagination };
```

## Related

- [Zod Validation](/docs/validation/zod)
- [Params Validation](/docs/validation/params)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Headers Validation](/docs/validation/headers)
- [Cookie Validation](/docs/validation/cookie)
- [Validation Types](/docs/api/validation-types)
