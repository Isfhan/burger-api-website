import React, { useState } from "react";
import { BookOpen, BarChart3, ArrowRight, Cpu, MemoryStick, Layers, Gauge } from "lucide-react";
import { Section, SectionHeader, Button, Badge, BenchmarkBar } from "../ui";

// Real numbers from a committed run of burger-api-benchmarks' battle suite
// (bun run battle --profile full), not synthetic or illustrative figures.
// Regenerate with the same command to reproduce.
const SCENARIOS: {
  id: string;
  label: string;
  description: string;
  rows: { name: string; reqPerSec: number; highlight?: boolean }[];
}[] = [
  {
    id: "average",
    label: "Average",
    description: "Mean requests/sec across all 4 scenarios below.",
    rows: [
      { name: "Elysia", reqPerSec: 110160.99 },
      { name: "Hono", reqPerSec: 108323.05 },
      { name: "BurgerAPI", reqPerSec: 107769.72, highlight: true },
      { name: "Express", reqPerSec: 59749.72 },
    ],
  },
  {
    id: "routing-static",
    label: "Static routing",
    description: "GET /posts — no params, no validation, no I/O.",
    rows: [
      { name: "Elysia", reqPerSec: 113944.17 },
      { name: "Hono", reqPerSec: 113206.39 },
      { name: "BurgerAPI", reqPerSec: 108050.09, highlight: true },
      { name: "Express", reqPerSec: 65897.07 },
    ],
  },
  {
    id: "routing-param",
    label: "Dynamic routing",
    description: "GET /posts/:id — one path param to parse and match.",
    rows: [
      { name: "Elysia", reqPerSec: 112650.56 },
      { name: "Hono", reqPerSec: 112582.76 },
      { name: "BurgerAPI", reqPerSec: 105875.94, highlight: true },
      { name: "Express", reqPerSec: 63508.69 },
    ],
  },
  {
    id: "json-echo",
    label: "JSON serialization",
    description: "GET returning a JSON object — pure response overhead.",
    rows: [
      { name: "BurgerAPI", reqPerSec: 115188.5, highlight: true },
      { name: "Hono", reqPerSec: 114198.86 },
      { name: "Elysia", reqPerSec: 113137.99 },
      { name: "Express", reqPerSec: 64042.26 },
    ],
  },
  {
    id: "validation-body",
    label: "Zod validation",
    description: "POST with JSON body parsing + Zod validation, echoed back.",
    rows: [
      { name: "BurgerAPI", reqPerSec: 101964.36, highlight: true },
      { name: "Elysia", reqPerSec: 100911.28 },
      { name: "Hono", reqPerSec: 93304.2 },
      { name: "Express", reqPerSec: 45550.85 },
    ],
  },
];

const HARDWARE = [
  { icon: Cpu, label: "Intel Core i5-14400F" },
  { icon: Layers, label: "16 threads" },
  { icon: MemoryStick, label: "32 GB RAM" },
  { icon: Gauge, label: "Bun 1.4.0 · win32/x64" },
];

export function Performance() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  return (
    <Section id="performance">
      <SectionHeader
        title="Designed for the busy path"
        subtitle="Parse only what you need, share structure across requests, and dispatch on the fastest matching strategy. BurgerAPI leads on JSON serialization and Zod validation, trails Elysia and Hono by a few percent on raw routing, and is roughly 1.7-2x faster than Express everywhere."
      />

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {HARDWARE.map((h) => (
          <Badge key={h.label} icon={h.icon} variant="muted">
            {h.label}
          </Badge>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-1.5 mb-6" role="tablist" aria-label="Benchmark scenario">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === activeId}
              onClick={() => setActiveId(s.id)}
              className={
                "px-3 py-1.5 rounded-full text-small font-medium border-0 cursor-pointer transition-colors duration-150 " +
                (s.id === activeId
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "bg-transparent text-ink-muted hover:text-ink-secondary")
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        <BenchmarkBar rows={active.rows} />

        <p className="text-small text-ink-muted mt-6 text-center min-h-[2.5em]">
          {active.description} · burger-api-benchmarks, 2026-09-06
        </p>
      </div>

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
        <Button to="/docs/advanced/benchmarks" variant="secondary">
          <BarChart3 size={16} aria-hidden />
          See the benchmarks
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
