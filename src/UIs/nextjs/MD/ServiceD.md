<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services SMIDJAN - Excellence Web & Cybersécurité</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            line-height: 1.7;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: rgba(10, 10, 10, 0.95);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(255, 120, 0, 0.1);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ff7800;
        }
        
        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }
        
        nav a {
            color: #fff;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        nav a:hover {
            color: #ff7800;
        }
        
        .hero {
            padding: 100px 0 80px;
            background: linear-gradient(135deg, rgba(255, 120, 0, 0.1) 0%, rgba(10, 10, 10, 0.9) 100%);
        }
        
        .hero-badge {
            display: inline-block;
            background: rgba(255, 120, 0, 0.2);
            color: #ff7800;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }
        
        h1 {
            font-size: 52px;
            line-height: 1.2;
            margin-bottom: 30px;
            font-weight: 700;
        }
        
        .hero p {
            font-size: 18px;
            color: #b0b0b0;
            max-width: 700px;
            margin-bottom: 40px;
            line-height: 1.8;
        }
        
        .cta-buttons {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 15px 35px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
            cursor: pointer;
            border: none;
        }
        
        .btn-primary {
            background: #ff7800;
            color: #fff;
        }
        
        .btn-primary:hover {
            background: #ff9033;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255, 120, 0, 0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: #fff;
            border: 2px solid #333;
        }
        
        .btn-secondary:hover {
            border-color: #ff7800;
            color: #ff7800;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            padding: 60px 0;
            margin: 40px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 42px;
            font-weight: 700;
            color: #ff7800;
            margin-bottom: 10px;
        }
        
        .stat-label {
            color: #b0b0b0;
            font-size: 14px;
        }
        
        .section {
            padding: 80px 0;
        }
        
        h2 {
            font-size: 42px;
            margin-bottom: 20px;
            font-weight: 700;
        }
        
        .highlight {
            color: #ff7800;
        }
        
        .section-intro {
            font-size: 18px;
            color: #b0b0b0;
            max-width: 800px;
            margin-bottom: 60px;
            line-height: 1.8;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }
        
        .service-card {
            background: rgba(255, 255, 255, 0.03);
            padding: 40px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 120, 0, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .service-icon {
            font-size: 36px;
            margin-bottom: 20px;
        }
        
        h3 {
            font-size: 24px;
            margin-bottom: 15px;
            color: #fff;
        }
        
        .service-description {
            color: #b0b0b0;
            margin-bottom: 25px;
            line-height: 1.7;
        }
        
        .service-features {
            list-style: none;
        }
        
        .service-features li {
            padding: 10px 0;
            color: #d0d0d0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: start;
        }
        
        .service-features li:before {
            content: "→";
            color: #ff7800;
            margin-right: 12px;
            font-weight: bold;
        }
        
        .service-features li:last-child {
            border-bottom: none;
        }
        
        .methodology {
            background: rgba(255, 120, 0, 0.05);
            border-radius: 16px;
            padding: 60px 40px;
            margin: 60px 0;
        }
        
        .method-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-top: 50px;
        }
        
        .method-step {
            position: relative;
        }
        
        .step-number {
            font-size: 60px;
            font-weight: 700;
            color: rgba(255, 120, 0, 0.2);
            position: absolute;
            top: -20px;
            left: 0;
        }
        
        .step-content {
            padding-top: 30px;
        }
        
        .step-title {
            font-size: 20px;
            margin-bottom: 12px;
            color: #fff;
        }
        
        .step-description {
            color: #b0b0b0;
            line-height: 1.7;
        }
        
        .why-us {
            background: linear-gradient(135deg, rgba(255, 120, 0, 0.05) 0%, rgba(10, 10, 10, 0.9) 100%);
            padding: 80px 0;
            margin: 60px 0;
        }
        
        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .benefit-card {
            background: rgba(255, 255, 255, 0.02);
            padding: 35px;
            border-radius: 12px;
            border-left: 4px solid #ff7800;
        }
        
        .benefit-title {
            font-size: 20px;
            margin-bottom: 12px;
            color: #ff7800;
        }
        
        .benefit-text {
            color: #c0c0c0;
            line-height: 1.7;
        }
        
        .tech-stack {
            padding: 60px 0;
        }
        
        .tech-categories {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .tech-category {
            background: rgba(255, 255, 255, 0.02);
            padding: 30px;
            border-radius: 10px;
        }
        
        .tech-category h4 {
            color: #ff7800;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .tech-list {
            color: #b0b0b0;
            font-size: 14px;
            line-height: 2;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #ff7800 0%, #ff9944 100%);
            padding: 60px;
            border-radius: 16px;
            margin: 80px 0;
            text-align: center;
        }
        
        .cta-section h2 {
            color: #fff;
            margin-bottom: 20px;
        }
        
        .cta-section p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            max-width: 700px;
            margin: 0 auto 30px;
        }
        
        .btn-white {
            background: #fff;
            color: #ff7800;
        }
        
        .btn-white:hover {
            background: #f0f0f0;
            transform: translateY(-2px);
        }
        
        .testimonial {
            background: rgba(255, 255, 255, 0.03);
            padding: 40px;
            border-radius: 12px;
            margin: 40px 0;
            border-left: 4px solid #ff7800;
        }
        
        .testimonial-text {
            font-size: 18px;
            font-style: italic;
            color: #d0d0d0;
            margin-bottom: 20px;
            line-height: 1.8;
        }
        
        .testimonial-author {
            color: #ff7800;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 36px;
            }
            
            h2 {
                font-size: 32px;
            }
            
            .services-grid,
            .method-grid,
            .benefits-grid {
                grid-template-columns: 1fr;
            }
            
            nav ul {
                display: none;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">🔥 SMIDJAN</div>
                <ul>
                    <li><a href="#projets">Projets</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <span class="hero-badge">SERVICES SMIDJAN</span>
            <h1>Des services pensés pour la<br>performance, la sécurité et<br>la scalabilité</h1>
            <p>Nous concevons, sécurisons et automatisons des systèmes web qui durent dans le temps. Un seul objectif : livrer vite, propre et executable, sans complexité inutile. De la conception applicative à la cybersécurité en passant par l'automatisation, chaque pôle travaille sur un socle commun : code propre, documentation exhaustive et accompagnement humain.</p>
            <div class="cta-buttons">
                <a href="#contact" class="btn btn-white">Démarrer un projet</a>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2>Nos <span class="highlight">cas d'usage</span> les plus demandés</h2>
            <p class="section-intro">Découvrez comment nos clients utilisent nos services pour résoudre leurs défis techniques et business les plus complexes.</p>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">🛒</div>
                    <h3>E-commerce haute performance</h3>
                    <p class="service-description">Boutiques en ligne rapides et sécurisées qui convertissent. Gestion catalogue, paiements, logistique et marketing automation intégrés.</p>
                    <ul class="service-features">
                        <li>Architecture headless pour flexibilité maximale</li>
                        <li>Checkout optimisé pour réduire l'abandon de panier</li>
                        <li>Intégration multi-marketplaces (Amazon, eBay, etc.)</li>
                        <li>Système de recommandations IA personnalisées</li>
                        <li>Gestion avancée des promotions et codes promo</li>
                        <li>Synchronisation temps réel avec votre ERP</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">📊</div>
                    <h3>Plateformes SaaS & Dashboards</h3>
                    <p class="service-description">Applications web métier avec authentification multi-rôles, tableaux de bord temps réel et gestion d'abonnements récurrents.</p>
                    <ul class="service-features">
                        <li>Architecture multi-tenant sécurisée</li>
                        <li>Systèmes d'abonnement Stripe/PayPal intégrés</li>
                        <li>Tableaux de bord analytics interactifs</li>
                        <li>Gestion fine des permissions utilisateurs</li>
                        <li>API RESTful complète pour vos clients</li>
                        <li>Onboarding automatisé et gamification</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">🏢</div>
                    <h3>Portails internes & Intranets</h3>
                    <p class="service-description">Espaces collaboratifs sécurisés pour centraliser vos outils, documents et processus métier. Gain de productivité immédiat.</p>
                    <ul class="service-features">
                        <li>Single Sign-On (SSO) avec Active Directory</li>
                        <li>Gestion documentaire avancée avec versioning</li>
                        <li>Workflows d'approbation automatisés</li>
                        <li>Messagerie et notifications intelligentes</li>
                        <li>Intégration complète avec Microsoft 365/Google Workspace</li>
                        <li>Modules RH personnalisables (congés, notes de frais)</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">📱</div>
                    <h3>Applications mobiles (PWA)</h3>
                    <p class="service-description">Progressive Web Apps qui fonctionnent comme des apps natives iOS/Android, sans passer par les stores. Installation en un clic.</p>
                    <ul class="service-features">
                        <li>Expérience native sur tous les appareils</li>
                        <li>Fonctionnement offline avec synchronisation</li>
                        <li>Notifications push sans app store</li>
                        <li>Installation depuis le navigateur</li>
                        <li>Performances optimales et chargement instantané</li>
                        <li>Accès aux fonctionnalités du téléphone (caméra, GPS)</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">🤖</div>
                    <h3>Assistants IA & Chatbots</h3>
                    <p class="service-description">Agents conversationnels intelligents qui répondent à vos clients 24/7, qualifient les leads et automatisent votre support.</p>
                    <ul class="service-features">
                        <li>Compréhension naturelle du langage (NLP)</li>
                        <li>Entraînement sur vos données et documentation</li>
                        <li>Intégration CRM pour tracking des conversations</li>
                        <li>Escalade automatique vers humains si besoin</li>
                        <li>Support multilingue avec détection automatique</li>
                        <li>Analytics détaillés sur les conversations</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">🔗</div>
                    <h3>Intégrations & API</h3>
                    <p class="service-description">Connectez tous vos outils entre eux. CRM, ERP, comptabilité, email marketing... Un écosystème unifié sans saisies manuelles.</p>
                    <ul class="service-features">
                        <li>Connecteurs pour 500+ applications (Salesforce, HubSpot...)</li>
                        <li>Développement d'API REST/GraphQL sur mesure</li>
                        <li>Synchronisation bidirectionnelle en temps réel</li>
                        <li>Transformation et enrichissement de données</li>
                        <li>Gestion d'erreurs et retry automatique</li>
                        <li>Monitoring et logs détaillés des flux</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="section" style="background: rgba(255, 255, 255, 0.02); padding: 80px 0;">
        <div class="container">
            <h2>Notre <span class="highlight">processus de sécurité</span></h2>
            <p class="section-intro">La sécurité n'est pas une fonctionnalité optionnelle, c'est la fondation sur laquelle nous construisons chaque projet. Voici comment nous protégeons vos actifs numériques.</p>
            
            <div class="benefits-grid" style="margin-top: 50px;">
                <div class="benefit-card">
                    <h3 class="benefit-title">🔍 Audit de sécurité initial</h3>
                    <p class="benefit-text">Analyse complète OWASP Top 10, scan de vulnérabilités automatisé et manuel, revue d'architecture, identification des surfaces d'attaque et recommandations priorisées.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">🛡️ Développement sécurisé</h3>
                    <p class="benefit-text">Code reviews systématiques, validation des inputs, protection XSS/CSRF, gestion sécurisée des secrets, chiffrement des données sensibles et principe du moindre privilège.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">🔐 Authentification robuste</h3>
                    <p class="benefit-text">Multi-factor authentication (MFA), OAuth 2.0 / OpenID Connect, gestion de sessions sécurisée, politique de mots de passe forte et protection contre le brute force.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">📡 Monitoring 24/7</h3>
                    <p class="benefit-text">Détection d'intrusions en temps réel, alertes automatiques sur activités suspectes, logs centralisés et chiffrés, analyse comportementale et réponse rapide aux incidents.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">🔄 Mises à jour continues</h3>
                    <p class="benefit-text">Patchs de sécurité appliqués sous 24h, veille active sur les CVE, mise à jour des dépendances, tests de non-régression automatisés et communication transparente.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">📋 Conformité & RGPD</h3>
                    <p class="benefit-text">Respect RGPD garanti, registre des traitements, politique de confidentialité, gestion des consentements, droit à l'oubli implémenté et documentation complète.</p>
                </div>
            </div>

            <div class="testimonial" style="margin-top: 50px;">
                <p class="testimonial-text">"Après un audit de sécurité complet réalisé par SMIDJAN, nous avons identifié et corrigé 23 vulnérabilités critiques que nous ignorions. Leur approche proactive nous a évité ce qui aurait pu être une catastrophe."</p>
                <div class="testimonial-author">— Thomas Leroy, RSSI chez FinanceSecure</div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2>Nos <span class="highlight">formules d'accompagnement</span></h2>
            <p class="section-intro">Que vous ayez besoin d'un projet ponctuel ou d'un partenariat long terme, nous avons une formule adaptée à vos besoins et à votre budget.</p>
            
            <div class="services-grid" style="margin-top: 50px;">
                <div class="service-card">
                    <div class="service-icon">🚀</div>
                    <h3>Projet au forfait</h3>
                    <p class="service-description">Idéal pour un besoin précis avec périmètre défini. Budget fixe, délai garanti, livrables contractuels. Vous payez pour un résultat, pas pour du temps passé.</p>
                    <ul class="service-features">
                        <li>Cahier des charges détaillé co-construit</li>
                        <li>Prix fixe défini dès le départ</li>
                        <li>Planning avec jalons et livrables</li>
                        <li>Recette utilisateur avant mise en production</li>
                        <li>3 mois de garantie post-lancement inclus</li>
                        <li>Documentation complète fournie</li>
                    </ul>
                    <p style="margin-top: 20px; color: #ff7800; font-weight: 600;">À partir de 5 000€</p>
                </div>

                <div class="service-card" style="border: 2px solid #ff7800;">
                    <span style="background: #ff7800; color: #fff; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600;">POPULAIRE</span>
                    <div class="service-icon">⚡</div>
                    <h3>Régie mensuelle</h3>
                    <p class="service-description">Flexibilité maximale pour faire évoluer votre projet au fil de l'eau. Ajustement des priorités chaque sprint, équipe dédiée à votre disposition.</p>
                    <ul class="service-features">
                        <li>Équipe technique dédiée (dev, devops, PM)</li>
                        <li>Sprints de 2 semaines avec démos régulières</li>
                        <li>Ajustement des priorités à chaque sprint</li>
                        <li>Engagement minimum 3 mois</li>
                        <li>Accès direct aux développeurs (Slack, calls)</li>
                        <li>Reporting hebdomadaire détaillé</li>
                    </ul>
                    <p style="margin-top: 20px; color: #ff7800; font-weight: 600;">À partir de 8 000€/mois</p>
                </div>

                <div class="service-card">
                    <div class="service-icon">🤝</div>
                    <h3>Partenariat long terme</h3>
                    <p class="service-description">Nous devenons votre DSI externalisée. Développement, maintenance, évolutions, sécurité, support... Tout est inclus dans un forfait mensuel prévisible.</p>
                    <ul class="service-features">
                        <li>CTO as a Service : stratégie tech complète</li>
                        <li>Développement illimité selon roadmap</li>
                        <li>Maintenance préventive et corrective 24/7</li>
                        <li>Support technique prioritaire < 2h</li>
                        <li>Audits de sécurité trimestriels</li>
                        <li>Formation continue de vos équipes</li>
                    </ul>
                    <p style="margin-top: 20px; color: #ff7800; font-weight: 600;">Sur devis personnalisé</p>
                </div>
            </div>

            <div class="testimonial" style="margin-top: 50px;">
                <p class="testimonial-text">"Nous avons démarré avec un projet forfait, puis sommes passés en régie mensuelle tant la collaboration était fluide. SMIDJAN est devenu une extension naturelle de notre équipe tech."</p>
                <div class="testimonial-author">— Sophie Martin, CEO chez StartupLab</div>
            </div>
        </div>
    </section>

    <section class="section" style="background: rgba(255, 255, 255, 0.02); padding: 80px 0;">
        <div class="container">
            <h2>Questions <span class="highlight">fréquentes</span></h2>
            
            <div style="max-width: 800px; margin: 50px auto 0;">
                <div class="service-card" style="margin-bottom: 20px;">
                    <h3 style="color: #ff7800; margin-bottom: 15px;">Quels sont vos délais de livraison typiques ?</h3>
                    <p style="color: #c0c0c0; line-height: 1.7;">Cela dépend de la complexité du projet. Un site vitrine prend 2-4 semaines, une application web sur mesure 2-4 mois, et une plateforme complexe 4-8 mois. Nous vous donnons toujours un planning réaliste dès la phase de cadrage, avec des jalons intermédiaires pour valider l'avancement.</p>
                </div>

                <div class="service-card" style="margin-bottom: 20px;">
                    <h3 style="color: #ff7800; margin-bottom: 15px;">Proposez-vous de la maintenance après livraison ?</h3>
                    <p style="color: #c0c0c0; line-height: 1.7;">Absolument. Tous nos projets incluent 3 mois de garantie post-lancement. Au-delà, nous proposons des contrats de maintenance mensuels (à partir de 500€/mois) qui couvrent les mises à jour de sécurité, la résolution de bugs, le monitoring, les sauvegardes et le support technique prioritaire.</p>
                </div>

                <div class="service-card" style="margin-bottom: 20px;">
                    <h3 style="color: #ff7800; margin-bottom: 15px;">Travaillez-vous avec des sous-traitants ?</h3>
                    <p style="color: #c0c0c0; line-height: 1.7;">Non, toute notre équipe est en interne. Vous travaillez directement avec nos développeurs, designers et chefs de projet. Pas d'intermédiaires, pas de déperdition d'information. Cela garantit la qualité, la sécurité de vos données et la réactivité de nos équipes.</p>
                </div>

                <div class="service-card" style="margin-bottom: 20px;">
                    <h3 style="color: #ff7800; margin-bottom: 15px;">Comment garantissez-vous la sécurité de mes données ?</h3>
                    <p style="color: #c0c0c0; line-height: 1.7;">Nous appliquons les standards OWASP, utilisons des serveurs européens certifiés ISO 27001, chiffrons toutes les données sensibles (SSL/TLS, chiffrement at-rest), effectuons des audits de sécurité réguliers et signons des NDA strictes. Nous sommes également conformes RGPD sur tous nos projets.</p>
                </div>

                <div class="service-card" style="margin-bottom: 20px;">
                    <h3 style="color: #ff7800; margin-bottom: 15px;">Puis-je récupérer mon code source ?</h3>
                    <p style="color: #c0c0c0; line-height: 1.7;">Oui, vous êtes propriétaire à 100% du code source que nous développons pour vous. À la fin du projet, vous recevez l'intégralité du code sur un dépôt Git privé, plus toute la documentation technique. Vous êtes libre de le faire évoluer en interne ou avec un autre prestataire si besoin.</p>
                </div>

                <div class="service-card">
                    <h3 style="color: #ff7800; margin-bottom: 15px;">Acceptez-vous les petits budgets ?</h3>
                    <p style="color: #c0c0c0; line-height: 1.7;">Nous travaillons sur des projets à partir de 5 000€. Pour les budgets plus serrés, nous pouvons vous orienter vers notre CMS SMIDJAN qui permet de réduire significativement les coûts de développement, ou proposer un MVP (produit minimum viable) que vous pourrez faire évoluer progressivement.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-section" style="margin-top: 80px;">
        <div class="container">
            <h2>Prêt à transformer votre vision en réalité ?</h2>
            <p>Discutons de votre projet sans engagement. Premier échange de 30 minutes offert pour analyser vos besoins, vous conseiller sur la faisabilité technique et vous proposer une estimation budgétaire réaliste.</p>
            <div class="cta-buttons" style="justify-content: center; margin-top: 30px;">
                <a href="#contact" class="btn btn-white">Réserver un appel gratuit</a>
                <a href="mailto:contact@smidjan.com" class="btn btn-white" style="background: transparent; border: 2px solid #fff;">Envoyer un email</a>
            </div>
        </div>
    </section>

    <footer style="background: rgba(0, 0, 0, 0.5); padding: 60px 0 30px; margin-top: 80px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px;">
                <div>
                    <div class="logo" style="margin-bottom: 20px;">🔥 SMIDJAN</div>
                    <p style="color: #b0b0b0; line-height: 1.7;">Votre partenaire technologique pour des solutions web performantes, sécurisées et évolutives.</p>
                </div>
                
                <div>
                    <h4 style="color: #ff7800; margin-bottom: 15px;">Services</h4>
                    <ul style="list-style: none; color: #b0b0b0; line-height: 2;">
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">Développement Web</a></li>
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">Cybersécurité</a></li>
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">Automatisation & IA</a></li>
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">SMIDJAN CMS</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 style="color: #ff7800; margin-bottom: 15px;">Entreprise</h4>
                    <ul style="list-style: none; color: #b0b0b0; line-height: 2;">
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">À propos</a></li>
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">Projets</a></li>
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">Blog</a></li>
                        <li><a href="#" style="color: #b0b0b0; text-decoration: none;">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 style="color: #ff7800; margin-bottom: 15px;">Contact</h4>
                    <p style="color: #b0b0b0; line-height: 2;">
                        Email: contact@smidjan.com<br>
                        Tél: +33 (0)1 XX XX XX XX<br>
                        LinkedIn: /company/smidjan
                    </p>
                </div>
            </div>
            
            <div style="text-align: center; padding-top: 30px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: #808080; font-size: 14px;">
                <p>© 2025 SMIDJAN. Tous droits réservés. | <a href="#" style="color: #808080;">Mentions légales</a> | <a href="#" style="color: #808080;">Politique de confidentialité</a></p>
            </div>
        </div>
    </footer>
</body>
</html>btn btn-primary">Démarrer un projet</a>
                <a href="#services" class="btn btn-secondary">Découvrir nos CMS</a>
            </div>
        </div>
    </section>

    <div class="container">
        <div class="stats">
            <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">Taux de satisfaction client</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">150+</div>
                <div class="stat-label">Projets livrés avec succès</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support technique disponible</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">5 ans</div>
                <div class="stat-label">D'expertise en développement</div>
            </div>
        </div>
    </div>

    <section class="section">
        <div class="container">
            <h2>Trois pôles, un <span class="highlight">même niveau d'exigence</span></h2>
            <p class="section-intro">De la conception applicative à la cybersécurité en passant par l'automatisation, chaque pôle travaille sur un socle commun : code propre, documentation exhaustive et accompagnement humain. Notre approche garantit que chaque ligne de code contribue à vos objectifs business tout en respectant les standards les plus élevés de l'industrie.</p>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">💻</div>
                    <h3>Développement Web</h3>
                    <p class="service-description">Applications et sites sur mesure React.js, frameworks modernes et CMS évolutifs. Nous transformons vos idées en produits digitaux performants qui grandissent avec votre entreprise.</p>
                    <ul class="service-features">
                        <li>Architecture modulaire et évolutive conçue pour la croissance à long terme</li>
                        <li>Interfaces utilisateur intuitives avec React, Next.js et composants réutilisables</li>
                        <li>CMS modulaire (Django, contenu, SEO) pour une gestion autonome simplifiée</li>
                        <li>Optimisation des performances (temps de chargement, Core Web Vitals, SEO technique)</li>
                        <li>Intégration d'APIs tierces et développement de microservices sur mesure</li>
                        <li>Progressive Web Apps (PWA) pour une expérience mobile native</li>
                        <li>Performance et Core Web Vitals optimisés pour le référencement naturel</li>
                        <li>Documentation technique complète pour faciliter la maintenance et les évolutions futures</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">🔒</div>
                    <h3>Cybersécurité Web</h3>
                    <p class="service-description">Sécurité intégrée dès le début. Audit OWASP de vos infrastructures, monitoring continu et réponses aux incidents. Nous protégeons vos données et celles de vos utilisateurs avec une approche proactive de la sécurité.</p>
                    <ul class="service-features">
                        <li>Audits de sécurité OWASP complets avec analyse des vulnérabilités critiques</li>
                        <li>Tests d'intrusion (pentesting) pour identifier les failles avant les attaquants</li>
                        <li>Environnement hardware sécurisé (serveurs, suivi temps réel) avec logs chiffrés</li>
                        <li>Monitoring continu et alertes en temps réel sur activités suspectes</li>
                        <li>Protection DDoS multi-niveaux et pare-feu applicatifs avancés</li>
                        <li>Chiffrement des données sensibles (SSL/TLS, chiffrement bout-en-bout)</li>
                        <li>Gestion sécurisée des secrets et des accès avec authentification forte</li>
                        <li>Plan de réponse aux incidents et assistance 24/7 en cas d'urgence</li>
                    </ul>
                </div>

                <div class="service-card">
                    <div class="service-icon">⚡</div>
                    <h3>Automatisation & IA</h3>
                    <p class="service-description">Automatisez vos processus redondants, réduisez vos coûts et gagnez du temps. Workflows IA, chatbots intelligents, intégrations CRM et outils métier pour booster votre productivité sans effort.</p>
                    <ul class="service-features">
                        <li>Automatisation des processus métier (RPA) pour éliminer les tâches répétitives</li>
                        <li>Workflows IA personnalisés (GPT, assistants vocaux) adaptés à votre secteur</li>
                        <li>Chatbots intelligents et agents conversationnels disponibles 24/7</li>
                        <li>Intégrations CRM/ERP complexes (Salesforce, HubSpot, SAP, Odoo)</li>
                        <li>Connecteurs inter-outils pour unifier vos systèmes existants</li>
                        <li>Webhooks sécurisés pour synchronisation en temps réel</li>
                        <li>Tableaux de bord analytics avec visualisation des données et KPI en direct</li>
                        <li>Scripts d'automatisation sur mesure pour vos besoins spécifiques</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="methodology">
        <div class="container">
            <h2>Un cycle projet <span class="highlight">clair et documenté</span></h2>
            <p class="section-intro">Chaque mission suit un déroulé maîtrisé : cadrage, architecture, implémentation puis livraison et suivi. Vous savez où nous en sommes, ce qui reste à faire, et ce qui vous attend après la mise en production. Transparence totale, pas de surprises.</p>
            
            <div class="method-grid">
                <div class="method-step">
                    <div class="step-number">01</div>
                    <div class="step-content">
                        <h3 class="step-title">Cadrage</h3>
                        <p class="step-description">Analyse de contexte, des objectifs et des contraintes pour définir un cahier des charges précis. Nous identifions ensemble vos priorités business et validons la faisabilité technique. Livrable : Document de cadrage détaillé avec planning prévisionnel.</p>
                    </div>
                </div>
                
                <div class="method-step">
                    <div class="step-number">02</div>
                    <div class="step-content">
                        <h3 class="step-title">Architecture</h3>
                        <p class="step-description">Conception technique des flux, choix des technologies et design system. Nous établissons les schémas d'infrastructure, définissons les APIs et créons les maquettes UX/UI. Livrable : Dossier d'architecture technique avec schémas et prototypes interactifs.</p>
                    </div>
                </div>
                
                <div class="method-step">
                    <div class="step-number">03</div>
                    <div class="step-content">
                        <h3 class="step-title">Implémentation</h3>
                        <p class="step-description">Développement itératif avec revues hebdomadaires et tests continus. Code versionné, automatisation CI/CD et sécurisation progressive. Points d'étape réguliers pour valider l'avancement. Livrable : Application fonctionnelle testée avec documentation développeur.</p>
                    </div>
                </div>
                
                <div class="method-step">
                    <div class="step-number">04</div>
                    <div class="step-content">
                        <h3 class="step-title">Livraison & suivi</h3>
                        <p class="step-description">Mise en production sécurisée, formation des équipes et accompagnement post-lancement. Plan de maintenance préventive, monitoring continu et disponibilité garantie. Livrable : Documentation utilisateur complète et plan de support personnalisé.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="why-us">
        <div class="container">
            <h2>Pourquoi choisir <span class="highlight">SMIDJAN</span> ?</h2>
            <p class="section-intro">Nous ne sommes pas juste une agence de développement. Nous sommes vos partenaires technologiques qui comprennent vos enjeux business et vous accompagnent sur le long terme.</p>
            
            <div class="benefits-grid">
                <div class="benefit-card">
                    <h3 class="benefit-title">Expertise multidisciplinaire</h3>
                    <p class="benefit-text">Une équipe qui maîtrise tous les aspects du web moderne : développement frontend/backend, cybersécurité, DevOps, IA et automatisation. Un interlocuteur unique pour tous vos besoins techniques.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">Code maintenable et évolutif</h3>
                    <p class="benefit-text">Nous écrivons du code propre, testé et documenté que vous pourrez faire évoluer pendant des années. Architecture modulaire qui s'adapte à votre croissance sans nécessiter de refonte complète.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">Sécurité dès la conception</h3>
                    <p class="benefit-text">La sécurité n'est pas une option ajoutée après coup. Nous intégrons les meilleures pratiques de cybersécurité dès la première ligne de code pour protéger votre business.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">Accompagnement personnalisé</h3>
                    <p class="benefit-text">Nous prenons le temps de comprendre votre métier, vos contraintes et vos objectifs. Formation de vos équipes, support réactif et conseils stratégiques inclus dans chaque projet.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">Méthodologie transparente</h3>
                    <p class="benefit-text">Vous savez toujours où nous en sommes grâce à des points réguliers, une documentation complète et un accès permanent aux environnements de développement.</p>
                </div>
                
                <div class="benefit-card">
                    <h3 class="benefit-title">ROI mesurable</h3>
                    <p class="benefit-text">Nous ne vendons pas du code, nous créons des solutions qui génèrent de la valeur. KPIs définis dès le départ et tableaux de bord pour mesurer l'impact réel sur votre activité.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section tech-stack">
        <div class="container">
            <h2>Notre <span class="highlight">stack technologique</span></h2>
            <p class="section-intro">Nous travaillons avec les technologies les plus performantes et éprouvées du marché pour garantir la pérennité de vos projets.</p>
            
            <div class="tech-categories">
                <div class="tech-category">
                    <h4>Frontend</h4>
                    <p class="tech-list">React.js • Next.js • TypeScript • Tailwind CSS • Redux • React Query • Framer Motion</p>
                </div>
                
                <div class="tech-category">
                    <h4>Backend</h4>
                    <p class="tech-list">Node.js • Python • Django • FastAPI • PostgreSQL • MongoDB • Redis • GraphQL</p>
                </div>
                
                <div class="tech-category">
                    <h4>Cloud & DevOps</h4>
                    <p class="tech-list">AWS • Azure • Docker • Kubernetes • CI/CD (GitHub Actions) • Terraform • Nginx</p>
                </div>
                
                <div class="tech-category">
                    <h4>Sécurité</h4>
                    <p class="tech-list">OWASP Standards • SSL/TLS • JWT • OAuth 2.0 • Vault • Security Headers • WAF</p>
                </div>
                
                <div class="tech-category">
                    <h4>IA & Automatisation</h4>
                    <p class="tech-list">OpenAI GPT • LangChain • Zapier • n8n • Webhooks • API Integrations • RPA</p>
                </div>
                
                <div class="tech-category">
                    <h4>Analytics</h4>
                    <p class="tech-list">Google Analytics • Mixpanel • Sentry • DataDog • Grafana • Elasticsearch</p>
                </div>
            </div>
        </div>
    </section>

    <section class="container">
        <h2><span class="highlight">SMIDJAN CMS</span>, le socle produit que nous faisons évoluer en continu</h2>
        <p class="section-intro">Un CMS e-commerce headless, sécurisé et administrable. Catalogue produit avec API pour marketing ou stock. Nous l'adaptons via nos propres retours client et ajoutons de nouvelles fonctionnalités chaque trimestre pour rester à la pointe des besoins du marché.</p>
        
        <div class="testimonial">
            <p class="testimonial-text">"Grâce à SMIDJAN, nous avons pu lancer notre plateforme e-commerce en 6 semaines au lieu de 6 mois. Le CMS est d'une flexibilité incroyable et l'équipe a su s'adapter à nos besoins spécifiques sans compromis sur la qualité."</p>
            <div class="testimonial-author">— Marie Dubois, CTO chez TechRetail</div>
        </div>
        
        <div class="services-grid" style="margin-top: 40px;">
            <div class="service-card">
                <h3>✨ Fonctionnalités clés</h3>
                <ul class="service-features">
                    <li>Gestion produits avancée avec variantes et stocks</li>
                    <li>Système de commandes et paiements sécurisés</li>
                    <li>Interface admin intuitive et personnalisable</li>
                    <li>API REST complète pour intégrations tierces</li>
                    <li>Multi-devises et multi-langues natif</li>
                    <li>SEO optimisé et sitemap automatique</li>
                </ul>
            </div>
            
            <div class="service-card">
                <h3>🚀 Avantages business</h3>
                <ul class="service-features">
                    <li>Déploiement rapide (4-8 semaines selon customisation)</li>
                    <li>Coûts réduits vs développement from scratch</li>
                    <li>Évolutions continues incluses dans la maintenance</li>
                    <li>Formation complète de vos équipes</li>
                    <li>Support dédié avec SLA garanti</li>
                    <li>Mises à jour de sécurité automatiques</li>
                </ul>
            </div>
            
            <div class="service-card">
                <h3>🔧 Personnalisation</h3>
                <ul class="service-features">
                    <li>Adaptation complète à votre charte graphique</li>
                    <li>Développement de modules métier sur mesure</li>
                    <li>Intégration avec vos outils existants (CRM, ERP)</li>
                    <li>Workflows automatisés personnalisés</li>
                    <li>Règles business complexes implémentables</li>
                    <li>Analytics et reporting sur mesure</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <h2>Besoin d'un accompagnement sur mesure ?</h2>
            <p>Parlons de votre contexte et de vos contraintes. Nous planifions une session pour vous conseiller sur votre projet : faisabilité, choix tech, sécurité et performance. Premier échange gratuit et sans engagement.</p>
            <a href="#contact" class="