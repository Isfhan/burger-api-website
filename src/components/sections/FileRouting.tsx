import React from "react";
import { Section, SectionHeader, CodeBlock, ScrollReveal, Button, Card } from "../ui";

const tree = `api/
├── route.ts                 →  GET /
├── users/
│   └── route.ts             →  GET /users
├── users/[id]/
│   └── route.ts             →  GET /users/:id
└── docs/[...slug]/
    └── route.ts             →  GET /docs/*`;

const routeCode = `// api/users/[id]/route.ts
import type { BurgerRequest } from "burger-api";

export async function GET(req: BurgerRequest) {
  const { id } = req.params;
  return Response.json({ id });
}`;

export function FileRouting() {
  return (
    <Section id="routing">
      <ScrollReveal>
        <SectionHeader
          eyebrow="File Routing"
          title="Routes that match your folders"
          subtitle="Organize your API directory and BurgerAPI maps files to endpoints. Use [param] for dynamic segments and [...slug] for wildcards."
        />
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <ScrollReveal>
          <Card className="!p-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-border bg-surface-secondary">
              <span className="text-small font-semibold text-ink">
                File → URL mapping
              </span>
            </div>
            <pre className="m-0 p-5 font-mono text-[13px] leading-relaxed text-ink-secondary overflow-x-auto">
              {tree}
            </pre>
          </Card>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <CodeBlock code={routeCode} filename="api/users/[id]/route.ts" />
          <div className="mt-6">
            <Button to="/docs/routing/file-based-routing" variant="secondary">
              File-based routing docs
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
