---
sidebar_position: 1
sidebar_label: Introduction
slug: /
---

# Welcome to BurgerAPI

BurgerAPI is a modern, open-source framework built natively for Bun.js. It simplifies building web applications and APIs with features designed for speed and ease of use.

:::tip What makes BurgerAPI special?

BurgerAPI leverages Bun's speed and offers a streamlined development experience through:

- **Declarative File-Based Routing:** Define API endpoints and static pages simply by organizing your files and folders.
- **Integrated Middleware:** Apply logic globally or target specific routes for concerns like logging, authentication, and data processing.
- **Automatic Zod Validation:** Define Zod schemas alongside your routes for effortless request validation (query parameters and request bodies). Now powered by Zod 4.x for enhanced performance and better error handling.
- **OpenAPI Specification & Swagger UI:** Automatically generate OpenAPI 3.0 documentation from your code (including Zod schemas and route metadata) and serve interactive Swagger UI.
- **TypeScript First:** Designed with TypeScript for improved developer experience and code safety.

:::

This documentation provides guides on using these core features based on the framework's implementation.

### Getting Started

Ready to build something tasty? Choose your learning path:

**🚀 Hands-on Learning (Recommended for beginners):**
- **[Tutorials](./tutorials/intro.md):** Step-by-step tutorials that guide you from Hello World to building a complete blog API with CRUD operations, validation, and middleware.

**📚 Concept Guides:**
- **[Configuration](./core/configuration.md):** Learn how to initialize and configure your BurgerAPI instance.
- **[API Routing](./routing/api/static-routes.md):** Understand how to define API endpoints using the file system.
- **[Static Pages](./routing/pages/static-pages.md):** See how to serve static HTML pages.
- **[Middleware](./request-handling/middleware.md):** Discover how to use global and route-specific middleware.
- **[Schema Validation](./request-handling/validation.md):** Implement request validation using Zod.
- **[OpenAPI / Swagger](./api/openapi.md):** Learn about automatic API documentation generation.

### Coming Soon

We are actively working on expanding BurgerAPI! Keep an eye on these sections for future updates:

- **[Ecosystem](./ecosystem/introduction.md):** Discover installable components and integrations.
- **[Advanced Dynamic Pages](./routing/pages/dynamic-pages.md):** Enhanced server-side rendering capabilities are planned.
- **Upcoming Features:** Look forward to WebSocket support and more.
- **Deployment:** Guides for deploying your BurgerAPI apps.
