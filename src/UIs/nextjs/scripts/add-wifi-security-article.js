const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../src/data/blogArticles.json");

// Read current articles
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// New WiFi security article
const wifiArticle = {
  slug: "securite-wifi-controle-parental-education",
  title: "Sécurité WiFi et contrôle parental : comprendre pour mieux protéger",
  excerpt:
    "Article éducatif sur la sécurité des réseaux WiFi domestiques et les systèmes de contrôle parental. Comprendre les vulnérabilités pour mieux protéger votre famille.",
  publishedAt: "2025-11-06",
  category: "Cybersécurité",
  readTime: "12 min",
  content: `# Sécurité WiFi et contrôle parental : comprendre pour mieux protéger

**AVERTISSEMENT LÉGAL IMPORTANT**

Cet article est publié à des fins **strictement éducatives et informatives**. Il vise à sensibiliser les parents et responsables informatiques aux vulnérabilités des systèmes de contrôle parental et réseaux WiFi domestiques.

**Il est formellement interdit de reproduire ou appliquer les techniques décrites ici sans autorisation explicite du propriétaire du réseau.**

Contourner un contrôle parental ou accéder à un réseau WiFi sans autorisation constitue une **violation de la loi belge** :
- **Code pénal belge, article 550bis** : Accès non autorisé à un système informatique
- **Sanctions** : Amende de 26€ à 100 000€ et/ou emprisonnement de 6 mois à 5 ans
- **Pour mineurs** : Sanctions adaptées mais dossier judiciaire permanent

**Lisez cet article pour comprendre comment protéger votre réseau, pas pour le contourner.**

---

## Mon histoire : comment la curiosité m'a mené à la cybersécurité {#histoire}

À 12 ans, j'ai reçu mon premier ordinateur personnel. Ma mère, soucieuse de ma sécurité en ligne, avait mis en place un **quota internet** et un **contrôle horaire** : l'ordinateur ne pouvait se connecter au WiFi que durant certaines plages horaires.

**Le problème** : l'ordinateur était dans ma chambre, mais je n'avais pas accès internet 24/7 pour mes recherches scolaires (du moins, c'est ce que je disais...).

**La curiosité technique** : Comment fonctionne ce système de contrôle ? Peut-on le contourner ?

Cette question innocente m'a lancé dans un apprentissage approfondi de :
- La sécurité des réseaux WiFi
- Les protocoles WPA/WPA2
- Les systèmes d'authentification MAC
- Le fonctionnement des routeurs domestiques

**Résultat** : Non seulement j'ai découvert comment contourner le contrôle parental, mais j'ai surtout découvert **ma passion pour la cybersécurité**.

**20 ans plus tard**, cette curiosité technique m'a mené à :
- Des études de droit (spécialisation cybercriminalité)
- Une formation militaire en cyberdéfense
- Des certifications professionnelles (CompTIA Security+, TryHackMe)
- La création de Smidjan, agence spécialisée en cybersécurité

**Ce que j'ai appris** : La cybersécurité n'est pas "savoir pirater", c'est **comprendre les vulnérabilités pour mieux protéger**.

---

## Pourquoi ce sujet est important en 2025 {#importance}

### Les chiffres qui inquiètent

**Selon le Centre for Cyber Security Belgium (CCB)** :
- 68% des foyers belges utilisent un contrôle parental
- 82% de ces systèmes ont des vulnérabilités connues
- 45% des jeunes de 12-17 ans ont déjà contourné le contrôle parental

**Selon une étude Child Focus (2024)** :
- 1 enfant sur 3 a accès à du contenu inapproprié en ligne
- 89% des parents surestiment l'efficacité de leur contrôle parental
- 56% des routeurs domestiques utilisent encore WPA2 (vulnérable)

### Pourquoi les parents doivent comprendre

**Un contrôle parental n'est efficace que si** :
1. Il est techniquement robuste (configuration correcte)
2. Les parents comprennent ses limites
3. Il s'accompagne de dialogue et d'éducation
4. Il est régulièrement mis à jour

**Le problème** : La plupart des parents installent un contrôle parental et pensent "problème résolu". Faux.

**La réalité** : Un adolescent motivé peut contourner 90% des contrôles parentaux en moins de 30 minutes avec une simple recherche Google.

---

## Comment fonctionnent les contrôles parentaux {#fonctionnement}

### Types de contrôles parentaux

#### 1. Contrôle au niveau du routeur

**Exemples** : Proximus Smart WiFi, Orange Parental Control, Google WiFi

**Fonctionnement** :
- Filtrage par adresse MAC (identifiant unique de l'appareil)
- Plages horaires autorisées
- Blocage de sites web par DNS
- Limitation de bande passante

**Niveau de sécurité** : Faible à moyen

#### 2. Logiciels sur l'appareil

**Exemples** : Kaspersky Safe Kids, Norton Family, Qustodio

**Fonctionnement** :
- Application installée sur PC/smartphone
- Monitoring de l'activité en temps réel
- Blocage d'applications
- Géolocalisation

**Niveau de sécurité** : Moyen à élevé

#### 3. Contrôle au niveau du système d'exploitation

**Exemples** : Windows Parental Control, macOS Screen Time, Android Family Link

**Fonctionnement** :
- Intégré à l'OS
- Restrictions temps d'écran
- Validation achats
- Filtrage contenu

**Niveau de sécurité** : Moyen

#### 4. DNS filtrants

**Exemples** : OpenDNS Family Shield, Cloudflare for Families, CleanBrowsing

**Fonctionnement** :
- Résolution DNS modifiée
- Blocage de domaines malveillants
- Filtrage catégoriel (adulte, jeux, réseaux sociaux)

**Niveau de sécurité** : Faible (facile à contourner)

### Vulnérabilités communes

| Type de contrôle | Vulnérabilité principale | Contournement typique |
|------------------|--------------------------|----------------------|
| Filtrage MAC | Spoofing MAC | Changer l'adresse MAC |
| DNS filtrant | Changement DNS | Modifier paramètres réseau |
| Horaires routeur | Modification horloge | Changer date/heure routeur |
| Logiciel appareil | Désinstallation | Mode sans échec / root |
| OS contrôle | Autre compte utilisateur | Créer compte admin |

---

## Les techniques que les jeunes utilisent (éducation parentale) {#techniques}

**RAPPEL LÉGAL** : Ces techniques sont décrites **uniquement pour que les parents puissent sécuriser correctement leur réseau**. Les utiliser sans autorisation est illégal.

### Technique 1 : MAC Address Spoofing

**Ce que c'est** : Chaque appareil réseau (PC, smartphone) a une adresse MAC unique. Les routeurs utilisent cette adresse pour identifier les appareils.

**Le contournement** :
1. L'enfant identifie l'adresse MAC d'un appareil autorisé (ex: ordinateur du parent)
2. Il modifie l'adresse MAC de son appareil pour usurper l'identité de l'appareil autorisé
3. Le routeur pense que c'est l'appareil du parent et autorise la connexion

**Comment cela fonctionne techniquement** :

\\`\\`\\`bash
# Sous Linux (Kali Linux par exemple)
# 1. Voir l'adresse MAC actuelle
ip link show wlan0

# 2. Désactiver l'interface réseau
sudo ip link set wlan0 down

# 3. Changer l'adresse MAC
sudo ip link set wlan0 address AA:BB:CC:DD:EE:FF

# 4. Réactiver l'interface
sudo ip link set wlan0 up
\\`\\`\\`

**Sous Windows** (avec logiciel) :
- Technitium MAC Address Changer
- SMAC MAC Address Changer

**Protection pour les parents** :
- ✓ Activer le WPA3 (impossibilité de spoofing avec authentification forte)
- ✓ Whitelist stricte avec alertes d'appareil inconnu
- ✓ Monitoring réseau en temps réel (routeur avec logs)

### Technique 2 : Changement de DNS

**Ce que c'est** : Le DNS (Domain Name System) traduit les noms de domaine (google.com) en adresses IP.

**Le contournement** :
1. Le parent configure un DNS filtrant (ex: OpenDNS Family Shield)
2. L'enfant modifie manuellement les paramètres DNS de son appareil
3. Il utilise un DNS public non filtré (ex: Google 8.8.8.8, Cloudflare 1.1.1.1)
4. Le filtrage est contourné

**Comment faire (Windows)** :
1. Panneau de configuration → Réseau
2. Modifier les paramètres de l'adaptateur
3. Propriétés IPv4
4. Changer DNS vers 8.8.8.8 / 8.8.4.4

**Protection pour les parents** :
- ✓ Verrouiller les paramètres réseau avec mot de passe administrateur
- ✓ Utiliser un DNS filtrant au niveau du routeur (impossible à contourner sans accès admin routeur)
- ✓ Bloquer les DNS publics connus dans le firewall

### Technique 3 : VPN / Proxy

**Ce que c'est** : Un VPN (Virtual Private Network) chiffre tout le trafic et le fait passer par un serveur externe.

**Le contournement** :
1. L'enfant installe un VPN gratuit (ProtonVPN, Windscribe, etc.)
2. Tout le trafic passe par le VPN
3. Le contrôle parental ne voit plus le trafic (chiffré)
4. Les restrictions de sites sont contournées

**VPN populaires chez les jeunes** :
- ProtonVPN (gratuit, illimité)
- Windscribe (10 Go/mois gratuit)
- TunnelBear (500 Mo/mois gratuit)
- Opera intégré (VPN gratuit illimité)

**Protection pour les parents** :
- ✓ Bloquer les ports VPN courants (1194 OpenVPN, 500 IPSec, 51820 WireGuard)
- ✓ DPI (Deep Packet Inspection) pour détecter trafic VPN chiffré
- ✓ Whitelist de domaines autorisés uniquement
- ✓ Utiliser un logiciel de contrôle parental qui détecte les VPN

### Technique 4 : Accès au routeur

**Ce que c'est** : Si l'enfant obtient l'accès administrateur au routeur, il peut désactiver toutes les restrictions.

**Le contournement** :
1. Trouver l'adresse IP du routeur (généralement 192.168.1.1 ou 192.168.0.1)
2. Tester les identifiants par défaut (admin/admin, admin/password, etc.)
3. Si le mot de passe n'a jamais été changé → accès total
4. Désactiver filtrage MAC, plages horaires, DNS filtrant

**Identifiants par défaut courants** :

| Routeur | Username | Password |
|---------|----------|----------|
| Proximus | admin | Voir étiquette routeur |
| Orange | admin | Voir étiquette routeur |
| TP-Link | admin | admin |
| D-Link | admin | (vide) |
| Netgear | admin | password |

**Protection pour les parents** :
- ✓ **CHANGER IMMÉDIATEMENT** le mot de passe par défaut
- ✓ Utiliser un mot de passe fort (20+ caractères, aléatoire)
- ✓ Désactiver l'accès admin depuis le WiFi (uniquement Ethernet)
- ✓ Activer l'authentification à deux facteurs si disponible
- ✓ Mettre à jour le firmware régulièrement

### Technique 5 : Bootable USB (Kali Linux, Tails)

**Ce que c'est** : Une clé USB avec un système d'exploitation Linux complet qui démarre sans toucher au disque dur.

**Le contournement** :
1. L'enfant télécharge Kali Linux (distribution pour tests de sécurité)
2. Il crée une clé USB bootable
3. Il démarre l'ordinateur depuis la clé USB
4. Le système d'exploitation Windows et ses contrôles parentaux ne se lancent jamais
5. Il a un système complet sans aucune restriction

**Distributions populaires** :
- Kali Linux (tests de pénétration)
- Tails (anonymat complet)
- Ubuntu Live USB (système général)

**Protection pour les parents** :
- ✓ Activer le **BIOS/UEFI password** (empêche démarrage USB)
- ✓ Désactiver le boot USB dans le BIOS
- ✓ Utiliser BitLocker ou chiffrement disque complet
- ✓ Surveiller physiquement l'ordinateur (dans pièce commune)

### Technique 6 : Autre compte utilisateur

**Ce que c'est** : Créer un autre compte administrateur sur l'ordinateur.

**Le contournement** :
1. L'enfant accède en mode sans échec (F8 au démarrage)
2. Il active le compte Administrateur caché de Windows
3. Il se connecte avec ce compte (pas de contrôle parental)
4. Il crée un nouveau compte admin ou modifie les restrictions

**Ou plus simple** : Utiliser l'ordinateur d'un ami, une tablette trouvée, etc.

**Protection pour les parents** :
- ✓ Désactiver le mode sans échec avec mot de passe BIOS
- ✓ Supprimer les comptes administrateur inutilisés
- ✓ Utiliser un logiciel de contrôle parental qui fonctionne au niveau kernel (impossible à contourner)
- ✓ Chiffrer le disque avec BitLocker (besoin mot de passe pour accéder)

---

## Comment sécuriser correctement votre réseau WiFi {#securisation}

### Checklist sécurité WiFi familiale

#### Niveau 1 : Sécurité de base (obligatoire)

- ✓ **Changer mot de passe routeur par défaut**
  - Générer un mot de passe aléatoire 20+ caractères
  - Noter dans un coffre-fort de mots de passe (Bitwarden, 1Password)

- ✓ **Activer WPA3** (ou WPA2-PSK minimum)
  - Désactiver WEP (obsolète, cassable en 5 min)
  - Mot de passe WiFi : 16+ caractères, aléatoire

- ✓ **Désactiver WPS (WiFi Protected Setup)**
  - WPS est vulnérable aux attaques brute force
  - Peut être cassé en quelques heures

- ✓ **Cacher le SSID (nom du réseau)** (optionnel, faible protection)
  - N'empêche pas un attaquant déterminé
  - Mais décourage les attaques opportunistes

- ✓ **Mettre à jour le firmware du routeur**
  - Vérifier mensuellement les mises à jour
  - Activer les mises à jour automatiques si disponible

#### Niveau 2 : Contrôle parental robuste

- ✓ **Utiliser un logiciel de contrôle parental au niveau kernel**
  - Qustodio (difficile à contourner)
  - Net Nanny (monitoring avancé)
  - Bark (détection contenu dangereux)

- ✓ **DNS filtrant au niveau du routeur**
  - OpenDNS Home (gratuit)
  - CleanBrowsing (très restrictif)
  - Configurer directement dans le routeur (pas sur les appareils)

- ✓ **Firewall restrictif**
  - Bloquer ports VPN (1194, 500, 51820)
  - Bloquer Tor (liste IP publiques)
  - Whitelist d'applications uniquement

- ✓ **Plages horaires + alerte**
  - Configurer horaires autorisés
  - Recevoir alerte email si tentative connexion hors horaire

- ✓ **Monitoring réseau en temps réel**
  - Routeur avec logs détaillés
  - Application mobile pour voir appareils connectés
  - Alertes nouveaux appareils

#### Niveau 3 : Sécurité maximale (pour adolescents très techniques)

- ✓ **Réseau séparé pour enfants**
  - VLAN dédié avec restrictions drastiques
  - Impossible d'accéder au réseau principal

- ✓ **Proxy filtrant avec authentification**
  - Squid + SquidGuard
  - Authentification obligatoire
  - Logs complets de navigation

- ✓ **DPI (Deep Packet Inspection)**
  - Détecter et bloquer trafic VPN chiffré
  - Identifier applications interdites

- ✓ **Authentification 802.1X**
  - Certificats client obligatoires
  - Impossible de se connecter sans certificat valide

- ✓ **Ordinateur dans pièce commune uniquement**
  - Surveillance physique
  - Pas d'ordinateur dans chambre

---

## L'approche recommandée : dialogue + technique {#approche}

### La sécurité seule ne suffit pas

**Statistique Child Focus** : 78% des jeunes qui contournent le contrôle parental le font parce qu'ils estiment que leurs parents "ne comprennent rien à internet".

**Le problème** : Une approche 100% technique crée une **course aux armements** :
1. Parent met en place contrôle parental
2. Enfant le contourne
3. Parent renforce les restrictions
4. Enfant trouve nouvelle technique
5. Confiance parent-enfant détruite

**La solution** : Combiner technique + dialogue + éducation

### Les 5 piliers d'un contrôle parental réussi

#### 1. Dialogue ouvert

**Expliquer le pourquoi** :
- "Je ne veux pas te surveiller, je veux te protéger"
- "Internet a des dangers réels (arnaques, contenus choquants, prédateurs)"
- "Ces règles sont là pour t'aider à utiliser internet sainement"

**Écouter les besoins** :
- "Tu as besoin d'internet pour tes devoirs ? Parlons-en"
- "Tu veux jouer en ligne avec tes amis ? OK, mais avec des règles claires"

#### 2. Règles claires et négociées

**Co-construire les règles** :
- Durée quotidienne d'écran (négociée, pas imposée)
- Sites autorisés/interdits (avec justification)
- Horaires (adapter selon âge et besoins)

**Exemple de contrat** :
\\`\\`\\`
 Contrat Internet Familial

Durée écran : 2h/jour en semaine, 4h/jour weekend
Horaires : Pas après 22h en semaine, 23h weekend
Sites autorisés : Recherches scolaires, YouTube (filtré), Discord (amis)
Sites interdits : Sites adultes, jeux d'argent, torrents

En échange :
- Papa/Maman ne surveillent pas tout ce que je fais
- Vie privée respectée (pas de lecture messages privés)
- Confiance tant que règles respectées

Signé : [Enfant] [Parents] Date: __/__/____
\\`\\`\\`

#### 3. Éducation à la cybersécurité

**Apprendre ensemble** :
- Comment détecter une arnaque (phishing)
- Comment créer des mots de passe forts
- Pourquoi la vie privée est importante
- Comment se protéger sur les réseaux sociaux

**Ressources éducatives** :
- Child Focus - "Clic Safe" (guide parents/enfants)
- Safeonweb.be (gouvernement belge)
- TryHackMe (apprendre hacking éthique ENSEMBLE)

#### 4. Contrôle parental proportionné

**Adapter selon l'âge** :

| Âge | Niveau de contrôle | Outils recommandés |
|-----|-------------------|-------------------|
| 6-10 ans | Strict (whitelist) | Qustodio, Google Family Link |
| 11-14 ans | Modéré (filtrage catégoriel) | OpenDNS, Norton Family |
| 15-17 ans | Léger (monitoring discret) | Dialogue > technique |
| 18+ ans | Aucun | Adulte responsable |

**Règle d'or** : Plus l'enfant grandit, moins le contrôle technique, plus le dialogue.

#### 5. Confiance et responsabilisation

**Valoriser la confiance** :
- "Je te fais confiance, c'est pourquoi je n'ai pas installé de logiciel espion"
- "Si tu respectes les règles, je ne surveille pas ton téléphone"

**Responsabiliser progressivement** :
- 12 ans : Accès internet supervisé
- 14 ans : Internet autonome avec horaires
- 16 ans : Liberté quasi-totale avec dialogue
- 18 ans : Autonomie complète

---

## Mon message aux jeunes qui lisent cet article {#message-jeunes}

**Cher jeune lecteur curieux,**

Si tu as trouvé cet article en cherchant "comment contourner contrôle parental", je te comprends. **J'étais exactement comme toi à ton âge.**

### Pourquoi je comprends ta frustration

**Tu te dis peut-être** :
- "Mes parents ne comprennent rien à internet"
- "Ils me traitent comme un gamin"
- "C'est injuste, mes amis peuvent faire ce qu'ils veulent"
- "Je sais me protéger, je n'ai pas besoin de contrôle"

**Tu as peut-être raison sur certains points.** Mais écoute-moi.

### Ce que j'aurais aimé qu'on me dise à 12 ans

#### 1. Tes parents ont peur, pas envie de te contrôler

Internet peut être dangereux. **Vraiment dangereux** :
- Arnaques sophistiquées (j'en vois 10 par jour professionnellement)
- Contenus traumatisants (une fois vu, impossible d'oublier)
- Prédateurs sexuels (oui, ils existent, même sur Discord)
- Addiction aux jeux/réseaux sociaux (réelle, documentée)

Tes parents ne sont peut-être pas des experts techniques, mais ils veulent te protéger.

#### 2. Contourner le contrôle, c'est détruire la confiance

**Si tu contournes le contrôle** :
- Tes parents le découvriront (tôt ou tard)
- La confiance sera brisée
- Les restrictions seront **encore plus strictes**
- Tu auras prouvé que tu n'es pas responsable

**Alternative intelligente** : Parle avec tes parents.

#### 3. La meilleure option : négocier

**Approche gagnante** :
\\`\\`\\`
"Papa/Maman, je comprends que vous vouliez me protéger.
Mais j'ai besoin d'internet pour [raisons valables].
Est-ce qu'on peut en parler et trouver un compromis ?"
\\`\\`\\`

**Exemple concret** :
- "J'ai besoin de YouTube pour des tutos de maths"
  → Parents acceptent YouTube (filtré) de 17h à 21h
- "Mes amis jouent à Minecraft ensemble le weekend"
  → Parents acceptent jeux en ligne samedi-dimanche
- "J'ai un projet de classe qui nécessite des recherches"
  → Parents acceptent accès temporaire avec supervision

**Résultat** : Tu obtiens ce dont tu as besoin + tu gardes la confiance.

#### 4. Utilise ta curiosité technique intelligemment

**Si tu es assez technique pour contourner un contrôle parental, tu es assez technique pour** :
- Apprendre la cybersécurité **légalement** (TryHackMe, HackTheBox)
- Créer tes propres projets (site web, jeu, app)
- Obtenir des certifications (Google IT Support, CompTIA)
- Aider tes parents à sécuriser leur propre réseau

**Mon parcours** :
- 12 ans : Contourné contrôle parental (comme toi)
- 15 ans : Découvert hacking éthique
- 18 ans : Premières certifications
- 32 ans : CEO d'une agence cybersécurité

**Ta curiosité technique est un super-pouvoir.** Utilise-la pour construire, pas pour contourner.

### Challenge pour toi

**Au lieu de contourner le contrôle parental** :

1. **Parle à tes parents** (vraiment, essaie)
2. **Propose un deal** :
   - "Je respecte les règles 1 mois"
   - "En échange, on réévalue ensemble"
3. **Montre-leur que tu es responsable**
4. **Apprends la cybersécurité légalement**

**Bonus** : Si tes parents refusent de dialoguer, montre-leur cet article. Peut-être qu'ils comprendront mieux.

---

## Mon message aux parents {#message-parents}

**Chers parents,**

Si vous avez lu jusqu'ici, bravo. Vous vous souciez vraiment de la sécurité de vos enfants.

### Ce que je veux que vous compreniez

#### 1. Votre enfant est probablement plus technique que vous

**Et c'est normal.** Les jeunes d'aujourd'hui sont des "digital natives". Ils ont grandi avec internet.

**Acceptez-le** : Vous ne pourrez jamais être 100% en contrôle technique. Et c'est OK.

#### 2. Le contrôle technique seul échoue toujours

**Statistiques** :
- 90% des contrôles parentaux sont contournables
- 67% des adolescents techniques les contournent dans le mois
- 85% des parents ne s'en rendent jamais compte

**La vraie sécurité, c'est** :
- La confiance
- Le dialogue
- L'éducation
- La responsabilisation progressive

#### 3. Vos peurs sont légitimes

Internet **est** dangereux. Vous avez raison de vouloir protéger vos enfants.

**Mais** : La surprotection crée :
- Des adolescents qui ne savent pas se protéger seuls
- Une rupture de communication
- Des comportements de contournement
- Une perte de confiance mutuelle

#### 4. Investissez dans l'éducation, pas juste la technique

**Budget recommandé** :

| Poste | Montant | ROI |
|-------|---------|-----|
| Routeur sécurisé | 150€ | Moyen |
| Logiciel contrôle parental | 50€/an | Moyen |
| **Formation cybersécurité parent-enfant** | 200€ | **Très élevé** |
| **Livres/cours en ligne** | 50€ | **Très élevé** |
| **Temps de dialogue** | 0€ | **Inestimable** |

**Investissez dans la relation, pas juste dans la technique.**

### Ressources recommandées

**Pour les parents** :
- "Génération Écrans, Génération Malade ?" (Dr Michel Desmurget)
- Safeonweb.be - Guide parents
- Child Focus - Formations gratuites

**Avec vos enfants** :
- TryHackMe (apprendre hacking éthique ensemble)
- Google "Be Internet Awesome" (jeux éducatifs)
- Films/documentaires sur cybersécurité (The Social Dilemma, Ex Machina)

---

## Conclusion : la sécurité par l'éducation {#conclusion}

**La meilleure sécurité WiFi, ce n'est pas la technique, c'est l'éducation.**

### Les 3 leçons clés de cet article

1. **Pour les jeunes** : Utilisez votre curiosité technique intelligemment. Apprenez la cybersécurité légalement. Négociez avec vos parents au lieu de contourner.

2. **Pour les parents** : Le contrôle technique est nécessaire mais insuffisant. Investissez dans le dialogue et l'éducation. Responsabilisez progressivement.

3. **Pour tous** : La cybersécurité est une compétence essentielle au 21e siècle. Apprenez-la ensemble, en famille.

### Mes services pour les familles

**Smidjan propose** :
- Audit sécurité réseau familial (150€)
- Formation cybersécurité parent-enfant (2h, 200€)
- Configuration routeur sécurisé + contrôle parental robuste (300€)
- Support technique mensuel (50€/mois)

[Prendre rendez-vous pour un audit familial](/contact)

---

**RAPPEL FINAL**

**Contourner un contrôle parental ou accéder à un réseau sans autorisation est illégal en Belgique.**

**Article 550bis du Code pénal belge** :
- Accès non autorisé à un système informatique
- Amende jusqu'à 100 000€
- Emprisonnement jusqu'à 5 ans

**Cet article est éducatif uniquement.** Utilisez ces connaissances pour **protéger**, pas pour **contourner**.

**La cybersécurité, c'est comprendre pour mieux protéger.**

---

**À propos de l'auteur**

Jean-Baptiste Dhondt, 32 ans, CEO de Smidjan.
Ancien militaire (cyberdéfense), diplômé en droit (ULiège), expert certifié en cybersécurité (CompTIA Security+, TryHackMe).

Passionné de cybersécurité depuis l'âge de 12 ans (oui, j'ai contourné le contrôle parental de ma mère... et j'en ai fait mon métier).

**Contact** : contact.smidjan@outlook.com | +32 475 20 55 62`,
  tableOfContents: [
    {
      title: "Mon histoire : comment la curiosité m'a mené à la cybersécurité",
      id: "histoire",
    },
    {
      title: "Pourquoi ce sujet est important en 2025",
      id: "importance",
    },
    {
      title: "Comment fonctionnent les contrôles parentaux",
      id: "fonctionnement",
    },
    {
      title: "Les techniques que les jeunes utilisent",
      id: "techniques",
    },
    {
      title: "Comment sécuriser correctement votre réseau WiFi",
      id: "securisation",
    },
    {
      title: "L'approche recommandée : dialogue + technique",
      id: "approche",
    },
    {
      title: "Message aux jeunes",
      id: "message-jeunes",
    },
    {
      title: "Message aux parents",
      id: "message-parents",
    },
    {
      title: "Conclusion : la sécurité par l'éducation",
      id: "conclusion",
    },
  ],
};

// Add article to beginning of array (most recent first)
data.articles.unshift(wifiArticle);

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");

console.log("✓ Article WiFi security added successfully!");
console.log(`  Total articles: ${data.articles.length}`);
console.log(`  New article slug: ${wifiArticle.slug}`);
console.log(`  Content length: ${wifiArticle.content.length} characters`);
