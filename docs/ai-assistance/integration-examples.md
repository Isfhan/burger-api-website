---
sidebar_label: "Integration Examples (New)"
title: "Integration Examples"
description: "Real-world examples of how to use LLM context files to generate code with AI."
sidebar_position: 4
---

# Integration Examples

See how you can use Burger API's LLM files in real-world scenarios. These examples show what you should prompt and what the AI should ideally return.

## Example 1: Creating a New Route

**The Scenario**: You want to create a registration endpoint with validation.

**User Prompt**:
> "Using @llms-small.txt, create a route file for user authentication with a `POST /register` endpoint. Include Zod validation for an email, a password (min 8 chars), and a username."

**AI Expected Output**:
The AI should generate a file similar to this:
```typescript
import { z } from "zod";
import type { BurgerRequest } from "burger-api";

export const schema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string()
  })
};

export const POST = async (req: BurgerRequest) => {
  const { email, password, username } = req.validated.body;
  // Implementation logic here...
  return { status: "success", message: "User registered" };
};
```

---

## Example 2: Adding Middleware

**The Scenario**: You need to implement custom logging middleware.

**User Prompt**:
> "Reference @llms-full.txt to show me how to create a middleware that logs the request method and URL, and then add it to my main app configuration."

**AI Expected Output**:
The AI should provide both the middleware code and where it fits into your configuration:
```typescript
// middleware/logger.ts
import type { Middleware } from "burger-api";

export const logger: Middleware = async (req) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  return null; // Continue to handler
};

// app.ts
const app = new Burger({
  middleware: [logger]
});
```

---

## Example 3: CLI Usage

**The Scenario**: You are ready to deploy and need to build a single executable.

**User Prompt**:
> "How do I build my Burger API project into a standalone executable? Use @llms-small.txt as reference."

**AI Expected Output**:
> "You can use the Burger API CLI to build an executable. Run the following command:
> `burger-api build:executable`
> This will bundle your application and the runtime into a single binary for easier deployment."

---

## Example 4: Understanding Types

**The Scenario**: You are confused about how to access the query parameters.

**User Prompt**:
> "What is the `BurgerRequest` type and how do I access validated query parameters? Check @llms-full.txt"

**AI Expected Output**:
> "`BurgerRequest` is the standard request object in Burger API, extending the native Web Request. 
> To access validated query parameters, you first define a schema for `query`, and then access it via `req.validated.query`. 
> 
> Example:
> ```typescript
> export const schema = {
>   query: z.object({ id: z.string() })
> };
> 
> export const GET = (req: BurgerRequest) => {
>   const id = req.validated.query.id;
>   // ...
> };
> ```"

---

:::info
By referencing the context files, the AI "remembers" the specific naming conventions (like `req.validated`) that are unique to Burger API.
:::
