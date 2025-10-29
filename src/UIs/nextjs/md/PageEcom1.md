# PROMPT MAÎTRE — Transformation **Page Produit SMIDJAN CMS**

> Objectif : réécrire entièrement le contenu textuel de la page `/produits/cms-ecommerce` afin qu’il reflète la version finale de **SMIDJAN CMS — La solution e-commerce tout-en-un**, tout en conservant **exactement la même structure visuelle et les composants existants** (sidebar, navbar, sections, cards, FAQ, footer). Aucune modification de design, seulement du texte.

---

## 1) Rôle et posture

Tu es **Codex**, développeur front-end senior et rédacteur technique. Ta mission est de remplacer **tout le contenu textuel** actuel par le texte fourni ci-dessous, sans casser le layout existant. Tu ne modifies ni le style, ni la disposition, ni les composants : uniquement le contenu textuel.

---

## 2) Texte à injecter dans la page

### **SMIDJAN CMS — La solution e-commerce tout-en-un**

#### **Un CMS modulaire et complet pour produits, services ou offres hybrides**

SMIDJAN CMS est une solution e-commerce complète et évolutive, pensée pour les entreprises qui veulent **vendre sans limite** : produits physiques, services digitaux ou abonnements récurrents.
Chaque module a été conçu pour s’adapter à ton activité — sans dépendance à un modèle figé.

---

### **Fonctionnalités natives**

Tu disposes dès l’installation d’un environnement professionnel prêt à l’emploi :

#### **Catalogue & produits**

* Produits simples, configurables, groupés ou téléchargeables
* Gestion d’attributs, de variantes, d’options et de packs
* Stock multi-entrepôts, suivi d’inventaire en temps réel
* Import/export produits via CSV ou API
* Gestion des catégories hiérarchiques avec SEO intégré

#### **Commandes & clients**

* Panier intelligent et tunnel de commande fluide
* Gestion complète des commandes, factures, avoirs et retours
* Comptes clients, adresses multiples, groupes B2B/B2C
* Historique des achats et notifications automatiques
* Espace client personnalisable avec suivi d’état

#### **Paiement & facturation**

* Paiements en ligne via Stripe, virement ou solution sur mesure
* Génération automatique de factures conformes UE
* Gestion des taxes et devises multiples
* Email de confirmation et relance automatique

#### **Marketing & promotion**

* Coupons, codes promo et remises progressives
* Bannières dynamiques et pages promotionnelles
* Système de newsletters et campagnes ciblées
* Outils SEO intégrés (sitemap, meta, rich snippets)

#### **Administration & gestion**

* Tableau de bord analytique (ventes, commandes, clients, produits)
* Multi-utilisateurs et gestion des rôles (ACL)
* Journalisation des actions et logs d’audit
* Configuration complète : paiement, livraison, taxes, langues, emails
* Système modulaire prêt pour extensions et intégrations externes

#### **Sécurité & performances**

* Authentification sécurisée, gestion des rôles et permissions
* Headers de sécurité, protection CSRF, XSS et SQLi
* Sauvegardes et restauration faciles
* Optimisations Core Web Vitals et cache intelligent
* Monitoring intégré et alertes d’anomalies

#### **Design & personnalisation**

* Design 100 % modulable, compatible avec tous les frameworks front (Tailwind, Bootstrap, etc.)
* Templates adaptables sans toucher au noyau du CMS
* Gestion avancée des thèmes, couleurs, polices et composants
* Système de blocs réutilisables pour construire tes pages sans limite
* Responsive design nativement optimisé

#### **Automatisations & intégrations**

* Automatisations n8n prêtes à l’emploi : facturation, rappels, CRM, emailing
* Connecteurs vers API externes (ERP, outils marketing, analytics)
* Webhooks et endpoints sécurisés pour intégrations custom
* IA embarquée pour suggestions, analyse de ventes et génération de contenu (option)

---

### **Un CMS pensé pour évoluer**

Chaque fonctionnalité de SMIDJAN CMS est **modulaire**.
Tu peux désactiver les modules inutiles, en ajouter de nouveaux, ou étendre les existants sans compromettre la stabilité.
Le back-end et le front-end sont découplés, permettant une totale liberté de design et d’expérience utilisateur.

---

### **Pourquoi choisir SMIDJAN CMS ?**

* **Tout est inclus** dès le départ — catalogue, commandes, paiements, analytics
* **100 % personnalisable**, sans dépendance à un thème figé
* **Sécurisé et évolutif**, prêt à croître avec ton entreprise
* **Pensé pour les pros**, intégrable à ton écosystème existant

---

### **Prêt à passer à la vitesse supérieure ?**

Lance ton e-commerce avec une base solide, performante et totalement maîtrisée.
**Contacte-nous** pour une démonstration ou un accompagnement sur mesure.

---

## 3) Contraintes

* Ne pas toucher à la structure des sections (Hero, bénéfices, modules, intégrations, FAQ, CTA final).
* Supprimer les blocs “Plans & Tarifs” inutiles.
* Garder le même ordre visuel et les mêmes composants graphiques.
* Adapter les titres des sections si besoin pour cohérence avec le nouveau texte.
* Mettre à jour les métadonnées SEO (title, description) :

    * **Title :** SMIDJAN CMS — La solution e-commerce tout-en-un
    * **Description :** CMS complet et modulaire pour produits, services ou offres hybrides. Performant, sécurisé, personnalisable et prêt à l’emploi.

---

## 4) Résultat attendu

Une page produit **100 % cohérente visuellement** avec le site SMIDJAN, mais avec **le nouveau contenu textuel intégralement injecté** et **le bloc “plans” retiré**.
Aucun changement de style ni de mise en page.

---

## 5) Validation

* Vérifier l’absence du bloc Plans & Tarifs.
* Vérifier la présence de toutes les sections fonctionnelles et de la FAQ.
* Vérifier la cohérence SEO.
* Vérifier l’absence d’erreurs de build.

> Une fois validé, commit final : `update(page: cms-ecommerce): new content + remove plans section`.
