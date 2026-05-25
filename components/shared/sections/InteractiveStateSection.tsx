"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import Switch from "../input/Switch";
import Select from "../input/Select";
import ColorControl from "../color/ColorControl";

export type InteractiveState =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "disabled";

export interface StateColors {
  background: string;
  text: string;
  border: string;
}

export interface InteractiveStateSectionProps {
  /** State being configured */
  stateName: InteractiveState;
  /** Enable custom colors for this state */
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  /** Background color */
  bgColor: string;
  setBgColor: (v: string) => void;
  /** Text color */
  textColor: string;
  setTextColor: (v: string) => void;
  /** Border color */
  borderColor: string;
  setBorderColor: (v: string) => void;
  /** Opacity (for disabled state) */
  opacity?: number;
  setOpacity?: (v: number) => void;
  /** Cursor type (for disabled state) */
  cursor?: "default" | "pointer" | "not-allowed";
  setCursor?: (v: "default" | "pointer" | "not-allowed") => void;
  /** Scale transform */
  scale?: number;
  setScale?: (v: number) => void;
  /** Color palette */
  palette?: readonly string[];
  /** Section title (auto-generated from stateName if not provided) */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const CURSOR_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "pointer", label: "Pointer" },
  { value: "not-allowed", label: "Not Allowed" },
];

const STATE_LABELS: Record<
  InteractiveState,
  { title: string; subtitle: string }
> = {
  default: { title: "Default State", subtitle: "Normal appearance" },
  hover: { title: "Hover State", subtitle: "Mouse hover appearance" },
  active: { title: "Active State", subtitle: "Click/press appearance" },
  focus: { title: "Focus State", subtitle: "Keyboard focus appearance" },
  disabled: { title: "Disabled State", subtitle: "Disabled appearance" },
};

/**
 * InteractiveStateSection - Controls for interactive element states.
 * Configures colors, opacity, scale, and cursor for hover/active/focus/disabled states.
 */
export default function InteractiveStateSection({
  stateName,
  enabled,
  setEnabled,
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  borderColor,
  setBorderColor,
  opacity,
  setOpacity,
  cursor,
  setCursor,
  scale,
  setScale,
  palette,
  title,
  subtitle,
}: InteractiveStateSectionProps) {
  const stateInfo = STATE_LABELS[stateName];
  const displayTitle = title || stateInfo.title;
  const displaySubtitle = subtitle || stateInfo.subtitle;

  return (
    <SectionCard title={displayTitle} subtitle={displaySubtitle}>
      <div className="space-y-4">
        {/* Enable toggle */}
        <Switch
          label={`Enable custom ${stateName} styling`}
          checked={enabled}
          onChange={setEnabled}
        />

        {enabled && (
          <>
            {/* Colors */}
            <div className="space-y-3">
              <ColorControl
                label="Background"
                value={bgColor}
                onChange={setBgColor}
                palette={palette}
              />
              <ColorControl
                label="Text"
                value={textColor}
                onChange={setTextColor}
                palette={palette}
              />
              <ColorControl
                label="Border"
                value={borderColor}
                onChange={setBorderColor}
                palette={palette}
              />
            </div>

            {/* Scale (for hover/active) */}
            {scale !== undefined && setScale && (
              <LabeledField label={`Scale: ${scale.toFixed(2)}`}>
                <Slider
                  value={scale}
                  onChange={(v) => setScale(Number(v))}
                  min={0.9}
                  max={1.2}
                  step={0.01}
                />
              </LabeledField>
            )}

            {/* Opacity (for disabled) */}
            {opacity !== undefined && setOpacity && (
              <LabeledField label={`Opacity: ${opacity}%`}>
                <Slider
                  value={opacity}
                  onChange={(v) => setOpacity(Number(v))}
                  min={0}
                  max={100}
                  step={5}
                />
              </LabeledField>
            )}

            {/* Cursor (for disabled) */}
            {cursor !== undefined && setCursor && (
              <LabeledField label="Cursor">
                <Select
                  value={cursor}
                  onChange={(v) =>
                    setCursor(v as "default" | "pointer" | "not-allowed")
                  }
                  options={CURSOR_OPTIONS}
                />
              </LabeledField>
            )}
          </>
        )}
      </div>
    </SectionCard>
  );
}
