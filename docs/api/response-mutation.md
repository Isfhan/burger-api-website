---
sidebar_label: Response Mutation
---

# Response Mutation

Handlers always return a standard Web `Response`. Response changes are expressed through `ctx.set`, and the framework applies them once at the end of the lifecycle, after `mapResponse`, via `applySet`.

## Setting status and headers

```ts
export async function GET(ctx: BurgerContext) {
  ctx.set = {
    status: 201,
    headers: { "x-total": "42" },
  };
  return Response.json({ created: true });
}
```

- `ctx.set.status` overrides the response status only when defined.
- `ctx.set.headers` is merged over the response's existing headers; explicit values win.

## mapResponse

For response shaping that needs the actual response, use `mapResponse` hooks. They run global to route, after `afterRoute`:

```ts title="src/hooks.ts"
export const mapResponse = [
  (ctx: BurgerContext) => (res: Response) => {
    res.headers.set("x-server", "burger");
    return res;
  },
];
```

A `mapResponse` hook returns a function that receives the current response and returns the transformed response, or returns a `Response` to replace it, or `undefined` to continue. CORS and logger hooks use this phase to decorate responses.

## applySet

At the single exit point of the request flow, `applySet` merges `ctx.set` into the outgoing `Response`:

- If `ctx.set` is empty (no status, no headers), the original `Response` is returned unchanged, with no extra memory used.
- It runs uniformly on handler responses and on the auto-`HEAD` responses derived from `GET`.

## Why a single merge step

Collecting response changes in `ctx.set` and applying them in one place keeps response handling predictable: hooks and handlers all influence the response the same way, and the framework controls exactly when the `Response` is finalized. This also keeps the code that runs for every request light on memory.

## Related

- [ContextSet](/docs/api/context-set)
- [Hook System](/docs/hooks/system)
