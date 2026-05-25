"use client";

import React, { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SegmentedControl } from "../input/SegmentedControl";
import { LabeledField } from "../layout/LabeledField";

export type IconSource = "library" | "custom";
export type IconName = string;

// Get all icon names, filtering out non-component exports
const ICON_NAMES = Object.keys(LucideIcons).filter(
  (key) => key !== "icons" && key !== "createLucideIcon" && key !== "default",
);

export default function IconPickerControl(props: {
  label?: string;
  source: IconSource;
  setSource: (v: IconSource) => void;

  name: IconName;
  setName: (v: IconName) => void;

  customSvg: string;
  setCustomSvg: (v: string) => void;

  // Optional overrides
  allowNone?: boolean;
}) {
  const {
    label = "Icon",
    source,
    setSource,
    name,
    setName,
    customSvg,
    setCustomSvg,
    allowNone = true,
  } = props;

  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    // If search is empty, just show top 50 + selected if present
    if (!search) {
      // Always include 'none' if allowed
      const base = allowNone ? ["none"] : [];
      const pool = ICON_NAMES.slice(0, 49);
      return [...base, ...pool];
    }
    const lower = search.toLowerCase();
    const matches = ICON_NAMES.filter((n) => n.toLowerCase().includes(lower));
    return allowNone ? ["none", ...matches] : matches;
  }, [search, allowNone]);

  // Pagination or limit?
  const displayIcons = filteredIcons.slice(0, 100);

  const handleSvgUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setCustomSvg(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-3">
      <LabeledField label={label}>
        <SegmentedControl
          value={source}
          onChange={(v) => setSource(v as IconSource)}
          items={[
            { value: "library", label: "Library" },
            { value: "custom", label: "Custom SVG" },
          ]}
        />
      </LabeledField>

      {source === "library" ? (
        <div
          className="space-y-2 rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 50%, transparent)",
          }}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="w-full h-9 rounded-lg border px-3 text-xs outline-none"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            />
            <div className="text-[10px]" style={{ color: "var(--muted)" }}>
              {filteredIcons.length}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 max-h-[220px] overflow-y-auto p-1">
            {displayIcons.map((iconKey) => {
              const isSelected = name === iconKey;

              if (iconKey === "none") {
                return (
                  <button
                    key="none"
                    onClick={() => setName("none")}
                    title="No Icon"
                    className={`flex items-center justify-center p-2 rounded-lg transition-all aspect-square border ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-transparent text-[var(--muted)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <span className="text-xs">None</span>
                  </button>
                );
              }

              const IconComp = LucideIcons[
                iconKey as keyof typeof LucideIcons
              ] as LucideIcon | undefined;
              if (!IconComp) return null;

              return (
                <button
                  key={iconKey}
                  onClick={() => setName(iconKey)}
                  title={iconKey}
                  className={`flex items-center justify-center p-1 rounded-lg transition-all aspect-square ${
                    isSelected
                      ? "bg-[var(--primary)] text-white shadow-sm ring-1 ring-[var(--ring)]"
                      : "hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <IconComp size={18} />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <LabeledField label="Paste SVG">
            <textarea
              value={customSvg}
              onChange={(e) => setCustomSvg(e.target.value)}
              placeholder="<svg ...>...</svg>"
              rows={4}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>

          <LabeledField label="Upload SVG">
            <input
              type="file"
              accept=".svg,image/svg+xml"
              onChange={(e) => handleSvgUpload(e.target.files?.[0] ?? null)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        </div>
      )}
    </div>
  );
}
