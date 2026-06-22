"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { LabeledField, FilterSelect } from "@/components/shared/layout/ui";
import Select from "@/components/shared/input/Select";
import type { TooltipPreset } from "../_data/tooltipPresets";
import type { TooltipState } from "../types";

const PAGE_SIZE = 12;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function Badge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 76%, transparent)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

function PreviewBubble({ preset }: { preset: TooltipPreset }) {
  const state = preset.state;
  return (
    <div
      className="mt-3 rounded-2xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--bg) 62%, transparent)",
      }}
    >
      <div className="flex items-center justify-between gap-3 text-xs">
        <span style={{ color: "var(--muted)" }}>{preset.family}</span>
        <span style={{ color: "var(--muted)" }}>
          {preset.controlMode} · {preset.trigger} · {preset.animation}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center">
        <div
          className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold"
          style={{
            background: state.bgColor || "var(--surface)",
            color: state.textColor || "var(--text)",
            border: `${state.borderWidth ?? 1}px solid ${state.borderColor || "var(--border)"}`,
            borderRadius: `${state.borderRadius ?? 12}px`,
            boxShadow:
              state.shadowEnabled === false
                ? "none"
                : `${state.shadowX ?? 0}px ${state.shadowY ?? 8}px ${state.shadowBlur ?? 18}px ${state.shadowSpread ?? 0}px ${state.shadowColor ?? "rgba(15,23,42,0.16)"}`,
            backdropFilter: state.backdropFilter || "none",
            WebkitBackdropFilter: state.backdropFilter || "none",
            maxWidth: `${Math.min(state.maxWidth ?? 260, 260)}px`,
          }}
        >
          {state.content}
        </div>
      </div>

      <div className="mt-3 text-[11px]" style={{ color: "var(--muted)" }}>
        Trigger: {state.triggerText}
      </div>
      <div className="mt-1 text-[11px]" style={{ color: "var(--muted)" }}>
        Open {state.openDelay}ms · Close {state.closeDelay}ms
      </div>
    </div>
  );
}

export default function PresetsSection({
  state,
  presets,
  onApplyPreset,
}: {
  state: TooltipState;
  presets: TooltipPreset[];
  onApplyPreset: (preset: TooltipPreset) => void;
}) {
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [triggerFilter, setTriggerFilter] = useState("all");
  const [placementFilter, setPlacementFilter] = useState("all");
  const [animationFilter, setAnimationFilter] = useState("all");
  const [themeFilter, setThemeFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageDirection, setPageDirection] = useState(0);

  const families = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.family))),
    [presets],
  );
  const triggers = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.trigger))),
    [presets],
  );
  const placements = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.placement))),
    [presets],
  );
  const animations = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.animation))),
    [presets],
  );
  const themes = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.theme))),
    [presets],
  );

  const search = query.trim().toLowerCase();

  const filtered = presets.filter((preset) => {
    if (familyFilter !== "all" && preset.family !== familyFilter) return false;
    if (modeFilter !== "all" && preset.controlMode !== modeFilter) return false;
    if (triggerFilter !== "all" && preset.trigger !== triggerFilter) return false;
    if (placementFilter !== "all" && preset.placement !== placementFilter) return false;
    if (animationFilter !== "all" && preset.animation !== animationFilter) return false;
    if (themeFilter !== "all" && preset.theme !== themeFilter) return false;
    if (!search) return true;

    const haystack = [
      preset.name,
      preset.summary,
      preset.family,
      preset.controlMode,
      preset.trigger,
      preset.placement,
      preset.animation,
      preset.theme,
      ...preset.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(search);
  });

  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );
  const pageKey = [
    safePage,
    query.trim().toLowerCase(),
    familyFilter,
    modeFilter,
    triggerFilter,
    placementFilter,
    animationFilter,
    themeFilter,
  ].join(":");

  const resetFilters = () => {
    setPageDirection(0);
    setQuery("");
    setFamilyFilter("all");
    setModeFilter("all");
    setTriggerFilter("all");
    setPlacementFilter("all");
    setAnimationFilter("all");
    setThemeFilter("all");
    setPage(0);
  };

  const applyRandomPreset = () => {
    if (!filtered.length) return;
    onApplyPreset(pickRandomPreset(filtered));
  };

  const goToPage = (targetPage: number) => {
    if (targetPage === safePage) return;
    setPageDirection(targetPage > safePage ? 1 : -1);
    setPage(targetPage);
  };

  const activeName = state.downloadName || "";

  return (
    <SectionCard
      title="Presets"
      subtitle={`${presets.length} editable starting points built from the tooltip system.`}
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <LabeledField label="Search presets" hint={resultLabel}>
            <input
              value={query}
              onChange={(event) => {
                setPageDirection(0);
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Search by name, family, trigger, or tag"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>

          <LabeledField label="Control Mode">
            <FilterSelect
              value={modeFilter}
              onChange={(value: string) => {
                setPageDirection(0);
                setModeFilter(value);
                setPage(0);
              }}
              items={[
                { value: "all", label: "All" },
                { value: "uncontrolled", label: "Uncontrolled" },
                { value: "controlled", label: "Controlled" },
                { value: "manual", label: "Manual" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Trigger">
            <FilterSelect
              value={triggerFilter}
              onChange={(value: string) => {
                setPageDirection(0);
                setTriggerFilter(value);
                setPage(0);
              }}
              items={[
                { value: "all", label: "All" },
                ...triggers.map((trigger) => ({
                  value: trigger,
                  label: trigger.replace(/\s+/g, " "),
                })),
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <LabeledField label="Family">
            <Select
              value={familyFilter}
              onChange={(value: string) => {
                setPageDirection(0);
                setFamilyFilter(value);
                setPage(0);
              }}
              options={[
                { value: "all", label: "All families" },
                ...families.map((family) => ({ value: family, label: family })),
              ]}
            />
          </LabeledField>

          <LabeledField label="Placement">
            <Select
              value={placementFilter}
              onChange={(value: string) => {
                setPageDirection(0);
                setPlacementFilter(value);
                setPage(0);
              }}
              options={[
                { value: "all", label: "All placements" },
                ...placements.map((placement) => ({
                  value: placement,
                  label: placement,
                })),
              ]}
            />
          </LabeledField>

          <LabeledField label="Animation">
            <Select
              value={animationFilter}
              onChange={(value: string) => {
                setPageDirection(0);
                setAnimationFilter(value);
                setPage(0);
              }}
              options={[
                { value: "all", label: "All animations" },
                ...animations.map((animation) => ({
                  value: animation,
                  label: animation,
                })),
              ]}
            />
          </LabeledField>

          <LabeledField label="Theme">
            <Select
              value={themeFilter}
              onChange={(value: string) => {
                setPageDirection(0);
                setThemeFilter(value);
                setPage(0);
              }}
              options={[
                { value: "all", label: "All themes" },
                ...themes.map((theme) => ({ value: theme, label: theme })),
              ]}
            />
          </LabeledField>

        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            Reset filters
          </button>

          <button
            type="button"
            onClick={applyRandomPreset}
            disabled={!filtered.length}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 55%, var(--border))",
              background: "color-mix(in oklab, var(--primary) 18%, transparent)",
              color: "var(--text)",
            }}
          >
            Surprise me
          </button>

          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Presets apply a full editable tooltip snapshot. Keep tweaking from any section after applying one.
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={pageDirection}>
            <motion.div
              key={pageKey}
              custom={pageDirection}
              initial={{ opacity: 0, x: pageDirection > 0 ? 24 : pageDirection < 0 ? -24 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: pageDirection > 0 ? -24 : pageDirection < 0 ? 24 : 0 }}
              transition={{
                x: { type: "spring", stiffness: 320, damping: 34, mass: 0.9 },
                opacity: { duration: 0.16, ease: "linear" },
              }}
              className="grid gap-3 lg:grid-cols-2"
              style={{ willChange: "transform, opacity" }}
            >
              {visible.length === 0 ? (
                <div
                  className="rounded-2xl border p-6 text-sm lg:col-span-2"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in oklab, var(--card) 68%, transparent)",
                    color: "var(--muted)",
                  }}
                >
                  No presets match the current filters. Adjust or reset the filters to continue.
                </div>
              ) : (
                visible.map((preset, index) => {
                  const active = activeName === preset.state.downloadName;

                  return (
                    <motion.div
                      key={preset.id}
                      initial={{
                        opacity: 0,
                        x: pageDirection > 0 ? 24 : pageDirection < 0 ? -24 : 0,
                        y: 0,
                      }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        x: {
                          type: "spring",
                          stiffness: 340,
                          damping: 32,
                          mass: 0.9,
                        },
                        opacity: {
                          duration: 0.18,
                          delay: Math.min(index, 7) * 0.015,
                          ease: "linear",
                        },
                      }}
                      className="rounded-2xl border p-3"
                      data-audit="preset-card"
                      data-preset-id={preset.id}
                      style={{
                        borderColor: active
                          ? "color-mix(in oklab, var(--primary) 70%, var(--border))"
                          : "var(--border)",
                        background: active
                          ? "color-mix(in oklab, var(--primary) 10%, var(--card))"
                          : "color-mix(in oklab, var(--card) 72%, transparent)",
                        boxShadow: active
                          ? "0 0 0 1px color-mix(in oklab, var(--primary) 40%, transparent)"
                          : "none",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                            {preset.name}
                          </div>
                          <div className="text-xs leading-5" style={{ color: "var(--muted)" }}>
                            {preset.summary}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onApplyPreset(preset)}
                          className="rounded-xl px-3 py-2 text-xs font-semibold uf-clickable"
                          style={{
                            background: active ? "var(--primary)" : "var(--surface)",
                            color: active ? "#ffffff" : "var(--text)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {active ? "Applied" : "Apply"}
                        </button>
                      </div>

                      <PreviewBubble preset={preset} />

                      <div className="mt-3 flex flex-wrap gap-2">
                        {preset.tags.slice(0, 5).map((tag, tagIndex) => (
                          <Badge key={`${tag}-${tagIndex}`} label={tag} />
                        ))}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {pageCount > 1 ? (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border p-3"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 65%, transparent)",
            }}
          >
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              Page {safePage + 1} of {pageCount}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(Math.max(0, safePage - 1))}
                disabled={safePage <= 0}
                className="rounded-xl border px-3 py-2 text-xs font-semibold uf-clickable disabled:opacity-60"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => goToPage(Math.min(pageCount - 1, safePage + 1))}
                disabled={safePage >= pageCount - 1}
                className="rounded-xl border px-3 py-2 text-xs font-semibold uf-clickable disabled:opacity-60"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
