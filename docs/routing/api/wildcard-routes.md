---
sidebar_label: "Wildcard Routes"
---

# Wildcard Routes

Wildcard routes let you create catch-all routes that match any number of path segments after a certain point in the URL. This powerful feature is perfect for building admin panels, file systems, documentation sites, proxies, and more.

## What Are Wildcard Routes?

Think of wildcard routes as a "catch everything else" pattern. While static routes match exact paths and dynamic routes match single segments, wildcard routes capture **all remaining segments** in the URL path.

**Common Use Cases:**

- **OAuth/Authentication:** Handle multiple authentication providers in one route (like BetterAuth does with `/auth/[...]` for Google, GitHub, Facebook, etc.)
- **Multi-tenant Applications:** Serve tenant-specific content with dynamic subpaths like `/tenants/[tenantId]/[...]`
- **Blog/CMS Systems:** Manage deeply nested content categories like `/blog/tech/web-dev/react/2024/hooks-guide`
- **E-commerce Catalogs:** Handle complex product category hierarchies like `/products/electronics/computers/laptops/gaming`
- **Internationalization (i18n):** Serve localized content with paths like `/[locale]/docs/[...]` for `/en/docs/getting-started/installation`
- **Microservices Gateway:** Route API requests to different microservices based on path patterns

## Basic Usage

Creating a wildcard route is simple: use the `[...]` folder name in your route structure.

### Creating a Wildcard Route

Here's a basic example:

**Folder Structure:**

```
api/
  admin/
    [...]/
      route.ts
```

This structure creates a wildcard route at `/api/admin/*` that matches any path starting with `/api/admin/`.

**Route Handler:**

```typescript title="api/admin/[...]/route.ts"
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  // wildcardParams contains all segments after /admin/
  const wildcardParams = req.wildcardParams || [];

  return Response.json({
    message: "Admin wildcard route",
    path: wildcardParams.join("/"),
    segments: wildcardParams,
  });
}
```

**Example Requests:**

```
GET /api/admin/settings
→ wildcardParams = ["settings"]

GET /api/admin/settings/profile
→ wildcardParams = ["settings", "profile"]

GET /api/admin/users/123/permissions/edit
→ wildcardParams = ["users", "123", "permissions", "edit"]
```

## Accessing Wildcard Parameters

The `req.wildcardParams` property gives you access to all captured path segments as an array of strings.

```typescript title="api/files/[...]/route.ts"
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  const segments = req.wildcardParams || [];

  // Build the file path from segments
  const filePath = segments.join("/");

  // Check if path is provided
  if (segments.length === 0) {
    return Response.json(
      {
        error: "No file path specified",
      },
      { status: 400 }
    );
  }

  return Response.json({
    message: `Fetching file: ${filePath}`,
    directory: segments.slice(0, -1).join("/"),
    filename: segments[segments.length - 1],
  });
}
```

**Accessing the endpoint:**

```
GET /api/files/documents/2024/report.pdf
→ wildcardParams = ["documents", "2024", "report.pdf"]
→ filePath = "documents/2024/report.pdf"
→ directory = "documents/2024"
→ filename = "report.pdf"
```

## Route Priority

Understanding how BurgerAPI matches routes is important when combining different route types.

:::tip Route Matching Order
BurgerAPI uses a smart routing system (a trie) that matches routes in this order:

1. **Static Routes** - Exact path matches (e.g., `/admin/settings`)
2. **Dynamic Routes** - Single segment patterns (e.g., `/admin/[section]`)
3. **Wildcard Routes** - Catch-all patterns (e.g., `/admin/[...]`)

More specific routes always win! This prevents ambiguity and gives you precise control.
:::

### Priority Examples

Let's say you have these routes defined:

```
api/
  admin/
    settings/
      route.ts           → /api/admin/settings (Static)
    [section]/
      route.ts           → /api/admin/[section] (Dynamic)
    [...]/
      route.ts           → /api/admin/[...] (Wildcard)
```

**Here's what gets matched:**

| Request URL                  | Matched Route                  | Why                                      |
| ---------------------------- | ------------------------------ | ---------------------------------------- |
| `/api/admin/settings`        | Static `/api/admin/settings`   | Static routes matched first              |
| `/api/admin/users`           | Dynamic `/api/admin/[section]` | No static match, dynamic matched         |
| `/api/admin/users/list`      | Wildcard `/api/admin/[...]`    | Multiple segments, wildcard catches all  |
| `/api/admin/reports/2024/q3` | Wildcard `/api/admin/[...]`    | Multiple segments, only wildcard matches |

## Advanced Usage

Wildcard routes become even more powerful when combined with dynamic routes.

### Wildcard Inside Dynamic Routes

You can nest wildcard routes within dynamic routes to create flexible APIs:

**Folder Structure:**

```
api/
  users/
    [userId]/
      [...]/
        route.ts
```

This creates a pattern like `/api/users/{userId}/*` where you can access both the user ID and the remaining path.

**Route Handler:**

```typescript title="api/users/[userId]/[...]/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

// Validate the userId parameter
export const schema = {
  get: {
    params: z.object({
      userId: z.string().min(1),
    }),
  },
};

export async function GET(req: BurgerRequest) {
  // Access validated userId from params
  const { userId } = req.validated.params;

  // Access the remaining path segments
  const wildcardParams = req.wildcardParams || [];

  return Response.json({
    userId,
    userPath: wildcardParams.join("/"),
    segments: wildcardParams,
    message: `Accessing user ${userId}'s resource: ${wildcardParams.join("/")}`,
  });
}
```

**Example Requests:**

```
GET /api/users/123/posts
→ params.userId = "123"
→ wildcardParams = ["posts"]

GET /api/users/123/posts/456/comments
→ params.userId = "123"
→ wildcardParams = ["posts", "456", "comments"]

GET /api/users/abc/files/documents/resume.pdf
→ params.userId = "abc"
→ wildcardParams = ["files", "documents", "resume.pdf"]
```

## Real-World Examples

### Example 1: OAuth Authentication Handler (Like BetterAuth)

Handle multiple OAuth providers with a single wildcard route:

```typescript title="api/auth/[...]/route.ts"
import type { BurgerRequest } from "burger-api";

// OAuth provider configurations
const providers = {
  "google/callback": { name: "Google", redirectUrl: "/dashboard" },
  "github/callback": { name: "GitHub", redirectUrl: "/dashboard" },
  "facebook/callback": { name: "Facebook", redirectUrl: "/dashboard" },
  "twitter/callback": { name: "Twitter", redirectUrl: "/dashboard" },
};

export async function GET(req: BurgerRequest) {
  const segments = req.wildcardParams || [];
  const authPath = segments.join("/");

  // Check if it's a known auth route
  const provider = providers[authPath];

  if (!provider) {
    return Response.json(
      {
        error: "Unknown authentication provider",
        path: authPath,
      },
      { status: 404 }
    );
  }

  // Handle OAuth callback
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  // Process OAuth callback (simplified)
  return Response.json({
    success: true,
    provider: provider.name,
    message: `Successfully authenticated with ${provider.name}`,
    redirectUrl: provider.redirectUrl,
  });
}
```

### Example 2: Multi-tenant Application

Build a multi-tenant SaaS API where each tenant has dynamic nested resources:

```typescript title="api/tenants/[tenantId]/[...]/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

export const schema = {
  get: {
    params: z.object({
      tenantId: z.string().uuid(),
    }),
  },
};

export async function GET(req: BurgerRequest) {
  const { tenantId } = req.validated.params;
  const resourcePath = req.wildcardParams || [];

  // Handle different tenant resources
  const [resource, ...rest] = resourcePath;

  switch (resource) {
    case "users":
      return Response.json({
        tenant: tenantId,
        resource: "users",
        subPath: rest,
        data: { message: "Fetching tenant users" },
      });

    case "settings":
      return Response.json({
        tenant: tenantId,
        resource: "settings",
        subPath: rest,
        data: { message: "Fetching tenant settings" },
      });

    case "analytics":
      return Response.json({
        tenant: tenantId,
        resource: "analytics",
        subPath: rest,
        data: { message: "Fetching tenant analytics" },
      });

    default:
      return Response.json(
        {
          error: "Unknown tenant resource",
          tenant: tenantId,
          path: resourcePath.join("/"),
        },
        { status: 404 }
      );
  }
}
```

### Example 3: Blog/CMS with Nested Categories

Handle deeply nested blog categories and posts:

```typescript title="api/blog/[...]/route.ts"
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  const segments = req.wildcardParams || [];

  // Parse the path: /blog/tech/web-dev/react/2024/hooks-guide
  if (segments.length === 0) {
    // Return all top-level categories
    return Response.json({
      type: "categories",
      data: ["tech", "business", "lifestyle"],
    });
  }

  // Check if last segment looks like a post slug
  const lastSegment = segments[segments.length - 1];
  const isPost =
    lastSegment.includes("-") ||
    !segments[segments.length - 1].match(/^\d{4}$/);

  if (isPost) {
    // This is a blog post
    return Response.json({
      type: "post",
      slug: lastSegment,
      category: segments.slice(0, -1).join("/"),
      breadcrumbs: segments,
      // In real app: fetch post from database
      data: {
        title: lastSegment.replace(/-/g, " "),
        category: segments.slice(0, -1),
        content: "Post content here...",
      },
    });
  } else {
    // This is a category
    return Response.json({
      type: "category",
      path: segments.join("/"),
      breadcrumbs: segments,
      // In real app: fetch posts in this category
      posts: ["getting-started", "advanced-techniques", "best-practices"],
    });
  }
}
```

### Example 4: E-commerce Product Categories

Handle complex product category hierarchies:

```typescript title="api/products/[...]/route.ts"
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  const categoryPath = req.wildcardParams || [];

  // Example: /products/electronics/computers/laptops/gaming
  const category = categoryPath[categoryPath.length - 1];
  const parentCategories = categoryPath.slice(0, -1);

  // Get query parameters for filtering
  const url = new URL(req.url);
  const minPrice = url.searchParams.get("min_price");
  const maxPrice = url.searchParams.get("max_price");
  const brand = url.searchParams.get("brand");

  return Response.json({
    category: category,
    fullPath: categoryPath.join(" > "),
    breadcrumbs: categoryPath,
    filters: {
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      brand: brand,
    },
    // In real app: fetch products from database
    products: [
      { id: 1, name: "Gaming Laptop Pro", price: 1299 },
      { id: 2, name: "Ultra Gaming Laptop", price: 1599 },
    ],
  });
}
```

### Example 5: Internationalized Documentation

Serve localized documentation with language prefixes:

```typescript title="api/[locale]/docs/[...]/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

const supportedLocales = ["en", "es", "fr", "de", "ja", "zh"];

export const schema = {
  get: {
    params: z.object({
      locale: z.enum(supportedLocales as [string, ...string[]]),
    }),
  },
};

export async function GET(req: BurgerRequest) {
  const { locale } = req.validated.params;
  const docPath = req.wildcardParams || [];

  if (docPath.length === 0) {
    // Return documentation home for this locale
    return Response.json({
      locale,
      message: `Welcome to documentation (${locale})`,
      sections: ["getting-started", "api-reference", "guides"],
    });
  }

  // Fetch localized documentation
  const fullPath = docPath.join("/");

  return Response.json({
    locale,
    path: fullPath,
    breadcrumbs: docPath,
    // In real app: fetch from CMS or markdown files
    content: {
      title: `${fullPath} (${locale})`,
      body: `Localized content for ${fullPath} in ${locale}`,
    },
  });
}
```

### Example 6: Microservices API Gateway

Route requests to different microservices based on path:

```typescript title="api/gateway/[...]/route.ts"
import type { BurgerRequest } from "burger-api";

// Microservice routing map
const services = {
  users: "http://users-service:3001",
  orders: "http://orders-service:3002",
  payments: "http://payments-service:3003",
  inventory: "http://inventory-service:3004",
};

export async function GET(req: BurgerRequest) {
  const segments = req.wildcardParams || [];
  const [service, ...path] = segments;

  const serviceUrl = services[service];

  if (!serviceUrl) {
    return Response.json(
      {
        error: "Unknown service",
        service,
        availableServices: Object.keys(services),
      },
      { status: 404 }
    );
  }

  // Forward request to microservice
  const targetUrl = `${serviceUrl}/${path.join("/")}`;
  const url = new URL(req.url);

  try {
    const response = await fetch(`${targetUrl}${url.search}`, {
      method: req.method,
      headers: req.headers,
    });

    const data = await response.json();

    return Response.json({
      service,
      path: path.join("/"),
      data,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Service unavailable",
        service,
        message: error.message,
      },
      { status: 503 }
    );
  }
}
```

## API Reference

### `wildcardParams` Property

**Type:** `string[]`

**Description:** An array containing all path segments captured by the wildcard route. Each segment is a string representing one part of the URL path after the wildcard point.

**Usage:**

```typescript
const wildcardParams = req.wildcardParams || [];
```

**Example:**
For the URL `/api/admin/settings/users/permissions`:

```typescript
// In api/admin/[...]/route.ts
wildcardParams = ["settings", "users", "permissions"];
```

## Important Notes

:::warning Limitations
When working with wildcard routes, keep these limitations in mind:

1. **No Mixing in Same Directory:** You cannot have both dynamic `[id]` and wildcard `[...]` folders in the same directory level. Choose one pattern per level.
2. **Lowest Priority:** Wildcard routes are always matched last. If a static or dynamic route exists that matches the path, it will be chosen first.

3. **Single Wildcard Per Branch:** Each route branch should have only one wildcard route. Having multiple wildcards in the same path can lead to unpredictable behavior.

4. **All Segments Captured:** The wildcard captures **all** remaining segments as an array. There's no partial wildcard matching.
   :::

:::tip Best Practices

- **Always check for empty arrays:** Use `req.wildcardParams || []` to handle cases where no segments are provided
- **Validate segments manually:** Wildcard parameters are not validated by Zod schemas. Add your own validation logic to ensure the captured segments are what you expect
- **Use meaningful responses:** Return clear error messages when paths don't match expected patterns
- **Document your paths:** If building a complex API, document which paths are valid for your wildcard routes
- **Combine with dynamic routes:** You can use Zod validation for dynamic route params (like `[userId]`) while handling wildcards manually
   :::

## Summary

Wildcard routes give you the flexibility to handle complex, nested URL structures with ease:

- Use `[...]` folder syntax to create wildcard routes
- Access captured segments via `req.wildcardParams`
- Combine with dynamic routes for powerful patterns
- Remember: Static > Dynamic > Wildcard in matching priority
- Perfect for admin panels, file systems, and proxy APIs

Ready to build something amazing? Check out the other routing documentation to learn more:

- **[Static Routes](./static-routes.md)** - Learn about fixed API endpoints
- **[Route Groups](./route-groups.md)** - Organize routes without affecting URLs
- **[Dynamic Routes](./dynamic-routes.md)** - Capture URL parameters in your routes
