import React from "react";
import clsx from "clsx";
import {
  ShieldCheck,
  ArrowRight,
  Zap,
  Filter,
  Workflow,
  Code2,
  Network,
  Redo2,
  SendHorizontal,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHeader, CodeBlock, Button } from "../ui";

const code = `// src/hooks.ts: global lifecycle hooks
import type { BurgerContext } from "burger-api";

export const onRequest = [
  (ctx: BurgerContext) => {
    const id = crypto.randomUUID();
    ctx.headers.set("x-request-id", id);
  },
];

export const beforeRoute = [
  (ctx: BurgerContext) => {
    if (!ctx.headers.get("authorization")) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  },
];

export const afterRoute = [
  () => (response: Response) => {
    console.log(response.status, response.headers.get("x-request-id"));
    return response;
  },
];`;

type Stage = { id: string; label: string; icon: LucideIcon; kind: "process" | "hook" | "peak" };

const STAGES: Stage[] = [
  { id: "request", label: "Request", icon: Zap, kind: "process" },
  { id: "onRequest", label: "onRequest", icon: Network, kind: "hook" },
  { id: "transform", label: "transform", icon: Workflow, kind: "hook" },
  { id: "validation", label: "Validation", icon: ShieldCheck, kind: "process" },
  { id: "beforeRoute", label: "beforeRoute", icon: Filter, kind: "hook" },
  { id: "handler", label: "Handler", icon: Code2, kind: "peak" },
  { id: "afterRoute", label: "afterRoute", icon: Redo2, kind: "hook" },
  { id: "mapResponse", label: "mapResponse", icon: SendHorizontal, kind: "hook" },
  { id: "response", label: "Response", icon: CheckCircle2, kind: "process" },
];

export function Lifecycle() {
  return (
    <Section id="lifecycle" secondary>
      <SectionHeader
        eyebrow="Lifecycle hooks"
        title="Compose auth, logging, and CORS"
        subtitle="Six named hooks control every request: onRequest, transform, beforeRoute, afterRoute, mapResponse, and onError. Return a Response to short-circuit, or continue down the pipeline."
      />

      {/* Mobile: stacked list */}
      <div className="ba-pipeline md:hidden max-w-sm mx-auto">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="ba-pipeline__step">
            <div className="ba-pipeline__node">
              <stage.icon size={18} strokeWidth={1.75} aria-hidden />
            </div>
            <div className="ba-pipeline__body">
              <span className="ba-pipeline__index">0{i + 1}</span>
              <span
                className={clsx(
                  "text-card-title text-ink font-semibold",
                  stage.kind === "hook" && "font-mono text-[1.05rem]"
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <span className="ba-pipeline__connector" aria-hidden />
            )}
          </div>
        ))}
      </div>

      {/* Desktop: horizontal rail — the request climbs to your Handler, then flows back out */}
      <div className="ba-rail hidden md:flex" role="list" aria-label="Request lifecycle">
        <span className="ba-rail__line" aria-hidden />
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            className={clsx("ba-rail__stage", `ba-rail__stage--${stage.kind}`)}
            role="listitem"
          >
            <span className="ba-rail__node">
              <stage.icon
                size={stage.kind === "peak" ? 22 : 18}
                strokeWidth={1.75}
                aria-hidden
              />
            </span>
            <span className="ba-rail__label">{stage.label}</span>
          </div>
        ))}
      </div>

      <p className="ba-rail__error">
        <AlertTriangle size={14} strokeWidth={2} aria-hidden />
        onError steps in if any stage above throws
      </p>

      <div className="max-w-2xl mx-auto mt-10">
        <CodeBlock code={code} filename="src/hooks.ts" />
      </div>

      <div className="mt-8 flex justify-center">
        <Button to="/docs/hooks/system" variant="secondary">
          <ShieldCheck size={16} aria-hidden />
          Hooks docs
          <ArrowRight
            size={16}
            className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </div>
    </Section>
  );
}
