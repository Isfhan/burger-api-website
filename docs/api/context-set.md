---
sidebar_label: ContextSet
---

# ContextSet

`ContextSet` is the type of `req.set`. It describes response changes that the framework applies at the end of the request's processing steps (the request flow).

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
req.set = {
  status: 201,
  headers: { "x-version": "0.11.0" },
};
```

The mutation is applied by `applySet`. See [Response Mutation](./response-mutation.md).


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
