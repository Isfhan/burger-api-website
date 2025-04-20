import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
  // Define the tutorial sidebar structure manually
  tutorialSidebar: [
    'intro', // Link to docs/intro.md (Top level)
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation', // Link to docs/getting-started/installation.md
        // Add other getting started guides here, e.g., 'getting-started/your-first-api'
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core/configuration', // Link to docs/core/configuration.md
      ],
    },
    {
      type: 'category',
      label: 'Routing',
      items: [
        'routing/api-routes',   // Link to docs/routing/api-routes.md
        'routing/static-pages', // Link to docs/routing/static-pages.md
        'routing/dynamic-pages',   // Link to docs/routing/dynamic-pages.md (Coming Soon)
      ],
    },
    {
      type: 'category',
      label: 'Request Handling',
      items: [
        'request-handling/middleware', // Link to docs/request-handling/middleware.md
        'request-handling/validation', // Link to docs/request-handling/validation.md
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        'api/openapi', // Link to docs/api/openapi.md
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      link: { // Make the category itself clickable
        type: 'doc',
        id: 'ecosystem/introduction'
      },
      items: [
        // Specific ecosystem component links removed
        // Items will appear here as they are documented
      ],
    },
    {
      type: 'category',
      label: 'Upcoming Features', // Renamed from 'Advanced Features'
      items: [
        'advanced/websockets', // Only websockets left here for now
      ],
    },
    {
      type: 'category',
      label: 'Deployment (Coming Soon)',
      items: [
        'deployment/overview',
      ],
    },
    // Add other top-level docs or categories here if needed
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
