---
sidebar_label: Middleware Example
---

# Middleware Example

Using global and route-specific middleware:

**Global:** Pass an array to `globalMiddleware` in the Burger constructor (e.g. logger, CORS).

**Route-specific:** Export a `middleware` array from your `route.ts`; it runs after global middleware and before the handler.

```typescript
export const middleware: Middleware[] = [checkAuth];

export function GET(req: BurgerRequest) {
  return Response.json({ data: [] });
}
```

See [Middleware System](/docs/middleware/system), [Global Middleware](/docs/middleware/global), and [Middleware](/docs/middleware/system).


## Related

- [Basic Route Example](/docs/examples/basic-route)
- [Tutorial 1: Hello World API](/docs/tutorials/hello-world)
- [Tutorial 2: Todo List API](/docs/tutorials/todo-api)
- [Request Context](/docs/core/request-handling)
