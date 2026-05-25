"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import ColorControl from "@/components/shared/color/ColorControl";

import { TooltipState } from "../types";

interface ArrowSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function ArrowSection({ state, update }: ArrowSectionProps) {
  return (
    <div className="space-y-4">
      {/* Arrow Visibility */}
      <SectionCard title="Arrow" subtitle="Toggle and customize tooltip arrow">
        <div className="space-y-4">
          <Switch
            label="Show Arrow"
            checked={state.showArrow}
            onChange={(v) => update("showArrow", v)}
          />

          {state.showArrow && (
            <>
              <LabeledField label={`Arrow Size: ${state.arrowSize}px`}>
                <Slider
                  value={state.arrowSize}
                  onChange={(v) => update("arrowSize", Number(v))}
                  min={4}
                  max={16}
                  step={1}
                />
              </LabeledField>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    Arrow Color
                  </label>
                  <button
                    onClick={() =>
                      update(
                        "arrowColor",
                        state.arrowColor === "inherit"
                          ? state.bgColor
                          : "inherit",
                      )
                    }
                    className="text-xs px-2 py-1 rounded-md transition"
                    style={{
                      background:
                        state.arrowColor === "inherit"
                          ? "var(--primary)"
                          : "var(--surface)",
                      color:
                        state.arrowColor === "inherit"
                          ? "white"
                          : "var(--muted)",
                    }}
                  >
                    {state.arrowColor === "inherit" ? "Inheriting" : "Custom"}
                  </button>
                </div>

                {state.arrowColor !== "inherit" && (
                  <ColorControl
                    label=""
                    value={state.arrowColor}
                    onChange={(v) => update("arrowColor", v)}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* Arrow Preview */}
      {state.showArrow && (
        <SectionCard title="Arrow Preview" subtitle="Visual representation">
          <div
            className="flex items-center justify-center p-6 rounded-xl"
            style={{ background: "var(--surface)" }}
          >
            <div className="relative">
              {/* Tooltip mock */}
              <div
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: state.bgColor,
                  color: state.textColor,
                }}
              >
                Tooltip
              </div>
              {/* Arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: "100%",
                  width: 0,
                  height: 0,
                  borderLeft: `${state.arrowSize}px solid transparent`,
                  borderRight: `${state.arrowSize}px solid transparent`,
                  borderTop: `${state.arrowSize}px solid ${
                    state.arrowColor === "inherit"
                      ? state.bgColor
                      : state.arrowColor
                  }`,
                }}
              />
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
