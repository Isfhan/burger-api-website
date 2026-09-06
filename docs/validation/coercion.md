---
sidebar_label: Coercion
---

# Coercion (Automatic Type Conversion)

Query strings, path parameters, headers, and cookies always arrive as **text**. A query string like `?n=42` gives you the string `"42"`, not the number `42`. That means a strict Zod schema such as `z.object({ n: z.number() })` would reject it.

**Coercion** (automatic type conversion) fixes this: BurgerAPI turns text into the right type for you, so `"42"` becomes `42`, `"true"` becomes `true`, and `"2026-01-01"` becomes a `Date`.

## Turn it on

Coercion is **opt-in and off by default**, so existing apps keep their exact behavior. Enable it for the whole app:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "./src/api",
  validation: { coerce: true },
});
```

Or just for one route, with the `coerce` flag on that method's schema:

```typescript title="api/stats/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({ n: z.number(), b: z.boolean() }),
  coerce: true,
};
```

Now `?n=42&b=true` validates cleanly and `ctx.validated.query` holds `{ n: 42, b: true }` (real number and boolean).

## What gets converted

| Schema field | Converts to |
|--------------|-------------|
| `z.number()` | number |
| `z.boolean()` | boolean (`"true"` → `true`, `"false"` → `false`) |
| `z.date()` | `Date` |

Coercion applies to `query`, `params`, `headers`, and `cookies`, but not to the request `body` (JSON bodies are already typed).

## Safe by design

- A value that cannot be converted fails the validation normally. It never becomes `NaN` or silently corrupts your data.
- When coercion is off, nothing changes: `"42"` stays `"42"` and strict schemas behave exactly as before.
- You can still use Zod's own `z.coerce.number()` if you prefer per-field control; the framework `coerce: true` is a simpler, app-wide switch.


## Related

- [Zod Validation](/docs/validation/zod)
- [Query Validation](/docs/validation/query)
- [Validation Configuration](/docs/validation/configuration)
- [Validation Best Practices](/docs/validation/best-practices)
