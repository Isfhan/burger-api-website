import React from "react";
import { Search, Boxes, Workflow, BookOpen, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Card, ScrollReveal, Button } from "../ui";

const cards: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "Lazy Query Parsing",
    description:
      "Query strings are parsed only when you read req.query. Requests that never use the query pay nothing for parsing.",
  },
  {
    icon: Boxes,
    title: "Shared Request Context",
    description:
      "Each request gets a single lightweight context object. The structure is shared across requests to keep memory use predictable.",
  },
  {
    icon: Workflow,
    title: "Efficient Pipeline",
    description:
      "Middleware, validation, and responses run in one pipeline with minimal allocations so steady-state latency stays consistent.",
  },
];

export function Performance() {
  return (
    <Section id="performance">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Performance"
          title="Designed for the busy path"
          subtitle="BurgerAPI keeps request handling lean: parse only what you need, share structure across requests, and dispatch on the fastest matching strategy."
        />
      </ScrollReveal>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {cards.map((c, i) => (
          <ScrollReveal key={c.title} delay={i * 0.05}>
            <Card className="h-full">
              <div className="mb-4 inline-flex w-11 h-11 items-center justify-center rounded-button bg-brand-secondary/10 text-brand-secondary">
                <c.icon size={22} strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="text-card-title text-ink m-0 mb-2">{c.title}</h3>
              <p className="text-small text-ink-secondary m-0 leading-relaxed">
                {c.description}
              </p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <div className="text-center mt-2">
          <Button to="/docs/performance/overview" variant="secondary">
            <BookOpen size={16} aria-hidden />
            Read the performance philosophy
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
