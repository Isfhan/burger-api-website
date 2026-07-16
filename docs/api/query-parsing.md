---
sidebar_label: Query Parsing
---

# Query Parsing

Query strings are available through `req.query`.

```ts
export async function GET(req: BurgerRequest) {
  const { tag, page } = req.query;
  // ...
}
```

## Why not `new URL(req.url)`?

`new URL(req.url)` builds a `URL` object and a `URLSearchParams` instance on every call, using memory even when you only need a value or two. `req.query` instead:

- Parses lazily — only when you first read it.
- Uses a fast Bun-native parser that matches `URLSearchParams` semantics (including `+` → space and lenient handling of malformed escapes).
- Avoids allocating a `URL` object for every request.

So `req.query` is both simpler to read and cheaper when the query is unused.

## Behavior

- `req.query` is a record of `string | string[]`. Repeated keys become arrays.
- It is `URLSearchParams`-compatible in practice, so existing parsing expectations hold.

```ts
// Same result, without the extra memory use:
const tag = req.query.tag; // instead of new URL(req.url).searchParams.get("tag")
```


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
