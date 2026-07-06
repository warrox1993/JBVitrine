import Link from "next/link";
import styles from "./SiteFooter.module.css";

/**
 * Rich navy footer with a 3px orange top border.
 * Static server component. Ported from the approved corporate mockup.
 * NOTE: no VAT/BCE line is rendered: the real number must come from the
 * client before it can be shown (never ship the mockup placeholder).
 */
export default function SiteFooter() {
  return (
    <footer className={styles.site}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link className={styles.brand} href="/" aria-label="Smidjan, accueil">
              <svg
                className={styles.logo}
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <rect width="40" height="40" rx="9" fill="#12294a" />
                <path
                  d="M20 8l9 3.4v6.9c0 5.6-3.7 10.7-9 12.3-5.3-1.6-9-6.7-9-12.3v-6.9L20 8Z"
                  fill="none"
                  stroke="#ff6a00"
                  strokeWidth="2"
                />
                <path
                  d="M15.8 20.2l3 3 5.4-6"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.brandText}>
                Smidjan
                <small>Cybersécurité · Liège</small>
              </span>
            </Link>
            <p className={styles.blurb}>
              Cybersécurité et conformité NIS2 pour les PME de Wallonie. On
              sécurise, on teste, on développe, on met en règle, et on corrige
              ce qu&apos;on trouve.
            </p>
            <ul className={styles.contact}>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Liège, Belgique</span>
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <a href="tel:+32475205562">+32 475 20 55 62</a>
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:contact@smidjan.be">contact@smidjan.be</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Services</h2>
            <ul className={styles.links}>
              <li>
                <Link href="/services">Réseaux &amp; infrastructure</Link>
              </li>
              <li>
                <Link href="/services">Audits &amp; pentest</Link>
              </li>
              <li>
                <Link href="/services">Développement web sécurisé</Link>
              </li>
              <li>
                <Link href="/conformite-nis2">Conformité NIS2 / CyFun</Link>
              </li>
              <li>
                <Link href="/contact">Réponse à incident</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Agence</h2>
            <ul className={styles.links}>
              <li>
                <Link href="/agence">À propos</Link>
              </li>
              <li>
                <Link href="/approche">Notre approche</Link>
              </li>
              <li>
                <Link href="/blog">Ressources &amp; guides</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/contact">Diagnostic gratuit</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.heading}>Cadres &amp; certifications</h2>
            <div className={styles.certs}>
              <span>ISO/IEC 27001</span>
              <span>NIS2</span>
              <span>CyFun (CCB)</span>
              <span>OWASP</span>
            </div>
            <h2 className={`${styles.heading} ${styles.headingSpaced}`}>
              Langue
            </h2>
            <div className={styles.lang}>
              <a href="#" className={styles.langActive} aria-current="true">
                FR
              </a>
              <a href="#">NL</a>
              <a href="#">EN</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          {/* Placeholder: TVA/BCE number intentionally omitted until the
              real BCE number is provided by the client. */}
          <div>© 2026 Smidjan · Tous droits réservés.</div>
          <div className={styles.bottomLinks}>
            <Link href="/legal-notice">Mentions légales</Link>
            <Link href="/privacy">Politique de confidentialité</Link>
            <Link href="/terms">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
