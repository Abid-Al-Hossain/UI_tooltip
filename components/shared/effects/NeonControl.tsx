"use client";

import React from "react";
import SizeControl from "@/components/shared/input/SizeControl";
import ColorControl from "@/components/shared/color/ColorControl";

type NeonControlProps = {
  label?: string;
  enabled?: boolean;
  setEnabled?: (v: boolean) => void;

  blur: number;
  setBlur: (v: number) => void;

  color: string;
  setColor: (v: string) => void;

  // Optional intensity or spread?
  intensity?: number;
  setIntensity?: (v: number) => void;

  palette?: readonly string[];
};

export default function NeonControl(props: NeonControlProps) {
  const {
    label = "Neon Glow",
    enabled,
    setEnabled,
    blur,
    setBlur,
    color,
    setColor,
    intensity,
    setIntensity,
    palette,
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
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Blur (px)"
              value={blur}
              onChange={setBlur}
              min={0}
              max={100}
              step={1}
            />
            {intensity !== undefined && setIntensity && (
              <SizeControl
                label="Intensity"
                value={intensity}
                onChange={setIntensity}
                min={0}
                max={5}
                step={0.1}
              />
            )}
          </div>

          <ColorControl
            label="Glow color"
            palette={palette}
            value={color}
            onChange={setColor}
          />
        </>
      )}
    </div>
  );
}
