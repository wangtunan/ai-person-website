import { accents } from "@/constants/theme";
import { useEffect, useState } from "react";

const storageKey = "bookmark-accent";

export function useAccentTheme() {
  const [accentIndex, setAccentIndex] = useState(0);
  const accent = accents[accentIndex];

  useEffect(() => {
    const savedAccent = window.localStorage.getItem(storageKey);
    const nextIndex = accents.findIndex((item) => item.id === savedAccent);

    if (nextIndex >= 0) {
      setAccentIndex(nextIndex);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, accent.id);
  }, [accent.id]);

  const cycleTheme = () => {
    setAccentIndex((current) => (current + 1) % accents.length);
  };

  return {
    accent,
    cycleTheme,
  };
}
