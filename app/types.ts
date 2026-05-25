"use client";

// =============================================================================
// TOOLTIP STATE TYPES
// =============================================================================

// --- Placement Types ---
export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TooltipAlignment = "start" | "center" | "end";

export type FollowCursorMode =
  | false
  | true
  | "horizontal"
  | "vertical"
  | "initial";

export type PositionStrategy = "absolute" | "fixed";

export type BoundaryConstraint = "viewport" | "clippingAncestors" | "body";

export type StickyMode = false | "reference" | "popper";

export type AppendToMode = "parent" | "body" | "inline";

// --- Trigger Types ---
export type TriggerEvent =
  | "mouseenter"
  | "focus"
  | "click"
  | "focusin"
  | "mouseenter focus"
  | "manual";

export type HideOnClickMode = boolean | "toggle";
export type TooltipControlMode = "uncontrolled" | "controlled" | "manual";

// --- Animation Types ---
export type AnimationType =
  | "fade"
  | "scale"
  | "shift-away"
  | "shift-toward"
  | "perspective"
  | "none";

// --- Theme Types ---
export type TooltipTheme = "dark" | "light" | "translucent" | "custom";

// --- Role Types ---
export type TooltipRole = "tooltip";

export type FocusManagementMode = "none";

// =============================================================================
// TOOLTIP STATE INTERFACE
// =============================================================================

export interface TooltipState {
  // === POSITIONING & GEOMETRY ===
  placement: TooltipPlacement;
  alignment: TooltipAlignment;
  autoPlacement: boolean;
  offset: number;
  flipBehavior: boolean;
  boundaryConstraint: BoundaryConstraint;
  followCursor: FollowCursorMode;
  positionStrategy: PositionStrategy;
  arrowPadding: number;
  zIndex: number;
  sticky: StickyMode;
  appendTo: AppendToMode;

  // === VISUAL STYLING ===
  bgColor: string;
  textColor: string;
  borderRadius: number;
  paddingX: number;
  paddingY: number;
  maxWidth: number;
  borderWidth: number;
  borderColor: string;
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  opacity: number;
  backdropFilter: string;
  theme: TooltipTheme;

  // === ARROW ===
  showArrow: boolean;
  arrowSize: number;
  arrowColor: string; // 'inherit' or hex

  // === ANIMATION & TIMING ===
  animationType: AnimationType;
  transitionDuration: number;
  transitionEasing: string;
  openDelay: number;
  closeDelay: number;
  inertia: boolean;
  mountTransition: boolean;
  unmountTransition: boolean;

  // === INTERACTION & TRIGGERS ===
  controlMode: TooltipControlMode;
  controlledOpen: boolean;
  triggerEvent: TriggerEvent;
  interactive: boolean;
  interactiveBorder: number;
  hideOnClick: HideOnClickMode;
  closeOnPointerDown: boolean;
  hideOnScroll: boolean;
  hideOnEscapeKey: boolean;
  touchHoldDelay: number;
  singleton: boolean;
  disabled: boolean;

  // === CONTENT & DATA ===
  content: string;
  allowHTML: boolean;
  dynamicUpdate: boolean;
  truncationLimit: number;

  // === TYPOGRAPHY ===
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  fontSize: number;
  fontSizeUnit: "px" | "rem";
  fontWeight: number;
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline";
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  lineHeight: number;
  textAlign: "left" | "center" | "right";

  // === ACCESSIBILITY ===
  ariaLabel: string;
  ariaDescribedBy: string;
  role: TooltipRole;
  focusManagement: FocusManagementMode;

  // === TRIGGER ELEMENT (for preview) ===
  triggerText: string;

  downloadName: string;
}

// =============================================================================
// DEFAULT STATE
// =============================================================================

export const DEFAULT_TOOLTIP_STATE: TooltipState = {
  // Positioning & Geometry
  placement: "top",
  alignment: "center",
  autoPlacement: false,
  offset: 10,
  flipBehavior: true,
  boundaryConstraint: "viewport",
  followCursor: false,
  positionStrategy: "absolute",
  arrowPadding: 8,
  zIndex: 9999,
  sticky: false,
  appendTo: "body",

  // Visual Styling
  bgColor: "#1e293b",
  textColor: "#f8fafc",
  borderRadius: 8,
  paddingX: 12,
  paddingY: 8,
  maxWidth: 300,
  borderWidth: 0,
  borderColor: "#475569",
  shadowEnabled: true,
  shadowX: 0,
  shadowY: 4,
  shadowBlur: 12,
  shadowSpread: 0,
  shadowColor: "#00000033",
  opacity: 100,
  backdropFilter: "none",
  theme: "dark",

  // Arrow
  showArrow: true,
  arrowSize: 8,
  arrowColor: "inherit",

  // Animation & Timing
  animationType: "fade",
  transitionDuration: 200,
  transitionEasing: "ease-out",
  openDelay: 0,
  closeDelay: 0,
  inertia: false,
  mountTransition: true,
  unmountTransition: true,

  // Interaction & Triggers
  controlMode: "uncontrolled",
  controlledOpen: false,
  triggerEvent: "mouseenter focus",
  interactive: false,
  interactiveBorder: 2,
  hideOnClick: false,
  closeOnPointerDown: false,
  hideOnScroll: false,
  hideOnEscapeKey: true,
  touchHoldDelay: 300,
  singleton: false,
  disabled: false,

  // Content & Data
  content: "This is a tooltip!",
  allowHTML: false,
  dynamicUpdate: true,
  truncationLimit: 0,

  // Typography
  fontBucket: "system",
  fontSearch: "",
  systemFontIdx: 9, // System UI
  googleFontFamily: "Inter",
  fontSize: 14,
  fontSizeUnit: "px",
  fontWeight: 500,
  fontStyle: "normal",
  textDecoration: "none",
  textTransform: "none",
  letterSpacing: 0,
  letterSpacingUnit: "px",
  lineHeight: 1.4,
  textAlign: "center",

  // Accessibility
  ariaLabel: "",
  ariaDescribedBy: "",
  role: "tooltip",
  focusManagement: "none",

  // Trigger Element
  triggerText: "Hover me",

  downloadName: "tooltip",
};

// =============================================================================
// CONSTANTS
// =============================================================================

export const PLACEMENT_OPTIONS: { value: TooltipPlacement; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "top-start", label: "Top Start" },
  { value: "top-end", label: "Top End" },
  { value: "bottom", label: "Bottom" },
  { value: "bottom-start", label: "Bottom Start" },
  { value: "bottom-end", label: "Bottom End" },
  { value: "left", label: "Left" },
  { value: "left-start", label: "Left Start" },
  { value: "left-end", label: "Left End" },
  { value: "right", label: "Right" },
  { value: "right-start", label: "Right Start" },
  { value: "right-end", label: "Right End" },
];

export const ALIGNMENT_OPTIONS: { value: TooltipAlignment; label: string }[] = [
  { value: "start", label: "Start" },
  { value: "center", label: "Center" },
  { value: "end", label: "End" },
];

export const BOUNDARY_OPTIONS: { value: BoundaryConstraint; label: string }[] =
  [
    { value: "viewport", label: "Viewport" },
    { value: "clippingAncestors", label: "Clipping Ancestors" },
    { value: "body", label: "Body" },
  ];

export const FOLLOW_CURSOR_OPTIONS: { value: string; label: string }[] = [
  { value: "false", label: "Disabled" },
  { value: "true", label: "Enabled" },
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
  { value: "initial", label: "Initial" },
];

export const POSITION_STRATEGY_OPTIONS: {
  value: PositionStrategy;
  label: string;
}[] = [
  { value: "absolute", label: "Absolute" },
  { value: "fixed", label: "Fixed" },
];

export const STICKY_OPTIONS: { value: string; label: string }[] = [
  { value: "false", label: "Disabled" },
  { value: "reference", label: "Reference" },
  { value: "popper", label: "Popper" },
];

export const APPEND_TO_OPTIONS: { value: AppendToMode; label: string }[] = [
  { value: "parent", label: "Parent" },
  { value: "body", label: "Body" },
  { value: "inline", label: "Inline" },
];

export const TRIGGER_EVENT_OPTIONS: { value: TriggerEvent; label: string }[] = [
  { value: "mouseenter", label: "Mouse Enter" },
  { value: "focus", label: "Focus" },
  { value: "click", label: "Click" },
  { value: "focusin", label: "Focus In" },
  { value: "mouseenter focus", label: "Hover + Focus" },
  { value: "manual", label: "Manual" },
];

export const HIDE_ON_CLICK_OPTIONS: { value: string; label: string }[] = [
  { value: "false", label: "Never" },
  { value: "true", label: "Always" },
  { value: "toggle", label: "Toggle" },
];

export const ANIMATION_TYPE_OPTIONS: { value: AnimationType; label: string }[] =
  [
    { value: "fade", label: "Fade" },
    { value: "scale", label: "Scale" },
    { value: "shift-away", label: "Shift Away" },
    { value: "shift-toward", label: "Shift Toward" },
    { value: "perspective", label: "Perspective" },
    { value: "none", label: "None" },
  ];

export const EASING_OPTIONS: { value: string; label: string }[] = [
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In Out" },
  { value: "linear", label: "Linear" },
  { value: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", label: "Bounce" },
];

export const THEME_OPTIONS: { value: TooltipTheme; label: string }[] = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "translucent", label: "Translucent" },
  { value: "custom", label: "Custom" },
];

export const ROLE_OPTIONS: { value: TooltipRole; label: string }[] = [
  { value: "tooltip", label: "Tooltip" },
];

export const FOCUS_MANAGEMENT_OPTIONS: {
  value: FocusManagementMode;
  label: string;
}[] = [
  { value: "none", label: "None" },
];

export const BACKDROP_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "blur(4px)", label: "Blur 4px" },
  { value: "blur(8px)", label: "Blur 8px" },
  { value: "blur(12px)", label: "Blur 12px" },
  { value: "saturate(1.5)", label: "Saturate" },
  { value: "blur(8px) saturate(1.5)", label: "Blur + Saturate" },
];

// Theme presets for quick styling
export const THEME_PRESETS: Record<TooltipTheme, Partial<TooltipState>> = {
  dark: {
    bgColor: "#1e293b",
    textColor: "#f8fafc",
    borderWidth: 0,
    borderColor: "#475569",
  },
  light: {
    bgColor: "#ffffff",
    textColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  translucent: {
    bgColor: "#0f172a",
    textColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#334155",
    backdropFilter: "blur(8px)",
    opacity: 90,
  },
  custom: {},
};
