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

See [Validation](/docs/request-handling/validation), [Schema Definition](/docs/validation/schema), and the [Todo API](/docs/tutorials/todo-api) tutorial.
