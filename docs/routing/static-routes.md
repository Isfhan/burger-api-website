---
sidebar_label: Static Routes
---

# Static Routes

Static routes match **exact URL paths** with no dynamic segments. They are the base of BurgerAPI’s file-based routing and are matched before dynamic and wildcard routes.

## Basics

- Put a **`route.ts`** file in a folder under your `apiDir`.
- The folder path (plus `apiPrefix`) becomes the URL path.
- Export **GET**, **POST**, **PUT**, **DELETE**, etc. to handle each HTTP method.

Example: `api/products/route.ts` → `GET /api/products`, `POST /api/products`.

For full documentation, examples, and HTTP method support, see [Static API Routes](/docs/routing/api/static-routes).
