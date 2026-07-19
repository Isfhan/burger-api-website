import React from "react";
import { ShieldCheck, ArrowRight, Zap, GitBranch, Filter, ShieldCheck as Shield, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, CodeBlock, ScrollReveal, Button, Card } from "../ui";

const code = `import type { BurgerRequest } from "burger-api";

export async function middleware(req: BurgerRequest) {
  const token = req.headers.get("authorization");
  if (!token) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  // Continue to the next middleware or handler
}`;

const pipeline: { label: string; icon: LucideIcon }[] = [
  { label: "Request", icon: Zap },
  { label: "Global middleware", icon: GitBranch },
  { label: "Route middleware", icon: Filter },
  { label: "Validation", icon: Shield },
  { label: "Handler", icon: Code2 },
];

export function Middleware() {
  return (
    <Section id="middleware">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Middleware"
          title="Compose auth, logging, and CORS"
          subtitle="Apply middleware globally or per route. Return a Response to short-circuit, or continue down the pipeline."
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
          <CodeBlock code={code} filename="api/admin/middleware.ts" />
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <Button to="/docs/middleware/global" variant="secondary">
            <ShieldCheck size={16} aria-hidden />
            Middleware docs
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
