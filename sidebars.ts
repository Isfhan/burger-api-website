import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Define the main docs sidebar structure manually
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "quick-start",
        "installation",
        "key-concepts",
        "getting-started/installation",
        "getting-started/cli",
      ],
    },
    {
      type: "category",
      label: "Migration",
      items: ["migration/migrating-to-0.9"],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "core/burger-class",
        "core/server-options",
        "core/request-handling",
        "core/response-types",
        "core/configuration",
      ],
    },
    {
      type: "category",
      label: "Routing",
      items: [
        "routing/file-based-routing",
        "routing/static-routes",
        "routing/dynamic-routes",
        "routing/wildcard-routes",
        "routing/route-groups",
        "routing/nested-routes",
        {
          type: "category",
          label: "API Routing",
          items: [
            "routing/api/static-routes",
            "routing/api/route-groups",
            "routing/api/dynamic-routes",
            "routing/api/wildcard-routes",
          ],
        },
        {
          type: "category",
          label: "Page Routing",
          items: [
            "routing/pages/static-pages",
            "routing/pages/dynamic-pages",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Middleware",
      items: [
        "middleware/system",
        "middleware/global",
        "middleware/route-specific",
        "middleware/return-types",
        "middleware/after",
      ],
    },
    {
      type: "category",
      label: "Validation",
      items: [
        "validation/zod",
        "validation/schema",
        "validation/params",
        "validation/query",
        "validation/body",
        "validation/errors",
      ],
    },
    {
      type: "category",
      label: "OpenAPI & Documentation",
      items: [
        "openapi/generation",
        "openapi/swagger-ui",
        "openapi/metadata",
        "api/openapi",
      ],
    },
    {
      type: "category",
      label: "Request Handling",
      items: [
        "request-handling/middleware",
        "request-handling/validation",
      ],
    },
    {
      type: "category",
      label: "CLI Tool",
      items: [
        "cli/installation",
        "cli/create",
        "cli/add",
        "cli/list",
        "cli/serve",
        "cli/build",
        "cli/build-exec",
      ],
    },
    {
      type: "category",
      label: "Examples",
      items: [
        "examples/basic-route",
        "examples/middleware",
        "examples/validation",
        "examples/complete-project",
      ],
    },
    {
      type: "category",
      label: "Ecosystem",
      items: [
        "ecosystem/introduction",
        "ecosystem/middleware",
        "ecosystem/cors",
        "ecosystem/logger",
        "ecosystem/rate-limiter",
        "ecosystem/jwt-auth",
        "ecosystem/api-key-auth",
      ],
    },
    {
      type: "category",
      label: "AI Assistance",
      items: [
        "ai-assistance/llm-context-files",
        "ai-assistance/using-llm-files",
        "ai-assistance/llm-files-reference",
        "ai-assistance/integration-examples",
      ],
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        "advanced/performance",
        "advanced/error-handling",
        "advanced/type-safety",
        "advanced/deployment",
        "advanced/websockets",
      ],
    },
    {
      type: "category",
      label: "Deployment",
      items: ["deployment/overview"],
    },
  ],

  // Define the tutorials sidebar structure
  tutorialsSidebar: [
    "tutorials/intro",
    "tutorials/hello-world",
    "tutorials/todo-api",
    "tutorials/blog-api",
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
