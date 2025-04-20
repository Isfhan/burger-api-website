---
sidebar_label: "Configuration"
---

# Configuration

Getting your BurgerAPI server running starts with configuration. You'll import the `Burger` class and instantiate it, passing an options object.

```typescript title="index.ts"
import { Burger } from "burger-api";
import { globalLogger } from "./middleware/logger"; // Example: Assuming you have middleware defined

// Create a new Burger instance
const burger = new Burger({
  // --- Required ---
  apiDir: "api", // Specify the directory holding your API routes

  // --- Optional but Recommended ---
  title: "My Burger API", // Title for OpenAPI docs
  version: "1.0.0", // Version for OpenAPI docs

  // --- Other Optional Settings ---
  pageDir: "pages", // Directory for static pages
  globalMiddleware: [globalLogger], // Middleware applied to ALL requests
  apiPrefix: "api", // URL prefix for API routes (defaults to 'api')
  pagePrefix: "", // URL prefix for page routes (defaults to no prefix)
  description: "An amazing API built with BurgerAPI", // OpenAPI description
  debug: true, // Enable debug features/logging
});

// Start the server (defaults to port 4000)
burger.serve(4000);
```

## Key Options Explained

Let's break down the essential configuration options:

- **`apiDir`** (`string`, **Required**)
  The heart of your API. This specifies the path (usually relative to your project root) where BurgerAPI will look for your API route files (like `route.ts`).

- **`pageDir`** (`string`, Optional)
  If you plan to serve static HTML pages or use `.tsx` for server-rendered pages, specify the directory containing these files here.

- **`globalMiddleware`** (`Middleware[]`, Optional)
  An array of [middleware functions](./../request-handling/middleware.md) that will run for _every_ incoming request before any route-specific logic.

- **`apiPrefix`** (`string`, Optional, Default: `'api'`)
  Prepends a path segment to all your API routes. With the default, a route in `api/users/route.ts` becomes accessible at `/api/users`.

- **`pagePrefix`** (`string`, Optional, Default: `''`)
  Similar to `apiPrefix`, but for page routes defined in `pageDir`. By default, there is no prefix.

- **`title`**, **`description`**, **`version`** (`string`, Optional)
  Crucial metadata for generating your [OpenAPI documentation](./../api/openapi.md). It's highly recommended to set `title` and `version`.

- **`debug`** (`boolean`, Optional)
  Setting this to `true` will enable stack traces page for errors.

## Starting the Server: `serve()`

Once configured, bring your server to life with the `serve` method:

```typescript
burger.serve(port, callback);
```

- **`port`** (`number`, Optional, Default: `4000`)
  Specifies the network port the server should listen on.

- **`callback`** (`() => void`, Optional)
  A function that gets called _after_ the server has successfully started listening on the specified port. Useful for logging a confirmation message.
