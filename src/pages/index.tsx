import type { ReactNode } from "react";
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

// Import homepage components
import { HomepageHero, HomepageFeatures } from "../components/Homepage";

export default function Home(): ReactNode {
  // Get the site config
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.projectName} description={siteConfig.tagline}>
      <main className={styles.mainContainer}>
        <HomepageHero />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
