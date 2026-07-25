"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon/Icon";
import type { IconName } from "@/components/ui/Icon/Icon";
import { social, contact } from "@/config/site";
import styles from "./CommandPalette.module.css";

type GroupId = "navigation" | "actions";

type CommandBase = {
  /** Stable id — also used as the DOM id suffix and the "copied" flag key. */
  id: string;
  group: GroupId;
  icon: IconName;
  /** Translation key (relative to `common.palette`) for the visible label. */
  labelKey: string;
  /** Extra, untranslated search terms (fr/en/nl synonyms) to widen matching. */
  keywords: string;
};

type CommandDef =
  | (CommandBase & { kind: "internal"; href: string })
  | (CommandBase & { kind: "external"; href: string })
  | (CommandBase & { kind: "action"; action: "copy-email" });

// Locale-agnostic routes (no next-intl pathnames mapping in this project), so
// the same href works across fr/nl/en — `router.push` (from "@/i18n/navigation")
// still applies the active locale prefix automatically.
const NAV_COMMANDS: CommandDef[] = [
  {
    id: "home",
    group: "navigation",
    icon: "target",
    labelKey: "commands.home",
    keywords: "accueil home root racine start",
    kind: "internal",
    href: "/",
  },
  {
    id: "cv",
    group: "navigation",
    icon: "file-check",
    labelKey: "commands.cv",
    keywords: "competences cv skills resume competentie vaardigheden",
    kind: "internal",
    href: "/cv",
  },
  {
    id: "nis2",
    group: "navigation",
    icon: "lock",
    labelKey: "commands.nis2",
    keywords: "conformite nis2 cyfun ccb compliance conformiteit",
    kind: "internal",
    href: "/conformite-nis2",
  },
  {
    id: "agence",
    group: "navigation",
    icon: "map-pin",
    labelKey: "commands.agence",
    keywords: "a propos about over ons agence praticien",
    kind: "internal",
    href: "/agence",
  },
  {
    id: "projets",
    group: "navigation",
    icon: "globe",
    labelKey: "commands.projets",
    keywords: "projets projects projecten portfolio",
    kind: "internal",
    href: "/projets",
  },
  {
    id: "maintenant",
    group: "navigation",
    icon: "arrow-right",
    labelKey: "commands.maintenant",
    keywords: "maintenant now nu en ce moment veille",
    kind: "internal",
    href: "/maintenant",
  },
  {
    id: "blog",
    group: "navigation",
    icon: "book",
    labelKey: "commands.blog",
    keywords: "journal blog articles artikels",
    kind: "internal",
    href: "/blog",
  },
  {
    id: "contact",
    group: "navigation",
    icon: "mail",
    labelKey: "commands.contact",
    keywords: "contact me contacter contacteer",
    kind: "internal",
    href: "/contact",
  },
];

const ACTION_COMMANDS: CommandDef[] = [
  {
    id: "github",
    group: "actions",
    icon: "github",
    labelKey: "commands.github",
    keywords: "github code source repo",
    kind: "external",
    href: social.github,
  },
  {
    id: "linkedin",
    group: "actions",
    icon: "linkedin",
    labelKey: "commands.linkedin",
    keywords: "linkedin profil profile",
    kind: "external",
    href: social.linkedin,
  },
  {
    id: "copyEmail",
    group: "actions",
    icon: "mail",
    labelKey: "commands.copyEmail",
    keywords: "email mail e-mail copier copy adresse address",
    kind: "action",
    action: "copy-email",
  },
];

const ALL_COMMANDS: CommandDef[] = [...NAV_COMMANDS, ...ACTION_COMMANDS];

const COPY_FLASH_MS = 1800;

/** Strip accents + lowercase, so "conformité" matches a "conformite" query. */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Global ⌘K / Ctrl+K command palette — a hacker/terminal-flavored "go to
 * anywhere" overlay. Mounted once near the root (see `[locale]/layout.tsx`)
 * so it works from any page. Renders its own floating trigger (bottom-left);
 * it does not touch the header.
 *
 * A11y: implemented as a combobox+listbox (APG "grouped listbox" pattern).
 * Focus never leaves the search input — arrow keys move a visual/ARIA
 * selection (`aria-activedescendant`) instead of moving DOM focus, which
 * keeps the focus trap trivial (Tab is simply swallowed while open). Focus
 * is restored to whatever triggered the palette when it closes.
 */
export function CommandPalette() {
  const t = useTranslations("common.palette");
  const router = useRouter();

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const listboxId = `${baseId}-list`;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const openRef = useRef(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl K");

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Detect macOS after mount only, so the SSR/first-hydration markup always
  // matches ("Ctrl K"); Mac users see it flip to "⌘K" a beat later.
  useEffect(() => {
    const platform =
      (navigator as Navigator & { userAgentData?: { platform?: string } })
        .userAgentData?.platform ??
      navigator.platform ??
      "";
    if (/mac/i.test(platform)) setShortcutLabel("⌘K");
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setCopiedId(null);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => setOpen(false), []);

  // Global shortcut — works from anywhere, even while focus sits in a form
  // field elsewhere on the page.
  useEffect(() => {
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      if (openRef.current) {
        setOpen(false);
      } else {
        openPalette();
      }
    };
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => window.removeEventListener("keydown", onGlobalKeyDown);
  }, [openPalette]);

  // Modal lifecycle while open: focus the input, lock body scroll, close on
  // Escape, and restore focus to whatever was focused before opening.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());

    const onWindowKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onWindowKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const copyEmail = useCallback(() => {
    void navigator.clipboard
      .writeText(contact.email)
      .then(() => {
        setCopiedId("copyEmail");
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopiedId(null), COPY_FLASH_MS);
      })
      .catch(() => {
        // Clipboard unavailable (insecure context / denied) — stay silent,
        // same stance as <CopyButton>; the palette remains usable.
      });
  }, []);

  const runCommand = useCallback(
    (cmd: CommandDef) => {
      if (cmd.kind === "internal") {
        closePalette();
        router.push(cmd.href);
        return;
      }
      if (cmd.kind === "external") {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
        closePalette();
        return;
      }
      // Copy actions keep the palette open so the "copied" confirmation is
      // actually visible; the visitor dismisses with Escape or a click.
      copyEmail();
    },
    [router, closePalette, copyEmail],
  );

  const groups = useMemo(() => {
    const q = normalize(query);
    const entries = ALL_COMMANDS.map((cmd) => ({ cmd, label: t(cmd.labelKey) }));
    const filtered = q
      ? entries.filter(({ cmd, label }) =>
          normalize(`${label} ${cmd.keywords}`).includes(q),
        )
      : entries;
    const buildGroup = (id: GroupId) => ({
      id,
      label: t(`groups.${id}`),
      items: filtered.filter(({ cmd }) => cmd.group === id),
    });
    return [buildGroup("navigation"), buildGroup("actions")].filter(
      (g) => g.items.length > 0,
    );
  }, [query, t]);

  const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const activeItem = flatItems[activeIndex] ?? null;
  const activeOptionId = activeItem ? `${listboxId}-${activeItem.cmd.id}` : undefined;

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(0);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (flatItems.length ? (i + 1) % flatItems.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        flatItems.length ? (i - 1 + flatItems.length) % flatItems.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeItem) runCommand(activeItem.cmd);
    } else if (e.key === "Tab") {
      // Only one focusable control lives in the dialog: keep focus glued to
      // it rather than letting Tab escape to the page behind the overlay.
      e.preventDefault();
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-label={t("trigger.ariaLabel")}
        title={t("trigger.ariaLabel")}
      >
        <Icon name="search" size={20} />
        <span className={styles.triggerKbd} aria-hidden="true">
          {shortcutLabel}
        </span>
      </button>

      {open ? (
        <div
          className={styles.overlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closePalette();
          }}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
          >
            <span id={labelId} className={styles.visuallyHidden}>
              {t("dialogAria")}
            </span>
            <span aria-live="polite" className={styles.visuallyHidden}>
              {copiedId ? t("copied") : ""}
            </span>

            <div className={styles.searchRow}>
              <Icon name="search" size={17} className={styles.searchIcon} />
              <span className={styles.prompt} aria-hidden="true">
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={onQueryChange}
                onKeyDown={onInputKeyDown}
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                className={styles.input}
                role="combobox"
                aria-expanded="true"
                aria-controls={listboxId}
                aria-activedescendant={activeOptionId}
                aria-autocomplete="list"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                type="button"
                className={styles.closeButton}
                onClick={closePalette}
                aria-label={t("closeAria")}
                title={t("closeAria")}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div
              id={listboxId}
              role="listbox"
              aria-label={t("dialogAria")}
              className={styles.list}
            >
              {flatItems.length === 0 ? (
                <p className={styles.empty}>{t("empty", { query })}</p>
              ) : (
                groups.map((group) => (
                  <div
                    key={group.id}
                    className={styles.group}
                    role="group"
                    aria-label={group.label}
                  >
                    <p className={styles.groupLabel} aria-hidden="true">
                      {group.label}
                    </p>
                    {group.items.map(({ cmd, label }) => {
                      const index = flatItems.findIndex((f) => f.cmd.id === cmd.id);
                      const active = index === activeIndex;
                      const copied = copiedId === cmd.id;
                      return (
                        <div
                          key={cmd.id}
                          id={`${listboxId}-${cmd.id}`}
                          role="option"
                          aria-selected={active}
                          className={`${styles.item} ${active ? styles.itemActive : ""}`}
                          onMouseDown={(e) => e.preventDefault()}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => runCommand(cmd)}
                        >
                          <Icon
                            name={cmd.icon}
                            size={16}
                            className={styles.itemIcon}
                          />
                          <span className={styles.itemLabel}>{label}</span>
                          {copied ? (
                            <span className={styles.itemMeta}>{t("copied")}</span>
                          ) : (
                            <span className={styles.itemMeta} aria-hidden="true">
                              {cmd.kind === "external" ? "↗" : active ? "↵" : ""}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className={styles.footer}>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> {t("hints.navigate")}
              </span>
              <span>
                <kbd>↵</kbd> {t("hints.select")}
              </span>
              <span>
                <kbd>Esc</kbd> {t("hints.close")}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CommandPalette;
