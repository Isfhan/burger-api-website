---
sidebar_label: ContextSet
---

# ContextSet

`ContextSet` is the type of `ctx.set`. Use it to change the response status and headers. For usage, see [Response Mutation](/docs/api/response-mutation).

```ts
interface ContextSet {
  status?: number;
  headers?: Record<string, string | string[]> | Headers;
}
```

## Fields

| Field | Type | What it does |
|-------|------|--------------|
| `status` | `number` | Sets the response status. It does not replace an error status (400 or higher). |
| `headers` | `Record<string, string \| string[]> \| Headers` | Adds headers to the response. Your values win. An array value adds every entry. `set-cookie` values are added, not replaced. |

`ctx.set.headers` always exists, so you can assign to it directly.

```ts
ctx.set.headers = { "x-request-id": ctx.headers.get("x-request-id") ?? "none" };
```

## Related

- [Response Mutation](/docs/api/response-mutation)
- [Request API](/docs/api/request-api)
