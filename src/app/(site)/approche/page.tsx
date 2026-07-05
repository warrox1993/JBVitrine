import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import OptimizedImage from "@/components/ui/OptimizedImage/OptimizedImage";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { CTABox } from "@/components/shared/CTABox/CTABox";
import { ProcessSteps } from "@/components/shared/ProcessSteps/ProcessSteps";
import { StatsBand } from "@/components/shared/StatsBand/StatsBand";
import { TrustStrip } from "@/components/shared/TrustStrip/TrustStrip";

import { AiIllustration, ProofVisual, RoadmapIllustration } from "./illustrations";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Notre méthode — Approche cybersécurité Smidjan | Des preuves, pas des promesses",
  description:
    "Diagnostic mesuré, priorisation par risque, remédiation réelle, supervision continue : découvrez la méthode de Smidjan, cabinet de cybersécurité à Liège, et pourquoi une PME wallonne a intérêt à travailler avec une structure à taille humaine.",
  keywords: [
    "méthode cybersécurité PME",
    "diagnostic cybersécurité Liège",
    "audit sécurité OWASP",
    "conformité NIS2 CyFun",
    "pentest Wallonie",
    "cabinet cybersécurité Liège",
    "remédiation sécurité informatique",
  ],
  alternates: {
    canonical: "/approche",
    languages: {
      "fr-BE": "/approche",
      fr: "/approche",
    },
  },
  openGraph: {
    title: "Notre méthode — Approche cybersécurité Smidjan",
    description:
      "Des preuves, pas des promesses : diagnostic mesuré, priorisation, remédiation réelle et supervision continue. La méthode Smidjan, cybersécurité pour PME à Liège.",
    url: "https://smidjan.be/approche",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Smidjan - Notre méthode de cybersécurité",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notre méthode — Approche cybersécurité Smidjan",
    description:
      "Diagnostic mesuré, priorisation, remédiation réelle, supervision continue. Des preuves, pas des promesses.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

interface MethodStep {
  kick: string;
  title: string;
  text: ReactNode;
  deliverables: string[];
}

const methodSteps: MethodStep[] = [
  {
    kick: "On mesure",
    title: "Diagnostic",
    text: "On mesure votre exposition réelle — infrastructure, réseaux, applications, pratiques. Un état des lieux chiffré, pas une opinion.",
    deliverables: [
      "Rapport de diagnostic clair, avec score de départ.",
      "Cartographie de vos actifs et de vos risques.",
      "Analyse d'écart vis-à-vis du niveau visé.",
    ],
  },
  {
    kick: "On décide",
    title: "Priorisation",
    text: (
      <>
        Toutes les failles ne se valent pas. On les classe par risque et par effort, pour une feuille de route
        pensée pour un <b>budget de PME</b>. Vous décidez, en connaissance de cause.
      </>
    ),
    deliverables: [
      "Plan de remédiation priorisé par risque et coût.",
      "Recommandations chiffrées, sans sur-ingénierie.",
      "Calendrier réaliste, validé avec vous.",
    ],
  },
  {
    kick: "On corrige",
    title: "Remédiation",
    text: (
      <>
        Notre différence : on ne liste pas les failles, <b>on les corrige</b>. Durcissement, correctifs, MFA,
        sauvegardes, segmentation — chaque action appliquée, puis re-testée.
      </>
    ),
    deliverables: [
      "Correctifs réellement appliqués, pas seulement conseillés.",
      "Re-vérification qui prouve l'effet de chaque action.",
      "Comparatif avant / après du score de posture.",
    ],
  },
  {
    kick: "On maintient",
    title: "Supervision & suivi",
    text: "La sécurité n'est pas un projet ponctuel. On surveille, on ajuste, on reste en veille — avec un interlocuteur unique, joignable directement.",
    deliverables: [
      "Supervision continue et alertes utiles.",
      "Points de suivi et tableau de bord de posture.",
      "Contact direct avec l'expert, sans centre d'appel.",
    ],
  },
];

const aiCards: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Veille accélérée",
    text: "On suit les nouvelles menaces pour anticiper ce qui vous concerne vraiment.",
  },
  {
    icon: "alert-triangle",
    title: "Détection élargie",
    text: "Plus de journaux, plus de signaux analysés — l'anomalie repérée plus tôt.",
  },
  {
    icon: "layers",
    title: "Rien ne passe entre les mailles",
    text: "Un second regard automatisé sur configs et correctifs. Rien n'est oublié.",
  },
  {
    icon: "check",
    title: "Décision humaine",
    text: "Chaque constat IA est vérifié et validé par l'expert avant toute action.",
  },
];

const whyItems: { icon: IconName; title: string; text: string; pin: string; pinIcon: IconName }[] = [
  {
    icon: "map-pin",
    title: "Local & réactif",
    text: "Basés à Liège, on intervient vite en Wallonie. Vos données restent en Belgique / UE. Vous appelez, on décroche.",
    pin: "On répond au téléphone",
    pinIcon: "phone",
  },
  {
    icon: "users",
    title: "Accès direct à l'expert",
    text: "Vous parlez à la personne qui fait le travail sur votre dossier. Jamais un centre d'appel, jamais un junior en sous-traitance.",
    pin: "Zéro sous-traitance",
    pinIcon: "check",
  },
  {
    icon: "target",
    title: "Pragmatisme PME",
    text: "On corrige ce qui compte pour votre budget — pas de sur-ingénierie. Chaque euro cible un risque réel, expliqué.",
    pin: "Adapté au budget PME",
    pinIcon: "check",
  },
  {
    icon: "layers",
    title: "Un seul partenaire",
    text: "Build, secure, comply : tout au même endroit. Fini les cinq prestataires qui se renvoient la responsabilité.",
    pin: "Un interlocuteur, bout en bout",
    pinIcon: "check",
  },
];

const referentiels: { icon: IconName; code: string; title: string; text: string }[] = [
  {
    icon: "code",
    code: "OWASP",
    title: "Tests & sécurité applicative",
    text: "Nos audits web et tests d'intrusion suivent la méthodologie OWASP — les mêmes critères que l'industrie.",
  },
  {
    icon: "shield-check",
    code: "ISO/IEC 27001",
    title: "Gestion de la sécurité de l'information",
    text: "Gouvernance et gestion des risques structurées selon ISO/IEC 27001 — posture cohérente, documentée.",
  },
  {
    icon: "layers",
    code: "CyFun · NIS2 (CCB)",
    title: "Conformité belge & européenne",
    text: "Nos mises en conformité suivent le CyberFundamentals Framework du CCB et la directive NIS2 — le référentiel officiel en Belgique.",
  },
];

export default function ApprochePage() {
  return (
    <>
      {/* ===== Page header ===== */}
      <section className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Approche · Notre méthode" }]} />
          <Reveal as="div" stagger className={styles.heroGrid}>
            <div>
              <div className={styles.kickerRow}>
                <span className={styles.rule} aria-hidden="true" />
                <Eyebrow className={styles.kickerMono}>Notre méthode</Eyebrow>
              </div>
              <h1 className={styles.h1}>
                Une cybersécurité qui se <span className="accent">démontre</span>, pas qui se raconte.
              </h1>
              <p className={styles.lead}>
                La sécurité, pas le discours : des actions mesurées, des livrables que vous vérifiez vous-même.
                Voici notre méthode, du diagnostic au suivi.
              </p>
              <div className={styles.heroCta}>
                <Button as="a" href="/contact" variant="primary" size="lg" trailingIcon={<Icon name="arrow-right" />}>
                  Réserver un diagnostic gratuit
                </Button>
                <Button as="a" href="#method" variant="ghost" size="lg">
                  Voir les 4 étapes
                </Button>
              </div>
            </div>
            <div className={styles.promiseCard}>
              <div className={`${styles.promiseGridBg} grid-bg`} aria-hidden="true" />
              <div className={styles.promiseTop}>
                <div className={styles.promiseIcon}>
                  <Icon name="shield-check" size={24} />
                </div>
                <div>
                  <h3 className={styles.promiseTitle}>Notre engagement</h3>
                  <div className={styles.promiseSub}>Ce que vous obtenez, à chaque mission</div>
                </div>
              </div>
              <ul className={styles.promiseList}>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>
                    Un <b>diagnostic mesuré</b>, chiffré et documenté — pas une impression.
                  </span>
                </li>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>
                    Des <b>priorités claires</b> par risque et par budget PME.
                  </span>
                </li>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>
                    Une <b>remédiation réelle</b> — on corrige ce qu&rsquo;on trouve.
                  </span>
                </li>
                <li>
                  <span className={styles.ck}>
                    <Icon name="check" size={13} strokeWidth={3} />
                  </span>
                  <span>
                    Une <b>preuve vérifiable</b> du avant / après, sans jargon.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <TrustStrip />

      {/* ===== Philosophy ===== */}
      <Section variant="white">
        <Reveal as="div" stagger className={styles.philoGrid}>
          <div>
            <SectionHeading
              eyebrow="Notre philosophie"
              title={
                <>
                  Des <span className="accent">preuves</span>, pas des promesses
                </>
              }
              lead={
                <>
                  Trop de prestataires vendent un sentiment de sécurité. Nous, on vous donne de quoi la vérifier
                  vous-même : <b>diagnostic mesuré</b>, livrables <b>clairs et actionnables</b>, résultat prouvé.
                </>
              }
            />
            <blockquote className={styles.quote}>
              « Ne nous croyez pas sur parole. On vous montre l&rsquo;écart de départ, les correctifs appliqués, le
              résultat mesuré. » <b>— Notre règle, à chaque mission.</b>
            </blockquote>
          </div>
          <div className={styles.contrast}>
            <div className={`${styles.col} ${styles.bad}`}>
              <div className={styles.cap}>
                <span className={styles.capBadge}>
                  <Icon name="alert-circle" size={15} />
                </span>
                Des promesses
              </div>
              <ul>
                <li>
                  <Icon name="alert-circle" size={16} />« Vous êtes protégés », sans le prouver.
                </li>
                <li>
                  <Icon name="alert-circle" size={16} />
                  Un rapport de 200 pages qui finit dans un tiroir.
                </li>
                <li>
                  <Icon name="alert-circle" size={16} />
                  Des failles constatées… mais jamais corrigées.
                </li>
                <li>
                  <Icon name="alert-circle" size={16} />
                  Du jargon qui masque le manque de résultats.
                </li>
              </ul>
            </div>
            <div className={`${styles.col} ${styles.good}`}>
              <div className={styles.cap}>
                <span className={styles.capBadge}>
                  <Icon name="check" size={15} strokeWidth={2.6} />
                </span>
                Des preuves
              </div>
              <ul>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  Un score de départ mesuré et expliqué.
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  Un plan priorisé, lisible par un dirigeant non technique.
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  Des correctifs réellement appliqués et testés.
                </li>
                <li>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  Une comparaison avant / après que vous pouvez vérifier.
                </li>
              </ul>
            </div>
            <div
              className={styles.proofVisual}
              role="img"
              aria-label="Illustration d'un rapport d'audit : une liste de constats cochés un par un, validée par un sceau de vérification."
            >
              <ProofVisual />
              <p className={styles.proofCaption}>
                <b>Chaque constat, coché et vérifié</b> — la preuve, pas le discours.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ===== Method ===== */}
      <Section variant="tint" id="method">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Notre méthode"
            title={
              <>
                Quatre <span className="accent">étapes</span>, du premier constat au suivi durable
              </>
            }
            lead="Audit, pentest, mise en conformité NIS2 / CyFun : même méthode à chaque fois. Vous savez ce qui se passe, et ce que vous recevez."
          />
        </Reveal>

        <Reveal variant="scale" className={styles.roadmap}>
          <RoadmapIllustration />
        </Reveal>

        <div className={styles.overview}>
          <ProcessSteps
            kicker="Aperçu rapide"
            steps={methodSteps.map((step) => ({ title: step.title, description: step.kick }))}
          />
        </div>

        <Reveal as="div" stagger className={styles.methodGallery}>
          <figure className={styles.methodPhoto}>
            <OptimizedImage
              src="/images/pages/approche/methode-architecture.jpg"
              alt="Gros plan sur un circuit imprimé rétroéclairé, symbole de la rigueur technique et de l'architecture qui structure notre méthode."
              width={1200}
              height={801}
              sizePreset="card"
              className={styles.methodPhotoFrame}
            />
            <figcaption className={styles.methodPhotoCap}>
              Une méthode aussi <b>rigoureuse qu&rsquo;un plan d&rsquo;architecte</b>, du diagnostic au correctif.
            </figcaption>
          </figure>
          <figure className={styles.methodPhoto}>
            <OptimizedImage
              src="/images/pages/approche/planification-roadmap.jpg"
              alt="Un consultant classe des priorités par trimestre sur un tableau de planification, illustrant la construction d'une feuille de route priorisée avec le client."
              width={1400}
              height={933}
              sizePreset="card"
              className={styles.methodPhotoFrame}
            />
            <figcaption className={styles.methodPhotoCap}>
              Une <b>feuille de route priorisée</b>, construite avec vous — pas imposée.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal as="div" stagger className={styles.stepsDetail}>
          {methodSteps.map((step, i) => (
            <article key={step.title} className={styles.mstep}>
              <div className={styles.idx}>
                <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
                {i < methodSteps.length - 1 ? <div className={styles.ln} /> : null}
              </div>
              <div>
                <div className={styles.kick}>{step.kick}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
              <div className={styles.deliverCol}>
                <div className={styles.deliverHead}>
                  <Icon name="file-check" size={16} />
                  Ce que vous recevez
                </div>
                <ul>
                  {step.deliverables.map((d) => (
                    <li key={d}>
                      <Icon name="check" size={15} strokeWidth={2.4} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ===== AI companion ===== */}
      <Section variant="navy" gridBg id="ia">
        <Reveal as="div" stagger className={styles.aiGrid}>
          <div>
            <SectionHeading
              onDark
              eyebrow="Augmentés par l'IA"
              title={
                <>
                  L&rsquo;IA travaille avec nous. Elle ne{" "}
                  <span className="accentOnDark">décide pas</span> à notre place.
                </>
              }
              lead="L'IA nous aide à surveiller plus large, trier plus vite, ne rien laisser passer. L'analyse et la décision restent humaines — les vôtres et les nôtres."
            />
            <div className={styles.aiHonest}>
              <Icon name="alert-circle" size={22} />
              <p>
                En toute transparence : l&rsquo;IA est un <b>outil d&rsquo;appui</b>, pas un produit qu&rsquo;on vous
                vend. Elle ne remplace jamais l&rsquo;expertise ni votre validation.
              </p>
            </div>
          </div>
          <Reveal as="div" stagger className={styles.aiCards}>
            {aiCards.map((card) => (
              <div key={card.title} className={styles.aiCard}>
                <div className={styles.aiIcon}>
                  <Icon name={card.icon} size={22} />
                </div>
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </Reveal>
          <div className={styles.aiIllustration}>
            <AiIllustration />
            <div className={styles.legend}>
              <span>
                <i className={styles.legendDot} aria-hidden="true" />
                Expert humain
              </span>
              <span>
                <i className={styles.legendDot} aria-hidden="true" />
                Constat vérifié
              </span>
              <span>
                <i className={styles.legendDot} aria-hidden="true" />
                Analyse IA
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ===== Why Smidjan ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Pourquoi Smidjan"
            title={
              <>
                La rigueur d&rsquo;un cabinet, la proximité d&rsquo;un <span className="accent">partenaire</span>
              </>
            }
            lead="Structure à taille humaine, par choix. Moins d'intermédiaires, plus de responsabilité."
          />
        </Reveal>

        <Reveal variant="scale" as="figure" className={styles.sectionPhoto}>
          <OptimizedImage
            src="/images/pages/approche/collaboration-expert.jpg"
            alt="Un consultant et une dirigeante se félicitent d'un high five autour d'un bureau, illustrant la relation directe avec l'expert dédié à votre dossier, sans sous-traitance."
            width={1200}
            height={800}
            sizePreset="hero"
            className={styles.sectionPhotoFrame}
          />
          <figcaption className={styles.sectionPhotoCap}>
            Un <b>expert dédié</b>, joignable directement — jamais un centre d&rsquo;appel ni un junior en sous-traitance.
          </figcaption>
        </Reveal>

        <Reveal as="div" stagger className={styles.whyGrid}>
          {whyItems.map((item) => (
            <div key={item.title} className={styles.whyItem}>
              <div className={styles.whyIcon}>
                <Icon name={item.icon} size={24} />
              </div>
              <div>
                <h4 className={styles.whyTitle}>{item.title}</h4>
                <p className={styles.whyText}>{item.text}</p>
                <span className={styles.whyPin}>
                  <Icon name={item.pinIcon} size={14} strokeWidth={2.4} />
                  {item.pin}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      <StatsBand
        title="Une méthode, pas un discours"
        lead="Quatre chiffres qui résument notre façon de travailler."
        stats={[
          { value: "4", label: "étapes, du diagnostic à la supervision continue" },
          { value: "24", accent: "h", label: "délai visé pour une première réponse à votre demande" },
          { value: "100", accent: "%", label: "des correctifs appliqués re-testés avant clôture" },
          { value: "0", label: "sous-traitance : un seul interlocuteur, de bout en bout" },
        ]}
      />

      {/* ===== Référentiels / quality ===== */}
      <Section variant="tint">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Nos référentiels"
            title={
              <>
                Une méthodologie alignée sur les cadres de <span className="accent">référence</span>
              </>
            }
            lead="Pas de feeling. Nos audits et mises en conformité s'appuient sur des référentiels reconnus — pour des résultats comparables et défendables."
          />
        </Reveal>
        <Reveal as="div" stagger className={styles.refsGrid}>
          {referentiels.map((ref) => (
            <article key={ref.code} className={styles.refCard}>
              <div className={styles.refIcon}>
                <Icon name={ref.icon} size={26} />
              </div>
              <div className={styles.refCode}>{ref.code}</div>
              <h3 className={styles.refTitle}>{ref.title}</h3>
              <p className={styles.refText}>{ref.text}</p>
            </article>
          ))}
        </Reveal>
        <Reveal className={styles.refsHonesty}>
          <Icon name="alert-circle" size={26} />
          <div>
            <h4>En toute transparence</h4>
            <p>
              Nous appliquons ces référentiels comme <b>méthode de travail</b> et préparons votre organisation à la
              vérification. La <b>certification</b> officielle CyFun est délivrée par des organismes accrédités
              BELAC — pas par nous. Notre rôle : auditer, corriger, vous amener prêts à la soumission.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        id="contact"
        title="Un diagnostic gratuit pour savoir où vous en êtes vraiment"
        text="30 minutes avec un expert. Vous repartez avec un premier constat chiffré et des priorités claires. Sans engagement."
        actions={[
          { label: "Réserver mon diagnostic gratuit", href: "/contact" },
          { label: "Appeler le 0475 20 55 62", href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={["Réponse sous 24 h", "Expert dédié, pas de sous-traitance", "Données en Belgique"]}
      />
    </>
  );
}
