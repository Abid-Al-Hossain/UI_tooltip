"use client";

import React from "react";
import SizeControl from "@/components/shared/input/SizeControl";
import ColorControl from "@/components/shared/color/ColorControl";

type ShadowLayerControlProps = {
  label?: string;
  enabled?: boolean;
  setEnabled?: (v: boolean) => void;

  x: number;
  setX: (v: number) => void;

  y: number;
  setY: (v: number) => void;

  blur: number;
  setBlur: (v: number) => void;

  spread: number;
  setSpread: (v: number) => void;

  opacity: number;
  setOpacity: (v: number) => void;

  // Color props
  palette?: readonly string[];
  color: string;
  setColor: (v: string) => void;
};

export default function ShadowLayerControl(props: ShadowLayerControlProps) {
  const {
    label,
    enabled,
    setEnabled,
    x,
    setX,
    y,
    setY,
    blur,
    setBlur,
    spread,
    setSpread,
    opacity,
    setOpacity,
    palette,
    color,
    setColor,
  } = props;

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 70%, transparent)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        {label && (
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            {label}
          </div>
        )}
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
          <div className="grid gap-4 md:grid-cols-2">
            <SizeControl
              label="X offset (px)"
              value={x}
              onChange={setX}
              min={-60}
              max={60}
              step={1}
            />
            <SizeControl
              label="Y offset (px)"
              value={y}
              onChange={setY}
              min={-60}
              max={60}
              step={1}
            />
            <SizeControl
              label="Blur (px)"
              value={blur}
              onChange={setBlur}
              min={0}
              max={120}
              step={1}
            />
            <SizeControl
              label="Spread (px)"
              value={spread}
              onChange={setSpread}
              min={-40}
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
          </div>

          <div className="mt-4">
            <ColorControl
              label="Shadow color"
              palette={palette}
              value={color}
              onChange={setColor}
            />
          </div>
        </>
      )}
    </div>
  );
}
