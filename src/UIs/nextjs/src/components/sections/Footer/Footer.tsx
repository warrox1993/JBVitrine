"use client";
import styles from "./Footer.module.css";
import FooterSocial from "./FooterSocial";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>YourBrand</div>
            <p className={styles.brandText}>Excellence digitale depuis 2015</p>
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
          <p className={styles.legal}>© 2025 YourBrand. Tous droits réservés.</p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}
