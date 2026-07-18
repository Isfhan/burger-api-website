---
slug: burger-api-v0.12.0-release
title: BurgerAPI v0.12.0 — Validation 2.0
authors: [isfhan]
tags: [release, validation, performance, schema]
---

**v0.12.0 brings Validation 2.0: compiled validators, reusable models, automatic type conversion, header and cookie validation, response validation, Standard Schema support, and clearer errors. Everything is backward compatible — existing Zod routes keep working with no changes.**

<!-- truncate -->

## Why Validation 2.0

Validation is the first line of defense for an API. The previous model worked, but it had rough edges: query and path values were always text, so numbers and booleans failed strict schemas; shared shapes were copied from route to route; and there was no way to check what a handler returned.

Validation 2.0 keeps the simple `schema` export you already know and fills those gaps — without adding a second pipeline or changing how requests flow.

## Major improvements

- **Compiled validators** — each schema is prepared once when the app starts and reused across requests and routes. Identical schemas share one compiled validator, so startup cost scales with the number of unique shapes, not the number of routes.
- **Model registry** — define a shape once in `models` and reference it by name from any route. Shared contracts live in one place and the compiled validator is reused.
- **Automatic type conversion (coercion)** — turn on `coerce: true` and `"42"` becomes `42`, `"true"` becomes `true` for query, params, headers, and cookies. Off by default, so existing behavior is unchanged.
- **Headers and cookies** — validate request headers and cookie values with the same `schema` export.
- **Response validation** — declare a `response` schema and BurgerAPI checks what your handler returns. Default mode is `dev` (observe, never break); `enforce` returns a safe error on mismatch.
- **Standard Schema support** — any library that follows the Standard Schema contract (Valibot, ArkType, Zod v4) works through the same `schema` export. Zod stays the default.
- **Clearer errors** — failures return a structured `400`. Choose the simple `plain` format or the RFC 9457-style `problem+json` format. Production bodies never leak stacks or schema internals, and you can supply a custom `errorRenderer`.

## Developer experience

The day-to-day experience stays simple. A route still looks like this:

```typescript
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
  get: {
    query: z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
    }),
  },
};

export function GET(req: BurgerRequest) {
  const { page, limit } = req.validated.query;
  return Response.json({ page, limit });
}
```

Turn on conversion for the whole app instead of writing `z.coerce.*` on every field:

```typescript
// burger.config.ts
export default {
  validation: { coerce: true },
};
```

Reuse a shape as a model:

```typescript
// burger.config.ts
export default {
  models: {
    Pagination: z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
    }),
  },
};
```

```typescript
// api/items/route.ts
export const schema = {
  get: { query: "Pagination" },
};
```

Validate a response and get free feedback in development:

```typescript
export const schema = {
  get: {
    response: { 200: z.object({ ok: z.boolean() }) },
  },
};
```

## Performance

Validator compilation happens once before the server starts. The request path performs a fixed set of validation calls with no schema re-walking and no per-request setup. Coercion adds a small, precomputed pass only when enabled. Because identical schemas share one compiled validator, adding more routes that use the same shape costs nothing extra.

## Compatibility

Validation 2.0 is fully backward compatible:

- Existing Zod `schema` exports behave exactly as before.
- The `400` error and `req.validated` contract are unchanged.
- `z.coerce.*` still works; `coerce: true` is an optional, app-wide alternative.
- New slots (`headers`, `cookie`, `response`) and `models` are opt-in.

## Migration notes

Most apps need no changes. If you want the new conveniences:

1. Enable `coerce: true` and drop `z.coerce.*` where you no longer need it.
2. Move repeated shapes into `models` and reference them by name.
3. Add `headers`/`cookie`/`response` schemas only where useful.
4. Set `errorFormat: "problem+json"` if your clients expect it.

See the [migration guide](/docs/validation/migration) for the full checklist.

## Examples

A small app showing every feature — coercion, headers, cookies, models, and response validation — is documented in the [validation guides](/docs/validation/zod). Here is the coercion case end to end:

```typescript
// burger.config.ts
export default {
  validation: { coerce: true },
};
```

```typescript
// api/products/route.ts
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
  get: { query: z.object({ n: z.number(), b: z.boolean() }) },
};

export function GET(req: BurgerRequest) {
  const { n, b } = req.validated.query;
  return Response.json({ n, b });
}
```

A request to `?n=42&b=true` gives `req.validated.query` of `{ n: 42, b: true }` — real number and boolean.

## What's next

Validation 2.0 rounds out the request-side story. Upcoming work focuses on richer OpenAPI output (including model references and the new slots), full RFC 9457 `problem+json` details, and more. As always, the API stays stable and additive.

## Upgrade

```bash
bun add burger-api@latest
```

No code changes are required. See the [validation documentation](/docs/validation/zod) for the complete guide.

## Get Involved

BurgerAPI is open source and we welcome contributions!

- ⭐ [Star us on GitHub](https://github.com/isfhan/burger-api)
- 🐛 [Report issues](https://github.com/isfhan/burger-api/issues)
- 💡 [Share ideas](https://github.com/isfhan/burger-api/discussions)
- 🤝 [Contribute code](https://github.com/isfhan/burger-api/pulls)

---

*Thanks for building with BurgerAPI. 🍔*
