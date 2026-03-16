---
sidebar_label: Global Middleware
---

# Global Middleware

**Global middleware** runs on every request. Pass an array of middleware functions to `globalMiddleware` in the `Burger` constructor. They run first, before route-specific middleware and the handler.

```typescript
const burger = new Burger({
  apiDir: "api",
  globalMiddleware: [requestLogger, apiKeyAuth],
});
```

Use global middleware for logging, CORS, auth checks, or any logic that should run for all routes. See [Middleware System](/docs/middleware/system) and the full [Middleware](/docs/request-handling/middleware) guide.
