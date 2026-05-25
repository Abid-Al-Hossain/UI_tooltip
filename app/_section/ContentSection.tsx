"use client";

import React from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField } from "@/components/shared/layout/LabeledField";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import { TooltipState } from "../types";

interface ContentSectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function ContentSection({ state, update }: ContentSectionProps) {
  return (
    <div className="space-y-4">
      <SectionCard title="Content" subtitle="Text displayed in the tooltip">
        <div className="space-y-4">
          <LabeledField label="Tooltip Content">
            <textarea
              value={state.content}
              onChange={(e) => update("content", e.target.value)}
              rows={3}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none resize-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
              placeholder="Enter tooltip content..."
            />
          </LabeledField>

          <LabeledField label="Trigger Button Text">
            <input
              type="text"
              value={state.triggerText}
              onChange={(e) => update("triggerText", e.target.value)}
              placeholder="Hover me"
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

      <SectionCard title="HTML Content" subtitle="Allow rich HTML in tooltip">
        <div className="space-y-4">
          <Switch
            label="Allow HTML"
            checked={state.allowHTML}
            onChange={(v) => update("allowHTML", v)}
          />

          {state.allowHTML && (
            <div
              className="p-3 rounded-lg text-xs"
              style={{
                background:
                  "color-mix(in oklab, var(--warning) 20%, transparent)",
                color: "var(--warning)",
                border: "1px solid var(--warning)",
              }}
            >
              Warning: enabling HTML allows rich content but may pose XSS
              risks if content is user-provided.
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Dynamic Content"
        subtitle="Auto-update on content change"
      >
        <Switch
          label="Dynamic Update"
          checked={state.dynamicUpdate}
          onChange={(v) => update("dynamicUpdate", v)}
        />
      </SectionCard>

      <SectionCard title="Truncation" subtitle="Limit content length">
        <div className="space-y-4">
          <LabeledField
            label={`Max Characters: ${state.truncationLimit === 0 ? "No limit" : state.truncationLimit}`}
          >
            <Slider
              value={state.truncationLimit}
              onChange={(v) => update("truncationLimit", Number(v))}
              min={0}
              max={500}
              step={10}
            />
          </LabeledField>

          {state.truncationLimit > 0 &&
            state.content.length > state.truncationLimit && (
              <div
                className="p-3 rounded-lg text-xs"
                style={{
                  background: "var(--surface)",
                  color: "var(--muted)",
                }}
              >
                Preview: &quot;{state.content.slice(0, state.truncationLimit)}
                ...&quot;
              </div>
            )}
        </div>
      </SectionCard>
    </div>
  );
}
