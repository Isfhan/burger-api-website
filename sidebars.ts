import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "quick-start",
        "key-concepts",
        "getting-started/installation",
        "getting-started/cli",
      ],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "core-concepts/applications",
        "core-concepts/routing",
        "core-concepts/handlers",
        "core/request-handling",
        "core-concepts/middleware",
        "core-concepts/validation",
        "core-concepts/openapi",
        "core/configuration",
        "core/response-types",
      ],
    },
    {
      type: "category",
      label: "Architecture",
      items: [
        "architecture/overview",
        "architecture/request-lifecycle",
        "architecture/routing-engine",
        "architecture/burger-context",
        "architecture/design-decisions",
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
          items: ["routing/pages/static-pages"],
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
      label: "API Reference",
      items: [
        "core/burger-class",
        "core/server-options",
        "api/burger-request",
        "api/context-set",
        "api/route-meta",
        "api/validation-types",
        "api/middleware-types",
        "api/request-api",
        "api/response-mutation",
        "api/route-metadata",
        "api/query-parsing",
      ],
    },
    {
      type: "category",
      label: "Performance",
      items: ["performance/overview"],
    },
    {
      type: "category",
      label: "Examples",
      items: [
        "examples/basic-route",
        "tutorials/hello-world",
        "tutorials/todo-api",
        "examples/crud-api",
        "tutorials/blog-api",
        "examples/authentication",
        "examples/pagination",
        "examples/validation",
        "examples/middleware",
        "examples/complete-project",
      ],
    },
    {
      type: "category",
      label: "Migration",
      items: ["migration/upgrading", "migration/migrating-to-0.9"],
    },
    {
      type: "category",
      label: "CLI Tool",
      items: [
        "cli/installation",
        "cli/create",
        "cli/add",
        "cli/list",
        "cli/skills",
        "cli/serve",
        "cli/build",
        "cli/build-exec",
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
      label: "AI Assistance",
      items: [
        "ai-assistance/agent-skills",
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
        "advanced/error-handling",
        "advanced/type-safety",
        "advanced/deployment",
      ],
    },
  ],

  tutorialsSidebar: [
    "tutorials/intro",
    "tutorials/hello-world",
    "tutorials/todo-api",
    "tutorials/blog-api",
  ],
};

export default sidebars;
