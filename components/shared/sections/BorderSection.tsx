"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import ColorControl from "../color/ColorControl";
import Slider from "../input/Slider";
import Select from "../input/Select";

export type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "none";

export interface BorderSectionProps {
  /** Border width in pixels */
  borderWidth: number;
  setBorderWidth: (v: number) => void;
  /** Border color (hex or rgba) */
  borderColor: string;
  setBorderColor: (v: string) => void;
  /** Border style */
  borderStyle: BorderStyle;
  setBorderStyle: (v: BorderStyle) => void;
  /** Border radius in pixels */
  borderRadius: number;
  setBorderRadius: (v: number) => void;
  /** Maximum border width (default: 10) */
  maxWidth?: number;
  /** Maximum border radius (default: 100) */
  maxRadius?: number;
  /** Show radius control (default: true) */
  showRadius?: boolean;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const BORDER_STYLE_OPTIONS = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
  { value: "none", label: "None" },
];

/**
 * BorderSection - Generic border control section.
 * Controls border width, color, style, and optionally radius.
 */
export default function BorderSection({
  borderWidth,
  setBorderWidth,
  borderColor,
  setBorderColor,
  borderStyle,
  setBorderStyle,
  borderRadius,
  setBorderRadius,
  maxWidth = 10,
  maxRadius = 100,
  showRadius = true,
  title = "Border",
  subtitle = "Border styling",
}: BorderSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Border Width */}
        <LabeledField label={`Width: ${borderWidth}px`}>
          <Slider
            value={borderWidth}
            onChange={(v) => setBorderWidth(Number(v))}
            min={0}
            max={maxWidth}
            step={1}
          />
        </LabeledField>

        {/* Border Style */}
        <LabeledField label="Style">
          <Select
            value={borderStyle}
            onChange={(v) => setBorderStyle(v as BorderStyle)}
            options={BORDER_STYLE_OPTIONS}
          />
        </LabeledField>

        {/* Border Color - only show when width > 0 */}
        {borderWidth > 0 && (
          <ColorControl
            label="Color"
            value={borderColor}
            onChange={setBorderColor}
          />
        )}

        {/* Border Radius */}
        {showRadius && (
          <LabeledField label={`Radius: ${borderRadius}px`}>
            <Slider
              value={borderRadius}
              onChange={(v) => setBorderRadius(Number(v))}
              min={0}
              max={maxRadius}
              step={1}
            />
          </LabeledField>
        )}
      </div>
    </SectionCard>
  );
}
