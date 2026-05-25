"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";

import { TooltipState } from "../types";

interface AccessibilitySectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function AccessibilitySection({
  state,
  update,
}: AccessibilitySectionProps) {
  return (
    <div className="space-y-4">
      <SectionCard
        title="ARIA Attributes"
        subtitle="Screen reader text for the trigger-target relationship."
      >
        <div className="space-y-4">
          <LabeledField label="ARIA Label">
            <input
              type="text"
              value={state.ariaLabel}
              onChange={(e) => update("ariaLabel", e.target.value)}
              placeholder="Optional accessible label"
              className="w-full h-9 px-3 rounded-lg border text-sm outline-none focus:border-[var(--primary)] transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 65%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>

          <LabeledField label="ARIA DescribedBy">
            <input
              type="text"
              value={state.ariaDescribedBy}
              onChange={(e) => update("ariaDescribedBy", e.target.value)}
              placeholder="ID of describing element"
              className="w-full h-9 px-3 rounded-lg border text-sm outline-none focus:border-[var(--primary)] transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 65%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Semantic Contract"
        subtitle="Tooltip semantics stay intentionally narrow."
      >
        <div className="space-y-3 text-sm" style={{ color: "var(--text)" }}>
          <div
            className="rounded-lg border p-3"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <strong>Role:</strong> <code>tooltip</code>
          </div>
          <div
            className="rounded-lg border p-3 text-xs leading-5"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: "var(--muted)",
            }}
          >
            This studio keeps tooltip semantics honest. It does not switch into
            menu, dialog, or listbox behavior because those patterns need a
            different focus and interaction contract.
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Focus Behavior"
        subtitle="Tooltips should not trap or redirect focus."
      >
        <div
          className="rounded-lg border p-3 text-xs leading-5"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--muted)",
          }}
        >
          Focus management is intentionally locked to <code>none</code>. The
          trigger stays focusable, while the tooltip remains supplementary
          content.
        </div>
      </SectionCard>

      <SectionCard title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={state.triggerEvent.includes("focus")}
            label="Keyboard accessible (focus trigger enabled)"
          />
          <AccessibilityCheck
            passed={state.hideOnEscapeKey}
            label="Escape key dismissal"
          />
          <AccessibilityCheck
            passed={Boolean(state.hideOnClick) || state.closeOnPointerDown}
            label="Pointer dismissal available"
          />
          <AccessibilityCheck
            passed={state.role === "tooltip"}
            label="Correct ARIA role for informational content"
          />
          <AccessibilityCheck
            passed={state.openDelay < 500}
            label="Reasonable open delay (< 500ms)"
          />
          <AccessibilityCheck
            passed={!state.disabled}
            label="Tooltip is enabled for all users"
          />
        </div>
      </SectionCard>
    </div>
  );
}

function AccessibilityCheck({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{
          background: passed
            ? "color-mix(in oklab, #22c55e 20%, transparent)"
            : "color-mix(in oklab, #ef4444 20%, transparent)",
          color: passed ? "#22c55e" : "#ef4444",
        }}
      >
        {passed ? "OK" : "X"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
