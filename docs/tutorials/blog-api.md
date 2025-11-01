---
sidebar_label: "Blog API"
sidebar_position: 4
sidebar: tutorialsSidebar
---

# Tutorial 3: Blog API

In this final tutorial, you'll build a sophisticated blog API with multiple related resources (posts and comments), middleware, nested routes, and advanced features. This demonstrates how to structure larger BurgerAPI applications.

## What You'll Build

A blog API with the following features:
- **Posts**: Create, read, update, delete blog posts
- **Comments**: Add comments to posts with nested routing
- **Middleware**: Global logging and route-specific authentication
- **Filtering**: Search and pagination for posts
- **Relationships**: Comments belong to posts

## What You'll Learn

- Multiple related resources
- Nested routing (`/api/posts/[id]/comments`)
- Global and route-specific middleware
- Project organization for larger applications
- Advanced filtering and pagination
- Authentication middleware patterns

## Prerequisites

Complete the [Todo List API](./todo-api.md) tutorial first. You should understand:
- CRUD operations
- Dynamic routes
- Zod validation
- Error handling

## Step 1: Set Up Your Project

Create a new project for the blog API:

```bash
mkdir blog-api
cd blog-api
bun init
bun add burger-api zod
```

## Step 2: Configure Your Server

Set up your main server file:

```typescript title="index.ts"
import { Burger } from "burger-api";
import { loggerMiddleware } from "./middleware/logger";

const burger = new Burger({
  apiDir: "api",
  title: "Blog API",
  version: "1.0.0",
  description: "A blog API with posts and comments",
  globalMiddleware: [loggerMiddleware], // Global middleware
  debug: true,
});

burger.serve(4000, () => {
  console.log("🚀 Blog API running at http://localhost:4000");
  console.log("📚 API docs at http://localhost:4000/docs");
});
```

## Step 3: Create Types and Interfaces

Define your data models:

```typescript title="types.ts"
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  post_id: number;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
  published?: boolean;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  author?: string;
  published?: boolean;
}

export interface CreateCommentRequest {
  author: string;
  content: string;
}

export interface UpdateCommentRequest {
  author?: string;
  content?: string;
}

export interface PostFilters {
  author?: string;
  published?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}
```

## Step 4: Create Middleware

Set up middleware for logging and authentication:

```typescript title="middleware/logger.ts"
import type { Middleware } from "burger-api";

export const loggerMiddleware: Middleware = async (req, next) => {
  const start = Date.now();
  const method = req.method;
  const url = req.url;
  
  console.log(`📝 ${method} ${url} - Started`);
  
  const response = await next();
  
  const duration = Date.now() - start;
  const status = response.status;
  
  console.log(`📝 ${method} ${url} - ${status} (${duration}ms)`);
  
  return response;
};
```

```typescript title="middleware/auth.ts"
import type { Middleware } from "burger-api";

export const authMiddleware: Middleware = async (req, next) => {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Authentication required" }),
      { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  
  const token = authHeader.substring(7); // Remove "Bearer " prefix
  
  // Simple token validation (in a real app, verify JWT or check database)
  if (token !== "secret-token") {
    return new Response(
      JSON.stringify({ error: "Invalid token" }),
      { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  
  // Add user info to request (you'd typically decode JWT here)
  (req as any).user = { id: 1, name: "John Doe" };
  
  return next();
};
```

## Step 5: Create Validation Schemas

Set up Zod schemas for validation:

```typescript title="schemas.ts"
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required").max(100, "Author name too long"),
  published: z.boolean().optional().default(false),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  content: z.string().min(1, "Content is required").optional(),
  author: z.string().min(1, "Author is required").max(100, "Author name too long").optional(),
  published: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  "At least one field must be provided"
);

export const createCommentSchema = z.object({
  author: z.string().min(1, "Author is required").max(100, "Author name too long"),
  content: z.string().min(1, "Content is required").max(1000, "Content too long"),
});

export const updateCommentSchema = z.object({
  author: z.string().min(1, "Author is required").max(100, "Author name too long").optional(),
  content: z.string().min(1, "Content is required").max(1000, "Content too long").optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  "At least one field must be provided"
);

export const postFiltersSchema = z.object({
  author: z.string().optional(),
  published: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
});
```

## Step 6: Set Up SQLite Database

Set up SQLite database with Bun's native SQLite client:

```typescript title="database.ts"
import { Database } from "bun:sqlite";
import type { Post, Comment, PostFilters } from "./types";

// Initialize SQLite database
const db = new Database("blog.db");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    published BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
  );

  -- Insert sample data
  INSERT OR IGNORE INTO posts (id, title, content, author, published) VALUES 
    (1, 'Getting Started with BurgerAPI', 'BurgerAPI is a modern framework for building APIs with Bun...', 'John Doe', 1),
    (2, 'Advanced TypeScript Patterns', 'TypeScript provides powerful type system features...', 'Jane Smith', 0);

  INSERT OR IGNORE INTO comments (id, post_id, author, content) VALUES 
    (1, 1, 'Alice', 'Great article! Very helpful.');
`);

// Prepared statements for better performance
const getPostsQuery = db.query(`
  SELECT * FROM posts 
  WHERE ($author IS NULL OR author LIKE '%' || $author || '%')
    AND ($published IS NULL OR published = $published)
    AND ($search IS NULL OR title LIKE '%' || $search || '%' OR content LIKE '%' || $search || '%')
  ORDER BY created_at DESC
  LIMIT $limit OFFSET $offset
`);

const getPostByIdQuery = db.query("SELECT * FROM posts WHERE id = $id");
const insertPostQuery = db.query(`
  INSERT INTO posts (title, content, author, published) 
  VALUES ($title, $content, $author, $published)
`);
const updatePostQuery = db.query(`
  UPDATE posts 
  SET title = COALESCE($title, title),
      content = COALESCE($content, content),
      author = COALESCE($author, author),
      published = COALESCE($published, published),
      updated_at = CURRENT_TIMESTAMP
  WHERE id = $id
`);
const deletePostQuery = db.query("DELETE FROM posts WHERE id = $id");

const getCommentsByPostIdQuery = db.query("SELECT * FROM comments WHERE post_id = $postId ORDER BY created_at ASC");
const getCommentByIdQuery = db.query("SELECT * FROM comments WHERE id = $id");
const insertCommentQuery = db.query(`
  INSERT INTO comments (post_id, author, content) 
  VALUES ($postId, $author, $content)
`);
const updateCommentQuery = db.query(`
  UPDATE comments 
  SET author = COALESCE($author, author),
      content = COALESCE($content, content),
      updated_at = CURRENT_TIMESTAMP
  WHERE id = $id
`);
const deleteCommentQuery = db.query("DELETE FROM comments WHERE id = $id");

export const postDatabase = {
  getAll(filters: PostFilters = {}): { posts: Post[]; total: number; page: number; limit: number } {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    // Get filtered posts
    const posts = getPostsQuery.all({
      $author: filters.author || null,
      $published: filters.published ?? null,
      $search: filters.search || null,
      $limit: limit,
      $offset: offset,
    }) as Post[];

    // Get total count for pagination
    const countQuery = db.query(`
      SELECT COUNT(*) as total FROM posts 
      WHERE ($author IS NULL OR author LIKE '%' || $author || '%')
        AND ($published IS NULL OR published = $published)
        AND ($search IS NULL OR title LIKE '%' || $search || '%' OR content LIKE '%' || $search || '%')
    `);
    
    const result = countQuery.get({
      $author: filters.author || null,
      $published: filters.published ?? null,
      $search: filters.search || null,
    }) as { total: number };

    return {
      posts,
      total: result.total,
      page,
      limit,
    };
  },

  getById(id: number): Post | undefined {
    return getPostByIdQuery.get({ $id: id }) as Post | undefined;
  },

  create(title: string, content: string, author: string, published = false): Post {
    const result = insertPostQuery.run({
      $title: title,
      $content: content,
      $author: author,
      $published: published ? 1 : 0,
    });

    const newPost = this.getById(result.lastInsertRowid as number);
    if (!newPost) throw new Error("Failed to create post");
    
    return newPost;
  },

  update(id: number, updates: Partial<Pick<Post, 'title' | 'content' | 'author' | 'published'>>): Post | null {
    const result = updatePostQuery.run({
      $id: id,
      $title: updates.title || null,
      $content: updates.content || null,
      $author: updates.author || null,
      $published: updates.published !== undefined ? (updates.published ? 1 : 0) : null,
    });

    if (result.changes === 0) return null;

    return this.getById(id) || null;
  },

  delete(id: number): boolean {
    const result = deletePostQuery.run({ $id: id });
    return result.changes > 0;
  },
};

export const commentDatabase = {
  getByPostId(postId: number): Comment[] {
    return getCommentsByPostIdQuery.all({ $postId: postId }) as Comment[];
  },

  getById(id: number): Comment | undefined {
    return getCommentByIdQuery.get({ $id: id }) as Comment | undefined;
  },

  create(postId: number, author: string, content: string): Comment {
    const result = insertCommentQuery.run({
      $postId: postId,
      $author: author,
      $content: content,
    });

    const newComment = this.getById(result.lastInsertRowid as number);
    if (!newComment) throw new Error("Failed to create comment");
    
    return newComment;
  },

  update(id: number, updates: Partial<Pick<Comment, 'author' | 'content'>>): Comment | null {
    const result = updateCommentQuery.run({
      $id: id,
      $author: updates.author || null,
      $content: updates.content || null,
    });

    if (result.changes === 0) return null;

    return this.getById(id) || null;
  },

  delete(id: number): boolean {
    const result = deleteCommentQuery.run({ $id: id });
    return result.changes > 0;
  },
};

// Close database connection on process exit
process.on("exit", () => {
  db.close();
});
```

:::tip Why SQLite with Bun?
Bun's native SQLite support offers several advantages:
- **Zero Dependencies**: No need to install additional database drivers
- **High Performance**: Bun's SQLite implementation is optimized for speed
- **Type Safety**: Full TypeScript support with prepared statements
- **Persistent Data**: Unlike in-memory storage, data survives server restarts
- **Production Ready**: SQLite is suitable for many production workloads
:::

## Step 7: Create Posts Routes

Create the main posts endpoints:

```typescript title="api/posts/route.ts"
import type { BurgerRequest } from "burger-api";
import { postDatabase } from "../../database";
import { createPostSchema, postFiltersSchema } from "../../schemas";

// GET /api/posts - List posts with filtering and pagination
export function GET(req: BurgerRequest) {
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams);
  
  // Convert string parameters to appropriate types
  const filters = {
    author: searchParams.author,
    published: searchParams.published ? searchParams.published === 'true' : undefined,
    search: searchParams.search,
    page: searchParams.page ? parseInt(searchParams.page) : undefined,
    limit: searchParams.limit ? parseInt(searchParams.limit) : undefined,
  };
  
  // Validate filters
  const validationResult = postFiltersSchema.safeParse(filters);
  
  if (!validationResult.success) {
    return Response.json(
      { 
        error: "Invalid filters", 
        details: validationResult.error.format() 
      },
      { status: 400 }
    );
  }
  
  const result = postDatabase.getAll(validationResult.data);
  
  return Response.json({
    ...result,
    totalPages: Math.ceil(result.total / result.limit),
  });
}

// POST /api/posts - Create a new post (requires authentication)
export async function POST(req: BurgerRequest) {
  try {
    const body = await req.json();
    
    const validationResult = createPostSchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const { title, content, author, published } = validationResult.data;
    const newPost = postDatabase.create(title, content, author, published);

    return Response.json(newPost, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
```

```typescript title="api/posts/[id]/route.ts"
import type { BurgerRequest } from "burger-api";
import { postDatabase } from "../../../database";
import { updatePostSchema } from "../../../schemas";

// GET /api/posts/[id] - Get a specific post
export function GET(req: BurgerRequest) {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return Response.json(
      { error: "Invalid post ID" },
      { status: 400 }
    );
  }

  const post = postDatabase.getById(id);
  
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return Response.json(post);
}

// PUT /api/posts/[id] - Update a post (requires authentication)
export async function PUT(req: BurgerRequest) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return Response.json(
        { error: "Invalid post ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    
    const validationResult = updatePostSchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const updatedPost = postDatabase.update(id, validationResult.data);
    
    if (!updatedPost) {
      return Response.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json(updatedPost);
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post (requires authentication)
export function DELETE(req: BurgerRequest) {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return Response.json(
      { error: "Invalid post ID" },
      { status: 400 }
    );
  }

  const deleted = postDatabase.delete(id);
  
  if (!deleted) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return new Response(null, { status: 204 });
}
```

## Step 8: Create Comments Routes

Create nested comment routes:

```typescript title="api/posts/[postId]/comments/route.ts"
import type { BurgerRequest } from "burger-api";
import { commentDatabase, postDatabase } from "../../../../database";
import { createCommentSchema } from "../../../../schemas";

// GET /api/posts/[postId]/comments - Get comments for a post
export function GET(req: BurgerRequest) {
  const postId = parseInt(req.params.postId);
  
  if (isNaN(postId)) {
    return Response.json(
      { error: "Invalid post ID" },
      { status: 400 }
    );
  }

  // Check if post exists
  const post = postDatabase.getById(postId);
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const comments = commentDatabase.getByPostId(postId);
  
  return Response.json({
    comments,
    count: comments.length,
    postId,
  });
}

// POST /api/posts/[postId]/comments - Create a comment for a post
export async function POST(req: BurgerRequest) {
  try {
    const postId = parseInt(req.params.postId);
    
    if (isNaN(postId)) {
      return Response.json(
        { error: "Invalid post ID" },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = postDatabase.getById(postId);
    if (!post) {
      return Response.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    
    const validationResult = createCommentSchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const { author, content } = validationResult.data;
    const newComment = commentDatabase.create(postId, author, content);

    return Response.json(newComment, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
```

```typescript title="api/posts/[postId]/comments/[id]/route.ts"
import type { BurgerRequest } from "burger-api";
import { commentDatabase, postDatabase } from "../../../../../database";
import { updateCommentSchema } from "../../../../../schemas";

// GET /api/posts/[postId]/comments/[id] - Get a specific comment
export function GET(req: BurgerRequest) {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.id);
  
  if (isNaN(postId) || isNaN(commentId)) {
    return Response.json(
      { error: "Invalid post ID or comment ID" },
      { status: 400 }
    );
  }

  // Check if post exists
  const post = postDatabase.getById(postId);
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const comment = commentDatabase.getById(commentId);
  
  if (!comment || comment.post_id !== postId) {
    return Response.json(
      { error: "Comment not found" },
      { status: 404 }
    );
  }

  return Response.json(comment);
}

// PUT /api/posts/[postId]/comments/[id] - Update a comment
export async function PUT(req: BurgerRequest) {
  try {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.id);
    
    if (isNaN(postId) || isNaN(commentId)) {
      return Response.json(
        { error: "Invalid post ID or comment ID" },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = postDatabase.getById(postId);
    if (!post) {
      return Response.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    
    const validationResult = updateCommentSchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const comment = commentDatabase.getById(commentId);
    
    if (!comment || comment.post_id !== postId) {
      return Response.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    const updatedComment = commentDatabase.update(commentId, validationResult.data);
    
    return Response.json(updatedComment);
  } catch (error) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

// DELETE /api/posts/[postId]/comments/[id] - Delete a comment
export function DELETE(req: BurgerRequest) {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.id);
  
  if (isNaN(postId) || isNaN(commentId)) {
    return Response.json(
      { error: "Invalid post ID or comment ID" },
      { status: 400 }
    );
  }

  // Check if post exists
  const post = postDatabase.getById(postId);
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const comment = commentDatabase.getById(commentId);
  
  if (!comment || comment.post_id !== postId) {
    return Response.json(
      { error: "Comment not found" },
      { status: 404 }
    );
  }

  const deleted = commentDatabase.delete(commentId);
  
  return new Response(null, { status: 204 });
}
```

## Step 9: Add Authentication to Protected Routes

Update the posts routes to require authentication for write operations:

```typescript title="api/posts/route.ts"
// ... existing code ...

// POST /api/posts - Create a new post (requires authentication)
export async function POST(req: BurgerRequest) {
  // Add authentication check
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  
  // ... rest of existing POST code ...
}
```

## Step 10: Test Your Complete API

Start your server:

```bash
bun run index.ts
```

Test all the endpoints:

### Posts
```bash
# List all posts
curl http://localhost:4000/api/posts

# List published posts only
curl "http://localhost:4000/api/posts?published=true"

# Search posts
curl "http://localhost:4000/api/posts?search=TypeScript"

# Pagination
curl "http://localhost:4000/api/posts?page=1&limit=5"

# Get specific post
curl http://localhost:4000/api/posts/1

# Create post (requires auth)
curl -X POST http://localhost:4000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer secret-token" \
  -d '{"title": "New Post", "content": "Content here", "author": "John"}'
```

### Comments
```bash
# Get comments for a post
curl http://localhost:4000/api/posts/1/comments

# Create a comment
curl -X POST http://localhost:4000/api/posts/1/comments \
  -H "Content-Type: application/json" \
  -d '{"author": "Alice", "content": "Great post!"}'

# Get specific comment
curl http://localhost:4000/api/posts/1/comments/1
```

## Project Structure

Your complete project structure:

```
blog-api/
├── api/
│   └── posts/
│       ├── route.ts                    # GET, POST /api/posts
│       ├── [id]/
│       │   └── route.ts                # GET, PUT, DELETE /api/posts/[id]
│       └── [postId]/
│           └── comments/
│               ├── route.ts            # GET, POST /api/posts/[postId]/comments
│               └── [id]/
│                   └── route.ts       # GET, PUT, DELETE /api/posts/[postId]/comments/[id]
├── middleware/
│   ├── logger.ts                       # Global logging middleware
│   └── auth.ts                         # Authentication middleware
├── database.ts                         # SQLite database layer
├── schemas.ts                          # Zod validation schemas
├── types.ts                            # TypeScript interfaces
├── index.ts                            # Server configuration
├── blog.db                             # SQLite database file (created automatically)
└── package.json
```

## Key Concepts Learned

### Nested Routing
- Use nested folder structures for related resources
- `/api/posts/[postId]/comments` creates nested routes
- Validate parent resources exist before operating on children

### Middleware
- **Global middleware**: Applied to all requests
- **Route-specific middleware**: Applied to specific routes
- Middleware can modify requests and responses

### Project Organization
- Separate concerns into different files
- Use a database layer for data operations
- Centralize validation schemas
- Organize middleware in dedicated files

### Advanced Features
- Filtering and pagination
- Search functionality
- Resource relationships
- Authentication patterns
- SQLite database integration with Bun

## Next Steps

Congratulations! You've built a sophisticated blog API with BurgerAPI. You now understand:

- ✅ Multiple related resources
- ✅ Nested routing patterns
- ✅ Middleware (global and route-specific)
- ✅ Advanced filtering and pagination
- ✅ Project organization for larger applications
- ✅ Authentication patterns

## What's Next?

You're now ready to build real-world applications with BurgerAPI! Consider exploring:

- **Database Integration**: You've already used SQLite! Consider PostgreSQL, MongoDB, or other databases for larger applications
- **Authentication**: Implement JWT tokens, OAuth, or session-based auth
- **File Uploads**: Handle file uploads and storage
- **WebSockets**: Real-time features (coming soon to BurgerAPI)
- **Deployment**: Deploy your API to production environments

## Troubleshooting

**"Authentication required" errors**
- Make sure you're including the `Authorization: Bearer secret-token` header
- Check that the token matches exactly: `secret-token`

**"Post not found" when creating comments**
- Verify the post ID exists by checking `GET /api/posts` first
- Make sure you're using the correct post ID in the URL

**Nested route not found**
- Check your folder structure matches the expected pattern
- Ensure all `route.ts` files are in the correct locations

**Filtering not working**
- Check that query parameters are properly formatted
- Verify the parameter names match your schema

**SQLite database issues**
- Make sure the `blog.db` file is created in your project directory
- Check that you have write permissions in the project folder
- If you get "database is locked" errors, make sure no other process is using the database
- The database file will be created automatically when you first run the server

You've completed all three tutorials! You now have a solid foundation for building APIs with BurgerAPI. Happy coding! 🚀
