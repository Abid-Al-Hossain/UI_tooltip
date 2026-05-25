"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { SegmentedControl } from "../input/SegmentedControl";
import ColorControl from "../color/ColorControl";

export type PreviewBgMode = "white" | "black" | "gray" | "custom";

export interface PreviewBackgroundSectionProps {
  /** Background mode */
  mode: PreviewBgMode;
  setMode: (v: PreviewBgMode) => void;
  /** Custom background color */
  customColor?: string;
  setCustomColor?: (v: string) => void;
  /** Color palette */
  palette?: readonly string[];
  /** Available modes (default: all) */
  availableModes?: PreviewBgMode[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const DEFAULT_MODE_OPTIONS = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "gray", label: "Gray" },
  { value: "custom", label: "Custom" },
];

/**
 * PreviewBackgroundSection - Preview background color selector.
 * Quick preset backgrounds with optional custom color picker.
 */
export default function PreviewBackgroundSection({
  mode,
  setMode,
  customColor,
  setCustomColor,
  palette,
  availableModes,
  title = "Preview Background",
  subtitle = "Only affects preview (not export)",
}: PreviewBackgroundSectionProps) {
  const modeOptions = availableModes
    ? DEFAULT_MODE_OPTIONS.filter((opt) =>
        availableModes.includes(opt.value as PreviewBgMode),
      )
    : DEFAULT_MODE_OPTIONS;

  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        <SegmentedControl
          value={mode}
          onChange={(v) => setMode(v as PreviewBgMode)}
          items={modeOptions}
        />

        {mode === "custom" && customColor !== undefined && setCustomColor && (
          <ColorControl
            label="Background Color"
            value={customColor}
            onChange={setCustomColor}
            palette={palette}
          />
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Get CSS background color from mode
 */
export function getPreviewBgColor(
  mode: PreviewBgMode,
  customColor?: string,
): string {
  switch (mode) {
    case "white":
      return "#ffffff";
    case "black":
      return "#000000";
    case "gray":
      return "#94a3b8";
    case "custom":
      return customColor || "#ffffff";
    default:
      return "#ffffff";
  }
}
