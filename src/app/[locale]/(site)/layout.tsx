import type { ReactNode } from "react";
import SiteHeader from "@/components/layout/SiteHeader/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter/SiteFooter";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="main-content-site">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
