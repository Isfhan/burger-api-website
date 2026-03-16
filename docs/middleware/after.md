---
sidebar_label: After Middleware
---

# After Middleware

**After middleware** runs after the route handler. Implement it by returning a **function** from your middleware: that function receives the handler’s `Response` and returns a new `Response` (e.g. with added or modified headers).

Common use: adding CORS headers or other response transforms.

```typescript
const corsMiddleware: Middleware = (req) => {
  return (response) => {
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    return new Response(response.body, { status: response.status, headers });
  };
};
```

See [Middleware Return Types](/docs/middleware/return-types) and [Middleware](/docs/request-handling/middleware).
