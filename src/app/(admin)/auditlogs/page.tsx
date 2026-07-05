import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminMessagePage } from "@/components/features/admin/AdminMessagePage";
import { getCurrentUser, hasRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Audit Logs - Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  // SECURITY (V-W7): this route responds at /auditlogs, which is outside the
  // middleware's /admin matcher — enforce auth here explicitly instead of
  // relying solely on being nested under the (admin) route group.
  const user = await getCurrentUser();
  if (!user || !hasRole(user.role, "sales")) {
    redirect("/admin/login");
  }

  return (
    <AdminMessagePage
      title="Journal d'audit indisponible"
      message="Les fonctionnalités d'administration héritées ont été retirées dans la nouvelle vitrine. Si vous avez besoin d'un accès audit, contactez l'équipe pour une mise à jour dédiée."
      actionText="Revenir à l'accueil"
      actionHref="/"
    />
  );
}
