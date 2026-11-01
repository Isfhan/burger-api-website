---
sidebar_label: Query Parsing
---

# Query Parsing

Query strings are available through `ctx.query`. It is a record of `string | string[]`; repeated keys become arrays.

```ts
export async function GET(ctx: BurgerContext) {
  const { tag, page } = ctx.query;
  // ...
}
```

## Why not `new URL(ctx.url)`?

`new URL(ctx.url)` builds a `URL` object and a `URLSearchParams` instance on every call, using memory even when you only need a value or two. `ctx.query` instead:

- Parses lazily, only when you first read it, and caches the result.
- Uses a fast parser that matches `URLSearchParams` semantics, including `+` decoding to a space and lenient handling of malformed escapes.
- Avoids allocating a `URL` object on every request.

So `ctx.query` is both simpler to read and cheaper when the query is unused.

## Behavior

- `ctx.query` is parsed once on first access, then cached. A request that never reads it pays nothing.
- Repeated keys become arrays, in order.
- Malformed percent-encoding is preserved and never throws.

```ts
// Same result, without the extra memory use:
const tag = ctx.query.tag; // instead of new URL(ctx.url).searchParams.get("tag")
```

## Related

- [Request API](/docs/api/request-api)
- [Query Validation](/docs/validation/query)
