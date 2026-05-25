"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import { TooltipState } from "../types";

interface BehaviorSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function BehaviorSection({
  state,
  update,
}: BehaviorSectionProps) {
  return (
    <div className="space-y-4">
      <SectionCard title="Dismissal" subtitle="How the tooltip closes">
        <div className="space-y-4">
          <Switch
            label="Close on Click Outside"
            checked={Boolean(state.hideOnClick)}
            onChange={(v) => update("hideOnClick", v)}
          />
          <Switch
            label="Close on Pointer Down"
            checked={state.closeOnPointerDown}
            onChange={(v) => update("closeOnPointerDown", v)}
          />
          <Switch
            label="Close on Scroll"
            checked={state.hideOnScroll}
            onChange={(v) => update("hideOnScroll", v)}
          />
          <Switch
            label="Close on Escape Key"
            checked={state.hideOnEscapeKey}
            onChange={(v) => update("hideOnEscapeKey", v)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Touch & Shared State"
        subtitle="Mobile hold timing and shared-trigger behavior"
      >
        <div className="space-y-4">
          <LabeledField label={`Touch Hold Delay: ${state.touchHoldDelay}ms`}>
            <Slider
              value={state.touchHoldDelay}
              onChange={(v) => update("touchHoldDelay", Number(v))}
              min={0}
              max={1000}
              step={50}
            />
          </LabeledField>

          <Switch
            label="Singleton (Shared across triggers)"
            checked={state.singleton}
            onChange={(v) => update("singleton", v)}
          />
        </div>
      </SectionCard>
    </div>
  );
}
