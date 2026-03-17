---
sidebar_label: Response Types
---

# Response Types

Route handlers and middleware return **Response** objects. BurgerAPI uses the standard Web API [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

## Common patterns

**JSON response:**

```typescript
return Response.json({ message: "Hello" });
return Response.json({ error: "Not found" }, { status: 404 });
```

**Plain text or HTML:**

```typescript
return new Response("OK", { status: 200 });
return new Response("<h1>Hello</h1>", {
  headers: { "Content-Type": "text/html" },
});
```

**Custom headers:**

```typescript
return new Response(body, {
  status: 200,
  headers: { "X-Custom": "value" },
});
```

Middleware can return a **Response** to stop the chain, or **undefined** to continue, or a **function** that receives the handler’s response and returns a new Response (e.g. for CORS). See [Middleware Return Types](/docs/middleware/return-types) and [After Middleware](/docs/middleware/after).
