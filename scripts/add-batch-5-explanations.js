const fs = require("fs");

// Batch 5 - Cybersécurité, App Web, Intégrations restantes
const explanations = {
  // Features types de projets (patterns spéciaux)
  "shipping-free-threshold": `Livraison gratuite au-dessus d'un seuil : boost panier moyen de 30%. **C'est quoi ?** Frais de port offerts si commande dépasse un montant (ex: gratuit dès 50€). **Pourquoi ?** Clients ajoutent produits pour atteindre seuil (psychologie), conversion +20%, et compensez via volume. 90% des e-commerces l'utilisent. Amazon Prime a démocratisé le concept.`,

  // Intégrations
  "integration-crm": `Intégration CRM bidirectionnelle : HubSpot, Salesforce, Pipedrive sync automatique. **C'est quoi ?** Connexion de votre site/app à votre CRM pour transférer leads et données. **Pourquoi ?** Zéro saisie manuelle, aucun lead perdu, relance automatique. Commerciaux ont tout instantanément. ROI immédiat : un lead perdu = 500-5000€ selon secteur.`,

  "integration-email-service": `Service d'envoi email : Resend, SendGrid, AWS SES pour delivrabilité maximale. **C'est quoi ?** Serveur email dédié pour vos notifications transactionnelles. **Pourquoi ?** Delivrabilité 99%+ (vs 60% serveur classique), réputation préservée (IP dédiées), analytics (taux ouverture), et conformité anti-spam. Gmail/Outlook bloquent emails serveur lambda.`,

  "integration-calendar": `Intégration calendrier : Google Calendar, Outlook, Apple Calendar sync bidirectionnelle. **C'est quoi ?** Vos événements automatiquement dans calendrier utilisateur. **Pourquoi ?** Taux de participation +40% (dans calendrier = pas oublié), confirmations automatiques, et UX moderne. Zoom, Calendly base tout là-dessus. CalDAV standard.`,

  // Real-time features
  websockets: `WebSockets temps réel : communication bidirectionnelle instantanée. **C'est quoi ?** Connexion persistante permettant updates en direct sans refresh. **Pourquoi ?** UX moderne (Google Docs-like), notifications instantanées, collaboration temps réel, et engagement x2. Socket.io standard. Complexe mais différenciateur énorme.`,

  "collaborative-editing": `Édition collaborative : plusieurs utilisateurs modifient simultanément (CRDTs). **C'est quoi ?** Système permettant édition simultanée sans conflits (comme Google Docs). **Pourquoi ?** Productivité x3 (plus d'allers-retours), travail d'équipe fluide, et feature premium. Complexe techniquement (CRDTs, OT). Yjs, Automerge libs. Différenciateur majeur B2B.`,

  "presence-indicators": `Indicateurs de présence : qui est en ligne, qui édite quoi, curseurs en temps réel. **C'est quoi ?** Affichage utilisateurs actifs et leur activité. **Pourquoi ?** Évite conflits (X édite déjà ce doc), facilite collaboration ("je vois que tu es là"), et UX sociale. Slack, Figma, Notion l'ont tous. Feature attendue si collaboration.`,

  // Design & Apps
  "responsive-design": `Design responsive : adaptation automatique mobile/tablette/desktop. **C'est quoi ?** Site qui s'adapte à toutes tailles d'écran. **Pourquoi ?** 60% trafic = mobile (Google pénalise sites non-responsive), UX indispensable, et standard 2024. Mobile-first design recommandé. Coût quasi identique, bénéfice énorme.`,

  pwa: `Progressive Web App : app installable, offline, notifications push comme app native. **C'est quoi ?** Site web qui se comporte comme une vraie application. **Pourquoi ?** Installation sans store (pas de commission Apple/Google), fonctionne offline, notifications push, et coût 10x moindre qu'app native. Twitter, Pinterest sont PWA. ROI démentiel.`,

  "mobile-app-react-native": `Application mobile native iOS + Android en React Native. **C'est quoi ?** Vraie app mobile multi-plateformes avec code partagé. **Pourquoi ?** Performance native, accès features téléphone (caméra, GPS, etc.), présence stores, et 1 codebase = 2 apps. Instagram, Discord, Shopify utilisent React Native. 40% moins cher que 2 apps natives.`,

  // Security
  "security-encryption": `Chiffrement des données : at-rest (DB) et in-transit (HTTPS/TLS). **C'est quoi ?** Toutes vos données chiffrées stockage + transfert. **Pourquoi ?** RGPD l'exige pour données sensibles, protection contre hacks DB, conformité (ISO27001, SOC2), et confiance clients B2B. AES-256 stockage, TLS 1.3 transfert. Mandatory 2024.`,

  "security-gdpr": `Conformité RGPD complète : DPO, registre traitements, PIA, procédures. **C'est quoi ?** Respect total des règles RGPD avec documentation. **Pourquoi ?** OBLIGATION LÉGALE UE (amendes 20M€/4% CA), contrats B2B impossibles sans, et confiance clients. DPO externe OK si <250 employés. Audit annuel recommandé.`,

  "security-audit-trail": `Audit trail complet : logs immuables de toutes actions sensibles. **C'est quoi ?** Journal inaltérable de qui a fait quoi et quand. **Pourquoi ?** Investigation incidents, conformité (SOX, HIPAA), preuve légale, et dissuasion (employés savent que tout est tracé). Retention 7 ans typique. Elasticsearch + alerting.`,

  "security-ip-whitelist": `IP Whitelisting : accès restreint aux IPs autorisées. **C'est quoi ?** Seules certaines IPs peuvent accéder (souvent admin/API). **Pourquoi ?** Sécurité administrative (+99% attaques bloquées), conformité IT grands comptes, et VPN-like sans VPN. Liste statique ou dynamique (VPN corporate). Feature B2B enterprise.`,

  "security-penetration-test": `Pentest de sécurité par experts certifiés (OSCP, CEH). **C'est quoi ?** Hackers éthiques testent votre sécurité. **Pourquoi ?** Trouvez vulns avant les vrais hackers, conformité (ISO27001 exige pentest), assurance cyber moins chère, et confiance clients. 3-5k€ pour PME, 15-50k€ enterprise. ROI énorme vs coût breach.`,

  // Audit Cyber
  auditCyber: `Audit cybersécurité complet : infrastructure, applications, processus. **C'est quoi ?** Évaluation complète de votre posture sécurité par experts. **Pourquoi ?** 60% PME hackées ferment sous 6 mois. Audit identifie failles critiques, priorise corrections, et roadmap sécurité. ANSSI recommande audit annuel. 5-15k€ sauvent souvent l'entreprise.`,

  // Infrastructure Audit
  "infra-1-5": `Audit infrastructure 1-5 serveurs : configuration, hardening, monitoring. **C'est quoi ?** Revue sécurité de votre infra serveurs (physical/VM/cloud). **Pourquoi ?** 90% des serveurs ont misconfigurations (SSH root, ports ouverts, patches manquants). Audit corrige avant exploit. Coût 2-5k€, évite ransom 50k€+. Checklist CIS Benchmarks.`,

  "infra-5-20": `Audit infrastructure 5-20 serveurs : complexité moyenne, architecture review. **C'est quoi ?** Audit sécu + architecture pour infra établie. **Pourquoi ?** Infra grandit = dette technique + failles. Audit identifie SPOF (single point of failure), misconfigs, et optimisations. Typical PME. Budget 5-15k€.`,

  "infra-20-50": `Audit infrastructure 20-50 serveurs : analyse approfondie, automatisation review. **C'est quoi ?** Audit complet infra large avec focus automatisation et monitoring. **Pourquoi ?** À cette échelle, impossible de gérer manuellement. Audit vérifie automatisation (Ansible, Terraform), monitoring (Prometheus), et segmentation réseau. Budget 15-30k€. ROI = reliability.`,

  "infra-50plus": `Audit infrastructure 50+ serveurs : niveau enterprise, HA, disaster recovery. **C'est quoi ?** Audit enterprise-grade avec résilience et continuité. **Pourquoi ?** Infra critique = audit critique. Review HA (haute dispo), DR (disaster recovery), backup, segmentation micro-services. Budget 30-100k€. Mandatory pour scale-ups/corporates.`,

  // Pentests
  "pentest-external": `Pentest externe (Black Box) : attaque depuis Internet sans info préalable. **C'est quoi ?** Hackers testent depuis l'extérieur comme un vrai attaquant. **Pourquoi ?** Simule vraie attaque (hackers n'ont aucune info), trouve vulns exposées Internet, et compliance. OWASP Top 10 focus. 3-10k€ selon scope. Annuel recommandé.`,

  "pentest-internal": `Pentest interne (Grey Box) : test avec accès réseau interne (employé malveillant). **C'est quoi ?** Simulation d'attaque depuis l'intérieur (réseau corporate). **Pourquoi ?** 70% des breaches = insider threat ou phishing (attaquant entre dans réseau). Teste segmentation, escalade privilèges, mouvement latéral. Complémente pentest externe. 5-15k€.`,

  "pentest-white-box": `Pentest White Box : audit avec accès code source et architecture. **C'est quoi ?** Test sécurité avec toutes les informations (code, infra, creds). **Pourquoi ?** Profondeur maximale (auditeurs comprennent vraiment l'app), trouve vulns subtiles (logic bugs), et éducatif (dev apprennent). Plus cher (10-30k€) mais ROI sécurité x3.`,

  "code-review-sast": `Audit de code source (SAST) : analyse statique automatisée + manuelle. **C'est quoi ?** Scan du code pour vulnérabilités avant déploiement. **Pourquoi ?** Trouve bugs sécurité early (fix = 10x moins cher), éduque devs (reports expliqués), et CI/CD intégrable. SonarQube, Checkmarx. 70% vulns détectables avant prod. Shift-left security.`,

  "infra-audit": `Audit infrastructure et configuration : serveurs, réseau, cloud, durcissement. **C'est quoi ?** Revue complète config serveurs, firewalls, cloud selon best practices. **Pourquoi ?** Misconfigurations = cause #1 breaches (Capital One, Equifax). CIS Benchmarks compliance, hardening guide, et quick wins identifiés. 3-20k€ selon taille. Évite catastrophes.`,

  "pentest-mobile": `Pentest application mobile : iOS + Android, API, stockage local, certificats. **C'est quoi ?** Test sécu complet de votre app mobile. **Pourquoi ?** Apps mobiles stockent données sensibles (tokens, user data), communiquent APIs, et sont facilement décompilables. OWASP Mobile Top 10. Reverse engineering, MitM, injection. 5-15k€ par plateforme.`,

  "pentest-api": `Audit sécurité API REST/GraphQL : auth, injection, rate limiting, IDOR. **C'est quoi ?** Pentest spécialisé API (pas interface web). **Pourquoi ?** APIs = cible privilégiée (automatisable), souvent moins protégées que UI, et exploits = accès data massif. OWASP API Top 10. Broken auth #1. Fuzzing, injection, BOLA/IDOR. 3-10k€.`,

  "pentest-wifi": `Audit WiFi et réseau sans fil : WPA3, rogue AP, evil twin, déauth. **C'est quoi ?** Test sécurité de vos réseaux WiFi corporate. **Pourquoi ?** WiFi faible = porte d'entrée réseau. WPA2 cassable, rogue AP passent inaperçus. Test simule attaque café voisin, employee malveillant. WPA3 obligatoire, segmentation invités. 2-5k€. Souvent négligé.`,

  "social-engineering": `Test d'ingénierie sociale : phishing, vishing, tailgating physique. **C'est quoi ?** Simulation d'attaques ciblant humains (pas machines). **Pourquoi ?** 85% breaches commencent par phishing. Teste awareness employés, identifie vulns humaines, et sensibilise (employés cliquent = formation). Campagne phishing simulée 1-5k€, physique 5-15k€. Impacts durables.`,

  "cloud-security-audit": `Audit sécurité Cloud : AWS/Azure/GCP config, IAM, encryption, monitoring. **C'est quoi ?** Review sécurité de votre infra cloud. **Pourquoi ?** Cloud mal configuré = buckets S3 publics (massive breaches). Audit vérifie IAM (least privilege), encryption, VPC segmentation, logging CloudTrail. CIS AWS Foundations. 5-20k€. Évite headlines.`,

  "container-security": `Audit conteneurs et Kubernetes : images, runtime, secrets, network policies. **C'est quoi ?** Sécurité de votre stack Docker/K8s. **Pourquoi ?** Conteneurs = nouvelle surface attaque. Images vulnérables, secrets exposés (env vars), privilege escalation. Audit scanne images (Trivy), review RBAC K8s, network policies, admission controllers. 5-15k€. DevSecOps critical.`,

  "iot-security": `Audit IoT et objets connectés : firmware, protocoles, communication, hardening. **C'est quoi ?** Sécurité de vos devices connectés (capteurs, caméras, etc.). **Pourquoi ?** IoT = maillons faibles (Mirai botnet 2016). Firmware obsolètes, mots de passe par défaut, protocoles non chiffrés. Audit reverse firmware, sniff réseau, hardening. 5-20k€. Secteur industriel critique.`,

  // Compliance
  "compliance-rgpd": `Conformité RGPD audit et mise en conformité : registre, PIA, procédures. **C'est quoi ?** Accompagnement complet conformité RGPD. **Pourquoi ?** OBLIGATION LÉGALE UE. Registre traitements, analyses d'impact (PIA), procédures, formation équipes. DPO externalisé possible. Audit 3-10k€, mise conformité 5-30k€. Évite amendes 20M€/4% CA.`,

  "compliance-iso27001": `Conformité ISO 27001 : SMSI, analyse risques, certification. **C'est quoi ?** Norme internationale système management sécurité. **Pourquoi ?** Différenciateur B2B (grands comptes exigent ISO27001), framework complet (114 contrôles), certification reconnue mondialement. Gap analysis 5-10k€, mise en œuvre 20-100k€, audit certif 10-30k€. Investissement payant.`,

  // Web App Audits
  "webapp-audit-1": `Audit sécurité 1 application web : OWASP Top 10, business logic, auth. **C'est quoi ?** Pentest complet d'une webapp. **Pourquoi ?** 90% apps ont au moins 1 vulnérabilité critique. Injection SQL, XSS, auth broken. Rapport détaillé + recommandations. 3-8k€ selon complexité. Pré-prod idéal. Fix avant hackers.`,

  "webapp-audit-2-5": `Audit sécurité 2-5 applications web : testing parallèle, rapport consolidé. **C'est quoi ?** Pentest de plusieurs webapps avec économies d'échelle. **Pourquoi ?** Suite d'apps (backoffice + frontend + API)? Audit groupé 20-30% moins cher. Rapport compare maturité sécu entre apps. 10-30k€. Priorise corrections globales.`,

  "webapp-audit-6-10": `Audit sécurité 6-10 applications web : programme complet, retests inclus. **C'est quoi ?** Programme d'audit pour portfolio d'apps. **Pourquoi ?** Nombreuses apps = besoin programme annuel. Tests échelonnés, retests post-fix inclus, trending sécurité. 30-80k€. Enterprise scale. Budget sécu planifié.`,

  // AI/Automation
  "ai-integration-openai": `Intégration OpenAI GPT : chatbot, génération contenu, analyse texte. **C'est quoi ?** Connexion à l'API OpenAI pour features IA. **Pourquoi ?** Support automatisé 24/7 (chatbot répond 80% questions), génération contenu (descriptions produits), résumés, traduction. GPT-4 puissant. Coût usage-based (0,01-0,06$/1k tokens). ROI si volume.`,

  "ai-content-generation": `Génération de contenu par IA : textes, descriptions, résumés automatiques. **C'est quoi ?** IA écrit vos textes automatiquement. **Pourquoi ?** Gain temps colossal (500 descriptions produits en 1h vs 1 semaine), SEO amélioré (contenu unique), multilingue facile. Relecture humaine recommandée. GPT-4, Claude, Mistral. 80% temps gagné.`,

  "ai-image-generation": `Génération d'images par IA : Midjourney, DALL-E, Stable Diffusion. **C'est quoi ?** IA crée images custom depuis descriptions. **Pourquoi ?** Économie photographe/designer (10-100x moins cher), itérations rapides (20 variations en 5min), et impossible autrement (concepts abstraits). Qualité pro maintenant. Midjourney leader. Révolution créative.`,

  "ai-recommendations": `Recommandations produits par IA : personnalisation avancée, ML. **C'est quoi ?** Algorithme ML suggère produits selon comportement utilisateur. **Pourquoi ?** Panier moyen +25%, engagement x2, et Amazon-like experience. Collaborative filtering + content-based. TensorFlow Recommenders. Besoin volume données (>10k users idéal). ROI énorme si scale.`,

  "ai-chatbot-custom": `Chatbot IA personnalisé : entraîné sur vos données, RAG, fine-tuning. **C'est quoi ?** Chatbot expert de votre domaine, pas générique. **Pourquoi ?** Répond questions spécifiques produits/services (GPT standard = pas vos données), réduit support 60%, et conversion +35%. RAG (Retrieval Augmented Generation) = base connaissances. LangChain, LlamaIndex. Différenciateur.`,

  // Monitoring & DevOps
  "monitoring-basic": `Monitoring basique : uptime, alertes downtime, logs essentiels. **C'est quoi ?** Surveillance que votre site est up. **Pourquoi ?** Downtime = perte CA directe (Amazon perd 220k$/minute). Alerte immédiate si down. Pingdom, UptimeRobot gratuit. Logs = debug. Minimum vital. SLA 99,9% = 43min downtime/mois max.`,

  "monitoring-advanced": `Monitoring avancé : APM, métriques perfs, distributed tracing, alerting intelligent. **C'est quoi ?** Monitoring professionnel avec détails performances. **Pourquoi ?** Détecte problèmes avant users (slow query = fix avant timeout), root cause rapide (tracing), capacity planning. DataDog, New Relic, Grafana+Prometheus. 5-50€/host/mois. ROI = reliability.`,

  "ci-cd": `CI/CD Pipeline : intégration continue, déploiement automatique, tests auto. **C'est quoi ?** Automatisation totale du déploiement (git push → prod en 5min). **Pourquoi ?** Déploiements 10-100x/jour possibles (vs 1/mois manuel), erreurs humaines éliminées, rollback instant si bug. GitHub Actions, GitLab CI, Jenkins. DevOps moderne indispensable. 10x productivité.`,

  "backup-disaster-recovery": `Backup et disaster recovery : sauvegardes automatiques, RPO/RTO garantis. **C'est quoi ?** Stratégie complète de sauvegarde et plan de reprise. **Pourquoi ?** Ransom, incendie, erreur = data loss. Backup 3-2-1 (3 copies, 2 supports, 1 off-site). RPO = perte max acceptable (1h?), RTO = délai restauration (4h?). Tests restauration obligatoires. Backblaze, S3 Glacier. Assurance survie.`,
};

// Lire le fichier
const filePath = "src/lib/pricing/features.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Compter les ajouts
let addedCount = 0;
let skippedCount = 0;

// Pour chaque feature ID dans notre mapping
Object.entries(explanations).forEach(([featureId, explanation]) => {
  // Échapper les caractères spéciaux dans l'ID pour regex
  const escapedId = featureId.replace(/[+*?^${}()|[\]\\]/g, "\\$&");

  // Essayer plusieurs patterns de regex
  const patterns = [
    // Pattern standard
    new RegExp(
      `(\\{[^}]*?id:\\s*["']${escapedId}["'][^}]*?description:\\s*["']([^"']*?)["'],)([^}]*?category:)`,
      "s",
    ),
    // Pattern alternatif
    new RegExp(
      `(id:\\s*["']${escapedId}["'][^}]*?description:\\s*["']([^"']*?)["'])([^}]*?)`,
      "s",
    ),
  ];

  let matched = false;
  for (const regex of patterns) {
    const match = content.match(regex);
    if (match && !match[0].includes("explanation:")) {
      const replacement = `$1,\n      explanation: \`${explanation}\`$3`;
      content = content.replace(regex, replacement);
      addedCount++;
      console.log(`✓ Added explanation for: ${featureId}`);
      matched = true;
      break;
    }
  }

  if (!matched) {
    skippedCount++;
  }
});

// Écrire le fichier modifié
fs.writeFileSync(filePath, content, "utf-8");

console.log(`\n✅ Done! Added ${addedCount} explanations to features.ts`);
console.log(
  `⚠ Skipped ${skippedCount} features (already explained or not found)`,
);
console.log("Please review the file and test your application.");
