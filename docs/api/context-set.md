---
sidebar_label: ContextSet
---

# ContextSet

`ContextSet` is the type of `ctx.set`. It describes response changes that the framework applies at the end of the request lifecycle, after `mapResponse`.

```ts
interface ContextSet {
  status?: number;
  headers?: Record<string, string> | Headers;
}
```

## Fields

### status

- **Type:** `number | undefined`
- **Description:** The HTTP status to set on the response. When omitted, the handler's status is preserved.

### headers

- **Type:** `Record<string, string> | Headers | undefined`
- **Description:** Headers to merge over the response's existing headers. Explicitly set values win.

## Example

```ts
export async function POST(ctx: BurgerContext) {
  ctx.set = {
    status: 201,
    headers: { "x-version": "1.0.0" },
  };
  return Response.json({ created: true });
}
```

The mutation is applied by `applySet` at the pipeline exit, after `mapResponse` hooks run. See [Response Mutation](./response-mutation.md).

## Related

- [Response Mutation](/docs/api/response-mutation)
- [Burger Class](/docs/core/burger-class)
