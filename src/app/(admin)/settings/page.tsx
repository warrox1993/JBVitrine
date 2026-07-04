import { Metadata } from "next";
import { AdminMessagePage } from "@/components/features/admin/AdminMessagePage";

export const metadata: Metadata = {
  title: "Settings - Smidjan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <AdminMessagePage
      title="Paramètres retirés"
      message="Le back-office historique n'est plus embarqué dans cette version. Les paramétrages sont désormais gérés via la configuration du site vitrine."
      actionText="Revenir à l'accueil"
      actionHref="/"
    />
  );
}
