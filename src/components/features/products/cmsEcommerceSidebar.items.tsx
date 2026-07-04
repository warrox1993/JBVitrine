import React from "react";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { HelpCircleIcon } from "@/components/icons/HelpCircleIcon";
import { MailIcon } from "@/components/icons/MailIcon";

export const cmsEcommerceSidebarItems = [
  { href: "#cms-hero", label: "Vue d'ensemble", icon: <SparklesIcon aria-hidden="true" /> },
  { href: "#partnership", label: "Partenariat", icon: <TargetIcon aria-hidden="true" /> },
  { href: "#services", label: "Services", icon: <WorkflowIcon aria-hidden="true" /> },
  { href: "#cases", label: "Cas de succès", icon: <CheckIcon aria-hidden="true" /> },
  { href: "#technical", label: "Avantages", icon: <ShieldCheckIcon aria-hidden="true" /> },
  { href: "#faq", label: "FAQ", icon: <HelpCircleIcon aria-hidden="true" /> },
  { href: "#final-cta", label: "Contact", icon: <MailIcon aria-hidden="true" /> },
] as const;
