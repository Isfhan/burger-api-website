---
sidebar_label: "Dynamic Routes"
---

# Dynamic Routes

Dynamic routes allow you to capture values from the URL and use them in your route handlers. They're perfect for RESTful APIs where you need to work with specific resources identified by IDs or slugs.

## What Are Dynamic Routes?

Dynamic routes use square brackets `[param]` in folder names to capture URL segments as parameters. These captured values become available in your route handler through `req.params`.

## Syntax

Create a folder with square brackets to define a dynamic segment:

```
[paramName]
```

The `paramName` will be the key in `req.params` object.

## Basic Example

### Folder Structure

```
api/
  products/
    [id]/
      route.ts         → /api/products/[id]
```

### Route Handler

```typescript title="api/products/[id]/route.ts"
import type { BurgerRequest } from "burger-api";

export function GET(req: BurgerRequest) {
  // Access the captured parameter
  const productId = req.params.id;
  
  return Response.json({
    message: `Fetching product with ID: ${productId}`,
    productId,
  });
}

export function DELETE(req: BurgerRequest) {
  const productId = req.params.id;
  
  // Delete logic here...
  
  return Response.json({
    message: `Product ${productId} deleted successfully`,
  });
}
```

### Example Requests

```
GET /api/products/123
→ req.params.id = "123"

GET /api/products/abc-def
→ req.params.id = "abc-def"

DELETE /api/products/456
→ req.params.id = "456"
```

## Multiple Dynamic Segments

You can have multiple dynamic segments in the same route:

### Folder Structure

```
api/
  users/
    [userId]/
      posts/
        [postId]/
          route.ts     → /api/users/[userId]/posts/[postId]
```

### Route Handler

```typescript title="api/users/[userId]/posts/[postId]/route.ts"
import type { BurgerRequest } from "burger-api";

export function GET(req: BurgerRequest) {
  const { userId, postId } = req.params;
  
  return Response.json({
    message: `Fetching post ${postId} from user ${userId}`,
    userId,
    postId,
  });
}
```

### Example Request

```
GET /api/users/42/posts/789
→ req.params.userId = "42"
→ req.params.postId = "789"
```

## Accessing Parameters

Parameters are always available as strings in the `req.params` object:

```typescript
export function GET(req: BurgerRequest) {
  // Direct destructuring
  const { id } = req.params;
  
  // Or access by key
  const userId = req.params.userId;
  
  // Convert to number if needed
  const numericId = parseInt(id, 10);
  
  return Response.json({ id, numericId });
}
```

## Validation with Zod

For type safety and validation, use Zod schemas:

```typescript title="api/products/[id]/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

// Define validation schema
export const schema = {
  get: {
    params: z.object({
      id: z.string().uuid(), // Validate as UUID
    }),
  },
  delete: {
    params: z.object({
      id: z.string().min(1), // Ensure non-empty
    }),
  },
};

export function GET(req: BurgerRequest) {
  // Access validated params
  const { id } = req.validated.params;
  
  // TypeScript knows 'id' is a valid UUID string
  return Response.json({
    message: "Product found",
    productId: id,
  });
}

export function DELETE(req: BurgerRequest) {
  const { id } = req.validated.params;
  
  return Response.json({
    message: `Product ${id} deleted`,
  });
}
```

### Advanced Validation

```typescript
import { z } from "zod";

export const schema = {
  get: {
    params: z.object({
      // Must be numeric string
      userId: z.string().regex(/^\d+$/),
      // Slug format: lowercase, hyphens only
      slug: z.string().regex(/^[a-z0-9-]+$/),
    }),
  },
};
```

## Route Matching Priority

:::tip Understanding Priority
BurgerAPI matches routes in this order:
1. **Static routes** - Exact path matches (e.g., `/products/featured`)
2. **Dynamic routes** - Single parameter patterns (e.g., `/products/[id]`)
3. **Wildcard routes** - Catch-all patterns (e.g., `/products/[...]`)

Dynamic routes are checked after static routes but before wildcard routes.
:::

### Priority Example

Given these routes:

```
api/products/featured/route.ts    → Static
api/products/[id]/route.ts         → Dynamic
api/products/[...]/route.ts        → Wildcard
```

Request matching:

```
GET /api/products/featured
→ Matches: Static route (exact match)

GET /api/products/123
→ Matches: Dynamic route (not "featured", so dynamic [id] matches)

GET /api/products/123/reviews
→ Matches: Wildcard route (multiple segments, only wildcard can handle)
```

## Common Patterns

### 1. Resource CRUD Operations

```
api/
  users/
    [userId]/
      route.ts         → GET, PUT, DELETE /api/users/[userId]
```

```typescript title="api/users/[userId]/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

export const schema = {
  get: {
    params: z.object({ userId: z.string().min(1) }),
  },
  put: {
    params: z.object({ userId: z.string().min(1) }),
    body: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  },
  delete: {
    params: z.object({ userId: z.string().min(1) }),
  },
};

export function GET(req: BurgerRequest) {
  const { userId } = req.validated.params;
  return Response.json({ userId, action: "fetch" });
}

export async function PUT(req: BurgerRequest) {
  const { userId } = req.validated.params;
  const { name, email } = req.validated.body;
  
  return Response.json({
    userId,
    action: "update",
    data: { name, email },
  });
}

export function DELETE(req: BurgerRequest) {
  const { userId } = req.validated.params;
  return Response.json({ userId, action: "delete" });
}
```

### 2. Nested Resources

```
api/
  projects/
    [projectId]/
      tasks/
        [taskId]/
          route.ts     → /api/projects/[projectId]/tasks/[taskId]
```

```typescript
export function GET(req: BurgerRequest) {
  const { projectId, taskId } = req.params;
  
  return Response.json({
    message: `Task ${taskId} in project ${projectId}`,
    projectId,
    taskId,
  });
}
```

### 3. Slug-Based Routes

```
api/
  blog/
    [slug]/
      route.ts         → /api/blog/[slug]
```

```typescript title="api/blog/[slug]/route.ts"
import type { BurgerRequest } from "burger-api";
import { z } from "zod";

export const schema = {
  get: {
    params: z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
    }),
  },
};

export function GET(req: BurgerRequest) {
  const { slug } = req.validated.params;
  
  return Response.json({
    slug,
    title: `Blog post: ${slug}`,
    content: "...",
  });
}
```

### 4. Combining with Route Groups

```
api/
  (authenticated)/
    profile/
      [section]/
        route.ts       → /api/profile/[section]
```

The `(authenticated)` group is ignored, but `[section]` still captures the parameter.

## Best Practices

### 1. Use Descriptive Parameter Names

```typescript
// ✅ Good: Clear and specific
api/users/[userId]/route.ts
api/products/[productId]/route.ts
api/posts/[slug]/route.ts

// ❌ Avoid: Generic names
api/users/[id]/route.ts  // Which ID?
api/items/[x]/route.ts   // What is 'x'?
```

### 2. Always Validate Parameters

```typescript
// ✅ Good: Validate with Zod
export const schema = {
  get: {
    params: z.object({
      userId: z.string().uuid(),
    }),
  },
};

// ❌ Avoid: Trusting raw params
export function GET(req: BurgerRequest) {
  const id = req.params.userId; // Could be anything!
  // Use without validation...
}
```

### 3. Handle Invalid Parameters

```typescript
export function GET(req: BurgerRequest) {
  const { userId } = req.params;
  
  // Validate format
  if (!/^\d+$/.test(userId)) {
    return Response.json(
      { error: "Invalid user ID format" },
      { status: 400 }
    );
  }
  
  const numericId = parseInt(userId, 10);
  
  // Check if resource exists
  const user = await findUser(numericId);
  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  
  return Response.json(user);
}
```

### 4. Type Safety with TypeScript

```typescript
import type { BurgerRequest } from "burger-api";

// Define expected params type
type Params = {
  userId: string;
  postId: string;
};

export function GET(req: BurgerRequest) {
  const { userId, postId } = req.params as Params;
  // Now TypeScript knows the shape of params
}
```

## Limitations

### Cannot Mix with Wildcards

You **cannot** have both dynamic `[param]` and wildcard `[...]` folders at the same directory level:

```typescript
// ❌ This won't work:
api/
  products/
    [id]/
      route.ts
    [...]/
      route.ts

// ✅ Choose one pattern per level:
api/
  products/
    [id]/
      route.ts
```

### Parameters Are Always Strings

All parameters come in as strings. Convert them to other types as needed:

```typescript
export function GET(req: BurgerRequest) {
  const idStr = req.params.id;           // "123" (string)
  const idNum = parseInt(idStr, 10);     // 123 (number)
  const isActive = req.params.active === "true";  // boolean
}
```

## Next Steps

Now that you understand dynamic routes, explore other routing patterns:

- **[Static Routes](./static-routes.md)** - Fixed API endpoints
- **[Route Groups](./route-groups.md)** - Organize without affecting URLs
- **[Wildcard Routes](./wildcard-routes.md)** - Handle complex nested paths

Dynamic routes are essential for RESTful APIs. They let you build flexible endpoints that work with any resource identifier, making your API scalable and maintainable.

