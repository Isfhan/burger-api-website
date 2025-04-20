---
sidebar_label: "Middleware"
---

# Middleware

Middleware functions act as gatekeepers or processors for your requests. They execute sequentially before your main route handler, allowing you to implement cross-cutting concerns like logging, authentication, data pre-processing, and more.

BurgerAPI embraces middleware with support for both **global** (all routes) and **route-specific** application.

## Defining Middleware

A middleware is essentially a function that receives the `BurgerRequest` object.

- **To continue processing:** The middleware should return `undefined`.
- **To stop processing and respond early:** The middleware can return a `Response` object directly.
- **To run after the route handler:** The middleware can return a function that will be called after the route handler.

```typescript title="middleware/auth.ts"
import type { Middleware, BurgerRequest, BurgerNext } from "burger-api";

// Example: Simple API Key Authentication
export const apiKeyAuth: Middleware = (
  req: BurgerRequest
): BurgerNext | Response => {
  const apiKey = req.headers.get("X-API-Key");

  if (!apiKey || apiKey !== process.env.SECRET_API_KEY) {
    // If invalid, stop here and return a 401 Unauthorized response
    console.warn(`Unauthorized attempt to access ${req.url}`);
    return new Response("Invalid or missing API Key", { status: 401 });
  }

  // Key is valid, optionally attach data to the request for later handlers
  // Note: This requires extending the BurgerRequest type or using a different mechanism
  // (req as any).isAuthenticated = true;

  console.log(`API Key validated for ${req.url}`);
  // Key is valid, continue to the next middleware or handler
  return undefined; // <<< Important: return undefined to continue
};
```

**`BurgerRequest`:** The incoming request object. Middleware can potentially add custom properties to it, although type safety requires careful handling.

**`BurgerNext | Response`:** The function can return `undefined` (which corresponds to `BurgerNext`) or a `Response` object to stop processing and send a response immediately or a function to run after the route handler.

## Global Middleware

Need a function to run on _every single request_? Use `globalMiddleware` in the `Burger` constructor. These run first.

```typescript title="index.ts"
import { Burger } from "burger-api";
import { requestLogger } from "./middleware/logging"; // Example logger
import { apiKeyAuth } from "./middleware/auth";

const burger = new Burger({
  apiDir: "api",
  // Log all requests, then check API key
  globalMiddleware: [requestLogger, apiKeyAuth],
  // ... other options
});

burger.serve(4000);
```

## Route-Specific Middleware

For logic that only applies to certain endpoints (e.g., admin checks, specific data loading), export a `middleware` array from the `route.ts` file.

```typescript title="api/admin/users/route.ts"
import type { Middleware, BurgerRequest } from "burger-api";

// Example: Check if the request is authenticated as an admin
// (Assumes a previous middleware attached user info)
const checkAdminRole: Middleware = (req) => {
  // const user = (req as any).user; // Example: Accessing user data
  // if (user?.role !== 'admin') {
  //   return new Response('Forbidden: Admin access required', { status: 403 });
  // }
  console.log("Admin role verified for /admin/users");
  return undefined; // Role is admin, continue
};

// Apply this middleware specifically to this route
export const middleware: Middleware[] = [checkAdminRole];

// Route handler (only runs if checkAdminRole returns undefined)
export function GET(req: BurgerRequest) {
  return Response.json({
    users: [
      /* admin data */
    ],
  });
}
```

## Execution Order

Understanding the order in which middleware runs is crucial:

:::note Middleware Execution Flow

1.  ➡️ **Global Middleware:** Runs first, in the order defined in the `Burger` constructor's `globalMiddleware` array.
2.  ➡️ **Validation Middleware:** If a `schema` is exported for the matched route, Zod validation runs automatically. ([See Validation](./validation.md))
3.  ➡️ **Route-Specific Middleware:** Runs next, in the order defined in the `route.ts` file's `middleware` array.
4.  ➡️ **Route Handler:** Finally, if all preceding middleware returned `undefined`, the main route handler function (e.g., `GET`, `POST`) is executed.

**Short-Circuiting:** If _any_ middleware function returns a `Response` object, the chain stops immediately, and that response is sent to the client.
:::
