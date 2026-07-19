import React from "react";
import { Star } from "lucide-react";
import { usePluginData } from "@docusaurus/useGlobalData";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

interface GitHubStarsProps {
  className?: string;
  showLabel?: boolean;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function useGitHubStars(): number {
  const { siteConfig } = useDocusaurusContext();
  const fallback =
    (siteConfig.customFields as { githubStars?: number })?.githubStars ?? 180;

  let pluginStars: number | undefined;
  try {
    const data = usePluginData("github-stars-plugin") as
      | { githubStars?: number }
      | undefined;
    pluginStars = data?.githubStars;
  } catch {
    pluginStars = undefined;
  }

  return pluginStars ?? fallback;
}

export function GitHubStars({ className, showLabel = true }: GitHubStarsProps) {
  const { siteConfig } = useDocusaurusContext();
  const stars = useGitHubStars();

  const githubUrl =
    (siteConfig.customFields as { githubUrl?: string })?.githubUrl ||
    "https://github.com/isfhan/burger-api";

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-small font-medium",
        "border border-surface-border bg-surface-card text-ink-secondary",
        "no-underline transition-[border-color,background-color,color] duration-150 ease-out hover:border-brand-primary/40",
        className
      )}
      aria-label={`${stars} GitHub stars`}
    >
      <Star size={14} className="text-brand-primary fill-brand-primary" aria-hidden />
      <span className="tabular-nums">{formatStars(stars)}</span>
      {showLabel && <span className="text-ink-muted">stars</span>}
    </a>
  );
}
