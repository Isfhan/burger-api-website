import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ArrowUpRight, Star } from "lucide-react";
import { MascotImage } from "../../components/ui/MascotImage";
import { GitHubStars } from "../../components/ui/GitHubStars";

const docLinks = [
  { label: "Getting Started", to: "/docs/" },
  { label: "Routing", to: "/docs/routing/file-based-routing" },
  { label: "Validation", to: "/docs/validation/zod" },
  { label: "Middleware", to: "/docs/middleware/global" },
  { label: "OpenAPI", to: "/docs/openapi/generation" },
];

const resourceLinks = [
  { label: "CLI", to: "/docs/cli/installation" },
  { label: "API Reference", to: "/docs/" },
  { label: "Examples", to: "/docs/examples/basic-route" },
  { label: "Architecture", to: "/docs/architecture/overview" },
  { label: "Performance", to: "/docs/performance/overview" },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/isfhan/burger-api" },
  { label: "Discussions", href: "https://github.com/isfhan/burger-api/discussions" },
  { label: "Issues", href: "https://github.com/isfhan/burger-api/issues" },
  { label: "Blog", to: "/blog" },
];

const projectLinks = [
  { label: "License", href: "https://github.com/isfhan/burger-api/blob/main/LICENSE" },
  { label: "Contributing", href: "https://github.com/isfhan/burger-api/blob/main/CONTRIBUTING.md" },
  { label: "Benchmarks", href: "https://github.com/isfhan/burger-api-benchmarks" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to?: string; href?: string }[];
}) {
  return (
    <div>
      <h3 className="footer__title !normal-case !tracking-normal mb-4">
        {title}
      </h3>
      <ul className="list-none m-0 p-0 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.to ?? link.href}>
            {link.href ? (
              <a
                href={link.href}
                className="footer__col-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <ArrowUpRight className="footer__arrow" aria-hidden />
              </a>
            ) : (
              <Link to={link.to!} className="footer__col-link">
                {link.label}
                <ArrowUpRight className="footer__arrow" aria-hidden />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const githubUrl =
    (siteConfig.customFields as { githubUrl?: string })?.githubUrl ||
    "https://github.com/isfhan/burger-api";
  const version =
    (siteConfig.customFields as { frameworkVersion?: string })
      ?.frameworkVersion || "0.11.0";

  return (
    <footer className="footer ba-footer">
      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Level 1 — brand */}
        <div className="flex flex-col md:flex-row md:items-start gap-12 mb-14">
          <div className="md:max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <MascotImage size={44} className="shrink-0" />
              <span className="text-xl font-bold text-ink tracking-tight">
                BurgerAPI
              </span>
            </div>
            <p className="text-[15px] text-ink-muted m-0 mb-5 leading-relaxed">
              Bun-native API framework with file-based routing, schema
              validation, and automatic OpenAPI.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium">
                v{version}
              </span>
              <span className="text-[12px] px-2.5 py-1 rounded-full bg-brand-success/10 text-brand-success font-medium">
                MIT
              </span>
              <GitHubStars showLabel />
            </div>
          </div>

          {/* Level 2 — navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 flex-1">
            <FooterColumn title="Documentation" links={docLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Community" links={communityLinks} />
            <FooterColumn title="Project" links={projectLinks} />
          </div>
        </div>

        {/* Level 3 — bottom bar */}
        <div className="footer__bottom pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-small text-ink-muted">
            <span>© {new Date().getFullYear()} BurgerAPI</span>
            <span className="hidden sm:inline text-ink-muted/50">·</span>
            <span>MIT Licensed</span>
            <span className="hidden sm:inline text-ink-muted/50">·</span>
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="text-brand-primary" aria-hidden />
              Built with Bun
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
