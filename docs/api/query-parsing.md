---
sidebar_label: Query Parsing
---

# Query Parsing

Read the query string with `ctx.query`. It is an object of `string | string[]`.

```ts title="src/api/posts/route.ts"
import type { BurgerContext } from "burger-api";

// GET /api/posts?tag=bun&tag=ts&page=2
export async function GET(ctx: BurgerContext) {
  const { tag, page } = ctx.query; // tag: ["bun", "ts"], page: "2"
  return Response.json({ tag, page });
}
```

- A key that repeats becomes an array, in order.
- `+` becomes a space, like `URLSearchParams`.
- Bad percent-encoding is kept as is. It never throws.
- Values are always strings. To get numbers or booleans, add a query schema. See [Query Validation](/docs/validation/query).

You do not need `new URL(ctx.url).searchParams`. Use `ctx.query`.

## Related

- [Request API](/docs/api/request-api)
- [Query Validation](/docs/validation/query)
