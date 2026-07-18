---
sidebar_label: Validation Example
---

# Validation Example

Validate query and body with a schema, and turn on automatic type conversion app-wide so text inputs become real types.

```typescript
// burger.config.ts
export default {
  validation: { coerce: true },
};
```

```typescript
// api/products/route.ts
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
  get: { query: z.object({ limit: z.number().optional() }) },
  post: { body: z.object({ name: z.string().min(1), price: z.number() }) },
};

export function GET(req: BurgerRequest) {
  const { limit } = req.validated.query;
  return Response.json({ items: [], limit });
}

export function POST(req: BurgerRequest) {
  const { name, price } = req.validated.body;
  return Response.json({ name, price });
}
```

With `coerce: true`, a request like `?limit=10` gives you the number `10` (not the string `"10"`). You can also reuse a shared shape by registering a [model](/docs/validation/models) and referencing it by name.

See the [Schema Definition](/docs/validation/schema) for the full schema shape and the [CRUD API](/docs/examples/crud-api) example for a complete route file.


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Schema Definition](/docs/validation/schema)
- [Coercion](/docs/validation/coercion)
- [Model Registry](/docs/validation/models)
- [Request Context](/docs/core/request-handling)
