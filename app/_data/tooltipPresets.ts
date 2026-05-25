"use client";

import type {
  AnimationType,
  TooltipPlacement,
  TooltipState,
  TooltipControlMode,
  TriggerEvent,
  TooltipTheme,
} from "../types";
import { DEFAULT_TOOLTIP_STATE } from "../types";

export type TooltipPreset = {
  id: string;
  name: string;
  summary: string;
  family: string;
  controlMode: TooltipControlMode;
  trigger: TriggerEvent;
  placement: TooltipPlacement;
  animation: AnimationType;
  theme: TooltipTheme;
  tags: string[];
  state: Partial<TooltipState>;
};

type Theme = {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  backdropFilter: string;
  opacity: number;
  borderRadius: number;
};

type Archetype = {
  id: string;
  name: string;
  summary: string;
  tags: string[];
  theme: TooltipTheme;
  triggerEvent: TriggerEvent;
  controlMode: TooltipControlMode;
  placement: TooltipPlacement;
  animationType: AnimationType;
  role: TooltipState["role"];
  showArrow: boolean;
  interactive: boolean;
  hideOnClick: TooltipState["hideOnClick"];
  closeOnPointerDown: boolean;
  followCursor: TooltipState["followCursor"];
  positionStrategy: TooltipState["positionStrategy"];
  focusManagement: TooltipState["focusManagement"];
  appendTo: TooltipState["appendTo"];
  openDelay: number;
  closeDelay: number;
  maxWidth: number;
  textAlign: TooltipState["textAlign"];
  fontWeight: number;
  content: string;
  triggerText: string;
};

const THEMES: Theme[] = [
  {
    id: "slate",
    name: "Slate",
    bgColor: "#0f172a",
    textColor: "#f8fafc",
    borderColor: "#334155",
    shadowColor: "rgba(15, 23, 42, 0.28)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 10,
  },
  {
    id: "cobalt",
    name: "Cobalt",
    bgColor: "#1d4ed8",
    textColor: "#eff6ff",
    borderColor: "#60a5fa",
    shadowColor: "rgba(37, 99, 235, 0.24)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 10,
  },
  {
    id: "emerald",
    name: "Emerald",
    bgColor: "#064e3b",
    textColor: "#ecfdf5",
    borderColor: "#34d399",
    shadowColor: "rgba(6, 95, 70, 0.24)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 10,
  },
  {
    id: "sunset",
    name: "Sunset",
    bgColor: "#7c2d12",
    textColor: "#fff7ed",
    borderColor: "#fb923c",
    shadowColor: "rgba(124, 45, 18, 0.22)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 12,
  },
  {
    id: "rose",
    name: "Rose",
    bgColor: "#881337",
    textColor: "#fff1f2",
    borderColor: "#fb7185",
    shadowColor: "rgba(136, 19, 55, 0.22)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 12,
  },
  {
    id: "violet",
    name: "Violet",
    bgColor: "#4c1d95",
    textColor: "#f5f3ff",
    borderColor: "#a78bfa",
    shadowColor: "rgba(76, 29, 149, 0.24)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 12,
  },
  {
    id: "amber",
    name: "Amber",
    bgColor: "#78350f",
    textColor: "#fffbeb",
    borderColor: "#fcd34d",
    shadowColor: "rgba(120, 53, 15, 0.22)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 12,
  },
  {
    id: "glass",
    name: "Glass",
    bgColor: "rgba(15, 23, 42, 0.72)",
    textColor: "#f8fafc",
    borderColor: "rgba(255,255,255,0.22)",
    shadowColor: "rgba(15, 23, 42, 0.3)",
    backdropFilter: "blur(18px)",
    opacity: 92,
    borderRadius: 14,
  },
  {
    id: "arctic",
    name: "Arctic",
    bgColor: "#f8fafc",
    textColor: "#0f172a",
    borderColor: "#cbd5e1",
    shadowColor: "rgba(15, 23, 42, 0.14)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 12,
  },
  {
    id: "cherry",
    name: "Cherry",
    bgColor: "#4c0519",
    textColor: "#ffe4e6",
    borderColor: "#fb7185",
    shadowColor: "rgba(76, 5, 25, 0.28)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 10,
  },
  {
    id: "obsidian",
    name: "Obsidian",
    bgColor: "#020617",
    textColor: "#67e8f9",
    borderColor: "#06b6d4",
    shadowColor: "rgba(6, 182, 212, 0.35)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 10,
  },
  {
    id: "indigo",
    name: "Indigo",
    bgColor: "#312e81",
    textColor: "#eef2ff",
    borderColor: "#818cf8",
    shadowColor: "rgba(49, 46, 129, 0.24)",
    backdropFilter: "none",
    opacity: 100,
    borderRadius: 12,
  },
];

const ARCHETYPES: Archetype[] = [
  {
    id: "calm-hover",
    name: "Calm Hover",
    summary: "Quiet product tooltip for unobtrusive helper text.",
    tags: ["hover", "calm", "product", "fade"],
    theme: "dark",
    triggerEvent: "mouseenter focus",
    controlMode: "uncontrolled",
    placement: "top",
    animationType: "fade",
    role: "tooltip",
    showArrow: true,
    interactive: false,
    hideOnClick: false,
    closeOnPointerDown: false,
    followCursor: false,
    positionStrategy: "absolute",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 0,
    closeDelay: 0,
    maxWidth: 260,
    textAlign: "center",
    fontWeight: 500,
    content: "Helpful context without distracting motion.",
    triggerText: "Hover for help",
  },
  {
    id: "glass-float",
    name: "Glass Float",
    summary: "Translucent premium tooltip with blur and scale motion.",
    tags: ["glass", "translucent", "scale", "premium"],
    theme: "translucent",
    triggerEvent: "mouseenter focus",
    controlMode: "uncontrolled",
    placement: "bottom",
    animationType: "scale",
    role: "tooltip",
    showArrow: true,
    interactive: false,
    hideOnClick: false,
    closeOnPointerDown: false,
    followCursor: false,
    positionStrategy: "absolute",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 60,
    closeDelay: 80,
    maxWidth: 300,
    textAlign: "center",
    fontWeight: 500,
    content: "Layered glass styling for premium UI surfaces.",
    triggerText: "Inspect material",
  },
  {
    id: "editorial-callout",
    name: "Editorial Callout",
    summary: "Readable editorial helper with longer copy and left alignment.",
    tags: ["editorial", "copy", "left", "annotation"],
    theme: "light",
    triggerEvent: "mouseenter focus",
    controlMode: "uncontrolled",
    placement: "right",
    animationType: "shift-away",
    role: "tooltip",
    showArrow: true,
    interactive: false,
    hideOnClick: false,
    closeOnPointerDown: false,
    followCursor: false,
    positionStrategy: "absolute",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 40,
    closeDelay: 100,
    maxWidth: 340,
    textAlign: "left",
    fontWeight: 500,
    content:
      "Use this preset for more editorial helper copy, richer reading rhythm, and cleaner annotation-like callouts.",
    triggerText: "Read annotation",
  },
  {
    id: "cyber-cursor",
    name: "Cyber Cursor",
    summary: "Follow-cursor tooltip with energetic motion and neon contrast.",
    tags: ["cyber", "cursor", "neon", "interactive"],
    theme: "custom",
    triggerEvent: "mouseenter",
    controlMode: "uncontrolled",
    placement: "top-start",
    animationType: "perspective",
    role: "tooltip",
    showArrow: false,
    interactive: false,
    hideOnClick: false,
    closeOnPointerDown: false,
    followCursor: "initial",
    positionStrategy: "fixed",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 0,
    closeDelay: 0,
    maxWidth: 260,
    textAlign: "center",
    fontWeight: 600,
    content: "Cursor-reactive tooltip for expressive product demos.",
    triggerText: "Trace pointer",
  },
  {
    id: "click-panel",
    name: "Click Panel",
    summary: "Click-triggered helper panel with interactive content handling.",
    tags: ["click", "panel", "fixed", "interactive"],
    theme: "dark",
    triggerEvent: "click",
    controlMode: "controlled",
    placement: "bottom-end",
    animationType: "shift-toward",
    role: "tooltip",
    showArrow: true,
    interactive: true,
    hideOnClick: "toggle",
    closeOnPointerDown: true,
    followCursor: false,
    positionStrategy: "fixed",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 0,
    closeDelay: 0,
    maxWidth: 320,
    textAlign: "left",
    fontWeight: 500,
    content: "A richer click-driven helper panel for compact UI inspector moments.",
    triggerText: "Open helper",
  },
  {
    id: "manual-inspector",
    name: "Manual Inspector",
    summary: "Manual preview mode for persistent inspection and QA demos.",
    tags: ["manual", "qa", "persistent", "preview"],
    theme: "light",
    triggerEvent: "manual",
    controlMode: "manual",
    placement: "bottom",
    animationType: "fade",
    role: "tooltip",
    showArrow: true,
    interactive: true,
    hideOnClick: false,
    closeOnPointerDown: false,
    followCursor: false,
    positionStrategy: "absolute",
    focusManagement: "none",
    appendTo: "inline",
    openDelay: 0,
    closeDelay: 0,
    maxWidth: 280,
    textAlign: "center",
    fontWeight: 500,
    content: "Manual mode is useful when you want the tooltip to stay visible for inspection.",
    triggerText: "Toggle preview",
  },
  {
    id: "menu-sheet",
    name: "Menu Sheet",
    summary: "Popover-like tooltip for command and menu style hints.",
    tags: ["menu", "sheet", "keyboard", "light"],
    theme: "light",
    triggerEvent: "focus",
    controlMode: "controlled",
    placement: "left",
    animationType: "shift-away",
    role: "tooltip",
    showArrow: true,
    interactive: true,
    hideOnClick: true,
    closeOnPointerDown: true,
    followCursor: false,
    positionStrategy: "absolute",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 30,
    closeDelay: 90,
    maxWidth: 300,
    textAlign: "left",
    fontWeight: 600,
    content: "Keyboard-friendly hint sheet for compact controls and menus.",
    triggerText: "Open menu hint",
  },
  {
    id: "sticky-guide",
    name: "Sticky Guide",
    summary: "Persistent floating guide for onboarding and walkthroughs.",
    tags: ["sticky", "guide", "onboarding", "trap"],
    theme: "translucent",
    triggerEvent: "mouseenter focus",
    controlMode: "uncontrolled",
    placement: "right-end",
    animationType: "scale",
    role: "tooltip",
    showArrow: true,
    interactive: true,
    hideOnClick: false,
    closeOnPointerDown: true,
    followCursor: false,
    positionStrategy: "fixed",
    focusManagement: "none",
    appendTo: "body",
    openDelay: 80,
    closeDelay: 120,
    maxWidth: 310,
    textAlign: "left",
    fontWeight: 500,
    content: "Sticky guidance for onboarding flows and persistent helper moments.",
    triggerText: "Need guidance",
  },
];

function buildPreset(theme: Theme, archetype: Archetype): TooltipPreset {
  const themeVariant = archetype.theme;
  return {
    id: `${theme.id}-${archetype.id}`,
    name: `${theme.name} ${archetype.name}`,
    summary: `${archetype.summary} ${theme.name.toLowerCase()} palette.`,
    family: theme.name,
    controlMode: archetype.controlMode,
    trigger: archetype.triggerEvent,
    placement: archetype.placement,
    animation: archetype.animationType,
    theme: themeVariant,
    tags: [
      theme.id,
      archetype.controlMode,
      archetype.triggerEvent,
      archetype.placement,
      archetype.animationType,
      ...archetype.tags,
    ],
    state: {
      ...DEFAULT_TOOLTIP_STATE,
      theme: themeVariant,
      bgColor: theme.bgColor,
      textColor: theme.textColor,
      borderColor: theme.borderColor,
      shadowColor: theme.shadowColor,
      backdropFilter: theme.backdropFilter,
      opacity: theme.opacity,
      borderRadius: theme.borderRadius,
      downloadName: `${theme.id}-${archetype.id}`,
      ariaLabel: `${theme.name} ${archetype.name}`,
      triggerText: archetype.triggerText,
      content: archetype.content,
      showArrow: archetype.showArrow,
      interactive: archetype.interactive,
      hideOnClick: archetype.hideOnClick,
      followCursor: archetype.followCursor,
      positionStrategy: archetype.positionStrategy,
      focusManagement: archetype.focusManagement,
      appendTo: archetype.appendTo,
      openDelay: archetype.openDelay,
      closeDelay: archetype.closeDelay,
      maxWidth: archetype.maxWidth,
      textAlign: archetype.textAlign,
      fontWeight: archetype.fontWeight,
      role: archetype.role,
      triggerEvent: archetype.triggerEvent,
      controlMode: archetype.controlMode,
      controlledOpen: archetype.controlMode === "controlled",
      placement: archetype.placement,
      animationType: archetype.animationType,
      closeOnPointerDown: archetype.closeOnPointerDown,
    } satisfies Partial<TooltipState>,
  };
}

export const TOOLTIP_PRESETS: TooltipPreset[] = THEMES.flatMap((theme) =>
  ARCHETYPES.map((archetype) => buildPreset(theme, archetype)),
);
