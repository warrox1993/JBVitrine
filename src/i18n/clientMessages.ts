import type { AbstractIntlMessages } from "next-intl";

/**
 * Namespaces that Client Components actually read through
 * `NextIntlClientProvider`.
 *
 * WHY THIS EXISTS (performance):
 * `getMessages()` returns the whole locale file (~82 KB of JSON for `fr`).
 * Handing that straight to `NextIntlClientProvider` serialises every single
 * string into the RSC payload of EVERY page — measured at 144 KB of inline
 * `self.__next_f.push(...)` script in a 197 KB homepage document, i.e. 73% of
 * the document. The browser has to download, parse and execute all of it on
 * the main thread before hydration can start; on a throttled mobile CPU that
 * showed up as a single ~625 ms long task attributed to the document.
 *
 * Server Components are unaffected: they use `getTranslations()` from
 * `next-intl/server`, which reads the full message set on the server and never
 * ships it to the browser. Only the namespaces listed here need to travel.
 *
 * HOW TO MAINTAIN: if you add `useTranslations("x")` (the CLIENT hook, from
 * "next-intl") to a component that is — directly or transitively — inside a
 * `"use client"` boundary, add `"x"` here. Otherwise next-intl throws
 * MISSING_MESSAGE at runtime for that namespace.
 *
 * Current consumers:
 *   common            -> SiteHeader, InternshipRibbon, CommandPalette (common.palette)
 *   contact           -> ContactForm
 *   blog              -> BlogFilter, FeaturedArticle, ArticleCard
 *   checker           -> NIS2Checker
 *   home.securityScan -> SecurityScan
 */
export const CLIENT_NAMESPACES = [
  "common",
  "contact",
  "blog",
  "checker",
  "home.securityScan",
] as const;

type MessageTree = Record<string, unknown>;

function getPath(source: MessageTree, path: string[]): unknown {
  return path.reduce<unknown>(
    (node, key) =>
      node && typeof node === "object"
        ? (node as MessageTree)[key]
        : undefined,
    source,
  );
}

function setPath(target: MessageTree, path: string[], value: unknown): void {
  let node = target;
  for (const key of path.slice(0, -1)) {
    if (typeof node[key] !== "object" || node[key] === null) node[key] = {};
    node = node[key] as MessageTree;
  }
  node[path[path.length - 1]] = value;
}

/**
 * Narrow a full message set down to the namespaces Client Components need.
 * Dotted entries ("home.securityScan") keep their nesting so `useTranslations`
 * resolves the same key paths it would against the complete file.
 */
export function pickClientMessages(
  messages: AbstractIntlMessages,
): AbstractIntlMessages {
  const source = messages as MessageTree;
  const picked: MessageTree = {};

  for (const namespace of CLIENT_NAMESPACES) {
    const path = namespace.split(".");
    const value = getPath(source, path);
    if (value !== undefined) setPath(picked, path, value);
  }

  return picked as AbstractIntlMessages;
}
