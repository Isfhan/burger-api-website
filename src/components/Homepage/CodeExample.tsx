import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import styles from "../../pages/index.module.css";

// Define the type for our code tabs
type CodeTab = {
  id: string;
  title: string;
  code: string;
};

// Define our code examples
const codeTabs: CodeTab[] = [
  {
    id: "server",
    title: "server.ts",
    code: `// Step 1: Import the necessary modules
import { Burger } from 'burger-api';

// Step 2: Create and configure your API server
const burger = new Burger({
  apiDir: "api", // Where your API routes are
});

// Step 3: Start the server on port 4000
burger.serve(4000);`,
  },
  {
    id: "route",
    title: "api/hello.ts",
    code: `// Step 1: Import the BurgerRequest type from burger-api 
import type { BurgerRequest } from 'burger-api';

// Step 2: Define a GET route handler that takes a BurgerRequest
export async function GET(req: BurgerRequest) {
  // Step 3: Return a JSON response with a hello world message
  return Response.json({ message: "Hello world" });
}`,
  },
];

// Custom colors for better code readability
const customTheme = {
  ...themes.vsDark,
  plain: {
    ...themes.vsDark.plain,
  },
};

// Component that displays the code example with syntax highlighting
export function CodeExample() {
  const [activeTab, setActiveTab] = useState<string>(codeTabs[0].id);

  // Calculate the maximum number of lines across all code examples
  const maxLines = Math.max(
    ...codeTabs.map((tab) => tab.code.split("\n").length)
  );

  // Calculate line height (assuming 14px font size and 1.5 line-height)
  const lineHeight = 14 * 1.5; // 21px
  // Calculate padding (assuming 1.5rem = 24px)
  const padding = 24 * 2; // 48px top + bottom
  // Calculate min height
  const minHeight = maxLines * lineHeight + padding;

  return (
    <div className={styles.codeExampleContainer}>
      {/* Terminal-style header with tabs */}
      <div className={styles.codeExampleHeader}>
        {/* Window controls */}
        <div className={styles.windowControls}>
          <span
            className={styles.codeExampleDot}
            style={{ backgroundColor: "#ff5555" }}
          ></span>
          <span
            className={styles.codeExampleDot}
            style={{ backgroundColor: "#f1fa8c" }}
          ></span>
          <span
            className={styles.codeExampleDot}
            style={{ backgroundColor: "#50fa7b" }}
          ></span>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {codeTabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Code content with syntax highlighting */}
      <div className={styles.codeExampleContent}>
        <Highlight
          theme={customTheme}
          code={codeTabs.find((tab) => tab.id === activeTab)?.code || ""}
          language="tsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={styles.codeExample}
              style={{ ...style, borderRadius: 0, minHeight: `${minHeight}px` }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
