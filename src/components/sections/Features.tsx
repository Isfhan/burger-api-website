import React from "react";
import {
  FolderTree,
  ShieldCheck,
  FileJson,
  Layers,
  Braces,
  Zap,
  Route,
  Gauge,
  Radio,
  Puzzle,
  Cable,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, Card, StaggerChildren } from "../ui";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FolderTree,
    title: "File-Based Routing",
    description:
      "Define routes with route.ts files. Dynamic segments use [param] and wildcards use [...] — declarative and convention-driven.",
  },
  {
    icon: Route,
    title: "Hybrid Router",
    description:
      "A trie for dynamic routes plus Bun's native router for static paths. Each request uses the fastest matching strategy.",
  },
  {
    icon: ShieldCheck,
    title: "Zod Validation",
    description:
      "Define schemas next to your routes. Validate params, query, headers, cookies, and body with full type inference and clear errors.",
  },
  {
    icon: Radio,
    title: "WebSocket",
    description:
      "File-based WebSocket routes under src/websocket/. Native support on Bun, Node.js, Cloudflare Workers, and Deno — typed connections with ws.data and ws.services.",
  },
  {
    icon: Puzzle,
    title: "Plugins",
    description:
      "Register plugins in src/plugins.ts. Official packages cover jwt-auth, api-key, session, oidc, basic-auth, and env.",
  },
  {
    icon: Cable,
    title: "Providers",
    description:
      "Declare shared services in src/providers.ts. They become typed ctx.services in every handler and hook.",
  },
  {
    icon: FileJson,
    title: "Automatic OpenAPI",
    description:
      "OpenAPI 3.0 is generated from your routes and Zod schemas, so the specification always matches the code.",
  },
  {
    icon: Layers,
    title: "Lifecycle Hooks",
    description:
      "Six named hooks control every request: onRequest, transform, beforeRoute, afterRoute, mapResponse, and onError.",
  },
  {
    icon: Braces,
    title: "TypeScript First",
    description:
      "defineRoute(schema, handler) infers ctx.validated straight from your Zod schema — no generic to write by hand.",
  },
  {
    icon: Zap,
    title: "Bun Native",
    description:
      "Built for Bun from the ground up. Use the runtime's HTTP server, router, and tooling without abstraction layers.",
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    description:
      "burger-api build --target=cloudflare|deno|vercel|node generates the entry and platform config for you — WinterCG-compatible, no manual wiring.",
  },
  {
    icon: Gauge,
    title: "Lean by Design",
    description:
      "Lazy query and cookie parsing, a shared request context, and AOT route builds keep allocations and latency low.",
  },
];

export function Features() {
  return (
    <Section id="features" secondary>
      <SectionHeader
        eyebrow="Why BurgerAPI"
        title="Everything you need to ship APIs"
        subtitle="A focused toolkit for Bun backends — routing, validation, WebSocket, OpenAPI, and lifecycle hooks that work together out of the box."
      />
      <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f) => (
          <Card key={f.title} className="h-full">
            <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-button bg-brand-primary/10 text-brand-primary">
              <f.icon size={22} strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="text-card-title text-ink m-0 mb-2">{f.title}</h3>
            <p className="text-small text-ink-secondary m-0 leading-relaxed">
              {f.description}
            </p>
          </Card>
        ))}
      </StaggerChildren>
    </Section>
  );
}
