"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import ColorControl from "../color/ColorControl";
import GradientControl from "../effects/GradientControl";

export interface GradientConfig {
  enabled: boolean;
  angle: number;
  startColor: string;
  midColor: string;
  endColor: string;
  useMidColor: boolean;
  opacity: number;
}

export interface ColorsSectionProps {
  /** Background color */
  bgColor: string;
  setBgColor: (v: string) => void;
  /** Text/foreground color */
  textColor: string;
  setTextColor: (v: string) => void;
  /** Optional gradient configuration */
  gradient?: GradientConfig;
  setGradient?: (v: GradientConfig) => void;
  /** Show gradient controls (default: true) */
  showGradient?: boolean;
  /** Optional color palette for quick selection */
  palette?: readonly string[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const DEFAULT_PALETTE = [
  "#111827",
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#8b5cf6",
  "#0ea5e9",
  "#ffffff",
] as const;

/**
 * ColorsSection - Generic colors control section.
 * Controls background color, text color, and optional gradient.
 */
export default function ColorsSection({
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  gradient,
  setGradient,
  showGradient = true,
  palette = DEFAULT_PALETTE,
  title = "Colors",
  subtitle = "Background and text colors",
}: ColorsSectionProps) {
  const updateGradient = (updates: Partial<GradientConfig>) => {
    if (gradient && setGradient) {
      setGradient({ ...gradient, ...updates });
    }
  };

  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Background Color */}
        <ColorControl
          label="Background Color"
          value={bgColor}
          onChange={setBgColor}
          palette={palette}
        />

        {/* Text Color */}
        <ColorControl
          label="Text Color"
          value={textColor}
          onChange={setTextColor}
          palette={palette}
        />

        {/* Gradient Controls */}
        {showGradient && gradient && setGradient && (
          <GradientControl
            enabled={gradient.enabled}
            setEnabled={(v: boolean) => updateGradient({ enabled: v })}
            angle={gradient.angle}
            setAngle={(v: number) => updateGradient({ angle: v })}
            startColor={gradient.startColor}
            setStartColor={(v: string) => updateGradient({ startColor: v })}
            midColor={gradient.midColor}
            setMidColor={(v: string) => updateGradient({ midColor: v })}
            endColor={gradient.endColor}
            setEndColor={(v: string) => updateGradient({ endColor: v })}
            midEnabled={gradient.useMidColor}
            setMidEnabled={(v: boolean) => updateGradient({ useMidColor: v })}
            opacity={gradient.opacity}
            setOpacity={(v: number) => updateGradient({ opacity: v })}
          />
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Default gradient configuration
 */
export function createDefaultGradient(): GradientConfig {
  return {
    enabled: false,
    angle: 135,
    startColor: "#6366f1",
    midColor: "#8b5cf6",
    endColor: "#a855f7",
    useMidColor: false,
    opacity: 100,
  };
}

/**
 * Generate CSS gradient from config
 */
export function buildGradientCss(gradient: GradientConfig): string {
  if (!gradient.enabled) return "";

  const colors = gradient.useMidColor
    ? `${gradient.startColor}, ${gradient.midColor}, ${gradient.endColor}`
    : `${gradient.startColor}, ${gradient.endColor}`;

  return `linear-gradient(${gradient.angle}deg, ${colors})`;
}
