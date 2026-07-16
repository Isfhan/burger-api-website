import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import {
  Button,
  MascotImage,
  GradientBackground,
} from "../../../components/ui";
import { Home, BookOpen, Search } from "lucide-react";

export default function NotFoundContent(): React.ReactElement {
  return (
    <main className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      <GradientBackground variant="hero" />
      <div className="relative mx-auto max-w-lg px-4 text-center">
        <MascotImage size={128} className="mx-auto mb-6 drop-shadow-lg" />
        <p className="text-small font-semibold uppercase tracking-wider text-brand-primary m-0 mb-3">
          404
        </p>
        <Heading as="h1" className="text-section text-ink tracking-tight mb-4">
          This page got lost in the kitchen
        </Heading>
        <p className="text-body text-ink-secondary m-0 mb-8">
          The page you are looking for does not exist or has moved. Try the docs
          or head back home.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button to="/" size="lg" variant="primary">
            <Home size={18} aria-hidden />
            Home
          </Button>
          <Button to="/docs/" size="lg" variant="secondary">
            <BookOpen size={18} aria-hidden />
            Documentation
          </Button>
        </div>
        <p className="mt-8 text-small text-ink-muted m-0">
          <Search size={14} className="inline mr-1 -mt-0.5" aria-hidden />
          Use the search bar in the navbar to find a topic.
        </p>
        <Link
          to="/docs/"
          className="sr-only"
        >
          Go to docs
        </Link>
      </div>
    </main>
  );
}
