"use client";

import React, { useState } from "react";
import {
  PreviewPanel,
  type PreviewCanvasMode,
} from "@/components/shared/layout/PreviewPanel";
import ExportOptionsControl from "@/components/shared/export/ExportOptionsControl";
import { ScrollArea } from "./ScrollArea";
import CodeBlock from "./CodeBlock";
import { AnimatedToggle } from "./AnimatedToggle";
import { motion, AnimatePresence } from "framer-motion";

export type DownloadFormat = "react";

export default function PreviewDownloadPanel(props: {
  mounted: boolean;

  iframeSrcDoc: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  handleIframeLoad: () => void;

  downloadFormat: DownloadFormat;
  setDownloadFormat: (v: DownloadFormat) => void;

  downloadName: string;
  setDownloadName: (v: string) => void;

  handleDownload: () => void;
  // Optional override for React-based previews (Three.js/Framer)
  previewNode?: React.ReactNode;

  // New prop for code view
  code?: string;

  previewBgMode?: PreviewCanvasMode;
  setPreviewBgMode?: (v: PreviewCanvasMode) => void;
  previewBgInput?: string;
  setPreviewBgInput?: (v: string) => void;
}) {
  const {
    mounted,
    iframeSrcDoc,
    iframeRef,
    handleIframeLoad,
    downloadFormat,
    setDownloadFormat,
    downloadName,
    setDownloadName,
    handleDownload,
    previewNode,
    code,
    previewBgMode,
    setPreviewBgMode,
    previewBgInput,
    setPreviewBgInput,
  } = props;

  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  // Determine language for highlighting based on format
  const language = "tsx";

  return (
    <ScrollArea className="lg:pl-2 h-full">
      <div
        className="rounded-2xl border p-5 transition-all duration-300"
        data-audit="preview-download-panel"
        data-testid="preview-download-panel"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--surface) 80%, transparent)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-4">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--text)" }}
            >
              Output
            </div>

            {code && (
              <AnimatedToggle
                value={viewMode}
                onChange={(v) => setViewMode(v as "preview" | "code")}
                options={[
                  { value: "preview", label: "Design" },
                  { value: "code", label: "Code" },
                ]}
              />
            )}
          </div>

          <div data-audit="export-button" data-testid="export-button">
            <ExportOptionsControl
              format={downloadFormat}
              setFormat={setDownloadFormat}
              fileName={downloadName}
              setFileName={setDownloadName}
              onDownload={handleDownload}
            />
          </div>
        </div>

        <div className="mt-4">
          <div
            className="h-[620px] w-full relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]"
            data-audit="preview-stage"
            data-testid="preview-stage"
          >
            <AnimatePresence mode="wait">
              {viewMode === "preview" ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, type: "spring", bounce: 0 }}
                  className="h-full w-full"
                  data-audit="preview-stage-preview"
                  data-testid="preview-stage-preview"
                >
                  <PreviewPanel
                    bgMode={previewBgMode}
                    setBgMode={setPreviewBgMode}
                    customColor={previewBgInput}
                    setCustomColor={setPreviewBgInput}
                  >
                    {previewNode ? (
                      <div
                        className="h-full w-full flex items-center justify-center"
                        data-audit="preview-node-container"
                        data-testid="preview-node-container"
                      >
                        {previewNode}
                      </div>
                    ) : mounted && iframeSrcDoc ? (
                      <iframe
                        ref={iframeRef}
                        onLoad={handleIframeLoad}
                        onFocus={() => {
                          iframeRef.current?.contentWindow?.postMessage(
                            { type: "focus-button" },
                            "*",
                          );
                        }}
                        title="Action Button Preview"
                        sandbox="allow-scripts"
                        srcDoc={iframeSrcDoc}
                        tabIndex={0}
                        className="h-full w-full border-none"
                        data-audit="preview-iframe"
                        data-testid="preview-iframe"
                      />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </PreviewPanel>
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, type: "spring", bounce: 0 }}
                  className="h-full w-full bg-[#1e1e1e]"
                  data-audit="code-panel"
                  data-testid="code-panel"
                >
                  <CodeBlock
                    code={code || ""}
                    language={language}
                    className="h-full border-none rounded-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div
          className="mt-4 text-xs flex justify-between items-center"
          data-audit="preview-download-tip"
          data-testid="preview-download-tip"
          style={{ color: "var(--muted)" }}
        >
          <span>
            {viewMode === "preview"
              ? "Tip: Switch to 'Code' view to copy the snippet."
              : "Code updates live as you edit the design."}
          </span>
        </div>
      </div>
    </ScrollArea>
  );
}
