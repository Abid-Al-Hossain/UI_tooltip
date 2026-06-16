"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { TooltipState, TooltipPlacement } from "../types";
import { getFontFamily } from "../_utils/typographyHelpers";
import ReactDOM from "react-dom";

interface TooltipPreviewProps {
  state: TooltipState;
}

export default function TooltipPreview({ state }: TooltipPreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [manualPreviewVisible, setManualPreviewVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [computedPlacement, setComputedPlacement] = useState<TooltipPlacement>(
    state.placement,
  );
  const [portalReady, setPortalReady] = useState(false);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [isTriggerFocused, setIsTriggerFocused] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const isOverTrigger = useRef(false);
  const isOverTooltip = useRef(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialCursorPosition = useRef({ x: 0, y: 0 });
  const tooltipVisible =
    state.controlMode === "manual"
      ? manualPreviewVisible
      : state.controlMode === "controlled"
        ? state.controlledOpen
        : isVisible;

  // Calculate arrow color
  const arrowColor =
    state.arrowColor === "inherit" ? state.bgColor : state.arrowColor;

  // Build shadow CSS
  const shadowCss = state.shadowEnabled
    ? `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}`
    : "none";

  // Content is always taken directly from state.content
  // (dynamicUpdate is about whether external content changes should update)

  // =========================================================================
  // MOUNT/UNMOUNT TRANSITIONS
  // =========================================================================
  useEffect(() => {
    if (tooltipVisible) {
      if (state.mountTransition) {
        // Delay mount for animation
        setIsMounted(true);
      } else {
        setIsMounted(true);
      }
    } else {
      if (state.unmountTransition) {
        // Delay unmount to allow exit animation
        const timeout = setTimeout(() => {
          setIsMounted(false);
        }, state.transitionDuration);
        return () => clearTimeout(timeout);
      } else {
        setIsMounted(false);
      }
    }
  }, [
    tooltipVisible,
    state.mountTransition,
    state.unmountTransition,
    state.transitionDuration,
  ]);

  // =========================================================================
  // APPEND TO - Portal rendering for body mode
  // =========================================================================
  useEffect(() => {
    if (state.appendTo === "body" && typeof document !== "undefined") {
      // Create portal container if it doesn't exist
      if (!portalContainerRef.current) {
        const container = document.createElement("div");
        container.id = "tooltip-portal-container";
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = "0";
        container.style.height = "0";
        container.style.overflow = "visible";
        container.style.zIndex = String(state.zIndex);
        container.style.pointerEvents = "none";
        document.body.appendChild(container);
        portalContainerRef.current = container;
        setPortalReady(true); // Trigger re-render
      }
    } else {
      setPortalReady(false);
    }

    return () => {
      if (portalContainerRef.current && state.appendTo === "body") {
        try {
          document.body.removeChild(portalContainerRef.current);
        } catch {
          // Container may already be removed
        }
        portalContainerRef.current = null;
        setPortalReady(false);
      }
    };
  }, [state.appendTo, state.zIndex]);

  // =========================================================================
  // AUTO PLACEMENT - Calculate best placement based on available space
  // =========================================================================
  const getBoundaryRect = useCallback(() => {
    // Use boundaryConstraint to determine the boundary
    switch (state.boundaryConstraint) {
      case "viewport":
        return {
          top: 0,
          left: 0,
          right: window.innerWidth,
          bottom: window.innerHeight,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      case "body":
        return {
          top: 0,
          left: 0,
          right: document.body.clientWidth,
          bottom: document.body.clientHeight,
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        };
      case "clippingAncestors":
      default:
        // For clippingAncestors, we'd need to find scrollable ancestors
        // Fall back to viewport for simplicity
        return {
          top: 0,
          left: 0,
          right: window.innerWidth,
          bottom: window.innerHeight,
          width: window.innerWidth,
          height: window.innerHeight,
        };
    }
  }, [state.boundaryConstraint]);

  const calculateBestPlacement = useCallback((): TooltipPlacement => {
    if (!state.autoPlacement || !triggerRef.current || !tooltipRef.current) {
      return state.placement;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const boundary = getBoundaryRect();
    const offset = state.offset;

    // Calculate available space in each direction
    const spaceTop = triggerRect.top - boundary.top - offset;
    const spaceBottom = boundary.bottom - triggerRect.bottom - offset;
    const spaceLeft = triggerRect.left - boundary.left - offset;
    const spaceRight = boundary.right - triggerRect.right - offset;

    const tooltipWidth = tooltipRect.width || 200;
    const tooltipHeight = tooltipRect.height || 50;

    // Determine best vertical placement
    let vertical: "top" | "bottom" =
      spaceTop >= tooltipHeight ? "top" : "bottom";
    if (spaceBottom >= tooltipHeight && spaceBottom > spaceTop) {
      vertical = "bottom";
    }

    // Determine best horizontal placement
    let horizontal: "left" | "right" | null = null;
    if (spaceLeft >= tooltipWidth && spaceLeft > spaceRight) {
      horizontal = "left";
    } else if (spaceRight >= tooltipWidth) {
      horizontal = "right";
    }

    // If original placement fits, keep it
    const basePlacement = state.placement.split("-")[0] as
      | "top"
      | "bottom"
      | "left"
      | "right";

    const fitsVertically =
      (basePlacement === "top" && spaceTop >= tooltipHeight) ||
      (basePlacement === "bottom" && spaceBottom >= tooltipHeight);

    const fitsHorizontally =
      (basePlacement === "left" && spaceLeft >= tooltipWidth) ||
      (basePlacement === "right" && spaceRight >= tooltipWidth);

    if (
      (basePlacement === "top" || basePlacement === "bottom") &&
      fitsVertically
    ) {
      return state.placement;
    }
    if (
      (basePlacement === "left" || basePlacement === "right") &&
      fitsHorizontally
    ) {
      return state.placement;
    }

    // Return computed best placement
    if (basePlacement === "top" || basePlacement === "bottom") {
      return vertical as TooltipPlacement;
    }
    return horizontal || vertical;
  }, [state.autoPlacement, state.placement, state.offset, getBoundaryRect]);

  // =========================================================================
  // FLIP BEHAVIOR - Flip placement when hitting viewport edge
  // =========================================================================
  const getFlippedPlacement = useCallback((): TooltipPlacement => {
    if (!state.flipBehavior || !triggerRef.current || !tooltipRef.current) {
      return computedPlacement;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const boundary = getBoundaryRect();
    const offset = state.offset;

    let newPlacement = computedPlacement;
    const basePlacement = computedPlacement.split("-")[0];
    const alignment = computedPlacement.includes("-start")
      ? "-start"
      : computedPlacement.includes("-end")
        ? "-end"
        : "";

    // Check if tooltip overflows and flip if needed
    if (basePlacement === "top") {
      if (triggerRect.top - tooltipRect.height - offset < boundary.top) {
        newPlacement = `bottom${alignment}` as TooltipPlacement;
      }
    } else if (basePlacement === "bottom") {
      if (triggerRect.bottom + tooltipRect.height + offset > boundary.bottom) {
        newPlacement = `top${alignment}` as TooltipPlacement;
      }
    } else if (basePlacement === "left") {
      if (triggerRect.left - tooltipRect.width - offset < boundary.left) {
        newPlacement = `right${alignment}` as TooltipPlacement;
      }
    } else if (basePlacement === "right") {
      if (triggerRect.right + tooltipRect.width + offset > boundary.right) {
        newPlacement = `left${alignment}` as TooltipPlacement;
      }
    }

    return newPlacement;
  }, [state.flipBehavior, state.offset, computedPlacement, getBoundaryRect]);

  // Update computed placement when auto-placement or flip changes
  useEffect(() => {
    if (tooltipVisible && (state.autoPlacement || state.flipBehavior)) {
      const bestPlacement = calculateBestPlacement();
      setComputedPlacement(bestPlacement);

      // Apply flip after initial placement
      requestAnimationFrame(() => {
        const flipped = getFlippedPlacement();
        if (flipped !== bestPlacement) {
          setComputedPlacement(flipped);
        }
      });
    } else {
      setComputedPlacement(state.placement);
    }
  }, [
    tooltipVisible,
    state.autoPlacement,
    state.flipBehavior,
    state.placement,
    calculateBestPlacement,
    getFlippedPlacement,
  ]);

  // =========================================================================
  // FOLLOW CURSOR - Track mouse position for cursor-following tooltips
  // =========================================================================
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!state.followCursor) return;

      if (state.followCursor === "initial") {
        // Only set once when tooltip first appears
        return;
      }

      // Store viewport coordinates
      if (state.followCursor === "horizontal") {
        setCursorPosition((prev) => ({ ...prev, x: e.clientX }));
      } else if (state.followCursor === "vertical") {
        setCursorPosition((prev) => ({ ...prev, y: e.clientY }));
      } else if (state.followCursor === true) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    },
    [state.followCursor],
  );

  useEffect(() => {
    if (state.followCursor && tooltipVisible) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [state.followCursor, tooltipVisible, handleMouseMove]);

  // =========================================================================
  // HIDE ON ESCAPE KEY
  // =========================================================================
  useEffect(() => {
    if (!state.hideOnEscapeKey || !tooltipVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [state.hideOnEscapeKey, tooltipVisible]);

  // =========================================================================
  // HIDE ON CLICK OUTSIDE
  // =========================================================================
  useEffect(() => {
    if (
      (!state.hideOnClick &&
        !state.closeOnPointerDown &&
        !state.hideOnScroll &&
        !state.hideOnEscapeKey) ||
      !tooltipVisible
    )
      return;

    const handlePointerDownOutside = (e: Event) => {
      const target = e.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedTooltip = tooltipRef.current?.contains(target);

      if (!clickedTrigger && !clickedTooltip) {
        setIsVisible(false);
      }
    };

    // Use setTimeout to avoid closing on the same click that opened
    const timeoutId = setTimeout(() => {
      if (state.hideOnClick) {
        document.addEventListener("click", handlePointerDownOutside);
      }
      if (state.closeOnPointerDown) {
        document.addEventListener("pointerdown", handlePointerDownOutside);
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handlePointerDownOutside);
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [
    state.hideOnClick,
    state.closeOnPointerDown,
    state.hideOnScroll,
    state.hideOnEscapeKey,
    tooltipVisible,
  ]);

  // =========================================================================
  // HIDE ON SCROLL
  // =========================================================================
  useEffect(() => {
    if (!state.hideOnScroll || !tooltipVisible) return;

    const handleScroll = () => {
      setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [state.hideOnScroll, tooltipVisible]);

  // =========================================================================
  // STICKY POSITIONING - Keep tooltip visible while scrolling
  // =========================================================================
  useEffect(() => {
    if (!state.sticky || !tooltipVisible) return;

    const updatePosition = () => {
      // Force re-render to update position
      if (state.autoPlacement || state.flipBehavior) {
        const newPlacement = calculateBestPlacement();
        setComputedPlacement(newPlacement);
      }
    };

    if (state.sticky === "reference" || state.sticky === "popper") {
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [
    state.sticky,
    tooltipVisible,
    state.autoPlacement,
    state.flipBehavior,
    calculateBestPlacement,
  ]);

  // =========================================================================
  // FOCUS MANAGEMENT - Focus trap for interactive tooltips
  // =========================================================================
  useEffect(() => {
    if (
      !tooltipVisible ||
      !state.interactive ||
      state.focusManagement === "none" ||
      !tooltipRef.current
    ) {
      return;
    }

    const tooltip = tooltipRef.current;
    const focusableElements = tooltip.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    if (state.focusManagement === "first") {
      // Focus first focusable element
      focusableElements[0]?.focus();
    } else if (state.focusManagement === "trap") {
      // Focus trap
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement?.focus();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [tooltipVisible, state.interactive, state.focusManagement]);

  // =========================================================================
  // INERTIA - Physics-based easing function
  // =========================================================================
  const getTransitionEasing = useMemo(() => {
    if (state.inertia) {
      // Spring-like easing for inertia effect
      return "cubic-bezier(0.34, 1.56, 0.64, 1)";
    }
    return state.transitionEasing;
  }, [state.inertia, state.transitionEasing]);

  // =========================================================================
  // ANIMATION STYLES
  // =========================================================================
  const getAnimationStyles = () => {
    const visible = tooltipVisible;
    const duration = `${state.transitionDuration}ms`;
    const easing = getTransitionEasing;

    let transform = "";
    const opacity = visible ? state.opacity / 100 : 0;

    // Only apply transforms when not visible (for entry/exit animations)
    if (!visible) {
      switch (state.animationType) {
        case "scale":
          transform = "scale(0.85)";
          break;
        case "shift-away":
          transform = getShiftAwayTransform(computedPlacement);
          break;
        case "shift-toward":
          transform = getShiftTowardTransform(computedPlacement);
          break;
        case "perspective":
          transform = "perspective(700px) rotateX(60deg)";
          break;
      }
    }

    // Only include transform if there's an animation transform to apply
    // Otherwise, let getPositionStyles() handle the positioning transform
    const result: React.CSSProperties = {
      opacity,
      transition:
        state.animationType !== "none"
          ? `opacity ${duration} ${easing}, transform ${duration} ${easing}`
          : "none",
    };

    // Only add transform if we have one (don't overwrite position transform)
    if (transform) {
      result.transform = transform;
    }

    return result;
  };

  // Helper for shift animations
  const getShiftAwayTransform = (placement: string) => {
    if (placement.startsWith("top")) return "translateY(-10px)";
    if (placement.startsWith("bottom")) return "translateY(10px)";
    if (placement.startsWith("left")) return "translateX(-10px)";
    if (placement.startsWith("right")) return "translateX(10px)";
    return "";
  };

  const getShiftTowardTransform = (placement: string) => {
    if (placement.startsWith("top")) return "translateY(10px)";
    if (placement.startsWith("bottom")) return "translateY(-10px)";
    if (placement.startsWith("left")) return "translateX(10px)";
    if (placement.startsWith("right")) return "translateX(-10px)";
    return "";
  };

  // =========================================================================
  // POSITION STYLES - Including follow cursor, positionStrategy, alignment
  // =========================================================================
  const getPositionStyles = (): React.CSSProperties => {
    const offset = state.offset;
    const placement = computedPlacement;

    // Follow cursor mode - position based on cursor
    if (state.followCursor && tooltipVisible) {
      const isPortal = state.appendTo === "body";
      const base: React.CSSProperties = {
        position: isPortal ? "fixed" : "absolute",
        zIndex: state.zIndex,
        pointerEvents: state.interactive ? "auto" : "none",
        transform: "translateX(-50%)", // Default center X
      };

      // Get viewport coordinates
      let viewportX = cursorPosition.x;
      let viewportY = cursorPosition.y;

      if (state.followCursor === "initial") {
        viewportX = initialCursorPosition.current.x;
        viewportY = initialCursorPosition.current.y;
      }

      // Calculate base position (Left/Top)
      if (isPortal) {
        base.left = viewportX;
        base.top = viewportY;
      } else {
        // Inline: calculate relative to wrapper
        const wrapperRect = wrapperRef.current?.getBoundingClientRect();
        if (wrapperRect) {
          base.left = viewportX - wrapperRect.left;
          base.top = viewportY - wrapperRect.top;
        } else {
          base.left = viewportX;
          base.top = viewportY;
        }
      }

      // Apply constraints
      if (state.followCursor === "initial") {
        base.top = (base.top as number) - offset;
        base.transform += " translateY(-100%)";
      } else if (state.followCursor === "horizontal") {
        // Fixed vertical position based on trigger
        const triggerRect = triggerRef.current?.getBoundingClientRect();
        const wrapperRect = wrapperRef.current?.getBoundingClientRect();

        if (triggerRect) {
          const topRelative = isPortal
            ? triggerRect.top
            : triggerRect.top - (wrapperRect?.top || 0);
          const bottomRelative = isPortal
            ? triggerRect.bottom
            : triggerRect.bottom - (wrapperRect?.top || 0);

          if (placement.startsWith("top")) {
            base.top = topRelative - offset;
            base.transform += " translateY(-100%)";
          } else {
            base.top = bottomRelative + offset;
          }
        }
      } else if (state.followCursor === "vertical") {
        // Fixed horizontal position based on trigger
        const triggerRect = triggerRef.current?.getBoundingClientRect();
        const wrapperRect = wrapperRef.current?.getBoundingClientRect();

        if (triggerRect) {
          const leftRelative = isPortal
            ? triggerRect.left
            : triggerRect.left - (wrapperRect?.left || 0);
          const rightRelative = isPortal
            ? triggerRect.right
            : triggerRect.right - (wrapperRect?.left || 0);

          if (placement.startsWith("left")) {
            base.left = leftRelative - offset;
            base.transform += " translateX(-100%)";
          } else {
            base.left = rightRelative + offset;
          }
          base.transform += " translateY(-50%)";
        }
      } else {
        // Full follow (true)
        base.top = (base.top as number) - offset - 10;
      }

      return base;
    }

    // =========================================================================
    // PORTAL MODE (appendTo: body) - Use fixed positioning with viewport coords
    // =========================================================================
    if (state.appendTo === "body" && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      // Calculate center points
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;

      const base: React.CSSProperties = {
        position: "fixed",
        zIndex: state.zIndex,
        pointerEvents: state.interactive ? "auto" : "none",
        // Let TooltipContent handle sizing - just ensure we don't constrain
        width: "auto",
      };

      // Calculate position based on placement
      switch (true) {
        case placement.startsWith("top"):
          base.top = triggerRect.top - offset;
          base.left = triggerCenterX;
          base.transform = "translate(-50%, -100%)";
          break;
        case placement.startsWith("bottom"):
          base.top = triggerRect.bottom + offset;
          base.left = triggerCenterX;
          base.transform = "translateX(-50%)";
          break;
        case placement.startsWith("left"):
          base.top = triggerCenterY;
          base.left = triggerRect.left - offset;
          base.transform = "translate(-100%, -50%)";
          break;
        case placement.startsWith("right"):
          base.top = triggerCenterY;
          base.left = triggerRect.right + offset;
          base.transform = "translateY(-50%)";
          break;
      }

      // Alignment adjustments for portal mode
      if (placement.includes("-start") || state.alignment === "start") {
        if (placement.startsWith("top") || placement.startsWith("bottom")) {
          base.left = triggerRect.left;
          base.transform = placement.startsWith("top")
            ? "translateY(-100%)"
            : "translateY(0)";
        } else {
          base.top = triggerRect.top;
          base.transform = placement.startsWith("left")
            ? "translateX(-100%)"
            : "translateX(0)";
        }
      }
      if (placement.includes("-end") || state.alignment === "end") {
        if (placement.startsWith("top") || placement.startsWith("bottom")) {
          base.left = triggerRect.right;
          base.transform = placement.startsWith("top")
            ? "translate(-100%, -100%)"
            : "translateX(-100%)";
        } else {
          base.top = triggerRect.bottom;
          base.transform = placement.startsWith("left")
            ? "translate(-100%, -100%)"
            : "translateY(-100%)";
        }
      }

      return base;
    }

    // =========================================================================
    // INLINE MODE (appendTo: parent) - Use relative positioning
    // =========================================================================
    const base: React.CSSProperties = {
      position: state.positionStrategy,
      zIndex: state.zIndex,
    };

    // Main placement
    switch (true) {
      case placement.startsWith("top"):
        base.bottom = `calc(100% + ${offset}px)`;
        base.left = "50%";
        base.transform = "translateX(-50%)";
        break;
      case placement.startsWith("bottom"):
        base.top = `calc(100% + ${offset}px)`;
        base.left = "50%";
        base.transform = "translateX(-50%)";
        break;
      case placement.startsWith("left"):
        base.right = `calc(100% + ${offset}px)`;
        base.top = "50%";
        base.transform = "translateY(-50%)";
        break;
      case placement.startsWith("right"):
        base.left = `calc(100% + ${offset}px)`;
        base.top = "50%";
        base.transform = "translateY(-50%)";
        break;
    }

    // Alignment adjustments (using state.alignment for fine-tuning)
    if (placement.includes("-start") || state.alignment === "start") {
      if (placement.startsWith("top") || placement.startsWith("bottom")) {
        base.left = "0";
        base.transform = "none";
      } else {
        base.top = "0";
        base.transform = "none";
      }
    }
    if (placement.includes("-end") || state.alignment === "end") {
      if (placement.startsWith("top") || placement.startsWith("bottom")) {
        base.left = "auto";
        base.right = "0";
        base.transform = "none";
      } else {
        base.top = "auto";
        base.bottom = "0";
        base.transform = "none";
      }
    }

    return base;
  };

  // =========================================================================
  // ARROW STYLES - Including arrowPadding
  // =========================================================================
  const getArrowStyles = (): React.CSSProperties => {
    const size = state.arrowSize;
    const placement = computedPlacement;
    const padding = state.arrowPadding;
    const base: React.CSSProperties = {
      position: "absolute",
      width: 0,
      height: 0,
    };

    const borderSize = `${size}px`;
    const transparent = "transparent";

    switch (true) {
      case placement.startsWith("top"):
        base.top = "100%";
        base.left = "50%";
        base.transform = "translateX(-50%)";
        base.borderLeft = `${borderSize} solid ${transparent}`;
        base.borderRight = `${borderSize} solid ${transparent}`;
        base.borderTop = `${borderSize} solid ${arrowColor}`;
        // Apply arrow padding constraints
        if (placement.includes("-start")) {
          base.left = `${padding + size}px`;
          base.transform = "none";
        } else if (placement.includes("-end")) {
          base.left = "auto";
          base.right = `${padding + size}px`;
          base.transform = "none";
        }
        break;
      case placement.startsWith("bottom"):
        base.bottom = "100%";
        base.left = "50%";
        base.transform = "translateX(-50%)";
        base.borderLeft = `${borderSize} solid ${transparent}`;
        base.borderRight = `${borderSize} solid ${transparent}`;
        base.borderBottom = `${borderSize} solid ${arrowColor}`;
        if (placement.includes("-start")) {
          base.left = `${padding + size}px`;
          base.transform = "none";
        } else if (placement.includes("-end")) {
          base.left = "auto";
          base.right = `${padding + size}px`;
          base.transform = "none";
        }
        break;
      case placement.startsWith("left"):
        base.left = "100%";
        base.top = "50%";
        base.transform = "translateY(-50%)";
        base.borderTop = `${borderSize} solid ${transparent}`;
        base.borderBottom = `${borderSize} solid ${transparent}`;
        base.borderLeft = `${borderSize} solid ${arrowColor}`;
        if (placement.includes("-start")) {
          base.top = `${padding + size}px`;
          base.transform = "none";
        } else if (placement.includes("-end")) {
          base.top = "auto";
          base.bottom = `${padding + size}px`;
          base.transform = "none";
        }
        break;
      case placement.startsWith("right"):
        base.right = "100%";
        base.top = "50%";
        base.transform = "translateY(-50%)";
        base.borderTop = `${borderSize} solid ${transparent}`;
        base.borderBottom = `${borderSize} solid ${transparent}`;
        base.borderRight = `${borderSize} solid ${arrowColor}`;
        if (placement.includes("-start")) {
          base.top = `${padding + size}px`;
          base.transform = "none";
        } else if (placement.includes("-end")) {
          base.top = "auto";
          base.bottom = `${padding + size}px`;
          base.transform = "none";
        }
        break;
    }

    return base;
  };

  // =========================================================================
  // INTERACTIVE BORDER - Invisible hit area for easier hover
  // =========================================================================
  const getInteractiveBorderStyles = (): React.CSSProperties => {
    if (!state.interactive || state.interactiveBorder <= 0) {
      return {};
    }

    return {
      padding: `${state.interactiveBorder}px`,
      margin: `-${state.interactiveBorder}px`,
    };
  };

  // =========================================================================
  // TIMEOUT HELPERS
  // =========================================================================
  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const clearShowTimeout = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  };

  const clearTouchTimeout = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  };

  const scheduleHide = () => {
    clearHideTimeout();
    const delay = state.interactive
      ? Math.max(state.closeDelay, 100)
      : state.closeDelay;
    hideTimeoutRef.current = setTimeout(() => {
      if (!isOverTrigger.current && !isOverTooltip.current) {
        setIsVisible(false);
      }
    }, delay);
  };

  // =========================================================================
  // EVENT HANDLERS
  // =========================================================================
  const handleTriggerEnter = (e: React.MouseEvent) => {
    if (state.disabled || state.controlMode !== "uncontrolled") return;
    isOverTrigger.current = true;
    clearHideTimeout();

    // Store initial cursor position for "initial" follow mode
    if (state.followCursor === "initial" && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      initialCursorPosition.current = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      };
    }

    if (state.triggerEvent.includes("mouseenter")) {
      clearShowTimeout();
      showTimeoutRef.current = setTimeout(
        () => setIsVisible(true),
        state.openDelay,
      );
    }
  };

  const handleTriggerLeave = () => {
    if (state.disabled || state.controlMode !== "uncontrolled") return;
    isOverTrigger.current = false;
    clearShowTimeout();
    if (state.triggerEvent.includes("mouseenter")) {
      if (state.interactive) {
        scheduleHide();
      } else {
        setTimeout(() => setIsVisible(false), state.closeDelay);
      }
    }
  };

  const handleTriggerClick = () => {
    if (state.disabled || state.controlMode !== "uncontrolled") return;
    if (state.triggerEvent === "click") {
      // Toggle visibility on click trigger
      setIsVisible((prev) => !prev);
    }
  };

  const handleTriggerFocus = () => {
    setIsTriggerFocused(true);
    if (state.disabled || state.controlMode !== "uncontrolled") return;
    if (state.triggerEvent.includes("focus")) {
      setIsVisible(true);
    }
  };

  const handleTriggerBlur = () => {
    setIsTriggerFocused(false);
    if (state.disabled || state.controlMode !== "uncontrolled") return;
    if (state.triggerEvent.includes("focus")) {
      if (state.interactive) {
        scheduleHide();
      } else {
        setIsVisible(false);
      }
    }
  };

  // =========================================================================
  // TOUCH HOLD DELAY - Support for touch devices
  // =========================================================================
  const handleTouchStart = () => {
    if (state.disabled || state.controlMode !== "uncontrolled") return;
    clearTouchTimeout();
    touchTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, state.touchHoldDelay);
  };

  const handleTouchEnd = () => {
    if (state.controlMode !== "uncontrolled") return;
    clearTouchTimeout();
    if (tooltipVisible) {
      scheduleHide();
    }
  };

  const handleTooltipEnter = () => {
    if (!state.interactive) return;
    isOverTooltip.current = true;
    setIsTooltipHovered(true);
    clearHideTimeout();
  };

  const handleTooltipLeave = () => {
    if (!state.interactive) return;
    isOverTooltip.current = false;
    setIsTooltipHovered(false);
    scheduleHide();
  };

  // =========================================================================
  // INITIALIZE VISIBILITY
  // =========================================================================
  useEffect(() => {
    setIsVisible(false);
    setManualPreviewVisible(false);
  }, [state.triggerEvent, state.controlMode]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearHideTimeout();
      clearShowTimeout();
      clearTouchTimeout();
    };
  }, []);

  // =========================================================================
  // TOOLTIP CONTENT COMPONENT
  // =========================================================================
  const TooltipContent = (
    <div
      ref={tooltipRef}
      onMouseEnter={handleTooltipEnter}
      onMouseLeave={handleTooltipLeave}
      role={state.role}
      aria-label={state.ariaLabel || undefined}
      aria-describedby={state.ariaDescribedBy || undefined}
      style={{
        ...getPositionStyles(),
        ...getAnimationStyles(),
        // Merge transforms so animation acts on top of positioning
        transform: [
          getPositionStyles().transform,
          getAnimationStyles().transform,
        ]
          .filter(Boolean)
          .join(" "),
        ...getInteractiveBorderStyles(),
        background: state.interactive && isTooltipHovered ? state.hoverBgColor : state.bgColor,
        color: state.interactive && isTooltipHovered ? state.hoverTextColor : state.textColor,
        borderRadius: `${state.borderRadius}px`,
        padding: `${state.paddingY}px ${state.paddingX}px`,
        maxWidth: `${state.maxWidth}px`,
        width: "fit-content",
        border:
          state.borderWidth > 0
            ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`
            : "none",
        boxShadow: shadowCss,
        backdropFilter:
          state.backdropFilter !== "none" ? state.backdropFilter : undefined,
        fontFamily: getFontFamily(state),
        fontSize: `${state.fontSize || 14}${state.fontSizeUnit || "px"}`,
        fontWeight: state.fontWeight || 500,
        fontStyle: state.fontStyle || "normal",
        textDecoration: state.textDecoration || "none",
        textTransform: state.textTransform || "none",
        letterSpacing: `${state.letterSpacing || 0}${state.letterSpacingUnit || "px"}`,
        lineHeight: state.lineHeight || 1.4,
        textAlign: state.textAlign || "center",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        pointerEvents: state.interactive ? "auto" : "none",
      }}
    >
      {state.allowHTML ? (
        <div dangerouslySetInnerHTML={{ __html: state.content }} />
      ) : (
        <span>
          {state.truncationLimit > 0 &&
          state.content.length > state.truncationLimit
            ? `${state.content.slice(0, state.truncationLimit)}...`
            : state.content}
        </span>
      )}

      {/* Arrow */}
      {state.showArrow && !state.followCursor && (
        <div style={getArrowStyles()} />
      )}
    </div>
  );

  // =========================================================================
  // RENDER
  // =========================================================================
  const renderTooltip = () => {
    if (!isMounted) return null;

    // SINGLETON: Note - full singleton support would require a context provider
    // For now, we just support the basic behavior (tooltip renders normally)

    // APPEND TO: Render to body using portal (only if container is ready)
    if (
      state.appendTo === "body" &&
      portalReady &&
      portalContainerRef.current
    ) {
      return ReactDOM.createPortal(TooltipContent, portalContainerRef.current);
    }

    // Default: render inline (also fallback if portal not ready)
    return TooltipContent;
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full min-h-[300px]"
    >
      <div className="relative inline-block" ref={wrapperRef}>
        {/* Trigger Element */}
        <button
          ref={triggerRef}
          onMouseEnter={handleTriggerEnter}
          onMouseLeave={handleTriggerLeave}
          onClick={handleTriggerClick}
          onFocus={handleTriggerFocus}
          onBlur={handleTriggerBlur}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          disabled={state.disabled}
          className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 focus:outline-none"
          style={{
            background: state.disabled && state.disabledUseCustomColors
              ? "#64748b"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
            opacity: state.disabled ? state.disabledOpacity : 1,
            cursor: state.disabled ? state.disabledCursor : "pointer",
            outline: isTriggerFocused && state.focusRingEnabled ? `${state.focusRingWidth}px solid ${state.focusRingColor}` : "none",
            outlineOffset: isTriggerFocused && state.focusRingEnabled ? state.focusRingOffset : 0,
          }}
        >
          {state.triggerText}
        </button>

        {/* Tooltip */}
        {renderTooltip()}

        {state.controlMode === "manual" && (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setManualPreviewVisible((prev) => !prev)}
              className="rounded-lg border px-3 py-1.5 text-xs font-medium transition"
              style={{
                background: "var(--surface)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
            >
              {manualPreviewVisible ? "Hide tooltip" : "Show tooltip"}
            </button>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              Manual mode is controlled by the preview button.
            </span>
          </div>
        )}
      </div>

      {/* Placement Indicator */}
      <div
        className="absolute bottom-4 left-4 text-xs font-medium px-2 py-1 rounded-md"
        style={{
          background: "var(--surface)",
          color: "var(--muted)",
          border: "1px solid var(--border)",
        }}
      >
        Placement: {computedPlacement}
        {state.followCursor && ` (Follow: ${state.followCursor})`}
      </div>
    </div>
  );
}
