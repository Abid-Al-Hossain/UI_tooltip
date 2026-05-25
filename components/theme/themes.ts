export type ThemeId = "navy" | "forest" | "lavender" | "sunset" | "ocean" | "citrus" | "ink" | "sand" | "custom";

export type ThemeDef = {
  id: ThemeId;
  name: string;
  description: string;
};

export const THEMES: ThemeDef[] = [
  { id: "navy", name: "Navy (Default)", description: "Deep navy + crisp blues" },
  { id: "forest", name: "Forest", description: "Green + earthy neutrals" },
  { id: "lavender", name: "Lavender", description: "Purple + soft contrast" },
  { id: "sunset", name: "Sunset", description: "Warm orange + pink accents" },
  { id: "ocean", name: "Ocean", description: "Teal + deep sea contrast" },
  { id: "citrus", name: "Citrus", description: "Bright lime + warm highlights" },
  { id: "ink", name: "Ink", description: "High-contrast grayscale" },
  { id: "sand", name: "Sand", description: "Warm beige + deep blue" },
  { id: "custom", name: "Custom", description: "Your colors" },
];
