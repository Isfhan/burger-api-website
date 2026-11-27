---
sidebar_label: JavaScript
sidebar_position: 3
---

# JavaScript

You can write a BurgerAPI app in JavaScript. Every convention file works with `.js` and `.mjs`, the same as `.ts`. You get type checking from JSDoc comments.

## Create a JavaScript project

```bash
burger-api create my-api --lang js
```

You get the same project with `.js` files. A `jsconfig.json` with `checkJs: true` makes your editor check your JSDoc types and give you autocomplete.

## Write a route

Use the same uppercase handler exports as TypeScript. Add types with JSDoc:

```js
// src/api/hello/route.js
/**
 * @param {import('burger-api').BurgerContext} ctx
 * @returns {Promise<Response>}
 */
export async function GET(ctx) {
  const name = ctx.query.name ?? "world";
  return Response.json({ message: `Hello, ${name}!` });
}
```

A route folder must not contain both `route.js` and `route.ts`. The app fails to start if it does.

## Validated data

Put the schema in `schema.js`. Use `@satisfies`, not `@type`, so `defineRoute` can infer the types of `ctx.validated`:

```js
// src/api/products/schema.js
import { z } from "zod";

/** @satisfies {import('burger-api').MethodSchema} */
export const POST = {
  body: z.object({ name: z.string() }),
};
```

```js
// src/api/products/route.js
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";

export const POST = defineRoute(PostSchema, (ctx) => {
  const { name } = ctx.validated.body;
  return Response.json({ created: { name } }, { status: 201 });
});
```

## Common JSDoc types

- `@param {import('burger-api').BurgerContext} ctx` for handlers and hooks.
- `@type {import('burger-api').Hook}` for hook functions.
- `@type {import('burger-api').Plugin}` for plugins.
- `@type {import('burger-api').OpenAPIMeta}` for entries in `openapi.js`.

## Generate files

`burger-api generate` sees `jsconfig.json` and creates `.js` files:

```bash
burger-api generate route users
```

## Related

- [Key Concepts](/docs/key-concepts)
- [Hooks](/docs/hooks/system)
