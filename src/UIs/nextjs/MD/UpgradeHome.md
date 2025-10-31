1) But

Remplacer la section “Preuve sociale” actuelle (logos + faux témoignage) par une section persuasive “premiers partenaires”, honnête et orientée conversion.

2) Périmètre

Page : Homepage

Section : Preuve sociale (garder l’ancre/ID existant si déjà utilisé dans le CSS/JS).

Supprimer :

Tout témoignage fictif (avatar, nom, fonction, citation).

Tout logo non autorisé ou placeholder.

Conserver :

Thème (couleurs, typo, espacement) et rythme visuel de la home.

3) Contenu final — copie exacte

Utiliser exactement les textes suivants.

3.1 Titre (H2)
Devenir partenaire d’une agence, c’est choisir une vision.

3.2 Paragraphe (lead)
Nous lançons actuellement nos premiers projets clients — et nous cherchons des marques prêtes à co-construire cette nouvelle génération de sites : plus rapides, plus sûrs, plus intelligents.

3.3 Ligne d’aspiration (conclusion)
Vous serez peut-être le premier à partager votre expérience Smidjan.

3.4 CTA (secondaire, discret mais actionnable)

Libellé :

Démarrer un projet


Lien : conserver le pattern actuel (ex. ancre vers la page Contact ou vers un formulaire de prise de brief).

Note : un seul CTA suffit ici. Ne pas ajouter de lien “laisser un commentaire/avis”.

4) Comportement UI / Layout

Structure : section → container → H2 → lead paragraph → conclusion → CTA.

Alignement : centré (texte et CTA).

Largeur : container textuel à max-width 60–72ch.

Espacement :

Entre H2 et paragraphe : 12–16px.

Entre paragraphe et conclusion : 12–16px.

Entre conclusion et CTA : 20–28px.

Style :

H2 dans la hiérarchie typographique habituelle.

Paragraphe lead avec légère augmentation de taille/hauteur de ligne (cohérente avec le thème).

Conclusion en italique légère ou opacité réduite (sans effet “citation client”).

CTA en style secondaire (outline ou ghost), pas le CTA principal du hero.

5) Accessibilité & SEO

Balises : section[aria-labelledby="premiers-partenaires-title"] + h2#premiers-partenaires-title.

Contraste : respecter les ratios existants.

Sémantique : ne pas utiliser blockquote (ce n’est pas un témoignage).

Liens : le CTA a un aria-label descriptif si besoin (ex. aria-label="Démarrer un projet avec Smidjan").

6) Responsive

Mobile : centrage, marges généreuses, lignes courtes.

Desktop : même structure, aucune grille multi-colonne requise.

Pas d’images/logos dans cette version.

7) Critères d’acceptation (checklist)

Aucun témoignage (nom/fonction/avatar/citation attribuée) présent dans le DOM.

Aucun logo fictif/placeholder rendu.

Le H2 exact “Devenir partenaire d’une agence, c’est choisir une vision.” est visible et centré.

Le paragraphe exact est visible, centré, en style lead.

La ligne de conclusion “Vous serez peut-être le premier à partager votre expérience Smidjan.” est visible, distincte et non stylée comme un témoignage.

Un seul CTA “Démarrer un projet” est présent, centré, style secondaire.

Pas de régression de mise en page (spacing/rythme cohérents avec la home).

Aucune chute de scores Core Web Vitals (CLS/INP) après la modification.

8) Exemple d’implémentation (React/Next + Tailwind, indicatif)

À adapter à ta base de composants/utilitaires.

<section
  id="premiers-partenaires"
  aria-labelledby="premiers-partenaires-title"
  className="section"
>
  <div className="container mx-auto max-w-3xl text-center">
    <h2 id="premiers-partenaires-title" className="text-balance">
      Devenir partenaire d’une agence, c’est choisir une vision.
    </h2>

    <p className="mt-3 text-pretty opacity-90">
      Nous lançons actuellement nos premiers projets clients — et nous cherchons des marques prêtes à co-construire cette nouvelle génération de sites : plus rapides, plus sûrs, plus intelligents.
    </p>

    <p className="mt-3 italic opacity-80">
      Vous serez peut-être le premier à partager votre expérience Smidjan.
    </p>

    <div className="mt-6">
      <a
        href="/contact"
        aria-label="Démarrer un projet avec Smidjan"
        className="inline-flex items-center rounded-2xl border px-5 py-2 transition hover:opacity-90"
      >
        Démarrer un projet
      </a>
    </div>
  </div>
</section>

9) Nettoyage technique

Supprimer imports/composants liés au témoignage et aux logos.

Supprimer les styles spécifiques “testimonial/card” inutiles.

Mettre à jour tests visuels/snapshots éventuels.

10) Évolutions futures (quand tu auras des preuves)

La section est pensée pour évoluer sans casser le layout :

Remplacer la conclusion par 1–2 témoignages authentiques.

Ajouter une ligne de stats (ex. “−43 % TTFB”, “+18 pts Lighthouse Performance”).

Ajouter un bandeau de logos réels au-dessus du H2 (facultatif), en conservant le même espacement vertical.

Résumé opérationnel

Retirer témoignage/logo fictifs.

Injecter H2 + lead + conclusion + CTA (copie exacte ci-dessus).

Centrer, respecter spacing/couleurs/typos existants.

Vérifier la checklist et les Core Web Vitals.

Cette version transforme l’absence de témoignages en invitation à devenir partenaire fondateur, tout en préservant ton positionnement premium.
Étape suivante naturelle : on fait le même traitement de précision pour la section d’appel final avant le footer, afin d’augmenter encore la conversion.