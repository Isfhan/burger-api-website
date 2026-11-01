import React, { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Section, SectionHeader, CodeBlock, Button } from "../ui";

const schemaCode = `// api/posts/schema.ts
import { z } from "zod";

export const GET = {
  query: z.object({
    tag: z.string().optional(),
    limit: z.coerce
      .number()
      .min(1)
      .max(100)
      .default(10),
  }),
};

export const POST = {
  body: z.object({
    title: z.string().min(1),
    published: z.boolean().default(false),
  }),
};`;

const routeCode = `// api/posts/route.ts
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";

export const POST = defineRoute(PostSchema, (ctx) => {
  // Fully typed from the Zod schema above
  const { title, published } = ctx.validated.body;

  return Response.json(
    { title, published },
    { status: 201 }
  );
});`;

const validationTabs = [
  { id: "schema", title: "schema.ts", code: schemaCode },
  { id: "route", title: "route.ts", code: routeCode },
];

export function Validation() {
  const [activeTab, setActiveTab] = useState(validationTabs[0].id);
  const active =
    validationTabs.find((t) => t.id === activeTab) ?? validationTabs[0];

  return (
    <Section id="validation">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Validation"
            title="Zod schemas next to your routes"
            subtitle="Export a schema per method in schema.ts. BurgerAPI validates before your code runs and puts typed data on ctx.validated, covering query, params, headers, cookies, and body. Share shapes between routes by importing a common schemas file, and validate responses too."
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
        </div>
        <CodeBlock
          code={active.code}
          language="tsx"
          tabs={validationTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-1"
        />
      </div>
    </Section>
  );
}
