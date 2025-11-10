/**
 * AdminMessagePage - Composant DRY pour pages de message admin
 * Utilisé par settings, auditlogs et autres pages admin simples
 */

import Link from 'next/link';
import styles from './AdminMessagePage.module.css';

export type AdminMessagePageProps = {
  title: string;
  message: string;
  actionText?: string;
  actionHref?: string;
  children?: React.ReactNode;
};

export function AdminMessagePage({
  title,
  message,
  actionText = 'Retour au tableau de bord',
  actionHref = '/admin',
  children,
}: AdminMessagePageProps) {
  return (
    <section className={styles.adminMessage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>

        {children}

        <Link href={actionHref} className={styles.link}>
          {actionText}
        </Link>
      </div>
    </section>
  );
}
