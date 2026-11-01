import React from "react";
import {
  Sparkles,
  RefreshCw,
  Terminal,
  FileCode2,
  Type,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "../ui";

const items: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Type,
    title: "Inferred Types",
    description:
      "Validated data flows into your handlers with full TypeScript inference, so there's no manual typing for params, query, or body.",
  },
  {
    icon: RefreshCw,
    title: "Bun Hot Reload",
    description:
      "Develop with Bun's native watch mode. Change a route file and see updates immediately.",
  },
  {
    icon: Terminal,
    title: "CLI Scaffolding",
    description:
      "Create projects, add routes, and run the server with burger-api CLI commands.",
  },
  {
    icon: FileCode2,
    title: "Colocated Schemas",
    description:
      "Validation schemas live next to route handlers. Everything for a route stays in one place.",
  },
  {
    icon: BookOpen,
    title: "Zero-Config OpenAPI",
    description:
      "Turn on OpenAPI and get a live Swagger UI generated from your routes and schemas.",
  },
  {
    icon: Sparkles,
    title: "Clear Errors",
    description:
      "Validation failures and thrown errors become consistent JSON responses across every route.",
  },
];

export function DeveloperExperience() {
  return (
    <Section id="dx">
      <SectionHeader
        eyebrow="Developer Experience"
        title="Built for how you actually work"
        subtitle="Fewer config files. Stronger types. Tools that stay out of your way until you need them."
      />
      <div className="sm:grid sm:grid-cols-2 sm:gap-x-10 border-b border-surface-divider">
        {items.map((item) => (
          <div key={item.title} className="ba-menu-row">
            <item.icon size={20} strokeWidth={1.75} className="ba-menu-row__icon" aria-hidden />
            <div>
              <h3 className="text-card-title text-ink m-0 mb-1">{item.title}</h3>
              <p className="text-small text-ink-secondary m-0 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
