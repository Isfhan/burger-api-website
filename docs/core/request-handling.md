---
sidebar_label: Request Handling
---

# Request Handling

BurgerAPI handles each request by running **middleware** (if any) and then the **route handler**. Middleware can short-circuit by returning a `Response`, or continue by returning `undefined`, or return a function to run after the handler (e.g. to modify the response).

## Flow

1. **Global middleware** runs first (in order).
2. **Route-specific middleware** runs next (if the route defines any).
3. **Route handler** runs (e.g. `GET`, `POST` exported from `route.ts`).
4. **After-middleware** (if a middleware returned a function) runs with the response.

## Request object

Handlers and middleware receive a **BurgerRequest** object (extends the standard request with `params`, `validated`, etc.). Use it to read headers, URL, and validated query/body from [Zod validation](/docs/request-handling/validation).

## Key docs

- [Middleware System](/docs/middleware/system) — How middleware works.
- [Global Middleware](/docs/middleware/global) and [Route-Specific Middleware](/docs/middleware/route-specific).
- [Validation](/docs/request-handling/validation) — Validating params, query, and body with Zod.
