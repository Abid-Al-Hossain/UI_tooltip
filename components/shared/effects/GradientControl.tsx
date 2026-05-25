"use client";

import React from "react";
import SizeControl from "@/components/shared/input/SizeControl";
import ColorControl from "@/components/shared/color/ColorControl";

type GradientControlProps = {
  enabled?: boolean;
  setEnabled?: (v: boolean) => void;

  angle: number;
  setAngle: (v: number) => void;

  startColor: string;
  setStartColor: (v: string) => void;

  endColor: string;
  setEndColor: (v: string) => void;

  // Optional mid-stop
  midColor?: string;
  setMidColor?: (v: string) => void;
  midEnabled?: boolean;
  setMidEnabled?: (v: boolean) => void;

  opacity?: number;
  setOpacity?: (v: number) => void;

  palette?: readonly string[];
  label?: string;
};

export default function GradientControl(props: GradientControlProps) {
  const {
    enabled,
    setEnabled,
    angle,
    setAngle,
    startColor,
    setStartColor,
    endColor,
    setEndColor,
    midColor,
    setMidColor,
    midEnabled,
    setMidEnabled,
    opacity,
    setOpacity,
    palette,
    label = "Gradient",
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
              label="Angle (deg)"
              value={angle}
              onChange={setAngle}
              min={0}
              max={360}
              step={1}
            />
            {opacity !== undefined && setOpacity && (
              <SizeControl
                label="Opacity (0-1)"
                value={opacity}
                onChange={setOpacity}
                min={0}
                max={1}
                step={0.01}
              />
            )}
          </div>

          <ColorControl
            label="Start color"
            palette={palette}
            value={startColor}
            onChange={setStartColor}
          />

          {setMidEnabled && (
            <label
              className="flex items-center gap-2 text-xs uf-clickable"
              style={{ color: "var(--muted)" }}
            >
              <input
                type="checkbox"
                checked={midEnabled}
                onChange={(e) => setMidEnabled(e.target.checked)}
                className="accent-[var(--primary)]"
              />
              Mid stop
            </label>
          )}

          {midEnabled && midColor !== undefined && setMidColor && (
            <ColorControl
              label="Mid color"
              palette={palette}
              value={midColor}
              onChange={setMidColor}
            />
          )}

          <ColorControl
            label="End color"
            palette={palette}
            value={endColor}
            onChange={setEndColor}
          />
        </>
      )}
    </div>
  );
}
