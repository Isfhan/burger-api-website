---
sidebar_label: BurgerRequest
---

# BurgerRequest

`BurgerRequest` is the type of the object passed to every handler and middleware. It extends the standard `Request` with a few framework-provided fields.

```ts
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  // ...
}

## Why a single request context

Exposing everything through one `req` keeps handler signatures simple and lets the framework optimize how request data is produced. See [BurgerContext](../architecture/burger-context.md) for how the object is built.

## Properties

### params

- **Type:** `Record<string, string> | undefined`
- **Description:** Dynamic path parameters for the matched route. Present only when the route has parameters (e.g. `/users/:id` → `{ id: "123" }`).
- **Example:** `const { id } = req.params;`
- **Notes:** For wildcard routes, use `req.wildcardParams`.

### query

- **Type:** `Record<string, string | string[]> | undefined`
- **Description:** The parsed query string, evaluated lazily. Behaves like `URLSearchParams` when read as a record; repeated keys become arrays.
- **Example:** `const { tag, page } = req.query;`
- **Notes:** Parsed on first access via a fast Bun-native parser. Prefer `req.query` over `new URL(req.url)`. See [Query Parsing](./query-parsing.md).

### route

- **Type:** `RouteMeta | undefined`
- **Description:** The matched route's identity: `path` (the requested pathname) and `pattern` (the route definition pattern, e.g. `/users/:id`).
- **Example:** `const { path, pattern } = req.route;`
- **Notes:** Present on **every** matched route, including static routes. See [Route Metadata](./route-metadata.md).

### validated

- **Type:** `{ params?, query?, body? }`
- **Description:** Data validated by the route's Zod schemas. Shapes match the schema you declared.
- **Example:** `const { limit } = req.validated.query;`
- **Notes:** Only populated when the route defines a `schema`. See [Validation](../validation/zod.md).

### set

- **Type:** `ContextSet | undefined`
- **Description:** Response mutation intent (`status` and/or `headers`). Merged into the response at the end of the pipeline.
- **Example:** `req.set = { headers: { "x-total": "42" } };`
- **Notes:** Applied by `applySet`. See [Response Mutation](./response-mutation.md).

### wildcardParams

- **Type:** `string[] | undefined`
- **Description:** Catch-all segments for wildcard routes (e.g. `/files/[...]` → `["a", "b", "c"]`).

### Inherited from Request

`BurgerRequest` is a `Request`, so these standard members are available: `method`, `url`, `headers`, `signal`, `body`, `bodyUsed`, `json()`, `text()`, `arrayBuffer()`, `blob()`, `formData()`, `clone()`.


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [ContextSet](/docs/api/context-set)
- [Request API](/docs/api/request-api)
