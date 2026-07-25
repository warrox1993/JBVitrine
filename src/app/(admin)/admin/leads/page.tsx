import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { LeadsDashboard } from "./LeadsDashboard";

export default async function AdminLeadsPage() {
  const t = await getTranslations("common");
  return (
    <LeadsDashboard
      breadcrumb={
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            { label: "Admin", href: "/admin" },
            { label: "Leads" },
          ]}
        />
      }
    />
  );
}
