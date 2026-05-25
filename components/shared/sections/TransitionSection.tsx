"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import Select from "../input/Select";

export type EasingType =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export interface TransitionSectionProps {
  /** Transition duration in ms */
  duration: number;
  setDuration: (v: number) => void;
  /** Transition easing */
  easing: EasingType;
  setEasing: (v: EasingType) => void;
  /** Optional: delay in ms */
  delay?: number;
  setDelay?: (v: number) => void;
  /** Max duration (default: 2000) */
  maxDuration?: number;
  /** Max delay (default: 1000) */
  maxDelay?: number;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const EASING_OPTIONS = [
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In/Out" },
  { value: "linear", label: "Linear" },
];

/**
 * TransitionSection - Generic transition/animation timing controls.
 * Controls duration, easing, and optional delay.
 */
export default function TransitionSection({
  duration,
  setDuration,
  easing,
  setEasing,
  delay,
  setDelay,
  maxDuration = 2000,
  maxDelay = 1000,
  title = "Transitions",
  subtitle = "Animation timing",
}: TransitionSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Duration */}
        <LabeledField label={`Duration: ${duration}ms`}>
          <Slider
            value={duration}
            onChange={(v) => setDuration(Number(v))}
            min={0}
            max={maxDuration}
            step={10}
          />
        </LabeledField>

        {/* Easing */}
        <LabeledField label="Easing">
          <Select
            value={easing}
            onChange={(v) => setEasing(v as EasingType)}
            options={EASING_OPTIONS}
          />
        </LabeledField>

        {/* Delay (optional) */}
        {delay !== undefined && setDelay && (
          <LabeledField label={`Delay: ${delay}ms`}>
            <Slider
              value={delay}
              onChange={(v) => setDelay(Number(v))}
              min={0}
              max={maxDelay}
              step={10}
            />
          </LabeledField>
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Build CSS transition from config
 */
export function buildTransitionCss(
  properties: string | string[],
  duration: number,
  easing: EasingType,
  delay?: number,
): string {
  const props = Array.isArray(properties) ? properties : [properties];
  const delayPart = delay ? ` ${delay}ms` : "";
  return props
    .map((prop) => `${prop} ${duration}ms ${easing}${delayPart}`)
    .join(", ");
}
