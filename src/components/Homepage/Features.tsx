import React from "react";
import Heading from "@theme/Heading";
import styles from "../../pages/index.module.css";
import { FeatureItem } from "./FeatureItem";

export function HomepageFeatures() {
  const features = [
    {
      icon: "⚡",
      title: "Bun-Native Performance",
      description:
        "Utilizes Bun's high-performance HTTP server to provide rapid API responses also use others Bun's native APIs for outstanding speed and efficiency.",
    },
    {
      icon: "📁",
      title: "File-Based Routing",
      description:
        "Automatically registers APIs and static pages routes from your file structure using a clear naming convention. Supports dynamic routes via folder names like [id] for /api/product/:id.",
    },
    {
      icon: "⚙️",
      title: "Middleware Architecture",
      description:
        "Supports both global and route-specific middleware with a familiar req, res, next pattern. Chain multiple middleware functions to process requests before they reach your route handlers.",
    },
    {
      icon: "🔒",
      title: "Type-Safe Validation",
      description:
        "Utilizes Zod for request validation, ensuring full type safety and automatic error reporting. Validates request params, query, and body with support for preprocessing.",
    },
    {
      icon: "📝",
      title: "Automatic OpenAPI Generation",
      description:
        "Generates a complete OpenAPI 3.0 specification directly from your routes and Zod schemas. Includes support for tags, summaries, descriptions, and more.",
    },
    {
      icon: "🌐",
      title: "Swagger UI Integration",
      description:
        "Provides an out-of-the-box Swagger UI endpoint for interactive API documentation. Access your API documentation at /docs with a fully interactive interface.",
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <Heading as="h2" className={styles.featuresTitle}>
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          Features
        </Heading>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <FeatureItem key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
