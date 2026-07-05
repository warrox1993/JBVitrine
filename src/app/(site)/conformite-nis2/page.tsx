import type { Metadata } from "next";

import OptimizedImage from "@/components/ui/OptimizedImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button/Button";
import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { CyFunTiers, ProcessSteps, Faq, CTABox } from "@/components/shared";
import { faqPageSchema } from "@/lib/schema";
import {
  FunctionsRing,
  CoverageGauge,
  LevelsStepChart,
  Roadmap,
} from "./diagrams";
import styles from "./ConformiteNis2.module.css";

export const metadata: Metadata = {
  title: "Conformité NIS2 & CyFun (CCB) pour PME — Audit, remédiation & préparation | Smidjan Liège",
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
    title: "Conformité NIS2 & CyFun (CCB) pour les PME — Smidjan Liège",
    description:
      "Audit, analyse d'écart, remédiation et préparation à la vérification CyFun (CCB) pour atteindre votre niveau NIS2. Basic, Important, Essential. Diagnostic gratuit.",
    url: "https://smidjan.be/conformite-nis2",
    siteName: "Smidjan",
    images: [
      {
        url: "https://smidjan.be/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Conformité NIS2 & CyFun — Smidjan, cybersécurité à Liège",
        type: "image/webp",
      },
    ],
    locale: "fr_BE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conformité NIS2 & CyFun (CCB) — Smidjan",
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
            <span className={styles.heroBadge}>
              <span className={styles.tag}>NIS2</span>
              En vigueur depuis le 18 octobre 2024 en Belgique
            </span>
            <h1 className={styles.heroTitle}>
              NIS2 est en vigueur —{" "}
              <span className={styles.accent}>
                vous devez déjà être conforme
              </span>
              .
            </h1>
            <p className={styles.heroLead}>
              Audit, <b>remédiation</b>, préparation à la vérification&nbsp;:
              Smidjan vous amène concrètement au niveau CyFun (CCB) attendu —
              nous ne listons pas vos manques, nous les corrigeons.
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
                    Applicable en Belgique depuis le 18 octobre 2024&nbsp;: la
                    conformité n&apos;est plus une échéance à venir, c&apos;est
                    une obligation actuelle.
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
                  <b>Chaque mois sans mise en conformité augmente votre
                  exposition.</b> Nous vous amenons rapidement au niveau
                  attendu — en réduisant concrètement le risque de sanction
                  et d&apos;incident.
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
        <SectionHeading
          center
          as="h2"
          eyebrow="NIS2, en clair"
          title={
            <>
              Ce que la directive change pour vous —{" "}
              <span className={styles.accent}>sans jargon</span>
            </>
          }
          lead="NIS2 est une directive européenne qui relève le niveau minimal de cybersécurité exigé de milliers d'organisations. Trois questions suffisent à savoir où vous en êtes."
        />

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
            direction</b> — un sujet de gouvernance, pas seulement d&apos;IT.
          </figcaption>
        </figure>

        <div className={styles.clairGrid}>
          <article className={styles.clairCard}>
            <div className={styles.ico}>
              <Icon name="users" size={26} strokeWidth={1.7} />
            </div>
            <h3>Qui est concerné&nbsp;?</h3>
            <p>
              NIS2 distingue deux catégories, selon le secteur et la taille de
              l&apos;entreprise&nbsp;:
            </p>
            <ul>
              <li>
                {CHECK}
                <span>
                  Entités <b>essentielles</b>&nbsp;: énergie, transport, santé,
                  eau, finance, infrastructures numériques…
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  Entités <b>importantes</b>&nbsp;: agroalimentaire, fabrication,
                  services numériques, chimie, poste…
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  Et par ricochet, <b>leurs sous-traitants et fournisseurs</b>,
                  via les exigences de la chaîne d&apos;approvisionnement.
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
            <p>
              La non-conformité n&apos;est pas qu&apos;un enjeu technique&nbsp;:
              c&apos;est un risque juridique et financier réel.
            </p>
            <ul>
              <li>
                {CHECK}
                <span>
                  <b>Amendes administratives significatives</b> — pouvant
                  atteindre plusieurs millions d&apos;euros pour les entités
                  essentielles.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  <b>Responsabilité de la direction</b> engagée&nbsp;: les
                  organes de gestion doivent superviser les mesures.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  <b>Obligation de notifier</b> les incidents importants au CCB
                  dans des délais courts.
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
            <p>
              La directive est transposée en droit belge et déjà applicable.
              Chaque mois sans conformité, c&apos;est du risque en plus.
            </p>
            <ul>
              <li>
                {CHECK}
                <span>
                  NIS2 est <b>en vigueur depuis le 18 octobre 2024</b> —
                  vous êtes déjà tenu de vous y conformer.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  La remédiation prend du temps&nbsp;: MFA, sauvegardes,
                  journalisation, procédures… cela se déploie sur des mois, pas
                  des jours.
                </span>
              </li>
              <li>
                {CHECK}
                <span>
                  Commencer tôt, c&apos;est étaler l&apos;effort et le budget —
                  sereinement.
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
        </div>
      </Section>

      {/* ===== CyFun framework ===== */}
      <Section variant="tint">
        <div className={styles.frameIntro}>
          <div>
            <SectionHeading
              as="h2"
              eyebrow="Le cadre officiel"
              title={
                <>
                  CyFun : la{" "}
                  <span className={styles.accent}>réponse belge</span> à
                  NIS2, publiée par le CCB
                </>
              }
            />
            <p className={styles.frameLead}>
              Le <b>CyberFundamentals Framework (CyFun)</b> est le référentiel
              élaboré par le <b>Centre pour la Cybersécurité Belgique (CCB)</b>.
              C&apos;est le moyen concret, reconnu par l&apos;autorité, de
              démontrer que votre organisation répond aux exigences de NIS2 —
              sans réinventer la roue.
            </p>
            <p className={styles.frameNote}>
              Plutôt que de partir d&apos;une page blanche, CyFun s&apos;appuie
              sur les grands standards internationaux et les traduit en un{" "}
              <b>socle progressif de mesures</b>, adapté à la taille et au risque
              de chaque organisation.
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
                vérifiées une à une, pas une simple déclaration d&apos;intention.
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

        <figure
          className={styles.ringWrap}
          role="img"
          aria-label="Diagramme : les six fonctions du CyberFundamentals disposées en cycle continu — Govern, Identify, Protect, Detect, Respond, Recover — alignées sur le NIST CSF."
        >
          <FunctionsRing />
        </figure>
        <p className={styles.ringCap}>
          Un <b>cycle continu</b>&nbsp;: chaque fonction alimente la suivante, de
          la gouvernance à la reprise.
        </p>

        <div className={styles.functions}>
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
        </div>
        <p className={styles.fnNote}>
          Les six fonctions du CyberFundamentals —{" "}
          <b>Govern, Identify, Protect, Detect, Respond, Recover</b> — couvrent
          l&apos;ensemble du cycle de vie du risque cyber, de l&apos;anticipation
          à la reprise.
        </p>
      </Section>

      {/* ===== Les 3 niveaux ===== */}
      <Section variant="white" id="niveaux">
        <SectionHeading
          center
          as="h2"
          eyebrow="Les 3 niveaux d'assurance"
          title={
            <>
              Basic, Important, Essential : choisir le{" "}
              <span className={styles.accent}>bon niveau</span>
            </>
          }
          lead="CyFun propose trois niveaux progressifs. Le bon choix dépend de votre catégorie NIS2, de votre exposition et de la sensibilité de vos données. Nous vous aidons à trancher."
        />

        <div className={styles.statHook}>
          <div className={styles.statBig}>
            <span className={styles.statBigNum}>3</span>
            <span className={styles.statBigLbl}>Niveaux CyFun</span>
          </div>
          <CoverageGauge className={styles.covGauge} />
          <div className={styles.txt}>
            <b>
              Le niveau Basic couvre déjà environ 82&nbsp;% des attaques les plus
              courantes.
            </b>{" "}
            Le niveau Important porte cette couverture à environ 94&nbsp;%, et le
            niveau Essential vise une protection quasi complète.
          </div>
        </div>

        <figure
          className={styles.levelsFig}
          role="img"
          aria-label="Diagramme en escalier : la couverture face aux attaques croît avec le niveau — Basic environ 82 pour cent, Important environ 94 pour cent, Essential protection quasi complète."
        >
          <LevelsStepChart />
        </figure>
        <p className={styles.levelsCap}>
          Une échelle progressive&nbsp;: plus le niveau visé est élevé, plus la{" "}
          <b>couverture</b> et l&apos;<b>exigence</b> augmentent.
        </p>

        <CyFunTiers className={styles.tiersBlock} />
      </Section>

      {/* ===== Accompagnement + honnêteté ===== */}
      <Section variant="tint" id="accompagnement">
        <SectionHeading
          as="h2"
          eyebrow="Notre accompagnement"
          title={
            <>
              On ne se contente pas d&apos;auditer —{" "}
              <span className={styles.accent}>on corrige</span> et on vous
              amène prêts
            </>
          }
          lead="C'est notre différence avec les pures maisons d'audit : nous ne repartons pas en vous laissant une liste de problèmes. Nous mettons les mains dans le cambouis et nous vous préparons à la vérification."
        />

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

        <div className={styles.honesty}>
          <Icon name="shield" size={30} strokeWidth={1.8} />
          <div>
            <h4>En toute transparence&nbsp;: qui fait quoi</h4>
            <p>
              Smidjan <b>n&apos;est pas un organisme de certification</b> et
              n&apos;est pas accrédité BELAC. La{" "}
              <b>certification / vérification officielle</b> CyFun est délivrée
              par des <b>organismes accrédités par BELAC</b> (par exemple Brand
              Compliance, Trust CHECK, Normec CertUp).
            </p>
            <p>
              Notre rôle&nbsp;:{" "}
              <b>audit, analyse d&apos;écart, remédiation et préparation</b> pour
              atteindre le niveau CyFun visé — et vous accompagner jusqu&apos;à
              la soumission. Nous ne délivrons pas le label&nbsp;; nous vous
              rendons <b>prêts à l&apos;obtenir</b>.
            </p>
            <div className={styles.roles}>
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
                  Ex. <b>Brand Compliance, Trust CHECK, Normec CertUp</b> —
                  indépendants de nous.
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  "Nous délimitons le périmètre et réalisons l'auto-évaluation CyFun avec vos équipes : actifs critiques, niveau CyFun visé et confirmation de votre catégorie NIS2.",
              },
              {
                title: "Analyse d'écart & remédiation",
                description:
                  "Nous mesurons l'écart au niveau visé, puis corrigeons concrètement les manques — plan priorisé par risque et effort, mise en œuvre technique et organisationnelle.",
              },
              {
                title: "Support à la vérification CCB",
                description:
                  "Nous préparons le dossier de preuves et la documentation, puis assurons la liaison avec l'organisme accrédité jusqu'à la soumission / vérification.",
              },
              {
                title: "Suivi continu",
                description:
                  "La conformité n'est pas un projet ponctuel : revue périodique, réévaluation et adaptation à chaque évolution pour maintenir votre posture.",
              },
            ]}
          />
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section variant="white" id="faq">
        <SectionHeading
          center
          as="h2"
          eyebrow="Questions fréquentes"
          title="NIS2 & CyFun : vos questions, nos réponses"
          lead="Les points sur lesquels nos clients nous interrogent le plus souvent. Une question ne figure pas ici ? Posez-la lors du diagnostic gratuit."
        />
        <Faq
          defaultOpenFirst
          items={[
            {
              question: "Suis-je concerné par NIS2 ?",
              answer: (
                <>
                  <p>
                    Cela dépend de votre secteur d&apos;activité et de la taille
                    de votre entreprise. NIS2 vise deux catégories — les entités{" "}
                    <b>essentielles</b> (énergie, santé, transport, finance,
                    infrastructures numériques…) et les entités{" "}
                    <b>importantes</b> (fabrication, agroalimentaire, services
                    numériques, chimie…). De nombreuses PME sont concernées, y
                    compris <b>indirectement</b>, en tant que fournisseurs ou
                    sous-traitants d&apos;entités elles-mêmes soumises à la
                    directive.
                  </p>
                  <p>
                    En cas de doute, notre <b>diagnostic gratuit</b> clarifie
                    votre situation en un échange&nbsp;: nous déterminons si — et
                    à quel titre — vous êtes concerné.
                  </p>
                </>
              ),
            },
            {
              question: "Quelle est la différence entre CyFun et ISO/IEC 27001 ?",
              answer: (
                <>
                  <p>
                    <b>ISO/IEC 27001</b> est une norme internationale de
                    management de la sécurité de l&apos;information, exigeante et
                    reconnue dans le monde entier. <b>CyFun</b> est le cadre
                    belge du CCB, conçu spécifiquement pour répondre à NIS2 et{" "}
                    <b>aligné sur ISO 27001</b> (ainsi que sur le NIST CSF).
                  </p>
                  <p>
                    En pratique&nbsp;: CyFun est souvent un point d&apos;entrée
                    plus <b>accessible et progressif</b> pour une PME, avec ses
                    trois niveaux (Basic → Essential), tout en restant compatible
                    avec une démarche ISO 27001 ultérieure. Les deux ne
                    s&apos;opposent pas&nbsp;; CyFun peut être une première marche
                    vers l&apos;ISO.
                  </p>
                </>
              ),
            },
            {
              question: "Est-ce que Smidjan délivre la certification CyFun ?",
              answer: (
                <>
                  <p>
                    <b>Non — et nous tenons à être clairs là-dessus.</b> Smidjan
                    n&apos;est pas un organisme de certification et n&apos;est pas
                    accrédité BELAC. La{" "}
                    <b>certification / vérification officielle</b> CyFun est
                    délivrée par des <b>organismes accrédités par BELAC</b> (par
                    exemple Brand Compliance, Trust CHECK ou Normec CertUp),
                    indépendants de nous.
                  </p>
                  <p>
                    Notre rôle est complémentaire&nbsp;: nous réalisons
                    l&apos;<b>audit, l&apos;analyse d&apos;écart, la remédiation
                    et la préparation</b> — et nous vous accompagnons jusqu&apos;à
                    la soumission. Autrement dit, nous vous rendons{" "}
                    <b>prêts et conformes</b> pour que l&apos;organisme accrédité
                    puisse valider votre niveau.
                  </p>
                </>
              ),
            },
            {
              question: "Combien de temps faut-il pour se mettre en conformité ?",
              answer: (
                <>
                  <p>
                    Cela dépend du niveau visé, de votre maturité de départ et de
                    la taille du périmètre. À titre indicatif&nbsp;: comptez de
                    l&apos;ordre de <b>1 à 3 mois</b> pour Basic,{" "}
                    <b>3 à 6 mois</b> pour Important et <b>6 à 12 mois</b> pour
                    Essential.
                  </p>
                  <p>
                    Comme NIS2 est <b>déjà en vigueur</b>, il est urgent de
                    lancer la démarche&nbsp;: la remédiation (MFA, sauvegardes,
                    journalisation, procédures…) se déploie sur des mois. Plus
                    on commence tôt, plus on étale l&apos;effort et le budget —
                    tout en réduisant l&apos;exposition aux sanctions.
                  </p>
                </>
              ),
            },
            {
              question: "Que se passe-t-il si je ne fais rien ?",
              answer: (
                <>
                  <p>
                    La non-conformité expose à des{" "}
                    <b>amendes administratives significatives</b> et engage la{" "}
                    <b>responsabilité des organes de direction</b>. Au-delà du
                    volet réglementaire, l&apos;absence de mesures augmente
                    surtout votre exposition réelle&nbsp;: un incident
                    (rançongiciel, fuite de données) coûte généralement bien plus
                    cher qu&apos;une mise en conformité anticipée.
                  </p>
                  <p>
                    La bonne nouvelle&nbsp;: la démarche CyFun apporte une{" "}
                    <b>valeur de sécurité concrète</b>, pas seulement une case
                    cochée. Vous réduisez réellement votre risque.
                  </p>
                </>
              ),
            },
            {
              question: "Quel niveau CyFun choisir pour ma PME ?",
              answer: (
                <>
                  <p>
                    Pour beaucoup de PME, le niveau <b>Important</b> constitue le
                    bon équilibre entre exigence et effort — c&apos;est le plus
                    courant. Le niveau <b>Basic</b> est un excellent point de
                    départ pour couvrir rapidement l&apos;essentiel (~82&nbsp;%
                    des attaques courantes), tandis que le niveau{" "}
                    <b>Essential</b> s&apos;adresse aux entités « essentielles »
                    NIS2 et aux organisations à forte exigence de sécurité.
                  </p>
                  <p>
                    Le bon niveau dépend de votre catégorie NIS2 et de votre
                    exposition. Lors du <b>cadrage</b>, nous vous recommandons le
                    niveau le plus pertinent — ni surdimensionné, ni insuffisant.
                  </p>
                </>
              ),
            },
          ]}
        />
      </Section>

      {/* ===== Final CTA ===== */}
      <CTABox
        id="contact"
        tint
        title="Sachez où vous en êtes — avant qu'il ne soit trop tard"
        text="30 minutes avec un expert pour identifier votre catégorie NIS2, cadrer le niveau CyFun pertinent et repartir avec des priorités claires. Sans engagement, sans jargon."
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
    </>
  );
}
