"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransition } from "./TransitionProvider";
import { ANIMATIONS } from "./animations";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

// Helper to freeze the route for exit animations
function FrozenRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { animation, speed, direction } = useTransition();

  // Get variants object (not calling function here unless it's dynamic)
  // Actually, ANIMATIONS is now an object of Variants directly.
  const variants = ANIMATIONS[animation];

  // Custom durations
  const duration =
    speed === "slow"
      ? 0.8
      : speed === "fast"
        ? 0.2
        : speed === "sonic"
          ? 0.1
          : 0.4;

  return (
    <div
      className="grid h-full w-full overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            ease: "easeInOut",
            duration: duration,
          }}
          className="grid h-full w-full overflow-hidden bg-[var(--surface)]"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            width: "100%",
            height: "100%",
            gridArea: "1 / 1", // Force overlap in grid
          }}
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
