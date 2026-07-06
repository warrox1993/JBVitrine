import type { Metadata } from "next";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { CyFunTiers, ProcessSteps, Faq, CTABox } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import { faqPageSchema } from "@/lib/schema";
import {
  FunctionsRing,
  CoverageGauge,
  LevelsStepChart,
  Roadmap,
} from "./diagrams";
import styles from "./ConformiteNis2.module.css";

export const metadata: Metadata = {
  title: "Conformité NIS2 & CyFun (CCB) pour PME : audit, remédiation & préparation | Smidjan Liège",
  description:
    "Préparez votre conformité NIS2 avec le référentiel CyFun (CyberFundamentals) du CCB. Smidjan réalise l'audit, l'analyse d'écart, la remédiation et la préparation à la vérification pour les 3 niveaux Basic, Important et Essential. Diagnostic gratuit à Liège.",
  keywords: [
    "NIS2",
    "CyFun",
    "CyberFundamentals",
    "CCB",
    "conformité NIS2 Belgique",
    "audit sécurité PME",
    "remédiation cybersécurité",
    "ISO 27001",
    "Liège",
    "Wallonie",
  ],
  alternates: {
    canonical: "/conformite-nis2",
    languages: {
      "fr-BE": "/conformite-nis2",
      fr: "/conformite-nis2",
    },
  },
  openGraph: {
    title: "Conformité NIS2 & CyFun (CCB) pour les PME | Smidjan Liège",
    description:
      "Audit, analyse d'écart, remédiation et préparation à la vérification CyFun (CCB) pour atteindre votre niveau NIS2. Basic, Important, Essential. Diagnostic gratuit.",
    url: "https://smidjan.be/conformite-nis2",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Conformité NIS2 & CyFun, Smidjan, cybersécurité à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conformité NIS2 & CyFun (CCB) | Smidjan",
    description:
      "Audit, remédiation et préparation à la vérification CyFun pour votre conformité NIS2.",
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

const CHECK = <Icon name="check" strokeWidth={2.4} size={16} />;

export default function ConformiteNis2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <Breadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: "Conformité NIS2 / CyFun", href: "/conformite-nis2" },
        ]}
      />

      {/* ===== Hero ===== */}
      <section className={styles.hero} id="top">
        <Container className={styles.heroWrap}>
          <div>
            <div className={styles.kickerRow}>
              <span className={styles.rule} aria-hidden="true" />
              <span className={styles.heroBadge}>
                <span className={styles.tag}>NIS2</span>
                En vigueur depuis le 18 octobre 2024 en Belgique
              </span>
            </div>
            <h1 className={styles.heroTitle}>
              NIS2 est en vigueur&nbsp;:{" "}
              <span className={styles.accent}>
                vous devez déjà être conforme
              </span>
              .
            </h1>
            <p className={styles.heroLead}>
              Audit, <b>remédiation</b>, mise au niveau CyFun (CCB)&nbsp;: on
              ne liste pas vos manques, on les corrige.
            </p>
            <div className={styles.heroCta}>
              <Button
                as="a"
                href="/contact"
                variant="primary"
                trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} size={16} />}
              >
                Diagnostic NIS2 gratuit
              </Button>
              <Button as="a" href="#niveaux" variant="ghost">
                Comparer les 3 niveaux
              </Button>
            </div>
            <div className={styles.heroAssure}>
              <div>
                <Icon name="check" size={18} />
                Sans engagement
              </div>
              <div>
                <Icon name="check" size={18} />
                Réponse sous 24&nbsp;h
              </div>
              <div>
                <Icon name="check" size={18} />
                Un expert dédié, pas de sous-traitance
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.deadlineCard}>
              <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
              <div className={styles.dcTop}>
                <div className={styles.dcCal}>
                  <span className={styles.m}>Oct</span>
                  <span className={styles.d}>18</span>
                  <span className={styles.y}>2024</span>
                </div>
                <div>
                  <h3>NIS2 est déjà en vigueur</h3>
                  <p>
                    Depuis le 18 octobre 2024&nbsp;: ce n&apos;est plus une
                    échéance, c&apos;est une obligation.
                  </p>
                </div>
              </div>
              <div className={styles.dcCount} aria-hidden="true">
                <div className={styles.dcUnit}>
                  <div className={styles.num}>10M€</div>
                  <div className={styles.lbl}>SANCTION MAX</div>
                </div>
                <div className={styles.dcUnit}>
                  <div className={styles.num}>2%</div>
                  <div className={styles.lbl}>DU CA MONDIAL</div>
                </div>
                <div className={styles.dcUnit}>
                  <div className={styles.num}>24h</div>
                  <div className={styles.lbl}>ALERTE INCIDENT</div>
                </div>
              </div>
              <div className={styles.dcFoot}>
                <Icon name="shield-check" size={17} />
                <span>
                  <b>Chaque mois compte.</b> On vous amène au niveau attendu et
                  on réduit le risque de sanction.
                </span>
              </div>
            </div>
            <div className={styles.floatChip} aria-hidden="true">
              <div className={styles.ic}>
                <Icon name="layers" size={20} />
              </div>
              <div>
                <b>CCB · CyberFundamentals</b>
                <small>Cadre officiel belge</small>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== NIS2 en clair ===== */}
      <Section variant="white">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>NIS2, en clair</span>}
            title={
              <>
                Ce que la directive change pour vous,{" "}
                <span className={styles.accent}>sans jargon</span>
              </>
            }
            lead="NIS2 relève le niveau de cybersécurité exigé de milliers d'organisations. Trois questions pour savoir où vous en êtes."
          />
        </Reveal>

        <Reveal>
          <figure className={styles.sectionPhoto}>
            <OptimizedImage
              src="/images/pages/conformite-nis2/gouvernance-comite.jpg"
              alt="Comité de direction réuni en salle de réunion, discutant des risques cyber et des responsabilités de gouvernance liées à la conformité NIS2"
              width={1400}
              height={935}
              sizePreset="hero"
              className={styles.sectionPhotoFrame}
            />
            <figcaption className={styles.sectionPhotoCap}>
              La conformité NIS2 engage la <b>responsabilité des organes de
              direction</b>, un sujet de gouvernance, pas seulement d&apos;IT.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal stagger className={styles.clairGrid}>
          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="users" size={26} strokeWidth={1.7} />
            </div>
            <h3>Qui est concerné&nbsp;?</h3>
            <p>Deux catégories, selon secteur et taille&nbsp;:</p>
            <ul>
              <li>
                {CHECK}
                <span>
                  Entités <b>essentielles</b>&nbsp;: énergie, transport, santé,
                  finance, infrastructures numériques…
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  Entités <b>importantes</b>&nbsp;: fabrication, agroalimentaire,
                  services numériques, chimie…
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  Par ricochet, <b>leurs sous-traitants et fournisseurs</b>.
                </span>
              </li>
            </ul>
            <div className={styles.tagline}>
              <span className={styles.pill}>
                <Icon name="file-check" size={14} />
                Un doute&nbsp;? Notre diagnostic le clarifie
              </span>
            </div>
          </article>

          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="alert-triangle" size={26} strokeWidth={1.7} />
            </div>
            <h3>Quel est le risque&nbsp;?</h3>
            <p>Juridique et financier&nbsp;: pas seulement technique.</p>
            <ul>
              <li>
                {CHECK}
                <span>
                  <b>Amendes significatives</b>, plusieurs millions d&apos;euros
                  pour les entités essentielles.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  <b>Responsabilité de la direction</b> engagée.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  <b>Notification</b> des incidents au CCB sous délais courts.
                </span>
              </li>
            </ul>
            <div className={styles.tagline}>
              <span className={`${styles.pill} ${styles.pillWarn}`}>
                <Icon name="alert-circle" size={14} />
                Un enjeu de direction, pas seulement d&apos;IT
              </span>
            </div>
          </article>

          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="clock" size={26} strokeWidth={1.7} />
            </div>
            <h3>Pourquoi maintenant&nbsp;?</h3>
            <p>Déjà transposée en droit belge. Chaque mois compte.</p>
            <ul>
              <li>
                {CHECK}
                <span>
                  <b>En vigueur depuis le 18 octobre 2024.</b>
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  La remédiation prend <b>des mois, pas des jours</b>.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  Démarrer tôt&nbsp;: étaler l&apos;effort et le budget.
                </span>
              </li>
            </ul>
            <div className={styles.tagline}>
              <span className={styles.pill}>
                <Icon name="arrow-right" size={14} />
                Chaque mois gagné compte
              </span>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* ===== CyFun framework ===== */}
      <Section variant="tint">
        <Reveal>
        <div className={styles.frameIntro}>
          <div>
            <SectionHeading
              as="h2"
              eyebrow={<span className={styles.kickerMono}>Le cadre officiel</span>}
              title={
                <>
                  CyFun : la{" "}
                  <span className={styles.accent}>réponse belge</span> à
                  NIS2, publiée par le CCB
                </>
              }
            />
            <p className={styles.frameLead}>
              Le <b>CyberFundamentals Framework (CyFun)</b>, du{" "}
              <b>Centre pour la Cybersécurité Belgique (CCB)</b>, est le moyen
              reconnu de démontrer votre conformité NIS2.
            </p>
            <p className={styles.frameNote}>
              Basé sur les standards internationaux, traduit en{" "}
              <b>mesures progressives</b> adaptées à votre taille et à votre
              risque.
            </p>
            <figure className={styles.frameInlinePhoto}>
              <OptimizedImage
                src="/images/pages/conformite-nis2/audit-checklist.jpg"
                alt="Consultant complétant une checklist de conformité CyFun sur tablette, mesure par mesure"
                width={1400}
                height={788}
                sizePreset="card"
                className={styles.sectionPhotoFrame}
              />
              <figcaption>
                L&apos;auto-évaluation CyFun&nbsp;: un <b>socle de mesures</b>{" "}
                vérifiées une à une, pas une déclaration d&apos;intention.
              </figcaption>
            </figure>
          </div>
          <div className={styles.frameMap}>
            <div className={styles.mh}>
              <Icon name="layers" size={16} />
              CyFun, aligné sur les standards
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>CyberFundamentals (CCB)</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>Répond aux exigences de NIS2</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Structure des fonctions</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>Mappée sur le NIST CSF</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Contrôles &amp; bonnes pratiques</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>Alignés sur ISO/IEC 27001</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Trois niveaux d&apos;assurance</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>Basic · Important · Essential</span>
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal>
          <figure
            className={styles.ringWrap}
            role="img"
            aria-label="Diagramme : les six fonctions du CyberFundamentals disposées en cycle continu (Govern, Identify, Protect, Detect, Respond, Recover), alignées sur le NIST CSF."
          >
            <FunctionsRing />
          </figure>
          <p className={styles.ringCap}>
            Un <b>cycle continu</b>&nbsp;: chaque fonction alimente la suivante, de
            la gouvernance à la reprise.
          </p>
        </Reveal>

        <Reveal stagger className={styles.functions}>
          {(
            [
              { n: "01", icon: "shield", title: "Govern", text: "Gouvernance, rôles et gestion du risque cyber." },
              { n: "02", icon: "search", title: "Identify", text: "Inventaire des actifs et des risques à protéger." },
              { n: "03", icon: "shield-check", title: "Protect", text: "Mesures de protection : MFA, durcissement, accès." },
              { n: "04", icon: "target", title: "Detect", text: "Supervision et détection des anomalies." },
              { n: "05", icon: "sparkles", title: "Respond", text: "Réponse aux incidents et notification." },
              { n: "06", icon: "clock", title: "Recover", text: "Reprise d'activité et retour à la normale." },
            ] satisfies { n: string; icon: IconName; title: string; text: string }[]
          ).map((f) => (
            <div key={f.n} className={styles.fn}>
              <div className={styles.n}>{f.n}</div>
              <div className={styles.ic}>
                <Icon name={f.icon} size={23} strokeWidth={1.7} />
              </div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <p className={styles.fnNote}>
            <b>Govern, Identify, Protect, Detect, Respond, Recover</b>&nbsp;: tout
            le cycle de vie du risque cyber.
          </p>
        </Reveal>
      </Section>

      {/* ===== Les 3 niveaux - full-bleed navy chapter (rhythm, matches home) ===== */}
      <Section variant="navy" gridBg id="niveaux" className={styles.niveauxNavy}>
        <Reveal>
          <SectionHeading
            center
            as="h2"
            onDark
            eyebrow={<span className={styles.kickerMono}>Les 3 niveaux d&apos;assurance</span>}
            title={
              <>
                Basic, Important, Essential : choisir le{" "}
                <span className={styles.accent}>bon niveau</span>
              </>
            }
            lead="Trois niveaux progressifs. Le bon choix dépend de votre catégorie NIS2 et de votre exposition. On vous aide à trancher."
          />
        </Reveal>

        <Reveal>
          <div className={styles.statHook}>
            <div className={styles.statBig}>
              <span className={styles.statBigNum}>3</span>
              <span className={styles.statBigLbl}>Niveaux CyFun</span>
            </div>
            <CoverageGauge className={styles.covGauge} />
            <div className={styles.txt}>
              <b>Basic couvre déjà ~82&nbsp;% des attaques courantes.</b>{" "}
              Important monte à ~94&nbsp;%. Essential vise une protection
              quasi complète.
            </div>
          </div>
        </Reveal>

        <Reveal>
          <figure
            className={styles.levelsFig}
            role="img"
            aria-label="Diagramme en escalier : la couverture face aux attaques croît avec le niveau. Basic environ 82 pour cent, Important environ 94 pour cent, Essential protection quasi complète."
          >
            <LevelsStepChart />
          </figure>
          <p className={styles.levelsCap}>
            Une échelle progressive&nbsp;: plus le niveau visé est élevé, plus la{" "}
            <b>couverture</b> et l&apos;<b>exigence</b> augmentent.
          </p>
        </Reveal>

        <Reveal>
          <CyFunTiers className={styles.tiersBlock} />
        </Reveal>
      </Section>

      {/* ===== Accompagnement + honnêteté ===== */}
      <Section variant="tint" id="accompagnement">
        <Reveal>
          <SectionHeading
            as="h2"
            eyebrow={<span className={styles.kickerMono}>Notre accompagnement</span>}
            title={
              <>
                On ne se contente pas d&apos;auditer&nbsp;:{" "}
                <span className={styles.accent}>on corrige</span> et on vous
                amène prêts
              </>
            }
            lead="Pas de rapport qu'on vous laisse gérer seul. On corrige, on prépare, on vous amène prêts."
          />
        </Reveal>

        <Reveal>
          <figure className={styles.sectionPhoto}>
            <OptimizedImage
              src="/images/pages/conformite-nis2/audit-collaboration.jpg"
              alt="Deux experts Smidjan collaborant avec un client autour d'un ordinateur portable et de documents d'audit NIS2"
              width={1200}
              height={800}
              sizePreset="hero"
              className={styles.sectionPhotoFrame}
            />
            <figcaption className={styles.sectionPhotoCap}>
              Un <b>accompagnement de terrain</b>&nbsp;: nous travaillons avec vos
              équipes, pas seulement sur un rapport.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
        <div className={styles.honesty}>
          <Icon name="shield" size={30} strokeWidth={1.8} />
          <div>
            <h4>En toute transparence&nbsp;: qui fait quoi</h4>
            <p>
              Smidjan <b>n&apos;est pas un organisme de certification</b>, ni
              accrédité BELAC. Le <b>label CyFun officiel</b> est délivré par des{" "}
              <b>organismes accrédités BELAC</b> (Brand Compliance, Trust CHECK,
              Normec CertUp).
            </p>
            <p>
              Notre rôle&nbsp;: <b>auditer, remédier, préparer</b> votre dossier
              jusqu&apos;à la soumission&nbsp;: vous rendre <b>prêts à l&apos;obtenir</b>.
            </p>
            <Reveal stagger className={styles.roles}>
              <div className={`${styles.roleCol} ${styles.roleSmidjan}`}>
                <h5>
                  <Icon name="lock" size={17} />
                  Le rôle de Smidjan
                </h5>
                <ul>
                  <li>
                    {CHECK}
                    Auditer votre posture &amp; l&apos;écart au niveau visé
                  </li>
                  <li>
                    {CHECK}
                    <span>
                      <b>Remédier</b> concrètement aux manques identifiés
                    </span>
                  </li>
                  <li>
                    {CHECK}
                    Préparer le dossier &amp; la soumission
                  </li>
                  <li>
                    {CHECK}
                    Maintenir votre conformité dans le temps
                  </li>
                </ul>
                <div className={styles.foot}>
                  Notre mission&nbsp;: vous rendre <b>prêts et conformes</b>.
                </div>
              </div>
              <div className={`${styles.roleCol} ${styles.roleBelac}`}>
                <h5>
                  <Icon name="check-circle" size={17} />
                  Le rôle de l&apos;organisme accrédité BELAC
                </h5>
                <ul>
                  <li>
                    {CHECK}
                    Vérifier indépendamment votre conformité
                  </li>
                  <li>
                    {CHECK}
                    <span>
                      <b>Délivrer</b> la certification / le label CyFun officiel
                    </span>
                  </li>
                  <li>
                    {CHECK}
                    Attester le niveau atteint (Important / Essential)
                  </li>
                </ul>
                <div className={styles.foot}>
                  Ex. <b>Brand Compliance, Trust CHECK, Normec CertUp</b>,
                  indépendants de nous.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.process}>
          <figure
            className={styles.roadmapFig}
            role="img"
            aria-label="Feuille de route en quatre jalons : Cadrage, puis Remédiation, puis Support à la vérification, jusqu'au Suivi continu."
          >
            <Roadmap />
          </figure>
          <ProcessSteps
            kicker="Notre méthode en 4 étapes"
            steps={[
              {
                title: "Cadrage & auto-évaluation",
                description:
                  "Périmètre, actifs critiques, niveau CyFun visé, catégorie NIS2 confirmée, avec vos équipes.",
              },
              {
                title: "Analyse d'écart & remédiation",
                description:
                  "Écart mesuré, manques corrigés : plan priorisé par risque et par effort.",
              },
              {
                title: "Support à la vérification CCB",
                description:
                  "Dossier de preuves, documentation, liaison avec l'organisme accrédité jusqu'à la soumission.",
              },
              {
                title: "Suivi continu",
                description:
                  "Revue périodique et réévaluation pour maintenir votre conformité dans la durée.",
              },
            ]}
          />
        </div>
        </Reveal>
      </Section>

      {/* ===== Notre outil propriétaire d'audit CyFun ===== */}
      <Section variant="tint3" id="methode-audit">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>Notre outil propriétaire</span>}
            title={
              <>
                Smidjan mène l&apos;audit CyFun avec un outil{" "}
                <span className={styles.accent}>
                  propriétaire, sûr par conception
                </span>
              </>
            }
            lead="Notre moteur d'audit, aligné CyFun (CCB) et NIST CSF 2.0, évalue votre conformité vite et sur preuves. Puis on corrige : remédiation et durcissement."
          />
        </Reveal>

        <Reveal>
        <div className={styles.auditPanel}>
          <div className={`${styles.gridBg} grid-bg`} aria-hidden="true" />
          <div className={styles.auditPanelHead}>
            <Icon name="shield-check" size={26} strokeWidth={1.8} />
            <h3>Sûr par conception</h3>
          </div>
          <p className={styles.auditPanelText}>
            Un audit rigoureux et traçable, pensé pour ne jamais mettre vos
            systèmes en danger.
          </p>
          <div className={styles.auditChips}>
            <span className={styles.auditChip}>
              <Icon name="layers" size={15} />
              3 niveaux CyFun
            </span>
            <span className={styles.auditChip}>
              <Icon name="globe" size={15} />
              Aligné NIST CSF 2.0
            </span>
            <span className={styles.auditChip}>
              <Icon name="download" size={15} />
              Rapport PDF
            </span>
          </div>
        </div>
        </Reveal>

        <Reveal stagger className={styles.trustGrid}>
          {(
            [
              {
                icon: "book",
                title: "Lecture seule",
                text: "L'audit observe, il ne modifie jamais vos systèmes.",
              },
              {
                icon: "target",
                title: "Périmètre explicite",
                text: "Uniquement les hôtes que vous nous confiez. Aucun scan non demandé.",
              },
              {
                icon: "lock",
                title: "Vos identifiants ne sont jamais stockés",
                text: "Compte de service en lecture seule, fourni par vous, jamais conservé ni exporté.",
              },
              {
                icon: "file-check",
                title: "Journal inaltérable",
                text: "Chaque action est journalisée : un audit traçable et probant.",
              },
              {
                icon: "users",
                title: "Remédiation validée par un humain",
                text: "Les correctifs sont proposés pour validation, jamais appliqués automatiquement.",
              },
              {
                icon: "check-circle",
                title: "Aucune donnée conservée",
                text: "Rapport remis, puis supports d'audit effacés.",
              },
            ] satisfies { icon: IconName; title: string; text: string }[]
          ).map((c) => (
            <article key={c.title} className={styles.trustCard}>
              <div className={styles.trustIco}>
                <Icon name={c.icon} size={22} strokeWidth={1.8} />
              </div>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal>
        <div className={styles.honesty}>
          <Icon name="alert-circle" size={30} strokeWidth={1.8} />
          <div>
            <h4>Une auto-évaluation assistée, pas une certification</h4>
            <p>
              Notre outil facilite l&apos;<b>auto-évaluation CyFun</b> et prépare
              votre dossier. Il ne remplace pas la{" "}
              <b>vérification officielle</b>, réservée aux organismes accrédités
              BELAC.
            </p>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.process}>
          <ProcessSteps
            kicker="De l'audit au durcissement"
            steps={[
              {
                title: "Audit outillé",
                description:
                  "Notre outil collecte des preuves et un score par mesure, sur le seul périmètre que vous nous confiez.",
              },
              {
                title: "Rapport clair",
                description:
                  "Synthèse, écarts identifiés et priorités : un document lisible, pas un export brut.",
              },
              {
                title: "Plan de remédiation priorisé",
                description:
                  "Les actions sont classées par risque et par effort, pour un déploiement réaliste.",
              },
              {
                title: "Durcissement & suivi",
                description:
                  "Nous mettons en œuvre les correctifs validés, puis assurons un suivi dans la durée.",
              },
            ]}
          />
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.auditCtaWrap}>
          <Button
            as="a"
            href="/contact"
            variant="primary"
            trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} size={16} />}
          >
            Demander un audit
          </Button>
          <p>Auto-évaluation assistée, sans risque pour vos systèmes.</p>
        </div>
        </Reveal>
      </Section>

      {/* ===== Financer votre conformité ===== */}
      <Section variant="white" id="financement">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>Financer votre conformité</span>}
            title={
              <>
                La conformité coûte moins cher qu&apos;on ne le croit&nbsp;:{" "}
                <span className={styles.accent}>
                  une large partie est subsidiée
                </span>
              </>
            }
            lead="Le chèque « cybersécurité » wallon finance une large partie de votre audit et de votre remédiation. Voici comment en profiter."
          />
        </Reveal>

        <Reveal stagger className={styles.fundingGrid}>
          <article className={styles.fundingCard}>
            <div className={styles.fundingIco}>
              <Icon name="check-circle" size={24} strokeWidth={1.8} />
            </div>
            <div className={styles.fundingNum}>
              75<span className={styles.fundingUnit}>%</span>
            </div>
            <div className={styles.fundingLbl}>Prise en charge</div>
            <p className={styles.fundingDesc}>
              des honoraires du prestataire pour l&apos;audit, le coaching et
              la labellisation.
            </p>
          </article>
          <article className={styles.fundingCard}>
            <div className={styles.fundingIco}>
              <Icon name="layers" size={24} strokeWidth={1.8} />
            </div>
            <div className={styles.fundingNum}>60 000&nbsp;€</div>
            <div className={styles.fundingLbl}>Plafond sur 3 ans</div>
            <p className={styles.fundingDesc}>
              dans un portefeuille de chèques de 200 000&nbsp;€ sur 3 ans
              (max 100 000&nbsp;€/an).
            </p>
          </article>
          <article className={styles.fundingCard}>
            <div className={styles.fundingIco}>
              <Icon name="download" size={24} strokeWidth={1.8} />
            </div>
            <div className={styles.fundingNum}>Gratuit</div>
            <div className={styles.fundingLbl}>Outils CCB CyberFundamentals</div>
            <p className={styles.fundingDesc}>
              le niveau « Small » (7 mesures) est gratuit ; le CCB recommande
              au minimum le niveau Basic.
            </p>
          </article>
        </Reveal>

        <Reveal>
        <div className={`${styles.frameIntro} ${styles.fundingDetails}`}>
          <div>
            <h3>Le chèque « cybersécurité » (chèques-entreprises.be)</h3>
            <p className={styles.frameLead}>
              Porté par la Région wallonne, il couvre les honoraires d&apos;un{" "}
              <b>prestataire certifié</b> pour trois prestations&nbsp;:{" "}
              <b>audit</b>, <b>coaching</b> et <b>labellisation</b> « Keep It
              Secure ».
            </p>
            <p className={styles.frameNote}>
              Réservé aux <b>PME</b> (&lt; 250 employés, &lt; 50&nbsp;M€ de CA).
              Démarche <b>100&nbsp;% en ligne</b>, décision en{" "}
              <b>~5 jours ouvrés</b>.
            </p>
            <p className={styles.frameNote}>
              En complément&nbsp;: le chèque « maturité numérique » (~50&nbsp;%).
              Côté fédéral, le <b>CCB</b> propose gratuitement{" "}
              <b>CyberFundamentals</b>&nbsp;: niveau « Small » (7 mesures) gratuit,{" "}
              <b>Basic</b> recommandé au minimum.
            </p>
          </div>
          <div className={styles.frameMap}>
            <div className={styles.mh}>
              <Icon name="file-check" size={16} />
              Chèque cybersécurité, en bref
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Bénéficiaires</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>
                PME (&lt; 250 employés, &lt; 50&nbsp;M€ de CA)
              </span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Couvre</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>Audit, coaching, labellisation</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Prise en charge</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>75&nbsp;% des honoraires</span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Plafond</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>
                60 000&nbsp;€ sur 3 ans (portefeuille 200 000&nbsp;€)
              </span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Démarche</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>
                100&nbsp;% en ligne, via un prestataire certifié
              </span>
            </div>
            <div className={styles.mapRow}>
              <span className={styles.a}>Décision</span>
              <span className={styles.arr}>
                <Icon name="arrow-right" size={15} />
              </span>
              <span className={styles.b}>Environ 5 jours ouvrés</span>
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.process}>
          <ProcessSteps
            kicker="Comment en profiter, en 3 étapes"
            steps={[
              {
                title: "S'inscrire sur la plateforme",
                description:
                  "Dossier d'entreprise sur cheques-entreprises.be, éligibilité PME vérifiée (effectifs, CA, portefeuille restant).",
              },
              {
                title: "Choisir la prestation éligible",
                description:
                  "Audit, coaching ou labellisation « Keep It Secure », avec un prestataire certifié.",
              },
              {
                title: "Réaliser l'audit ou la remédiation",
                description:
                  "Le prestataire réalise la prestation ; le chèque couvre jusqu'à 75 % des honoraires, dans la limite du plafond.",
              },
            ]}
          />
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.honesty}>
          <Icon name="alert-circle" size={30} strokeWidth={1.8} />
          <div>
            <h4>Notre rôle&nbsp;: vous accompagner, pas délivrer l&apos;aide</h4>
            <p>
              Smidjan n&apos;est <b>pas nécessairement inscrit</b> comme
              prestataire certifié sur chèques-entreprises.be. Notre
              rôle&nbsp;: <b>identifier les aides</b>, <b>cadrer la prestation
              éligible</b> et <b>monter le dossier</b> avec vous.
            </p>
            <p>
              Éligibilité et prestataire agréé&nbsp;: <b>à vérifier</b> sur la
              plateforme officielle{" "}
              <a
                href="https://www.cheques-entreprises.be"
                target="_blank"
                rel="noopener"
                className={styles.fundingLink}
              >
                cheques-entreprises.be
              </a>
              .
            </p>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.fundingCtaWrap}>
          <Button
            as="a"
            href="/contact"
            variant="primary"
            trailingIcon={<Icon name="arrow-right" strokeWidth={2.2} size={16} />}
          >
            Parlons de votre dossier
          </Button>
          <p>Diagnostic gratuit, sans engagement.</p>
        </div>
        </Reveal>
      </Section>

      {/* ===== FAQ ===== */}
      <Section variant="white" id="faq">
        <Reveal>
          <SectionHeading
            center
            as="h2"
            eyebrow={<span className={styles.kickerMono}>Questions fréquentes</span>}
            title="NIS2 & CyFun : vos questions, nos réponses"
            lead="Vos questions les plus fréquentes. Une autre en tête ? Posez-la lors du diagnostic gratuit."
          />
        </Reveal>
        <Reveal>
        <Faq
          defaultOpenFirst
          items={[
            {
              question: "Suis-je concerné par NIS2 ?",
              answer: (
                <>
                  <p>
                    Selon votre secteur et votre taille. NIS2 vise les entités{" "}
                    <b>essentielles</b> (énergie, santé, transport, finance…) et{" "}
                    <b>importantes</b> (fabrication, agroalimentaire, services
                    numériques…). Beaucoup de PME sont concernées{" "}
                    <b>indirectement</b>, comme fournisseurs ou sous-traitants.
                  </p>
                  <p>
                    Un doute&nbsp;? Notre <b>diagnostic gratuit</b> clarifie
                    votre situation en un échange.
                  </p>
                </>
              ),
            },
            {
              question: "Quelle est la différence entre CyFun et ISO/IEC 27001 ?",
              answer: (
                <>
                  <p>
                    <b>ISO/IEC 27001</b> est la norme internationale de
                    référence en sécurité de l&apos;information. <b>CyFun</b>{" "}
                    est le cadre belge du CCB, conçu pour répondre à NIS2 et{" "}
                    <b>aligné sur ISO 27001</b> et le NIST CSF.
                  </p>
                  <p>
                    En pratique&nbsp;: CyFun est un point d&apos;entrée plus{" "}
                    <b>accessible</b> pour une PME, avec ses trois niveaux
                    progressifs (Basic → Essential), et une première marche
                    vers l&apos;ISO 27001 si besoin.
                  </p>
                </>
              ),
            },
            {
              question: "Est-ce que Smidjan délivre la certification CyFun ?",
              answer: (
                <>
                  <p>
                    <b>Non.</b> Smidjan n&apos;est pas un organisme de
                    certification, ni accrédité BELAC. La{" "}
                    <b>certification officielle</b> CyFun est délivrée par des{" "}
                    <b>organismes accrédités BELAC</b> (Brand Compliance,
                    Trust CHECK, Normec CertUp), indépendants de nous.
                  </p>
                  <p>
                    Notre rôle&nbsp;: <b>auditer, remédier, préparer</b> votre
                    dossier jusqu&apos;à la soumission. Nous vous rendons{" "}
                    <b>prêts</b>&nbsp;: l&apos;organisme accrédité valide votre
                    niveau.
                  </p>
                </>
              ),
            },
            {
              question: "Combien de temps faut-il pour se mettre en conformité ?",
              answer: (
                <>
                  <p>
                    Ça dépend du niveau visé et de votre maturité de départ. À
                    titre indicatif&nbsp;: <b>1 à 3 mois</b> pour Basic,{" "}
                    <b>3 à 6 mois</b> pour Important, <b>6 à 12 mois</b> pour
                    Essential.
                  </p>
                  <p>
                    NIS2 est <b>déjà en vigueur</b>&nbsp;: mieux vaut démarrer
                    maintenant. Plus tôt vous commencez, plus vous étalez
                    l&apos;effort et le budget, et réduisez votre exposition.
                  </p>
                </>
              ),
            },
            {
              question: "Que se passe-t-il si je ne fais rien ?",
              answer: (
                <>
                  <p>
                    <b>Amendes significatives</b>, <b>responsabilité de la
                    direction</b> engagée. Et surtout&nbsp;: un incident
                    (rançongiciel, fuite de données) coûte bien plus cher
                    qu&apos;une mise en conformité anticipée.
                  </p>
                  <p>
                    La démarche CyFun réduit un <b>risque réel</b>, pas
                    seulement une case à cocher.
                  </p>
                </>
              ),
            },
            {
              question: "Quel niveau CyFun choisir pour ma PME ?",
              answer: (
                <>
                  <p>
                    Pour la plupart des PME, <b>Important</b> est le meilleur
                    équilibre, le plus courant. <b>Basic</b> couvre déjà
                    l&apos;essentiel (~82&nbsp;% des attaques courantes).{" "}
                    <b>Essential</b> vise les entités « essentielles » NIS2 et
                    les exigences de sécurité fortes.
                  </p>
                  <p>
                    Le bon niveau dépend de votre catégorie NIS2 et de votre
                    exposition. On vous le recommande dès le <b>cadrage</b>.
                  </p>
                </>
              ),
            },
          ]}
        />
        </Reveal>
      </Section>

      {/* ===== Final CTA ===== */}
      <Reveal>
        <CTABox
          id="contact"
          tint
          title="Sachez où vous en êtes, avant qu'il ne soit trop tard"
          text="30 min avec un expert : catégorie NIS2, niveau CyFun, priorités claires. Sans engagement, sans jargon."
          actions={[
            { label: "Réserver mon diagnostic NIS2", href: "/contact", variant: "primary" },
            { label: "Appeler le 0475 20 55 62", href: "tel:+32475205562", variant: "ghostD" },
          ]}
          reassurances={[
            "Réponse sous 24 h",
            "Expert dédié, pas de sous-traitance",
            "Données en Belgique",
          ]}
        />
      </Reveal>
    </>
  );
}
