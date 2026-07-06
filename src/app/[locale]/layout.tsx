import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Pre-render all locales at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Validates the [locale] segment and enables static rendering for the
// localized pages. The <html>/<body> and providers live in the root layout.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return children;
}
