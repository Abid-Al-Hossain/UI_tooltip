"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import ColorControl from "../color/ColorControl";
import Slider from "../input/Slider";
import Switch from "../input/Switch";

export interface ShadowLayer {
  id: string;
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface ShadowSectionProps {
  /** Array of shadow layers */
  layers: ShadowLayer[];
  /** Update a specific layer */
  updateLayer: (id: string, updates: Partial<ShadowLayer>) => void;
  /** Add a new layer */
  addLayer: () => void;
  /** Remove a layer */
  removeLayer: (id: string) => void;
  /** Maximum number of layers (default: 5) */
  maxLayers?: number;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

/**
 * ShadowSection - Generic multi-layer shadow control section.
 * Supports multiple shadow layers with full control over x, y, blur, spread, color, and inset.
 */
export default function ShadowSection({
  layers,
  updateLayer,
  addLayer,
  removeLayer,
  maxLayers = 5,
  title = "Shadow",
  subtitle = "Configure drop shadows",
}: ShadowSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className="rounded-xl border p-4 space-y-3"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 50%, transparent)",
            }}
          >
            {/* Layer Header */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Layer {index + 1}
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  label=""
                  checked={layer.enabled}
                  onChange={(v) => updateLayer(layer.id, { enabled: v })}
                />
                {layers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLayer(layer.id)}
                    className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    title="Remove layer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {layer.enabled && (
              <>
                {/* Position */}
                <div className="grid grid-cols-2 gap-3">
                  <LabeledField label={`X: ${layer.x}px`}>
                    <Slider
                      value={layer.x}
                      onChange={(v) => updateLayer(layer.id, { x: Number(v) })}
                      min={-50}
                      max={50}
                      step={1}
                    />
                  </LabeledField>
                  <LabeledField label={`Y: ${layer.y}px`}>
                    <Slider
                      value={layer.y}
                      onChange={(v) => updateLayer(layer.id, { y: Number(v) })}
                      min={-50}
                      max={50}
                      step={1}
                    />
                  </LabeledField>
                </div>

                {/* Blur & Spread */}
                <div className="grid grid-cols-2 gap-3">
                  <LabeledField label={`Blur: ${layer.blur}px`}>
                    <Slider
                      value={layer.blur}
                      onChange={(v) =>
                        updateLayer(layer.id, { blur: Number(v) })
                      }
                      min={0}
                      max={100}
                      step={1}
                    />
                  </LabeledField>
                  <LabeledField label={`Spread: ${layer.spread}px`}>
                    <Slider
                      value={layer.spread}
                      onChange={(v) =>
                        updateLayer(layer.id, { spread: Number(v) })
                      }
                      min={-50}
                      max={50}
                      step={1}
                    />
                  </LabeledField>
                </div>

                {/* Color */}
                <ColorControl
                  label="Color"
                  value={layer.color}
                  onChange={(v) => updateLayer(layer.id, { color: v })}
                />

                {/* Inset */}
                <Switch
                  label="Inset shadow"
                  checked={layer.inset}
                  onChange={(v) => updateLayer(layer.id, { inset: v })}
                />
              </>
            )}
          </div>
        ))}

        {/* Add Layer Button */}
        {layers.length < maxLayers && (
          <button
            type="button"
            onClick={addLayer}
            className="w-full py-2 rounded-xl border text-sm font-medium transition-all hover:bg-slate-800/50"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            + Add Shadow Layer
          </button>
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Helper to generate CSS box-shadow from layers
 */
export function buildBoxShadowCss(layers: ShadowLayer[]): string {
  return layers
    .filter((l) => l.enabled)
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`,
    )
    .join(", ");
}

/**
 * Default shadow layer
 */
export function createDefaultShadowLayer(id?: string): ShadowLayer {
  return {
    id: id || `shadow-${Date.now()}`,
    enabled: true,
    x: 0,
    y: 4,
    blur: 12,
    spread: 0,
    color: "rgba(0,0,0,0.25)",
    inset: false,
  };
}
