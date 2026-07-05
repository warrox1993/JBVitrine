import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminMessagePage } from "@/components/features/admin/AdminMessagePage";
import { getCurrentUser, hasRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Settings - Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  // SECURITY (V-W7): this route responds at /settings, which is outside the
  // middleware's /admin matcher — enforce auth here explicitly instead of
  // relying solely on being nested under the (admin) route group.
  const user = await getCurrentUser();
  if (!user || !hasRole(user.role, "sales")) {
    redirect("/admin/login");
  }

  return (
    <AdminMessagePage
      title="Paramètres retirés"
      message="Le back-office historique n'est plus embarqué dans cette version. Les paramétrages sont désormais gérés via la configuration du site vitrine."
      actionText="Revenir à l'accueil"
      actionHref="/"
    />
  );
}
