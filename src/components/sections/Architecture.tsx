import React from "react";
import { ArrowRight, Network } from "lucide-react";
import { Section, SectionHeader, ScrollReveal, Button, Card } from "../ui";

const steps = [
  { label: "Request", desc: "Bun receives HTTP" },
  { label: "Router", desc: "Static or dynamic match" },
  { label: "Middleware", desc: "Global & route-level" },
  { label: "Validation", desc: "Zod schemas" },
  { label: "Handler", desc: "Your route logic" },
  { label: "Response", desc: "JSON, stream, or HTML" },
];

export function Architecture() {
  return (
    <Section id="architecture" secondary>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Architecture"
          title="A clear request lifecycle"
          subtitle="Every request follows the same predictable path — easy to understand, easy to debug, and ready for production."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Card glass className="p-6 md:p-8 mb-10">
          <div className="flex flex-wrap items-stretch justify-center gap-2 md:gap-0">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center text-center min-w-[100px] px-2 py-3">
                  <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/15 text-small font-bold text-brand-primary">
                    {i + 1}
                  </span>
                  <span className="text-small font-semibold text-ink">
                    {step.label}
                  </span>
                  <span className="text-[12px] text-ink-muted mt-0.5">
                    {step.desc}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center text-brand-primary/50 px-1">
                    <ArrowRight size={18} aria-hidden />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      <ScrollReveal>
        <div className="text-center">
          <Button to="/docs/architecture/overview" variant="secondary" className="mt-2">
            <Network size={16} aria-hidden />
            Explore the architecture
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
