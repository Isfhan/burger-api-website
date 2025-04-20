import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  projectName: "BurgerAPI",
  title: "A modern, open source Bun.js native framework",
  tagline:
    "A modern, open source Bun.js native framework with file-based routing, middleware support, Zod validation, and automatic OpenAPI generation.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://burger-api.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'burger-api', // Usually your GitHub org/user name.
  // projectName: 'burger-api', // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Custom fields for the homepage
  customFields: {
    status: "Under Development",
    license: "MIT License",
    bunVersion: "Bun 1.2.4+",
    getStartedUrl: "/docs/",
    githubUrl: "https://github.com/isfhan/burger-api",
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/isfhan/burger-api-website/tree/main/docs",
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ["rss", "atom"],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: "warn",
        //   onInlineAuthors: "warn",
        //   onUntruncatedBlogPosts: "warn",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: "description",
        content:
          "A modern, open source Bun.js native framework with file-based routing, middleware support, Zod validation, and automatic OpenAPI generation.",
      },
      {
        name: "keywords",
        content: "Bun.js, API, Framework, OpenAPI, Zod, TypeScript",
      },
      { name: "author", content: "Isfhan Ahmed" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "BurgerAPI - Modern Bun.js Framework" },
      {
        property: "og:description",
        content:
          "A modern, open source Bun.js native framework with file-based routing, middleware support, Zod validation, and automatic OpenAPI generation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://burger-api.com" },
      {
        property: "og:image",
        content: "https://burger-api.com/img/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BurgerAPI - Modern Bun.js Framework" },
      {
        name: "twitter:description",
        content:
          "A modern, open source Bun.js native framework with file-based routing, middleware support, Zod validation, and automatic OpenAPI generation.",
      },
      {
        name: "twitter:image",
        content: "https://burger-api.com/img/og-image.png",
      },
    ],
    navbar: {
      title: "BurgerAPI",
      logo: {
        alt: "BurgerAPI Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "right",
          label: "Docs",
        },
        {
          href: "https://github.com/isfhan/burger-api",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Built with ❤️ for the Bun.js community.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
