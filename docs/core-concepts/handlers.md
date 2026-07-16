---
sidebar_label: Handlers
---

# Handlers

Each route file exports functions named after HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, ...). A handler receives a `BurgerRequest` and returns a standard `Response`.

```ts title="api/products/route.ts"
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  return Response.json({ items: [] });
}

export async function POST(req: BurgerRequest) {
  const body = await req.json();
  // ...create a product...
  return Response.json({ created: true }, { status: 201 });
}
```

Handlers are where you read `req.params`, `req.query`, and `req.validated`, and where you set response details with `req.set`. See [Request API](../api/request-api.md) for every property.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Request Context](/docs/core/request-handling)
