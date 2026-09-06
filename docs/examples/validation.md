---
sidebar_label: Validation Example
---

# Validation Example

Validate query and body with per-method schemas in `schema.ts`, then read the validated data from `ctx.validated`.

```typescript
// src/api/products/schema.ts
import { z } from "zod";

export const GET = { query: z.object({ limit: z.coerce.number().optional() }) };
export const POST = { body: z.object({ name: z.string().min(1), price: z.number() }) };
```

```typescript
// src/api/products/route.ts
import { defineRoute } from "burger-api";
import { GET as GETSchema, POST as POSTSchema } from "./schema";

export const GET = defineRoute(GETSchema, (ctx) => {
  const { limit } = ctx.validated.query;
  return Response.json({ items: [], limit });
});

export const POST = defineRoute(POSTSchema, (ctx) => {
  const { name, price } = ctx.validated.body;
  return Response.json({ name, price });
});
```

`defineRoute(schema, handler)` types `ctx.validated` from the matching schema export, so `limit` is a validated number, not a string, and there is no `BurgerContext<typeof GET>` generic to write by hand (though it still works if you prefer it).

With `z.coerce.number()`, a request like `?limit=10` gives you the number `10` (not the string `"10"`). You can also turn coercion on app-wide: see [Coercion](/docs/validation/coercion).

See [Schema Definition](/docs/validation/schema) for the full schema shape, [Validation Errors](/docs/validation/errors) for how failures are reported (default `422` with RFC 9457 problem details), and the [CRUD API](/docs/examples/crud-api) example for a complete route directory.


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Schema Definition](/docs/validation/schema)
- [Coercion](/docs/validation/coercion)
- [Request Context](/docs/core/request-handling)
