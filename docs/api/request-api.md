---
sidebar_label: Request API
---

# Request API

The `req` object your handlers receive exposes request data through a small, consistent set of properties. This page shows how to use each one.

## req.params

Dynamic path parameters:

```ts title="api/users/[id]/route.ts"
export async function GET(req: BurgerRequest) {
  const { id } = req.params;
  return Response.json({ id });
}
```

**When to use:** any time the route has a `[param]` segment.

## req.query

The parsed query string, available lazily:

```ts
export async function GET(req: BurgerRequest) {
  const { limit = "10", tag } = req.query;
  return Response.json({ limit, tag });
}
```

**Why:** `req.query` parses only when you read it, so requests that don't use the query pay nothing for parsing. Prefer it over constructing `new URL(req.url)`. See [Query Parsing](./query-parsing.md).

## req.route

The matched route's identity:

```ts
export async function GET(req: BurgerRequest) {
  // req.route.pattern === "/users/:id"
  return Response.json({ pattern: req.route.pattern });
}
```

Present on every matched route, including static routes. See [Route Metadata](./route-metadata.md).

## req.validated

Data that passed your Zod schemas:

```ts title="api/products/route.ts"
export const schema = {
  get: { query: z.object({ limit: z.coerce.number().optional() }) },
};

export async function GET(req: BurgerRequest) {
  const { limit } = req.validated.query; // typed + validated
  return Response.json({ limit });
}
```

**Why:** validated data is typed from your schema, so handlers know exactly what they received without manual casts. See [CRUD API](/docs/examples/crud-api) for the full route file.

## req.set

Response mutations, covered in [Response Mutation](./response-mutation.md).


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
