"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import Switch from "../input/Switch";
import { SegmentedControl } from "../input/SegmentedControl";
import ColorControl from "../color/ColorControl";

export type TextShadowColorMode = "custom" | "auto" | "contrast";

export interface TextShadowSectionProps {
  /** Enable text shadow */
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  /** X offset in px */
  x: number;
  setX: (v: number) => void;
  /** Y offset in px */
  y: number;
  setY: (v: number) => void;
  /** Blur radius in px */
  blur: number;
  setBlur: (v: number) => void;
  /** Opacity (0-1) */
  opacity: number;
  setOpacity: (v: number) => void;
  /** Color mode */
  colorMode?: TextShadowColorMode;
  setColorMode?: (v: TextShadowColorMode) => void;
  /** Shadow color */
  color: string;
  setColor: (v: string) => void;
  /** Color palette */
  palette?: readonly string[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const COLOR_MODE_OPTIONS = [
  { value: "custom", label: "Custom" },
  { value: "auto", label: "Auto" },
  { value: "contrast", label: "Contrast" },
];

/**
 * TextShadowSection - Text shadow controls.
 * Configures x/y offset, blur, opacity, and color with optional auto/contrast modes.
 */
export default function TextShadowSection({
  enabled,
  setEnabled,
  x,
  setX,
  y,
  setY,
  blur,
  setBlur,
  opacity,
  setOpacity,
  colorMode = "custom",
  setColorMode,
  color,
  setColor,
  palette,
  title = "Text Shadow",
  subtitle = "Add shadow to text for depth",
}: TextShadowSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Enable toggle */}
        <Switch
          label="Enable text shadow"
          checked={enabled}
          onChange={setEnabled}
        />

        {enabled && (
          <>
            {/* X/Y Offsets */}
            <div className="grid grid-cols-2 gap-3">
              <LabeledField label={`X offset: ${x}px`}>
                <Slider
                  value={x}
                  onChange={(v) => setX(Number(v))}
                  min={-20}
                  max={20}
                  step={1}
                />
              </LabeledField>
              <LabeledField label={`Y offset: ${y}px`}>
                <Slider
                  value={y}
                  onChange={(v) => setY(Number(v))}
                  min={-20}
                  max={20}
                  step={1}
                />
              </LabeledField>
            </div>

            {/* Blur and Opacity */}
            <div className="grid grid-cols-2 gap-3">
              <LabeledField label={`Blur: ${blur}px`}>
                <Slider
                  value={blur}
                  onChange={(v) => setBlur(Number(v))}
                  min={0}
                  max={60}
                  step={1}
                />
              </LabeledField>
              <LabeledField label={`Opacity: ${opacity.toFixed(2)}`}>
                <Slider
                  value={opacity}
                  onChange={(v) => setOpacity(Number(v))}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </LabeledField>
            </div>

            {/* Color Mode */}
            {setColorMode && (
              <LabeledField label="Color Mode">
                <SegmentedControl
                  value={colorMode}
                  onChange={(v) => setColorMode(v as TextShadowColorMode)}
                  items={COLOR_MODE_OPTIONS}
                />
              </LabeledField>
            )}

            {/* Color Picker */}
            {colorMode === "custom" && (
              <ColorControl
                label="Shadow Color"
                value={color}
                onChange={setColor}
                palette={palette}
              />
            )}

            {colorMode !== "custom" && (
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                {colorMode === "auto"
                  ? "Auto uses the text color with the chosen opacity."
                  : "Contrast uses black/white for maximum legibility."}
              </div>
            )}
          </>
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Build CSS text-shadow value
 */
export function buildTextShadowCss(
  enabled: boolean,
  x: number,
  y: number,
  blur: number,
  color: string,
  opacity: number,
): string {
  if (!enabled) return "none";
  // Apply opacity to color (assumes hex or rgba)
  const alphaColor = color.startsWith("#")
    ? `${color}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`
    : color;
  return `${x}px ${y}px ${blur}px ${alphaColor}`;
}
