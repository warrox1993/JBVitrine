1️⃣ Service_Creation.md
# SMIDJAN — PAGE SERVICES (.md POUR CODEX)
**Rôle exigé : web-designer senior / intégrateur Next.js confirmé**  
**Objectif :** créer la page `/services` dans la continuité directe du design et de la narration de la Home et de la page About.  
**Langage :** Français.  
**Style :** narratif, verbeux, professionnel et clair.  
**But :** présenter les domaines d’expertise de SMIDJAN, même sans projets clients concrets, en misant sur la méthode, la rigueur et la valeur technique.

---

## 0) Règles générales
- Conserver le **header**, le **footer** et le **design global** de la Home/About.
- Réutiliser **les mêmes tokens CSS**, **les mêmes animations de boutons**, et **le même espacement vertical**.
- **Aucune duplication** de styles ou de composants : tout doit venir du design système existant.
- Les textes doivent être **très verbeux**, riches, explicatifs, rédigés à la manière d’un manifeste technique.
- Créer une **sidebar propre à la page Services** (voir `Service_Sidebar.md`).
- La Home et About restent inchangées.

---

## 1) Structure technique
Créer la page :  
`src/app/services/page.tsx`

Créer les composants :


HeroServices.tsx
Domains.tsx
MethodSummary.tsx
Tools.tsx
Guarantees.tsx
CTA.tsx


Chaque composant est verbeux, sémantique, et balisé avec `<section>` et `<h2>` / `<p>`.

---

## 2) Sidebar Services (ordre officiel des ancres)

| Ordre | Section | ID utilisé | Libellé sidebar |
|---:|---|---|---|
| 1 | Hero | `#services-hero` | Introduction |
| 2 | Domaines | `#domains` | Domaines d’expertise |
| 3 | Méthode | `#method` | Notre méthode |
| 4 | Outils | `#tools` | Outils & technologies |
| 5 | Garanties | `#guarantees` | Garanties & engagements |
| 6 | CTA | `#cta` | Contact |

---

## 3) Contenu détaillé

### 3.1 HERO — `#services-hero`
**Titre (H1)** : “Nos domaines d’expertise”  
**Texte verbeux :**
> “SMIDJAN réunit la rigueur du code et la clarté du design pour construire des expériences digitales durables.  
> Notre rôle n’est pas seulement de coder, mais de concevoir des systèmes qui résistent au temps, à la dette technique et aux modes éphémères du web.  
> Chaque service décrit ici est une brique d’un tout : un web plus lisible, mesurable et durable.”

**Boutons :**
- CTA primaire : `/contact` — “Démarrons ensemble”
- CTA secondaire : `/processus` — “Découvrir notre méthode”

---

### 3.2 DOMAINES D’EXPERTISE — `#domains`
**But :** présenter les compétences clés actuelles de SMIDJAN.

#### Développement web
> “Développement Next.js, React, .NET, Java Spring — un seul objectif : performance, maintenabilité et scalabilité.  
> Nous concevons des architectures propres, observables, et documentées. Chaque ligne de code a un sens.”

#### Design system & UX
> “Du pixel à la variable CSS, nous forgeons des identités visuelles fonctionnelles.  
> Nos design systems sont codés, testés, mesurés, et pensés pour durer.”

#### Automatisation & IA
> “De la génération de contenu intelligent aux audits automatisés, nous intégrons l’IA dans vos flux pour réduire la charge et augmenter la cohérence.”

#### Cybersécurité & audit
> “Parce qu’un bon design ne vaut rien sans sécurité.  
> Nous auditons vos dépendances, durcissons vos serveurs, et garantissons la confidentialité de vos données.”

---

### 3.3 MÉTHODE — `#method`
> “Nos services reposent sur un process reproductible et vérifiable.  
> Pas d’improvisation, mais une méthode claire, issue d’expériences concrètes.”

**4 étapes clés :**
1. **Analyse & cadrage** — comprendre les besoins, les contraintes et les objectifs.
2. **Design System** — poser les fondations visuelles et techniques.
3. **Développement** — coder vite, mais proprement, avec tests et CI/CD.
4. **Mesure & amélioration continue** — observer, itérer, documenter.

---

### 3.4 OUTILS & TECHNOLOGIES — `#tools`
> “Les outils sont nos alliés. Nous les sélectionnons pour leur fiabilité, leur interopérabilité et leur communauté active.”

**Stack de référence :**
- Front-end : Next.js, React, TypeScript, CSS modulaire.
- Back-end : .NET 8, Spring Boot, FastAPI.
- Bases de données : PostgreSQL, MongoDB.
- CI/CD : GitLab, GitHub Actions, Azure DevOps.
- Hébergement : Vercel, Azure, Docker, Kubernetes.
- IA & automatisation : OpenAI API, LangChain, FastAPI microservices.

---

### 3.5 GARANTIES & ENGAGEMENTS — `#guarantees`
> “Chaque service est accompagné d’une philosophie simple : la confiance se gagne par la rigueur.”

- **Transparence totale** — vous voyez le code, les commits et les décisions.
- **Documentation claire** — rien n’est implicite.
- **Performance mesurée** — chaque build est audité.
- **Maintenance garantie** — pas de livrable abandonné.

---

### 3.6 CTA FINAL — `#cta`
> “Que vous ayez un projet à lancer, un système à refondre ou une idée à tester, notre rôle est de transformer vos objectifs en architecture réelle.  
> Discutons de ce que nous pouvons bâtir ensemble.”

Boutons :
- CTA primaire → `/contact` — “Entrons en contact”
- CTA secondaire → `/about` — “En savoir plus sur SMIDJAN”

---

## 4) SEO
- Title : “Services — SMIDJAN”
- Description : “Nos domaines d’expertise : développement web, design system, IA, automatisation et sécurité.”
- Canonical : `/services`
- OG tags cohérents avec About.
- 1 seul H1, hiérarchie H2/H3 correcte.

---

## 5) Commits attendus
1) `feat(nav): add Services link to header`
2) `feat(services): create /services page with all sections`
3) `feat(sidebar): add sidebar structure for services`
4) `seo(services): add metadata`
5) `content(services): add verbose placeholder text`

---

2️⃣ Service_Sidebar.md
# SMIDJAN — SIDEBAR POUR LA PAGE SERVICES (.md POUR CODEX)
**Contexte :** la page `/services` est créée.  
**Objectif :** connecter la sidebar au contenu réel de la page, dans le bon ordre, avec le même design que Home et About.

---

## 1) Règles
- La sidebar de la Home et About **reste inchangée**.
- La sidebar Services réutilise **le même composant visuel** (`Sidebar.tsx`), avec des ancres spécifiques.
- Aucun nouveau style : on ne touche qu’à la configuration.
- Les libellés doivent suivre la structure réelle de la page.

---

## 2) Structure (ordre officiel)

| Ordre | Section | ID | Libellé |
|---:|---|---|---|
| 1 | Hero | `#services-hero` | Introduction |
| 2 | Domaines | `#domains` | Domaines d’expertise |
| 3 | Méthode | `#method` | Notre méthode |
| 4 | Outils | `#tools` | Outils & technologies |
| 5 | Garanties | `#guarantees` | Garanties & engagements |
| 6 | CTA | `#cta` | Contact |

---

## 3) Code source
Créer :
```ts
// src/components/layout/sidebar/servicesSidebar.items.ts
export const servicesSidebarItems = [
  { href: '#services-hero',  label: 'Introduction' },
  { href: '#domains',         label: 'Domaines d’expertise' },
  { href: '#method',          label: 'Notre méthode' },
  { href: '#tools',           label: 'Outils & technologies' },
  { href: '#guarantees',      label: 'Garanties & engagements' },
  { href: '#cta',             label: 'Contact' }
];


Puis :

// SidebarRouterBridge.tsx
if (pathname?.startsWith('/services')) {
  return <Sidebar items={servicesSidebarItems} />;
}

4) Vérifications

 Même design, animation, sticky behavior.

 Aucun layout shift.

 Highlight actif identique à Home/About.

 Ancres scrollent avec offset correct.

 Aucune duplication CSS.

5) Commits

feat(services-sidebar): link sidebar to services anchors

refactor(sidebar): accept items prop for services route

test(services-sidebar): ensure active highlight parity


---

## 3️⃣ `Service_AuditDesign.md`

```markdown
# SMIDJAN — AUDIT DE COHÉRENCE VISUELLE ENTRE HOME, ABOUT ET SERVICES (.md POUR CODEX)

**Objectif :** vérifier que la page `/services` respecte le design système global, sans duplication ni divergence stylistique.  
Ce test doit garantir que toutes les pages partagent la même base esthétique et structurelle.

---

## 1) Design System
- [ ] Tous les tokens (`--color-*`, `--space-*`, `--radius-*`, `--font-*`) proviennent du même fichier `globals.css`.  
- [ ] Pas de couleur, espacement ou typographie propre à `/services`.  
- [ ] Boutons identiques à “Démarrer un projet”.  
- [ ] Espacement vertical identique à About.  
- [ ] Header/Footer inchangés.  

---

## 2) CSS
- [ ] Aucun nouveau fichier global.  
- [ ] Modules CSS limités à du layout interne.  
- [ ] Pas de redéfinition de variables existantes.  
- [ ] Vérifier la couverture CSS → `devtools > coverage > CSS` : tout code nouveau justifié.  

---

## 3) Sidebar
- [ ] Même comportement sticky, hover, active.  
- [ ] Pas de duplication CSS (mêmes classes).  
- [ ] Ancres dans le bon ordre (voir `Service_Sidebar.md`).  
- [ ] Highlight actif cohérent.  

---

## 4) Accessibilité
- [ ] Focus visible.  
- [ ] Hiérarchie H1/H2/H3 correcte.  
- [ ] Navigation clavier fluide.  
- [ ] Contraste AA.  

---

## 5) SEO & Perf
- [ ] Lighthouse SEO ≥ 95 %.  
- [ ] LCP < 2,5 s ; CLS < 0,05.  
- [ ] Title + meta + canonical corrects.  
- [ ] OG tags cohérents.  
- [ ] Sitemap/robots mis à jour.  

---

## 6) Commits
1) `test(audit): verify visual & structural parity across pages`
2) `chore(seo): validate metadata & performance targets`
3) `fix(ui): remove duplicated style definitions`

---

## 7) Résultat attendu
- La page Services s’intègre **parfaitement** à l’identité visuelle existante.  
- Aucune divergence stylistique.  
- Architecture prête à accueillir “Processus”, “Contact”, ou “Projets” sans retouche design.

---