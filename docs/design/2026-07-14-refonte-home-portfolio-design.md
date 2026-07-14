# Refonte home Smidjan : vitrine pro / portfolio (cyber / GRC)

Date : 2026-07-14
Auteur : Jean-Baptiste Dhondt (Smidjan)
Statut : spec de design validée section par section, en attente de relecture avant plan d'implémentation.

## 1. Intention et cadrage

### But réel du site
smidjan.be devient une **vitrine professionnelle / portfolio honnête**, pas une vitrine commerciale d'expert cyber établi. Elle doit :

- servir **en priorité** la recherche d'un **poste salarié GRC / cybersécurité** (objectif 12 mois) ;
- rester crédible pour un **petit client** éventuel ;
- ne **rien inventer** : ni faux client, ni faux chiffre, ni certification non détenue.

### Principe éditorial non négociable
Le site parle sous le nom de **Jean-Baptiste Dhondt** ; **Smidjan** est le nom de sa pratique (« la forge »). Positionnement : **cyber / GRC en tête**, l'automatisation IA et le dev web présentés comme compétences au service de la cyber. L'**outil CyFun** est la preuve centrale.

### Contraintes dures
- **Zéro tiret cadratin** « — » (U+2014) ni tiret demi-cadratin « – » (U+2013) comme séparateur, dans toute copie visible. Repunctuer (deux-points, point, virgule, parenthèses). Les traits d'union `-` des mots composés (cyber-first) restent autorisés.
- **Honnêteté** : jamais de « certifié / accrédité » NIS2/ISO (JB n'est pas BELAC, pas Lead Implementer). Formuler en « expertise / méthodologie alignée / préparation / assistance ». Pas de client nommé tant qu'il n'y en a pas de réel et accordé.
- **Confidentialité de l'outil CyFun** : présenter uniquement les bénéfices publiables (voir §5). Ne jamais révéler la stack technique, l'architecture interne, les ratios de couverture, les IDs de contrôles, les seuils de scoring, les mécaniques bootable-USB au-delà du bénéfice « aucune donnée conservée ».

## 2. Identité visuelle (thème clair uniquement)

Le thème sombre est retiré du parcours de décision : **clair uniquement**.

### Palette « Émeraude & Ardoise »
| Rôle | Token proposé | Valeur |
|------|---------------|--------|
| Fond page | `--color-bg` | `#F5F8F7` (porcelaine froide) |
| Surface / cartes | `--color-surface`, `--color-surface-solid` | `#FFFFFF` |
| Fond alt / tint | `--color-bg-alt` | `#EDF3F1` |
| Encre (texte 1) | `--color-text` | `#0C1A16` (ardoise profonde) |
| Texte 2 | `--color-text-muted` | `#4A5C55` (gris-vert) |
| Accent primaire | `--color-primary` | `#0B7A5B` (émeraude) |
| Accent hover / strong | `--color-primary-strong` | `#059669` |
| Halo / glow doux | `--color-glow` | `#D6F0E5` (mint) |
| Bordure | `--color-border` | `rgba(12,26,22,0.10)` |

Notes :
- L'accent émeraude remplace intégralement l'orange `#e86e10` et le bleu `#2563eb` actuels.
- Les glows/ombres orange (`--shadow-glow-*`, `--color-primary-*`) sont remappés sur l'émeraude.
- Contraste AA à vérifier : encre `#0C1A16` sur `#F5F8F7`, blanc sur émeraude `#0B7A5B` (boutons), texte-2 sur fonds.

### Typographie
- **Titres** : Space Grotesk (Semibold / Bold). `--font-display`.
- **Corps** : Inter (Regular / Medium). `--font-base`.
- **Labels / stats / eyebrows / terminal** : JetBrains Mono (Medium). Nouveau token `--font-mono`.
- Toutes auto-hébergées via `next/font` (pas de dépendance CDN, pas de CLS).

### Logo
Le bouclier + check existant (aujourd'hui navy `#0b1f3a` + orange `#ff6a00`) est **repalettisé** : fond ardoise `#0C1A16` (ou navy conservé si contraste meilleur), tracé + check en émeraude `#0B7A5B`. Le wordmark passe en Space Grotesk.

### Animations / polish
- Reveal doux au scroll (composant `Reveal` existant, réutilisé).
- Hover cartes : lift léger + halo émeraude + glissement de flèche.
- Transitions tokenisées (`--transition-*`), respect de `prefers-reduced-motion`.
- Pas d'effet tape-à-l'œil : fluidité et cohérence avant tout.

### Périmètre d'application
On modifie les **tokens globaux une seule fois** (couleurs + typo dans `variables.css` / `globals.css`), ce qui bénéficie à tout le site. Dans ce chantier, on retravaille **visuellement la home**. Le déploiement site-wide (relecture des autres pages) se fait **après** validation de la home.

## 3. Animation signature : fusion « whoami »

Pièce maîtresse du hero (visuel vivant à droite du split). Terminal en JetBrains Mono, curseur clignotant, séquence ~2 s, rejouable au hover, désactivée sous `prefers-reduced-motion` (affiche l'état final statique).

Séquence :
```
> whoami
Jean-Baptiste Dhondt
> role
Cyber / GRC · Wallonie
> smidjan --init
[ ◢✓◣ ] bouclier se dessine… ok
```
- Le bouclier Smidjan se **dessine trait par trait** (SVG path draw) en émeraude à la dernière ligne, faisant le lien nom → pratique.
- Accessibilité : le contenu texte reste lisible (pas seulement décoratif), fallback statique, contrastes AA.

## 4. Structure de la home (6 blocs)

Chaque bloc va droit au but. La home « donne l'eau à la bouche » et renvoie vers les pages profondes (`/services`, `/conformite-nis2`, `/approche`, `/agence`, `/contact`).

### Bloc 1 : Hero (split éditorial + visuel vivant)
- Gauche : eyebrow mono, titre, accroche, CTA principal (« Me contacter » → `/contact`) + CTA secondaire (« Mon parcours » → `/approche` ou ancre), ligne de confiance = **faits réels** (Défense télécom · AZ-900 · Bachelier Info en cours).
- Droite : animation **whoami → bouclier** (§3).

**Copy (version sobre validée, tirets cadratins retirés) :**
> Sécuriser, c'est mon obsession depuis l'adolescence. Très tôt, par nécessité, j'ai appris à comprendre les systèmes de l'intérieur plutôt qu'à les subir. Cette logique ne m'a jamais quittée : de la Défense aux certifications, jusqu'à aujourd'hui où je construis les compétences et les outils pour sécuriser des infrastructures entières. Réseaux, applications, IA.
>
> Smidjan, c'est cette trajectoire rendue visible. Pas une agence qui vend du chiffre gonflé : un praticien qui montre son travail, ce qu'il sait faire et ce qu'il ne sait pas encore.

### Bloc 2 : Ce que je sais faire (cartes index mono)
Format : cartes « index éditorial » (numéro mono `01`, titre Space Grotesk, une ligne, flèche ; hover lift + halo). Présentées en **capacités**, pas en services tarifés. Ordre cyber-first :
- `01` **Cyber / GRC** : audits NIS2/CyFun sur référentiels réels, gouvernance, méthodologie. → `/conformite-nis2`
- `02` **Automatisation IA** : orchestration d'outils, workflows (n8n / Make), prompt engineering. → `/services`
- `03` **Dev web sécurisé** : développement assisté, sécurisation du code (bootcamp Full Stack, stages Java/.NET). → `/services`

Microcopy des lignes : à finaliser à l'implémentation (honnête, factuelle).

### Bloc 3 : Projet phare, l'outil CyFun
Bloc dédié, présenté comme **un projet que JB construit** (pas un produit fini commercialisé). Bénéfices publiables uniquement :
- moteur d'audit **aligné CyFun** ;
- **read-only** : ne modifie jamais les systèmes ;
- **périmètre explicite** (pas de découverte réseau autonome) ;
- identifiants **jamais stockés** ;
- journal d'audit **inviolable** (tamper-evident) ;
- remédiation **validée par un humain**, jamais auto-exécutée ;
- **aucune donnée client conservée** après l'audit ;
- chaîne claire : rapport → remédiation priorisée → durcissement.
- Mention d'honnêteté : **auto-évaluation assistée + préparation**, pas une certification officielle (réservée aux organismes BELAC).

Lien : « En savoir plus » → `/conformite-nis2` (section `methode-audit`).

### Bloc 4 : Parcours
Timeline verticale, faits vérifiables uniquement :
- 2013-2017 : Technicien télécom, Défense belge.
- 2022-2023 : Agent de sécurité, Commission européenne.
- 2025 : Bootcamp Java Full Stack (TechnoFutur TIC) ; stages Java/.NET (Atypical Consulting).
- Aujourd'hui : Bachelier Informatique (promotion sociale, ISL) en parallèle d'un emploi ; cap **GRC / cyber**.
- Certifications : **AZ-900** (jan. 2026) ; **CCNA en cours** ; Bac 1 Informatique validé (juin 2026).

À trancher à l'implémentation : niveau de détail de l'emploi actuel (agent administratif au recouvrement, CPAS de Liège) ; formulation « en reconversion » vs intitulé exact. Recommandation : mettre en avant la reconversion déterminée sans détailler le poste non-cyber.

### Bloc 5 : Approche / valeurs
**Copy validée (version sobre + parties inchangées, tirets cadratins retirés) :**

> **D'où ça vient**
>
> Adolescent, dans un environnement contraint, j'ai appris à comprendre comment fonctionnent les systèmes plutôt qu'à les subir. Pas par curiosité abstraite : par nécessité. C'est là que j'ai pris goût à ouvrir le capot, à voir comment les choses tiennent, ou cèdent.
>
> Cette logique ne m'a jamais quittée. Elle s'est structurée avec le temps : découverte technique en environnement contraint, puis TryHackMe, puis une formation orientée sécurisation du code.
>
> **Ce qui me pousse**
>
> Sécuriser au maximum, c'est un moteur personnel avant d'être un argument commercial. Réseau, applicatif, infrastructure, IA : je veux comprendre et verrouiller chaque couche, pas me spécialiser dans une seule case.
>
> **Comment je travaille**
>
> Smidjan est jeune : pas encore de portefeuille clients à afficher, pas de faux chiffres pour compenser. Ce que je propose : une méthodologie rigoureuse, des audits NIS2/CyFun construits sur des référentiels réels, et une transparence totale sur où j'en suis. Ce que je sais faire, je le montre avec des preuves vérifiables. Ce que je ne sais pas encore faire, je ne le prétends pas.

Le bloc complet vit sur `/approche` ; la home en montre un extrait fort (« D'où ça vient » condensé + lien).

### Bloc 6 : Contact
CTA final : me joindre pour une mission, un poste, une collaboration. Coordonnées réelles (§6). Réassurance sobre (transparence, réponse dès que possible).

### Blocs retirés / déplacés de la home actuelle
- Quiz NIS2 complet (`NIS2Checker`) : retiré de la home (alourdit un portfolio), déplacé sur `/conformite-nis2`.
- FAQ, Transparence/Honesty séparée, Insight teaser, Process 4 étapes, tiers CyFun, TrustStrip : descendent dans les pages profondes.
- Passage de ~11 sections à **6**.

## 5. Coordonnées réelles (footer / contact / schema)
- Email : jeanbaptiste.dhondt1@gmail.com
- Téléphone : 0475 20 55 62
- Zone : Wallonie
- Langue : français
- Délai de réponse : dès que possible

Note : aligner `schema.ts`, `constants.ts`, footer et métadonnées sur ces valeurs (remplace les placeholders `+32 (0)4 268 00 00`, `contact@smidjan.be`, adresse Liège 4000). Pas de TVA/BCE affichée (structure non immatriculée).

## 6. Ce qui reste à finaliser à l'implémentation
- Microcopy des 3 cartes « Ce que je sais faire ».
- Formulation exacte du bloc CyFun (dans les limites de confidentialité).
- Niveau de détail du parcours (emploi actuel).
- Traductions NL/EN (le site est i18n ; à mettre à jour dans `messages/{fr,nl,en}.json` + `_ns`). Le chantier peut démarrer en FR puis propager.

## 7. Hors périmètre de ce chantier
- Refonte visuelle des autres pages (faite après validation home, via tokens globaux).
- Nouvelle immatriculation / mentions légales / TVA.
- Toute affirmation de certification ou de référence client non réelle.
