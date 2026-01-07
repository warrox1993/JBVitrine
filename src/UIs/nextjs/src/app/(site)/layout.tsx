import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import MainLayoutBridge from "@/components/layout/MainLayoutBridge";
import SidebarRouterBridge from "@/components/layout/SidebarRouterBridge";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarRouterBridge />
      <Header />
      <MainLayoutBridge className="main-content-site">
        {children}
      </MainLayoutBridge>
    </>
  );
}
