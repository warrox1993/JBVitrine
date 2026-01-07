import React from 'react';
import { CompassIcon } from '@/components/icons/CompassIcon';
import { TargetIcon } from '@/components/icons/TargetIcon';
import { BookOpenIcon } from '@/components/icons/BookOpenIcon';
import { SparklesIcon } from '@/components/icons/SparklesIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
// Attribution des icônes revue pour cohérence sémantique et visuelle (sans duplication)
export const aboutSidebarItems = [
  { href: '#about-hero',   label: 'Introduction',    icon: <CompassIcon aria-hidden="true" /> },
  { href: '#mission',      label: 'Mission',         icon: <TargetIcon aria-hidden="true" /> },
  { href: '#values',       label: 'Valeurs',         icon: <SparklesIcon aria-hidden="true" /> },
  { href: '#story',        label: 'Notre histoire',  icon: <BookOpenIcon aria-hidden="true" /> },
  { href: '#team',         label: 'Équipe',          icon: <UsersIcon aria-hidden="true" /> },
  // Removed per AboutFix5: Proof/Testimonials, FAQ, Contact CTA from About sidebar
];
