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
    "intro", // Link to docs/intro.md (Top level)
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/cli",
      ],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "core/configuration", // Link to docs/core/configuration.md
      ],
    },
    {
      type: "category",
      label: "Routing",
      items: [
        {
          type: "category",
          label: "API Routing",
          items: [
            "routing/api/static-routes", // Link to docs/routing/api/static-routes.md
            "routing/api/route-groups", // Link to docs/routing/api/route-groups.md
            "routing/api/dynamic-routes", // Link to docs/routing/api/dynamic-routes.md
            "routing/api/wildcard-routes", // Link to docs/routing/api/wildcard-routes.md
          ],
        },
        {
          type: "category",
          label: "Page Routing",
          items: [
            "routing/pages/static-pages", // Link to docs/routing/pages/static-pages.md
            "routing/pages/dynamic-pages", // Link to docs/routing/pages/dynamic-pages.md (Coming Soon)
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Request Handling",
      items: [
        "request-handling/middleware", // Link to docs/request-handling/middleware.md
        "request-handling/validation", // Link to docs/request-handling/validation.md
      ],
    },
    {
      type: "category",
      label: "API Documentation",
      items: [
        "api/openapi", // Link to docs/api/openapi.md
      ],
    },
    {
      type: "category",
      label: "Ecosystem",
      items: ["ecosystem/introduction"],
    },
    {
      type: "category",
      label: "Upcoming Features", // Renamed from 'Advanced Features'
      items: [
        "advanced/websockets", // Only websockets left here for now
      ],
    },
    {
      type: "category",
      label: "Deployment (Coming Soon)",
      items: ["deployment/overview"],
    },
    // Add other top-level docs or categories here if needed
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
