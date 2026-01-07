"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

type NavItem = {
  readonly href: string;
  readonly label: string;
  readonly aliases?: readonly string[];
  readonly requiresAuth?: boolean;
  readonly hideWhenAuthenticated?: boolean;
};

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/home", label: "Home", aliases: ["/"] },
  { href: "/settings", label: "Settings" },
  { href: "/files", label: "Files" },
  { href: "/products", label: "Products" },
  { href: "/users", label: "Users" },
  { href: "/auditlogs", label: "Audit Logs" },
  { href: "/login", label: "Login", hideWhenAuthenticated: true },
  { href: "/logout", label: "Logout", requiresAuth: true },
];

const BRAND_TITLE = "ClassifiedAds.NextJs";
const NEXT_VERSION = "15.1.4";

const brandLabel = `${BRAND_TITLE} ${NEXT_VERSION}`;

const combineClassNames = (...classNames: Array<string | undefined>): string =>
  classNames.filter(Boolean).join(" ");

/** Primary navigation bar for the application shell. */
const Nav = () => {
  const pathname = usePathname() ?? "/";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    try {
      return window.localStorage.getItem("access_token") !== null;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "access_token") {
        setIsAuthenticated(event.newValue !== null);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isActive = (item: NavItem): boolean => {
    if (pathname === item.href) {
      return true;
    }

    if (item.aliases?.some((aliasPath) => pathname === aliasPath)) {
      return true;
    }

    return pathname.startsWith(`${item.href}/`);
  };

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }

    if (item.hideWhenAuthenticated && isAuthenticated) {
      return false;
    }

    return true;
  });

  return (
    <nav className={styles["nav-root"]} aria-label="Primary navigation">
      <Link className={styles["nav-brand"]} href="/">
        {brandLabel}
      </Link>
      <ul className={styles["nav-menu"]}>
        {visibleItems.map((item) => {
          const active = isActive(item);
          const linkClassName = combineClassNames(
            styles["nav-link"],
            active ? styles["nav-link--active"] : undefined
          );

          return (
            <li key={item.href}>
              <Link
                className={linkClassName}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
