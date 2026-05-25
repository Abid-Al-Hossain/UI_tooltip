"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import Switch from "../input/Switch";

export interface StatePreviewSectionProps {
  /** Force hover state in preview */
  forceHover: boolean;
  setForceHover: (v: boolean) => void;
  /** Force active/pressed state in preview */
  forceActive: boolean;
  setForceActive: (v: boolean) => void;
  /** Force focus state in preview */
  forceFocus: boolean;
  setForceFocus: (v: boolean) => void;
  /** Force disabled state (optional) */
  forceDisabled?: boolean;
  setForceDisabled?: (v: boolean) => void;
  /** Force loading state (optional) */
  forceLoading?: boolean;
  setForceLoading?: (v: boolean) => void;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

/**
 * StatePreviewSection - Force interactive states in preview.
 * Allows testing hover, active, focus, disabled, and loading states.
 */
export default function StatePreviewSection({
  forceHover,
  setForceHover,
  forceActive,
  setForceActive,
  forceFocus,
  setForceFocus,
  forceDisabled,
  setForceDisabled,
  forceLoading,
  setForceLoading,
  title = "State Preview",
  subtitle = "Force states in preview",
}: StatePreviewSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="grid grid-cols-2 gap-3">
        <Switch
          label="Force hover"
          checked={forceHover}
          onChange={setForceHover}
        />
        <Switch
          label="Force active"
          checked={forceActive}
          onChange={setForceActive}
        />
        <Switch
          label="Force focus"
          checked={forceFocus}
          onChange={setForceFocus}
        />
        {forceDisabled !== undefined && setForceDisabled && (
          <Switch
            label="Force disabled"
            checked={forceDisabled}
            onChange={setForceDisabled}
          />
        )}
        {forceLoading !== undefined && setForceLoading && (
          <Switch
            label="Force loading"
            checked={forceLoading}
            onChange={setForceLoading}
          />
        )}
      </div>
    </SectionCard>
  );
}
