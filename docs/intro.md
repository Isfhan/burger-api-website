---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Welcome to BurgerAPI

BurgerAPI is a modern, open-source framework built natively for Bun.js. It simplifies building web applications and APIs with features designed for speed and developer experience.

:::tip What makes BurgerAPI special?

BurgerAPI leverages Bun's speed and offers a streamlined development experience through:

- **Declarative File-Based Routing:** Define API endpoints and static pages simply by organizing your files and folders.
- **Integrated Middleware:** Apply logic globally or target specific routes for concerns like logging, authentication, and data processing.
- **Automatic Zod Validation:** Define Zod schemas alongside your routes for effortless request validation of params, query, and body. Built on Zod 4.x for performance and clear error messages.
- **OpenAPI Specification & Swagger UI:** Automatically generate OpenAPI 3.0 documentation from your code (including Zod schemas and route metadata) and serve interactive Swagger UI.
- **TypeScript First:** Designed with TypeScript for improved developer experience and code safety.
- **Burger API CLI:** Scaffolding, middleware management, and build tools built in.

:::

This documentation guides you through these core features and the underlying architecture.

### Getting Started

Ready to build something? Choose your learning path:

**🚀 Hands-on Learning (Recommended):**
- **[CLI Quick Start](./getting-started/cli.md):** The fastest way to get up and running with a new project.
- **[Tutorials](./tutorials/intro.md):** Step-by-step tutorials that guide you from Hello World to building a complete blog API.

**📚 Concept Guides:**
- **[Configuration](./core/configuration.md):** Learn how to initialize and configure your BurgerAPI instance.
- **[API Routing](./routing/api/static-routes.md):** Understand how to define API endpoints using the file system.
- **[Static Pages](./routing/pages/static-pages.md):** See how to serve static HTML pages.
- **[Middleware](./middleware/system.md):** Discover how to use global and route-specific middleware.
- **[Schema Validation](./validation/zod.md):** Implement request validation using Zod.
- **[OpenAPI / Swagger](./api/openapi.md):** Learn about automatic API documentation generation.
- **[Ecosystem](./ecosystem/introduction.md):** Discover and add middleware to your project using the CLI.

### Core Ideas

BurgerAPI is organized around a few concepts that the rest of the documentation builds on:

- **[Architecture](./architecture/overview.md):** How a request flows through the hybrid router, the shared request context, middleware, and validation.
- **[Request Context](./core/request-handling.md):** The `req` object your handlers receive — `req.query`, `req.params`, `req.route`, and `req.set`.
- **[Performance](./performance/overview.md):** The design choices that keep BurgerAPI fast.


## Related

- [Key Concepts](/docs/key-concepts)
- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
