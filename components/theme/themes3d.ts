export type Theme3DId = "cyberpunk" | "glass" | "paper" | "neon" | "standard";

export type Theme3DVars = {
  perspective: string; // e.g. "1200px"
  tiltMax: string; // e.g. "10deg"
  shadowDepth: string; // e.g. "20px"
  cardBorder: string; // Special border for 3D depth
};

export const THEMES_3D: Record<Theme3DId, { name: string; vars: Theme3DVars }> =
  {
    standard: {
      name: "Standard (Flat)",
      vars: {
        perspective: "none",
        tiltMax: "0deg",
        shadowDepth: "0px",
        cardBorder: "1px solid var(--border)",
      },
    },
    cyberpunk: {
      name: "Cyberpunk",
      vars: {
        perspective: "800px",
        tiltMax: "15deg",
        shadowDepth: "30px",
        cardBorder: "1px solid #00f3ff",
      },
    },
    glass: {
      name: "Glassmorphism",
      vars: {
        perspective: "1500px",
        tiltMax: "5deg",
        shadowDepth: "10px",
        cardBorder: "1px solid rgba(255,255,255,0.2)",
      },
    },
    paper: {
      name: "Paper Fold",
      vars: {
        perspective: "2000px",
        tiltMax: "2deg",
        shadowDepth: "5px",
        cardBorder: "1px solid rgba(0,0,0,0.1)",
      },
    },
    neon: {
      name: "Neon Depth",
      vars: {
        perspective: "600px",
        tiltMax: "10deg",
        shadowDepth: "50px",
        cardBorder: "2px solid #ff00ff",
      },
    },
  };
