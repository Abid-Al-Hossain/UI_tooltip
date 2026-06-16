"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import ColorControl from "@/components/shared/color/ColorControl";

import {
  TooltipState,
  THEME_OPTIONS,
  BACKDROP_FILTER_OPTIONS,
  THEME_PRESETS,
  TooltipTheme,
} from "../types";

interface AppearanceSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function AppearanceSection({
  state,
  update,
}: AppearanceSectionProps) {
  // Apply theme preset
  const applyTheme = (theme: TooltipTheme) => {
    update("theme", theme);
    if (theme !== "custom") {
      const preset = THEME_PRESETS[theme];
      Object.entries(preset).forEach(([key, value]) => {
        update(key as keyof TooltipState, value as TooltipState[keyof TooltipState]);
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Theme */}
      <SectionCard title="Theme" subtitle="Quick theme presets">
        <SegmentedControl
          value={state.theme}
          onChange={(v) => applyTheme(v as TooltipTheme)}
          items={THEME_OPTIONS}
        />
      </SectionCard>

      {/* Colors */}
      <SectionCard title="Colors" subtitle="Background and text colors">
        <div className="space-y-4">
          <ColorControl
            label="Background Color"
            value={state.bgColor}
            onChange={(v) => update("bgColor", v)}
          />

          <ColorControl
            label="Text Color"
            value={state.textColor}
            onChange={(v) => update("textColor", v)}
          />
        </div>
      </SectionCard>

      {/* Dimensions */}
      <SectionCard title="Dimensions" subtitle="Sizing and spacing">
        <div className="space-y-4">
          <LabeledField label={`Max Width: ${state.maxWidth}px`}>
            <Slider
              value={state.maxWidth}
              onChange={(v) => update("maxWidth", Number(v))}
              min={100}
              max={500}
              step={10}
            />
          </LabeledField>

          <LabeledField label={`Padding X: ${state.paddingX}px`}>
            <Slider
              value={state.paddingX}
              onChange={(v) => update("paddingX", Number(v))}
              min={0}
              max={32}
              step={1}
            />
          </LabeledField>

          <LabeledField label={`Padding Y: ${state.paddingY}px`}>
            <Slider
              value={state.paddingY}
              onChange={(v) => update("paddingY", Number(v))}
              min={0}
              max={24}
              step={1}
            />
          </LabeledField>

          <LabeledField label={`Border Radius: ${state.borderRadius}px`}>
            <Slider
              value={state.borderRadius}
              onChange={(v) => update("borderRadius", Number(v))}
              min={0}
              max={24}
              step={1}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Border */}
      <SectionCard title="Border" subtitle="Border styling">
        <div className="space-y-4">
          <LabeledField label={`Border Width: ${state.borderWidth}px`}>
            <Slider
              value={state.borderWidth}
              onChange={(v) => update("borderWidth", Number(v))}
              min={0}
              max={4}
              step={1}
            />
          </LabeledField>

          {state.borderWidth > 0 && (
            <>
              <LabeledField label="Border Style">
                <SegmentedControl
                  value={state.borderStyle}
                  onChange={(v) => update("borderStyle", v as typeof state.borderStyle)}
                  items={[
                    { value: "solid", label: "Solid" },
                    { value: "dashed", label: "Dashed" },
                    { value: "dotted", label: "Dotted" },
                  ]}
                />
              </LabeledField>
              <ColorControl
                label="Border Color"
                value={state.borderColor}
                onChange={(v) => update("borderColor", v)}
              />
            </>
          )}
        </div>
      </SectionCard>

      {/* Shadow */}
      <SectionCard title="Shadow" subtitle="Drop shadow effect">
        <div className="space-y-4">
          <Switch
            label="Enable Shadow"
            checked={state.shadowEnabled}
            onChange={(v) => update("shadowEnabled", v)}
          />

          {state.shadowEnabled && (
            <>
              <LabeledField label={`Offset X: ${state.shadowX}px`}>
                <Slider
                  value={state.shadowX}
                  onChange={(v) => update("shadowX", Number(v))}
                  min={-20}
                  max={20}
                  step={1}
                />
              </LabeledField>

              <LabeledField label={`Offset Y: ${state.shadowY}px`}>
                <Slider
                  value={state.shadowY}
                  onChange={(v) => update("shadowY", Number(v))}
                  min={-20}
                  max={20}
                  step={1}
                />
              </LabeledField>

              <LabeledField label={`Blur: ${state.shadowBlur}px`}>
                <Slider
                  value={state.shadowBlur}
                  onChange={(v) => update("shadowBlur", Number(v))}
                  min={0}
                  max={50}
                  step={1}
                />
              </LabeledField>

              <LabeledField label={`Spread: ${state.shadowSpread}px`}>
                <Slider
                  value={state.shadowSpread}
                  onChange={(v) => update("shadowSpread", Number(v))}
                  min={-10}
                  max={20}
                  step={1}
                />
              </LabeledField>

              <ColorControl
                label="Shadow Color"
                value={state.shadowColor}
                onChange={(v) => update("shadowColor", v)}
              />
            </>
          )}
        </div>
      </SectionCard>

      {/* Effects */}
      <SectionCard title="Effects" subtitle="Opacity and backdrop blur">
        <div className="space-y-4">
          <LabeledField label={`Opacity: ${state.opacity}%`}>
            <Slider
              value={state.opacity}
              onChange={(v) => update("opacity", Number(v))}
              min={0}
              max={100}
              step={1}
            />
          </LabeledField>

          <LabeledField label="Backdrop Filter">
            <Select
              value={state.backdropFilter}
              onChange={(v) => update("backdropFilter", v)}
              options={BACKDROP_FILTER_OPTIONS}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
