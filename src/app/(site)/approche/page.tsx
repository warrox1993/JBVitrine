import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
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
    text: "Nous délimitons le périmètre, cartographions vos actifs critiques et mesurons votre exposition réelle : infrastructure, réseaux, applications et pratiques. Le résultat n'est pas une opinion, mais un état des lieux chiffré, comparé à un référentiel reconnu.",
    deliverables: [
      "Un rapport de diagnostic clair avec un score de départ.",
      "La cartographie de vos actifs et de vos risques.",
      "Une analyse d'écart vis-à-vis du niveau visé.",
    ],
  },
  {
    kick: "On décide",
    title: "Priorisation",
    text: (
      <>
        Toutes les failles ne se valent pas. Nous classons chaque constat par niveau de risque et par effort, puis
        nous construisons avec vous une feuille de route réaliste pour un <b>budget de PME</b>. Vous décidez en
        connaissance de cause : ce qui doit être traité tout de suite, et ce qui peut attendre.
      </>
    ),
    deliverables: [
      "Un plan de remédiation priorisé par risque et coût.",
      "Des recommandations chiffrées, sans sur-ingénierie.",
      "Un calendrier réaliste, validé avec vous.",
    ],
  },
  {
    kick: "On corrige",
    title: "Remédiation",
    text: (
      <>
        C'est notre différence avec les pures maisons d'audit : nous ne nous contentons pas de lister les manques,{" "}
        <b>nous les corrigeons</b>. Durcissement, configuration, correctifs applicatifs, MFA, sauvegardes,
        segmentation : chaque action est appliquée puis re-testée pour confirmer qu'elle produit l'effet attendu.
      </>
    ),
    deliverables: [
      "Les correctifs réellement appliqués, pas seulement conseillés.",
      "Une re-vérification qui prouve l'effet de chaque action.",
      "Un comparatif avant / après du score de posture.",
    ],
  },
  {
    kick: "On maintient",
    title: "Supervision & suivi",
    text: "La sécurité n'est pas un projet ponctuel. Nous maintenons votre posture dans le temps : supervision, veille sur les nouvelles menaces, points de suivi réguliers et ajustements à chaque évolution de votre système d'information. Et vous gardez un interlocuteur unique, joignable directement.",
    deliverables: [
      "Une supervision continue et des alertes utiles.",
      "Des points de suivi et un tableau de bord de posture.",
      "Un contact direct avec l'expert, sans centre d'appel.",
    ],
  },
];

const aiCards: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Veille accélérée",
    text: "Suivi des nouvelles vulnérabilités et menaces, pour anticiper ce qui vous concerne réellement.",
  },
  {
    icon: "alert-triangle",
    title: "Détection élargie",
    text: "Analyse d'un plus grand volume de journaux et de signaux, pour repérer l'anomalie plus tôt.",
  },
  {
    icon: "layers",
    title: "Rien ne passe entre les mailles",
    text: "Un second regard automatisé sur les configurations et les correctifs, pour limiter l'oubli humain.",
  },
  {
    icon: "check",
    title: "Décision humaine",
    text: "Chaque constat de l'IA est vérifié et arbitré par l'expert avant toute action ou recommandation.",
  },
];

const whyItems: { icon: IconName; title: string; text: string; pin: string; pinIcon: IconName }[] = [
  {
    icon: "map-pin",
    title: "Local & réactif",
    text: "Basés à Liège, nous intervenons vite en Wallonie et vos données restent hébergées en Belgique / UE. Quand vous appelez, on décroche — pas de file d'attente à l'autre bout du monde.",
    pin: "On répond au téléphone",
    pinIcon: "phone",
  },
  {
    icon: "users",
    title: "Accès direct à l'expert",
    text: "Vous parlez à la personne qui fait réellement le travail sur votre dossier — jamais à un centre d'appel ni à un junior en sous-traitance. Pas d'intermédiaire, pas de téléphone arabe technique.",
    pin: "Zéro sous-traitance",
    pinIcon: "check",
  },
  {
    icon: "target",
    title: "Pragmatisme PME",
    text: "Nous corrigeons ce qui compte vraiment pour votre budget — pas de sur-ingénierie, pas de dépenses inutiles. Chaque euro investi cible un risque réel, hiérarchisé et expliqué.",
    pin: "Adapté au budget PME",
    pinIcon: "check",
  },
  {
    icon: "layers",
    title: "Un seul partenaire",
    text: "Construire, sécuriser et mettre en conformité : build + secure + comply, tout au même endroit. Plus besoin de coordonner cinq prestataires qui se renvoient la responsabilité.",
    pin: "Un interlocuteur, bout en bout",
    pinIcon: "check",
  },
];

const referentiels: { icon: IconName; code: string; title: string; text: string }[] = [
  {
    icon: "code",
    code: "OWASP",
    title: "Tests & sécurité applicative",
    text: "Nos audits web et nos tests d'intrusion suivent la méthodologie OWASP : mêmes catégories de failles, mêmes critères que ceux utilisés dans l'industrie.",
  },
  {
    icon: "shield-check",
    code: "ISO/IEC 27001",
    title: "Gestion de la sécurité de l'information",
    text: "Nous structurons la gouvernance et la gestion des risques selon les principes d'ISO/IEC 27001 — comme cadre méthodologique, pour une posture cohérente et documentée.",
  },
  {
    icon: "layers",
    code: "CyFun · NIS2 (CCB)",
    title: "Conformité belge & européenne",
    text: "Nos mises en conformité s'appuient sur le CyberFundamentals Framework du CCB et la directive NIS2 — le référentiel officiel attendu en Belgique.",
  },
];

export default function ApprochePage() {
  return (
    <>
      {/* ===== Page header ===== */}
      <section className={styles.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Approche · Notre méthode" }]} />
          <div className={styles.heroGrid}>
            <div>
              <Eyebrow>Notre méthode</Eyebrow>
              <h1 className={styles.h1}>
                Une cybersécurité qui se <span className={styles.accent}>démontre</span>, pas qui se raconte.
              </h1>
              <p className={styles.lead}>
                Chez Smidjan, la sécurité n&rsquo;est pas un discours : c&rsquo;est une suite d&rsquo;actions mesurées
                et de livrables que vous pouvez lire, comprendre et vérifier. Voici comment nous travaillons — du
                diagnostic au suivi — et pourquoi une PME wallonne a intérêt à travailler avec une structure à taille
                humaine.
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
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ===== Philosophy ===== */}
      <Section variant="white">
        <div className={styles.philoGrid}>
          <div>
            <SectionHeading
              eyebrow="Notre philosophie"
              title="Des preuves, pas des promesses"
              lead={
                <>
                  Trop de prestataires vendent un sentiment de sécurité. Nous préférons vous donner de quoi la
                  constater. Chaque mission part d&rsquo;un <b>diagnostic mesuré</b> et débouche sur des livrables{" "}
                  <b>clairs, actionnables et vérifiables</b> — de sorte que vous savez toujours où vous en êtes, ce
                  qui a été corrigé, et ce qu&rsquo;il reste à faire.
                </>
              }
            />
            <blockquote className={styles.quote}>
              « On ne vous demande pas de nous croire sur parole. On vous montre l&rsquo;écart au départ, les
              correctifs appliqués, et le résultat mesuré à l&rsquo;arrivée. »{" "}
              <b>— La règle qui guide chacune de nos missions.</b>
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
        </div>
      </Section>

      {/* ===== Method ===== */}
      <Section variant="tint" id="method">
        <SectionHeading
          center
          eyebrow="Notre méthode"
          title="Quatre étapes, du premier constat au suivi durable"
          lead="Un cheminement clair, le même pour chaque mission — que ce soit un audit, un pentest ou une mise en conformité NIS2 / CyFun. À chaque étape, vous savez ce qui se passe et ce que vous recevez."
        />

        <div className={styles.roadmap}>
          <RoadmapIllustration />
        </div>

        <div className={styles.overview}>
          <ProcessSteps
            kicker="Aperçu rapide"
            steps={methodSteps.map((step) => ({ title: step.title, description: step.kick }))}
          />
        </div>

        <div className={styles.stepsDetail}>
          {methodSteps.map((step, i) => (
            <article key={step.title} className={styles.mstep}>
              <div className={styles.idx}>
                <div className={styles.num}>{i + 1}</div>
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
        </div>
      </Section>

      {/* ===== AI companion ===== */}
      <Section variant="navy" gridBg id="ia">
        <div className={styles.aiGrid}>
          <div>
            <SectionHeading
              onDark
              eyebrow="Augmentés par l'IA"
              title="L'IA travaille avec nous. Elle ne décide pas à notre place."
              lead="Nous utilisons l'intelligence artificielle comme un compagnon de travail : elle nous aide à surveiller plus large, à trier plus vite et à ne rien laisser passer. Mais l'analyse, le jugement et les décisions restent entre des mains humaines — les vôtres et les nôtres."
            />
            <div className={styles.aiHonest}>
              <Icon name="alert-circle" size={22} />
              <p>
                En toute transparence : l&rsquo;IA est un <b>outil d&rsquo;appui</b>, pas un service que nous vous
                vendons. Elle nous rend plus rapides et plus attentifs ; elle ne remplace jamais l&rsquo;expertise ni
                votre validation.
              </p>
            </div>
          </div>
          <div className={styles.aiCards}>
            {aiCards.map((card) => (
              <div key={card.title} className={styles.aiCard}>
                <div className={styles.aiIcon}>
                  <Icon name={card.icon} size={22} />
                </div>
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
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
        </div>
      </Section>

      {/* ===== Why Smidjan ===== */}
      <Section variant="white">
        <SectionHeading
          center
          eyebrow="Pourquoi Smidjan"
          title="La rigueur d'un cabinet, la proximité d'un partenaire"
          lead="Nous sommes une structure à taille humaine, volontairement. Moins d'intermédiaires, plus de responsabilité — et quatre raisons concrètes de nous confier votre sécurité."
        />
        <div className={styles.whyGrid}>
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
        </div>
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
        <SectionHeading
          center
          eyebrow="Nos référentiels"
          title="Une méthodologie alignée sur les cadres de référence"
          lead="Nous ne travaillons pas au feeling. Nos audits, notre développement et nos mises en conformité s'appuient sur des référentiels reconnus — appliqués comme méthode de travail, pour que vos résultats soient comparables et défendables."
        />
        <div className={styles.refsGrid}>
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
        </div>
        <div className={styles.refsHonesty}>
          <Icon name="alert-circle" size={26} />
          <div>
            <h4>En toute transparence</h4>
            <p>
              Smidjan applique ces référentiels comme <b>méthodologie de travail</b> et prépare votre organisation à
              la vérification. Nous ne délivrons pas de <b>certification</b> : la certification officielle CyFun est
              émise par des organismes accrédités BELAC. Notre rôle est de vous auditer, corriger et amener prêts à
              la soumission — pas de vous vendre un label que nous ne délivrons pas.
            </p>
          </div>
        </div>
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        id="contact"
        title="Un diagnostic gratuit pour savoir où vous en êtes vraiment"
        text="30 minutes avec un expert pour mesurer votre exposition, cadrer votre conformité NIS2 et repartir avec des priorités claires. Pas de discours : un premier constat, chiffré. Sans engagement."
        actions={[
          { label: "Réserver mon diagnostic gratuit", href: "/contact" },
          { label: "Appeler le 0475 20 55 62", href: "tel:+32475205562", variant: "ghostD" },
        ]}
        reassurances={["Réponse sous 24 h", "Expert dédié, pas de sous-traitance", "Données en Belgique"]}
      />
    </>
  );
}
