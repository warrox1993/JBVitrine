"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { aboutSidebarItems } from '@/components/about/aboutSidebar.items';
import { homeSidebarItems } from '@/components/home/homeSidebar.items';

export default function SidebarRouterBridge() {
  const pathname = usePathname();

  if (pathname === '/' || pathname?.startsWith('/#')) {
    // Home: strictly intra-page anchors
    return <Sidebar items={homeSidebarItems} />;
  }

  if (pathname?.startsWith('/about')) {
    return <Sidebar items={aboutSidebarItems} />;
  }

  return null;
}
