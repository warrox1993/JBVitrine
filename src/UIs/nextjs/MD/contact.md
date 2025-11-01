CONTACT.md — Page “Contact” (Smidjan)

Objectif: fournir à Claude Code un brief complet et structuré pour générer la page Contact, cohérente avec la home (dark first, accent orange). Inclut copy FR, structure, validations, états, SEO, accessibilité, tracking, et JSON-LD.

1) Métadonnées & SEO

Title: Contact — Smidjan, agence web, cybersécurité & IA
Meta description: Contactez Smidjan pour un projet web (Next.js/TypeScript/CMS), un audit cybersécurité, ou une automatisation/IA. Réponse sous 24h ouvrées.
Canonical: https://www.smidjan.dev/contact
OG:

og:title: Contact — Smidjan

og:description: Démarrez un projet ou posez vos questions.

og:type: website

og:url: https://www.smidjan.dev/contact

og:image: /og/contact-og.jpg (placeholder)
Robots: index,follow
Breadcrumb: Home > Contact

2) Hero (intro courte)

H1: Parlons de votre projet.
Sub: Performance. Sécurité. Simplicité. Dites-nous ce dont vous avez besoin, on revient vers vous sous 24h ouvrées.
CTA primaire: Démarrer un projet
CTA secondaire: Prendre un rendez-vous

Micro-trust sous le hero:

Réponse sous 24h ouvrées

Devis clair et chiffré

Données protégées (RGPD)

3) Trois chemins de contact (cards)

Utiliser les mêmes styles de cards que la home (coins arrondis, fond sombre, bord accent discret, hover).

Projet & Devis

Texte: “Un site, une refonte, un e-commerce, un audit sécurité ou un POC IA.”

CTA: “Décrire mon besoin” → anchor vers le formulaire.

Support & Questions

Texte: “Une question technique, un bug, un conseil rapide.”

CTA: “Écrire au support” → mailto: jeanbaptiste.dhondt1@gmail.com

Partenariats

Texte: “Agences, studios, freelances : construisons ensemble.”

CTA: “Proposer une collaboration” → anchor vers formulaire (type=Partenariat).

4) Formulaire principal
   4.1 Champs (ordre, labels, placeholders, validations)

Type de demande (select, requis)
Options: Projet/Devis, Support/Question, Partenariat

Nom complet (text, requis, 2–80 chars)
Placeholder: “Ex. Marie Dupont”

Email professionnel (email, requis)
Validation RFC + domaine valide

Téléphone (tel, optionnel, format international)
Placeholder: “+32 4 …”

Entreprise (text, optionnel)

Budget estimé (select, optionnel, bornes claires)
Options: < 2 000 €, 2–5 000 €, 5–10 000 €, 10–25 000 €, > 25 000 €

Délai souhaité (select, optionnel)
Options: ASAP (1–2 semaines), 1 mois, 2–3 mois, > 3 mois

Description du besoin (textarea, requis, 30–1 500 chars)
Placeholder: “Contexte, objectifs, périmètre, exemples…”

Pièce jointe (file, optionnel, max 10 MB, pdf/doc/png/jpg)

Consentement RGPD (checkbox, requis)
Libellé: “J’accepte que Smidjan traite ces informations pour répondre à ma demande. Aucune vente de données. Politique de confidentialité
.”

Honeypot (hidden) + reCAPTCHA (v3 recommandée)

4.2 États & messages

Success
Titre: “Bien reçu.”
Texte: “Merci, on vous répond sous 24h ouvrées. Vous recevrez un accusé par email.”
Option: proposer un créneau Calendly instantané.

Erreur
Titre: “Un souci est survenu.”
Texte: “Réessayez dans quelques minutes, ou écrivez-nous à jeanbaptiste.dhondt1@gmail.com
.”
Afficher détails validation champ par champ.

4.3 Accessibilité

Labels explicites reliés aux inputs

aria-invalid sur erreurs, messages associés via aria-describedby

Contraste AA/AAA respecté (dark & light)

Focus visible, ordre logique tabulation

Erreurs lisibles par lecteurs d’écran

4.4 Tracking (data-attributes)

data-analytics="contact-form" sur <form>

data-cta="submit-contact" sur le bouton

Événements: contact_submit_attempt, contact_submit_success, contact_submit_error

5) Coordonnées & infos pratiques

Bloc latéral (ou sous le formulaire) en card:

Email: jeanbaptiste.dhondt1@gmail.com

Support: jeanbaptiste.dhondt1@gmail.com

Téléphone: +32 …

Adresse: Liège, Belgique (RDV sur demande)

Horaires: Lun–Ven, 9:00–18:00 (UTC+1)

CTA tertiaire: “Planifier un appel de découverte” (Calendly).

6) Carte / zone de services

Option 1 (embed) ou placeholder statique (web-perf friendly).
Texte court: “Nous travaillons à Liège et à distance (Belgique, Europe).”

7) FAQ courte (accordéons, même style que “Processus Créatif”)

Sous combien de temps répondez-vous ?
Sous 24h ouvrées. Pour les urgences, précisez-le dans le formulaire.

Travaillez-vous avec des petites structures ?
Oui. Nos offres s’adaptent au périmètre et au budget.

Proposez-vous des audits sécurité seuls ?
Oui. Audit, durcissement, et monitoring sont disponibles à la carte.

Pouvez-vous reprendre un projet existant ?
Oui, après un audit technique rapide pour cadrer les risques.

8) Bandeau final (CTA fort)

Titre: Prêt à avancer proprement ?
Texte: Décrivez votre besoin en 2 minutes, on s’occupe du reste.
Bouton: Démarrer un projet → ancre formulaire

9) Style & UI (rappel de cohérence)

Thème: dark-mode par défaut, compatible light-mode existant.

Accents: orange identique à la home pour CTAs/hover.

Cards: mêmes rayons, ombres légères, bord subtil.

Typo: hiérarchie identique (H1/H2/H3, interlignage généreux).

Spacing: cohérent avec la grille de la home (sections aérées).

10) Données structurées (JSON-LD)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact — Smidjan",
  "url": "https://www.smidjan.dev/contact",
  "about": {
    "@type": "Organization",
    "name": "Smidjan",
    "url": "https://www.smidjan.dev",
    "email": "jeanbaptiste.dhondt1@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Liège",
      "addressCountry": "BE"
    },
    "sameAs": [
      "https://www.linkedin.com/company/smidjan"
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "jeanbaptiste.dhondt1@gmail.com",
    "availableLanguage": ["fr", "en"],
    "areaServed": "EU"
  }
}
</script>

11) API & backend (pour Claude)

POST /api/contact
Body JSON:

{
"type": "projet|support|partenariat",
"name": "string",
"email": "string",
"phone": "string|null",
"company": "string|null",
"budget": "<2000|2-5k|5-10k|10-25k|>25k|null",
"timeline": "asap|1m|2-3m|>3m|null",
"message": "string",
"attachment": "base64|null",
"consent": true,
"utm": { "source": "string|null", "campaign": "string|null" }
}


Réponses

200: { "ok": true, "ticketId": "C-2025-00123" }

400: { "ok": false, "fieldErrors": { ... } }

500: { "ok": false, "message": "temporary_error" }

Email d’accusé (template simple, ton pro, recap des champs + délais).

12) Textes (copy FR réutilisables)

Hero.sub: “Performance. Sécurité. Simplicité. Dites-nous ce dont vous avez besoin, on revient vers vous sous 24h ouvrées.”

Card projet: “Un site, une refonte, un e-commerce, un audit sécurité ou un POC IA.”

Consentement: “J’accepte que Smidjan traite ces informations pour répondre à ma demande. Aucune vente de données.”

Success: “Merci, c’est bien reçu. Vous aurez un retour sous 24h ouvrées.”

Erreur: “Un souci est survenu. Réessayez plus tard ou écrivez-nous à jeanbaptiste.dhondt1@gmail.com
.”

13) Tests à prévoir

Soumission valide sans pièce jointe

Pièce jointe > 10 MB → erreur propre

Email invalide → message ciblé

reCAPTCHA manquant → erreur

Honeypot rempli → rejet silencieux

Contraste et navigation clavier vérifiés (dark & light)

14) Liens de navigation

Fil d’Ariane: Accueil → Contact

Footer: mentions légales, confidentialité, sécurité, statut des services (si présent)

15) Notes d’implémentation

Réutiliser les composants “Card”, “Accordion”, “Button” et “Input” existants de la home.

Les ancres #form et #rendezvous doivent scroller en douceur.

Prévoir un prefetch du module reCAPTCHA au hover du bouton principal.

Fin du fichier.