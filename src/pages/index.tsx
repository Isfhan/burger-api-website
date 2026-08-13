import type { ReactNode } from "react";
import React, { Suspense, lazy } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { LazyMotion, domAnimation } from "framer-motion";
import { Hero, Features } from "../components/sections";

const Performance = lazy(() =>
  import("../components/sections/Performance").then((m) => ({
    default: m.Performance,
  }))
);
const CodeExamples = lazy(() =>
  import("../components/sections/CodeExamples").then((m) => ({
    default: m.CodeExamples,
  }))
);
const DeveloperExperience = lazy(() =>
  import("../components/sections/DeveloperExperience").then((m) => ({
    default: m.DeveloperExperience,
  }))
);
const FileRouting = lazy(() =>
  import("../components/sections/FileRouting").then((m) => ({
    default: m.FileRouting,
  }))
);
const Validation = lazy(() =>
  import("../components/sections/Validation").then((m) => ({
    default: m.Validation,
  }))
);
const Lifecycle = lazy(() =>
  import("../components/sections/Lifecycle").then((m) => ({
    default: m.Lifecycle,
  }))
);
const WebSocket = lazy(() =>
  import("../components/sections/WebSocket").then((m) => ({
    default: m.WebSocket,
  }))
);
const OpenAPI = lazy(() =>
  import("../components/sections/OpenAPI").then((m) => ({
    default: m.OpenAPI,
  }))
);
const CLI = lazy(() =>
  import("../components/sections/CLI").then((m) => ({ default: m.CLI }))
);
const DocsCTA = lazy(() =>
  import("../components/sections/DocsCTA").then((m) => ({
    default: m.DocsCTA,
  }))
);
const GitHubCTA = lazy(() =>
  import("../components/sections/GitHubCTA").then((m) => ({
    default: m.GitHubCTA,
  }))
);
const Community = lazy(() =>
  import("../components/sections/Community").then((m) => ({
    default: m.Community,
  }))
);

function SectionFallback() {
  return (
    <div
      className="py-20 flex items-center justify-center"
      aria-hidden
    >
      <div className="w-8 h-8 rounded-full border-2 border-brand-primary/30 border-t-brand-primary animate-spin" />
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.projectName} description={siteConfig.tagline}>
      <LazyMotion features={domAnimation} strict>
        <main className="ba-main">
          <Hero />
          <Features />
          <Suspense fallback={<SectionFallback />}>
            <Performance />
            <CodeExamples />
            <DeveloperExperience />
            <FileRouting />
            <Validation />
            <Lifecycle />
            <WebSocket />
            <OpenAPI />
            <CLI />
            <GitHubCTA />
            <Community />
            {/* <DocsCTA /> */}
          </Suspense>
        </main>
      </LazyMotion>
    </Layout>
  );
}
