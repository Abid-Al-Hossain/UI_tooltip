"use client";

import React from "react";
import SizeControl from "@/components/shared/input/SizeControl";

type GlassControlProps = {
  blur: number;
  setBlur: (v: number) => void;

  opacity: number;
  setOpacity: (v: number) => void;

  saturation?: number;
  setSaturation?: (v: number) => void;

  label?: string;
  enabled?: boolean;
  setEnabled?: (v: boolean) => void;
};

export default function GlassControl(props: GlassControlProps) {
  const {
    blur,
    setBlur,
    opacity,
    setOpacity,
    saturation,
    setSaturation,
    label = "Glassmorphism",
    enabled,
    setEnabled,
  } = props;

  return (
    <div
      className="rounded-xl border p-4 space-y-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 70%, transparent)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          {label}
        </div>
        {setEnabled && (
          <label
            className="inline-flex items-center gap-2 text-xs uf-clickable cursor-pointer"
            style={{ color: "var(--muted)" }}
          >
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="accent-[var(--primary)]"
            />
            Enabled
          </label>
        )}
      </div>

      {(!setEnabled || enabled) && (
        <div className="grid gap-3 md:grid-cols-2">
          <SizeControl
            label="Blur (px)"
            value={blur}
            onChange={setBlur}
            min={0}
            max={40}
            step={1}
          />
          <SizeControl
            label="Opacity (0-1)"
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={1}
            step={0.01}
          />
          {saturation !== undefined && setSaturation && (
            <SizeControl
              label="Saturation"
              value={saturation}
              onChange={setSaturation}
              min={0}
              max={200}
              step={1}
              unit="%"
            />
          )}
        </div>
      )}
    </div>
  );
}
