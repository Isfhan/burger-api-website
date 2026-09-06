import React from "react";
import { Radio, ArrowRight } from "lucide-react";
import { Section, SectionHeader, CodeBlock, ScrollReveal, Button } from "../ui";

const code = `// src/websocket/chat/ws.ts
import type { BurgerWS } from "burger-api";

export function open(ws: BurgerWS) {
  ws.send(JSON.stringify({ type: "connected" }));
}

export function message(ws: BurgerWS, message: string | Buffer) {
  // Echo the message back
  ws.send(message);
}

export function close(ws: BurgerWS, code: number, reason: string) {
  // Connection closed
}`;

export function WebSocket() {
  return (
    <Section id="websocket">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <SectionHeader
            align="left"
            eyebrow="WebSocket"
            title="Real-time APIs with file-based WebSocket routes"
            subtitle="Drop a ws.ts file under src/websocket/ and you get a live WebSocket route — open, message, and close handlers with typed ws.data and ws.services. Native support on Bun, Node.js, Cloudflare Workers, and Deno (Vercel has no persistent-connection model, so the build fails early instead of shipping a broken route)."
            className="mb-6 md:mb-8"
          />
          <Button to="/docs/websocket/overview" variant="secondary" className="mt-2">
            <Radio size={16} aria-hidden />
            WebSocket guide
            <ArrowRight
              size={16}
              className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <CodeBlock
            code={code}
            filename="src/websocket/chat/ws.ts"
            className="mt-1"
          />
        </ScrollReveal>
      </div>
    </Section>
  );
}
