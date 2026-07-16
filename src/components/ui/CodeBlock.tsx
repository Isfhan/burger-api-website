import React, { useState, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";

interface CodeBlockTab {
  id: string;
  title: string;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
  tabs?: CodeBlockTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
  showLineNumbers = false,
  tabs,
  activeTab,
  onTabChange,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { colorMode } = useColorMode();
  const theme = colorMode === "dark" ? themes.vsDark : themes.vsDark;

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }, [code]);

  return (
    <div
      className={clsx(
        "rounded-code overflow-hidden border border-surface-border shadow-ba-md bg-[#0d0d0f]",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {tabs ? (
            tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange?.(tab.id)}
                className={clsx(
                  "px-3 py-2 text-small font-mono rounded-t-lg border-0 cursor-pointer transition-colors duration-150 bg-transparent",
                  activeTab === tab.id
                    ? " text-brand-accent"
                    : " text-zinc-500 hover:text-zinc-300",
                )}
              >
                {tab.title}
              </button>
            ))
          ) : filename ? (
            <span className="text-small font-mono text-zinc-400 truncate">
              {filename}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={clsx(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-small font-medium transition-all duration-200",
            "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border-0 cursor-pointer",
            copied && "text-brand-success"
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <Highlight theme={theme} code={code.trim()} language={language}>
        {({ className: hlClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={clsx(hlClass, "m-0 p-5 overflow-x-auto text-[13px] leading-relaxed font-mono")}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-zinc-600 select-none text-right w-8">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
