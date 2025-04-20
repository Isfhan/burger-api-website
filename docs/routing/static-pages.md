---
sidebar_label: "Static Pages"
---

# File-Based Static Pages

Beyond APIs, BurgerAPI can serve static HTML files by leveraging the same intuitive file-based routing conventions.

## Configuration

To enable this feature, simply tell BurgerAPI where your page files live using the `pageDir` option in the `Burger` constructor:

```typescript title="index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "api", // Don't forget your API directory!
  pageDir: "pages", // Directory containing page files (e.g., ./pages)
  pagePrefix: "", // Optional: Prefix for page URLs (defaults to none)
  // ... other options
});

burger.serve(4000);
```

## Defining Pages

Organize your page files within the `pageDir` directory:

- **Directory Structure = URL Path:** Just like API routes, the folder structure maps directly to the URL path (relative to any `pagePrefix`).
- **Supported Files:** BurgerAPI looks for `.html` files.
- **URL Mapping Examples:**
  - `pages/index.html` or `pages/index.tsx` → `/`
  - `pages/about.html` → `/about`
  - `pages/user/profile.html` → `/user/profile`
  - `pages/products/index.html` → `/products`
- **Grouping Folders (`(folder)`)**: Use parentheses to organize files without affecting the URL (e.g., `pages/(marketing)/contact.html` → `/contact`).
- **Dynamic Segments (`[param]`)**: Capture URL segments using square brackets (e.g., `pages/posts/[slug].html`).

## Plain HTML Files (`.html`)

Good old `.html` files require no special handling. BurgerAPI serves them directly as static assets.

```html title="pages/about.html"
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
