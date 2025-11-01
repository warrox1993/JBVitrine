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
              <li className={styles.navItem}>
                <Link href="/#services">Services</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/about">À propos</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h4 className={styles.heading}>Légal</h4>
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <Link href="/legal-notice">Mentions légales</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/privacy">Confidentialité</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/terms">CGV</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <a
                href="mailto:jeanbaptiste.dhondt1@gmail.com"
                aria-label="Envoyer un e-mail à Jean-Baptiste Dhondt"
              >
                jeanbaptiste.dhondt1@gmail.com
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="tel:+32475205562"
                aria-label="Appeler le numéro de téléphone"
              >
                +32 475205562
              </a>
            </li>
            <li className={styles.legal}>
              Réponse sous 24h
            </li>
          </ul>
        </div>
        </div>
        <div className={styles.tagline}>
          <p>Smidjan – digital craft. Forged in Liège, built for the world.</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.legal}>© 2025 SMIDJAN. Tous droits réservés.</p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}

