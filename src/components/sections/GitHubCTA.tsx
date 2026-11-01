import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { GitBranch, Star } from "lucide-react";
import {
  Section,
  Button,
  MascotImage,
  GitHubStars,
  Card,
} from "../ui";

export function GitHubCTA() {
  const { siteConfig } = useDocusaurusContext();
  const githubUrl =
    (siteConfig.customFields as { githubUrl?: string })?.githubUrl ||
    "https://github.com/isfhan/burger-api";

  return (
    <Section id="github" secondary>
      <Card glass className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">
        <MascotImage size={140} className="shrink-0 drop-shadow-lg" />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-section text-ink tracking-tight m-0 mb-3">
            Star us on GitHub
          </h2>
          <p className="text-body text-ink-secondary m-0 mb-6 max-w-lg">
            BurgerAPI is open source under the MIT license. Star the repo,
            open issues, and help shape the framework.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Button href={githubUrl} size="lg" variant="primary">
              <GitBranch size={18} aria-hidden />
              View Repository
            </Button>
            <GitHubStars showLabel />
            <span className="inline-flex items-center gap-1 text-small text-ink-muted">
              <Star size={14} className="text-brand-primary" aria-hidden />
              Show your support
            </span>
          </div>
        </div>
      </Card>
    </Section>
  );
}
