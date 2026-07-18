import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  to?: string;
  href?: string;
}

export function Card({
  children,
  className,
  hover = true,
  glass = false,
  to,
  href,
}: CardProps) {
  const classes = clsx(
    "rounded-card border border-surface-border bg-gradient-to-b from-surface-card to-surface-card-soft dark:from-surface-card dark:to-surface-card-elevated p-6 shadow-ba-sm",
    glass && "backdrop-blur-md bg-surface-card/80 dark:bg-surface-card/70",
    hover &&
      "transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-ba-lg hover:border-brand-primary/25",
    className
  );

  if (to) {
    return (
      <Link to={to} className={clsx(classes, "block no-underline text-inherit")}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={clsx(classes, "block no-underline text-inherit")}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}
