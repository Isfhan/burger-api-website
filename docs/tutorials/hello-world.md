---
sidebar_label: "Hello World API"
sidebar_position: 2
sidebar: tutorialsSidebar
---

# Tutorial 1: Hello World API

In this tutorial, you'll create your first BurgerAPI application - a simple "Hello World" API that demonstrates the core concepts of file-based routing and automatic documentation generation.

## What You'll Build

A single API endpoint that responds to GET requests with a friendly JSON message. You'll also see how BurgerAPI automatically generates OpenAPI documentation for your API.

## What You'll Learn

- How to set up a new BurgerAPI project
- File-based routing fundamentals
- Basic server configuration
- How to view auto-generated API documentation

## Step 1: Initialize Your Project

First, let's create a new Bun project:

```bash
# Create a new directory for your project
mkdir my-burger-api
cd my-burger-api

# Initialize a new Bun project
bun init
```

When prompted, you can accept the default options or customize as needed. This creates a basic project structure with a `package.json` file.

## Step 2: Install BurgerAPI

Add BurgerAPI to your project dependencies:

```bash
bun add burger-api
```

This installs the BurgerAPI framework and adds it to your `package.json`.

## Step 3: Configure Your Server

Create an `index.ts` file in your project root:

```typescript title="index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "api",           // Directory where API routes live
  title: "Hello World API", // Title for OpenAPI docs
  version: "1.0.0",        // Version for OpenAPI docs
  description: "My first BurgerAPI application",
  debug: true,             // Enable debug mode for development
});

// Start the server on port 4000
burger.serve(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
  console.log("📚 API docs available at http://localhost:4000/docs");
});
```

:::tip What's Happening?
- `apiDir: "api"` tells BurgerAPI to look for route files in the `api` directory
- `debug: true` enables helpful error messages during development
- The callback function runs after the server starts successfully
:::

## Step 4: Create Your First API Route

Create an `api` directory in your project:

```bash
mkdir api
```

Now create your first route file:

```typescript title="api/hello/route.ts"
import type { BurgerRequest } from "burger-api";

export function GET(req: BurgerRequest) {
  return Response.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
    framework: "BurgerAPI",
  });
}
```

:::tip Understanding File-Based Routing
The file `api/hello/route.ts` creates an endpoint at `/api/hello`. The folder structure directly maps to the URL path!
:::

## Step 5: Run Your Server

Start your BurgerAPI server:

```bash
bun run index.ts
```

You should see output like:
```
🚀 Server running at http://localhost:4000
📚 API docs available at http://localhost:4000/docs
```

## Step 6: Test Your API

Open your browser or use a tool like curl to test your endpoint:

**In your browser:**
Visit `http://localhost:4000/api/hello`

**Using curl:**
```bash
curl http://localhost:4000/api/hello
```

You should see a response like:
```json
{
  "message": "Hello, World!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "framework": "BurgerAPI"
}
```

## Step 7: Explore Auto-Generated Documentation

One of BurgerAPI's best features is automatic OpenAPI documentation generation. Visit:

`http://localhost:4000/docs`

You'll see an interactive Swagger UI showing your API endpoint with:
- Available HTTP methods
- Response schema
- Example responses
- Try-it-out functionality

:::info Why This Matters
BurgerAPI automatically generates this documentation from your code. As you add more endpoints and validation schemas, the documentation updates automatically!
:::

## Understanding the Code

Let's break down what we just built:

### Server Configuration (`index.ts`)
```typescript
const burger = new Burger({
  apiDir: "api",           // Look for routes in ./api/
  title: "Hello World API", // Used in OpenAPI docs
  version: "1.0.0",        // API version
  debug: true,             // Development mode
});
```

### Route Handler (`api/hello/route.ts`)
```typescript
export function GET(req: BurgerRequest) {
  // Export functions named after HTTP methods
  return Response.json({   // Return a standard Response object
    message: "Hello, World!",
    // ... more data
  });
}
```

:::tip Key Concepts
- **File-based routing**: Folder structure = URL structure
- **HTTP method exports**: Export functions named `GET`, `POST`, etc.
- **Standard Response objects**: Return `Response.json()` or `new Response()`
- **TypeScript support**: Use `BurgerRequest` type for request objects
:::

## Project Structure

Your project should now look like this:

```
my-burger-api/
├── api/
│   └── hello/
│       └── route.ts
├── index.ts
├── package.json
└── bun.lockb
```

## Next Steps

Congratulations! You've built your first BurgerAPI application. You now understand:

- ✅ How to set up a BurgerAPI project
- ✅ File-based routing basics
- ✅ Creating API endpoints
- ✅ Viewing auto-generated documentation

Ready for something more challenging? In the next tutorial, you'll build a [Todo List API](./todo-api.md) with full CRUD operations and request validation!

## Troubleshooting

**"Cannot find module 'burger-api'"**
- Make sure you ran `bun add burger-api` in your project directory

**"Port 4000 is already in use"**
- Change the port: `burger.serve(3000)` instead of `burger.serve(4000)`

**"Cannot GET /api/hello"**
- Make sure your file is named exactly `route.ts` (not `hello.ts`)
- Check that the `api` directory exists
- Restart your server after making changes

**TypeScript errors**
- Make sure you're importing the type correctly: `import type { BurgerRequest }`
