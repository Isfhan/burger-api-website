---
sidebar_label: "API Routes"
---

# File-Based API Routes

BurgerAPI makes defining API endpoints intuitive using a file-based routing approach. Simply create files and folders within your designated `apiDir` (configured in the `Burger` constructor, e.g., `apiDir: 'api'`), and BurgerAPI handles the rest.

## Defining Routes

Here's how it works:

**Directory Structure = URL Path:** The folder structure inside `apiDir` directly maps to the URL segments.
Example: `api/users/profile/route.ts` becomes `/users/profile` (assuming the default `apiPrefix` of `'api'`).

**`route.ts` Files:** Each file named `route.ts` defines the handlers for a specific path.

**HTTP Method Exports:** Inside `route.ts`, export functions named after **uppercase** HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) to handle requests for that method.

**Grouping Folders (`(folder)`)**: Need to organize files without affecting the URL? Wrap a folder name in parentheses, like `(group)`. BurgerAPI ignores these when building the route path.
Example: `api/(management)/settings/route.ts` still maps to `/settings`.

**Dynamic Segments (`[param]`)**: Create routes that capture values from the URL by naming folders with square brackets.
Example: `api/products/[id]/route.ts` will match `/products/123`, `/products/abc`, etc. The value (`123` or `abc`) becomes a parameter.

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

## Route Handlers

Your exported HTTP method functions are the route handlers:

- **Argument:** They receive a single argument: the `BurgerRequest` object.
- **`BurgerRequest` Object:** This object extends the standard `Request` and provides helpful properties and methods:
  - `req.url`: The full request URL.
  - `req.method`: The HTTP method.
  - `req.headers`: Request headers.
  - `await req.json()` and `await req.text()` etc.: Methods to read the request body.
  - `req.validated`: Contains validated data if using [Schema Validation](../request-handling/validation.md).
  - `req.params`: An object containing values from dynamic URL segments.
    For a route like `api/products/[id]/route.ts`, `req.params.id` would contain the matched value.
    
- **Return Value:** Handlers **must** return a standard `Response` object.

## Route Matching Order

:::tip Specificity Wins!
BurgerAPI uses an efficient routing mechanism (a trie) that prioritizes more specific routes. This means:

- Static routes (e.g., `/products/featured`) are matched _before_ dynamic routes (`/products/[id]`).
- Routes with more static segments are generally matched before routes with fewer.

This helps avoid ambiguity when multiple route patterns could potentially match a request URL.
:::
