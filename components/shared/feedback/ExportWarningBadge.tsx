"use client";

import React from "react";

export interface ExportWarningBadgeProps {
  /** Badge label text */
  label?: string;
  /** Export type (affects color) */
  type?: "react" | "js" | "framer" | "premium";
}

const BADGE_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  react: {
    bg: "rgba(245, 158, 11, 0.1)",
    text: "#fbbf24",
    border: "rgba(245, 158, 11, 0.2)",
  },
  js: {
    bg: "rgba(59, 130, 246, 0.1)",
    text: "#60a5fa",
    border: "rgba(59, 130, 246, 0.2)",
  },
  framer: {
    bg: "rgba(139, 92, 246, 0.1)",
    text: "#a78bfa",
    border: "rgba(139, 92, 246, 0.2)",
  },
  premium: {
    bg: "rgba(236, 72, 153, 0.1)",
    text: "#f472b6",
    border: "rgba(236, 72, 153, 0.2)",
  },
};

/**
 * ExportWarningBadge - Indicates features with limited export support.
 * Shows which features require React/JS and won't work in HTML/CSS-only exports.
 */
export default function ExportWarningBadge({
  label = "React Export Only",
  type = "react",
}: ExportWarningBadgeProps) {
  const colors = BADGE_COLORS[type] || BADGE_COLORS.react;

  return (
    <span
      className="ml-2 inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
      title="This feature requires Javascript/React and will not work in pure HTML/CSS export."
    >
      {label}
    </span>
  );
}
