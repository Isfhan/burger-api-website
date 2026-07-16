---
sidebar_label: Response Mutation
---

# Response Mutation

Handlers can express response changes through `req.set`. The framework applies them once, at the end of the pipeline, via `applySet`.

## Setting status and headers

```ts
export async function GET(req: BurgerRequest) {
  req.set = {
    status: 201,
    headers: { "x-total": "42" },
  };
  return Response.json({ created: true });
}
```

- `req.set.status` overrides the response status only when defined.
- `req.set.headers` is merged over the response's existing headers; explicit values win.

## applySet

At the single pipeline exit, `applySet` merges `req.set` into the outgoing `Response`:

- If `req.set` is empty (no status, no headers), the original `Response` is returned unchanged — no extra memory is used.
- It runs uniformly on `GET` responses and on the auto-`HEAD` responses derived from `GET`.

## Why a single merge step

Collecting response changes in `req.set` and applying them in one place keeps response handling predictable: middleware and handlers all influence the response the same way, and the framework controls exactly when the `Response` is finalized. This also keeps the busiest code path light on memory.


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
