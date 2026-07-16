import React, { useState, useCallback, useEffect } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import clsx from "clsx";

interface InstallCommandProps {
  command?: string;
  className?: string;
}

export function InstallCommand({
  command = "bunx burger-api create my-app",
  className,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }, [command]);

  return (
    <div
      className={clsx(
        "group inline-flex items-center gap-3 rounded-button border border-surface-border",
        "bg-[#0d0d0f] dark:bg-[#0d0d0f] px-4 py-3 shadow-ba-lg",
        "transition-all duration-200 hover:border-brand-primary/40 hover:shadow-[0_0_30px_rgba(255,107,0,0.15)]",
        className,
      )}
      style={{ minWidth: "380px" }}
    >
      <Terminal size={16} className="text-brand-primary shrink-0" aria-hidden />
      <div className="relative flex-1 min-w-0">
        <code className="font-mono text-small text-ink whitespace-nowrap truncate block p3 rounded-none">
          {command}
        </code>
      </div>

      <button
        type="button"
        onClick={onCopy}
        className={clsx(
          "ml-1 inline-flex items-center justify-center w-9 h-9 rounded-lg border-0 cursor-pointer shrink-0",
          "bg-brand-primary/10 text-brand-primary transition-all duration-200",
          "hover:bg-brand-primary/20 hover:scale-105",
          copied && "text-brand-success bg-brand-success/10",
        )}
        aria-label={copied ? "Copied" : "Copy install command"}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
