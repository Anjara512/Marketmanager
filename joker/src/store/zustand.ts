import { create } from "zustand";
type themes = "dark" | "light";

interface toasts {
  content: string;
}

interface Theme {
  theme: themes;
  toggleTheme: () => void;
  toasting: toasts;
}

interface Card {
  card: boolean;
  toggleCard: () => void;
}

export const useTheme = create<Theme>((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  toasting: { content: " " },
}));

export const useToggleCard = create<Card>((set) => ({
  card: false,
  toggleCard: () =>
    set((state) => ({ card: state.card === false ? true : false })),
}));

export const useToggDeconnexionleCard = create<Card>((set) => ({
  card: false,
  toggleCard: () =>
    set((state) => ({ card: state.card === false ? true : false })),
}));
