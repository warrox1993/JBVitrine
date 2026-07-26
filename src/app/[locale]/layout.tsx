import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { pickClientMessages } from "@/i18n/clientMessages";
import { HtmlLangSync } from "@/components/i18n/HtmlLangSync";
import { CommandPalette } from "@/components/layout/CommandPalette/CommandPalette";

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
  // Only the namespaces Client Components actually read are serialised into
  // the RSC payload. Handing the full message set to the provider inlined the
  // whole locale file into every document (144 KB of the homepage's 197 KB).
  // Server Components are unaffected: they use getTranslations() server-side.
  const messages = pickClientMessages(await getMessages());
  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <HtmlLangSync />
      {children}
      <CommandPalette />
    </NextIntlClientProvider>
  );
}
