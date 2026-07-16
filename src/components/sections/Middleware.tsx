import React from "react";
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

const pipeline = [
  "Request",
  "Global middleware",
  "Route middleware",
  "Validation",
  "Handler",
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

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <ScrollReveal>
          <Card className="mb-6">
            <p className="text-small font-semibold text-ink mb-4 m-0">
              Request pipeline
            </p>
            <ol className="m-0 p-0 list-none flex flex-col gap-2">
              {pipeline.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-3 text-small text-ink-secondary"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary font-semibold text-[12px]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
          <Button to="/docs/middleware/global" variant="secondary">
            Middleware docs
          </Button>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <CodeBlock code={code} filename="api/admin/middleware.ts" />
        </ScrollReveal>
      </div>
    </Section>
  );
}
