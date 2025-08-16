---
sidebar_label: 'OpenAPI / Swagger'
---

# OpenAPI Specification & Swagger UI

Good API documentation is essential. BurgerAPI streamlines this by automatically generating an [OpenAPI 3.0](https://swagger.io/specification/) specification file and serving interactive [Swagger UI](https://swagger.io/tools/swagger-ui/) documentation for your API routes.

:::success Benefits
*   **Automatic Generation:** Less manual effort to keep docs in sync.
*   **Interactive UI:** Allows users (and you!) to explore and test API endpoints directly in the browser.
*   **Standard Format:** Enables using other OpenAPI-compatible tools.
:::

## Configuration

Set the basic information for your OpenAPI document in the `Burger` constructor. `title` and `version` are required for the document to be generated.

```typescript title="index.ts"
import { Burger } from 'burger-api';

const burger = new Burger({
    apiDir: 'api',
    // --- OpenAPI Metadata --- 
    title: 'Widget Management API',    // Required: Your API title
    version: 'v1.0.2',                 // Required: Your API version
    description: 'API for creating, reading, updating, and deleting widgets.', // Optional
    // ... other options
});

burger.serve(4000);
```

## Enhancing Documentation with Route-Level Metadata

While BurgerAPI infers basic information, you can add rich details to specific endpoints by exporting an `openapi` object from your `route.ts` file. This object mirrors the structure of an OpenAPI [Path Item Object](https://swagger.io/specification/#path-item-object).

```typescript title="api/products/[id]/route.ts"
import { z } from 'zod';
import type { BurgerRequest } from 'burger-api';

// Schema for validating the response (and potentially request body for PUT)
export const schema = {
  get: {
    // Although response isn't validated by BurgerAPI, Zod schema helps OpenAPI
    response: z.object({ 
      id: z.string(), 
      name: z.string(), 
      price: z.number() 
    }), 
  },
  // ... schema for put?.body, etc. 
};

// Define detailed OpenAPI metadata for this specific path
export const openapi = {
  // Common parameters for all methods on this path (/products/{id})
  parameters: [
    {
      name: 'id',
      in: 'path', // Parameter is in the URL path
      required: true,
      description: 'The unique ID of the product.',
      schema: { type: 'string' },
    },
  ],
  // Metadata specific to the GET method
  get: {
    summary: 'Get a specific product by ID',
    description: 'Retrieves the details of a single product.',
    tags: ['Products'],
    operationId: 'getProductById',
    responses: {
      '200': {
        description: 'Product details returned successfully',
        content: {
          // BurgerAPI infers this from schema.get.response if available
          'application/json': { schema: { $ref: '#/components/schemas/Product' } } 
        }
      },
      '404': { description: 'Product not found' },
    },
  },
  // Metadata specific to the PUT method (Example)
  put: {
    summary: 'Update a product',
    tags: ['Products'],
    operationId: 'updateProduct',
    requestBody: { /* ... define request body ... */ },
    responses: { /* ... define responses ... */ },
  },
};

// GET handler function
export async function GET(req: BurgerRequest) {
  const id = req.params?.id;
  // ... fetch product logic using id ...
  const product = { id, name: 'Fetched Product', price: 42.0 }; // Example data
  return Response.json(product);
}

// Define a PUT handler as well...
// export async function PUT(req: BurgerRequest) { ... }
```

**Key Points for `openapi` Export:**

*   **Structure:** Mirrors OpenAPI specification (Path Item -> Operation Objects).
*   **Top-Level:** Define elements common to all methods on that path (like `parameters` for path params).
*   **Method-Level:** Define details specific to `get`, `post`, `put`, etc. (e.g., `summary`, `tags`, `requestBody`, `responses`).
*   **Schema Inference:** BurgerAPI intelligently uses your exported Zod `schema` to automatically generate schemas for `requestBody` and `responses` in the OpenAPI spec where possible, significantly reducing boilerplate!

:::info Zod 4.x Support
BurgerAPI v0.3.0+ uses Zod 4.x for enhanced schema validation and improved OpenAPI generation. The new Zod version provides better performance and more accurate schema inference for your API documentation.
:::

You can still define them explicitly within the `openapi` object if needed for more complex cases or examples.

## Accessing Your Documentation

Once your server is running, BurgerAPI automatically serves:

*   `/openapi.json`: The raw OpenAPI 3.0 specification file.
*   `/docs`: The user-friendly, interactive Swagger UI page.

:::tip Tip
Bookmark the `/docs` endpoint! It's a great way to visualize, test, and share your API.
::: 