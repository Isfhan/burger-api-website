---
sidebar_label: Best Practices
---

# Validation Best Practices

A few habits that keep validation clear, fast, and easy to maintain.

## Start simple

Begin with plain Zod schemas on the slots you actually use. You do not need every feature on day one:

```typescript
export const schema = {
  post: {
    body: z.object({ name: z.string().min(1), price: z.number() }),
  },
};
```

## Use coercion for text inputs

Query strings, params, headers, and cookies are always text. If you expect numbers or booleans there, turn on [coercion](/docs/validation/coercion) (`coerce: true`) instead of hand-writing `z.coerce.*` on every field.

## Share shapes with models

When the same shape appears in more than one route, register it as a [model](/docs/validation/models) and reference it by name. One source of truth, shared compiled validator.

## Keep handlers thin

Validation runs before your handler, so the handler can trust `req.validated`. Do not re-check types inside the handler — just use the data.

## Add response validation where it matters

Use `response` schemas in `dev` mode to get free feedback that a handler returns the wrong shape. Switch specific routes to `enforce` only when you want production to reject mismatches.

## Choose the right error format

The default `plain` error is easy to parse. If your clients expect RFC 9457, set `errorFormat: "problem+json"` — see [Problem Details](/docs/validation/problem-details). For full control, supply an `errorRenderer`.

## Don't over-validate

Validate what your handler depends on. Validating fields you never read adds no value and only costs a little time.


## Related

- [Schema Definition](/docs/validation/schema)
- [Coercion](/docs/validation/coercion)
- [Model Registry](/docs/validation/models)
- [Response Validation](/docs/validation/response)
- [Validation Configuration](/docs/validation/configuration)
