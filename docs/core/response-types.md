---
sidebar_label: Response Types
---

# Response Types

Route handlers and hooks return **Response** objects. BurgerAPI uses the standard Web API [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) only.

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

A hook can return a **Response** to stop the pipeline, or **undefined** to continue, or a function that receives the handler's response and returns a new Response (e.g. for CORS). Response phases like `mapResponse` decorate the final response. See [Hook System](/docs/hooks/system) and [Hook Return Types](/docs/hooks/return-types).


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
