---
sidebar_label: "Tutorials Overview"
sidebar_position: 1
sidebar: tutorialsSidebar
---

# Tutorials

Welcome to the BurgerAPI tutorials! These hands-on guides will take you from absolute beginner to building sophisticated APIs with BurgerAPI.

## What You'll Learn

Through these progressive tutorials, you'll discover how BurgerAPI makes building web APIs simple and enjoyable:

- **File-based routing** that maps your folder structure to API endpoints
- **Automatic OpenAPI documentation** generation
- **Zod validation** for request data
- **Middleware** for cross-cutting concerns
- **TypeScript-first** development experience

:::tip Why Tutorials?
While our concept guides explain *how* BurgerAPI works, these tutorials show you *how to build* with BurgerAPI. Each tutorial builds on the previous one, introducing new concepts gradually.
:::

## Prerequisites

Before starting these tutorials, make sure you have:

- ✅ **Bun installed** - Follow the [official Bun installation guide](https://bun.sh/docs/installation)
- ✅ **Basic TypeScript knowledge** - You should understand types, interfaces, and async/await
- ✅ **Familiarity with HTTP** - Understanding GET, POST, PUT, DELETE methods
- ✅ **Code editor** - VS Code, WebStorm, or any editor with TypeScript support

You can verify Bun is installed by running:
```bash
bun --version
```

## Tutorial Progression

### 1. [Hello World API](./hello-world.md) ⏱️ 15 minutes
**Perfect for:** Complete beginners
**What you'll build:** A simple API with one endpoint that returns JSON
**Concepts:** Project setup, basic routing, server configuration

### 2. [Todo List API](./todo-api.md) ⏱️ 45 minutes  
**Perfect for:** Learning CRUD operations
**What you'll build:** Full Create, Read, Update, Delete API with validation
**Concepts:** Multiple HTTP methods, Zod validation, dynamic routes, error handling

### 3. [Blog API](./blog-api.md) ⏱️ 60 minutes
**Perfect for:** Understanding complex applications
**What you'll build:** Multi-resource API with posts and comments
**Concepts:** Resource relationships, middleware, nested routes, project organization

## Getting Help

If you get stuck:

- Check the [Troubleshooting](#troubleshooting) section below
- Review the relevant [concept guides](../intro.md) for deeper understanding
- Join our community discussions for help

## Troubleshooting

### Common Issues

**"Command not found: bun"**
- Make sure Bun is properly installed and added to your PATH
- Try restarting your terminal after installation

**"Cannot find module 'burger-api'"**
- Run `bun add burger-api` in your project directory
- Make sure you're in the correct project folder

**"Port 4000 is already in use"**
- Either stop the other process using port 4000
- Or change the port in your `burger.serve(4000)` call

**TypeScript errors**
- Make sure your `tsconfig.json` is properly configured
- Check that you're importing types correctly: `import type { BurgerRequest } from "burger-api"`

Ready to start building? Let's begin with the [Hello World API](./hello-world.md)!
