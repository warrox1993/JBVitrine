import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Icon } from "@/components/ui/Icon/Icon";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import styles from "./QuiSommesNous.module.css";

const VALUES = [
  { icon: "shield-check" as const, key: "Rigueur" },
  { icon: "map-pin" as const, key: "Proximite" },
  { icon: "check-circle" as const, key: "Franchise" },
  { icon: "target" as const, key: "Pragmatisme" },
];

/** "Qui sommes-nous" - agence positioning, mission and core values. */
export async function QuiSommesNous() {
  const t = await getTranslations("agence");
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.grid}>
          <Reveal as="div" className={styles.copy}>
            <SectionHeading
              eyebrow={t("about.eyebrow")}
              title={t.rich("about.title", {
                accent: (c) => <span className="accent">{c}</span>,
              })}
              lead={t("about.lead")}
            />
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <div className={styles.missionCard}>
              <Icon name="target" strokeWidth={1.8} />
              <div>
                <h4>{t("about.missionTitle")}</h4>
                <p>
                  {t.rich("about.missionText", {
                    b: (c) => <b>{c}</b>,
                  })}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" variant="right">
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
                <text x="70" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">{t("about.valueRigueurTitle")}</text>
                <text x="179" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">{t("about.valueProximiteTitle")}</text>
                <text x="287" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">{t("about.valueFranchiseTitle")}</text>
                <text x="395" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--navy)">{t("about.valuePragmatismeTitle")}</text>
              </svg>
            </div>

            <Reveal stagger className={styles.valList}>
              {VALUES.map((v) => (
                <div className={styles.valItem} key={v.key}>
                  <div className={styles.ic}>
                    <Icon name={v.icon} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4>{t(`about.value${v.key}Title`)}</h4>
                    <p>{t(`about.value${v.key}Text`)}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            {/* Locality map illustration: Liège / Wallonie */}
            <div className={styles.localityCard}>
              <div className={styles.map}>
                <svg
                  viewBox="0 0 200 220"
                  role="img"
                  aria-label={t("about.mapAriaLabel")}
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
                  <text x="102" y="63" fontSize="9" fill="var(--muted)">{t("about.mapBruxelles")}</text>
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
                  <text x="130" y="168" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--navy)">{t("about.mapLiege")}</text>
                </svg>
              </div>
              <div>
                <h4>{t("about.localityTitle")}</h4>
                <p>{t("about.localityText")}</p>
              </div>
            </div>

          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default QuiSommesNous;
