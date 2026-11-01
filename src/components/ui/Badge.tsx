import React from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "default" | "success" | "info" | "muted";
  className?: string;
}

const variantClasses = {
  default:
    "bg-brand-primary/10 text-brand-primary border-brand-primary/20 dark:bg-brand-accent/10 dark:text-brand-accent dark:border-brand-accent/20",
  success:
    "bg-brand-success/10 text-brand-success border-brand-success/20",
  info: "bg-brand-info/10 text-brand-info border-brand-info/20",
  muted:
    "bg-surface-secondary text-ink-muted border-surface-border",
};

export function Badge({
  children,
  icon: Icon,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {Icon && <Icon size={14} strokeWidth={2} aria-hidden />}
      {children}
    </span>
  );
}
