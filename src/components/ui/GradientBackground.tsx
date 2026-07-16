import React from "react";
import clsx from "clsx";

interface GradientBackgroundProps {
  className?: string;
  variant?: "hero" | "subtle";
}

export function GradientBackground({
  className,
  variant = "hero",
}: GradientBackgroundProps) {
  return (
    <div
      className={clsx("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--ba-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--ba-border) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 75%)",
        }}
      />

      {/* Amber orb — top right */}
      <div
        className={clsx(
          "absolute rounded-full blur-3xl",
          variant === "hero"
            ? "-top-32 right-0 w-[500px] h-[500px] opacity-30 dark:opacity-20"
            : "top-0 right-1/4 w-[300px] h-[300px] opacity-20 dark:opacity-10"
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Orange orb — left */}
      <div
        className={clsx(
          "absolute rounded-full blur-3xl",
          variant === "hero"
            ? "top-1/3 -left-24 w-[400px] h-[400px] opacity-20 dark:opacity-15"
            : "bottom-0 left-1/4 w-[250px] h-[250px] opacity-15 dark:opacity-10"
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Soft radial center light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(251,191,36,0.15) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
