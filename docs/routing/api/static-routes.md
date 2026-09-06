---
sidebar_label: "Static Routes"
---

# Static API Routes

Static routes are the foundation of BurgerAPI's file-based routing system. They match exact URL paths and are always checked first in the routing priority order.

## What Are Static Routes?

Static routes are API endpoints with fixed, predetermined paths. Unlike dynamic or wildcard routes, static routes don't capture any URL parameters: they match exact paths only.

**Examples:**
- `/api/products` - Lists all products
- `/api/users/profile` - Gets current user's profile
- `/api/settings/security` - Gets security settings

## File-Based Routing Basics

BurgerAPI makes defining API endpoints intuitive using a file-based routing approach. Simply create files and folders within your designated `apiDir` (configured in the `Burger` constructor, e.g., `apiDir: './src/api'`), and BurgerAPI handles the rest.

### How It Works

**Directory Structure = URL Path:** The folder structure inside `apiDir` directly maps to the URL segments.

Example: `api/users/profile/route.ts` becomes `/api/users/profile` (assuming the default `apiPrefix` of `'api'`).

**`route.ts` Files:** Each file named `route.ts` defines the handlers for a specific path.

**HTTP Method Exports:** Inside `route.ts`, export functions named after **uppercase** HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) to handle requests for that method.

## Creating Your First Static Route

Let's create a simple products API endpoint:

```typescript title="api/products/route.ts"
import type { BurgerContext } from "burger-api";

// Handles GET requests to /api/products
export async function GET(ctx: BurgerContext) {
  return Response.json({ message: "Fetched products" });
}
```

This creates a static route `GET /api/products`. See [CRUD API](/docs/examples/crud-api) for the full `api/products/route.ts` file with GET and POST handlers.

## Route Handlers

Your exported HTTP method functions are the route handlers:

### Handler Arguments

- **Argument:** They receive a single argument: the `BurgerContext` object.

### BurgerContext

`ctx` is a `BurgerContext`. It is not a `Request` subclass: the original request is available as `ctx.request`, and the standard request surface is delegated. The fields you will use most:

- `ctx.request`: The raw `Request`.
- `ctx.params`: Dynamic path parameters (`[id]` segments).
- `ctx.query`: The parsed query string.
- `ctx.body` and `await ctx.json()`: Request body access.
- `ctx.headers`, `ctx.method`, `ctx.url`: Standard request data.
- `ctx.cookies`: Parsed cookies.
- `ctx.validated`: Validated data if you declared schemas in `schema.ts`.
- `ctx.set`: Response mutations.
- `ctx.services` and `ctx.config`: Injected services and route options.

See [Request API](/docs/api/request-api) for the full field list.

### Return Value

Handlers **must** return a standard `Response` object.

## Supported HTTP Methods

BurgerAPI supports all standard HTTP methods:

- `GET` - Retrieve resources
- `POST` - Create new resources
- `PUT` - Update/replace resources
- `PATCH` - Partially update resources
- `DELETE` - Remove resources
- `OPTIONS` - Get communication options
- `HEAD` - Get headers only

## Example: Nested Static Routes

Create a multi-level API structure:

```
api/
  users/
    profile/
      route.ts       → /api/users/profile
    settings/
      route.ts       → /api/users/settings
  products/
    featured/
      route.ts       → /api/products/featured
    route.ts         → /api/products
```

```typescript title="api/products/featured/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({
    message: "Featured products",
    products: [
      { id: 1, name: "Product A", featured: true },
      { id: 2, name: "Product B", featured: true },
    ],
  });
}
```

## Route Matching Priority

:::tip Static Routes Have Highest Priority
BurgerAPI uses a hybrid router (static paths via Bun's native router, dynamic and wildcard via a trie).

- Static routes (e.g., `/products/featured`) are matched _before_ dynamic routes (`/products/[id]`).
- Routes with more static segments are generally matched before routes with fewer.

This helps avoid ambiguity when multiple route patterns could potentially match a request URL.
:::

## Routing Behavior

Beyond path matching, BurgerAPI applies consistent behavior to every route:

### Method Not Allowed (405)

When a known route is requested with a method it does not support, BurgerAPI returns `405` and includes an `Allow` header listing the supported methods:

```
GET    /api/products   → 200
DELETE /api/products   → 405  Allow: GET, POST
```

### Automatic HEAD

You do not need to write a separate `HEAD` handler. A `HEAD` request to any route that defines `GET` runs the `GET` handler and returns the same response with the body removed. The route's validation also applies to `HEAD` requests, so `ctx.validated` is fully populated inside the handler.

### Trailing Slash

Trailing slashes are matched loosely: `/api/products` and `/api/products/` resolve to the same route. On a dynamic route, a trailing slash is treated as an empty parameter value (e.g. `/api/users/` → `ctx.params.id === ""`), which your Zod schema can then reject.

### Priority Example

Given these routes:
```
api/products/featured/route.ts    → Static: /api/products/featured
api/products/[id]/route.ts         → Dynamic: /api/products/[id]
api/products/[...]/route.ts        → Wildcard: /api/products/[...]
```

Request matching:
- `GET /api/products/featured` → Matches **static** route (highest priority)
- `GET /api/products/123` → Matches **dynamic** route (static doesn't match, dynamic checked next)
- `GET /api/products/123/reviews` → Matches **wildcard** route (only wildcard can match multiple segments)

## Best Practices

### 1. Keep Routes Simple and Predictable

```typescript
// ✅ Good: Clear, predictable paths
api/users/route.ts          → /api/users
api/users/profile/route.ts  → /api/users/profile

// ❌ Avoid: Overly nested or unclear paths
api/v1/data/users/info/personal/route.ts
```

### 2. Use Proper HTTP Methods

```typescript
// ✅ Good: RESTful methods
export async function GET(ctx: BurgerContext) { /* Get resource */ }
export async function POST(ctx: BurgerContext) { /* Create resource */ }
export async function DELETE(ctx: BurgerContext) { /* Delete resource */ }

// ❌ Avoid: Using GET for mutations
export async function GET(ctx: BurgerContext) { /* Don't delete in GET! */ }
```

### 3. Return Proper Response Objects

```typescript
// ✅ Good: Always return Response
export async function GET(ctx: BurgerContext) {
  return Response.json({ data: [] });
}

// ❌ Avoid: Returning plain objects
export async function GET(ctx: BurgerContext) {
  return { data: [] }; // Won't work!
}
```

### 4. Handle Errors Gracefully

```typescript
export async function POST(ctx: BurgerContext) {
  try {
    const body = await ctx.json();
    // Process body...
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
```

## Types for this feature

TypeScript checks your handlers before they run.

The types you use (all from `burger-api`):

- `BurgerContext` — the request object passed to a handler
- `RequestHandler` — the type of a handler function

✅ Correct — type the handler parameter with `BurgerContext`:

```typescript
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
    return Response.json({ message: "ok" });
}
```

❌ Wrong — no parameter type and a non-`Response` return:

```typescript
export async function GET(ctx) {
    return { message: "ok" }; // ❌ Parameter 'ctx' needs a type
}
// ❌ Return type must be Response
```

For typed request data (query, params, body), add a schema and wrap the handler with `defineRoute(schema, handler)` — or use `BurgerContext<typeof GET>` directly if you'd rather write the generic by hand. See [Validation](/docs/validation/zod) and the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Next Steps

Now that you understand static routes, learn about other routing patterns:

- **[Route Groups](./route-groups.md)** - Organize routes without affecting URLs
- **[Dynamic Routes](./dynamic-routes.md)** - Capture URL parameters like IDs
- **[Wildcard Routes](./wildcard-routes.md)** - Handle complex nested paths

Static routes form the backbone of your API. Use them for well-defined endpoints with fixed paths, and combine them with dynamic and wildcard routes for a powerful, flexible routing system.

