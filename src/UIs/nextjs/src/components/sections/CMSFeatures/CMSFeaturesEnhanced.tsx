"use client";

import { useEffect } from "react";
import "./CMSFeaturesEnhanced.css";

export function CMSFeaturesEnhanced() {
  useEffect(() => {
    // Create floating particles
    function createParticles() {
      const section = document.querySelector('.cms-features-section');
      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cms-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        section!.appendChild(particle);
      }
    }

    // Ripple effect on card click
    function createRipple(e: any) {
      const card = e.currentTarget;
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.className = 'cms-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      card.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    }

    // 3D tilt effect
    function handleMouseMove(e: any) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `
        translateY(-10px)
        scale(1.02)
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    }

    function handleMouseLeave(e: any) {
      const card = e.currentTarget;
      card.style.transform = '';
    }

    // Generate random Martian-like characters
    function generateMartianText(length: number) {
      const martianChars = '◊◈◇◆◉◎●◐◑◒◓◔◕✦✧✨✩✪✫✬✭✮✯✰⬟⬠⬡⬢⬣⬤⬥⬦⬧⬨';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += martianChars[Math.floor(Math.random() * martianChars.length)];
      }
      return result;
    }

    // Decode text letter by letter
    function decodeText(element: any) {
      const originalText = element.getAttribute('data-original');
      const length = originalText.length;
      let currentIndex = 0;

      element.classList.add('cms-decoding');

      const interval = setInterval(() => {
        if (currentIndex <= length) {
          // Build the decoded part + martian remainder
          const decoded = originalText.substring(0, currentIndex);
          const martian = generateMartianText(length - currentIndex);
          element.textContent = decoded + martian;
          currentIndex++;
        } else {
          clearInterval(interval);
          element.textContent = originalText;
          element.classList.remove('cms-decoding');
        }
      }, 50); // Speed of decoding (50ms per character)
    }

    // Initialize
    createParticles();

    const cards = document.querySelectorAll('.cms-feature-card');
    console.log('[CMSFeatures] Initialization - found', cards.length, 'cards');

    // Event handler functions that we can reference for cleanup
    const mouseEnterHandler = function (this: any) {
      const typingElements = this.querySelectorAll('.cms-typing-text');
      console.log('[CMSFeatures] Mouseenter - found', typingElements.length, 'typing elements');
      typingElements.forEach((el: any, index: number) => {
        setTimeout(() => {
          console.log('[CMSFeatures] Decoding element', index, ':', el.getAttribute('data-original'));
          decodeText(el);
        }, index * 200); // Stagger the start of each decode
      });
    };

    const cardMouseLeaveHandler = function (this: any) {
      const typingElements = this.querySelectorAll('.cms-typing-text');
      typingElements.forEach((el: any) => {
        const originalText = el.getAttribute('data-original');
        el.textContent = generateMartianText(originalText!.length);
        el.classList.remove('cms-decoding');
      });
    };

    cards.forEach((card, cardIndex) => {
      // Only add listeners if not already added (check for a marker)
      if (!(card as any).__cmsFeaturesInitialized) {
        card.addEventListener('click', createRipple);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', mouseEnterHandler);
        card.addEventListener('mouseleave', cardMouseLeaveHandler);
        (card as any).__cmsFeaturesInitialized = true;
      }

      // Initialize all typing texts with Martian characters
      const typingElements = card.querySelectorAll('.cms-typing-text');
      console.log('[CMSFeatures] Card', cardIndex, '- found', typingElements.length, 'typing elements');

      typingElements.forEach(el => {
        // Only initialize if not already initialized
        if (!el.getAttribute('data-original')) {
          const originalText = el.textContent;
          console.log('[CMSFeatures] Storing original text:', originalText);
          el.setAttribute('data-original', originalText!);
          el.textContent = generateMartianText(originalText!.length);
        }
      });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'cmsFadeInUp 0.8s ease-out forwards';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cms-feature-card').forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cmsFadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.querySelectorAll('.cms-particle').forEach(p => p.remove());
    };
  }, []);

  return (
    <section className="cms-features-section">
      {/* Animated background */}
      <div className="cms-animated-bg"></div>

      {/* Glowing orbs */}
      <div className="cms-glow-orb cms-glow-orb-1"></div>
      <div className="cms-glow-orb cms-glow-orb-2"></div>

      {/* Header */}
      <div className="cms-header-content">
        <h1>Fonctionnalités natives</h1>
        <p className="cms-subtitle">
          Tu disposes dès l'installation d'un environnement professionnel prêt à l'emploi pour gérer catalogue, commandes, marketing, sécurité et automatisations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="cms-features-grid">
        <div className="cms-feature-card" data-category="catalog">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">01</div>
          <h3 className="cms-card-title">Catalogue & produits</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Produits simples, configurables, groupés ou téléchargeables, avec gestion d'attributs, de variantes, d'options et de packs.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Produits simples, configurables, groupés ou téléchargeables</span></li>
              <li><span className="cms-typing-text">Gestion d'attributs, de variantes, d'options et de packs</span></li>
              <li><span className="cms-typing-text">Stock multi-entrepôts et inventaire en temps réel</span></li>
              <li><span className="cms-typing-text">Import/export via CSV ou API</span></li>
              <li><span className="cms-typing-text">Catégories hiérarchiques avec SEO intégré</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="orders">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">02</div>
          <h3 className="cms-card-title">Commandes & clients</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Panier intelligent et tunnel de commande fluide avec gestion complète des commandes, factures, avoirs et retours.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Panier intelligent et tunnel de commande fluide</span></li>
              <li><span className="cms-typing-text">Commandes, factures, avoirs et retours gérés de bout en bout</span></li>
              <li><span className="cms-typing-text">Comptes clients, multi-adresses, groupes B2B/B2C</span></li>
              <li><span className="cms-typing-text">Historique complet et notifications automatiques</span></li>
              <li><span className="cms-typing-text">Espace client personnalisable avec suivi d'état</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="payment">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">03</div>
          <h3 className="cms-card-title">Paiement & facturation</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Stripe, virement ou solution sur mesure avec factures conformes UE générées automatiquement.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Stripe, virement ou solution sur mesure</span></li>
              <li><span className="cms-typing-text">Factures conformes UE générées automatiquement</span></li>
              <li><span className="cms-typing-text">Taxes, devises et taux de change multiples</span></li>
              <li><span className="cms-typing-text">Emails de confirmation et relances automatiques</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="marketing">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">04</div>
          <h3 className="cms-card-title">Marketing & promotion</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Coupons, remises progressives et packs promo avec bannières dynamiques et pages de campagne.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Coupons, remises progressives et packs promo</span></li>
              <li><span className="cms-typing-text">Bannières dynamiques et pages de campagne</span></li>
              <li><span className="cms-typing-text">Newsletter intégrée et ciblage par segment</span></li>
              <li><span className="cms-typing-text">Sitemap, meta et rich snippets inclus</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="admin">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">05</div>
          <h3 className="cms-card-title">Administration & gestion</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Tableau de bord ventes, commandes, clients, produits avec multi-utilisateurs et rôles ACL avancés.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Tableau de bord ventes, commandes, clients, produits</span></li>
              <li><span className="cms-typing-text">Multi-utilisateurs et rôles ACL avancés</span></li>
              <li><span className="cms-typing-text">Journalisation des actions et logs d'audit</span></li>
              <li><span className="cms-typing-text">Configuration paiement, livraison, taxes, langues, emails</span></li>
              <li><span className="cms-typing-text">Système modulaire prêt pour extensions</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="security">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">06</div>
          <h3 className="cms-card-title">Sécurité & performances</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Auth sécurisée et gestion fine des permissions, headers de sécurité, protections CSRF, XSS, SQLi.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Auth sécurisée et gestion fine des permissions</span></li>
              <li><span className="cms-typing-text">Headers de sécurité, protections CSRF, XSS, SQLi</span></li>
              <li><span className="cms-typing-text">Sauvegardes automatisées et restauration simple</span></li>
              <li><span className="cms-typing-text">Optimisations Core Web Vitals et cache intelligent</span></li>
              <li><span className="cms-typing-text">Monitoring intégré et alertes d'anomalies</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="design">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">07</div>
          <h3 className="cms-card-title">Design & personnalisation</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Design 100 % modulable, compatible Tailwind, Bootstrap… avec templates éditables sans toucher au noyau.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Design 100 % modulable, compatible Tailwind, Bootstrap…</span></li>
              <li><span className="cms-typing-text">Templates éditables sans toucher au noyau</span></li>
              <li><span className="cms-typing-text">Gestion avancée thèmes, couleurs, polices, composants</span></li>
              <li><span className="cms-typing-text">Blocs réutilisables pour construire les pages</span></li>
              <li><span className="cms-typing-text">Responsive design optimisé nativement</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>

        <div className="cms-feature-card" data-category="automation">
          <div className="cms-accent-line cms-top"></div>
          <div className="cms-card-number">08</div>
          <h3 className="cms-card-title">Automatisations & intégrations</h3>
          <div className="cms-card-separator"></div>
          <p className="cms-card-description cms-paragraph-mode">
            Workflows n8n prêts : facturation, rappels, CRM, emailing avec connecteurs vers ERP, marketing, analytics.
          </p>
          <div className="cms-card-description cms-list-mode">
            <ul className="cms-feature-list">
              <li><span className="cms-typing-text">Workflows n8n prêts : facturation, rappels, CRM, emailing</span></li>
              <li><span className="cms-typing-text">Connecteurs vers ERP, marketing, analytics</span></li>
              <li><span className="cms-typing-text">Webhooks et endpoints sécurisés</span></li>
              <li><span className="cms-typing-text">IA embarquée pour suggestions et analyses (option)</span></li>
            </ul>
          </div>
          <div className="cms-accent-line cms-bottom"></div>
        </div>
      </div>
    </section>
  );
}
