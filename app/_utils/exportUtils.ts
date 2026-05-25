import { TooltipState } from "../types";
import {
  getFontFamily,
} from "./typographyHelpers";

// =============================================================================
// EXPORT PAYLOAD BUILDER
// =============================================================================

export function buildExportPayload(state: TooltipState): { code: string; filename: string } {
  const baseName = state.downloadName || "tooltip";

  return {
    code: buildReactExport(state),
    filename: `${baseName}.tsx`,
  };
}

// =============================================================================
// REACT COMPONENT EXPORT
// =============================================================================

function buildReactExport(state: TooltipState): string {
  const arrowColor =
    state.arrowColor === "inherit" ? state.bgColor : state.arrowColor;
  const shadow = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";
  const exportedContent =
    state.truncationLimit > 0 && state.content.length > state.truncationLimit
      ? `${state.content.slice(0, state.truncationLimit)}...`
      : state.content;
  const ariaLabelAttr = state.ariaLabel
    ? `\n        aria-label={${JSON.stringify(state.ariaLabel)}}`
    : "";
  const ariaDescribedByAttr = state.ariaDescribedBy
    ? `\n        aria-describedby={${JSON.stringify(state.ariaDescribedBy)}}`
    : "";
  const contentMarkup = state.allowHTML
    ? `>\n        <span dangerouslySetInnerHTML={{ __html: content }} />`
    : `>\n        {content}`;
  const contentClose = "</div>";

  return `import React, { useEffect, useRef, useState } from 'react';

interface TooltipProps {
  content?: string;
  children?: React.ReactNode;
  placement?: '${state.placement}';
}

export default function Tooltip({ 
  content = ${JSON.stringify(exportedContent)},
  children,
  placement = "${state.placement}"
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [manualPreviewVisible, setManualPreviewVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controlMode = "${state.controlMode}";
  const triggerEvent = "${state.triggerEvent}";
  const controlledOpen = ${state.controlledOpen ? "true" : "false"};
  const openDelay = ${state.openDelay};
  const closeDelay = ${state.closeDelay};
  const closeOnPointerDown = ${state.closeOnPointerDown ? "true" : "false"};
  const disabled = ${state.disabled ? "true" : "false"};

  useEffect(() => {
    setIsVisible(false);
    setManualPreviewVisible(false);
  }, [triggerEvent, controlMode]);

  const visible = disabled
    ? false
    : controlMode === "manual"
      ? manualPreviewVisible
      : controlMode === "controlled"
        ? controlledOpen
        : isVisible;

  useEffect(() => {
    if (!visible) return;

    const handleOutside = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!wrapperRef.current?.contains(target)) {
        setIsVisible(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      setIsVisible(false);
    };

    if (${state.hideOnClick ? "true" : "false"}) {
      document.addEventListener("click", handleOutside);
    }
    if (closeOnPointerDown) {
      document.addEventListener("pointerdown", handleOutside);
    }
    if (${state.hideOnScroll ? "true" : "false"}) {
      window.addEventListener("scroll", handleScroll, true);
    }
    if (${state.hideOnEscapeKey ? "true" : "false"}) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("click", handleOutside);
      document.removeEventListener("pointerdown", handleOutside);
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [visible, controlMode]);

  return (
    <div 
      ref={wrapperRef}
      className="tooltip-wrapper"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <div
        onMouseEnter={() => {
          if (disabled || controlMode !== "uncontrolled") return;
          if (triggerEvent.includes("mouseenter")) {
            setTimeout(() => setIsVisible(true), openDelay);
          }
        }}
        onMouseLeave={() => {
          if (disabled || controlMode !== "uncontrolled") return;
          if (triggerEvent.includes("mouseenter")) {
            setTimeout(() => setIsVisible(false), closeDelay);
          }
        }}
        onClick={() => {
          if (disabled || controlMode !== "uncontrolled") return;
          if (triggerEvent === "click") {
            setIsVisible((prev) => !prev);
          }
        }}
        onFocus={() => {
          if (disabled || controlMode !== "uncontrolled") return;
          if (triggerEvent.includes("focus")) setIsVisible(true);
        }}
        onBlur={() => {
          if (disabled || controlMode !== "uncontrolled") return;
          if (triggerEvent.includes("focus")) setIsVisible(false);
        }}
        tabIndex={-1}
      >
        {children || (
          <button disabled={disabled} style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.55 : 1,
          }}>
            ${state.triggerText}
          </button>
        )}
      </div>

      {controlMode === "manual" ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setManualPreviewVisible((prev) => !prev)}
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid ${state.borderColor}',
            background: '${state.bgColor}',
            color: '${state.textColor}',
            fontSize: '12px',
          }}
        >
          {manualPreviewVisible ? 'Hide tooltip' : 'Show tooltip'}
        </button>
      ) : null}
      
      <div
        role="${state.role}"
        ${ariaLabelAttr}${ariaDescribedByAttr}
        style={{
          position: 'absolute',
          ${getPositionJs(state)}
          background: '${state.bgColor}',
          color: '${state.textColor}',
          padding: '${state.paddingY}px ${state.paddingX}px',
          borderRadius: '${state.borderRadius}px',
          maxWidth: '${state.maxWidth}px',
          ${state.borderWidth > 0 ? `border: '${state.borderWidth}px solid ${state.borderColor}',` : ""}
          boxShadow: '${shadow}',
          ${state.backdropFilter !== "none" ? `backdropFilter: '${state.backdropFilter}',` : ""}
          opacity: visible ? ${state.opacity / 100} : 0,
          visibility: visible ? 'visible' : 'hidden',
          zIndex: ${state.zIndex},
          fontFamily: '${getFontFamily(state)}',
          fontSize: '${state.fontSize || 14}${state.fontSizeUnit || "px"}',
          fontWeight: ${state.fontWeight || 500},
          fontStyle: '${state.fontStyle || "normal"}',
          textDecoration: '${state.textDecoration || "none"}',
          textTransform: '${state.textTransform || "none"}',
          letterSpacing: '${state.letterSpacing || 0}${state.letterSpacingUnit || "px"}',
          lineHeight: ${state.lineHeight || 1.4},
          textAlign: '${state.textAlign || "center"}',
          transition: 'opacity ${state.transitionDuration}ms ${state.transitionEasing}, transform ${state.transitionDuration}ms ${state.transitionEasing}',
          pointerEvents: ${state.interactive ? "'auto'" : "'none'"},
        }}
        ${contentMarkup}
        ${
          state.showArrow
            ? `
        <div style={{
          position: 'absolute',
          ${getArrowPositionJs(state)}
          width: 0,
          height: 0,
          ${getArrowBorderJs(state, arrowColor)}
        }} />`
            : ""
        }
      ${contentClose}
    </div>
  );
}
`;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getPositionJs(state: TooltipState): string {
  const offset = state.offset;

  switch (true) {
    case state.placement.startsWith("top"):
      return `bottom: 'calc(100% + ${offset}px)', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("bottom"):
      return `top: 'calc(100% + ${offset}px)', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("left"):
      return `right: 'calc(100% + ${offset}px)', top: '50%', transform: 'translateY(-50%)',`;
    case state.placement.startsWith("right"):
      return `left: 'calc(100% + ${offset}px)', top: '50%', transform: 'translateY(-50%)',`;
    default:
      return `bottom: 'calc(100% + ${offset}px)', left: '50%', transform: 'translateX(-50%)',`;
  }
}

function getArrowPositionJs(state: TooltipState): string {
  switch (true) {
    case state.placement.startsWith("top"):
      return `top: '100%', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("bottom"):
      return `bottom: '100%', left: '50%', transform: 'translateX(-50%)',`;
    case state.placement.startsWith("left"):
      return `left: '100%', top: '50%', transform: 'translateY(-50%)',`;
    case state.placement.startsWith("right"):
      return `right: '100%', top: '50%', transform: 'translateY(-50%)',`;
    default:
      return "";
  }
}

function getArrowBorderJs(state: TooltipState, arrowColor: string): string {
  const size = state.arrowSize;

  switch (true) {
    case state.placement.startsWith("top"):
      return `borderLeft: '${size}px solid transparent', borderRight: '${size}px solid transparent', borderTop: '${size}px solid ${arrowColor}',`;
    case state.placement.startsWith("bottom"):
      return `borderLeft: '${size}px solid transparent', borderRight: '${size}px solid transparent', borderBottom: '${size}px solid ${arrowColor}',`;
    case state.placement.startsWith("left"):
      return `borderTop: '${size}px solid transparent', borderBottom: '${size}px solid transparent', borderLeft: '${size}px solid ${arrowColor}',`;
    case state.placement.startsWith("right"):
      return `borderTop: '${size}px solid transparent', borderBottom: '${size}px solid transparent', borderRight: '${size}px solid ${arrowColor}',`;
    default:
      return "";
  }
}

