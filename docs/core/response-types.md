---
sidebar_label: Response Types
---

# Response Types

Handlers return a standard Web [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response). There is no custom response type.

**JSON:**

```typescript
return Response.json({ message: "Hello" });
return Response.json({ error: "Not found" }, { status: 404 });
```

**Text or HTML:**

```typescript
return new Response("OK");
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

To set status or headers from a hook, use `ctx.set`. See [Response Mutation](/docs/api/response-mutation). For what hooks can return, see [Hook Return Types](/docs/hooks/return-types).

## Related

- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
- [Response Mutation](/docs/api/response-mutation)
- [Hook Return Types](/docs/hooks/return-types)
