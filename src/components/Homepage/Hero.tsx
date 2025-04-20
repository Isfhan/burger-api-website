import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import styles from "../../pages/index.module.css";
import { CodeExample } from "./CodeExample";
import { IoConstructSharp } from "react-icons/io5";
import { TbLicense } from "react-icons/tb";
import { SiBun } from "react-icons/si";

// Type definition for custom fields
interface CustomFields {
  status?: string;
  license?: string;
  bunVersion?: string;
  getStartedUrl?: string;
  githubUrl?: string;
}

export function HomepageHero() {
  // Get the site config
  const { siteConfig } = useDocusaurusContext();
  // Type assertion for customFields
  const customFields = siteConfig.customFields as CustomFields;

  return (
    <header className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            {/* Brand Name and Logo */}
            <Heading as="h1" className={styles.heroTitle}>
              <img
                src="/img/android-chrome-192x192.png"
                alt="Burger API Logo"
                className={styles.heroLogo}
              />
              {siteConfig.title}
            </Heading>

            {/* Tagline */}
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

            {/* Development Status */}
            <div className={styles.developmentStatus}>
              {/* Status Badge */}
              <span className={styles.statusBadge}>
                <IoConstructSharp size={15} />
                {customFields?.status || "Under Development"}
              </span>

              {/* License Badge */}
              <span className={styles.licenseBadge}>
                <TbLicense size={15} /> {customFields?.license || "MIT License"}
              </span>

              {/* Version Badge */}
              <span className={styles.versionBadge}>
                <SiBun size={15} /> {customFields?.bunVersion || "Bun 1.2.4+"}
              </span>
            </div>

            {/* Buttons */}
            <div className={styles.heroButtons}>
              {/* Get Started Button */}
              <Link
                className={clsx(
                  "button button--primary button--lg",
                  styles.getStartedButton
                )}
                to={customFields?.getStartedUrl || "/docs"}
              >
                Get Started
              </Link>
              {/* GitHub Button */}
              <Link
                className={clsx(
                  "button button--outline button--lg",
                  styles.githubButton
                )}
                to={customFields?.githubUrl || "https://github.com"}
              >
                View on GitHub
              </Link>
            </div>
          </div>
          {/* Code Example */}
          <div className={styles.heroCodeExample}>
            <CodeExample />
          </div>
        </div>
      </div>
    </header>
  );
}
