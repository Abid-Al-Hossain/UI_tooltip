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
  PLACEMENT_OPTIONS,
  BOUNDARY_OPTIONS,
  FOLLOW_CURSOR_OPTIONS,
  POSITION_STRATEGY_OPTIONS,
  STICKY_OPTIONS,
  APPEND_TO_OPTIONS,
  TooltipPlacement,
  BoundaryConstraint,
  PositionStrategy,
  AppendToMode,
  FollowCursorMode,
  StickyMode,
} from "../types";

interface PositionSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function PositionSection({
  state,
  update,
}: PositionSectionProps) {
  return (
    <div className="space-y-4">
      {/* Placement */}
      <SectionCard
        title="Placement"
        subtitle="Choose tooltip position relative to trigger"
      >
        <div className="space-y-4">
          <LabeledField label="Position">
            <Select
              value={state.placement}
              onChange={(v) => update("placement", v as TooltipPlacement)}
              options={PLACEMENT_OPTIONS}
            />
          </LabeledField>

          <Switch
            label="Auto Placement"
            checked={state.autoPlacement}
            onChange={(v) => update("autoPlacement", v)}
          />
        </div>
      </SectionCard>

      {/* Offset & Distance */}
      <SectionCard
        title="Offset & Distance"
        subtitle="Fine-tune tooltip positioning"
      >
        <div className="space-y-4">
          <LabeledField label={`Offset: ${state.offset}px`}>
            <Slider
              value={state.offset}
              onChange={(v) => update("offset", Number(v))}
              min={0}
              max={50}
              step={1}
            />
          </LabeledField>

          <LabeledField label={`Arrow Padding: ${state.arrowPadding}px`}>
            <Slider
              value={state.arrowPadding}
              onChange={(v) => update("arrowPadding", Number(v))}
              min={0}
              max={20}
              step={1}
            />
          </LabeledField>

          <LabeledField label={`Z-Index: ${state.zIndex}`}>
            <Slider
              value={state.zIndex}
              onChange={(v) => update("zIndex", Number(v))}
              min={1}
              max={9999}
              step={1}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Behavior */}
      <SectionCard
        title="Behavior"
        subtitle="Flip, shift, and boundary constraints"
      >
        <div className="space-y-4">
          <Switch
            label="Flip Behavior"
            checked={state.flipBehavior}
            onChange={(v) => update("flipBehavior", v)}
          />

          <LabeledField label="Boundary Constraint">
            <Select
              value={state.boundaryConstraint}
              onChange={(v) =>
                update("boundaryConstraint", v as BoundaryConstraint)
              }
              options={BOUNDARY_OPTIONS}
            />
          </LabeledField>

          <LabeledField label="Position Strategy">
            <SegmentedControl
              value={state.positionStrategy}
              onChange={(v) =>
                update("positionStrategy", v as PositionStrategy)
              }
              items={POSITION_STRATEGY_OPTIONS}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Advanced Positioning */}
      <SectionCard
        title="Advanced"
        subtitle="Cursor following, sticky, and append options"
      >
        <div className="space-y-4">
          <LabeledField label="Follow Cursor">
            <Select
              value={String(state.followCursor)}
              onChange={(v) => {
                const val = v === "true" ? true : v === "false" ? false : v;
                update("followCursor", val as FollowCursorMode);
              }}
              options={FOLLOW_CURSOR_OPTIONS}
            />
          </LabeledField>

          <LabeledField label="Sticky Mode">
            <Select
              value={String(state.sticky)}
              onChange={(v) => {
                const val = v === "false" ? false : v;
                update("sticky", val as StickyMode);
              }}
              options={STICKY_OPTIONS}
            />
          </LabeledField>

          <LabeledField label="Append To">
            <Select
              value={state.appendTo}
              onChange={(v) => update("appendTo", v as AppendToMode)}
              options={APPEND_TO_OPTIONS}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
