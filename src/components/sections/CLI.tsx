import React from "react";
import { Terminal, ArrowRight } from "lucide-react";
import { Section, SectionHeader, CodeBlock, ScrollReveal, Button } from "../ui";

const createExample = `# Create a new project
bunx burger-api create my-api

# Add a route
cd my-api
bunx burger-api add users

# Start the server
bun run dev`;

export function CLI() {
  return (
    <Section id="cli">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <SectionHeader
            align="left"
            eyebrow="CLI"
            title="Scaffold and ship from the terminal"
            subtitle="Create projects, add routes, and run your API with the BurgerAPI CLI. One-liners that match how Bun developers work."
            className="mb-6"
          />
          <div className="mt-4">
            <Button to="/docs/cli/installation" variant="secondary">
              <Terminal size={16} aria-hidden />
              CLI reference
              <ArrowRight
                size={16}
                className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <CodeBlock code={createExample} filename="terminal" language="bash" className="mt-1" />
        </ScrollReveal>
      </div>
    </Section>
  );
}
