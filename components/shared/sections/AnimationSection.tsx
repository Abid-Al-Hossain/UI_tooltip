"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Select from "../input/Select";
import { SegmentedControl } from "../input/SegmentedControl";

export type AnimationType =
  | "none"
  | "fade"
  | "scale"
  | "slide"
  | "rotate"
  | "bounce"
  | "pulse"
  | "shake";

export type AnimationDirection = "up" | "down" | "left" | "right";

export interface AnimationSectionProps {
  /** Entrance animation type */
  entranceType: AnimationType;
  setEntranceType: (v: AnimationType) => void;
  /** Entrance animation direction (for slide) */
  entranceDirection?: AnimationDirection;
  setEntranceDirection?: (v: AnimationDirection) => void;
  /** Hover animation type */
  hoverType?: AnimationType;
  setHoverType?: (v: AnimationType) => void;
  /** Exit animation type */
  exitType?: AnimationType;
  setExitType?: (v: AnimationType) => void;
  /** Show entrance controls (default: true) */
  showEntrance?: boolean;
  /** Show hover controls (default: true) */
  showHover?: boolean;
  /** Show exit controls (default: false) */
  showExit?: boolean;
  /** Available animation types */
  availableTypes?: AnimationType[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const DEFAULT_ANIMATION_TYPES: AnimationType[] = [
  "none",
  "fade",
  "scale",
  "slide",
  "rotate",
  "bounce",
  "pulse",
  "shake",
];

const ANIMATION_TYPE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "fade", label: "Fade" },
  { value: "scale", label: "Scale" },
  { value: "slide", label: "Slide" },
  { value: "rotate", label: "Rotate" },
  { value: "bounce", label: "Bounce" },
  { value: "pulse", label: "Pulse" },
  { value: "shake", label: "Shake" },
];

const DIRECTION_OPTIONS = [
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

/**
 * AnimationSection - Animation controls for entrance, hover, and exit.
 * Configurable animation types and directions.
 */
export default function AnimationSection({
  entranceType,
  setEntranceType,
  entranceDirection = "up",
  setEntranceDirection,
  hoverType,
  setHoverType,
  exitType,
  setExitType,
  showEntrance = true,
  showHover = true,
  showExit = false,
  availableTypes = DEFAULT_ANIMATION_TYPES,
  title = "Animation",
  subtitle = "Motion and transitions",
}: AnimationSectionProps) {
  const typeOptions = ANIMATION_TYPE_OPTIONS.filter((opt) =>
    availableTypes.includes(opt.value as AnimationType),
  );

  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-5">
        {/* Entrance Animation */}
        {showEntrance && (
          <div className="space-y-3">
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Entrance Animation
            </div>
            <LabeledField label="Type">
              <Select
                value={entranceType}
                onChange={(v) => setEntranceType(v as AnimationType)}
                options={typeOptions}
              />
            </LabeledField>
            {entranceType === "slide" && setEntranceDirection && (
              <LabeledField label="Direction">
                <SegmentedControl
                  value={entranceDirection}
                  onChange={(v) =>
                    setEntranceDirection(v as AnimationDirection)
                  }
                  items={DIRECTION_OPTIONS}
                />
              </LabeledField>
            )}
          </div>
        )}

        {/* Hover Animation */}
        {showHover && hoverType !== undefined && setHoverType && (
          <div
            className="space-y-3 pt-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Hover Animation
            </div>
            <LabeledField label="Type">
              <Select
                value={hoverType}
                onChange={(v) => setHoverType(v as AnimationType)}
                options={typeOptions}
              />
            </LabeledField>
          </div>
        )}

        {/* Exit Animation */}
        {showExit && exitType !== undefined && setExitType && (
          <div
            className="space-y-3 pt-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Exit Animation
            </div>
            <LabeledField label="Type">
              <Select
                value={exitType}
                onChange={(v) => setExitType(v as AnimationType)}
                options={typeOptions}
              />
            </LabeledField>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
