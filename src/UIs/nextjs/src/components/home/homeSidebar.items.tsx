import React from 'react';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { GridIcon } from '@/components/icons/GridIcon';
import { ProcessIcon } from '@/components/icons/ProcessIcon';
import { ServicesIcon } from '@/components/icons/ServicesIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';

export const homeSidebarItems = [
  { href: '#hero',                 label: 'Introduction',        icon: <HomeIcon aria-hidden="true" /> },
  { href: '#premiers-partenaires', label: 'Devenir partenaire', icon: <UsersIcon aria-hidden="true" /> },
  { href: '#projects',             label: 'Projets',             icon: <GridIcon aria-hidden="true" /> },
  { href: '#process',              label: 'Processus',           icon: <ProcessIcon aria-hidden="true" /> },
  { href: '#services',             label: 'Services',            icon: <ServicesIcon aria-hidden="true" /> },
];
