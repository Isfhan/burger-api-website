---
sidebar_label: Pagination
---

# Pagination Example

Paginate a list using `req.query` and advertise totals via `req.set`.

```ts title="api/posts/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";
import { posts } from "./store";

export const schema = {
  get: {
    query: z.object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(50).default(20),
    }),
  },
};

export async function GET(req: BurgerRequest) {
  const { page, limit } = req.validated.query;
  const start = (page - 1) * limit;
  const items = posts.slice(start, start + limit);

  req.set = {
    headers: {
      "x-total": String(posts.length),
      "x-page": String(page),
      "x-limit": String(limit),
    },
  };
  return Response.json({ items });
}
```

`req.query` parses only when read, and `req.set` applies the pagination headers at the end of the pipeline. See also the [CRUD API](./crud-api.md).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
