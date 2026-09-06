---
sidebar_label: "Todo List API"
sidebar_position: 3
sidebar: tutorialsSidebar
---

# Tutorial 2: Todo List API

In this tutorial, you'll build a complete CRUD (Create, Read, Update, Delete) API for managing a todo list. This introduces more advanced concepts like request validation, dynamic routes, and error handling.

## What You'll Build

A todo list API with the following endpoints:
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## What You'll Learn

- Multiple HTTP methods (GET, POST, PUT, DELETE)
- Dynamic routes with parameters
- Zod schema validation
- Error handling and status codes
- In-memory data storage
- Request body parsing

## Prerequisites

Complete the [Hello World API](./hello-world.md) tutorial first. You should understand:
- Basic BurgerAPI setup
- File-based routing
- Creating route handlers

## Step 1: Set Up Your Project

You can either continue from the [Hello World API](./hello-world.md) tutorial or create a fresh project using the CLI:

```bash
# Option A: Continue from Hello World
# (reuse the same project and add todos on top)

# Option B: Create a new project
burger-api create todo-api
cd todo-api

# Install Zod for validation if it's not already present
bun add zod
```

If you used `burger-api create`, it already wired up a basic `Burger` instance and a `burger.build.ts`. We will customize the server entry a bit for this tutorial.

For more about these options, see [Configuration](../core/configuration.md) and [CLI Tool](../getting-started/cli.md).

## Step 2: Configure Your Server

Update or create your `src/index.ts` file:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
  title: "Todo List API",
  version: "1.0.0",
  description: "A CRUD API for managing todos",
});

burger.serve(4000, () => {
  console.log("Todo API running at http://localhost:4000");
  console.log("API docs at http://localhost:4000/docs");
});
```

## Step 3: Create the Todo Model

First, let's define what a todo looks like. Create a `src/types.ts` file:

```typescript title="types.ts"
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}
```

## Step 4: Set Up In-Memory Storage

Create a simple in-memory database:

```typescript title="src/database.ts"
import type { Todo } from "./types";

// In-memory storage (in a real app, you'd use a database)
let todos: Todo[] = [
  {
    id: 1,
    title: "Learn BurgerAPI",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Build a todo API",
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 3;

export const todoDatabase = {
  // Get all todos
  getAll(): Todo[] {
    return todos;
  },

  // Get a todo by ID
  getById(id: number): Todo | undefined {
    return todos.find(todo => todo.id === id);
  },

  // Create a new todo
  create(title: string, completed = false): Todo {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: nextId++,
      title,
      completed,
      createdAt: now,
      updatedAt: now,
    };
    todos.push(newTodo);
    return newTodo;
  },

  // Update a todo
  update(id: number, updates: Partial<Pick<Todo, 'title' | 'completed'>>): Todo | null {
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    Object.assign(todo, updates, {
      updatedAt: new Date().toISOString(),
    });
    return todo;
  },

  // Delete a todo
  delete(id: number): boolean {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    
    todos.splice(index, 1);
    return true;
  },
};
```

## Step 5: Create Validation Schemas

BurgerAPI validates requests against per-method schemas in a `schema.ts` file next to each route. The `POST /api/todos` schema validates the request body:

```typescript title="src/api/todos/schema.ts"
import { z } from "zod";

export const POST = {
  body: z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    completed: z.boolean().optional().default(false),
  }),
};
```

The individual-todo route validates the `id` path parameter for every method, plus the body for `PUT`:

```typescript title="src/api/todos/[id]/schema.ts"
import { z } from "zod";

const id = z.string().regex(/^\d+$/);

export const GET = { params: z.object({ id }) };

export const PUT = {
  params: z.object({ id }),
  body: z
    .object({
      title: z.string().min(1, "Title is required").max(100, "Title too long").optional(),
      completed: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, "At least one field must be provided"),
};

export const DELETE = { params: z.object({ id }) };
```

BurgerAPI validates before your handler runs. Invalid input returns `422 Unprocessable Content` in the RFC 9457 Problem Details format, so handlers only ever receive validated data. See [Zod Validation](../validation/zod.md).

## Step 6: Create the Todos Collection Route

Create the main todos endpoint:

```typescript title="src/api/todos/route.ts"
import type { BurgerContext } from "burger-api";
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";
import { todoDatabase } from "../../database";

// GET /api/todos - List all todos
export async function GET(ctx: BurgerContext) {
  const todos = todoDatabase.getAll();
  return Response.json({
    todos,
    count: todos.length,
  });
}

// POST /api/todos - Create a new todo
export const POST = defineRoute(PostSchema, (ctx) => {
  const { title, completed } = ctx.validated.body;
  const newTodo = todoDatabase.create(title, completed);

  return Response.json(newTodo, { status: 201 });
});
```

:::tip What's Happening?
- `GET` returns all todos with a count
- `POST` reads validated data from `ctx.validated.body`, typed from `schema.ts` via `defineRoute(PostSchema, handler)` — no `BurgerContext<typeof POST>` generic needed
- Validation errors return 422 automatically, so the handler contains no manual checks
- We return 201 for created resources
:::

## Step 7: Create the Individual Todo Route

Create the dynamic route for individual todos:

```typescript title="src/api/todos/[id]/route.ts"
import { defineRoute } from "burger-api";
import { GET as GetSchema, PUT as PutSchema, DELETE as DeleteSchema } from "./schema";
import { todoDatabase } from "../../../database";

// GET /api/todos/[id] - Get a specific todo
export const GET = defineRoute(GetSchema, (ctx) => {
  const todo = todoDatabase.getById(parseInt(ctx.validated.params.id, 10));

  if (!todo) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return Response.json(todo);
});

// PUT /api/todos/[id] - Update a todo
export const PUT = defineRoute(PutSchema, (ctx) => {
  const updatedTodo = todoDatabase.update(
    parseInt(ctx.validated.params.id, 10),
    ctx.validated.body
  );

  if (!updatedTodo) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return Response.json(updatedTodo);
});

// DELETE /api/todos/[id] - Delete a todo
export const DELETE = defineRoute(DeleteSchema, (ctx) => {
  const deleted = todoDatabase.delete(parseInt(ctx.validated.params.id, 10));

  if (!deleted) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return new Response(null, { status: 204 });
});
```

:::tip Understanding Dynamic Routes
The `[id]` folder creates a dynamic route parameter. When someone visits `/api/todos/123`, the value `123` becomes available as `ctx.params.id`. Because `schema.ts` declares `id` as a numeric string, `ctx.validated.params.id` is typed and validated, and a non-numeric id never reaches the handler.
:::

## Step 8: Test Your API

Start your server:

```bash
bun run dev
```

Now test all your endpoints:

### List all todos
```bash
curl http://localhost:4000/api/todos
```

### Create a new todo
```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn TypeScript", "completed": false}'
```

### Get a specific todo
```bash
curl http://localhost:4000/api/todos/1
```

### Update a todo
```bash
curl -X PUT http://localhost:4000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a todo
```bash
curl -X DELETE http://localhost:4000/api/todos/1
```

## Step 9: Explore the Documentation

Visit `http://localhost:4000/docs` to see your complete API documentation. You should see:

- All five endpoints (GET, POST, PUT, DELETE)
- Request/response schemas
- Validation rules
- Example requests and responses
- Interactive testing interface

:::info Validation in Action
Notice how the OpenAPI docs show the validation rules from your Zod schemas. BurgerAPI automatically converts Zod schemas to OpenAPI specifications!
:::

## Project Structure

Your project should now look like this:

```
todo-api/
├── src/
│   ├── index.ts                 # Server configuration
│   ├── types.ts                 # TypeScript interfaces
│   ├── database.ts              # In-memory storage
│   └── api/
│       └── todos/
│           ├── route.ts         # GET /api/todos, POST /api/todos
│           ├── schema.ts        # Validation for /api/todos
│           └── [id]/
│               ├── route.ts     # GET, PUT, DELETE /api/todos/[id]
│               └── schema.ts    # Validation for /api/todos/[id]
├── burger.build.ts
└── package.json
```

## Build for Production (Optional)

Just like with the Hello World tutorial, you can build this Todo API for production using the `burger-api` CLI:

```bash
# From the project root
burger-api build src/index.ts
```

This generates a bundle at:

- `.build/bundle/app.js`

Pass `--target=node|cloudflare|deno|vercel` to build for a different deployment platform instead of Bun — see [Deployment](../deployment/bun.md).

To create a standalone executable:

```bash
burger-api build:exec src/index.ts
```

Which produces:

- `.build/executable/<project>` (or `.exe` on Windows)

These commands build the app using BurgerAPI's production build, which discovers routes at build time so no runtime filesystem scanning is required.

For more details on build outputs and options, see:

- [CLI Tool](../getting-started/cli.md)
- [Build Command](../cli/build.md)
- [Build Executable](../cli/build-exec.md)

## Key Concepts Learned

### Dynamic Routes
- Use `[paramName]` folders to create dynamic route segments
- Access parameters via `ctx.params.paramName`

### Request Validation
- Declare per-method schemas in a route's `schema.ts` file
- Access validated data via `ctx.validated`, typed from your schema
- Invalid requests return 422 automatically, so handlers only see valid data

### HTTP Status Codes
- `200` - Success
- `201` - Created (for POST requests)
- `204` - No Content (for DELETE requests)
- `404` - Not Found
- `422` - Unprocessable Content (validation errors, RFC 9457)

### Error Handling
- Validate input with schemas instead of manual checks
- Return consistent error response format
- Include helpful error messages

## Next Steps

Excellent work! You've built a complete CRUD API with validation. You now understand:

- ✅ Multiple HTTP methods
- ✅ Dynamic routes and parameters
- ✅ Request validation with Zod
- ✅ Error handling and status codes
- ✅ Data storage patterns

Ready for something even more complex? In the next tutorial, you'll build a [Blog API](./blog-api.md) with multiple related resources, hooks, plugins, and advanced features!

## Troubleshooting

**"422 Unprocessable Content" errors**
- Check that your request body matches the Zod schema in `schema.ts`
- Make sure you're sending `Content-Type: application/json` header
- For path params, make sure the URL segment matches the schema (for example a numeric `id`)

**"Todo not found" errors**
- Verify the todo ID exists by checking `GET /api/todos` first
- Make sure you're using a valid number for the ID

**TypeScript errors**
- Ensure all imports are correct
- Check that your types match between files

**Route not found**
- Make sure your folder structure matches the expected pattern
- Verify file names are exactly `route.ts`
