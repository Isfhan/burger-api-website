---
sidebar_label: "Static Routes"
---

# Static API Routes

Static routes are the foundation of BurgerAPI's file-based routing system. They match exact URL paths and are always checked first in the routing priority order.

## What Are Static Routes?

Static routes are API endpoints with fixed, predetermined paths. Unlike dynamic or wildcard routes, static routes don't capture any URL parameters—they match exact paths only.

**Examples:**
- `/api/products` - Lists all products
- `/api/users/profile` - Gets current user's profile
- `/api/settings/security` - Gets security settings

## File-Based Routing Basics

BurgerAPI makes defining API endpoints intuitive using a file-based routing approach. Simply create files and folders within your designated `apiDir` (configured in the `Burger` constructor, e.g., `apiDir: 'api'`), and BurgerAPI handles the rest.

### How It Works

**Directory Structure = URL Path:** The folder structure inside `apiDir` directly maps to the URL segments.

Example: `api/users/profile/route.ts` becomes `/api/users/profile` (assuming the default `apiPrefix` of `'api'`).

**`route.ts` Files:** Each file named `route.ts` defines the handlers for a specific path.

**HTTP Method Exports:** Inside `route.ts`, export functions named after **uppercase** HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) to handle requests for that method.

## Creating Your First Static Route

Let's create a simple products API endpoint:

```typescript title="api/products/route.ts"
import type { BurgerRequest } from "burger-api";

// Handles GET requests to /api/products
export function GET(req: BurgerRequest) {
  // Example: Accessing query parameters
  const query = new URL(req.url).searchParams;
  const searchTerm = query.get("search");
  console.log("Search Term:", searchTerm);

  // Always return a Response object
  return Response.json({
    message: `Fetched products${
      searchTerm ? ` matching \"${searchTerm}\"` : ""
    }`,
  });
}

// Handles POST requests to /api/products
export async function POST(req: BurgerRequest) {
  // Example: Reading and echoing the request body
  try {
    const body = await req.json();
    console.log("Received product data:", body);
    return Response.json({ message: "Product created", received: body });
  } catch (error) {
    return new Response("Invalid JSON body", { status: 400 });
  }
}
```

This creates two static routes:
- `GET /api/products` - Lists products
- `POST /api/products` - Creates a new product

## Route Handlers

Your exported HTTP method functions are the route handlers:

### Handler Arguments

- **Argument:** They receive a single argument: the `BurgerRequest` object.

### BurgerRequest Object

This object extends the standard `Request` and provides helpful properties and methods:

- `req.url`: The full request URL.
- `req.method`: The HTTP method.
- `req.headers`: Request headers.
- `await req.json()` and `await req.text()` etc.: Methods to read the request body.
- `req.validated`: Contains validated data if using [Schema Validation](../../request-handling/validation.md).

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
import type { BurgerRequest } from "burger-api";

export function GET(req: BurgerRequest) {
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
BurgerAPI uses an efficient routing mechanism (a trie) that prioritizes more specific routes. **Static routes are always matched first**, before dynamic or wildcard routes.

- Static routes (e.g., `/products/featured`) are matched _before_ dynamic routes (`/products/[id]`).
- Routes with more static segments are generally matched before routes with fewer.

This helps avoid ambiguity when multiple route patterns could potentially match a request URL.
:::

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
export function GET(req: BurgerRequest) { /* Get resource */ }
export function POST(req: BurgerRequest) { /* Create resource */ }
export function DELETE(req: BurgerRequest) { /* Delete resource */ }

// ❌ Avoid: Using GET for mutations
export function GET(req: BurgerRequest) { /* Don't delete in GET! */ }
```

### 3. Return Proper Response Objects

```typescript
// ✅ Good: Always return Response
export function GET(req: BurgerRequest) {
  return Response.json({ data: [] });
}

// ❌ Avoid: Returning plain objects
export function GET(req: BurgerRequest) {
  return { data: [] }; // Won't work!
}
```

### 4. Handle Errors Gracefully

```typescript
export async function POST(req: BurgerRequest) {
  try {
    const body = await req.json();
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

## Next Steps

Now that you understand static routes, learn about other routing patterns:

- **[Route Groups](./route-groups.md)** - Organize routes without affecting URLs
- **[Dynamic Routes](./dynamic-routes.md)** - Capture URL parameters like IDs
- **[Wildcard Routes](./wildcard-routes.md)** - Handle complex nested paths

Static routes form the backbone of your API. Use them for well-defined endpoints with fixed paths, and combine them with dynamic and wildcard routes for a powerful, flexible routing system.

