import React from 'react';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { GridIcon } from '@/components/icons/GridIcon';
import { ProcessIcon } from '@/components/icons/ProcessIcon';
import { ServicesIcon } from '@/components/icons/ServicesIcon';
import { MailIcon } from '@/components/icons/MailIcon';

export const homeSidebarItems = [
  { href: '#hero',     label: 'Introduction', icon: <HomeIcon aria-hidden="true" className="sidebar-link-icon" /> },
  { href: '#projects', label: 'Projets',      icon: <GridIcon aria-hidden="true" className="sidebar-link-icon" /> },
  { href: '#process',  label: 'Processus',    icon: <ProcessIcon aria-hidden="true" className="sidebar-link-icon" /> },
  { href: '#services', label: 'Services',     icon: <ServicesIcon aria-hidden="true" className="sidebar-link-icon" /> },
  { href: '#contact',  label: 'Contact',      icon: <MailIcon aria-hidden="true" className="sidebar-link-icon" /> },
];
