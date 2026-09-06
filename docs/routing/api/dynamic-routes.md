---
sidebar_label: "Dynamic Routes"
---

# Dynamic Routes

Dynamic routes allow you to capture values from the URL and use them in your route handlers. They're perfect for RESTful APIs where you need to work with specific resources identified by IDs or slugs.

## What Are Dynamic Routes?

Dynamic routes use square brackets `[param]` in folder names to capture URL segments as parameters. These captured values become available in your route handler through `ctx.params`.

## Syntax

Create a folder with square brackets to define a dynamic segment:

```
[paramName]
```

The `paramName` will be the key in `ctx.params` object.

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
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  // Access the captured parameter
  const productId = ctx.params.id;

  return Response.json({
    message: `Fetching product with ID: ${productId}`,
    productId,
  });
}

export async function DELETE(ctx: BurgerContext) {
  const productId = ctx.params.id;

  // Delete logic here...

  return Response.json({
    message: `Product ${productId} deleted successfully`,
  });
}
```

### Example Requests

```
GET /api/products/123
→ ctx.params.id = "123"

GET /api/products/abc-def
→ ctx.params.id = "abc-def"

DELETE /api/products/456
→ ctx.params.id = "456"
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
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { userId, postId } = ctx.params;
  
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
→ ctx.params.userId = "42"
→ ctx.params.postId = "789"
```

## Accessing Parameters

Parameters are always available as strings in the `ctx.params` object:

```typescript
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  // Direct destructuring
  const { id } = ctx.params;
  
  // Or access by key
  const userId = ctx.params.userId;
  
  // Convert to number if needed
  const numericId = parseInt(id, 10);
  
  return Response.json({ id, numericId });
}
```

:::tip Trailing Slash and Unsupported Methods
A trailing slash on a dynamic route is treated as an **empty parameter value**: `GET /api/users/` sets `ctx.params.id === ""` (your Zod schema can then reject it). Requesting a route with an unsupported method returns `405` with an `Allow` header listing the methods the route does support.
:::

## Validation with Zod

For type safety and validation, declare per-method schemas in a `schema.ts` file next to the route. See [Zod Validation](/docs/validation/zod) for the full shape.

```typescript title="api/products/[id]/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({
    id: z.string().uuid(), // Validate as UUID
  }),
};

export const DELETE = {
  params: z.object({
    id: z.string().min(1), // Ensure non-empty
  }),
};
```

```typescript title="api/products/[id]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema, DELETE as DeleteSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  // Access validated params
  const { id } = ctx.validated.params;

  // TypeScript knows 'id' is a valid UUID string
  return Response.json({
    message: "Product found",
    productId: id,
  });
});

export const DELETE = defineRoute(DeleteSchema, (ctx) => {
  const { id } = ctx.validated.params;

  return Response.json({
    message: `Product ${id} deleted`,
  });
});
```

(The equivalent manual-generic form — `BurgerContext<typeof GetSchema>` — still works if you'd rather write it by hand; see [Type Safety](/docs/advanced/type-safety).)

### Advanced Validation

```typescript title="api/users/[userId]/posts/[slug]/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({
    // Must be numeric string
    userId: z.string().regex(/^\d+$/),
    // Slug format: lowercase, hyphens only
    slug: z.string().regex(/^[a-z0-9-]+$/),
  }),
};
```

## Route Matching Priority

:::tip Understanding Priority
BurgerAPI uses a hybrid router (static paths via Bun's native router, dynamic and wildcard via a trie). Static routes are matched first, then dynamic, then wildcard.
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

```typescript title="api/users/[userId]/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({ userId: z.string().min(1) }),
};

export const PUT = {
  params: z.object({ userId: z.string().min(1) }),
  body: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
};

export const DELETE = {
  params: z.object({ userId: z.string().min(1) }),
};
```

```typescript title="api/users/[userId]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema, PUT as PutSchema, DELETE as DeleteSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { userId } = ctx.validated.params;
  return Response.json({ userId, action: "fetch" });
});

export const PUT = defineRoute(PutSchema, (ctx) => {
  const { userId } = ctx.validated.params;
  const { name, email } = ctx.validated.body;

  return Response.json({
    userId,
    action: "update",
    data: { name, email },
  });
});

export const DELETE = defineRoute(DeleteSchema, (ctx) => {
  const { userId } = ctx.validated.params;
  return Response.json({ userId, action: "delete" });
});
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
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { projectId, taskId } = ctx.params;
  
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

```typescript title="api/blog/[slug]/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
  }),
};
```

```typescript title="api/blog/[slug]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { slug } = ctx.validated.params;

  return Response.json({
    slug,
    title: `Blog post: ${slug}`,
    content: "...",
  });
});
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
// ✅ Good: Validate with Zod in schema.ts
export const GET = {
  params: z.object({
    userId: z.string().uuid(),
  }),
};

// ❌ Avoid: Trusting raw params
export async function GET(ctx: BurgerContext) {
  const id = ctx.params.userId; // Could be anything!
  // Use without validation...
}
```

### 3. Handle Invalid Parameters

```typescript
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { userId } = ctx.params;
  
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

Prefer schema-driven typing over manual casts. `defineRoute(schema, handler)` infers `ctx.validated`'s exact shape from the schema you pass it — no generic to write:

```typescript
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { userId, postId } = ctx.validated.params; // typed from the schema
  return Response.json({ userId, postId });
});
```

## Limitations

### Mixing with Wildcards

Dynamic `[param]` and wildcard `[...]` folders can coexist at the same directory level. The router resolves a request by priority:

1. Static routes match first (exact segment).
2. Dynamic `[param]` matches a single segment next.
3. Wildcard `[...]` captures everything else.

```typescript
// ✅ All three can coexist:
api/
  products/
    featured/
      route.ts        // GET /api/products/featured → static
    [id]/
      route.ts        // GET /api/products/42      → dynamic
    [...]/
      route.ts        // GET /api/products/a/b     → wildcard
```

### Parameters Are Always Strings

All parameters come in as strings. Convert them to other types as needed:

```typescript
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const idStr = ctx.params.id;           // "123" (string)
  const idNum = parseInt(idStr, 10);     // 123 (number)
  const isActive = ctx.params.active === "true";  // boolean
}
```

## Types for this feature

TypeScript checks two things here: the handler parameter and the URL parameters.

The types you use (from `burger-api`):

- `defineRoute(schema, handler)` — infers the handler's `ctx` from `schema`; no generic to write
- `BurgerContext<typeof GET>` — the same inference, written by hand
- `ctx.params` (raw) — always `Record<string, string> | undefined`, not typed by name
- `ctx.validated.params` — typed from the `params` schema in `schema.ts`

✅ Correct — use a `params` schema and read `ctx.validated.params`:

```typescript
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
    const { id } = ctx.validated.params; // typed: string
    return Response.json({ id });
});
```

❌ Wrong — reading a parameter name that is not in the schema:

```typescript
export const GET = defineRoute(GetSchema, (ctx) => {
    const { wrongName } = ctx.validated.params; // ❌ Property 'wrongName' does not exist
});
```

`ctx.params` is always the raw string record. For typed parameters, prefer `ctx.validated.params`. See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Next Steps

Now that you understand dynamic routes, explore other routing patterns:

- **[Static Routes](./static-routes.md)** - Fixed API endpoints
- **[Route Groups](./route-groups.md)** - Organize without affecting URLs
- **[Wildcard Routes](./wildcard-routes.md)** - Handle complex nested paths

Dynamic routes are essential for RESTful APIs. They let you build flexible endpoints that work with any resource identifier, making your API scalable and maintainable.

