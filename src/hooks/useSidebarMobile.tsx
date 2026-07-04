"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type SidebarMobileContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarMobileContext = createContext<SidebarMobileContextType | undefined>(undefined);

export function SidebarMobileProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Empêcher le scroll du body quand le sidebar est ouvert sur mobile
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <SidebarMobileContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarMobileContext.Provider>
  );
}

export function useSidebarMobile() {
  const context = useContext(SidebarMobileContext);
  if (!context) {
    throw new Error("useSidebarMobile must be used within SidebarMobileProvider");
  }
  return context;
}
