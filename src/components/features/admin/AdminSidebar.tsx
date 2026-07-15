"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "./AdminSidebar.module.css";

const MENU_ITEMS = [
  { 
    label: "Tableau de bord", 
    href: "/admin", 
    icon: LayoutDashboard,
    roles: ["admin", "sales", "viewer"]
  },
  { 
    label: "Leads & Devis", 
    href: "/admin/leads", 
    icon: Users,
    roles: ["admin", "sales"]
  },
  { 
    label: "Articles Blog", 
    href: "/admin/blog", 
    icon: FileText,
    roles: ["admin"]
  }
];

interface AdminSidebarProps {
  userRole?: string;
}

export function AdminSidebar({ userRole = "viewer" }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <ShieldCheck size={24} color="#ff6a00" />
        </div>
        <span className={styles.logoText}>Smidjan Admin</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navGroup}>
          <p className={styles.navGroupTitle}>Principal</p>
          <ul className={styles.navList}>
            {MENU_ITEMS.map((item) => {
              if (item.roles && !item.roles.includes(userRole)) return null;
              
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.navGroup}>
          <p className={styles.navGroupTitle}>Système</p>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink} target="_blank">
                <ExternalLink size={18} />
                <span>Voir le site</span>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className={styles.logoutButton}>
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userBadge}>
          <div className={styles.userAvatar}>
            {userRole.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Utilisateur</p>
            <p className={styles.userRole}>{userRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
