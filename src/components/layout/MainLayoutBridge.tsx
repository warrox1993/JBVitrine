"use client";

import { usePathname } from "next/navigation";

interface MainLayoutBridgeProps {
  children: React.ReactNode;
  className: string;
}

export default function MainLayoutBridge({ children, className }: MainLayoutBridgeProps) {
  // Logic simplified: MainLayoutBridge is now only used in (site) layout
  return (
    <main id="main" className={className}>
      {children}
    </main>
  );
}
