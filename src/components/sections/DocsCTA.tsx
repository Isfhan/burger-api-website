import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Section, ScrollReveal, Button, GradientBackground } from "../ui";

export function DocsCTA() {
  return (
    <Section id="docs-cta" className="!py-16 md:!py-20" containerClassName="relative">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-hero border border-surface-border bg-surface-card shadow-ba-md px-8 py-12 md:px-16 md:py-16 text-center">
          <GradientBackground variant="subtle" className="opacity-60" />
          <div className="relative">
            <div className="mx-auto mb-5 inline-flex w-14 h-14 items-center justify-center rounded-card bg-brand-primary/10 text-brand-primary">
              <BookOpen size={28} strokeWidth={1.75} aria-hidden />
            </div>
            <h2 className="text-section text-ink tracking-tight m-0 mb-4">
              Ready to dig into the docs?
            </h2>
            <p className="text-body text-ink-secondary m-0 mb-8 max-w-xl mx-auto">
              Guides, API reference, examples, and tutorials — everything you
              need to build production APIs with BurgerAPI.
            </p>
            <Button to="/docs/" size="lg" variant="primary">
              Open Documentation
              <ArrowRight
                size={18}
                className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
