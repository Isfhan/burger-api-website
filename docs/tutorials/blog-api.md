---
sidebar_label: "Blog API"
sidebar_position: 4
sidebar: tutorialsSidebar
---

# Tutorial 3: Blog API

In this final tutorial, you'll build a sophisticated blog API with multiple related resources (posts and comments), hooks, plugins, nested routes, and advanced features. This demonstrates how to structure larger BurgerAPI applications.

## What You'll Build

A blog API with the following features:
- **Posts**: Create, read, update, delete blog posts
- **Comments**: Add comments to posts with nested routing
- **Hooks and plugins**: Global logging via a hook, route protection via an auth plugin
- **Filtering**: Search and pagination for posts
- **Relationships**: Comments belong to posts

## What You'll Learn

- Multiple related resources
- Nested routing (`/api/posts/[id]/comments`)
- Global hooks
- Project organization for larger applications
- Advanced filtering and pagination
- Authentication with plugins

## Prerequisites

Complete the [Todo List API](./todo-api.md) tutorial first. You should understand:
- CRUD operations
- Dynamic routes
- Zod validation
- Error handling

## Step 1: Set Up Your Project

For this advanced tutorial, start from a clean project using the CLI:

```bash
burger-api create blog-api
cd blog-api

# Install Zod for validation if it's not already present
bun add zod
```

The `burger-api create` command scaffolds an entry file and a `burger.build.ts` that define your `apiDir`, `pageDir`, and route prefixes. We'll hook our blog API into that setup.

For more details, see [Configuration](../core/configuration.md), [Server Options](../core/server-options.md), and the [CLI Tool](../getting-started/cli.md).

## Step 2: Configure Your Server

Set up your main server file:

```typescript title="src/index.ts"
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
  title: "Blog API",
  version: "1.0.0",
  description: "A blog API with posts and comments",
});

burger.serve(4000, () => {
  console.log("Blog API running at http://localhost:4000");
  console.log("API docs at http://localhost:4000/docs");
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

## Step 4: Create a Global Logging Hook

BurgerAPI's request lifecycle is hook-based. Global hooks live in `src/hooks.ts` and run for every request (see the [Hook System](../hooks/system.md) and [Global Hooks](../hooks/global.md) guides for the full model):

```typescript title="src/hooks.ts"
import type { BurgerContext } from "burger-api";

export const onRequest = [
  async (ctx: BurgerContext) => {
    console.log(`${ctx.method} ${ctx.url}`);
  },
];
```

A hook returns `undefined` to continue, or a `Response` to short-circuit the request. Later, in [Step 9](#step-9-add-authentication-with-a-plugin), we will protect routes with an auth plugin instead of a hand-rolled hook, because plugins integrate with route `config.ts` and work across many routes.

## Step 5: Create Validation Schemas

Set up per-route Zod schemas in `schema.ts` files. The posts collection route validates query filters for `GET` and the request body for `POST`:

```typescript title="src/api/posts/schema.ts"
import { z } from "zod";

export const GET = {
  query: z.object({
    author: z.string().optional(),
    published: z.enum(["true", "false"]).optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  }),
};

export const POST = {
  body: z.object({
    title: z.string().min(1, "Title is required").max(200, "Title too long"),
    content: z.string().min(1, "Content is required"),
    author: z.string().min(1, "Author is required").max(100, "Author name too long"),
    published: z.boolean().optional().default(false),
  }),
};
```

The individual post route validates the `id` path parameter:

```typescript title="src/api/posts/[id]/schema.ts"
import { z } from "zod";

const id = z.string().regex(/^\d+$/);

export const GET = { params: z.object({ id }) };

export const PUT = {
  params: z.object({ id }),
  body: z
    .object({
      title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
      content: z.string().min(1, "Content is required").optional(),
      author: z.string().min(1, "Author is required").max(100, "Author name too long").optional(),
      published: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, "At least one field must be provided"),
};

export const DELETE = { params: z.object({ id }) };
```

The comment routes validate both path parameters and bodies:

```typescript title="src/api/posts/[postId]/comments/schema.ts"
import { z } from "zod";

export const GET = {
  params: z.object({ postId: z.string().regex(/^\d+$/) }),
};

export const POST = {
  params: z.object({ postId: z.string().regex(/^\d+$/) }),
  body: z.object({
    author: z.string().min(1, "Author is required").max(100, "Author name too long"),
    content: z.string().min(1, "Content is required").max(1000, "Content too long"),
  }),
};
```

```typescript title="src/api/posts/[postId]/comments/[id]/schema.ts"
import { z } from "zod";

const postId = z.string().regex(/^\d+$/);
const id = z.string().regex(/^\d+$/);

export const GET = { params: z.object({ postId, id }) };

export const PUT = {
  params: z.object({ postId, id }),
  body: z
    .object({
      author: z.string().min(1, "Author is required").max(100, "Author name too long").optional(),
      content: z.string().min(1, "Content is required").max(1000, "Content too long").optional(),
    })
    .refine((data) => Object.keys(data).length > 0, "At least one field must be provided"),
};

export const DELETE = { params: z.object({ postId, id }) };
```

BurgerAPI validates each request against these schemas before the handler runs. Invalid input returns `422 Unprocessable Content` (RFC 9457), so handlers only receive validated data. See [Zod Validation](../validation/zod.md).

## Step 6: Set Up SQLite Database

Set up SQLite database with Bun's native SQLite client:

```typescript title="src/database.ts"
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

```typescript title="src/api/posts/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as GetSchema, POST as PostSchema } from "./schema";
import { postDatabase } from "../../database";

// GET /api/posts - List posts with filtering and pagination
export async function GET(ctx: BurgerContext<typeof GetSchema>) {
  const { author, published, search, page, limit } = ctx.validated.query;

  const result = postDatabase.getAll({
    author,
    published: published === undefined ? undefined : published === "true",
    search,
    page,
    limit,
  });

  return Response.json({
    ...result,
    totalPages: Math.ceil(result.total / result.limit),
  });
}

// POST /api/posts - Create a new post (requires authentication)
export async function POST(ctx: BurgerContext<typeof PostSchema>) {
  const { title, content, author, published } = ctx.validated.body;
  const newPost = postDatabase.create(title, content, author, published);

  return Response.json(newPost, { status: 201 });
}
```

```typescript title="src/api/posts/[id]/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as GetSchema, PUT as PutSchema, DELETE as DeleteSchema } from "./schema";
import { postDatabase } from "../../../database";

// GET /api/posts/[id] - Get a specific post
export async function GET(ctx: BurgerContext<typeof GetSchema>) {
  const post = postDatabase.getById(parseInt(ctx.validated.params.id, 10));

  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return Response.json(post);
}

// PUT /api/posts/[id] - Update a post (requires authentication)
export async function PUT(ctx: BurgerContext<typeof PutSchema>) {
  const updatedPost = postDatabase.update(
    parseInt(ctx.validated.params.id, 10),
    ctx.validated.body
  );

  if (!updatedPost) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return Response.json(updatedPost);
}

// DELETE /api/posts/[id] - Delete a post (requires authentication)
export async function DELETE(ctx: BurgerContext<typeof DeleteSchema>) {
  const deleted = postDatabase.delete(parseInt(ctx.validated.params.id, 10));

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

```typescript title="src/api/posts/[postId]/comments/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as GetSchema, POST as PostSchema } from "./schema";
import { commentDatabase, postDatabase } from "../../../../database";

// GET /api/posts/[postId]/comments - Get comments for a post
export async function GET(ctx: BurgerContext<typeof GetSchema>) {
  const postId = parseInt(ctx.validated.params.postId, 10);

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
export async function POST(ctx: BurgerContext<typeof PostSchema>) {
  const postId = parseInt(ctx.validated.params.postId, 10);

  // Check if post exists
  const post = postDatabase.getById(postId);
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const { author, content } = ctx.validated.body;
  const newComment = commentDatabase.create(postId, author, content);

  return Response.json(newComment, { status: 201 });
}
```

```typescript title="src/api/posts/[postId]/comments/[id]/route.ts"
import type { BurgerContext } from "burger-api";
import type { GET as GetSchema, PUT as PutSchema, DELETE as DeleteSchema } from "./schema";
import { commentDatabase, postDatabase } from "../../../../../database";

// GET /api/posts/[postId]/comments/[id] - Get a specific comment
export async function GET(ctx: BurgerContext<typeof GetSchema>) {
  const { postId, id } = ctx.validated.params;

  // Check if post exists
  const post = postDatabase.getById(parseInt(postId, 10));
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const comment = commentDatabase.getById(parseInt(id, 10));

  if (!comment || comment.post_id !== parseInt(postId, 10)) {
    return Response.json(
      { error: "Comment not found" },
      { status: 404 }
    );
  }

  return Response.json(comment);
}

// PUT /api/posts/[postId]/comments/[id] - Update a comment
export async function PUT(ctx: BurgerContext<typeof PutSchema>) {
  const { postId, id } = ctx.validated.params;

  // Check if post exists
  const post = postDatabase.getById(parseInt(postId, 10));
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const comment = commentDatabase.getById(parseInt(id, 10));

  if (!comment || comment.post_id !== parseInt(postId, 10)) {
    return Response.json(
      { error: "Comment not found" },
      { status: 404 }
    );
  }

  const updatedComment = commentDatabase.update(parseInt(id, 10), ctx.validated.body);

  return Response.json(updatedComment);
}

// DELETE /api/posts/[postId]/comments/[id] - Delete a comment
export async function DELETE(ctx: BurgerContext<typeof DeleteSchema>) {
  const { postId, id } = ctx.validated.params;

  // Check if post exists
  const post = postDatabase.getById(parseInt(postId, 10));
  if (!post) {
    return Response.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  const comment = commentDatabase.getById(parseInt(id, 10));

  if (!comment || comment.post_id !== parseInt(postId, 10)) {
    return Response.json(
      { error: "Comment not found" },
      { status: 404 }
    );
  }

  const deleted = commentDatabase.delete(parseInt(id, 10));

  return new Response(null, { status: 204 });
}
```

## Step 9: Add Authentication with a Plugin

The core framework is auth-agnostic. Authentication ships as plugins under `ecosystem/plugins/` and integrates with route `config.ts`. See [API Key Auth](/docs/ecosystem/api-key-auth).

Install the API key plugin:

```bash
burger-api add api-key
```

Register it in `src/plugins.ts`:

```typescript title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(apiKey({ keys: ["secret-token"] }));
};
```

With the plugin registered, every route requires a valid key unless its `config.ts` opts out. The posts routes require auth explicitly:

```typescript title="src/api/posts/config.ts"
export default { auth: { required: true } };
```

```typescript title="src/api/posts/[id]/config.ts"
export default { auth: { required: true } };
```

The comment routes stay public:

```typescript title="src/api/posts/[postId]/comments/config.ts"
export default { auth: false };
```

```typescript title="src/api/posts/[postId]/comments/[id]/config.ts"
export default { auth: false };
```

A request without a key (or with an invalid one) gets `401 Unauthorized` before the handler runs. The validated key is available to handlers as `ctx.apiKey`. Note that `config.ts` applies per route directory: there is no inheritance between folders, so each route directory declares its own options. See [Configuration](/docs/core/configuration).

## Step 10: Test Your Complete API

Start your server:

```bash
bun run dev
```

Test all the endpoints. The posts routes require the API key:

### Posts
```bash
# List all posts
curl http://localhost:4000/api/posts \
  -H "X-API-Key: secret-token"

# List published posts only
curl "http://localhost:4000/api/posts?published=true" \
  -H "X-API-Key: secret-token"

# Search posts
curl "http://localhost:4000/api/posts?search=TypeScript" \
  -H "X-API-Key: secret-token"

# Pagination
curl "http://localhost:4000/api/posts?page=1&limit=5" \
  -H "X-API-Key: secret-token"

# Get specific post
curl http://localhost:4000/api/posts/1 \
  -H "X-API-Key: secret-token"

# Create post (requires auth)
curl -X POST http://localhost:4000/api/posts \
  -H "Content-Type: application/json" \
  -H "X-API-Key: secret-token" \
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

## Deploying the Blog API (Production)

You can build this blog API into a bundle or an executable. The production build discovers routes at build time, so no runtime filesystem scanning is needed:

```bash
# From the project root
burger-api build src/index.ts
```

This will produce:

- `.build/bundle/app.js`

To build a standalone executable:

```bash
burger-api build:exec src/index.ts
```

Which creates:

- `.build/executable/<project>` (or `.exe` on Windows)

These commands are covered in more detail in:

- [CLI Tool](../getting-started/cli.md)
- [Build Command](../cli/build.md)
- [Build Executable](../cli/build-exec.md)

## Project Structure

Your complete project structure:

```
blog-api/
├── src/
│   ├── index.ts                        # Server configuration
│   ├── hooks.ts                        # Global hooks (logging)
│   ├── plugins.ts                      # Auth plugin registration
│   ├── database.ts                     # SQLite database layer
│   ├── types.ts                        # TypeScript interfaces
│   └── api/
│       └── posts/
│           ├── route.ts                # GET, POST /api/posts
│           ├── schema.ts               # Validation for /api/posts
│           ├── config.ts               # Auth: required
│           ├── [id]/
│           │   ├── route.ts            # GET, PUT, DELETE /api/posts/[id]
│           │   ├── schema.ts           # Validation for /api/posts/[id]
│           │   └── config.ts           # Auth: required
│           └── [postId]/
│               └── comments/
│                   ├── route.ts        # GET, POST /api/posts/[postId]/comments
│                   ├── schema.ts       # Validation for comments
│                   ├── config.ts       # Auth: false
│                   └── [id]/
│                       ├── route.ts    # GET, PUT, DELETE /api/posts/[postId]/comments/[id]
│                       ├── schema.ts   # Validation for a specific comment
│                       └── config.ts   # Auth: false
├── ecosystem/
│   └── plugins/
│       └── api-key/                    # Installed by `burger-api add api-key`
├── burger.build.ts
├── blog.db                             # SQLite database file (created automatically)
└── package.json
```

## Key Concepts Learned

### Nested Routing
- Use nested folder structures for related resources
- `/api/posts/[postId]/comments` creates nested routes
- Validate parent resources exist before operating on children

### Hooks and Plugins
- **Global hooks**: Live in `src/hooks.ts`, run for every request
- **Auth plugins**: Registered in `src/plugins.ts`, enforce route `config.ts`
- Each route directory declares its own `config.ts`; there is no folder inheritance

### Validation
- Declare per-method schemas in a route's `schema.ts` file
- Access validated data via `ctx.validated`, typed from the schema
- Invalid requests return 422 automatically (RFC 9457)

### Project Organization
- Separate concerns into different files
- Use a database layer for data operations
- Keep schemas next to their routes
- Use route groups `(folder)` to organize without changing URLs

### Advanced Features
- Filtering and pagination
- Search functionality
- Resource relationships
- Authentication plugins
- SQLite database integration with Bun

## Next Steps

Congratulations! You've built a sophisticated blog API with BurgerAPI. You now understand:

- ✅ Multiple related resources
- ✅ Nested routing patterns
- ✅ Hooks (global) and plugins (auth)
- ✅ Advanced filtering and pagination
- ✅ Project organization for larger applications
- ✅ Authentication plugins

## What's Next?

You're now ready to build real-world applications with BurgerAPI! Consider exploring:

- **Database Integration**: You've already used SQLite! Consider PostgreSQL, MongoDB, or other databases for larger applications
- **Authentication**: Implement JWT tokens, OAuth, or session-based auth
- **File Uploads**: Handle file uploads and storage
- **Deployment**: Deploy your API to production environments

## Troubleshooting

**"401 Unauthorized" errors on posts routes**
- Make sure you're including the `X-API-Key: secret-token` header
- Check that `src/plugins.ts` registers the api-key plugin with the same key
- Comment routes are public; only the posts routes require the key

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

You've completed all three tutorials! You now have a solid foundation for building APIs with BurgerAPI. Happy coding!
