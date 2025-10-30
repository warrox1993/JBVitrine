import React from "react";
import { GridIcon } from "@/components/icons/GridIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { WorkflowIcon } from "@/components/icons/WorkflowIcon";
import { ProcessIcon } from "@/components/icons/ProcessIcon";
import { ServicesIcon } from "@/components/icons/ServicesIcon";
import { BookOpenIcon } from "@/components/icons/BookOpenIcon";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { MailIcon } from "@/components/icons/MailIcon";

export const servicesSidebarItems = [
  { href: "#services-hero", label: "Introduction", icon: <SparklesIcon aria-hidden="true" /> },
  { href: "#developpement-web", label: "Développement web", icon: <GridIcon aria-hidden="true" /> },
  { href: "#cybersecurite", label: "Cybersécurité", icon: <ShieldCheckIcon aria-hidden="true" /> },
  { href: "#automatisation-ia", label: "Automatisation & IA", icon: <WorkflowIcon aria-hidden="true" /> },
  { href: "#services-engagements", label: "Engagements", icon: <ServicesIcon aria-hidden="true" /> },
  { href: "#services-process", label: "Méthode", icon: <ProcessIcon aria-hidden="true" /> },
  { href: "#services-integrations", label: "Intégrations", icon: <ServicesIcon aria-hidden="true" /> },
  { href: "#services-packages", label: "Packs", icon: <GridIcon aria-hidden="true" /> },
  { href: "#services-deliverables", label: "Livrables", icon: <BookOpenIcon aria-hidden="true" /> },
  { href: "#services-tech", label: "Stack tech", icon: <SparklesIcon aria-hidden="true" /> },
  { href: "#services-cms", label: "CMS SMIDJAN", icon: <ServicesIcon aria-hidden="true" /> },
  { href: "#services-contact", label: "Contact", icon: <MailIcon aria-hidden="true" /> },
] as const;

