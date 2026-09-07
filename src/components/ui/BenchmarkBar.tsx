import React from "react";
import clsx from "clsx";

interface BenchmarkRow {
  name: string;
  reqPerSec: number;
  highlight?: boolean;
}

interface BenchmarkBarProps {
  rows: BenchmarkRow[];
  className?: string;
}

export function BenchmarkBar({ rows, className }: BenchmarkBarProps) {
  const max = Math.max(...rows.map((r) => r.reqPerSec));

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      {rows.map((row) => (
        <div key={row.name} className="grid grid-cols-[7rem_1fr_auto] items-center gap-4 sm:grid-cols-[9rem_1fr_auto]">
          <span
            className={clsx(
              "text-small font-semibold",
              row.highlight ? "text-brand-primary" : "text-ink-secondary"
            )}
          >
            {row.name}
          </span>
          <div className="ba-benchmark-bar">
            <div
              className={clsx(
                "ba-benchmark-bar__fill",
                row.highlight && "ba-benchmark-bar__fill--highlight"
              )}
              style={{ width: `${(row.reqPerSec / max) * 100}%` }}
            />
          </div>
          <span className="font-semibold text-ink tabular-nums text-right whitespace-nowrap">
            {Math.round(row.reqPerSec).toLocaleString()}
            <span className="text-small font-normal text-ink-muted"> req/s</span>
          </span>
        </div>
      ))}
    </div>
  );
}
