"use client";

import React from "react";
import SizeControl from "@/components/shared/input/SizeControl";

type SpacingControlProps = {
  label?: string;
  x: number;
  setX: (v: number) => void;
  y: number;
  setY: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export default function SpacingControl(props: SpacingControlProps) {
  const {
    label = "Spacing",
    x,
    setX,
    y,
    setY,
    min = 0,
    max = 80,
    step = 1,
  } = props;

  return (
    <div
      className="rounded-xl border p-3 space-y-2"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 60%, transparent)",
      }}
    >
      <div
        className="text-xs font-semibold mb-1"
        style={{ color: "var(--text)" }}
      >
        {label}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SizeControl
          label="Horizontal (X)"
          value={x}
          onChange={setX}
          min={min}
          max={max}
          step={step}
        />
        <SizeControl
          label="Vertical (Y)"
          value={y}
          onChange={setY}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
}
