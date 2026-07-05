import type { Metadata } from "next";
import {
  LegalLayout,
  LegalCallout,
  LegalSection,
  LegalLink,
} from "@/components/shared/LegalLayout/LegalLayout";
import { TermsVisual } from "@/components/shared/LegalLayout/LegalVisuals";

export const metadata: Metadata = {
  title: "Conditions générales — Smidjan",
  description:
    "Conditions générales de prestation de Smidjan : objet, devis, exécution, responsabilité, confidentialité et droit belge applicable aux missions de cybersécurité.",
  alternates: {
    canonical: "/cgv",
  },
  openGraph: {
    title: "Conditions générales — Smidjan",
    description: "Cadre contractuel des prestations de conseil, d'audit et de développement sécurisé de Smidjan.",
    type: "website",
    url: "https://smidjan.be/cgv",
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
      { "@type": "ListItem", position: 2, name: "Conditions générales", item: "https://smidjan.be/cgv" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function CgvPage() {
  return (
    <>
      <BreadcrumbJsonLd />
      <LegalLayout
        active="cgv"
        eyebrow="Cadre contractuel"
        title="Conditions générales"
        lead="Le cadre applicable aux prestations de conseil, d'audit, de test d'intrusion, de développement sécurisé et d'accompagnement à la conformité fournies par Smidjan."
        visual={<TermsVisual />}
      >
        <p>
          Les présentes conditions générales encadrent les prestations fournies par Smidjan. Elles ne remplacent pas
          le devis ou le contrat signé pour une mission donnée, qui prévaut en cas de contradiction.
        </p>

        <LegalSection id="objet" num="1" title="Objet">
          <p>
            Les présentes conditions générales régissent les prestations de conseil, d&apos;audit, de test
            d&apos;intrusion, de développement sécurisé et d&apos;accompagnement à la conformité (NIS2 /
            CyberFundamentals) fournies par Smidjan à ses clients professionnels.
          </p>
        </LegalSection>

        <LegalSection id="devis" num="2" title="Devis et commande">
          <p>
            Toute prestation fait l&apos;objet d&apos;un devis préalable détaillant le périmètre, les livrables, le
            calendrier indicatif et le prix. La prestation est réputée acceptée à la signature du devis, à sa
            confirmation écrite (y compris par e-mail), ou au versement d&apos;un éventuel acompte.
          </p>
        </LegalSection>

        <LegalSection id="execution" num="3" title="Exécution des prestations">
          <p>
            Smidjan s&apos;engage à exécuter les prestations avec diligence, selon les règles de l&apos;art de la
            profession et les référentiels applicables (notamment OWASP, ISO/IEC 27001, CyberFundamentals). Les
            délais communiqués sont donnés à titre indicatif, sauf engagement contraire explicite dans le devis.
          </p>
          <h3>Prix et modalités de paiement</h3>
          <p>
            Les prix sont établis en euros, hors ou toutes taxes comprises selon indication du devis. Les modalités de
            facturation (acompte éventuel, échéances et jalons) sont précisées dans le devis propre à chaque mission,
            que le client accepte lors de sa signature ou de sa validation par e-mail. Toute somme
            non payée à l&apos;échéance peut donner lieu, après mise en demeure restée sans effet, aux intérêts et
            indemnités prévus par la loi belge du 2&nbsp;août 2002 concernant la lutte contre le retard de paiement
            dans les transactions commerciales, lorsque celle-ci s&apos;applique.
          </p>
        </LegalSection>

        <LegalSection id="responsabilite" num="4" title="Responsabilité">
          <p>
            La responsabilité de Smidjan ne peut être engagée qu&apos;en cas de faute prouvée dans l&apos;exécution
            de ses prestations. Elle est limitée aux dommages directs et prévisibles et, sauf faute lourde ou
            intentionnelle, plafonnée au montant total facturé pour la mission concernée. Smidjan ne saurait être
            tenue responsable des conséquences d&apos;une vulnérabilité non détectée lors d&apos;un audit ou d&apos;un
            test d&apos;intrusion, ces prestations constituant une obligation de moyens et non de résultat.
          </p>
        </LegalSection>

        <LegalSection id="confidentialite" num="5" title="Confidentialité">
          <p>
            Chaque partie s&apos;engage à conserver strictement confidentielles les informations techniques,
            commerciales ou organisationnelles échangées dans le cadre de la mission, pendant toute sa durée et après
            son terme, sauf accord écrit contraire ou obligation légale de divulgation.
          </p>
          <p>
            Les données à caractère personnel traitées à cette occasion le sont conformément à notre{" "}
            <LegalLink href="/confidentialite">politique de confidentialité</LegalLink>.
          </p>
        </LegalSection>

        <LegalSection id="propriete-livrables" num="6" title="Propriété intellectuelle des livrables">
          <p>
            Sauf stipulation contraire dans le devis, les rapports, analyses et recommandations remis au client lui
            sont concédés en usage pour ses besoins internes. Les méthodologies, outils et modèles propres à Smidjan
            demeurent sa propriété. Pour les prestations de développement sur mesure, l&apos;étendue de la cession des
            droits sur le code livré est précisée dans le devis correspondant.
          </p>
        </LegalSection>

        <LegalSection id="resiliation" num="7" title="Résiliation">
          <p>
            En cas de manquement grave d&apos;une partie à ses obligations, non corrigé dans un délai raisonnable
            après mise en demeure écrite, l&apos;autre partie peut résilier la mission en cours, sans préjudice des
            sommes déjà dues pour les travaux réalisés.
          </p>
        </LegalSection>

        <LegalSection id="droit-applicable" num="8" title="Droit applicable et juridiction compétente">
          <p>
            Les présentes conditions générales sont régies par le <strong>droit belge</strong>. Tout litige relatif à
            leur validité, leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux de
            l&apos;arrondissement judiciaire de <strong>Liège</strong>, sous réserve des dispositions impératives
            applicables en matière de protection du consommateur.
          </p>
          <LegalCallout>
            Ce document est un <b>gabarit</b>&nbsp;: il doit être adapté à chaque mission et validé par un juriste
            avant toute utilisation contractuelle. En cas de contradiction, le devis ou contrat signé par les deux
            parties prévaut toujours sur cette trame générique.
          </LegalCallout>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
