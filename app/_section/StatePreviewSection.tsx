"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
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
        </div>
      </SectionCard>
    </div>
  );
}
