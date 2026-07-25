"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
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
  // Native pathname = the FULL path incl. any locale prefix (e.g. "/en/cv").
  // next-intl's own usePathname() can return that prefixed value after a
  // client-side navigation, which made "/en/cv" + locale "en" resolve to
  // "/en/en/cv" (404) when clicking the already-active locale. Strip the
  // leading locale segment ourselves so the href handed to <Link> is ALWAYS
  // locale-agnostic and cannot double-prefix.
  const fullPathname = usePathname();
  const segments = fullPathname.split("/");
  const hasLocalePrefix = (routing.locales as readonly string[]).includes(
    segments[1],
  );
  const pathname =
    (hasLocalePrefix ? "/" + segments.slice(2).join("/") : fullPathname).replace(
      /\/+$/,
      "",
    ) || "/";

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
