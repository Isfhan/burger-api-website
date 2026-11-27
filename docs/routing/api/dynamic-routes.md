---
sidebar_label: "Dynamic Routes"
---

# Dynamic Routes

A dynamic route captures part of the URL, such as an ID or a slug. Name a folder with square brackets: `[id]`. The value is in `ctx.params.id`.

## Example

```
api/
  products/
    [id]/
      route.ts         → /api/products/:id
```

```typescript title="api/products/[id]/route.ts"
import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { id } = ctx.params;
  return Response.json({ productId: id });
}
```

```
GET /api/products/123      → ctx.params.id = "123"
GET /api/products/abc-def  → ctx.params.id = "abc-def"
```

Values are always strings. Convert them yourself (for example `Number(id)`), or use a schema with coercion.

## Several parameters

Each `[name]` folder adds a key to `ctx.params`:

```
api/users/[userId]/posts/[postId]/route.ts   → /api/users/:userId/posts/:postId
```

```typescript
const { userId, postId } = ctx.params;
// GET /api/users/42/posts/789 → userId = "42", postId = "789"
```

## Validate parameters

Add a `params` schema in `schema.ts`. Invalid values get a `422` response before your handler runs. Use `defineRoute` to get `ctx.validated.params` typed from the schema.

```typescript title="api/products/[id]/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({
    id: z.string().uuid(),
  }),
};
```

```typescript title="api/products/[id]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema } from "./schema";

export const GET = defineRoute(GetSchema, (ctx) => {
  const { id } = ctx.validated.params; // typed: string
  return Response.json({ productId: id });
});
```

`ctx.params` is the raw `Record<string, string>`. Use `ctx.validated.params` when you want typed, checked values. See [Zod Validation](/docs/validation/zod).

## Rules to know

- **Static wins over dynamic.** With `products/featured/` and `products/[id]/`, `/api/products/featured` goes to the static route. Order is static, then `[param]`, then `[...]`.
- **One parameter name per level.** `[id]/` and `[productId]/` in the same folder is a startup error. Pick one name.
- **A parameter matches one segment.** `/api/products/1/reviews` does not match `[id]`. Use a [wildcard](./wildcard-routes.md) for many segments.
- **No empty values.** `/api/products/` does not match `[id]` with an empty string. It matches `/api/products` if that route exists.

## Related

- [Static Routes](./static-routes.md)
- [Wildcard Routes](./wildcard-routes.md)
- [Route Groups](./route-groups.md)
- [Type Safety](/docs/advanced/type-safety)
