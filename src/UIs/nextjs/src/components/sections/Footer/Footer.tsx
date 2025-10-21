"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import FooterSocial from "./FooterSocial";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.logoCell}>
            <Image
              src="/images/logofooter/LogoFooter-removebg-preview.webp"
              alt="Smidjan footer logo"
              width={300}
              height={300}
              unoptimized
              className={styles.logoFooter}
            />
          </div>
        <div>
          <h4 className={styles.heading}>Navigation</h4>
          <nav aria-label="Liens de pied de page">
            <ul className={styles.nav}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link href="/#projects">Projets</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link href="/#process">Processus</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link href="/#services">Services</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link href="/about">À propos</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h4 className={styles.heading}>Légal</h4>
          <ul className={styles.nav}>
            {["Mentions légales", "Confidentialité", "CGV"].map((link) => (
              <li key={link} style={{ marginBottom: 'var(--space-2)' }}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.nav}>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <a
                href="mailto:jeanbaptiste.dhondt1@gmail.com"
                aria-label="Envoyer un e-mail à Jean-Baptiste Dhondt"
              >
                jeanbaptiste.dhondt1@gmail.com
              </a>
            </li>
            <li style={{ marginBottom: 'var(--space-2)' }}>
              <a
                href="tel:+32475205562"
                aria-label="Appeler le numéro de téléphone"
              >
                +32 475205562
              </a>
            </li>
            <li className={styles.legal}>
              Réponse sous 24h — 98% de satisfaction
            </li>
          </ul>
        </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.legal}>© 2025 SMIDJAN. Tous droits réservés.</p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}


