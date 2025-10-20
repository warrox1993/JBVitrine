"use client";
import Image from "next/image";
import styles from "./Footer.module.css";
import FooterSocial from "./FooterSocial";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.logoCell}>
            <Image
              src="/images/logofooter/LogoFoot.webp"
              alt="Smidjan footer logo"
              width={300}
              height={300}
              unoptimized
              className={styles.logoFooter}
            />
          </div>
          <div>
            <h4 className={styles.heading}>Navigation</h4>
            <ul className={styles.nav}>
              {["Projets", "Services", "Process", "À propos"].map((link) => (
                <li key={link} style={{ marginBottom: 'var(--space-2)' }}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
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
        </div>
        <div className={styles.bottom}>
          <p className={styles.legal}>© 2025 SMIDJAN. Tous droits réservés.</p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}
