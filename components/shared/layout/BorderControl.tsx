"use client";

import React from "react";
import SizeControl from "@/components/shared/input/SizeControl";
import ColorControl from "@/components/shared/color/ColorControl";

type BorderStyle = "none" | "solid" | "dashed" | "dotted" | "double";

type BorderControlProps = {
  width: number;
  setWidth: (v: number) => void;

  style: BorderStyle;
  setStyle: (v: BorderStyle) => void;

  // Optional Hover/Active widths
  hoverWidth?: number;
  setHoverWidth?: (v: number) => void;

  activeWidth?: number;
  setActiveWidth?: (v: number) => void;

  // Color props
  palette?: readonly string[];
  color: string;
  setColor: (v: string) => void;

  disabled?: boolean;
};

export default function BorderControl(props: BorderControlProps) {
  const {
    width,
    setWidth,
    style,
    setStyle,
    hoverWidth,
    setHoverWidth,
    activeWidth,
    setActiveWidth,
    palette,
    color,
    setColor,
    disabled = false,
  } = props;

  return (
    <div
      className="rounded-xl border p-4 space-y-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 70%, transparent)",
      }}
    >
      <SizeControl
        label="Border width (px)"
        value={width}
        onChange={setWidth}
        min={0}
        max={20}
        step={1}
      />

      {(hoverWidth !== undefined && setHoverWidth) ||
      (activeWidth !== undefined && setActiveWidth) ? (
        <div className="grid grid-cols-2 gap-3">
          {hoverWidth !== undefined && setHoverWidth && (
            <SizeControl
              label="Hover width"
              value={hoverWidth}
              onChange={setHoverWidth}
              min={0}
              max={20}
            />
          )}
          {activeWidth !== undefined && setActiveWidth && (
            <SizeControl
              label="Active width"
              value={activeWidth}
              onChange={setActiveWidth}
              min={0}
              max={20}
            />
          )}
        </div>
      ) : null}

      <div>
        <div
          className="text-xs font-semibold mb-2"
          style={{ color: "var(--text)" }}
        >
          Style
        </div>
        <div className="flex flex-wrap gap-2">
          {(["solid", "dashed", "dotted", "double", "none"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => setStyle(s)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:border-[var(--primary)]"
                }`}
                style={{
                  borderColor: style === s ? "var(--primary)" : "var(--border)",
                  background: style === s ? "var(--primary)" : "transparent",
                  color: style === s ? "white" : "var(--text)",
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      <ColorControl
        label="Border color"
        palette={palette}
        value={color}
        onChange={setColor}
      />
    </div>
  );
}
