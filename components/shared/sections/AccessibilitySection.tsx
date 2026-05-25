"use client";

import React from "react";
import { SectionCard } from "../layout/SectionCard";
import { LabeledField } from "../layout/LabeledField";
import Input from "../input/Input";
import Select from "../input/Select";
import Switch from "../input/Switch";

export type AriaRole =
  | "button"
  | "link"
  | "img"
  | "figure"
  | "status"
  | "alert"
  | "progressbar"
  | "tooltip"
  | "dialog"
  | "menu"
  | "listbox"
  | "none";

export interface AccessibilitySectionProps {
  /** ARIA label for screen readers */
  ariaLabel?: string;
  setAriaLabel?: (v: string) => void;
  /** ARIA described by ID */
  ariaDescribedBy?: string;
  setAriaDescribedBy?: (v: string) => void;
  /** ARIA live region mode */
  ariaLive?: "off" | "polite" | "assertive";
  setAriaLive?: (v: "off" | "polite" | "assertive") => void;
  /** Role attribute */
  role?: AriaRole;
  setRole?: (v: AriaRole) => void;
  /** Tab index */
  tabIndex?: number;
  setTabIndex?: (v: number) => void;
  /** Is focusable */
  focusable?: boolean;
  setFocusable?: (v: boolean) => void;
  /** Reduced motion preference */
  reducedMotion?: boolean;
  setReducedMotion?: (v: boolean) => void;
  /** High contrast mode */
  highContrast?: boolean;
  setHighContrast?: (v: boolean) => void;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Available roles for dropdown */
  roleOptions?: { value: AriaRole; label: string }[];
}

const DEFAULT_ROLE_OPTIONS: { value: AriaRole; label: string }[] = [
  { value: "button", label: "Button" },
  { value: "link", label: "Link" },
  { value: "img", label: "Image" },
  { value: "figure", label: "Figure" },
  { value: "status", label: "Status" },
  { value: "alert", label: "Alert" },
  { value: "progressbar", label: "Progressbar" },
  { value: "tooltip", label: "Tooltip" },
  { value: "dialog", label: "Dialog" },
  { value: "menu", label: "Menu" },
  { value: "none", label: "None" },
];

const ARIA_LIVE_OPTIONS = [
  { value: "off", label: "Off" },
  { value: "polite", label: "Polite" },
  { value: "assertive", label: "Assertive" },
];

const TAB_INDEX_OPTIONS = [
  { value: "-1", label: "-1 (Not focusable)" },
  { value: "0", label: "0 (Normal order)" },
  { value: "1", label: "1 (First)" },
];

/**
 * AccessibilitySection - Generic accessibility controls section.
 * Provides ARIA labels, roles, focus management, and accessibility preferences.
 */
export default function AccessibilitySection({
  ariaLabel,
  setAriaLabel,
  ariaDescribedBy,
  setAriaDescribedBy,
  ariaLive,
  setAriaLive,
  role,
  setRole,
  tabIndex,
  setTabIndex,
  focusable,
  setFocusable,
  reducedMotion,
  setReducedMotion,
  highContrast,
  setHighContrast,
  title = "Accessibility",
  subtitle = "Screen reader and keyboard support",
  roleOptions = DEFAULT_ROLE_OPTIONS,
}: AccessibilitySectionProps) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {/* ARIA Label */}
        {ariaLabel !== undefined && setAriaLabel && (
          <LabeledField label="ARIA Label">
            <Input
              value={ariaLabel}
              onChange={(e) => setAriaLabel(e.target.value)}
              placeholder="Descriptive label for screen readers"
            />
          </LabeledField>
        )}

        {/* ARIA Described By */}
        {ariaDescribedBy !== undefined && setAriaDescribedBy && (
          <LabeledField label="ARIA Described By">
            <Input
              value={ariaDescribedBy}
              onChange={(e) => setAriaDescribedBy(e.target.value)}
              placeholder="ID of describing element"
            />
          </LabeledField>
        )}

        {/* Role */}
        {role !== undefined && setRole && (
          <LabeledField label="Role">
            <Select
              value={role}
              onChange={(v) => setRole(v as AriaRole)}
              options={roleOptions}
            />
          </LabeledField>
        )}

        {/* ARIA Live */}
        {ariaLive !== undefined && setAriaLive && (
          <LabeledField label="ARIA Live">
            <Select
              value={ariaLive}
              onChange={(v) => setAriaLive(v as "off" | "polite" | "assertive")}
              options={ARIA_LIVE_OPTIONS}
            />
          </LabeledField>
        )}

        {/* Tab Index */}
        {tabIndex !== undefined && setTabIndex && (
          <LabeledField label="Tab Index">
            <Select
              value={String(tabIndex)}
              onChange={(v) => setTabIndex(Number(v))}
              options={TAB_INDEX_OPTIONS}
            />
          </LabeledField>
        )}

        {/* Toggles */}
        <div
          className="space-y-3 pt-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {focusable !== undefined && setFocusable && (
            <Switch
              label="Keyboard focusable"
              checked={focusable}
              onChange={setFocusable}
            />
          )}

          {reducedMotion !== undefined && setReducedMotion && (
            <Switch
              label="Respect reduced motion"
              checked={reducedMotion}
              onChange={setReducedMotion}
            />
          )}

          {highContrast !== undefined && setHighContrast && (
            <Switch
              label="High contrast mode"
              checked={highContrast}
              onChange={setHighContrast}
            />
          )}
        </div>
      </div>
    </SectionCard>
  );
}
