import type { ReactNode } from "react";
import EmergencyBar from "@/components/layout/EmergencyBar/EmergencyBar";
import SiteHeader from "@/components/layout/SiteHeader/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter/SiteFooter";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <EmergencyBar />
      <SiteHeader />
      <main id="main" className="main-content-site">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
