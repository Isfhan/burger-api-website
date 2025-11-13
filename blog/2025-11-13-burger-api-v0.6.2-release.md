---
slug: burger-api-v0.6.2-release
title: BurgerAPI v0.6.2 Released
authors: [isfhan]
tags: [release, performance, middleware, monorepo]
---

We're excited to announce the release of **BurgerAPI v0.6.2**! This update focuses on performance optimization, architectural simplification, and improved project structure while maintaining 100% backward compatibility.

{/* truncate */}

## 🚀 What's New in v0.6.2

### Version 0.6.2 (November 13, 2025)

- **Performance**: Specialized fast paths for middleware execution
- **Simplified**: Cleaner middleware system with three clear return types
- **Monorepo**: Workspace structure for better organization and future CLI tool
- **Code Quality**: Reduced middleware processing from ~110 to ~80 lines
- **Backward Compatible**: All existing applications work without any changes

## 🎯 Introduction

This release represents a maturation of the BurgerAPI framework. Instead of adding new features, we focused on making what exists faster, simpler, and more maintainable. The result? Better performance, clearer code, and a solid foundation for future tooling.

## ⚡ Performance Improvements

We've optimized the middleware execution system through careful code refinement, focusing on the most common use cases.

### Specialized Fast Paths

Different execution paths optimized for common scenarios:

- **0 middlewares**: Direct handler call (no overhead)
- **1 middleware**: Dedicated fast path for single middleware
- **2 middlewares**: Manually unrolled execution (most common in production)
- **3+ middlewares**: Optimized loop with pre-allocated arrays

### Key Optimizations

**AOT (Ahead-of-Time) Compilation**: Routes are now compiled at server startup with pre-computed middleware arrays, reducing runtime overhead.

**Zero Runtime Allocations**: Pre-allocated arrays eliminate dynamic memory allocations during request processing.

**Better JIT Optimization**: Separated methods allow JavaScript engines to optimize each execution path independently.

**Code Reduction**: Simplified middleware processing while improving clarity.

### What This Means for You

- Faster request handling
- Lower memory usage during request processing
- Better performance under high load
- All improvements are automatic - just upgrade!

## 💡 Simplified Middleware System

We've simplified the middleware architecture for a better developer experience.

### Three Clear Return Types

```typescript
import type { BurgerRequest, Middleware } from "burger-api";

// 1. Return Response: Stop execution, return immediately
const authMiddleware: Middleware = (req) => {
  if (!req.headers.get("authorization")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 }); // Stop execution, return immediately
  }
  return undefined; // Continue to next middleware or handler
};

// 2. Return Function: Transform response after handler completes
const corsMiddleware: Middleware = (req) => {
  return async (response) => {
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    return new Response(response.body, {
      // Transform response after handler completes
      status: response.status,
      headers,
    });
  };
};

// 3. Return undefined: Continue to next middleware
const loggingMiddleware: Middleware = (req) => {
  console.log(`${req.method} ${req.url}`);
  return undefined; // Continue to next middleware or handler
};
```

## 🏗️ Monorepo Architecture

We've transitioned to a Bun workspace monorepo structure, setting the foundation for exciting future features.

### Better Organization

```
burger-api/
  packages/
    burger-api/     → Core framework (published to npm)
    cli/            → CLI tool (under active development)
  ecosystem/        → Ready-to-use middleware templates (under active development)
```

### Benefits for Users

- **Production-Ready Templates**: Ecosystem middleware you can copy and customize or install with CLI tool
- **Upcoming CLI Tool**: Scaffold projects and add middleware with a single command
- **Cleaner Separation**: Framework core and tooling are properly isolated
- **Better Maintenance**: Each package has its own dependencies and tests

## 🚦 Upgrade to v0.6.2

**Great news:** This release is 100% backward compatible!

Update your project to get performance improvements automatically:

```bash
bun add burger-api@latest
```

All existing code works exactly as before.

## 🔮 What's Next

We're building a complete ecosystem around BurgerAPI:

- **CLI Tool**: Command-line tool for scaffolding new projects and adding middleware
- **More Ecosystem Templates**: Additional production-ready middleware patterns
- **Enhanced Documentation**: More examples, guides, and best practices
- **Community Growth**: Building a stronger ecosystem together

## 🤝 Get Involved

BurgerAPI is open source and we welcome contributions!

- ⭐ [Star us on GitHub](https://github.com/isfhan/burger-api)
- 🐛 [Report issues](https://github.com/isfhan/burger-api/issues)
- 💡 [Share ideas](https://github.com/isfhan/burger-api/discussions)
- 🤝 [Contribute code](https://github.com/isfhan/burger-api/pulls)

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
