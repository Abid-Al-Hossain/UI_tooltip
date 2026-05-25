"use client";

import { TooltipState } from "../types";
import { SYSTEM_FONTS } from "@/components/shared/typography/fontConstants";

/**
 * Computes the CSS font-family value from the typography state fields.
 * Supports both system fonts (by index) and Google fonts (by name).
 */
export function getFontFamily(state: TooltipState): string {
  if (state.fontBucket === "google") {
    // Google font - return font name with fallback
    return `'${state.googleFontFamily}', sans-serif`;
  } else {
    // System font - look up by index
    const systemFont = SYSTEM_FONTS[state.systemFontIdx];
    return systemFont?.css || "system-ui, -apple-system, sans-serif";
  }
}

/**
 * Generates Google Fonts link tag for the selected font.
 * Only needed when fontBucket is "google".
 */
export function getGoogleFontLink(state: TooltipState): string {
  if (state.fontBucket !== "google" || !state.googleFontFamily) {
    return "";
  }
  const fontName = state.googleFontFamily.replace(/ /g, "+");
  return `<link href="https://fonts.googleapis.com/css2?family=${fontName}:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;
}

/**
 * Generates all typography CSS properties from state.
 */
export function getTypographyCss(state: TooltipState): string {
  const fontFamily = getFontFamily(state);
  const fontSize = state.fontSize || 14;
  const fontSizeUnit = state.fontSizeUnit || "px";
  const fontWeight = state.fontWeight || 500;
  const fontStyle = state.fontStyle || "normal";
  const textDecoration = state.textDecoration || "none";
  const textTransform = state.textTransform || "none";
  const letterSpacing = state.letterSpacing || 0;
  const letterSpacingUnit = state.letterSpacingUnit || "px";
  const lineHeight = state.lineHeight || 1.4;
  const textAlign = state.textAlign || "center";

  return `font-family: ${fontFamily};
  font-size: ${fontSize}${fontSizeUnit};
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  text-decoration: ${textDecoration};
  text-transform: ${textTransform};
  letter-spacing: ${letterSpacing}${letterSpacingUnit};
  line-height: ${lineHeight};
  text-align: ${textAlign};`;
}

/**
 * Generates typography CSS properties for inline JS styles.
 */
export function getTypographyJsStyles(
  state: TooltipState,
): Record<string, string | number> {
  const fontFamily = getFontFamily(state);
  return {
    fontFamily,
    fontSize: `${state.fontSize || 14}${state.fontSizeUnit || "px"}`,
    fontWeight: state.fontWeight || 500,
    fontStyle: state.fontStyle || "normal",
    textDecoration: state.textDecoration || "none",
    textTransform: state.textTransform || "none",
    letterSpacing: `${state.letterSpacing || 0}${state.letterSpacingUnit || "px"}`,
    lineHeight: state.lineHeight || 1.4,
    textAlign: state.textAlign || "center",
  };
}
