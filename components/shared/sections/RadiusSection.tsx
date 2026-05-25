"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import Switch from "../input/Switch";
import { SegmentedControl } from "../input/SegmentedControl";

export type RadiusPreset = "square" | "rounded" | "pill" | "custom";

export interface RadiusSectionProps {
  /** Link all corners together */
  linked: boolean;
  setLinked: (v: boolean) => void;
  /** Unified radius (when linked) */
  radius: number;
  setRadius: (v: number) => void;
  /** Per-corner radius values (when not linked) */
  topLeft: number;
  setTopLeft: (v: number) => void;
  topRight: number;
  setTopRight: (v: number) => void;
  bottomRight: number;
  setBottomRight: (v: number) => void;
  bottomLeft: number;
  setBottomLeft: (v: number) => void;
  /** Max radius (default: 100) */
  maxRadius?: number;
  /** Show presets (default: true) */
  showPresets?: boolean;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const PRESET_OPTIONS = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "pill", label: "Pill" },
  { value: "custom", label: "Custom" },
];

/**
 * RadiusSection - Corner radius controls with linked/per-corner modes.
 * Supports presets (square, rounded, pill) and custom values.
 */
export default function RadiusSection({
  linked,
  setLinked,
  radius,
  setRadius,
  topLeft,
  setTopLeft,
  topRight,
  setTopRight,
  bottomRight,
  setBottomRight,
  bottomLeft,
  setBottomLeft,
  maxRadius = 100,
  showPresets = true,
  title = "Corner Radius",
  subtitle = "Rounding of corners",
}: RadiusSectionProps) {
  // Determine current preset
  const currentPreset: RadiusPreset =
    radius === 0
      ? "square"
      : radius >= 9999
        ? "pill"
        : radius === 8 || radius === 12 || radius === 16
          ? "rounded"
          : "custom";

  const handlePresetChange = (preset: string) => {
    if (preset === "square") setRadius(0);
    if (preset === "pill") setRadius(9999);
    if (preset === "rounded") setRadius(12);
    if (preset === "custom") setRadius(8);
  };

  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Link toggle */}
        <Switch
          label={`Link corners: ${linked ? "On" : "Off"}`}
          checked={linked}
          onChange={setLinked}
        />

        {linked ? (
          <>
            {/* Unified radius slider */}
            <LabeledField label={`Radius: ${radius}px`}>
              <Slider
                value={Math.min(radius, maxRadius)}
                onChange={(v) => setRadius(Number(v))}
                min={0}
                max={maxRadius}
                step={1}
              />
            </LabeledField>

            {/* Presets */}
            {showPresets && (
              <LabeledField label="Presets">
                <SegmentedControl
                  value={currentPreset}
                  onChange={handlePresetChange}
                  items={PRESET_OPTIONS}
                />
              </LabeledField>
            )}
          </>
        ) : (
          /* Per-corner controls */
          <div className="grid grid-cols-2 gap-3">
            <LabeledField label={`Top-left: ${topLeft}px`}>
              <Slider
                value={topLeft}
                onChange={(v) => setTopLeft(Number(v))}
                min={0}
                max={maxRadius}
                step={1}
              />
            </LabeledField>
            <LabeledField label={`Top-right: ${topRight}px`}>
              <Slider
                value={topRight}
                onChange={(v) => setTopRight(Number(v))}
                min={0}
                max={maxRadius}
                step={1}
              />
            </LabeledField>
            <LabeledField label={`Bottom-right: ${bottomRight}px`}>
              <Slider
                value={bottomRight}
                onChange={(v) => setBottomRight(Number(v))}
                min={0}
                max={maxRadius}
                step={1}
              />
            </LabeledField>
            <LabeledField label={`Bottom-left: ${bottomLeft}px`}>
              <Slider
                value={bottomLeft}
                onChange={(v) => setBottomLeft(Number(v))}
                min={0}
                max={maxRadius}
                step={1}
              />
            </LabeledField>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Build CSS border-radius from values
 */
export function buildRadiusCss(
  linked: boolean,
  radius: number,
  topLeft: number,
  topRight: number,
  bottomRight: number,
  bottomLeft: number,
): string {
  if (linked) {
    return radius >= 9999 ? "9999px" : `${radius}px`;
  }
  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}
