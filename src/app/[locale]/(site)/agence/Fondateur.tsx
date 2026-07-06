import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./Fondateur.module.css";

const CREDENTIALS = [
  "Diplôme technique en informatique",
  "Ancien des télécommunications de l'Armée belge",
  "Expertise en sécurité offensive & défensive",
  "Référentiels NIS2 / CyFun (CCB), OWASP, ISO 27001",
];

const SKILL_TAGS = ["Réseaux", "Pentest", "Linux / Kali", "Cyberdéfense", "Conformité"];

const JOURNEY = [
  {
    key: false,
    label: "Le point de départ",
    title: "Une passion précoce de l'informatique",
    text: "Comprendre comment les machines marchent, et pourquoi elles cassent.",
    icon: (
      <>
        <path d="m13 2-3 7h4l-3 7" />
        <path d="M5 12a7 7 0 0 1 14 0" />
      </>
    ),
  },
  {
    key: false,
    label: "L'autodidaxie",
    title: "Linux, Kali et sécurité réseau",
    text: "En autodidacte, outils offensifs à l'appui. Une expertise acquise par la pratique.",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8l3 2-3 2M13 12h3" />
      </>
    ),
  },
  {
    key: false,
    label: "La formation",
    title: "Diplôme technique en informatique",
    text: "Les acquis validés : administration systèmes, réseaux, développement.",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
  },
  {
    key: true,
    label: "L'expérience opérationnelle",
    title: "Télécommunications de l'Armée belge",
    text: "Protéger des réseaux critiques en environnement exigeant. Cette rigueur, appliquée aujourd'hui aux entreprises.",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z" />
        <path d="M12 8v4M12 16h.01" />
      </>
    ),
  },
  {
    key: false,
    label: "Aujourd'hui",
    title: "Sécurité offensive & défensive",
    text: "Attaquer pour comprendre, défendre pour protéger. C'est Smidjan.",
    icon: (
      <>
        <path d="M11 3a8 8 0 1 0 8 8" />
        <path d="M21 3l-9 9M21 3v5M21 3h-5" />
        <path d="m6 12 2 2 4-4" />
      </>
    ),
  },
];

/** "Le fondateur" - Jean-Baptiste Dhondt profile + professional journey. */
export function Fondateur() {
  return (
    <section className={styles.founderSec}>
      <Container>
        <Reveal className={styles.secHead}>
          <Eyebrow className={styles.kickerMono}>Le fondateur</Eyebrow>
          <h2>
            Jean-Baptiste Dhondt :{" "}
            <span className="accent">un parcours peu commun</span> vers la
            cybersécurité
          </h2>
          <p>
            Curiosité, discipline militaire, pratique réelle de
            l&rsquo;attaque et de la défense.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {/* Profile card */}
          <Reveal as="aside" className={styles.profile}>
            <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />

            {/* Portrait placeholder illustration - to be replaced by a real photo */}
            <div
              className={styles.portrait}
              role="img"
              aria-label="Portrait du fondateur, emplacement réservé, photo à venir"
            >
              <svg viewBox="0 0 300 210" fill="none" aria-hidden="true">
                <circle cx="26" cy="26" r="1.4" fill="#fff" opacity=".14" />
                <circle cx="60" cy="14" r="1.4" fill="#fff" opacity=".14" />
                <circle cx="272" cy="188" r="1.4" fill="#fff" opacity=".14" />
                <circle cx="240" cy="200" r="1.4" fill="#fff" opacity=".14" />
                {/* geometric bust silhouette */}
                <circle cx="150" cy="78" r="42" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.38)" strokeWidth="1.6" />
                <path d="M66 214C66 156 102 128 150 128C198 128 234 156 234 214" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.34)" strokeWidth="1.6" />
                {/* camera / placeholder glyph, subtle */}
                <g opacity=".55" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="132" y="150" width="36" height="26" rx="4" />
                  <path d="M142 150l3-6h10l3 6" />
                  <circle cx="150" cy="163" r="7" />
                </g>
                {/* camera-frame crop ticks */}
                <g stroke="var(--orange-on-dark)" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 30V14h16" />
                  <path d="M286 30V14h-16" />
                  <path d="M14 196v16h16" />
                  <path d="M286 196v16h-16" />
                </g>
              </svg>
              <span className={styles.portraitTag}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m21 15-5-5L5 21" />
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                </svg>
                Photo à venir
              </span>
            </div>

            <div className={styles.top}>
              <div>
                <h3>Jean-Baptiste Dhondt</h3>
                <div className={styles.role}>Fondateur · Expert en cybersécurité</div>
              </div>
            </div>
            <blockquote className={styles.quote}>
              « La sécurité d&rsquo;une PME ne se règle pas avec un rapport
              qu&rsquo;on range dans un tiroir. Elle se règle en corrigeant,
              une à une, les failles qui comptent. »
            </blockquote>
            <ul className={styles.creds}>
              {CREDENTIALS.map((c) => (
                <li key={c}>
                  <Icon name="check" strokeWidth={2.2} />
                  {c}
                </li>
              ))}
            </ul>
            <div className={styles.foot}>
              {SKILL_TAGS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Reveal>

          {/* Narrative + journey */}
          <Reveal as="div" className={styles.narrative} variant="right">
            <Eyebrow className={styles.kickerMono}>Le parcours</Eyebrow>
            <h3>
              De la passion de l&rsquo;informatique à la{" "}
              <span className="accent">défense d&rsquo;entreprises</span>
            </h3>
            <p className={styles.intro}>
              Pas un consultant standard : un praticien. Il a compris les
              systèmes de l&rsquo;intérieur avant d&rsquo;en faire un métier.
            </p>

            {/* Real photo: server infrastructure - technical expertise */}
            <figure className={styles.infraFigure}>
              <OptimizedImage
                src="/images/pages/agence/infrastructure.jpg"
                alt="Baies de serveurs et câblage réseau dans une salle informatique, illustrant l'expertise en sécurisation d'infrastructures"
                width={1200}
                height={673}
                sizePreset="card"
                className={styles.infraImg}
              />
              <figcaption className={styles.infraCap}>
                Réseaux, serveurs, durcissement d&rsquo;infrastructure : le
                terrain de jeu quotidien.
              </figcaption>
            </figure>

            <ol className={styles.journey}>
              {JOURNEY.map((step) => (
                <li key={step.title} className={step.key ? styles.key : undefined}>
                  <div className={styles.dot}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {step.icon}
                    </svg>
                  </div>
                  <div className={styles.yr}>{step.label}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Fondateur;
