"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { fr: "FR", nl: "NL", en: "EN" };

/**
 * Footer language switcher. Keeps the current pathname and swaps the locale
 * (FR at "/", NL/EN prefixed). Client component: reads the active locale and
 * the locale-agnostic pathname from next-intl navigation.
 */
export function LocaleSwitcher({
  className,
  activeClassName,
}: {
  className?: string;
  activeClassName?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={className}>
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={loc === locale ? activeClassName : undefined}
          aria-current={loc === locale ? "page" : undefined}
          hrefLang={loc}
        >
          {LABELS[loc]}
        </Link>
      ))}
    </div>
  );
}
