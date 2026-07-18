---
sidebar_label: Standard Schema Support
---

# Standard Schema Support

BurgerAPI is not locked to Zod. Any schema library that follows the [Standard Schema](https://standardschema.dev/) contract works through the same `schema` export — no extra setup, no new dependency.

Libraries that implement Standard Schema include [Valibot](https://valibot.dev/), [ArkType](https://arktype.io/), and Zod v4 itself.

## Example with a Standard Schema library

```typescript
import { object, string, number } from "valibot"; // or any ~standard library
import type { BurgerRequest } from "burger-api";

export const schema = {
  post: {
    body: object({
      name: string(),
      price: number(),
    }),
  },
};

export function POST(req: BurgerRequest) {
  const { name, price } = req.validated.body;
  return Response.json({ name, price });
}
```

## How detection works

When a route is prepared, BurgerAPI picks the right connector for each schema:

1. **Zod** is recognized first (it is the default provider).
2. Any other library that exposes the Standard Schema contract (`~standard.validate`) is used automatically.
3. If a schema is neither Zod nor a Standard Schema, BurgerAPI reports the error when the app starts.

Both Zod and a Standard Schema library can be used in the same app, even on different routes.

## Rules

- The Standard Schema validator must be **synchronous** for request validation. An async validator causes an error at startup.
- Zod remains the recommended default because it is what BurgerAPI documents and the examples use.


## Related

- [Zod Validation](/docs/validation/zod)
- [Schema Definition](/docs/validation/schema)
- [Validation Types](/docs/api/validation-types)
