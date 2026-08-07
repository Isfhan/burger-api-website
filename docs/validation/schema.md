---
sidebar_label: Schema Definition
---

# Schema Definition

The **validation schema** lives in `schema.ts`, one per route directory. It exports one object per HTTP method (uppercase: `GET`, `POST`, and so on). For each method you describe the data you expect.

In short: a schema is a small description of "what the request should look like". BurgerAPI reads it, checks the real request against it, and gives you clean data to work with.

## The full shape

```typescript title="api/products/schema.ts"
import { z } from "zod";

export const GET = {
  // path parameters, e.g. /users/:id
  params: z.object({ id: z.string() }),
  // query string, e.g. ?limit=10
  query: z.object({ limit: z.number() }),
  // request headers
  headers: z.object({ "x-api-key": z.string() }),
  // cookies
  cookies: z.object({ session: z.string() }),
  // JSON request body (POST/PUT)
  body: z.object({ name: z.string() }),
  // per-route opt-in for automatic type conversion
  coerce: true,
};

export const POST = {
  body: z.object({ name: z.string() }),
  // validate what the handler returns
  response: { 200: z.object({ id: z.string() }) },
};
```

Every slot is optional. You only describe what you actually use.

## Reusing a model by name

Instead of writing a schema inline, you can register a named model and reference it by a string. This keeps shared shapes (like pagination) in one place:

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
  },
});
```

```typescript title="api/items/schema.ts"
export const GET = { query: "Pagination" }; // string ref → resolves to the model
```

See [Model Registry](/docs/validation/models) for the full story.

## Validated data

After validation, the result is available on `ctx.validated`:

- `ctx.validated.params`
- `ctx.validated.query`
- `ctx.validated.headers`
- `ctx.validated.cookies`
- `ctx.validated.body`

Each is typed from the corresponding schema. Annotate the handler with `BurgerContext<typeof GET>` to get the inferred types. See [Zod Validation](/docs/validation/zod), [Query](/docs/validation/query), and [Body](/docs/validation/body).


## Related

- [Zod Validation](/docs/validation/zod)
- [Params Validation](/docs/validation/params)
- [Query Validation](/docs/validation/query)
- [Body Validation](/docs/validation/body)
- [Headers Validation](/docs/validation/headers)
- [Cookie Validation](/docs/validation/cookie)
- [Model Registry](/docs/validation/models)
- [Validation Types](/docs/api/validation-types)
