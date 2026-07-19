import React from "react";
import { FileJson, Globe, RefreshCw, ArrowRight } from "lucide-react";
import { Section, SectionHeader, Card, ScrollReveal, Button, StaggerChildren } from "../ui";

const points = [
  {
    icon: FileJson,
    title: "Generated from code",
    description:
      "Routes and Zod schemas become an OpenAPI 3.0 document. No separate YAML to maintain.",
  },
  {
    icon: Globe,
    title: "Swagger UI included",
    description:
      "Explore and try your API in the browser with the built-in Swagger UI.",
  },
  {
    icon: RefreshCw,
    title: "Always in sync",
    description:
      "When you change a schema or route, the OpenAPI document updates with your next run.",
  },
];

export function OpenAPI() {
  return (
    <Section id="openapi" secondary>
      <ScrollReveal>
        <SectionHeader
          eyebrow="OpenAPI"
          title="Documentation that writes itself"
          subtitle="Turn on OpenAPI once. BurgerAPI generates the specification and serves an interactive API explorer."
        />
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-3 gap-5 mb-10">
        {points.map((p) => (
          <Card key={p.title} className="h-full text-center">
            <div className="mx-auto mb-4 inline-flex w-12 h-12 items-center justify-center rounded-card bg-brand-primary/10 text-brand-primary">
              <p.icon size={24} strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="text-card-title text-ink m-0 mb-2">{p.title}</h3>
            <p className="text-small text-ink-secondary m-0 leading-relaxed">
              {p.description}
            </p>
          </Card>
        ))}
      </StaggerChildren>

      <ScrollReveal>
        <div className="text-center">
          <Button to="/docs/openapi/generation" variant="secondary" className="mt-2">
            <FileJson size={16} aria-hidden />
            OpenAPI documentation
            <ArrowRight
              size={16}
              className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  );
}
