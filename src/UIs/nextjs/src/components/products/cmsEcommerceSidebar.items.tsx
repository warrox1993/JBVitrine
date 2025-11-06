import React from "react";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { BookOpenIcon } from "@/components/icons/BookOpenIcon";
import { HelpCircleIcon } from "@/components/icons/HelpCircleIcon";
import { MailIcon } from "@/components/icons/MailIcon";

export const cmsEcommerceSidebarItems = [
  { href: "#cms-hero", label: "Vue d'ensemble", icon: <SparklesIcon aria-hidden="true" /> },
  { href: "#cms-proofs", label: "Modularité", icon: <TargetIcon aria-hidden="true" /> },
  { href: "#cms-fonctionnalites-natives", label: "Fonctionnalités", icon: <WorkflowIcon aria-hidden="true" /> },
  { href: "#cms-showcase", label: "Design", icon: <BookOpenIcon aria-hidden="true" /> },
  { href: "#evolutivite", label: "Évolutivité", icon: <ShieldCheckIcon aria-hidden="true" /> },
  { href: "#cms-faq", label: "FAQ", icon: <HelpCircleIcon aria-hidden="true" /> },
  { href: "#cms-cta", label: "Contact", icon: <MailIcon aria-hidden="true" /> },
] as const;
