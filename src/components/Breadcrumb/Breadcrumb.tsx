'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import cls from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Configuration des labels personnalisés pour les routes
const ROUTE_LABELS: Record<string, string> = {
  '/': 'Accueil',
  '/about': 'À Propos',
  '/services': 'Services',
  '/conformite-nis2': 'Conformité NIS2',
  '/approche': 'Approche',
  '/agence': 'Agence',
  '/portfolio': 'Portfolio',
  '/blog': 'Journal',
  '/journal': 'Journal',
  '/contact': 'Contact',
  '/cms-ecommerce': 'CMS E-commerce',
  '/devis': 'Demande de Devis',
  '/mentions-legales': 'Mentions Légales',
  '/politique-confidentialite': 'Politique de Confidentialité',
  '/confidentialite': 'Politique de Confidentialité',
  '/cgv': 'Conditions Générales de Vente',
  '/admin': 'Administration',
  '/admin/blog': 'Gestion Blog',
  '/admin/blog/new': 'Nouvel Article',
  '/admin/leads': 'Gestion Leads',
  '/admin/articles/new': 'Nouvel Article',
  '/admin/login': 'Connexion Admin',
  '/privacy': 'Politique de Confidentialité',
  '/terms': 'Conditions Générales de Vente',
  '/legal-notice': 'Mentions Légales',
};

/**
 * Breadcrumb Component
 *
 * Affiche un fil d'Ariane pour la navigation et le SEO
 * Génère automatiquement les breadcrumbs basés sur l'URL si items n'est pas fourni
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Générer les breadcrumbs automatiquement si non fournis
  const breadcrumbItems = items || generateBreadcrumbs(pathname);

  // Ne pas afficher sur la page d'accueil
  if (pathname === '/') {
    return null;
  }

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`${cls.breadcrumb} ${className || ''}`}
    >
      <ol className={cls.breadcrumbList} itemScope itemType="https://schema.org/BreadcrumbList">
        {/* Accueil (toujours présent) */}
        <li
          className={cls.breadcrumbItem}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link href="/" className={cls.breadcrumbLink} itemProp="item">
            <Home size={16} className={cls.homeIcon} />
            <span itemProp="name">Accueil</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {/* Items du breadcrumb */}
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const position = index + 2; // +2 car Accueil est position 1

          return (
            <React.Fragment key={item.href}>
              <li className={cls.breadcrumbSeparator} aria-hidden="true">
                <ChevronRight size={16} />
              </li>
              <li
                className={`${cls.breadcrumbItem} ${isLast ? cls.breadcrumbItemActive : ''}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span className={cls.breadcrumbCurrent} aria-current="page" itemProp="name">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={cls.breadcrumbLink} itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={position.toString()} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Génère automatiquement les breadcrumbs basés sur le pathname
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Nettoyer le pathname
  const paths = pathname.split('/').filter(Boolean);

  // Si c'est la page d'accueil, retourner vide
  if (paths.length === 0) {
    return [];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  paths.forEach((path, index) => {
    currentPath += `/${path}`;

    // Obtenir le label depuis la config ou générer depuis le path
    let label = ROUTE_LABELS[currentPath];

    if (!label) {
      // Formatter le path en label lisible
      label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Gérer les slugs d'articles de blog
      if (paths[0] === 'blog' && index > 0) {
        label = decodeURIComponent(path)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}

/**
 * Hook pour générer les breadcrumbs personnalisés
 */
export function useBreadcrumbs(customItems?: BreadcrumbItem[]): BreadcrumbItem[] {
  const pathname = usePathname();
  return customItems || generateBreadcrumbs(pathname);
}
