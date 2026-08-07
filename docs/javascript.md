---
sidebar_label: JavaScript
sidebar_position: 3
---

# JavaScript

JavaScript is a first-class citizen in BurgerAPI. Every convention works the
same in `.js` and `.mjs` as it does in `.ts`: `route.*`, `schema.*`,
`hooks.*`, `openapi.*`, `config.*`, plus the app-level convention files
(`hooks.js`, `plugins.js`, `providers.js`, `openapi.config.js`). TypeScript
remains the default, but you can scaffold a fully typed JavaScript project
with one flag.

## Scaffold a JavaScript project

```bash
burger-api create my-api --lang js
```

This creates the same project as `--lang ts`, with one difference: instead of
`tsconfig.json` you get a `jsconfig.json` that enables type-checking of JSDoc
annotations:

```json
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "checkJs": true,
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

With `checkJs` on, your editor type-checks your JSDoc against the shipped `burger-api` type declarations, so you get full IntelliSense without writing a single type annotation in a `.ts` file.

## Route files

Route files use the same uppercase handler exports as TypeScript:

```js
// src/api/hello/route.js
/**
 * Say hello.
 * @param {import('burger-api').BurgerContext} ctx
 * @returns {Promise<Response>}
 */
export async function GET(ctx) {
  const name = ctx.query.name ?? "world";
  return Response.json({ message: `Hello, ${name}!` });
}
```

`.mjs` files work identically. A route directory must not contain both
`route.js` and `route.ts`: the scanner fails loudly on mixed files.

## JSDoc types

Because JavaScript has no `import type`, you reference framework types
through JSDoc import types:

- `@param {import('burger-api').BurgerContext} ctx` for handlers and hooks.
- `@type {import('burger-api').Hook}` or `@type {import('burger-api').Plugin}`
  for hook factories and plugins.
- `@returns {Promise<Response>}` keeps handlers explicitly typed.

There is no runtime cost: JSDoc types are comments and are erased by Bun.

## A full JSDoc route example

A complete route directory, in JavaScript with JSDoc types:

```js
// src/api/products/route.js
import { NotFoundError } from "burger-api";

/**
 * List products.
 * @param {import('burger-api').BurgerContext} ctx
 * @returns {Promise<Response>}
 */
export async function GET(ctx) {
  return Response.json({ products: [] });
}

/**
 * Create a product.
 * @param {import('burger-api').BurgerContext} ctx
 * @returns {Promise<Response>}
 */
export async function POST(ctx) {
  const body = await ctx.json();
  return Response.json({ created: body }, { status: 201 });
}

/**
 * Get one product.
 * @param {import('burger-api').BurgerContext} ctx
 * @returns {Promise<Response>}
 */
export async function PATCH(ctx) {
  throw new NotFoundError("Product not found");
}
```

```js
// src/api/products/schema.js
import { z } from "zod";

/** @type {{ body: import('zod').ZodObject<{ name: import('zod').ZodString }> }} */
export const POST = {
  body: z.object({ name: z.string() }),
};
```

```js
// src/api/products/hooks.js
/**
 * Route hooks: require a valid authorization header before the handler runs.
 * @type {import('burger-api').Hook[]}
 */
export const beforeRoute = [
  (ctx) => {
    if (!ctx.headers.get("authorization")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  },
];
```

```js
// src/api/products/openapi.js
/** @type {import('burger-api').openapi} */
export const GET = { summary: "List products", tags: ["products"] };
```

## Generating routes in a JavaScript project

`burger-api generate` detects your project language: a `jsconfig.json` in the
project root marks a JavaScript project, so generated files use `.js`
extensions automatically.

```bash
burger-api generate route users        # creates route.js, schema.js, ...
burger-api generate route users --lang js   # force JavaScript
```

Hooks and plugins generation follows the same rule.

## Related

- [Key Concepts](/docs/key-concepts)
- [Hooks](/docs/hooks/system)
