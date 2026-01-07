import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Smidjan Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // If it's the login page, don't show the sidebar
  // This is handled by checking the pathname in a client component or 
  // simply by having a separate layout if needed, but here we can 
  // just check if a session exists (login won't have it).
  // Actually, login page is inside /admin/login, so it shares this layout.
  // We should only show sidebar if session exists and we're NOT on login page.
  // But wait, server layout doesn't know the current path easily without headers.
  
  return (
    <div className={styles.adminLayout}>
      {session && <AdminSidebar userRole={session.user?.role || "viewer"} />}
      <main className={session ? styles.mainContent : styles.authContent}>
        {children}
      </main>
    </div>
  );
}
