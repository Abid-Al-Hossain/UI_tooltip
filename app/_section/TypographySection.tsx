"use client";

import React, { useMemo } from "react";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import TypographyControl from "@/components/shared/typography/TypographyControl";
import {
  SYSTEM_FONTS,
  GOOGLE_FONTS,
} from "@/components/shared/typography/fontConstants";

import { TooltipState } from "../types";

interface TypographySectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function TypographySection({
  state,
  update,
}: TypographySectionProps) {
  // Filter fonts based on search
  const filteredSystemFonts = useMemo(() => {
    if (!state.fontSearch) return SYSTEM_FONTS;
    const q = state.fontSearch.toLowerCase();
    return SYSTEM_FONTS.filter((f) => f.label.toLowerCase().includes(q));
  }, [state.fontSearch]);

  const filteredGoogleFonts = useMemo(() => {
    if (!state.fontSearch) return GOOGLE_FONTS;
    const q = state.fontSearch.toLowerCase();
    return GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(q));
  }, [state.fontSearch]);

  return (
    <SectionCard title="Typography" subtitle="Font, size, weight, and spacing">
      <TypographyControl
        // Font Family
        fontBucket={state.fontBucket}
        setFontBucket={(v) => update("fontBucket", v)}
        fontSearch={state.fontSearch}
        setFontSearch={(v) => update("fontSearch", v)}
        systemFonts={SYSTEM_FONTS}
        filteredSystemFonts={filteredSystemFonts}
        systemFontIdx={state.systemFontIdx}
        setSystemFontIdx={(v) => update("systemFontIdx", v)}
        googleFonts={GOOGLE_FONTS}
        filteredGoogleFonts={filteredGoogleFonts}
        googleFontFamily={state.googleFontFamily}
        setGoogleFontFamily={(v) => update("googleFontFamily", v)}
        // Font Size
        fontSize={state.fontSize}
        setFontSize={(v) => update("fontSize", v)}
        fontSizeUnit={state.fontSizeUnit}
        setFontSizeUnit={(v) => update("fontSizeUnit", v)}
        fontSizeMin={10}
        fontSizeMax={32}
        // Weight
        fontWeight={state.fontWeight}
        setFontWeight={(v) => update("fontWeight", v)}
        // Decoration
        fontStyle={state.fontStyle}
        setFontStyle={(v) => update("fontStyle", v)}
        textDecoration={state.textDecoration}
        setTextDecoration={(v) => update("textDecoration", v)}
        textTransform={state.textTransform}
        setTextTransform={(v) => update("textTransform", v)}
        // Spacing
        letterSpacing={state.letterSpacing}
        setLetterSpacing={(v) => update("letterSpacing", v)}
        letterSpacingUnit={state.letterSpacingUnit}
        setLetterSpacingUnit={(v) => update("letterSpacingUnit", v)}
        lineHeight={state.lineHeight}
        setLineHeight={(v) => update("lineHeight", v)}
      />
    </SectionCard>
  );
}
