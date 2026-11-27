---
sidebar_label: Validation Example
---

# Validation Example

Validate the query and body in `schema.ts`, then read the clean data from `ctx.validated`.

```typescript title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
export const POST = { body: z.object({ name: z.string().min(1), price: z.number() }) };
```

```typescript title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GETSchema, POST as POSTSchema } from "./schema";

export const GET = defineRoute(GETSchema, (ctx) => {
  const { limit } = ctx.validated.query; // number | undefined
  return Response.json({ items: [], limit });
});

export const POST = defineRoute(POSTSchema, (ctx) => {
  const { name, price } = ctx.validated.body;
  return Response.json({ name, price });
});
```

- `?limit=10` gives the number `10`, because of `z.coerce.number()`.
- `POST` needs a JSON body. A bad body gets `422` with a problem details body.

See [Schema Definition](/docs/validation/schema) and [Validation Errors](/docs/validation/errors).

## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Schema Definition](/docs/validation/schema)
- [Coercion](/docs/validation/coercion)
- [Request Context](/docs/core/request-handling)
