"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import { SegmentedControl } from "../input/SegmentedControl";

export type SizeUnit = "px" | "rem" | "%" | "em";

export interface SizingSectionProps {
  /** Width value */
  width: number;
  setWidth: (v: number) => void;
  /** Width unit */
  widthUnit?: SizeUnit;
  setWidthUnit?: (v: SizeUnit) => void;
  /** Height value */
  height: number;
  setHeight: (v: number) => void;
  /** Height unit */
  heightUnit?: SizeUnit;
  setHeightUnit?: (v: SizeUnit) => void;
  /** Padding values (can be single number or object) */
  padding?: number;
  setPadding?: (v: number) => void;
  paddingX?: number;
  setPaddingX?: (v: number) => void;
  paddingY?: number;
  setPaddingY?: (v: number) => void;
  /** Min/max constraints */
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  maxPadding?: number;
  /** Show unit toggles (default: false) */
  showUnits?: boolean;
  /** Show padding controls (default: true) */
  showPadding?: boolean;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const UNIT_OPTIONS = [
  { value: "px", label: "px" },
  { value: "rem", label: "rem" },
  { value: "%", label: "%" },
];

/**
 * SizingSection - Generic sizing control section.
 * Controls width, height, and padding with optional unit toggles.
 */
export default function SizingSection({
  width,
  setWidth,
  widthUnit = "px",
  setWidthUnit,
  height,
  setHeight,
  heightUnit = "px",
  setHeightUnit,
  padding,
  setPadding,
  paddingX,
  setPaddingX,
  paddingY,
  setPaddingY,
  minWidth = 0,
  maxWidth = 500,
  minHeight = 0,
  maxHeight = 500,
  maxPadding = 64,
  showUnits = false,
  showPadding = true,
  title = "Sizing",
  subtitle = "Dimensions and spacing",
}: SizingSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Width */}
        <div className="space-y-2">
          <LabeledField label={`Width: ${width}${widthUnit}`}>
            <Slider
              value={width}
              onChange={(v) => setWidth(Number(v))}
              min={minWidth}
              max={maxWidth}
              step={1}
            />
          </LabeledField>
          {showUnits && setWidthUnit && (
            <SegmentedControl
              value={widthUnit}
              onChange={(v) => setWidthUnit(v as SizeUnit)}
              items={UNIT_OPTIONS}
            />
          )}
        </div>

        {/* Height */}
        <div className="space-y-2">
          <LabeledField label={`Height: ${height}${heightUnit}`}>
            <Slider
              value={height}
              onChange={(v) => setHeight(Number(v))}
              min={minHeight}
              max={maxHeight}
              step={1}
            />
          </LabeledField>
          {showUnits && setHeightUnit && (
            <SegmentedControl
              value={heightUnit}
              onChange={(v) => setHeightUnit(v as SizeUnit)}
              items={UNIT_OPTIONS}
            />
          )}
        </div>

        {/* Padding */}
        {showPadding && (
          <>
            {/* Unified padding */}
            {padding !== undefined && setPadding && (
              <LabeledField label={`Padding: ${padding}px`}>
                <Slider
                  value={padding}
                  onChange={(v) => setPadding(Number(v))}
                  min={0}
                  max={maxPadding}
                  step={1}
                />
              </LabeledField>
            )}

            {/* Separate X/Y padding */}
            {paddingX !== undefined && setPaddingX && (
              <LabeledField label={`Padding X: ${paddingX}px`}>
                <Slider
                  value={paddingX}
                  onChange={(v) => setPaddingX(Number(v))}
                  min={0}
                  max={maxPadding}
                  step={1}
                />
              </LabeledField>
            )}
            {paddingY !== undefined && setPaddingY && (
              <LabeledField label={`Padding Y: ${paddingY}px`}>
                <Slider
                  value={paddingY}
                  onChange={(v) => setPaddingY(Number(v))}
                  min={0}
                  max={maxPadding}
                  step={1}
                />
              </LabeledField>
            )}
          </>
        )}
      </div>
    </SectionCard>
  );
}
