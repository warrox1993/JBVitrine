import React from "react";
import { SITE_CONFIG } from "@/lib/constants";
import styles from "./FooterSocial.module.css";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 3.8-2.2 4.1 0 4.8 2.7 4.8 6.2V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24h-4V8z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.88 3.16 9.01 7.55 10.47.55.1.75-.24.75-.54 0-.27-.01-1.16-.02-2.1-3.07.67-3.72-1.3-3.72-1.3-.5-1.26-1.22-1.6-1.22-1.6-1-.68.08-.66.08-.66 1.1.07 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.72.38-1.2.69-1.48-2.45-.28-5.02-1.23-5.02-5.46 0-1.2.43-2.18 1.14-2.95-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.04 1.13A10.6 10.6 0 0 1 12 6.8c.94.01 1.88.13 2.76.38 2.1-1.43 3.03-1.13 3.03-1.13.6 1.53.22 2.66.11 2.94.71.77 1.14 1.75 1.14 2.95 0 4.24-2.58 5.17-5.04 5.44.39.33.74.98.74 1.98 0 1.43-.01 2.58-.01 2.93 0 .3.2.65.76.54A10.71 10.71 0 0 0 23.1 11.6C23.1 5.32 18.27.5 12 .5z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V11H8v3h2v6h3v-6h2.1l.4-3H13v-1.3c0-.4.1-.7.6-.7Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function FooterSocial() {
  const socials = [
    { name: 'Facebook', href: SITE_CONFIG.social.facebook, Icon: FacebookIcon },
    { name: 'Instagram', href: SITE_CONFIG.social.instagram, Icon: InstagramIcon },
    { name: 'LinkedIn', href: SITE_CONFIG.social.linkedin, Icon: LinkedInIcon },
    { name: 'GitHub', href: SITE_CONFIG.social.github, Icon: GithubIcon },
  ];
  return (
    <div className={styles.socialContainer}>
      {socials.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={styles.socialLink}
        >
          <Icon width={18} height={18} />
        </a>
      ))}
    </div>
  );
}
