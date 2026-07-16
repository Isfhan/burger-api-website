---
sidebar_label: CRUD API
---

# CRUD API Example

A complete products API with list, read, create, update, and delete — using file-based routing, Zod validation, lazy query access, and `req.set`.

## Store

```ts title="api/products/store.ts"
export interface Product {
  id: string;
  name: string;
  price: number;
}

export const products: Product[] = [];
```

## List with query + response headers

```ts title="api/products/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";
import { products } from "./store";

export const schema = {
  get: {
    query: z.object({
      limit: z.coerce.number().int().min(1).max(100).default(10),
      page: z.coerce.number().int().min(1).default(1),
    }),
  },
  post: {
    body: z.object({
      name: z.string().min(1),
      price: z.number().positive(),
    }),
  },
};

export async function GET(req: BurgerRequest) {
  const { limit, page } = req.validated.query;
  const start = (page - 1) * limit;
  const items = products.slice(start, start + limit);

  req.set = { headers: { "x-total": String(products.length) } };
  return Response.json({ page, limit, items });
}

export async function POST(req: BurgerRequest) {
  const body = await req.json();
  const product = { id: crypto.randomUUID(), ...body };
  products.push(product);
  req.set = { status: 201 };
  return Response.json(product);
}
```

## Read one

```ts title="api/products/[id]/route.ts"
import type { BurgerRequest } from "burger-api";
import { products } from "../store";

export async function GET(req: BurgerRequest) {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(product);
}
```

This example shows routing, validation, lazy query access, and response mutation working together. See also the [Todo API](../tutorials/todo-api.md) and [Blog API](../tutorials/blog-api.md).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
