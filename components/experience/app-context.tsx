"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { siteConfig } from "@/config/site.config";

interface AppContextValue {
  /** True once the preloader has finished (or immediately when disabled) */
  ready: boolean;
  setReady: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!siteConfig.features.preloader);
  const [menuOpen, setMenuOpen] = useState(false);

  const value = useMemo(
    () => ({ ready, setReady, menuOpen, setMenuOpen }),
    [ready, menuOpen]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
