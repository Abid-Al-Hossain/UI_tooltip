"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import Switch from "../input/Switch";
import ColorControl from "../color/ColorControl";

export interface FocusRingSectionProps {
  /** Enable focus ring */
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  /** Ring width in px */
  width: number;
  setWidth: (v: number) => void;
  /** Ring offset in px */
  offset: number;
  setOffset: (v: number) => void;
  /** Ring color */
  color: string;
  setColor: (v: string) => void;
  /** Color palette for picker */
  palette?: readonly string[];
  /** Max width (default: 10) */
  maxWidth?: number;
  /** Max offset (default: 8) */
  maxOffset?: number;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const DEFAULT_PALETTE = [
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#0ea5e9",
  "#14b8a6",
  "#22c55e",
  "#ffffff",
  "#000000",
] as const;

/**
 * FocusRingSection - Focus ring/outline controls for accessibility.
 * Controls enabled state, ring width, offset, and color.
 */
export default function FocusRingSection({
  enabled,
  setEnabled,
  width,
  setWidth,
  offset,
  setOffset,
  color,
  setColor,
  palette = DEFAULT_PALETTE,
  maxWidth = 10,
  maxOffset = 8,
  title = "Focus Ring",
  subtitle = "Accessibility focus styling",
}: FocusRingSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Enable toggle */}
        <Switch
          label="Enable focus ring"
          checked={enabled}
          onChange={setEnabled}
        />

        {enabled && (
          <>
            {/* Width & Offset */}
            <div className="grid grid-cols-2 gap-3">
              <LabeledField label={`Width: ${width}px`}>
                <Slider
                  value={width}
                  onChange={(v) => setWidth(Number(v))}
                  min={0}
                  max={maxWidth}
                  step={1}
                />
              </LabeledField>
              <LabeledField label={`Offset: ${offset}px`}>
                <Slider
                  value={offset}
                  onChange={(v) => setOffset(Number(v))}
                  min={0}
                  max={maxOffset}
                  step={1}
                />
              </LabeledField>
            </div>

            {/* Color */}
            <ColorControl
              label="Ring Color"
              value={color}
              onChange={setColor}
              palette={palette}
            />
          </>
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Build CSS for focus ring using outline
 */
export function buildFocusRingCss(
  enabled: boolean,
  width: number,
  offset: number,
  color: string,
): string {
  if (!enabled) return "";
  return `outline: ${width}px solid ${color}; outline-offset: ${offset}px;`;
}
