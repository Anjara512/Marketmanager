import { create } from "zustand";
type themes = "dark" | "light";
type langages = "francais" | "anglais";

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
interface Langage {
  langage: langages;
  toggleLangage: () => void;
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

export const useLangage = create<Langage>((set) => ({
  langage: "anglais",
  toggleLangage: () =>
    set((state) => ({
      langage: state.langage === "francais" ? "anglais" : "francais",
    })),
}));
