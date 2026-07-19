import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

interface TextLinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
  icon?: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
}

export function TextLink({
  children,
  to,
  href,
  className,
  icon: Icon,
}: TextLinkProps) {
  const content = (
    <span className="group inline-flex items-center gap-1.5 font-medium text-brand-primary transition-colors duration-200 hover:text-brand-secondary">
      {Icon && <Icon size={16} className="shrink-0" aria-hidden />}
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-primary/40 scale-x-0 origin-left transition-transform duration-150 ease-out group-hover:scale-x-100" />
      </span>
      <ArrowRight
        size={16}
        className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
        aria-hidden
      />
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={clsx("no-underline", className)} aria-label={typeof children === "string" ? children : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={clsx("no-underline", className)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={typeof children === "string" ? children : undefined}
    >
      {content}
    </a>
  );
}
