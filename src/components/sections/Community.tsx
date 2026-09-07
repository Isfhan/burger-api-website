import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MessageCircle, GitPullRequest, Newspaper, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Card } from "../ui";

interface CommunityLink {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  to?: string;
}

export function Community() {
  const { siteConfig } = useDocusaurusContext();
  const githubUrl =
    (siteConfig.customFields as { githubUrl?: string })?.githubUrl ||
    "https://github.com/isfhan/burger-api";

  const links: CommunityLink[] = [
    {
      icon: MessageCircle,
      title: "Discussions",
      description:
        "Ask questions, share ideas, and connect with other BurgerAPI developers.",
      href: `${githubUrl}/discussions`,
    },
    {
      icon: GitPullRequest,
      title: "Contribute",
      description:
        "Open pull requests, report bugs, and improve docs. Contributions are welcome.",
      href: `${githubUrl}/issues`,
    },
    {
      icon: Newspaper,
      title: "Blog",
      description:
        "Release notes and deep dives on how BurgerAPI is built and where it is headed.",
      to: "/blog",
    },
    {
      icon: Heart,
      title: "Open Source",
      description:
        "MIT licensed. Free to use in personal and commercial projects.",
      href: githubUrl,
    },
  ];

  return (
    <Section id="community">
      <SectionHeader
        eyebrow="Community"
        title="Build with the Bun community"
        subtitle="Join discussions, contribute code, and stay up to date with releases."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {links.map((link) => (
          <Card
            key={link.title}
            href={link.href}
            to={link.to}
            className="h-full"
          >
            <div className="mb-4 inline-flex text-brand-primary">
              <link.icon size={24} strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="text-card-title text-ink m-0 mb-2">{link.title}</h3>
            <p className="text-small text-ink-secondary m-0 leading-relaxed">
              {link.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
