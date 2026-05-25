"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Slider from "../input/Slider";
import Select from "../input/Select";

export interface EffectsSectionProps {
  /** Opacity (0-100) */
  opacity?: number;
  setOpacity?: (v: number) => void;
  /** Filter: grayscale (0-100) */
  grayscale?: number;
  setGrayscale?: (v: number) => void;
  /** Filter: blur (0-20) */
  blur?: number;
  setBlur?: (v: number) => void;
  /** Filter: brightness (0-200) */
  brightness?: number;
  setBrightness?: (v: number) => void;
  /** Filter: contrast (0-200) */
  contrast?: number;
  setContrast?: (v: number) => void;
  /** Filter: sepia (0-100) */
  sepia?: number;
  setSepia?: (v: number) => void;
  /** Filter: saturate (0-200) */
  saturate?: number;
  setSaturate?: (v: number) => void;
  /** Filter: hue-rotate (0-360) */
  hueRotate?: number;
  setHueRotate?: (v: number) => void;
  /** Backdrop filter */
  backdropFilter?: string;
  setBackdropFilter?: (v: string) => void;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const BACKDROP_FILTER_OPTIONS = [
  { value: "none", label: "None" },
  { value: "blur(4px)", label: "Blur 4px" },
  { value: "blur(8px)", label: "Blur 8px" },
  { value: "blur(12px)", label: "Blur 12px" },
  { value: "saturate(1.5)", label: "Saturate" },
  { value: "blur(8px) saturate(1.5)", label: "Blur + Saturate" },
];

/**
 * EffectsSection - Generic effects control section.
 * Controls opacity, CSS filters (grayscale, blur, brightness, contrast, etc.), and backdrop filter.
 */
export default function EffectsSection({
  opacity,
  setOpacity,
  grayscale,
  setGrayscale,
  blur,
  setBlur,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  sepia,
  setSepia,
  saturate,
  setSaturate,
  hueRotate,
  setHueRotate,
  backdropFilter,
  setBackdropFilter,
  title = "Effects",
  subtitle = "Opacity and filters",
}: EffectsSectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Opacity */}
        {opacity !== undefined && setOpacity && (
          <LabeledField label={`Opacity: ${opacity}%`}>
            <Slider
              value={opacity}
              onChange={(v) => setOpacity(Number(v))}
              min={0}
              max={100}
              step={1}
            />
          </LabeledField>
        )}

        {/* Grayscale */}
        {grayscale !== undefined && setGrayscale && (
          <LabeledField label={`Grayscale: ${grayscale}%`}>
            <Slider
              value={grayscale}
              onChange={(v) => setGrayscale(Number(v))}
              min={0}
              max={100}
              step={1}
            />
          </LabeledField>
        )}

        {/* Blur */}
        {blur !== undefined && setBlur && (
          <LabeledField label={`Blur: ${blur}px`}>
            <Slider
              value={blur}
              onChange={(v) => setBlur(Number(v))}
              min={0}
              max={20}
              step={1}
            />
          </LabeledField>
        )}

        {/* Brightness */}
        {brightness !== undefined && setBrightness && (
          <LabeledField label={`Brightness: ${brightness}%`}>
            <Slider
              value={brightness}
              onChange={(v) => setBrightness(Number(v))}
              min={0}
              max={200}
              step={1}
            />
          </LabeledField>
        )}

        {/* Contrast */}
        {contrast !== undefined && setContrast && (
          <LabeledField label={`Contrast: ${contrast}%`}>
            <Slider
              value={contrast}
              onChange={(v) => setContrast(Number(v))}
              min={0}
              max={200}
              step={1}
            />
          </LabeledField>
        )}

        {/* Sepia */}
        {sepia !== undefined && setSepia && (
          <LabeledField label={`Sepia: ${sepia}%`}>
            <Slider
              value={sepia}
              onChange={(v) => setSepia(Number(v))}
              min={0}
              max={100}
              step={1}
            />
          </LabeledField>
        )}

        {/* Saturate */}
        {saturate !== undefined && setSaturate && (
          <LabeledField label={`Saturate: ${saturate}%`}>
            <Slider
              value={saturate}
              onChange={(v) => setSaturate(Number(v))}
              min={0}
              max={200}
              step={1}
            />
          </LabeledField>
        )}

        {/* Hue Rotate */}
        {hueRotate !== undefined && setHueRotate && (
          <LabeledField label={`Hue Rotate: ${hueRotate}°`}>
            <Slider
              value={hueRotate}
              onChange={(v) => setHueRotate(Number(v))}
              min={0}
              max={360}
              step={1}
            />
          </LabeledField>
        )}

        {/* Backdrop Filter */}
        {backdropFilter !== undefined && setBackdropFilter && (
          <LabeledField label="Backdrop Filter">
            <Select
              value={backdropFilter}
              onChange={setBackdropFilter}
              options={BACKDROP_FILTER_OPTIONS}
            />
          </LabeledField>
        )}
      </div>
    </SectionCard>
  );
}

/**
 * Build CSS filter string from individual values
 */
export function buildFilterCss(filters: {
  grayscale?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  sepia?: number;
  saturate?: number;
  hueRotate?: number;
}): string {
  const parts: string[] = [];

  if (filters.grayscale && filters.grayscale > 0) {
    parts.push(`grayscale(${filters.grayscale}%)`);
  }
  if (filters.blur && filters.blur > 0) {
    parts.push(`blur(${filters.blur}px)`);
  }
  if (filters.brightness !== undefined && filters.brightness !== 100) {
    parts.push(`brightness(${filters.brightness}%)`);
  }
  if (filters.contrast !== undefined && filters.contrast !== 100) {
    parts.push(`contrast(${filters.contrast}%)`);
  }
  if (filters.sepia && filters.sepia > 0) {
    parts.push(`sepia(${filters.sepia}%)`);
  }
  if (filters.saturate !== undefined && filters.saturate !== 100) {
    parts.push(`saturate(${filters.saturate}%)`);
  }
  if (filters.hueRotate && filters.hueRotate > 0) {
    parts.push(`hue-rotate(${filters.hueRotate}deg)`);
  }

  return parts.length > 0 ? parts.join(" ") : "none";
}
