import React, { useState } from "react";
import clsx from "clsx";
import { Section, SectionHeader, CodeBlock, ScrollReveal } from "../ui";

interface Example {
  id: string;
  label: string;
  filename?: string;
  code?: string;
  tabs?: { id: string; title: string; code: string }[];
}

const examples: Example[] = [
  {
    id: "server",
    label: "Server",
    filename: "server.ts",
    code: `import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "./src/api",
});

burger.serve(4000);`,
  },
  {
    id: "route",
    label: "Route",
    filename: "api/users/route.ts",
    code: `import type { BurgerContext } from "burger-api";

export async function GET(ctx: BurgerContext) {
  const { page = "1" } = ctx.query;
  return Response.json({ page, users: [] });
}

export async function POST(ctx: BurgerContext) {
  const body = await ctx.json();
  return Response.json(body, { status: 201 });
}`,
  },
  {
    id: "validation",
    label: "Validation",
    tabs: [
      {
        id: "schema",
        title: "schema.ts",
        code: `// api/products/[id]/schema.ts
import { z } from "zod";

export const GET = {
  params: z.object({ id: z.string().uuid() }),
};

export const PUT = {
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name: z.string().min(1),
    price: z.number().positive(),
  }),
};`,
      },
      {
        id: "route",
        title: "route.ts",
        code: `// api/products/[id]/route.ts
import { defineRoute } from "burger-api";
import { PUT as PutSchema } from "./schema";

export const PUT = defineRoute(PutSchema, (ctx) => {
  const { id } = ctx.validated.params;
  const { name, price } = ctx.validated.body;
  return Response.json({ id, name, price });
});`,
      },
    ],
  },
];

export function CodeExamples() {
  const [active, setActive] = useState(examples[0].id);
  const [innerTab, setInnerTab] = useState<string>("schema");
  const current = examples.find((e) => e.id === active) ?? examples[0];

  const selectExample = (id: string) => {
    setActive(id);
    setInnerTab(examples.find((e) => e.id === id)?.tabs?.[0]?.id ?? "schema");
  };

  const inner =
    current.tabs?.find((t) => t.id === innerTab) ?? current.tabs?.[0];

  return (
    <Section id="examples">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Code"
          title="From file to endpoint in minutes"
          subtitle="Three patterns you will use every day — start the server, define a route, and validate with Zod."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="max-w-3xl mx-auto">
          <div
            className="flex gap-1 p-1 mb-4 rounded-button bg-surface-secondary border border-surface-border w-fit mx-auto"
            role="tablist"
            aria-label="Code examples"
          >
            {examples.map((ex) => (
              <button
                key={ex.id}
                type="button"
                role="tab"
                aria-selected={active === ex.id}
                onClick={() => selectExample(ex.id)}
                className={clsx(
                  "px-4 py-2 rounded-[10px] text-small font-medium border-0 cursor-pointer transition-all duration-150",
                  active === ex.id
                    ? "bg-surface-card text-ink shadow-ba-sm"
                    : "bg-transparent text-ink-muted hover:text-ink"
                )}
              >
                {ex.label}
              </button>
            ))}
          </div>
          {current.tabs && inner ? (
            <CodeBlock
              code={inner.code}
              language="tsx"
              tabs={current.tabs}
              activeTab={innerTab}
              onTabChange={setInnerTab}
            />
          ) : (
            <CodeBlock
              code={current.code ?? ""}
              filename={current.filename}
              language="tsx"
            />
          )}
        </div>
      </ScrollReveal>
    </Section>
  );
}
