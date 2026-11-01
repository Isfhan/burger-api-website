---
sidebar_label: Basic Route Example
---

# Basic Route Example

A minimal API route that responds to GET:

```typescript
// src/api/hello/route.ts
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ message: "Hello, Burger API!" });
}
```

The handler receives a `BurgerContext` (`ctx`) and always returns a standard Web `Response`. Use `ctx` to read request data: query, params, body, headers, cookies. See [Request API](/docs/api/request-api).

This maps to `GET /api/hello` (with the default `apiPrefix`). See [Static API Routes](/docs/routing/api/static-routes) and the [Hello World tutorial](/docs/tutorials/hello-world).


## Related

- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [CRUD API Example](/docs/examples/crud-api)
- [Request Context](/docs/core/request-handling)
