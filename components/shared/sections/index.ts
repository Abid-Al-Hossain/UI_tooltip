// Section Templates - Reusable editing section components
export {
  default as ShadowSection,
  buildBoxShadowCss,
  createDefaultShadowLayer,
} from "./ShadowSection";
export type { ShadowLayer, ShadowSectionProps } from "./ShadowSection";

export { default as BorderSection } from "./BorderSection";
export type { BorderStyle, BorderSectionProps } from "./BorderSection";

export {
  default as ColorsSection,
  createDefaultGradient,
  buildGradientCss,
} from "./ColorsSection";
export type { GradientConfig, ColorsSectionProps } from "./ColorsSection";

export { default as SizingSection } from "./SizingSection";
export type { SizeUnit, SizingSectionProps } from "./SizingSection";

export { default as EffectsSection, buildFilterCss } from "./EffectsSection";
export type { EffectsSectionProps } from "./EffectsSection";

export { default as AccessibilitySection } from "./AccessibilitySection";
export type {
  AriaRole,
  AccessibilitySectionProps,
} from "./AccessibilitySection";

export {
  default as TransitionSection,
  buildTransitionCss,
} from "./TransitionSection";
export type { EasingType, TransitionSectionProps } from "./TransitionSection";

export {
  default as FocusRingSection,
  buildFocusRingCss,
} from "./FocusRingSection";
export type { FocusRingSectionProps } from "./FocusRingSection";

export { default as RadiusSection, buildRadiusCss } from "./RadiusSection";
export type { RadiusPreset, RadiusSectionProps } from "./RadiusSection";

export { default as LabelsSection, createDefaultLabel } from "./LabelsSection";
export type {
  LabelPosition,
  LabelType,
  LabelConfig,
  LabelsSectionProps,
} from "./LabelsSection";

export { default as AnimationSection } from "./AnimationSection";
export type {
  AnimationType,
  AnimationDirection,
  AnimationSectionProps,
} from "./AnimationSection";

export { default as InteractiveStateSection } from "./InteractiveStateSection";
export type {
  InteractiveState,
  StateColors,
  InteractiveStateSectionProps,
} from "./InteractiveStateSection";

export {
  default as TextShadowSection,
  buildTextShadowCss,
} from "./TextShadowSection";
export type {
  TextShadowColorMode,
  TextShadowSectionProps,
} from "./TextShadowSection";

export { default as StatePreviewSection } from "./StatePreviewSection";
export type { StatePreviewSectionProps } from "./StatePreviewSection";

export {
  default as PreviewBackgroundSection,
  getPreviewBgColor,
} from "./PreviewBackgroundSection";
export type {
  PreviewBgMode,
  PreviewBackgroundSectionProps,
} from "./PreviewBackgroundSection";
