"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/**
 * Keeps <html lang> in sync with the active locale on the CLIENT. The <html>
 * element lives in the root layout, which Next.js caches across soft
 * navigations and never re-renders — so on a client-side language switch its
 * `lang` attribute would otherwise stay frozen on the first locale. This runs
 * under the [locale] provider, so it re-reads the locale on every switch.
 */
export function HtmlLangSync() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}

export default HtmlLangSync;
