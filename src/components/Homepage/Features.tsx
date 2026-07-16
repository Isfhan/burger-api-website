import React from "react";
import Heading from "@theme/Heading";
import styles from "../../pages/index.module.css";
import { FeatureItem } from "./FeatureItem";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGroup {
  label: string;
  features: Feature[];
}

export function HomepageFeatures() {
  const featureGroups: FeatureGroup[] = [
    {
      label: "Routing",
      features: [
        {
          icon: "📁",
          title: "File-Based Routing",
          description:
            "Define API endpoints and pages by organizing files and folders. Dynamic segments use [param] and wildcards use [...slug], so routes are declarative and convention-driven.",
        },
        {
          icon: "🔀",
          title: "Hybrid Router",
          description:
            "Combines a trie for dynamic and wildcard routes with Bun's native router for static paths, dispatching each request on the fastest matching strategy.",
        },
        {
          icon: "⚡",
          title: "Native Bun Routing",
          description:
            "Static routes are served through Bun's built-in HTTP router, avoiding a catch-all handler so static traffic stays as fast as the runtime allows.",
        },
      ],
    },
    {
      label: "Developer Experience",
      features: [
        {
          icon: "🔒",
          title: "Zod Validation",
          description:
            "Define Zod schemas next to your routes to validate params, query, and body with full type inference and clear error messages.",
        },
        {
          icon: "📝",
          title: "Automatic OpenAPI",
          description:
            "Generates an OpenAPI 3.0 document from your routes and Zod schemas, so the specification always matches the code.",
        },
        {
          icon: "🌐",
          title: "Swagger UI",
          description:
            "Ships an interactive Swagger UI so you can explore and try your API directly from the browser.",
        },
        {
          icon: "🧩",
          title: "Type Safety",
          description:
            "End-to-end TypeScript with inferred request types, so handlers know exactly what params, query, and body they receive.",
        },
      ],
    },
    {
      label: "Performance",
      features: [
        {
          icon: "🔍",
          title: "Lazy Query Parsing",
          description:
            "Query strings are parsed only when you read req.query, so requests that never use the query pay nothing for parsing.",
        },
        {
          icon: "🍔",
          title: "Shared Request Context",
          description:
            "Each request gets a single, lightweight context object built from a shared prototype, keeping memory overhead and allocations low.",
        },
        {
          icon: "🚀",
          title: "Efficient Request Processing",
          description:
            "A single pipeline handles middleware, validation, and responses with minimal allocations, so steady-state latency stays predictable.",
        },
      ],
    },
    {
      label: "Production",
      features: [
        {
          icon: "⚙️",
          title: "Middleware",
          description:
            "Apply global or route-specific middleware that can continue, short-circuit, or transform the response — useful for auth, logging, and CORS.",
        },
        {
          icon: "✅",
          title: "Validation",
          description:
            "Validation runs as part of the request pipeline, returning structured errors before your handler executes.",
        },
        {
          icon: "🛡️",
          title: "Error Handling",
          description:
            "Centralized error handling turns thrown errors and validation failures into consistent responses across every route.",
        },
      ],
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        {featureGroups.map((group) => (
          <div key={group.label} className={styles.featureGroup}>
            <Heading as="h2" className={styles.featuresTitle}>
              {group.label}
            </Heading>
            <div className={styles.featuresGrid}>
              {group.features.map((feature, idx) => (
                <FeatureItem key={idx} {...feature} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
