"use client";

import { useEffect } from "react";
import "./TechStackEnhanced.css";

export function TechStackEnhanced() {
  useEffect(() => {
    // Create floating particles
    function createParticles() {
      const section = document.querySelector('.tech-stack-section');
      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
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

      ripple.className = 'ripple';
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

      element.classList.add('decoding');

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
          element.classList.remove('decoding');
        }
      }, 50); // Speed of decoding (50ms per character)
    }

    // Initialize
    createParticles();

    const cards = document.querySelectorAll('.tech-card');
    console.log('[TechStack] Initialization - found', cards.length, 'cards');

    // Event handler functions that we can reference for cleanup
    const mouseEnterHandler = function (this: any) {
      const typingElements = this.querySelectorAll('.typing-text');
      console.log('[TechStack] Mouseenter - found', typingElements.length, 'typing elements');
      typingElements.forEach((el: any, index: number) => {
        setTimeout(() => {
          console.log('[TechStack] Decoding element', index, ':', el.getAttribute('data-original'));
          decodeText(el);
        }, index * 200); // Stagger the start of each decode
      });
    };

    const cardMouseLeaveHandler = function (this: any) {
      const typingElements = this.querySelectorAll('.typing-text');
      typingElements.forEach((el: any) => {
        const originalText = el.getAttribute('data-original');
        el.textContent = generateMartianText(originalText!.length);
        el.classList.remove('decoding');
      });
    };

    cards.forEach((card, cardIndex) => {
      // Only add listeners if not already added (check for a marker)
      if (!(card as any).__techStackInitialized) {
        card.addEventListener('click', createRipple);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', mouseEnterHandler);
        card.addEventListener('mouseleave', cardMouseLeaveHandler);
        (card as any).__techStackInitialized = true;
      }

      // Initialize all typing texts with Martian characters
      const typingElements = card.querySelectorAll('.typing-text');
      console.log('[TechStack] Card', cardIndex, '- found', typingElements.length, 'typing elements');

      typingElements.forEach(el => {
        // Only initialize if not already initialized
        if (!el.getAttribute('data-original')) {
          const originalText = el.textContent;
          console.log('[TechStack] Storing original text:', originalText);
          el.setAttribute('data-original', originalText!);
          el.textContent = generateMartianText(originalText!.length);
        }
      });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tech-card').forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
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
      document.querySelectorAll('.particle').forEach(p => p.remove());
    };
  }, []);

  return (
    <section className="tech-stack-section">
      {/* Animated background */}
      <div className="animated-bg"></div>

      {/* Glowing orbs */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      {/* Header */}
      <div className="header-content">
        <h1>Notre stack technologique</h1>
        <p className="subtitle">
          Nos choix techniques reposent sur la stabilité, la sécurité et la performance.
          Chaque stack est sélectionnée pour garantir rapidité, maintenabilité et évolutivité.
        </p>
      </div>

      {/* Tech Grid */}
      <div className="tech-grid">
        <div className="tech-card" data-category="frontend">
          <div className="accent-line top"></div>
          <div className="card-number">01</div>
          <h3 className="card-title">Frontend</h3>
          <div className="card-separator"></div>
          <p className="card-description paragraph-mode">
            React, Next.js, TypeScript, Tailwind CSS, state managers modernes et animations optimisées.
          </p>
          <div className="card-description list-mode">
            <ul className="tech-list">
              <li><span className="typing-text">React & Next.js</span></li>
              <li><span className="typing-text">TypeScript</span></li>
              <li><span className="typing-text">Tailwind CSS</span></li>
              <li><span className="typing-text">State managers modernes</span></li>
              <li><span className="typing-text">Animations optimisées</span></li>
            </ul>
          </div>
          <div className="accent-line bottom"></div>
        </div>

        <div className="tech-card" data-category="backend">
          <div className="accent-line top"></div>
          <div className="card-number">02</div>
          <h3 className="card-title">Backend & API</h3>
          <div className="card-separator"></div>
          <p className="card-description paragraph-mode">
            Node.js, Python (Django/FastAPI), GraphQL, PostgreSQL, Redis. API sécurisées et scalables.
          </p>
          <div className="card-description list-mode">
            <ul className="tech-list">
              <li><span className="typing-text">Node.js & Python</span></li>
              <li><span className="typing-text">Django / FastAPI</span></li>
              <li><span className="typing-text">GraphQL</span></li>
              <li><span className="typing-text">PostgreSQL & Redis</span></li>
              <li><span className="typing-text">API sécurisées et scalables</span></li>
            </ul>
          </div>
          <div className="accent-line bottom"></div>
        </div>

        <div className="tech-card" data-category="cloud">
          <div className="accent-line top"></div>
          <div className="card-number">03</div>
          <h3 className="card-title">Cloud & DevOps</h3>
          <div className="card-separator"></div>
          <p className="card-description paragraph-mode">
            Infrastructure AWS/Azure, Docker, Kubernetes, Terraform, GitHub Actions, Nginx.
          </p>
          <div className="card-description list-mode">
            <ul className="tech-list">
              <li><span className="typing-text">AWS / Azure</span></li>
              <li><span className="typing-text">Docker & Kubernetes</span></li>
              <li><span className="typing-text">Terraform</span></li>
              <li><span className="typing-text">GitHub Actions</span></li>
              <li><span className="typing-text">Nginx</span></li>
            </ul>
          </div>
          <div className="accent-line bottom"></div>
        </div>

        <div className="tech-card" data-category="security">
          <div className="accent-line top"></div>
          <div className="card-number">04</div>
          <h3 className="card-title">Sécurité</h3>
          <div className="card-separator"></div>
          <p className="card-description paragraph-mode">
            OWASP, authentification forte, gestion centralisée des secrets, scans SAST/DAST, WAF.
          </p>
          <div className="card-description list-mode">
            <ul className="tech-list">
              <li><span className="typing-text">Standards OWASP</span></li>
              <li><span className="typing-text">Authentification forte</span></li>
              <li><span className="typing-text">Gestion des secrets</span></li>
              <li><span className="typing-text">Scans SAST/DAST</span></li>
              <li><span className="typing-text">WAF (Web Application Firewall)</span></li>
            </ul>
          </div>
          <div className="accent-line bottom"></div>
        </div>

        <div className="tech-card" data-category="automation">
          <div className="accent-line top"></div>
          <div className="card-number">05</div>
          <h3 className="card-title">Automatisation & IA</h3>
          <div className="card-separator"></div>
          <p className="card-description paragraph-mode">
            n8n, webhooks sécurisés, intégration OpenAI/Anthropic, orchestration de tâches et reporting automatisé.
          </p>
          <div className="card-description list-mode">
            <ul className="tech-list">
              <li><span className="typing-text">n8n automation</span></li>
              <li><span className="typing-text">Webhooks sécurisés</span></li>
              <li><span className="typing-text">OpenAI / Anthropic</span></li>
              <li><span className="typing-text">Orchestration de tâches</span></li>
              <li><span className="typing-text">Reporting automatisé</span></li>
            </ul>
          </div>
          <div className="accent-line bottom"></div>
        </div>

        <div className="tech-card" data-category="analytics">
          <div className="accent-line top"></div>
          <div className="card-number">06</div>
          <h3 className="card-title">Analytics</h3>
          <div className="card-separator"></div>
          <p className="card-description paragraph-mode">
            Mixpanel, DataDog, Sentry, Grafana et pipelines de données pour piloter le ROI.
          </p>
          <div className="card-description list-mode">
            <ul className="tech-list">
              <li><span className="typing-text">Mixpanel</span></li>
              <li><span className="typing-text">DataDog</span></li>
              <li><span className="typing-text">Sentry</span></li>
              <li><span className="typing-text">Grafana</span></li>
              <li><span className="typing-text">Pipelines de données</span></li>
            </ul>
          </div>
          <div className="accent-line bottom"></div>
        </div>
      </div>
    </section>
  );
}
