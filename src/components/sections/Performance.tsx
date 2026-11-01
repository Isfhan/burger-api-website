import React from "react";
import { BookOpen, BarChart3, ArrowRight } from "lucide-react";
import { Section, SectionHeader, Button } from "../ui";

export function Performance() {
  return (
    <Section id="performance">
      <SectionHeader
        eyebrow="Performance"
        title="Designed for the busy path"
        subtitle="Parse only what you need, share structure across requests, and dispatch on the fastest matching strategy. Routes resolve through Bun's native router first, hook chains flatten once at boot, and validators are compiled once and cached."
      />

      <p className="max-w-2xl mx-auto text-center text-ink-muted leading-relaxed m-0">
        Measured numbers live in{" "}
        <a
          href="https://github.com/isfhan/burger-api-benchmarks"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary no-underline hover:underline"
        >
          burger-api-benchmarks
        </a>
        , the dedicated repository that holds the harness, the methodology, and
        dated raw reports, so results can be reproduced rather than taken on
        faith.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-10">
        <Button to="/docs/performance/overview" variant="secondary">
          <BookOpen size={16} aria-hidden />
          Read the performance philosophy
          <ArrowRight
            size={16}
            className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
        <Button
          href="https://github.com/isfhan/burger-api-benchmarks"
          variant="secondary"
        >
          <BarChart3 size={16} aria-hidden />
          Benchmarks repository
          <ArrowRight
            size={16}
            className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </div>
    </Section>
  );
}
