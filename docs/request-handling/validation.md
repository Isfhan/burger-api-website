---
sidebar_label: "Schema Validation"
---

# Schema Validation with Zod

Ensuring the data coming into your API is correct is crucial. BurgerAPI simplifies this with built-in request validation powered by the popular [Zod](https://zod.dev/) library.

Define schemas for your route's expected query parameters or request body, and BurgerAPI handles the validation _before_ your handler code even runs.

## Defining Schemas

Enable validation by exporting a `schema` object from your `route.ts` file.

- Import `z` from `zod`.
- The `schema` object structure: `{[httpMethod]: { query?: ZodSchema, body?: ZodSchema }}`.
  - Keys are **lowercase** HTTP methods (`get`, `post`, etc.).
  - Define `query` for query parameter validation.
  - Define `body` for request body validation (typically for `POST`, `PUT`, `PATCH`).

```typescript title="api/products/route.ts"
import { z } from "zod";
import type { BurgerRequest, Middleware } from "burger-api";

// Define Zod schemas for GET query params and POST body
export const schema = {
  get: {
    query: z
      .object({
        search: z.string().optional(),
        limit: z.coerce.number().int().positive().optional().default(10),
        sortBy: z.enum(["price", "name"]).optional().default("name"),
      })
      .strict(), // Disallow extra query parameters
  },
  post: {
    body: z
      .object({
        name: z.string().min(1, "Product name is required"),
        price: z.number().positive("Price must be a positive number"),
        tags: z.array(z.string()).nonempty().optional(), // Optional, but if present, must not be empty
      })
      .strict(), // Disallow extra fields in the body
  },
};

// Optional route-specific middleware
export const middleware: Middleware[] = [
  (req) => {
    console.log("Product route middleware executed");
    return undefined;
  },
];

// --- Route Handlers ---

// GET handler with typed, validated query parameters
export async function GET(
  req: BurgerRequest<{ query: z.infer<typeof schema.get.query> }>
) {
  // Access validated data via req.validated
  const { search, limit, sortBy } = req.validated?.query ?? {}; // Use default values if validation somehow skipped (shouldn't happen)

  console.log(
    `Fetching products: search=${search}, limit=${limit}, sort=${sortBy}`
  );

  // ... fetch products based on validated params ...

  return Response.json({
    message: "Products fetched successfully",
    params: { search, limit, sortBy },
  });
}

// POST handler with typed, validated body
export async function POST(
  req: BurgerRequest<{ body: z.infer<typeof schema.post.body> }>
) {
  // Access validated data via req.validated
  const productData = req.validated?.body;

  // Type safety! productData has { name: string; price: number; tags?: string[] | undefined }
  console.log("Creating product:", productData?.name, productData?.price);

  // ... create product in database ...

  return Response.json({ message: "Product created", data: productData });
}
```

## Accessing Validated Data

:::tip Automatic & Typed Data
When validation passes:

- BurgerAPI automatically attaches the validated data to `req.validated`.
- Use `req.validated.query` for validated query parameters.
- Use `req.validated.body` for the validated request body.
- Leverage `z.infer<typeof schema.xxx.yyy>` in your handler's type signature (`BurgerRequest<...>`) to get **full TypeScript type safety and autocompletion** on the `req.validated` object!
  :::

## Automatic Error Handling

:::danger Validation Errors Handled!
You generally **don't need** to manually check for validation errors in your route handler.

If the incoming request doesn't match the Zod schema you defined, BurgerAPI automatically:

1.  Stops processing the request (doesn't call your handler).
2.  Sends a `400 Bad Request` response.
3.  Includes a JSON body detailing the validation errors reported by Zod.

This provides clear feedback to the API consumer about what went wrong.
:::

## Middleware Interaction

It's important to know where validation fits in the request lifecycle:

1.  Global Middleware runs.
2.  **Validation Middleware runs (if `schema` is exported).**
3.  Route-Specific Middleware runs.
4.  Route Handler runs.

This means your route-specific middleware and handler can rely on the data having already been validated if a schema is defined. See the [Middleware Guide](./middleware.md) for more details.
