---
sidebar_label: Migrating to Validation 2.0
---

# Migrating to Validation 2.0

Validation 2.0 was additive for existing Zod apps. Note that v0.14.0 is a pre-1.0 architecture reset and does **not** promise backward compatibility. If you are moving to v0.14.0, treat it as a new setup rather than an in-place upgrade.

## Existing Zod apps: no changes needed

Routes that export a `schema` with `params`, `query`, or `body` behave exactly as before. The `400` error and `req.validated` contract are unchanged.

## `z.coerce` still works

If you currently use `z.coerce.number()` on individual fields, that continues to work. Validation 2.0 adds a simpler, app-wide switch: `validation: { coerce: true }` (see [Coercion](/docs/validation/coercion)). You can adopt it gradually — the two approaches can even coexist.

```typescript
// Before: per-field
query: z.object({ limit: z.coerce.number() })

// Now: app-wide (set once in config)
// burger.config.ts → validation: { coerce: true }
query: z.object({ limit: z.number() })
```

## New slots are optional

`headers`, `cookie`, and `response` are new. Adding them to a route is the only thing that activates them. Routes that don't use them are untouched.

## Response validation defaults to safe

If you declare a `response` schema, the default mode is `dev` — it observes and logs mismatches but never changes your response. Your app will not break. Switch to `enforce` only when you want production to reject mismatches (see [Response Validation](/docs/validation/response)).

## Standard Schema (optional)

You can keep using Zod, or move some schemas to any Standard Schema library. Both work through the same `schema` export (see [Standard Schema Support](/docs/validation/standard-schema)). No migration is required.

## Checklist

- [ ] Keep your existing `schema` exports as-is.
- [ ] (Optional) Enable `coerce: true` and drop `z.coerce.*`.
- [ ] (Optional) Register shared shapes as `models` and reference them by name.
- [ ] (Optional) Add `headers`/`cookie`/`response` schemas where useful.
- [ ] (Optional) Set `errorFormat: "problem+json"` if your clients expect it.


## Related

- [Validation Configuration](/docs/validation/configuration)
- [Coercion](/docs/validation/coercion)
- [Model Registry](/docs/validation/models)
- [Response Validation](/docs/validation/response)
- [Standard Schema Support](/docs/validation/standard-schema)
