import React, { useState } from "react";
import { BookOpen, BarChart3, ArrowRight, Cpu, MemoryStick, Layers, Gauge } from "lucide-react";
import { Section, SectionHeader, Button, Badge, BenchmarkBar } from "../ui";

// Mean of 3 consecutive `bun run battle --profile ci` runs in burger-api-benchmarks
// (128 connections, 8s duration, 2s warm-up each), averaged to smooth single-run
// scheduler noise on a shared desktop. Not synthetic or illustrative figures —
// see reports/battle/2026-09-07-avg3/ in that repo for the raw per-run data.
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
      { name: "Elysia", reqPerSec: 104103.35 },
      { name: "BurgerAPI", reqPerSec: 99572.17, highlight: true },
      { name: "Hono", reqPerSec: 98054.07 },
      { name: "Express", reqPerSec: 55815.14 },
    ],
  },
  {
    id: "routing-static",
    label: "Static routing",
    description: "GET /posts — no params, no validation, no I/O.",
    rows: [
      { name: "Elysia", reqPerSec: 111868.82 },
      { name: "BurgerAPI", reqPerSec: 104233.9, highlight: true },
      { name: "Hono", reqPerSec: 103928.46 },
      { name: "Express", reqPerSec: 62239.94 },
    ],
  },
  {
    id: "routing-param",
    label: "Dynamic routing",
    description: "GET /posts/:id — one path param to parse and match.",
    rows: [
      { name: "Elysia", reqPerSec: 110834.05 },
      { name: "Hono", reqPerSec: 104397.69 },
      { name: "BurgerAPI", reqPerSec: 98269.25, highlight: true },
      { name: "Express", reqPerSec: 59826.9 },
    ],
  },
  {
    id: "json-echo",
    label: "JSON serialization",
    description: "GET returning a JSON object — pure response overhead.",
    rows: [
      { name: "BurgerAPI", reqPerSec: 107109.39, highlight: true },
      { name: "Elysia", reqPerSec: 105568.64 },
      { name: "Hono", reqPerSec: 100512.62 },
      { name: "Express", reqPerSec: 57199.56 },
    ],
  },
  {
    id: "validation-body",
    label: "Zod validation",
    description: "POST with JSON body parsing + Zod validation, echoed back.",
    rows: [
      { name: "BurgerAPI", reqPerSec: 88676.15, highlight: true },
      { name: "Elysia", reqPerSec: 88141.89 },
      { name: "Hono", reqPerSec: 83377.51 },
      { name: "Express", reqPerSec: 43994.17 },
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
        eyebrow="Performance"
        title="Designed for the busy path"
        subtitle="Parse only what you need, share structure across requests, and dispatch on the fastest matching strategy. BurgerAPI beats Hono in 3 of 4 scenarios below, trails Elysia mostly on raw routing dispatch, and comes out fastest of the four once Zod validation is in the request path — all while running roughly 1.8x faster than Express throughout."
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
          {active.description} · mean of 3 runs · burger-api-benchmarks, 2026-09-07
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
