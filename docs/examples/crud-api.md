---
sidebar_label: CRUD API
---

# CRUD API Example

A complete products API with list, read, create, update, and delete, using file-based routing, Zod validation, lazy query access, and `ctx.set`.

Each route directory is self-contained: `route.ts` holds the handlers, `schema.ts` holds the per-method validation schemas.

## Store

```ts title="src/api/products/store.ts"
export interface Product {
  id: string;
  name: string;
  price: number;
}

export const products: Product[] = [];
```

## List with query + response headers

```ts title="src/api/products/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page: z.coerce.number().int().min(1).default(1),
  }),
};

export const POST = {
  body: z.object({
    name: z.string().min(1),
    price: z.number().positive(),
  }),
};
```

```ts title="src/api/products/route.ts"
import { defineRoute } from "burger-api";
import { GET as GETSchema, POST as POSTSchema } from "./schema";
import { products } from "./store";

export const GET = defineRoute(GETSchema, (ctx) => {
  const { limit, page } = ctx.validated.query;
  const start = (page - 1) * limit;
  const items = products.slice(start, start + limit);

  ctx.set = { headers: { "x-total": String(products.length) } };
  return Response.json({ page, limit, items });
});

export const POST = defineRoute(POSTSchema, async (ctx) => {
  const body = await ctx.json();
  const product = { id: crypto.randomUUID(), ...body };
  products.push(product);
  ctx.set = { status: 201 };
  return Response.json(product);
});
```

## Read one

```ts title="src/api/products/[id]/route.ts"
import type { BurgerContext } from "burger-api";
import { products } from "../store";

export async function GET(ctx: BurgerContext) {
  const product = products.find((p) => p.id === ctx.params.id);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(product);
}
```

`ctx.query` and `ctx.params` are lazy: they parse only when read. `ctx.set` collects status and header changes, applied once when the response leaves the app. See [Response Mutation](/docs/api/response-mutation).

This example shows routing, validation, lazy query access, and response mutation working together. See also the [Todo API](../tutorials/todo-api.md) and [Blog API](../tutorials/blog-api.md).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
