---
sidebar_label: "Static Pages"
---

# File-Based Static Pages

Beyond APIs, BurgerAPI can serve static HTML files by leveraging the same intuitive file-based routing conventions.

## Configuration

To enable this feature, simply tell BurgerAPI where your page files live using the `pageDir` option in the `Burger` constructor:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",          // Don't forget your API directory!
  pageDir: "./src/pages",       // Directory containing page files
  pagePrefix: "",               // Optional: Prefix for page URLs (defaults to none)
  // ... other options
});

burger.serve(4000);
```

## Defining Pages

Organize your page files within the `pageDir` directory:

- **Directory Structure = URL Path:** Just like API routes, the folder structure maps directly to the URL path (relative to any `pagePrefix`).
- **Supported Files:** BurgerAPI looks for `.html` files (served as static assets) and `.tsx` files (plain handler functions, see below).
- **URL Mapping Examples:**
  - `src/pages/index.html` or `src/pages/index.tsx` → `/`
  - `src/pages/about.html` → `/about`
  - `src/pages/user/profile.html` → `/user/profile`
  - `src/pages/products/index.html` → `/products`
- **Grouping Folders (`(folder)`)**: Use parentheses to organize files without affecting the URL (e.g., `src/pages/(marketing)/contact.html` → `/contact`).
- **Dynamic Segments (`[param]`)**: Capture URL segments using square brackets (e.g., `src/pages/posts/[slug].html`).

## Plain HTML Files (`.html`)

Good old `.html` files require no special handling. BurgerAPI serves them directly as static assets.

```html title="src/pages/about.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>About Us</title>
    <link rel="stylesheet" href="/assets/style.css" />
    {/* Example asset link */}
  </head>
  <body>
    <h1>About BurgerAPI</h1>
    <p>Serving tasty web frameworks built on Bun!</p>
  </body>
</html>
```

## Dynamic Pages (`.tsx`)

A `.tsx` page is **not** React/JSX server-side rendering. It's a plain handler
function, exactly like an API route's `GET` handler, that returns a `Response`
directly. Use it when a page needs to compute its HTML from a route param,
a service, or anything else that a static `.html` file can't express.

```tsx title="src/pages/posts/[slug].tsx"
import type { BurgerContext } from "burger-api";

export default async function GET(ctx: BurgerContext): Promise<Response> {
  const slug = (ctx.params as Record<string, string>)?.slug ?? "unknown";
  return new Response(
    `<!doctype html><html><body><h1>Post: ${slug}</h1></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
```

The default export receives the same `BurgerContext` an API route handler
does (`ctx.params`, `ctx.services`, etc.) and must return a `Response`;
returning a JSX element instead will not render anything. If you want actual
JSX templating, build the HTML string yourself (e.g. with a template
function or a JSX-to-string helper) and pass it to `new Response(...)`; there
is no built-in SSR renderer in 1.0.

## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
