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
        "getting-started/installation",
        "getting-started/cli",
        "key-concepts",
        "javascript",
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
        "core-concepts/hooks",
        "core-concepts/validation",
        "core/configuration",
        "core/response-types",
      ],
    },
    {
      type: "category",
      label: "Routing",
      items: [
        "routing/file-based-routing",
        {
          type: "category",
          label: "API Routing",
          items: [
            "routing/api/static-routes",
            "routing/api/route-groups",
            "routing/api/dynamic-routes",
            "routing/api/wildcard-routes",
            "routing/api/nested-routes",
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
      label: "Hooks",
      items: [
        "hooks/system",
        "hooks/global",
        "hooks/route-specific",
        "hooks/return-types",
        "hooks/after",
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
        "validation/headers",
        "validation/cookie",
        "validation/coercion",
        "validation/response",
        "validation/standard-schema",
        "validation/errors",
        "validation/problem-details",
        "validation/configuration",
        "validation/best-practices",
      ],
    },
    {
      type: "category",
      label: "WebSocket",
      items: ["websocket/overview"],
    },
    {
      type: "category",
      label: "OpenAPI & Documentation",
      items: ["api/openapi"],
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
        "examples/hooks",
        "examples/complete-project",
      ],
    },
    {
      type: "category",
      label: "Ecosystem",
      items: [
        "ecosystem/introduction",
        "ecosystem/hooks-plugins",
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
        "ai-assistance/agent-skills",
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
        "cli/skills",
        { type: "doc", id: "cli/dev", label: "dev (start)" },
        "cli/build",
        "cli/build-exec",
        "cli/inspect",
        "cli/doctor",
      ],
    },
    {
      type: "category",
      label: "Deployment",
      items: [
        "compatibility",
        "deployment/bun",
        "deployment/cloudflare",
        "deployment/vercel",
        "deployment/deno",
      ],
    },
    {
      type: "category",
      label: "Performance",
      items: ["performance/overview"],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        "core/burger-class",
        "core/server-options",
        "api/context-set",
        "api/validation-types",
        "api/hook-types",
        "api/request-api",
        "api/response-mutation",
        "api/route-metadata",
        "api/query-parsing",
      ],
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        "advanced/error-handling",
        "advanced/type-safety",
        "advanced/benchmarks",
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
