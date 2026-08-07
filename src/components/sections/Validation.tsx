import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Section, SectionHeader, CodeBlock, ScrollReveal, Button } from "../ui";

const code = `import { z } from "zod";
import type { BurgerContext } from "burger-api";

export const schema = {
  query: z.object({
    tag: z.string().optional(),
    limit: z.coerce.number().min(1).max(100).default(10),
  }),
  body: z.object({
    title: z.string().min(1),
    published: z.boolean().default(false),
  }),
};

export async function POST(ctx: BurgerContext) {
  // Fully typed from your Zod schemas
  const { tag, limit } = ctx.validated.query;
  const { title, published } = ctx.validated.body;

  return Response.json({ tag, limit, title, published });
}`;

export function Validation() {
  return (
    <Section id="validation" secondary>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <SectionHeader
            align="left"
            eyebrow="Validation"
            title="Zod schemas next to your routes"
            subtitle="Export a schema object alongside your handlers. BurgerAPI validates before your code runs and puts typed data on ctx.validated — for query, params, headers, cookies, and body. Reuse shapes as models and validate responses too."
            className="mb-6 md:mb-8"
          />
          <Button to="/docs/validation/zod" variant="secondary" className="mt-2">
            <BookOpen size={16} aria-hidden />
            Validation guide
            <ArrowRight
              size={16}
              className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <CodeBlock code={code} filename="api/posts/route.ts" />
        </ScrollReveal>
      </div>
    </Section>
  );
}
