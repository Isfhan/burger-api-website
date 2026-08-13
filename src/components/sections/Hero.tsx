import React, { useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Zap, Scale, GitBranch, BookOpen, Zap as ZapIcon, ArrowRight } from "lucide-react";
import {
  Badge,
  Button,
  GradientBackground,
  GitHubStars,
  CodeBlock,
  ScrollReveal,
} from "../ui";


interface CustomFields {
  license?: string;
  bunVersion?: string;
  frameworkVersion?: string;
  getStartedUrl?: string;
  githubUrl?: string;
}

const heroTabs = [
  {
    id: "server",
    title: "server.ts",
    code: `import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "api",
});

burger.serve(4000);`,
  },
  {
    id: "route",
    title: "api/route.ts",
    code: `import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  return Response.json({
    message: "Hello from BurgerAPI",
  });
}`,
  },
];

export function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const fields = siteConfig.customFields as CustomFields;
  const [activeTab, setActiveTab] = useState(heroTabs[0].id);
  const active = heroTabs.find((t) => t.id === activeTab) ?? heroTabs[0];

  return (
    <header className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <GradientBackground variant="hero" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ScrollReveal>
            <div className="flex flex-col items-start">

              <div className="mb-6 flex items-end gap-0 ml-[-20px]">
                <img
                  src="/img/android-chrome-192x192.png"
                  alt="BurgerAPI"
                  width={96}
                  height={96}
                  className="drop-shadow-ba-md"
                />
                <h1 className="text-hero text-ink tracking-tight m-0">
                  Burger<span className="">API</span>
                </h1>
              </div>

              <p className="text-body text-ink-secondary m-0 mb-6  max-w-xl leading-relaxed">
               BurgerAPI is a Bun-first TypeScript framework for building modern APIs — with file-based routing, end-to-end type safety, validation, WebSocket, plugins, and automatic OpenAPI. Run it on Bun, or ship the same app to the edge.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge icon={ZapIcon}>Bun Native</Badge>
                <Badge icon={Scale} variant="success">
                  MIT
                </Badge>
                <Badge variant="muted">Open Source</Badge>

                <Badge variant="muted">
                  v{fields.frameworkVersion || "1.0.0"}
                </Badge>
                <Badge icon={Zap} variant="info">
                  {fields.bunVersion || "Bun 1.3.0+"}
                </Badge>
                <GitHubStars />
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  to={fields.getStartedUrl || "/docs/"}
                  size="lg"
                  variant="primary"
                >
                  <BookOpen size={18} aria-hidden />
                  Get Started
                </Button>
                <Button
                  href={
                    fields.githubUrl || "https://github.com/isfhan/burger-api"
                  }
                  size="lg"
                  variant="secondary"
                >
                  <GitBranch size={18} aria-hidden />
                  View on GitHub
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-hero border border-surface-border shadow-ba-lg overflow-hidden bg-[#0d0d0f]">
              <CodeBlock
                code={active.code}
                language="tsx"
                tabs={heroTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                className="!rounded-none !border-0 !shadow-none"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </header>
  );
}
