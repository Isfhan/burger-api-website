---
sidebar_label: Model Registry
---

# Model Registry

As your app grows, the same data shape shows up in many routes — a `Pagination` query, a `User` body, an `Article` response. Copying those Zod schemas everywhere is repetitive and easy to drift. The **model registry** lets you define a shape once and reuse it by name.

## Define models

Models are registered in the `Burger` options under the `models` key:

```typescript title="src/index.ts"
import { Burger } from "burger-api";
import { z } from "zod";

const app = new Burger({
  apiDir: "./src/api",
  models: {
    Pagination: z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
    }),
    NewUser: z.object({
      email: z.string().email(),
      name: z.string().min(1),
    }),
  },
});
```

The CLI can also seed `models` from `burger.build.ts` when it generates the production app. Either way, the compiled validators are shared across every route that uses the same model.

## Use a model by reference

Anywhere you would write a schema, you can write the model's name as a string instead:

```typescript title="api/items/schema.ts"
export const GET = { query: "Pagination" };
```

```typescript title="api/items/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
  const { page, limit } = ctx.validated.query;
  return Response.json({ page, limit });
}
```

The string `"Pagination"` is resolved to the registered schema when the route is prepared (before the server starts). The compiled validator is shared across every route that uses the same model, so there is no extra cost for reusing it.

## Missing model = fast failure

If you reference a model that was never registered, BurgerAPI reports the error **when the app starts** — not on the first request. This makes the mistake impossible to miss:

```
[burger-api] Unknown model reference: "Paginate". Register it in ServerOptions.models.
```

## When to use models

- A shape is used by more than one route.
- You want one place to change a shared contract.
- You want the compiled validator to be shared (a small performance win).

## Types for this feature

Model references are checked at runtime, not by TypeScript.

The types you use (from `burger-api`):

- `BurgerContext<typeof GET>` — the handler type
- `ctx.validated.query` — the validated data

✅ Correct — the handler still gets typed data from a model reference:

```typescript title="api/items/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as RouteSchema } from "./schema";

export async function GET(ctx: BurgerContext<typeof RouteSchema>) {
    const { page, limit } = ctx.validated.query; // works at runtime
    return Response.json({ page, limit });
}
```

⚠️ TypeScript note — a slot written as a string (`query: "Pagination"`) has type `unknown` in `ctx.validated`. The model is resolved at runtime (when the app starts), so TypeScript cannot know its shape. If you need the type too, import the schema directly:

```typescript title="api/items/schema.ts"
import { Pagination } from "../../src/models";

export const GET = { query: Pagination }; // inline schema → typed
```

❌ Wrong — a model name that does not exist fails when the app starts (not at compile time):

```typescript
export const GET = { query: "Paginate" }; // ❌ Unknown model reference at startup
```

See the [TypeScript overview](/docs/advanced/type-safety).

Check your code: `bun run typecheck`.

## Related

- [Schema Definition](/docs/validation/schema)
- [Validation Configuration](/docs/validation/configuration)
- [Zod Validation](/docs/validation/zod)
- [Validation Types](/docs/api/validation-types)
