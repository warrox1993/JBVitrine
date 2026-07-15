import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { headers } from "next/headers";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
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
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginRoute = pathname.startsWith("/admin/login");

  const user = await getCurrentUser();
  if (!user && !isLoginRoute) {
    redirect("/admin/login");
  }

  const session = await getServerSession(authOptions);

  return (
    <div className={styles.adminLayout}>
      {session && <AdminSidebar userRole={session.user?.role || "viewer"} />}
      <main id="main" className={session ? styles.mainContent : styles.authContent}>
        {children}
      </main>
    </div>
  );
}
