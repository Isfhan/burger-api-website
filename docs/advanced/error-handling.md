---
sidebar_label: Error Handling Patterns
---

# Error Handling Patterns

- **Validation errors:** a failed request gets `422` with an RFC 9457 problem details body. See [Validation Error Handling](/docs/validation/errors).
- **Unknown routes:** get `404` with a problem details body.
- **Throw an error:** throw `NotFoundError`, `UnauthorizedError`, `ForbiddenError` or another `HTTPError`. BurgerAPI turns it into the right response. Add an `onError` hook to change how errors look.
- **Stop in a hook:** return a `Response` (for example a `401`) from `onRequest` or `beforeRoute` to stop the request.
- **Return from a handler:** `return Response.json({ error: "Not found" }, { status: 404 });`.
- **Debug details:** stack traces appear only when debug is on (`debug: true`, or `NODE_ENV=development`, which `burger-api dev` sets). See [Configuration](/docs/core/configuration).

```ts title="src/api/products/[id]/route.ts"
import { NotFoundError } from "burger-api";
import type { BurgerContext } from "burger-api";
import { products } from "../store";

export async function GET(ctx: BurgerContext) {
  const product = products.find((p) => p.id === ctx.params.id);
  if (!product) throw new NotFoundError("Product not found");
  return Response.json(product);
}
```

## Related

- [Type Safety](/docs/advanced/type-safety)
- [Deployment](/docs/advanced/deployment)
