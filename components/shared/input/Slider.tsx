"use client";

import React from "react";

export interface SliderProps {
  value: string | number;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
}

export default function Slider(props: SliderProps) {
  return (
    <input
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      disabled={props.disabled}
      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[var(--primary)] hover:accent-[var(--primary-hover)] transition-all"
    />
  );
}
