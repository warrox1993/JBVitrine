"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { aboutSidebarItems } from '@/components/about/aboutSidebar.items';
import { homeSidebarItems } from '@/components/home/homeSidebar.items';
import { cmsEcommerceSidebarItems } from '@/components/products/cmsEcommerceSidebar.items';
import { servicesSidebarItems } from '@/components/services/servicesSidebar.items';

export default function SidebarRouterBridge() {
  const pathname = usePathname();

  if (pathname === '/' || pathname?.startsWith('/#')) {
    // Home: strictly intra-page anchors
    return <Sidebar items={homeSidebarItems} />;
  }

  if (pathname?.startsWith('/about')) {
    return <Sidebar items={aboutSidebarItems} />;
  }

  if (pathname?.startsWith('/produits/cms-ecommerce') || pathname?.startsWith('/cms-ecommerce')) {
    return <Sidebar items={cmsEcommerceSidebarItems} />;
  }

  if (pathname?.startsWith('/services')) {
    return <Sidebar items={servicesSidebarItems} />;
  }

  return null;
}
