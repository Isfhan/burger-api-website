---
sidebar_label: "Static Pages"
---

# File-Based Static Pages

BurgerAPI can also serve HTML pages. Pages use the same folder rules as API routes.

## Setup

Set `pageDir` in the `Burger` constructor:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
  pageDir: "./src/pages",
  pagePrefix: "", // optional, no prefix by default
});

burger.serve(4000);
```

## How files map to URLs

- `src/pages/index.html` or `index.tsx` → `/`
- `src/pages/about.html` → `/about`
- `src/pages/products/index.html` → `/products`
- `src/pages/(marketing)/contact.html` → `/contact` (groups are not in the URL)
- `src/pages/posts/[slug].tsx` → `/posts/:slug`

Two dynamic page files at the same level (`[a].tsx` and `[b].tsx`) fail at startup.

## HTML files

A `.html` file is served as-is.

```html title="src/pages/about.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>About Us</title>
  </head>
  <body>
    <h1>About</h1>
  </body>
</html>
```

## Dynamic pages (`.tsx`)

A `.tsx` page is a handler function, not React rendering. Its default export gets a `BurgerContext` and must return a `Response`. Returning JSX does not render anything.

```tsx title="src/pages/posts/[slug].tsx"
import type { BurgerContext } from "burger-api";

export default async function GET(ctx: BurgerContext): Promise<Response> {
  const slug = ctx.params.slug;
  return new Response(
    `<!doctype html><html><body><h1>Post: ${slug}</h1></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
```

## Good to know

- Pages answer `GET` and `HEAD` only. Other methods get `405`.
- Global and plugin hooks (`onRequest`, `afterRoute`, `mapResponse`) run for pages too, so CORS and security headers apply.
- Dynamic `[param]` pages work only with `serve()` on Bun. With `toFetchHandler` (Node, Cloudflare, Deno, Vercel), the app logs a warning listing the pages it cannot serve.

## Related

- [File-Based Routing](/docs/routing/file-based-routing)
- [Static API Routes](/docs/routing/api/static-routes)
- [Dynamic Routes](/docs/routing/api/dynamic-routes)
