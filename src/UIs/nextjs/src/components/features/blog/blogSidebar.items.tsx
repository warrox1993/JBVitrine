import React from "react";
import { BookOpenIcon } from "@/components/icons/BookOpenIcon";
import { GridIcon } from "@/components/icons/GridIcon";

export const blogSidebarItems = [
  { href: "/blog#blog-hero", label: "Blog", icon: <BookOpenIcon aria-hidden="true" /> },
  { href: "/blog#blog-articles", label: "Articles", icon: <GridIcon aria-hidden="true" /> },
] as const;

export const blogArticleSidebarItems = [
  { href: "/blog", label: "← Retour au blog", icon: <BookOpenIcon aria-hidden="true" /> },
] as const;
