---
sidebar_label: Basic Route Example
---

# Basic Route Example

A minimal API route that responds to GET:

```typescript
// api/hello/route.ts
import type { BurgerRequest } from "burger-api";

export function GET(req: BurgerRequest) {
  return Response.json({ message: "Hello, Burger API!" });
}
```

This maps to `GET /api/hello` (with default `apiPrefix`). See [Static Routes](/docs/routing/static-routes) and [Hello World tutorial](/docs/tutorials/hello-world).
