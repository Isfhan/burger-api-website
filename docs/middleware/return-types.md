---
sidebar_label: Middleware Return Types
---

# Middleware Return Types

A middleware function can return one of three things:

1. **`undefined`** — Continue to the next middleware or the route handler.
2. **`Response`** — Stop the chain and send this response (e.g. 401 Unauthorized).
3. **A function** — Run **after** the route handler; the function receives the handler’s response and can return a modified Response (e.g. for CORS headers).

```typescript
// Continue
return undefined;

// Stop and respond
return new Response("Unauthorized", { status: 401 });

// Run after handler (e.g. add headers)
return (response) => {
  const headers = new Headers(response.headers);
  headers.set("X-Custom", "value");
  return new Response(response.body, { status: response.status, headers });
};
```

See [Middleware](/docs/request-handling/middleware) and [After Middleware](/docs/middleware/after).
