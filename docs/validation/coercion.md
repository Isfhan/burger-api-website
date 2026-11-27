---
sidebar_label: Coercion
---

# Coercion (Automatic Type Conversion)

Query strings, path params, headers and cookies always arrive as text. `?n=42` gives you the string `"42"`, so `z.number()` would reject it.

Coercion converts the text for you: `"42"` becomes `42`, `"true"` becomes `true`, and `"2026-01-01"` becomes a `Date`. It is off by default.

## Turn it on

For the whole app:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
  validation: { coerce: true },
});
```

For one method:

```typescript title="api/stats/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({ n: z.number(), b: z.boolean() }),
  coerce: true,
};
```

For every method in one `schema.ts`:

```typescript title="api/stats/schema.ts"
export const coerce = true;

export const GET = { query: z.object({ n: z.number() }) };
```

Now `?n=42&b=true` gives `ctx.validated.query` the value `{ n: 42, b: true }`.

## What gets converted

| Schema field | Converts to |
|--------------|-------------|
| `z.number()` | number |
| `z.boolean()` | boolean (`"true"`/`"1"` and `"false"`/`"0"`) |
| `z.date()` | `Date` |
| `z.array(z.number())` | array of numbers |

## Good to know

- Coercion works on `query`, `params`, `headers` and `cookies`. It does not touch the JSON body.
- It works with Zod schemas. For other schema libraries, use that library's own conversion.
- A value that cannot be converted fails validation with `422`.
- You can still use Zod's `z.coerce.number()` on a single field.

## Related

- [Zod Validation](/docs/validation/zod)
- [Query Validation](/docs/validation/query)
- [Validation Configuration](/docs/validation/configuration)
- [Validation Best Practices](/docs/validation/best-practices)
