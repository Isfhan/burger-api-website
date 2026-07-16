import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-accent to-brand-accent text-gray-900 font-semibold shadow-[0_4px_14px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 hover:shadow-ba-glow border-0",
  secondary:
    "bg-white light:bg-black border border-surface-border text-black light:text-white font-medium hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-ba-sm",
  ghost:
    "bg-transparent border-0 text-ink-secondary font-medium hover:text-brand-primary hover:bg-brand-primary/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-2 text-small rounded-button",
  md: "px-5 py-2.5 text-body rounded-button",
  lg: "px-7 py-3.5 text-body rounded-button",
};

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 no-underline transition-all duration-200 ease-out cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
