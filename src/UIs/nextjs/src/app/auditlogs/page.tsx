import { Metadata } from "next";
import { AdminMessagePage } from "@/components/admin/AdminMessagePage";

export const metadata: Metadata = {
  title: "Audit Logs - Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <AdminMessagePage
      title="Journal d'audit indisponible"
      message="Les fonctionnalités d'administration héritées ont été retirées dans la nouvelle vitrine. Si vous avez besoin d'un accès audit, contactez l'équipe pour une mise à jour dédiée."
      actionText="Revenir à l'accueil"
      actionHref="/"
    />
  );
}
