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

Start with a fresh BurgerAPI project or continue from the Hello World tutorial:

```bash
# If starting fresh
mkdir todo-api
cd todo-api
bun init
bun add burger-api zod
```

Add Zod for request validation:

```bash
bun add zod
```

## Step 2: Configure Your Server

Create your `index.ts` file:

```typescript title="index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "api",
  title: "Todo List API",
  version: "1.0.0",
  description: "A CRUD API for managing todos",
  debug: true,
});

burger.serve(4000, () => {
  console.log("🚀 Todo API running at http://localhost:4000");
  console.log("📚 API docs at http://localhost:4000/docs");
});
```

## Step 3: Create the Todo Model

First, let's define what a todo looks like. Create a `types.ts` file:

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

```typescript title="database.ts"
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

Create validation schemas using Zod:

```typescript title="schemas.ts"
import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  completed: z.boolean().optional().default(false),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long").optional(),
  completed: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  "At least one field must be provided"
);
```

## Step 6: Create the Todos Collection Route

Create the main todos endpoint:

```typescript title="api/todos/route.ts"
import type { BurgerRequest } from "burger-api";
import { todoDatabase } from "../../database";
import { createTodoSchema } from "../../schemas";

// GET /api/todos - List all todos
export function GET(req: BurgerRequest) {
  const todos = todoDatabase.getAll();
  return Response.json({
    todos,
    count: todos.length,
  });
}

// POST /api/todos - Create a new todo
export async function POST(req: BurgerRequest) {
  try {
    const body = await req.json();
    
    // Validate the request body
    const validationResult = createTodoSchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const { title, completed } = validationResult.data;
    const newTodo = todoDatabase.create(title, completed);

    return Response.json(newTodo, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
```

:::tip What's Happening?
- `GET` returns all todos with a count
- `POST` validates the request body using Zod
- We return appropriate HTTP status codes (201 for created, 400 for errors)
- Error responses include helpful details
:::

## Step 7: Create the Individual Todo Route

Create the dynamic route for individual todos:

```typescript title="api/todos/[id]/route.ts"
import type { BurgerRequest } from "burger-api";
import { todoDatabase } from "../../../database";
import { updateTodoSchema } from "../../../schemas";

// GET /api/todos/[id] - Get a specific todo
export function GET(req: BurgerRequest) {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return Response.json(
      { error: "Invalid todo ID" },
      { status: 400 }
    );
  }

  const todo = todoDatabase.getById(id);
  
  if (!todo) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return Response.json(todo);
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(req: BurgerRequest) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid todo ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    
    // Validate the request body
    const validationResult = updateTodoSchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const updatedTodo = todoDatabase.update(id, validationResult.data);
    
    if (!updatedTodo) {
      return Response.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    return Response.json(updatedTodo);
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export function DELETE(req: BurgerRequest) {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return Response.json(
      { error: "Invalid todo ID" },
      { status: 400 }
    );
  }

  const deleted = todoDatabase.delete(id);
  
  if (!deleted) {
    return Response.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  return new Response(null, { status: 204 });
}
```

:::tip Understanding Dynamic Routes
The `[id]` folder creates a dynamic route parameter. When someone visits `/api/todos/123`, the value `123` becomes available as `req.params.id`.
:::

## Step 8: Test Your API

Start your server:

```bash
bun run index.ts
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
├── api/
│   └── todos/
│       ├── route.ts          # GET /api/todos, POST /api/todos
│       └── [id]/
│           └── route.ts      # GET, PUT, DELETE /api/todos/[id]
├── database.ts              # In-memory storage
├── schemas.ts               # Zod validation schemas
├── types.ts                 # TypeScript interfaces
├── index.ts                 # Server configuration
└── package.json
```

## Key Concepts Learned

### Dynamic Routes
- Use `[paramName]` folders to create dynamic route segments
- Access parameters via `req.params.paramName`

### Request Validation
- Use Zod schemas to validate incoming data
- Return helpful error messages for validation failures
- Use `safeParse()` for non-throwing validation

### HTTP Status Codes
- `200` - Success
- `201` - Created (for POST requests)
- `204` - No Content (for DELETE requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found

### Error Handling
- Always validate input data
- Return consistent error response format
- Include helpful error messages

## Next Steps

Excellent work! You've built a complete CRUD API with validation. You now understand:

- ✅ Multiple HTTP methods
- ✅ Dynamic routes and parameters
- ✅ Request validation with Zod
- ✅ Error handling and status codes
- ✅ Data storage patterns

Ready for something even more complex? In the next tutorial, you'll build a [Blog API](./blog-api.md) with multiple related resources, middleware, and advanced features!

## Troubleshooting

**"Validation failed" errors**
- Check that your request body matches the Zod schema
- Make sure you're sending `Content-Type: application/json` header

**"Todo not found" errors**
- Verify the todo ID exists by checking `GET /api/todos` first
- Make sure you're using a valid number for the ID

**TypeScript errors**
- Ensure all imports are correct
- Check that your types match between files

**Route not found**
- Make sure your folder structure matches the expected pattern
- Verify file names are exactly `route.ts`
