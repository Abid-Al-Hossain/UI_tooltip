"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Select from "../input/Select";
import Input from "../input/Input";
import Slider from "../input/Slider";

export type LabelPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type LabelType = "text" | "icon" | "badge";

export interface LabelConfig {
  id: string;
  position: LabelPosition;
  type: LabelType;
  text?: string;
  size?: number;
  iconName?: string;
  iconSvg?: string;
  badgeCount?: number;
  color?: string;
}

export interface LabelsSectionProps {
  /** Array of label configurations */
  labels: LabelConfig[];
  /** Update labels array */
  setLabels: (labels: LabelConfig[]) => void;
  /** Max number of labels (default: 5) */
  maxLabels?: number;
  /** Available label types (default: all) */
  labelTypes?: LabelType[];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

const POSITION_OPTIONS = [
  { value: "top-left", label: "↖ Top Left" },
  { value: "top-center", label: "↑ Top Center" },
  { value: "top-right", label: "↗ Top Right" },
  { value: "center-left", label: "← Center Left" },
  { value: "center", label: "● Center" },
  { value: "center-right", label: "→ Center Right" },
  { value: "bottom-left", label: "↙ Bottom Left" },
  { value: "bottom-center", label: "↓ Bottom Center" },
  { value: "bottom-right", label: "↘ Bottom Right" },
];

const TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "icon", label: "Icon" },
  { value: "badge", label: "Badge" },
];

/**
 * LabelsSection - Multi-label management section.
 * Supports adding, removing, and configuring multiple positioned labels.
 */
export default function LabelsSection({
  labels,
  setLabels,
  maxLabels = 5,
  labelTypes = ["text", "icon", "badge"],
  title = "Labels",
  subtitle = "Add text, icons, or badges",
}: LabelsSectionProps) {
  const addLabel = () => {
    if (labels.length >= maxLabels) return;
    const newLabel: LabelConfig = {
      id: `label-${Date.now()}`,
      position: "bottom-center",
      type: "text",
      text: "Label",
      size: 14,
    };
    setLabels([...labels, newLabel]);
  };

  const removeLabel = (id: string) => {
    setLabels(labels.filter((l) => l.id !== id));
  };

  const updateLabel = (id: string, updates: Partial<LabelConfig>) => {
    setLabels(labels.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const typeOptions = TYPE_OPTIONS.filter((opt) =>
    labelTypes.includes(opt.value as LabelType),
  );

  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* Add button */}
        {labels.length < maxLabels && (
          <button
            type="button"
            onClick={addLabel}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 border-dashed transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Label
          </button>
        )}

        {/* Empty state */}
        {labels.length === 0 && (
          <p
            className="text-sm text-center py-4"
            style={{ color: "var(--muted)" }}
          >
            No labels added.
          </p>
        )}

        {/* Label items */}
        {labels.map((label, index) => (
          <div
            key={label.id}
            className="p-4 rounded-lg border space-y-4"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 50%, transparent)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Label #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeLabel(label.id)}
                className="p-1.5 rounded transition-colors hover:bg-red-500/20"
                style={{ color: "var(--muted)" }}
                title="Remove label"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>

            {/* Position */}
            <LabeledField label="Position">
              <Select
                value={label.position}
                onChange={(v) =>
                  updateLabel(label.id, { position: v as LabelPosition })
                }
                options={POSITION_OPTIONS}
              />
            </LabeledField>

            {/* Type */}
            <LabeledField label="Type">
              <Select
                value={label.type}
                onChange={(v) =>
                  updateLabel(label.id, { type: v as LabelType })
                }
                options={typeOptions}
              />
            </LabeledField>

            {/* Type-specific controls */}
            {label.type === "text" && (
              <>
                <LabeledField label="Text">
                  <Input
                    value={label.text || ""}
                    onChange={(e) =>
                      updateLabel(label.id, { text: e.target.value })
                    }
                    placeholder="Label text..."
                  />
                </LabeledField>
                <LabeledField label={`Size: ${label.size || 14}px`}>
                  <Slider
                    value={label.size || 14}
                    onChange={(v) => updateLabel(label.id, { size: Number(v) })}
                    min={10}
                    max={32}
                    step={1}
                  />
                </LabeledField>
              </>
            )}

            {label.type === "badge" && (
              <LabeledField label="Count">
                <Input
                  type="number"
                  value={String(label.badgeCount || 0)}
                  onChange={(e) =>
                    updateLabel(label.id, {
                      badgeCount: Number(e.target.value),
                    })
                  }
                  placeholder="0"
                />
              </LabeledField>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * Create a default label config
 */
export function createDefaultLabel(id?: string): LabelConfig {
  return {
    id: id || `label-${Date.now()}`,
    position: "bottom-center",
    type: "text",
    text: "Label",
    size: 14,
  };
}
