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
    "bg-gradient-to-br from-brand-accent to-brand-primary text-gray-900 font-semibold shadow-[0_4px_14px_rgba(255,166,43,0.3)] hover:-translate-y-0.5 hover:shadow-ba-glow hover:brightness-105 border-0",
  secondary:
    "bg-[#ECECE8] dark:bg-white/[0.05] border border-[rgba(0,0,0,0.08)] dark:border-white/[0.08] text-ink font-semibold hover:bg-[#E3E3DF] dark:hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-ba-sm backdrop-blur-sm",
  ghost:
    "bg-transparent border border-transparent text-ink-secondary font-medium hover:text-brand-primary hover:bg-brand-primary/5 dark:hover:bg-white/5",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[14px] rounded-button",
  md: "px-5 py-2.5 text-[14px] rounded-button min-w-[140px]",
  lg: "px-7 py-3.5 text-[15px] rounded-button min-w-[160px]",
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
    "group inline-flex items-center justify-center gap-2 no-underline transition-all duration-200 ease-out cursor-pointer",
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
