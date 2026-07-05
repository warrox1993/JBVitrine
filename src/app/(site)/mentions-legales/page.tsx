import type { Metadata } from "next";
import {
  LegalLayout,
  LegalBanner,
  LegalSection,
  LegalCallout,
  LegalLink,
  Placeholder,
} from "@/components/shared/LegalLayout/LegalLayout";
import { MentionsVisual } from "@/components/shared/LegalLayout/LegalVisuals";

export const metadata: Metadata = {
  title: "Mentions légales — Smidjan | Cybersécurité Liège",
  description:
    "Mentions légales de Smidjan : identification de l'éditeur, responsable de publication, hébergement (Vercel) et propriété intellectuelle du site.",
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: {
    title: "Mentions légales — Smidjan",
    description: "Identification de l'éditeur, hébergement et propriété intellectuelle du site Smidjan.",
    type: "website",
    url: "https://smidjan.be/mentions-legales",
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
      { "@type": "ListItem", position: 2, name: "Mentions légales", item: "https://smidjan.be/mentions-legales" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function MentionsLegalesPage() {
  return (
    <>
      <BreadcrumbJsonLd />
      <LegalLayout
        active="mentions"
        eyebrow="Informations légales"
        title="Mentions légales"
        lead="L'identité de l'éditeur du site, le responsable de sa publication, son hébergeur et les règles de propriété intellectuelle applicables."
        visual={<MentionsVisual />}
      >
        <LegalBanner>
          <b>Modèle — à faire valider juridiquement avant mise en ligne.</b> Le texte ci-dessous constitue une trame
          standard pour une PME belge de services numériques. Les champs marqués{" "}
          <Placeholder>à compléter</Placeholder> doivent être renseignés, et l&apos;ensemble doit être relu par un
          juriste ou un conseil spécialisé avant publication définitive.
        </LegalBanner>

        <LegalSection id="editeur" num="1" title="Éditeur du site">
          <p>Le présent site est édité par Smidjan, société active en cybersécurité établie à Liège, Belgique.</p>
          <ul>
            <li>
              <strong>Dénomination&nbsp;:</strong> Smidjan (forme juridique <Placeholder>SRL — à confirmer</Placeholder>)
            </li>
            <li>
              <strong>Siège&nbsp;:</strong> <Placeholder>Adresse complète — à préciser</Placeholder>, Liège, Belgique
            </li>
            <li>
              <strong>Numéro d&apos;entreprise (BCE)&nbsp;:</strong>{" "}
              <Placeholder>Numéro BCE — à compléter</Placeholder>
            </li>
            <li>
              <strong>Numéro de TVA intracommunautaire&nbsp;:</strong>{" "}
              <Placeholder>Numéro de TVA — à compléter</Placeholder>
            </li>
            <li>
              <strong>E-mail&nbsp;:</strong>{" "}
              <LegalLink href="mailto:contact@smidjan.be">contact@smidjan.be</LegalLink>
            </li>
            <li>
              <strong>Téléphone&nbsp;:</strong> <LegalLink href="tel:+3242680000">+32 (0)4 268 00 00</LegalLink>
            </li>
          </ul>
          <LegalCallout>
            En toute transparence&nbsp;: à la date de rédaction de cette page, Smidjan n&apos;a pas encore finalisé
            son immatriculation (BCE/TVA). <b>Aucun numéro d&apos;entreprise ne doit être publié tant qu&apos;il
            n&apos;est pas officiellement attribué.</b> Ces informations seront complétées dès leur obtention, et
            avant toute mise en ligne définitive du site.
          </LegalCallout>
        </LegalSection>

        <LegalSection id="responsable-publication" num="2" title="Responsable de la publication">
          <p>
            Jean-Baptiste Dhondt, fondateur de Smidjan, agit en qualité de responsable de la publication du présent
            site.
          </p>
        </LegalSection>

        <LegalSection id="hebergement" num="3" title="Hébergement">
          <p>
            Le site est hébergé par&nbsp;: <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis — <LegalLink href="https://vercel.com" target="_blank" rel="noopener">vercel.com</LegalLink>.
          </p>
          <p>
            L&apos;hébergement peut impliquer un traitement de données techniques sur une infrastructure distribuée
            (« edge network ») dont certains nœuds sont situés hors de l&apos;Union européenne&nbsp;; voir la section
            « Cookies &amp; services tiers » de la{" "}
            <LegalLink href="/confidentialite#cookies">politique de confidentialité</LegalLink> pour le détail de ces
            transferts.
          </p>
        </LegalSection>

        <LegalSection id="propriete-intellectuelle" num="4" title="Propriété intellectuelle">
          <p>
            L&apos;ensemble des éléments du présent site (textes, structure, graphismes, logo, code source) est
            protégé par le droit belge et international de la propriété intellectuelle et demeure la propriété de
            Smidjan, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale
            ou partielle, sans autorisation écrite préalable, est interdite.
          </p>
          <h3>Limitation de responsabilité</h3>
          <p>
            Malgré le soin apporté à la rédaction de ce site, Smidjan ne peut garantir l&apos;exactitude, la
            complétude ou l&apos;actualité permanente des informations qui y sont diffusées, et ne saurait être tenue
            responsable des conséquences d&apos;une utilisation de ces informations, ni des interruptions ou
            dysfonctionnements techniques indépendants de sa volonté.
          </p>
        </LegalSection>

        <LegalSection id="contact" num="5" title="Contact">
          <p>
            Pour toute question relative au site ou à son contenu&nbsp;:{" "}
            <LegalLink href="mailto:contact@smidjan.be">contact@smidjan.be</LegalLink>.
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
