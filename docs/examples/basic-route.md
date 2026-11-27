---
sidebar_label: Basic Route Example
---

# Basic Route Example

A route that answers `GET /api/hello`:

```typescript title="src/api/hello/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({ message: "Hello, Burger API!" });
}
```

The handler gets `ctx` and returns a standard `Response`. Use `ctx` to read the query, params, body, headers and cookies. See [Request API](/docs/api/request-api) and [Static API Routes](/docs/routing/api/static-routes).

## Related

- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [CRUD API Example](/docs/examples/crud-api)
- [Request Context](/docs/core/request-handling)
