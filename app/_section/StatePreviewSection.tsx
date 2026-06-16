"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Switch from "@/components/shared/input/Switch";
import Slider from "@/components/shared/input/Slider";
import ColorControl from "@/components/shared/color/ColorControl";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import type { TooltipControlMode, TooltipState } from "../types";

const CONTROL_MODE_ITEMS: { value: TooltipControlMode; label: string }[] = [
  { value: "uncontrolled", label: "Uncontrolled" },
  { value: "controlled", label: "Controlled" },
  { value: "manual", label: "Manual" },
];

interface StatePreviewSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function StatePreviewSection({
  state,
  update,
}: StatePreviewSectionProps) {
  return (
    <div className="space-y-4">
      <SectionCard
        title="State Preview"
        subtitle="Preview ownership, open state, and disabled tooltip behavior."
      >
        <div className="space-y-4">
          <SegmentedControl
            value={state.controlMode}
            onChange={(v) => update("controlMode", v as TooltipControlMode)}
            items={CONTROL_MODE_ITEMS}
          />

          {state.controlMode !== "uncontrolled" ? (
            <Switch
              label={`Preview Open State: ${state.controlledOpen ? "Open" : "Closed"}`}
              checked={state.controlledOpen}
              onChange={(v) => update("controlledOpen", v)}
            />
          ) : null}

          <Switch
            label="Disabled"
            checked={state.disabled}
            onChange={(v) => update("disabled", v)}
          />
          {state.disabled && (
            <>
              <LabeledField label={`Disabled Opacity: ${state.disabledOpacity}`}>
                <Slider
                  value={state.disabledOpacity}
                  onChange={(v) => update("disabledOpacity", Number(v))}
                  min={0.1}
                  max={1}
                  step={0.05}
                />
              </LabeledField>
              <LabeledField label="Disabled Cursor">
                <SegmentedControl
                  value={state.disabledCursor}
                  onChange={(v) => update("disabledCursor", v as TooltipState["disabledCursor"])}
                  items={[
                    { value: "not-allowed", label: "Not Allowed" },
                    { value: "default", label: "Default" },
                    { value: "pointer", label: "Pointer" },
                  ]}
                />
              </LabeledField>
              <Switch
                label="Use Custom Disabled Colors"
                checked={state.disabledUseCustomColors}
                onChange={(v) => update("disabledUseCustomColors", v)}
              />
            </>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Focus Ring" subtitle="Keyboard focus indicator on the trigger element.">
        <div className="space-y-4">
          <Switch
            label="Enabled"
            checked={state.focusRingEnabled}
            onChange={(v) => update("focusRingEnabled", v)}
          />
          <ColorControl
            label="Ring Color"
            value={state.focusRingColor}
            onChange={(v) => update("focusRingColor", v)}
          />
          <LabeledField label={`Ring Width: ${state.focusRingWidth}px`}>
            <Slider
              value={state.focusRingWidth}
              onChange={(v) => update("focusRingWidth", Number(v))}
              min={1}
              max={6}
              step={1}
            />
          </LabeledField>
          <LabeledField label={`Ring Offset: ${state.focusRingOffset}px`}>
            <Slider
              value={state.focusRingOffset}
              onChange={(v) => update("focusRingOffset", Number(v))}
              min={0}
              max={8}
              step={1}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard title="Interactive Hover" subtitle="Bubble color change while re-hovering an interactive tooltip.">
        <div className="space-y-4">
          <ColorControl
            label="Hover Background"
            value={state.hoverBgColor}
            onChange={(v) => update("hoverBgColor", v)}
          />
          <ColorControl
            label="Hover Text"
            value={state.hoverTextColor}
            onChange={(v) => update("hoverTextColor", v)}
          />
        </div>
      </SectionCard>
    </div>
  );
}
