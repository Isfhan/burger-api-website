import React from "react";
import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  secondary?: boolean;
  containerClassName?: string;
}

export function Section({
  children,
  id,
  className,
  secondary = false,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "py-20 md:py-28 relative",
        secondary ? "bg-surface-secondary" : "bg-surface",
        className
      )}
    >
      <div
        className={clsx(
          "mx-auto max-w-content px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
