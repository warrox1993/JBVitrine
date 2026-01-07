"use client";

import { usePathname } from "next/navigation";

interface MainLayoutBridgeProps {
  children: React.ReactNode;
  className: string;
}

export default function MainLayoutBridge({ children, className }: MainLayoutBridgeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <main id="main" className={className}>
      {children}
    </main>
  );
}
