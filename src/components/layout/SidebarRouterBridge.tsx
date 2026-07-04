"use client";

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { aboutSidebarItems } from '@/components/features/about/aboutSidebar.items';
import { homeSidebarItems } from '@/components/features/home/homeSidebar.items';
import { cmsEcommerceSidebarItems } from '@/components/features/products/cmsEcommerceSidebar.items';
import { servicesSidebarItems } from '@/components/features/services/servicesSidebar.items';
import { blogSidebarItems, blogArticleSidebarItems } from '@/components/features/blog/blogSidebar.items';

export default function SidebarRouterBridge() {
  const pathname = usePathname();

  if (pathname === '/' || pathname?.startsWith('/#')) {
    // Home: strictly intra-page anchors
    return <Sidebar items={homeSidebarItems} />;
  }

  if (pathname?.startsWith('/about')) {
    return <Sidebar items={aboutSidebarItems} />;
  }

  if (pathname?.startsWith('/cms-ecommerce')) {
    return <Sidebar items={cmsEcommerceSidebarItems} />;
  }

  if (pathname?.startsWith('/services')) {
    return <Sidebar items={servicesSidebarItems} />;
  }

  if (pathname?.startsWith('/blog/')) {
    // Individual blog article
    return <Sidebar items={blogArticleSidebarItems} />;
  }

  if (pathname?.startsWith('/blog')) {
    // Blog list page
    return <Sidebar items={blogSidebarItems} />;
  }

  return null;
}
