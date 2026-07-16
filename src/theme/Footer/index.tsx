import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MascotImage } from "../../components/ui/MascotImage";

const docLinks = [
  { label: "Getting Started", to: "/docs/" },
  { label: "File Routing", to: "/docs/routing/file-based-routing" },
  { label: "Validation", to: "/docs/validation/zod" },
  { label: "Middleware", to: "/docs/middleware/global" },
  { label: "OpenAPI", to: "/docs/openapi/generation" },
  { label: "CLI", to: "/docs/cli/installation" },
];

const resourceLinks = [
  { label: "Architecture", to: "/docs/architecture/overview" },
  { label: "Performance", to: "/docs/performance/overview" },
  { label: "Examples", to: "/docs/examples/basic-route" },
  { label: "Blog", to: "/blog" },
];

export default function Footer(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const githubUrl =
    (siteConfig.customFields as { githubUrl?: string })?.githubUrl ||
    "https://github.com/isfhan/burger-api";
  const version =
    (siteConfig.customFields as { frameworkVersion?: string })
      ?.frameworkVersion || "0.11.0";

  return (
    <footer className="footer !bg-surface-secondary border-t border-surface-border">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <MascotImage size={48} />
              <span className="text-xl font-bold text-ink tracking-tight">
                BurgerAPI
              </span>
            </div>
            <p className="text-small text-ink-muted m-0 mb-4 leading-relaxed max-w-xs">
              Bun-native API framework with file-based routing, Zod validation,
              and automatic OpenAPI.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[12px] px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium">
                v{version}
              </span>
              <span className="text-[12px] px-2.5 py-1 rounded-full bg-brand-success/10 text-brand-success font-medium">
                MIT
              </span>
            </div>
          </div>

          <div>
            <h3 className="footer__title !normal-case !tracking-normal !text-base mb-4">
              Documentation
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {docLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="footer__link-item text-small no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer__title !normal-case !tracking-normal !text-base mb-4">
              Resources
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="footer__link-item text-small no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer__title !normal-case !tracking-normal !text-base mb-4">
              Community
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              <li>
                <a
                  href={githubUrl}
                  className="footer__link-item text-small no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`${githubUrl}/discussions`}
                  className="footer__link-item text-small no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href={`${githubUrl}/issues`}
                  className="footer__link-item text-small no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="footer__link-item text-small no-underline"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="footer__copyright m-0 text-center sm:text-left">
            © {new Date().getFullYear()} BurgerAPI. Built with care for the Bun
            community.
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-small text-ink-muted no-underline hover:text-brand-primary transition-colors"
          >
            github.com/isfhan/burger-api
          </a>
        </div>
      </div>
    </footer>
  );
}
