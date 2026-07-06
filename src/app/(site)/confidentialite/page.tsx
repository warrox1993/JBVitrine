import type { Metadata } from "next";
import {
  LegalLayout,
  LegalSection,
  LegalLink,
  LegalTable,
} from "@/components/shared/LegalLayout/LegalLayout";
import { PrivacyVisual } from "@/components/shared/LegalLayout/LegalVisuals";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD) | Smidjan",
  description:
    "Politique de confidentialité de Smidjan : données collectées via le formulaire de contact, finalités, durée de conservation, cookies & services tiers, et vos droits RGPD.",
  alternates: {
    canonical: "/confidentialite",
  },
  openGraph: {
    title: "Politique de confidentialité (RGPD) | Smidjan",
    description: "Comment Smidjan traite vos données personnelles, en toute transparence sur les cookies et services tiers.",
    type: "website",
    url: "https://smidjan.be/confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function BreadcrumbJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://smidjan.be/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Politique de confidentialité",
        item: "https://smidjan.be/confidentialite",
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function ConfidentialitePage() {
  return (
    <>
      <BreadcrumbJsonLd />
      <LegalLayout
        active="confidentialite"
        eyebrow="Protection des données"
        title="Politique de confidentialité (RGPD)"
        lead="Ce que nous collectons via le formulaire de contact, pourquoi, combien de temps, avec qui, et une réponse honnête sur les cookies et services tiers utilisés."
        visual={<PrivacyVisual />}
      >
        <p>
          Smidjan attache de l&apos;importance à la protection des données à caractère personnel des visiteurs et
          clients du site, conformément au Règlement (UE) 2016/679 du 27&nbsp;avril 2016 (« RGPD ») et à la loi belge
          du 30&nbsp;juillet 2018 relative à la protection des personnes physiques à l&apos;égard des traitements de
          données à caractère personnel.
        </p>

        <LegalSection id="responsable" num="1" title="Responsable de traitement">
          <p>
            Le responsable du traitement des données collectées via ce site est Smidjan, Liège, Belgique :{" "}
            <LegalLink href="mailto:contact@smidjan.be">contact@smidjan.be</LegalLink>.
          </p>
        </LegalSection>

        <LegalSection id="donnees" num="2" title="Données collectées">
          <ul>
            <li>
              <strong>Formulaire de contact / demande de diagnostic&nbsp;:</strong> nom, prénom, société (facultatif),
              adresse e-mail, numéro de téléphone (facultatif), contenu du message.
            </li>
            <li>
              <strong>Données de navigation&nbsp;:</strong> adresse IP, type de navigateur et d&apos;appareil, pages
              consultées, collectées à des fins de sécurité et, le cas échéant, de mesure d&apos;audience.
            </li>
            <li>
              <strong>Données issues de Google reCAPTCHA&nbsp;:</strong> signaux techniques utilisés pour distinguer
              un utilisateur humain d&apos;un robot lors de l&apos;envoi du formulaire de contact.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="finalites" num="3" title="Finalités du traitement">
          <ul>
            <li>Répondre aux demandes de contact, de devis ou de diagnostic gratuit&nbsp;;</li>
            <li>
              Assurer la sécurité et l&apos;intégrité du formulaire de contact (protection anti-spam et anti-robot)
              &nbsp;;
            </li>
            <li>Mesurer et améliorer l&apos;usage du site, le cas échéant, au moyen d&apos;outils de statistiques.</li>
          </ul>
        </LegalSection>

        <LegalSection id="base-legale" num="4" title="Base légale">
          <ul>
            <li>
              L&apos;<strong>exécution de mesures précontractuelles</strong> prises à la demande de la personne
              concernée, pour le traitement des demandes de contact&nbsp;;
            </li>
            <li>
              L&apos;<strong>intérêt légitime</strong> de Smidjan à sécuriser son formulaire et son site contre les
              abus (reCAPTCHA)&nbsp;;
            </li>
            <li>
              Le <strong>consentement</strong> de l&apos;utilisateur, lorsqu&apos;il est requis pour des cookies de
              mesure d&apos;audience non essentiels.
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="duree" num="5" title="Durée de conservation">
          <p>
            Les données transmises via le formulaire de contact sont conservées pendant une durée de{" "}
            <strong>3&nbsp;ans à compter du dernier échange</strong>, sauf obligation légale de conservation plus
            longue (notamment comptable) ou relation contractuelle en cours.
          </p>
        </LegalSection>

        <LegalSection id="destinataires" num="6" title="Destinataires des données">
          <p>
            Les données sont traitées par le personnel habilité de Smidjan et, le cas échéant, par ses sous-traitants
            techniques (hébergement, messagerie, outils anti-spam et de mesure d&apos;audience). Elles ne sont ni
            vendues, ni louées, ni cédées à des tiers à des fins commerciales.
          </p>
        </LegalSection>

        <LegalSection id="cookies" num="7" title="Cookies & services tiers">
          <p>
            Ce site n&apos;est pas exempt de cookies ni de traceurs&nbsp;: nous ne prétendons pas fonctionner « sans
            aucun cookie ». Les catégories suivantes peuvent être utilisées&nbsp;:
          </p>
          <LegalTable>
            <thead>
              <tr>
                <th>Type</th>
                <th>Finalité</th>
                <th>Base légale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cookies techniques essentiels</td>
                <td>Fonctionnement de base du site</td>
                <td>Intérêt légitime / nécessaire au service</td>
              </tr>
              <tr>
                <td>Google reCAPTCHA (Google LLC)</td>
                <td>Protection du formulaire de contact contre les robots et les abus</td>
                <td>Intérêt légitime</td>
              </tr>
            </tbody>
          </LegalTable>
          <p>
            À ce jour, le site n&apos;utilise <strong>aucun outil de mesure d&apos;audience (analytics)</strong> ni
            cookie publicitaire. Si un tel outil était mis en place, cette politique serait mise à jour en conséquence.
          </p>
          <p>
            Certains de ces services, notamment Google reCAPTCHA, sont fournis par des tiers établis hors de
            l&apos;Union européenne (États-Unis) et peuvent impliquer un transfert de données correspondant. Ces
            transferts s&apos;appuient sur les garanties prévues par le RGPD, telles que les clauses contractuelles
            types de la Commission européenne. Vous pouvez à tout moment configurer votre navigateur pour bloquer ou
            supprimer les cookies non essentiels&nbsp;; cela peut toutefois limiter certaines fonctionnalités du site
            (par exemple l&apos;envoi du formulaire de contact).
          </p>
        </LegalSection>

        <LegalSection id="droits" num="8" title="Vos droits">
          <p>
            Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants sur vos données&nbsp;: droit
            d&apos;accès, de rectification, d&apos;effacement, de limitation du traitement, de portabilité,
            d&apos;opposition, ainsi que le droit de retirer votre consentement à tout moment lorsque le traitement en
            dépend.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à l&apos;adresse{" "}
            <LegalLink href="mailto:contact@smidjan.be">contact@smidjan.be</LegalLink>. Une réponse vous sera
            apportée dans les délais prévus par le RGPD.
          </p>
          <p>
            Vous disposez également du droit d&apos;introduire une réclamation auprès de l&apos;autorité de contrôle
            belge&nbsp;: <strong>Autorité de protection des données (APD)</strong>, Rue de la Presse 35, 1000
            Bruxelles :{" "}
            <LegalLink href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener">
              www.autoriteprotectiondonnees.be
            </LegalLink>
            .
          </p>
        </LegalSection>

        <LegalSection id="dpo" num="9" title="Contact délégué à la protection des données">
          <p>
            Compte tenu de sa taille et de la nature de ses traitements, Smidjan n&apos;a pas désigné de délégué à la
            protection des données (DPO) formel, cette désignation n&apos;étant pas obligatoire dans son cas. Toute
            question relative au traitement de vos données peut être adressée à{" "}
            <LegalLink href="mailto:contact@smidjan.be">contact@smidjan.be</LegalLink>.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
