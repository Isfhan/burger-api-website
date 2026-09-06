import React from "react";
import { ShieldCheck, ArrowRight, Zap, Filter, Workflow, Code2, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, CodeBlock, ScrollReveal, Button } from "../ui";

const code = `// src/hooks.ts: global lifecycle hooks
import type { BurgerContext } from "burger-api";

export const onRequest = [
  (ctx: BurgerContext) => {
    ctx.headers.set("x-request-id", crypto.randomUUID());
  },
];

export const beforeRoute = [
  (ctx: BurgerContext) => {
    if (!ctx.headers.get("authorization")) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  },
];`;

const pipeline: { label: string; icon: LucideIcon }[] = [
  { label: "Request", icon: Zap },
  { label: "onRequest", icon: Network },
  { label: "transform", icon: Workflow },
  { label: "Validation", icon: ShieldCheck },
  { label: "beforeRoute", icon: Filter },
  { label: "Handler", icon: Code2 },
];

export function Lifecycle() {
  return (
    <Section id="lifecycle">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Lifecycle hooks"
          title="Compose auth, logging, and CORS"
          subtitle="Six named hooks control every request: onRequest, transform, beforeRoute, afterRoute, mapResponse, and onError. Return a Response to short-circuit, or continue down the pipeline."
        />
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <ScrollReveal>
          <div className="ba-pipeline">
            {pipeline.map((step, i) => (
              <div key={step.label} className="ba-pipeline__step">
                <div className="ba-pipeline__node">
                  <step.icon size={18} strokeWidth={1.75} aria-hidden />
                </div>
                <div className="ba-pipeline__body">
                  <span className="ba-pipeline__index">0{i + 1}</span>
                  <span className="text-card-title text-ink font-semibold">
                    {step.label}
                  </span>
                </div>
                {i < pipeline.length - 1 && (
                  <span className="ba-pipeline__connector" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <CodeBlock code={code} filename="src/hooks.ts" />
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <Button to="/docs/hooks/system" variant="secondary">
            <ShieldCheck size={16} aria-hidden />
            Hooks docs
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
