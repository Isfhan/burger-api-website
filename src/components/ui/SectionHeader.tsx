import React from "react";
import clsx from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "mb-12 md:mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-small font-semibold uppercase tracking-wider text-brand-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-section text-ink tracking-tight m-0 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-body text-ink-secondary m-0 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
