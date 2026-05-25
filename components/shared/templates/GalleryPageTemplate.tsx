"use client";

import React from "react";
import Link from "next/link";
import AppShell from "@/components/shared/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";

export interface GalleryPageProps {
  /** Component name (e.g., "Avatar", "Button") */
  title: string;
  /** Short description of the component */
  description: string;
  /** Link to playground (e.g., "/components/avatar/playground") */
  playgroundLink: string;
  /** Playground section title (default: "Playground") */
  playgroundTitle?: string;
  /** Playground section description */
  playgroundDescription?: string;
  /** HTML srcDoc for preview iframe */
  previewSrcDoc: string;
  /** Feature tags displayed below preview */
  featureTags: string[];
  /** Custom label for playground button (default: "Edit") */
  playgroundButtonLabel?: string;
  /** Preview iframe height (default: 180) */
  previewHeight?: number;
}

/**
 * GalleryPageTemplate - Reusable gallery page wrapper for all components.
 * Provides consistent structure: AppShell > Title Card > Playground Card with preview.
 */
export default function GalleryPageTemplate({
  title,
  description,
  playgroundLink,
  playgroundTitle = "Playground",
  playgroundDescription = "Full editor with all premium features.",
  previewSrcDoc,
  featureTags,
  playgroundButtonLabel = "Edit",
  previewHeight = 180,
}: GalleryPageProps) {
  const mounted = useHydrated();

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Title Card */}
        <div
          className="rounded-2xl border p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--card) 70%, transparent)",
          }}
        >
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {description}
          </p>
        </div>

        {/* Playground Card */}
        <div className="space-y-5">
          <div
            className="rounded-2xl border p-5"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 80%, transparent)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {playgroundTitle}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {playgroundDescription}
                </p>
              </div>

              <Link
                href={playgroundLink}
                className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "var(--primary)", color: "white" }}
              >
                {playgroundButtonLabel}
              </Link>
            </div>

            {/* Preview */}
            <div
              className="mt-4 overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              {mounted ? (
                <iframe
                  title={`${title} Preview`}
                  sandbox="allow-scripts"
                  srcDoc={previewSrcDoc}
                  className="w-full border-none"
                  style={{ height: previewHeight }}
                />
              ) : (
                <div className="w-full" style={{ height: previewHeight }} />
              )}
            </div>

            {/* Feature Tags */}
            {featureTags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {featureTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs opacity-60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
