import React from "react";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { GridIcon } from "@/components/icons/GridIcon";
import { ServicesIcon } from "@/components/icons/ServicesIcon";
import { BookOpenIcon } from "@/components/icons/BookOpenIcon";
import { HelpCircleIcon } from "@/components/icons/HelpCircleIcon";
import { MailIcon } from "@/components/icons/MailIcon";

export const cmsEcommerceSidebarItems = [
  { href: "#cms-hero", label: "Vue d’ensemble", icon: <SparklesIcon aria-hidden="true" /> },
  { href: "#cms-proofs", label: "Preuves rapides", icon: <ShieldCheckIcon aria-hidden="true" /> },
  { href: "#cms-benefits", label: "Bénéfices", icon: <TargetIcon aria-hidden="true" /> },
  { href: "#cms-modules", label: "Modules", icon: <WorkflowIcon aria-hidden="true" /> },
  { href: "#plans", label: "Plans", icon: <GridIcon aria-hidden="true" /> },
  { href: "#cms-integrations", label: "Intégrations", icon: <ServicesIcon aria-hidden="true" /> },
  { href: "#cms-showcase", label: "Captures", icon: <BookOpenIcon aria-hidden="true" /> },
  { href: "#cms-case", label: "Cas client", icon: <ShieldCheckIcon aria-hidden="true" /> },
  { href: "#cms-faq", label: "FAQ", icon: <HelpCircleIcon aria-hidden="true" /> },
  { href: "#cms-cta", label: "Contact", icon: <MailIcon aria-hidden="true" /> },
] as const;

