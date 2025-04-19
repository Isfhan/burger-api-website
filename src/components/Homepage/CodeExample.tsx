import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import styles from "../../pages/index.module.css";

// A simple example showing how to set up a Burger API server
const exampleCode = `// Step 1: Import the necessary modules
import { Burger } from 'burger-api';

// Step 2: Create and configure your API server
const burger = new Burger({
  apiDir: "api", // Where your API routes are
});

// Step 3: Start the server on port 4000
burger.serve(4000);`;

// Custom colors for better code readability
const customTheme = {
  ...themes.vsDark,
  plain: {
    ...themes.vsDark.plain,
  },
};

// Component that displays the code example with syntax highlighting
export function CodeExample() {
  return (
    <div className={styles.codeExampleContainer}>
      {/* Terminal-style window controls */}
      <div className={styles.codeExampleHeader}>
        <span
          className={styles.codeExampleDot}
          style={{ backgroundColor: "#ff5555" }} // Changed to a brighter red
        ></span>
        <span
          className={styles.codeExampleDot}
          style={{ backgroundColor: "#f1fa8c" }} // Changed to a brighter yellow
        ></span>
        <span
          className={styles.codeExampleDot}
          style={{ backgroundColor: "#50fa7b" }} // Changed to match the string color
        ></span>
      </div>

      {/* Code content with syntax highlighting */}
      <div className={styles.codeExampleContent}>
        <Highlight theme={customTheme} code={exampleCode} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={styles.codeExample} style={style}>
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
