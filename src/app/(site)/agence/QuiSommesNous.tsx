import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./QuiSommesNous.module.css";

const VALUES = [
  {
    icon: "shield-check" as const,
    title: "Rigueur",
    text: "Une méthode structurée, adossée à des référentiels reconnus (NIS2, CyFun, OWASP, ISO/IEC 27001). Ce que nous affirmons, nous pouvons le démontrer.",
  },
  {
    icon: "map-pin" as const,
    title: "Proximité",
    text: "Basés à Liège, nous intervenons vite en Wallonie et restons joignables. Vous parlez à la personne qui fait le travail, pas à un centre d'appel.",
  },
  {
    icon: "check-circle" as const,
    title: "Franchise",
    text: "Nous disons ce qui compte, y compris ce qui dérange. Pas de vente de peur, pas de prestations inutiles : seulement ce qui réduit réellement votre risque.",
  },
  {
    icon: "target" as const,
    title: "Pragmatisme",
    text: "Nous priorisons les corrections à fort impact pour un budget maîtrisé. La meilleure sécurité est celle qui est réellement mise en œuvre.",
  },
];

/** "Qui sommes-nous" — agence positioning, mission and core values. */
export function QuiSommesNous() {
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionHeading
              eyebrow="Qui sommes-nous"
              title="Une agence cyber de proximité, au service du tissu économique wallon"
              lead="Nous accompagnons les PME, les indépendants, les professions réglementées et les collectivités locales dans la protection de leurs réseaux, de leurs données et de leur activité — et dans leur mise en conformité NIS2 / CyFun."
            />
            <p>
              Trop d&rsquo;entreprises pensent que la cybersécurité est réservée
              aux grands groupes. C&rsquo;est faux : ce sont précisément les
              structures de taille modeste qui sont visées, souvent parce
              qu&rsquo;elles sont moins bien défendues. Notre conviction est
              simple — une PME mérite le même niveau d&rsquo;exigence technique
              qu&rsquo;un grand compte, mais servi avec la clarté, la
              réactivité et le pragmatisme dont elle a réellement besoin.
            </p>
            <p>
              Concrètement, cela veut dire un périmètre d&rsquo;action complet
              — sécuriser, tester, développer, mettre en conformité — porté par
              un interlocuteur unique. Pas de sous-traitance en cascade, pas de
              rapport indéchiffrable : on identifie ce qui compte, on
              l&rsquo;explique, et on le corrige.
            </p>
            <div className={styles.missionCard}>
              <Icon name="target" strokeWidth={1.8} />
              <div>
                <h4>Notre mission</h4>
                <p>
                  Rendre la cybersécurité et la conformité{" "}
                  <b>accessibles, concrètes et durables</b> pour les
                  organisations wallonnes — sans jargon, sans surdimensionnement,
                  et sans jamais perdre de vue le budget d&rsquo;une PME.
                </p>
              </div>
            </div>
          </div>

          <div>
            {/* Abstract "interlocking values" illustration: rigueur / proximité / franchise / pragmatisme */}
            <div className={styles.valuesIllus} aria-hidden="true">
              <svg viewBox="0 0 460 190">
                <path
                  d="M70 68C112 34 142 102 179 68S250 34 287 68 358 102 395 68"
                  fill="none"
                  stroke="var(--line-2)"
                  strokeWidth="1.6"
                />
                <circle cx="70" cy="68" r="60" fill="rgba(11,31,58,.045)" stroke="var(--line-2)" strokeWidth="1.5" />
                <circle cx="179" cy="68" r="60" fill="rgba(11,31,58,.045)" stroke="var(--line-2)" strokeWidth="1.5" />
                <circle cx="287" cy="68" r="60" fill="rgba(11,31,58,.045)" stroke="var(--line-2)" strokeWidth="1.5" />
                <circle cx="395" cy="68" r="60" fill="rgba(11,31,58,.045)" stroke="var(--line-2)" strokeWidth="1.5" />
                <circle cx="233" cy="68" r="4.5" fill="var(--orange)" />
                <g transform="translate(59,57)" stroke="var(--navy-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="m9 12 2 2 4-4" />
                  <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3Z" />
                </g>
                <g transform="translate(168,57)" stroke="var(--navy-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </g>
                <g transform="translate(276,57)" stroke="var(--navy-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M12 2a10 10 0 1 0 10 10" />
                  <path d="M22 4 12 14.01l-3-3" />
                </g>
                <g transform="translate(384,57)" stroke="var(--navy-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.3-.5-.5-2.3 2.5-2.5Z" />
                </g>
                <text x="70" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">Rigueur</text>
                <text x="179" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">Proximité</text>
                <text x="287" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">Franchise</text>
                <text x="395" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">Pragmatisme</text>
              </svg>
            </div>

            <div className={styles.valList}>
              {VALUES.map((v) => (
                <div className={styles.valItem} key={v.title}>
                  <div className={styles.ic}>
                    <Icon name={v.icon} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Locality map illustration: Liège / Wallonie */}
            <div className={styles.localityCard}>
              <div className={styles.map}>
                <svg
                  viewBox="0 0 200 220"
                  role="img"
                  aria-label="Carte simplifiée de la Belgique, avec un repère sur Liège et la zone d'action en Wallonie"
                >
                  <path
                    d="M60 18 L120 10 L150 30 L168 55 L180 90 L165 125 L178 155 L150 190 L100 205 L60 195 L35 165 L45 120 L30 85 L45 50 Z"
                    fill="var(--bg-2)"
                    stroke="var(--navy-3)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35 112 C75 124 135 120 178 100"
                    fill="none"
                    stroke="var(--line-2)"
                    strokeWidth="1.4"
                    strokeDasharray="3 4"
                  />
                  <path
                    d="M45 120 L30 85 L45 50 L60 18 L120 10 L150 30 L155 40 C110 55 70 80 55 118 C52 145 60 172 100 205 L60 195 L35 165 Z"
                    fill="rgba(11,31,58,.05)"
                  />
                  <circle cx="95" cy="60" r="3" fill="var(--muted)" />
                  <text x="102" y="63" fontSize="9" fill="var(--muted)">Bruxelles</text>
                  <circle cx="130" cy="138" r="28" fill="none" stroke="var(--line-2)" strokeWidth="1.3" strokeDasharray="2 4" />
                  <g transform="translate(112,116) scale(1.5)">
                    <path
                      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                      fill="var(--orange)"
                      stroke="var(--orange-d)"
                      strokeWidth="1.2"
                    />
                    <circle cx="12" cy="10" r="3" fill="#fff" />
                  </g>
                  <text x="130" y="168" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--navy)">Liège</text>
                </svg>
              </div>
              <div>
                <h4>Une implantation locale, un rayon d&rsquo;action régional</h4>
                <p>
                  Basés à Liège, nous intervenons dans toute la Wallonie :
                  délais de déplacement courts, connaissance du tissu
                  économique local et disponibilité réelle en cas
                  d&rsquo;urgence.
                </p>
              </div>
            </div>

            {/* Coverage photo: local action, data hosted Belgium/EU */}
            <figure className={styles.coverageFigure}>
              <OptimizedImage
                src="/images/pages/agence/couverture-europe.jpg"
                alt="Vue nocturne de la Terre depuis l'espace, lumières des villes d'Europe — symbole de notre zone de couverture Belgique / Europe"
                width={1200}
                height={798}
                sizePreset="card"
                className={styles.coverageImg}
              />
              <figcaption className={styles.coverageCap}>
                Une intervention ancrée à Liège, des données{" "}
                <b>hébergées en Belgique et en Europe</b>.
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default QuiSommesNous;
