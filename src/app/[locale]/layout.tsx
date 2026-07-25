import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HtmlLangSync } from "@/components/i18n/HtmlLangSync";

// Pre-render all locales at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Validates the [locale] segment, enables static rendering, and — crucially —
 * provides the client-side messages HERE (not in the root layout). The root
 * layout sits above [locale] and Next.js keeps it in the Router Cache across a
 * soft navigation, so a provider up there would freeze on the first locale and
 * client components (e.g. the header nav) would never re-translate on a switch.
 * This layout re-renders whenever the [locale] param changes, so `messages`
 * track the active locale; `key={locale}` remounts the subtree to guarantee
 * consumers pick up the new messages.
 */
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
  const messages = await getMessages();
  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <HtmlLangSync />
      {children}
    </NextIntlClientProvider>
  );
}
