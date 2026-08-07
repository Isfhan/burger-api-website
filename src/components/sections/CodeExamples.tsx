import React, { useState } from "react";
import clsx from "clsx";
import { Section, SectionHeader, CodeBlock, ScrollReveal } from "../ui";

const examples = [
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
    id: "zod",
    label: "Validation",
    filename: "api/products/[id]/route.ts",
    code: `import { z } from "zod";
import type { BurgerContext } from "burger-api";

export const schema = {
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1),
    price: z.number().positive(),
  }),
};

export async function PUT(ctx: BurgerContext) {
  const { id } = ctx.validated.params;
  const { name, price } = ctx.validated.body;
  return Response.json({ id, name, price });
}`,
  },
];

export function CodeExamples() {
  const [active, setActive] = useState(examples[0].id);
  const current = examples.find((e) => e.id === active) ?? examples[0];

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
                onClick={() => setActive(ex.id)}
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
          <CodeBlock
            code={current.code}
            filename={current.filename}
            language="tsx"
          />
        </div>
      </ScrollReveal>
    </Section>
  );
}
