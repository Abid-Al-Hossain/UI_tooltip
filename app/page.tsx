"use client";

import React, { useMemo, useRef, useState } from "react";
import ContrastGuard from "@/components/shared/color/ContrastGuard";
import AppShell from "@/components/shared/layout/AppShell";
import { PlaygroundLayout } from "@/components/shared/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/components/shared/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/components/shared/layout/PreviewPanel";
import { useHistoryState } from "@/components/hooks/useHistoryState";
import UndoRedoButtons from "@/components/shared/layout/UndoRedoButtons";
import SectionSelector from "@/components/shared/layout/SectionSelector";

import {
  TooltipState,
  DEFAULT_TOOLTIP_STATE,
} from "./types";
import { TOOLTIP_PRESETS } from "./_data/tooltipPresets";

// Section imports
import {
  PresetsSection,
  PositionSection,
  AppearanceSection,
  ArrowSection,
  AnimationSection as MotionSection,
  BehaviorSection,
  StatePreviewSection,
  TriggerSection,
  ContentSection,
  TypographySection,
  AccessibilitySection,
} from "./_section";

// Preview component
import TooltipPreview from "./_components/TooltipPreview";

// Export utilities
import { buildExportPayload } from "./_utils/exportUtils";

export default function TooltipPlayground() {
  const { state, set, undo, redo, reset, canUndo, canRedo } =
    useHistoryState<TooltipState>(DEFAULT_TOOLTIP_STATE);
  const [activeSection, setActiveSection] = useState<string>("presets");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generic updater
  const update = <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => {
    set((s: TooltipState) => ({ ...s, [key]: value }));
  };

  const applyPreset = (preset: (typeof TOOLTIP_PRESETS)[number]) => {
    set((prev) => ({ ...prev, ...preset.state }));
    setPreviewResetKey((value) => value + 1);
  };

  const sections = [
    { id: "presets", label: "Presets" },
    { id: "position", label: "Position" },
    { id: "appearance", label: "Appearance" },
    { id: "arrow", label: "Arrow" },
    { id: "motion", label: "Motion" },
    { id: "state-preview", label: "State Preview" },
    { id: "behavior", label: "Behavior" },
    { id: "trigger", label: "Trigger" },
    { id: "content", label: "Content" },
    { id: "typography", label: "Typography" },
    { id: "accessibility", label: "Accessibility" },
  ];

  // Handle download
  // Handle download
  const exportCode = useMemo(() => buildExportPayload(state), [state]);

  const handleDownload = () => {
    const { code, filename } = buildExportPayload(state);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Header actions (undo/redo/reset buttons)
  const handleReset = () => {
    reset();
    setPreviewResetKey((value) => value + 1);
  };

  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={handleReset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // Controls content
  const controlsContent = (
    <div className="p-6 space-y-8">
      {/* Section Selector */}
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Active Section Content */}
      {activeSection === "presets" && (
        <PresetsSection
          state={state}
          presets={TOOLTIP_PRESETS}
          onApplyPreset={applyPreset}
        />
      )}
      {activeSection === "position" && (
        <PositionSection state={state} update={update} />
      )}
      {activeSection === "appearance" && (
        <AppearanceSection state={state} update={update} />
      )}
      {activeSection === "arrow" && (
        <ArrowSection state={state} update={update} />
      )}
      {activeSection === "motion" && (
        <MotionSection state={state} update={update} />
      )}
      {activeSection === "state-preview" && (
        <StatePreviewSection state={state} update={update} />
      )}
      {activeSection === "behavior" && (
        <BehaviorSection state={state} update={update} />
      )}
      {activeSection === "trigger" && (
        <TriggerSection state={state} update={update} />
      )}
      {activeSection === "content" && (
        <ContentSection state={state} update={update} />
      )}
      {activeSection === "typography" && (
        <TypographySection state={state} update={update} />
      )}
      {activeSection === "accessibility" && (
        <AccessibilitySection state={state} update={update} />
      )}
    </div>
  );

  // Preview content
  const previewContent = (
    <PreviewDownloadPanel
      mounted={true}
      iframeSrcDoc=""
      iframeRef={iframeRef}
      handleIframeLoad={() => {}}
      downloadName={state.downloadName}
      setDownloadName={(v) => update("downloadName", v)}
      downloadFormat="react"
      setDownloadFormat={() => {}}
      handleDownload={handleDownload}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
      previewNode={<TooltipPreview key={previewResetKey} state={state} />}
      code={exportCode.code}
    />
  );

  return (
    <AppShell>
      <PlaygroundLayout
        title="Tooltip Playground"
        headerActions={headerActions}
        controls={controlsContent}
        preview={previewContent}
      />

<ContrastGuard /></AppShell>
  );
}
