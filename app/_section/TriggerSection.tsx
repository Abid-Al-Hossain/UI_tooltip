"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";

import {
  TooltipState,
  TRIGGER_EVENT_OPTIONS,
  TriggerEvent,
} from "../types";

type TriggerFamily = "hover" | "focus" | "click" | "mixed" | "manual";

const TRIGGER_FAMILY_ITEMS: { value: TriggerFamily; label: string }[] = [
  { value: "hover", label: "Hover" },
  { value: "focus", label: "Focus" },
  { value: "click", label: "Click" },
  { value: "mixed", label: "Mixed" },
  { value: "manual", label: "Manual" },
];

function getTriggerFamily(event: TriggerEvent): TriggerFamily {
  if (event === "manual") return "manual";
  if (event === "click") return "click";
  if (event === "focus") return "focus";
  if (event === "mouseenter") return "hover";
  return "mixed";
}

function getTriggerEventForFamily(family: TriggerFamily): TriggerEvent {
  switch (family) {
    case "hover":
      return "mouseenter";
    case "focus":
      return "focus";
    case "click":
      return "click";
    case "manual":
      return "manual";
    default:
      return "mouseenter focus";
  }
}

interface TriggerSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function TriggerSection({ state, update }: TriggerSectionProps) {
  return (
    <div className="space-y-4">
      <SectionCard
        title="Trigger Families"
        subtitle="Hover, focus, click, and manual trigger patterns"
      >
        <div className="space-y-4">
          <SegmentedControl
            value={getTriggerFamily(state.triggerEvent)}
            onChange={(v) => update("triggerEvent", getTriggerEventForFamily(v as TriggerFamily))}
            items={TRIGGER_FAMILY_ITEMS}
          />

          <LabeledField label="Detailed Trigger Event">
            <Select
              value={state.triggerEvent}
              onChange={(v) => update("triggerEvent", v as TriggerEvent)}
              options={TRIGGER_EVENT_OPTIONS}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Interactive Behavior */}
      <SectionCard title="Interactive" subtitle="Allow hovering over tooltip">
        <div className="space-y-4">
          <Switch
            label="Interactive Mode"
            checked={state.interactive}
            onChange={(v) => update("interactive", v)}
          />

          {state.interactive && (
            <LabeledField
              label={`Interactive Border: ${state.interactiveBorder}px`}
            >
              <Slider
                value={state.interactiveBorder}
                onChange={(v) => update("interactiveBorder", Number(v))}
                min={0}
                max={20}
                step={1}
              />
            </LabeledField>
          )}
        </div>
      </SectionCard>

    </div>
  );
}
