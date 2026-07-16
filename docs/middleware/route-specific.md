---
sidebar_label: Route-Specific Middleware
---

# Route-Specific Middleware

**Route-specific middleware** runs only for a given route. Export a `middleware` array from that route’s `route.ts` file. It runs after global middleware and validation, and before the route handler.

```typescript
export const middleware: Middleware[] = [checkAdminRole];

export function GET(req: BurgerRequest) {
  return Response.json({ users: [] });
}
```

Use it for admin checks, loading route-specific data, or any logic that applies to a single endpoint. See [Middleware System](/docs/middleware/system) and [Middleware](/docs/middleware/system).


## Related

- [Middleware System](/docs/middleware/system)
- [Global Middleware](/docs/middleware/global)
- [Middleware Return Types](/docs/middleware/return-types)
- [Request Context](/docs/core/request-handling)
