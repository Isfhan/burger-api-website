---
sidebar_label: Pagination
---

# Pagination Example

Paginate a list using `ctx.query` and advertise totals via `ctx.set`.

```ts title="src/api/posts/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
};
```

```ts title="src/api/posts/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as GETSchema } from "./schema";
import { posts } from "./store";

export async function GET(ctx: BurgerContext<typeof GETSchema>) {
  const { page, limit } = ctx.validated.query;
  const start = (page - 1) * limit;
  const items = posts.slice(start, start + limit);

  ctx.set = {
    headers: {
      "x-total": String(posts.length),
      "x-page": String(page),
      "x-limit": String(limit),
    },
  };
  return Response.json({ items });
}
```

`ctx.query` parses only when read, and `ctx.set` applies the pagination headers once at the end of the request lifecycle. See also the [CRUD API](./crud-api.md).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
