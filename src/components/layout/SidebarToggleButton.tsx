"use client";

import { useSidebarMobile } from "@/hooks/useSidebarMobile";
import styles from "./SidebarToggleButton.module.css";

export default function SidebarToggleButton() {
  const { isOpen, toggle } = useSidebarMobile();

  return (
    <button
      className={styles.sidebarToggle}
      onClick={toggle}
      aria-label={isOpen ? "Fermer la navigation latérale" : "Ouvrir la navigation latérale"}
      aria-expanded={isOpen}
      aria-controls="sidebar"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    </button>
  );
}
