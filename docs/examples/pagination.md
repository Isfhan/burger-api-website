---
sidebar_label: Pagination
---

# Pagination Example

Paginate a list with a validated query, and send the totals as headers.

## Store

```ts title="src/api/posts/store.ts"
export interface Post {
  id: string;
  title: string;
  content: string;
}

export const posts: Post[] = [];
```

## Paginated list

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
import { defineRoute } from "burger-api";
import { GET as GETSchema } from "./schema";
import { posts } from "./store";

export const GET = defineRoute(GETSchema, (ctx) => {
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
});
```

`page` and `limit` are numbers after validation. `ctx.set` adds the pagination headers to the response. See also the [CRUD API](/docs/examples/crud-api).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
