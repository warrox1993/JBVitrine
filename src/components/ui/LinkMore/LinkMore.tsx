import React from "react";
import Link from "next/link";
import { Icon } from "../Icon/Icon";
import styles from "./LinkMore.module.css";

export interface LinkMoreProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

/** Inline call-to-action link with a hover-translating arrow. */
export function LinkMore({ href, children = "En savoir plus", className }: LinkMoreProps) {
  const cn = [styles.link, className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={cn}>
      {children}
      <Icon name="arrow-right" strokeWidth={2.3} />
    </Link>
  );
}

export default LinkMore;
