---
sidebar_label: Schema Definition
---

# Schema Definition

Export a **`schema`** object from your `route.ts` with keys per HTTP method (lowercase: `get`, `post`, etc.). Each method can have `query`, `body`, and (where applicable) `params` or `response` Zod schemas.

```typescript
export const schema = {
  get: { query: z.object({ limit: z.coerce.number().optional() }) },
  post: { body: z.object({ name: z.string(), price: z.number() }) },
};
```

Validated data is available on `req.validated.query`, `req.validated.body`, etc. See [Validation](/docs/request-handling/validation), [Query](/docs/validation/query), and [Body](/docs/validation/body).
