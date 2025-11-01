---
slug: burger-api-v0.4.0-release
title: BurgerAPI v0.4.0 Released
authors: [isfhan]
tags: [release, framework, wildcard, routing]
---

We're excited to announce the release of **BurgerAPI v0.4.0**! This update brings a powerful new routing feature that makes building flexible, complex APIs easier than ever before.

{/* truncate */}

## 🚀 What's New in v0.4.0

### Version 0.4.0 (October 21, 2025)

- **New Feature: Wildcard Routes** - Catch-all routes with `[...]` syntax
- Support for complex, nested URL structures
- Seamless integration with existing dynamic routes
- Enhanced routing flexibility for OAuth, multi-tenant apps, and more
- Access all path segments via `req.wildcardParams` array

## 🎯 Introduction

**Wildcard Routes** is a powerful routing pattern that makes it easy to build flexible APIs that handle complex, nested URL structures.

Wildcard routes are catch-all routes that match any number of path segments after a certain point in your URL. Think of them as a "catch everything else" pattern that gives you ultimate flexibility in handling dynamic paths.

While static routes match exact paths and dynamic routes match single segments, wildcard routes capture **all remaining segments** in the URL path.

## 💡 Why Wildcard Routes?

Building certain types of applications required complex routing logic:

- **OAuth/Authentication systems** (like BetterAuth) handling multiple providers
- **Multi-tenant SaaS applications** with dynamic tenant-specific routes
- **Blog/CMS platforms** with deeply nested category structures
- **E-commerce sites** with complex product category hierarchies
- **Internationalized applications** serving localized content
- **API gateways** routing to different microservices

With wildcard routes, what used to take dozens of routes and complex logic can now be handled with a single route handler.

## 🎯 Getting Started

Creating a wildcard route is simple: use the `[...]` folder name in your route structure.

### Basic Example

**Folder Structure:**

```
api/
  auth/
    [...]/
      route.ts
```

**Route Handler:**

```typescript
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  const wildcardParams = req.wildcardParams || [];

  return Response.json({
    message: "Auth wildcard route",
    path: wildcardParams.join("/"),
    segments: wildcardParams,
  });
}
```

**What It Does:**

```
GET /api/auth/callback
→ wildcardParams = ["callback"]

GET /api/auth/callback/google
→ wildcardParams = ["callback", "google"]

GET /api/auth/callback/facebook
→ wildcardParams = ["callback", "facebook"]
```

All of these requests are handled by the same route handler! 🎉

## 📊 Understanding Route Priority

BurgerAPI's smart routing system matches routes in a specific order to ensure predictable behavior:

1. **Static Routes** - Exact path matches (e.g., `/api/users`)
2. **Dynamic Routes** - Single segment patterns (e.g., `/api/users/[userId]`)
3. **Wildcard Routes** - Catch-all patterns (e.g., `/auth/[...]`)

This means more specific routes always win, giving you precise control over your API behavior. If you have a static route `/api/users`, it will match before your wildcard `/auth/[...]` route.

## 🔥 Advanced Usage: Combining with Dynamic Routes

Here's where things get really powerful. You can nest wildcard routes within dynamic routes:

**Folder Structure:**

```
api/
  users/
    [userId]/
      [...]/
        route.ts → /api/users/[userId]
    route.ts    → /api/users/[userId]/[...]
```

**Route Handler api/users/[userId]/[...]/route.ts:**

```typescript
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

export const schema = {
  get: {
    params: z.object({
      userId: z.string().min(1),
    }),
  },
};

export async function GET(req: BurgerRequest) {
  const { userId } = req.validated.params; // Validate the userId parameter
  const wildcardParams = req.wildcardParams || []; // Access the wildcard parameters array

  return Response.json({
    userId,
    userPath: wildcardParams.join("/"),
    segments: wildcardParams,
  });
}
```

**Example Requests:**

```
GET /api/users/123/posts/456/comments
→ params.userId = "123"
→ wildcardParams = ["posts", "456", "comments"]

GET /api/users/abc/files/documents/resume.pdf
→ params.userId = "abc"
→ wildcardParams = ["files", "documents", "resume.pdf"]
```

This pattern is perfect for user-specific resources with nested structures!

## 🌟 Real-World Use Cases

### OAuth Authentication (Like BetterAuth)

Handle multiple OAuth providers with a single wildcard route:

```typescript
const providers = {
  "google/callback": { name: "Google", redirectUrl: "/dashboard" },
  "github/callback": { name: "GitHub", redirectUrl: "/dashboard" },
  "facebook/callback": { name: "Facebook", redirectUrl: "/dashboard" },
};

export async function GET(req: BurgerRequest) {
  const authPath = req.wildcardParams?.join("/") || "";
  const provider = providers[authPath];

  if (!provider) {
    return Response.json({ error: "Unknown provider" }, { status: 404 });
  }

  // Handle OAuth callback
  return Response.json({
    success: true,
    provider: provider.name,
    redirectUrl: provider.redirectUrl,
  });
}
```

### Multi-tenant SaaS Application

Build tenant-specific APIs with dynamic nested resources:

```typescript
export async function GET(req: BurgerRequest) {
  const { tenantId } = req.validated.params;
  const resourcePath = req.wildcardParams || [];
  const [resource, ...rest] = resourcePath;

  // Route: /tenants/acme-corp/users/settings/notifications
  return Response.json({
    tenant: tenantId,
    resource,
    subPath: rest.join("/"),
    data: { message: `Fetching ${resource} for tenant ${tenantId}` },
  });
}
```

### Blog/CMS with Nested Categories

Handle deeply nested blog content:

```typescript
export async function GET(req: BurgerRequest) {
  const segments = req.wildcardParams || [];
  // Route: /blog/tech/web-dev/react/2024/hooks-guide

  const lastSegment = segments[segments.length - 1];
  const isPost = lastSegment.includes("-");

  return Response.json({
    type: isPost ? "post" : "category",
    path: segments.join("/"),
    breadcrumbs: segments,
  });
}
```

### E-commerce Product Categories

Handle complex product hierarchies:

```typescript
export async function GET(req: BurgerRequest) {
  const categoryPath = req.wildcardParams || [];
  // Route: /products/electronics/computers/laptops/gaming

  return Response.json({
    category: categoryPath[categoryPath.length - 1],
    fullPath: categoryPath.join(" > "),
    products: [{ id: 1, name: "Gaming Laptop Pro", price: 1299 }],
  });
}
```

## ⚡ Key Features

- **Simple Syntax**: Just use `[...]` in your folder structure
- **Type-Safe**: Access segments via `req.wildcardParams` array
- **Flexible Patterns**: Combine with dynamic routes for powerful APIs
- **Smart Routing**: Predictable matching with clear priority rules
- **Powerful Combinations**: Works alongside Zod validation for dynamic route params

## 📚 Learn More

Want to dive deeper? Check out our comprehensive [Wildcard Routes Documentation](/docs/routing/api/wildcard-routes).

## 🚦 Upgrade to v0.4.0

Update your project to start using wildcard routes today!

```bash
bun install burger-api@latest
```

We can't wait to see what you build with this feature. Whether it's a sophisticated admin panel, a multi-tenant SaaS platform, or something entirely new, wildcard routes give you the power to handle complex routing scenarios with elegance and simplicity.

## 🤝 Community

Have questions or feedback about v0.4.0? We'd love to hear from you! Share your use cases, ask questions, or show us what you've built.

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
