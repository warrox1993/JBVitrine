'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight, Home } from 'lucide-react';
import cls from './Breadcrumb.module.css';

// Translation function shape (next-intl): resolves a message key to a string.
type Translator = (key: string) => string;

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Configuration des labels personnalisés pour les routes.
// Chaque chemin pointe vers une clé de traduction (namespace "common").
const ROUTE_LABEL_KEYS: Record<string, string> = {
  '/': 'breadcrumb.home',
  '/about': 'breadcrumb.routes.about',
  '/services': 'breadcrumb.routes.services',
  '/conformite-nis2': 'breadcrumb.routes.conformite',
  '/approche': 'breadcrumb.routes.approche',
  '/agence': 'breadcrumb.routes.agence',
  '/portfolio': 'breadcrumb.routes.portfolio',
  '/blog': 'breadcrumb.routes.journal',
  '/journal': 'breadcrumb.routes.journal',
  '/contact': 'breadcrumb.routes.contact',
  '/cms-ecommerce': 'breadcrumb.routes.cmsEcommerce',
  '/devis': 'breadcrumb.routes.devis',
  '/mentions-legales': 'breadcrumb.routes.mentionsLegales',
  '/politique-confidentialite': 'breadcrumb.routes.confidentialite',
  '/confidentialite': 'breadcrumb.routes.confidentialite',
  '/cgv': 'breadcrumb.routes.cgv',
  '/admin': 'breadcrumb.routes.admin',
  '/admin/blog': 'breadcrumb.routes.adminBlog',
  '/admin/blog/new': 'breadcrumb.routes.adminArticleNew',
  '/admin/leads': 'breadcrumb.routes.adminLeads',
  '/admin/articles/new': 'breadcrumb.routes.adminArticleNew',
  '/admin/login': 'breadcrumb.routes.adminLogin',
  '/privacy': 'breadcrumb.routes.confidentialite',
  '/terms': 'breadcrumb.routes.cgv',
  '/legal-notice': 'breadcrumb.routes.mentionsLegales',
};

/**
 * Breadcrumb Component
 *
 * Affiche un fil d'Ariane pour la navigation et le SEO
 * Génère automatiquement les breadcrumbs basés sur l'URL si items n'est pas fourni
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const t = useTranslations('common');
  const pathname = usePathname();

  // Générer les breadcrumbs automatiquement si non fournis
  const breadcrumbItems = items || generateBreadcrumbs(pathname, t);

  // Ne pas afficher sur la page d'accueil
  if (pathname === '/') {
    return null;
  }

  return (
    <nav
      aria-label={t('breadcrumb.aria')}
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
            <span itemProp="name">{t('breadcrumb.home')}</span>
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
function generateBreadcrumbs(pathname: string, t: Translator): BreadcrumbItem[] {
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

    // Obtenir le label depuis la config (traduit) ou générer depuis le path
    const labelKey = ROUTE_LABEL_KEYS[currentPath];
    let label = labelKey ? t(labelKey) : '';

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
  const t = useTranslations('common');
  const pathname = usePathname();
  return customItems || generateBreadcrumbs(pathname, t);
}
