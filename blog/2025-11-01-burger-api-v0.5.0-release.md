---
slug: burger-api-v0.5.0-release
title: BurgerAPI v0.5.0 Released
authors: [isfhan]
tags: [release, typescript, cors, middleware]
---

We're excited to announce the release of **BurgerAPI v0.5.0**! This critical update fixes TypeScript support and adds new features to make your API development experience even better.

{/* truncate */}

## 🚀 What's New in v0.5.0

### Version 0.5.0 (November 1, 2025)

- **Fixed**: TypeScript types now work perfectly with full IntelliSense
- **New Feature**: Auto-injected OPTIONS handlers for CORS preflight
- **Improved**: Better middleware response handling
- **Enhanced**: Faster builds and cleaner codebase

## 🎯 Introduction

This release focuses on developer experience improvements, particularly around TypeScript support which was a major pain point in previous versions. We've also added automatic CORS preflight handling and improved middleware reliability.

## 🔧 What Was Fixed

### TypeScript IntelliSense Now Works Perfectly

**The Problem:**  

In previous versions, when you installed burger-api and tried to use TypeScript types, you got nothing. No autocomplete, no IntelliSense, just errors. This made the developer experience frustrating.

**What's Fixed:**  

Version 0.5.0 completely resolves this issue. Types now work exactly as they should:

```typescript
import { Burger } from 'burger-api';
import type { BurgerRequest, Middleware, ServerOptions } from 'burger-api';

// ✅ Full autocomplete on options
const burger = new Burger({
  title: 'My API',  // Hover to see documentation
  apiDir: './api',  // IntelliSense shows all available options
  debug: true,
});

// ✅ Full autocomplete on request object
const middleware: Middleware = (req: BurgerRequest) => {
  req.url       // ✅ Works!
  req.method    // ✅ Works!
  req.params    // ✅ Works!
  req.validated // ✅ Works!
  return undefined;
};
```

**Benefits for You:**

- Get instant documentation while typing
- Catch errors before running your code
- Navigate to type definitions with a click
- Refactor code safely with IDE support
- Works in VSCode, Cursor, WebStorm, and all major editors



## 💡 What's New

### 1. Auto-Injected OPTIONS Handler for CORS

**What It Does:**  

BurgerAPI now automatically adds OPTIONS handlers to your routes when needed for CORS preflight requests.

**Before v0.5.0:**

```typescript
// You had to manually add OPTIONS handler
export async function POST(req: BurgerRequest) {
  return Response.json({ message: 'Created' });
}

export async function OPTIONS(req: BurgerRequest) {
  return new Response(null, { status: 204 }); // Manual boilerplate
}
```

**After v0.5.0:**

```typescript
// OPTIONS handler is automatically added!
export async function POST(req: BurgerRequest) {
  return Response.json({ message: 'Created' });
}

// That's it! No OPTIONS handler needed
```

**How It Works:**

- Detects routes with POST, PUT, DELETE, or PATCH methods
- Automatically adds a minimal OPTIONS handler returning 204 No Content
- Only adds it if you haven't defined your own OPTIONS handler
- Prevents "405 Method Not Allowed" errors during CORS preflight

**Benefits:**

- Less boilerplate code
- No more CORS preflight errors
- Cleaner route files
- Works automatically with CORS middleware

### 2. Improved Middleware Response Handling

**What Changed:**  

Middleware that returns "after" functions now runs more reliably, especially when handling errors or early returns.

**Example - CORS Middleware:**

```typescript
const corsMiddleware: Middleware = (req) => {
  // Return an "after" function to add headers
  return async (response) => {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    return new Response(response.body, {
      status: response.status,
      headers,
    });
  };
};
```

**Benefits:**

- CORS headers are now applied to ALL responses, including errors
- More predictable middleware behavior
- Better error handling in middleware chains
- After functions run in reverse order (last registered runs first)



## 🚦 Upgrade to v0.5.0

**Good news:** There are no breaking changes!

Update your project to start using the improved TypeScript support and new features:

```bash
bun install burger-api@latest
```

Your existing code will work without any modifications. You'll just get better TypeScript support and new features automatically.



## 🚀 Quick Start Example

Try BurgerAPI v0.5.0 right now:

```bash
# Install
bun add burger-api

# Create API structure
mkdir -p api/products
```

Create `api/products/route.ts`:

```typescript
import { z } from 'zod';
import type { BurgerRequest } from 'burger-api';

// Define validation schema
export const schema = {
  get: {
    query: z.object({
      search: z.string().optional(),
      page: z.string().optional(),
    }),
  },
  post: {
    body: z.object({
      name: z.string().min(1),
      price: z.number().positive(),
    }),
  },
};

// GET /api/products
export async function GET(req: BurgerRequest) {
  return Response.json({
    products: [],
    query: req.validated.query,
  });
}

// POST /api/products (OPTIONS handler auto-added!)
export async function POST(req: BurgerRequest) {
  const product = req.validated.body;
  return Response.json({ created: product }, { status: 201 });
}
```

Create `index.ts`:

```typescript
import { Burger, setDir } from 'burger-api';

const burger = new Burger({
  title: 'My Shop API',
  description: 'Products API with auto-validation',
  apiDir: setDir(__dirname, 'api'),
  version: '1.0.0',
  debug: true,
});

burger.serve(4000, () => {
  console.log('🍔 API running at http://localhost:4000');
  console.log('📚 Docs at http://localhost:4000/docs');
});
```

Run it:

```bash
bun run index.ts
```

Visit:

- API: http://localhost:4000/api/products
- Swagger Docs: http://localhost:4000/docs
- OpenAPI Spec: http://localhost:4000/openapi.json




## 💬 What Developers Are Saying

> "Finally! The TypeScript support actually works. This makes BurgerAPI a joy to use."  
> — *Early adopter feedback*

> "Auto OPTIONS handlers saved me so much boilerplate code. This is how it should be."  
> — *Community feedback*




## 🤝 Get Involved

BurgerAPI is open source and we welcome contributions!

- ⭐ [Star us on GitHub](https://github.com/isfhan/burger-api)
- 🐛 [Report issues](https://github.com/isfhan/burger-api/issues)
- 💡 [Share ideas](https://github.com/isfhan/burger-api/discussions)
- 🤝 [Contribute code](https://github.com/isfhan/burger-api/pulls)


---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*

