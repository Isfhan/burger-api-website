---
sidebar_label: Validation Example
---

# Validation Example

Validate query and body with Zod by exporting a `schema` from your route:

```typescript
import { z } from "zod";

export const schema = {
  get: { query: z.object({ limit: z.coerce.number().optional() }) },
  post: { body: z.object({ name: z.string().min(1), price: z.number() }) },
};

export function GET(req: BurgerRequest<{ query: z.infer<typeof schema.get.query> }>) {
  const { limit } = req.validated?.query ?? {};
  return Response.json({ items: [], limit });
}
```

See the [Validation schema](/docs/validation/schema) for the canonical schema shape and the [CRUD API](/docs/examples/crud-api) example for the full route file.


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
