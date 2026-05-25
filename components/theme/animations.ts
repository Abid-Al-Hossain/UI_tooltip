import { Variants } from "framer-motion";
import { Direction, AnimationType } from "./types";

// Helper to get variants based on direction
const slideVariants = (direction: Direction) => {
  let initialX = "0%",
    initialY = "0%";
  let exitX = "0%",
    exitY = "0%";

  if (direction === "left") {
    initialX = "100%";
    exitX = "-30%";
  } // Inner
  else if (direction === "right") {
    initialX = "-100%";
    exitX = "30%";
  } // Outer
  else if (direction === "down") {
    initialY = "-100%";
    exitY = "30%";
  } // Down Sibling (Enter from Top)
  else if (direction === "up") {
    initialY = "100%";
    exitY = "-30%";
  } // Up Sibling (Enter from Bottom)
  else {
    initialX = "100%";
    exitX = "-30%";
  }

  return {
    initial: { x: initialX, y: initialY, opacity: 1, zIndex: 1 },
    enter: { x: "0%", y: "0%", opacity: 1, zIndex: 1 },
    exit: { x: exitX, y: exitY, opacity: 0.5, zIndex: 0 },
  };
};

const pushVariants = (direction: Direction) => {
  let initialX = "0%",
    initialY = "0%";
  let exitX = "0%",
    exitY = "0%";

  if (direction === "left") {
    initialX = "100%";
    exitX = "-100%";
  } else if (direction === "right") {
    initialX = "-100%";
    exitX = "100%";
  } else if (direction === "down") {
    initialY = "-100%";
    exitY = "100%";
  } else if (direction === "up") {
    initialY = "100%";
    exitY = "-100%";
  } else {
    initialX = "100%";
    exitX = "-100%";
  }

  return {
    initial: {
      x: initialX,
      y: initialY,
      opacity: 1,
      boxShadow: "-20px 0 50px rgba(0,0,0,0.5)",
    },
    enter: { x: "0%", y: "0%", opacity: 1 },
    exit: { x: exitX, y: exitY, opacity: 1 },
  };
};

const cubeVariants = (direction: Direction) => {
  // 4-Way Cube
  if (direction === "left") {
    return {
      initial: {
        rotateY: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateY: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateY: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  if (direction === "right") {
    return {
      initial: {
        rotateY: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateY: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateY: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  if (direction === "down") {
    // Waterfall Down (Top enters)
    return {
      initial: {
        rotateX: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateX: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateX: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  if (direction === "up") {
    // Waterfall Up (Bottom enters)
    return {
      initial: {
        rotateX: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateX: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateX: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  return {
    initial: {
      rotateY: 90,
      opacity: 0,
      transformOrigin: "50% 50% -400px",
      x: 0,
      y: 0,
      backfaceVisibility: "hidden",
      zIndex: 1,
    },
    enter: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "50% 50% -400px",
      x: 0,
      y: 0,
      backfaceVisibility: "hidden",
      zIndex: 2,
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      transformOrigin: "50% 50% -400px",
      x: 0,
      y: 0,
      backfaceVisibility: "hidden",
      zIndex: 0,
    },
  };
};

const flipVariants = (direction: Direction) => {
  // Horizontal = RotateY, Vertical = RotateX
  if (direction === "left")
    return {
      initial: { rotateY: 90, opacity: 0 },
      enter: { rotateY: 0, opacity: 1 },
      exit: { rotateY: -90, opacity: 0 },
    };
  if (direction === "right")
    return {
      initial: { rotateY: -90, opacity: 0 },
      enter: { rotateY: 0, opacity: 1 },
      exit: { rotateY: 90, opacity: 0 },
    };
  if (direction === "down")
    return {
      initial: { rotateX: 90, opacity: 0 },
      enter: { rotateX: 0, opacity: 1 },
      exit: { rotateX: -90, opacity: 0 },
    };
  if (direction === "up")
    return {
      initial: { rotateX: -90, opacity: 0 },
      enter: { rotateX: 0, opacity: 1 },
      exit: { rotateX: 90, opacity: 0 },
    };
  return {
    initial: { rotateY: 90, opacity: 0 },
    enter: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  };
};

const foldVariants = (direction: Direction) => {
  // Fold uses transformOrigin to behave like a piece of paper
  if (direction === "left")
    return {
      initial: { opacity: 0, rotateY: 90, transformOrigin: "right" },
      enter: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90, transformOrigin: "left" },
    };
  if (direction === "right")
    return {
      initial: { opacity: 0, rotateY: -90, transformOrigin: "left" },
      enter: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: 90, transformOrigin: "right" },
    };
  if (direction === "down")
    return {
      initial: { opacity: 0, rotateX: 90, transformOrigin: "top" },
      enter: { opacity: 1, rotateX: 0 },
      exit: { opacity: 0, rotateX: -90, transformOrigin: "bottom" },
    };
  if (direction === "up")
    return {
      initial: { opacity: 0, rotateX: -90, transformOrigin: "bottom" },
      enter: { opacity: 1, rotateX: 0 },
      exit: { opacity: 0, rotateX: 90, transformOrigin: "top" },
    };
  return {
    initial: { opacity: 0, rotateY: 90, transformOrigin: "right" },
    enter: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90, transformOrigin: "left" },
  };
};

const roomVariants = (direction: Direction) => {
  // Direction mainly affects the 'slide' part of the room effect
  // We scale down and move away (Z), but also shift slightly to opposite direction

  let x = 0,
    y = 0;
  if (direction === "left") x = 100;
  if (direction === "right") x = -100;
  if (direction === "down") y = -100;
  if (direction === "up") y = 100;

  return {
    initial: { opacity: 0, scale: 0.8, z: -500, x, y },
    enter: { opacity: 1, scale: 1, z: 0, x: 0, y: 0 },
    exit: { opacity: 0, scale: 1.2, z: 200, x: -x, y: -y }, // Exit moves continuously in same dir
  };
};

const swapVariants = (direction: Direction) => {
  if (direction === "left")
    return {
      initial: { x: "50%", scale: 0.5, opacity: 0, zIndex: 0 },
      enter: { x: "0%", scale: 1, opacity: 1, zIndex: 2 },
      exit: { x: "-50%", scale: 0.5, opacity: 0, zIndex: 0 },
    };
  if (direction === "right")
    return {
      initial: { x: "-50%", scale: 0.5, opacity: 0, zIndex: 0 },
      enter: { x: "0%", scale: 1, opacity: 1, zIndex: 2 },
      exit: { x: "50%", scale: 0.5, opacity: 0, zIndex: 0 },
    };
  if (direction === "down")
    return {
      initial: { y: "-50%", scale: 0.5, opacity: 0, zIndex: 0 },
      enter: { y: "0%", scale: 1, opacity: 1, zIndex: 2 },
      exit: { y: "50%", scale: 0.5, opacity: 0, zIndex: 0 },
    }; // Enter from Top
  if (direction === "up")
    return {
      initial: { y: "50%", scale: 0.5, opacity: 0, zIndex: 0 },
      enter: { y: "0%", scale: 1, opacity: 1, zIndex: 2 },
      exit: { y: "-50%", scale: 0.5, opacity: 0, zIndex: 0 },
    }; // Enter from Bottom
  return {
    initial: { x: "50%", scale: 0.5, opacity: 0, zIndex: 0 },
    enter: { x: "0%", scale: 1, opacity: 1, zIndex: 2 },
    exit: { x: "-50%", scale: 0.5, opacity: 0, zIndex: 0 },
  };
};

export const ANIMATIONS: Record<AnimationType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },

  slide: {
    initial: (d: Direction) => slideVariants(d).initial,
    enter: (d: Direction) => slideVariants(d).enter,
    exit: (d: Direction) => slideVariants(d).exit,
  },

  push: {
    initial: (d: Direction) => pushVariants(d).initial,
    enter: (d: Direction) => pushVariants(d).enter,
    exit: (d: Direction) => pushVariants(d).exit,
  },

  cube: {
    initial: (d: Direction) => cubeVariants(d).initial,
    enter: (d: Direction) => cubeVariants(d).enter,
    exit: (d: Direction) => cubeVariants(d).exit,
  },

  flip: {
    initial: (d: Direction) => flipVariants(d).initial,
    enter: (d: Direction) => flipVariants(d).enter,
    exit: (d: Direction) => flipVariants(d).exit,
  },

  fold: {
    initial: (d: Direction) => foldVariants(d).initial,
    enter: (d: Direction) => foldVariants(d).enter,
    exit: (d: Direction) => foldVariants(d).exit,
  },

  room: {
    initial: (d: Direction) => roomVariants(d).initial,
    enter: (d: Direction) => roomVariants(d).enter,
    exit: (d: Direction) => roomVariants(d).exit,
  },

  swap: {
    initial: (d: Direction) => swapVariants(d).initial,
    enter: (d: Direction) => swapVariants(d).enter,
    exit: (d: Direction) => swapVariants(d).exit,
  },

  zoom: {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
  },

  blur: {
    initial: { filter: "blur(20px)", opacity: 0 },
    enter: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(20px)", opacity: 0 },
  },

  scale: {
    initial: (d: Direction) => ({
      scale: d === "left" || d === "down" ? 1.1 : 0.9,
      opacity: 0,
    }),
    enter: { scale: 1, opacity: 1 },
    exit: (d: Direction) => ({
      scale: d === "left" || d === "down" ? 0.9 : 1.1,
      opacity: 0,
    }),
  },
};
