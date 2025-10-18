Tu dois adapter l'ensemble de mon projet site vitrine entreprise en nextjs : 


import React, { useState, useEffect, useRef } from 'react';
import { Camera, Zap, Target, Sparkles, ArrowRight, Check, Menu, X } from 'lucide-react';

// ============================================================================
// DESIGN SYSTEM & TOKENS
// ============================================================================

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=Instrument+Sans:wght@400..700&display=swap');

:root {
/* Colors */
--color-bg-1: hsl(250, 30%, 8%);
--color-bg-2: hsl(250, 25%, 12%);
--color-bg-3: hsl(250, 20%, 18%);
--color-surface: hsl(250, 20%, 15%);
--color-surface-glass: hsla(250, 20%, 20%, 0.6);
--color-accent-1: hsl(280, 70%, 60%);
--color-accent-2: hsl(320, 70%, 65%);
--color-accent-3: hsl(260, 65%, 55%);
--color-text-1: hsl(250, 15%, 95%);
--color-text-2: hsl(250, 10%, 75%);
--color-text-3: hsl(250, 8%, 55%);
--color-border: hsla(250, 20%, 30%, 0.3);
--color-glow: hsla(280, 70%, 60%, 0.4);

    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2.5rem;
    --space-6: 4rem;
    --space-7: 6.5rem;
    --space-8: 10rem;

    /* Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.75rem;
    --radius-lg: 1.25rem;
    --radius-xl: 2rem;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 2px hsla(250, 30%, 5%, 0.15);
    --shadow-md: 0 4px 12px hsla(250, 30%, 5%, 0.25);
    --shadow-lg: 0 12px 40px hsla(250, 30%, 5%, 0.35);
    --shadow-glow: 0 0 40px var(--color-glow);

    /* Typography */
    --font-base: 'Inter', system-ui, sans-serif;
    --font-display: 'Instrument Sans', var(--font-base);
    --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
    --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
    --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
    --text-xl: clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem);
    --text-2xl: clamp(1.75rem, 1.5rem + 1vw, 2.25rem);
    --text-3xl: clamp(2.25rem, 1.75rem + 2vw, 3.5rem);
    --text-4xl: clamp(3rem, 2rem + 4vw, 5rem);

    /* Container */
    --container-max: 1440px;
    --container-padding: clamp(1.5rem, 5vw, 6rem);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

body {
font-family: var(--font-base);
background: var(--color-bg-1);
color: var(--color-text-1);
line-height: 1.6;
-webkit-font-smoothing: antialiased;
overflow-x: hidden;
}

.container {
max-width: var(--container-max);
margin-inline: auto;
padding-inline: var(--container-padding);
}

/* Noise Overlay */
.noise-overlay::after {
content: '';
position: absolute;
inset: 0;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
pointer-events: none;
z-index: 2;
}

/* Animations */
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

@keyframes rotate-gradient {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}

@keyframes float {
0%, 100% {
transform: translateY(0px);
}
50% {
transform: translateY(-20px);
}
}

@keyframes pulse-glow {
0%, 100% {
opacity: 0.4;
}
50% {
opacity: 0.8;
}
}

.animate-in {
animation: fadeInUp 0.8s ease-out forwards;
}

/* Focus Styles - A11y */
*:focus-visible {
outline: 2px solid var(--color-accent-1);
outline-offset: 4px;
border-radius: var(--radius-sm);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
*,
*::before,
*::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
}
}
`;

// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation = () => {
const [isOpen, setIsOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 20);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
<nav style={{
position: 'fixed',
top: 0,
left: 0,
right: 0,
zIndex: 1000,
background: scrolled ? 'var(--color-surface-glass)' : 'transparent',
backdropFilter: scrolled ? 'blur(20px)' : 'none',
borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
transition: 'all 0.3s ease',
}}>
<div className="container" style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
padding: 'var(--space-4) var(--container-padding)',
}}>
<div style={{
fontFamily: 'var(--font-display)',
fontSize: 'var(--text-xl)',
fontWeight: 700,
background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
}}>
YourBrand
</div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-1)',
            cursor: 'pointer',
            padding: 'var(--space-2)',
          }}
          className="mobile-menu"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul style={{
          display: 'flex',
          gap: 'var(--space-5)',
          listStyle: 'none',
        }} className="nav-links">
          {['Work', 'Services', 'Process', 'Contact'].map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} style={{
                color: 'var(--color-text-2)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-2)'}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu {
            display: block !important;
          }
          .nav-links {
            display: ${isOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface-glass);
            backdrop-filter: blur(20px);
            padding: var(--space-5);
            border-bottom: 1px solid var(--color-border);
          }
        }
      `}</style>
    </nav>
);
};

// ============================================================================
// HERO SECTION
// ============================================================================

const Hero = () => {
return (
<section style={{
position: 'relative',
minHeight: '100vh',
display: 'flex',
alignItems: 'center',
overflow: 'hidden',
}} className="noise-overlay">
{/* Animated Gradient Background */}
<div style={{
position: 'absolute',
inset: 0,
background: `
          radial-gradient(circle at 30% 20%, var(--color-accent-1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, var(--color-accent-2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, var(--color-accent-3) 0%, transparent 70%)
        `,
backgroundSize: '200% 200%',
animation: 'rotate-gradient 15s ease infinite',
opacity: 0.15,
zIndex: 0,
}} />

      {/* Decorative Pattern */}
      <svg style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '200px',
        opacity: 0.1,
        zIndex: 1,
      }} viewBox="0 0 1440 200" fill="none">
        <path d="M0,100 Q360,50 720,100 T1440,100 L1440,200 L0,200 Z" fill="url(#hero-gradient)" />
        <defs>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-1)" />
            <stop offset="50%" stopColor="var(--color-accent-2)" />
            <stop offset="100%" stopColor="var(--color-accent-3)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container" style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'var(--space-8)',
      }}>
        <div style={{
          maxWidth: '900px',
          animation: 'fadeInUp 1s ease-out',
        }}>
          <div style={{
            display: 'inline-block',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-surface-glass)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-accent-1)',
            marginBottom: 'var(--space-4)',
            backdropFilter: 'blur(10px)',
          }}>
            ✨ Transforming Digital Experiences
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 'var(--space-5)',
            background: 'linear-gradient(135deg, var(--color-text-1) 0%, var(--color-accent-1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Design Exceptionnel,<br />
            Code Impeccable,<br />
            Résultats Mesurables
          </h1>

          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-2)',
            marginBottom: 'var(--space-6)',
            maxWidth: '600px',
            lineHeight: 1.7,
          }}>
            Nous créons des expériences web premium qui captivent, convertissent et propulsent votre marque vers de nouveaux sommets.
          </p>

          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}>
            <button style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.3s',
              boxShadow: '0 4px 20px var(--color-glow)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px var(--color-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px var(--color-glow)';
            }}>
              Voir nos projets
              <ArrowRight size={20} />
            </button>

            <button style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-1)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-3)';
              e.currentTarget.style.borderColor = 'var(--color-accent-1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-surface)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}>
              Discuter du projet
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'var(--space-5)',
            marginTop: 'var(--space-7)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-border)',
          }}>
            {[
              { value: '150+', label: 'Projets livrés' },
              { value: '98%', label: 'Satisfaction client' },
              { value: '5x', label: 'ROI moyen' },
            ].map((stat, i) => (
              <div key={i} style={{ animation: `fadeInUp 1s ease-out ${0.2 + i * 0.1}s backwards` }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: 'var(--color-accent-1)',
                  marginBottom: 'var(--space-1)',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-3)',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
);
};

// ============================================================================
// PROOF / SOCIAL PROOF SECTION
// ============================================================================

const Proof = () => {
const logos = ['Acme Corp', 'TechStart', 'Innovate', 'DigitalFlow', 'Nexus', 'Quantum'];

return (
<section style={{
padding: 'var(--space-7) 0',
background: 'var(--color-bg-2)',
borderTop: '1px solid var(--color-border)',
borderBottom: '1px solid var(--color-border)',
}}>
<div className="container">
<p style={{
textAlign: 'center',
fontSize: 'var(--text-sm)',
color: 'var(--color-text-3)',
marginBottom: 'var(--space-5)',
textTransform: 'uppercase',
letterSpacing: '0.1em',
}}>
Ils nous font confiance
</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--space-5)',
          alignItems: 'center',
          justifyItems: 'center',
        }}>
          {logos.map((logo, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--space-4)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: 'var(--color-text-3)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent-1)';
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-3)';
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {logo}
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          marginTop: 'var(--space-7)',
          maxWidth: '700px',
          marginInline: 'auto',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-2)',
            fontStyle: 'italic',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.7,
          }}>
            "L'équipe a transformé notre vision en une expérience web exceptionnelle. Le niveau de détail et l'attention portée à l'UX ont dépassé toutes nos attentes."
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
            }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text-1)' }}>Sarah Laurent</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-3)' }}>CMO, TechStart</div>
            </div>
          </div>
        </div>
      </div>
    </section>
);
};

// ============================================================================
// SHOWREEL / PORTFOLIO SECTION
// ============================================================================

const Showreel = () => {
const projects = [
{ title: 'E-commerce Luxury', tag: 'Next.js', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
{ title: 'SaaS Dashboard', tag: 'React', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
{ title: 'Portfolio Créatif', tag: 'WebGL', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
{ title: 'Plateforme Finance', tag: 'TypeScript', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
{ title: 'App Mobile Hybrid', tag: 'React Native', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
{ title: 'Site Institutionnel', tag: 'CMS', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
];

return (
<section id="work" style={{
padding: 'var(--space-8) 0',
position: 'relative',
}} className="noise-overlay">
<div className="container">
<div style={{
maxWidth: '600px',
marginBottom: 'var(--space-7)',
}}>
<h2 style={{
fontFamily: 'var(--font-display)',
fontSize: 'var(--text-3xl)',
fontWeight: 700,
marginBottom: 'var(--space-4)',
background: 'linear-gradient(135deg, var(--color-text-1) 0%, var(--color-accent-1) 100%)',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
}}>
Projets qui marquent
</h2>
<p style={{
fontSize: 'var(--text-lg)',
color: 'var(--color-text-2)',
lineHeight: 1.7,
}}>
Chaque projet est une opportunité de repousser les limites du design et de la technique.
</p>
</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
          gap: 'var(--space-5)',
        }}>
          {projects.map((project, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                cursor: 'pointer',
                background: project.gradient,
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                animation: `fadeInUp 0.8s ease-out ${i * 0.1}s backwards`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg), var(--shadow-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'var(--space-5)',
                zIndex: 2,
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: 'var(--space-1) var(--space-3)',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: 'var(--space-2)',
                  width: 'fit-content',
                }}>
                  {project.tag}
                </div>
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'white',
                }}>
                  {project.title}
                </h3>
              </div>

              {/* Hover Icon */}
              <div style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s',
                zIndex: 3,
              }}
              className="hover-icon">
                <ArrowRight color="white" size={20} />
              </div>

              <style>{`
                div:hover .hover-icon {
                  opacity: 1;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
);
};

// ============================================================================
// PROCESS SECTION
// ============================================================================

const Process = () => {
const steps = [
{ icon: <Target size={32} />, title: 'Découverte', desc: 'Analyse approfondie de vos objectifs et de votre marché' },
{ icon: <Sparkles size={32} />, title: 'Conception', desc: 'Design system, wireframes et prototypes interactifs' },
{ icon: <Zap size={32} />, title: 'Développement', desc: 'Code propre, performances optimales, tests rigoureux' },
{ icon: <Camera size={32} />, title: 'Lancement', desc: 'Déploiement, monitoring et support continu' },
];

return (
<section id="process" style={{
padding: 'var(--space-8) 0',
background: 'var(--color-bg-2)',
}}>
<div className="container">
<div style={{
textAlign: 'center',
maxWidth: '700px',
marginInline: 'auto',
marginBottom: 'var(--space-7)',
}}>
<h2 style={{
fontFamily: 'var(--font-display)',
fontSize: 'var(--text-3xl)',
fontWeight: 700,
marginBottom: 'var(--space-4)',
}}>
Notre Processus Créatif
</h2>
<p style={{
fontSize: 'var(--text-lg)',
color: 'var(--color-text-2)',
lineHeight: 1.7,
}}>
Une méthodologie éprouvée qui allie créativité et rigueur technique
</p>
</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 'var(--space-6)',
          position: 'relative',
        }}>
          {/* Connecting Line */}
          <svg style={{
            position: 'absolute',
            top: '60px',
            left: '10%',
            width: '80%',
            height: '2px',
            zIndex: 0,
            display: window.innerWidth > 768 ? 'block' : 'none',
          }}>
            <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="8 4" />
          </svg>

          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                zIndex: 1,
                animation: `fadeInUp 0.8s ease-out ${i * 0.15}s backwards`,
              }}
            >
              {/* Number */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '0',
                fontSize: 'var(--text-4xl)',
                fontWeight: 700,
                color: 'var(--color-bg-3)',
                fontFamily: 'var(--font-display)',
                lineHeight: 1,
              }}>
                0{i + 1}
              </div>

              {/* Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
                color: 'var(--color-accent-1)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                e.currentTarget.style.background = 'var(--color-accent-1)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.background = 'var(--color-surface)';
                e.currentTarget.style.color = 'var(--color-accent-1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                marginBottom: 'var(--space-3)',
                color: 'var(--color-text-1)',
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-2)',
                lineHeight: 1.7,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
);
};

// ============================================================================
// SERVICES SECTION
// ============================================================================

const Services = () => {
const services = [
{
title: 'Design UI/UX Premium',
desc: 'Interfaces élégantes et expériences utilisateur mémorables',
features: ['Design System', 'Prototypage', 'Tests utilisateurs'],
price: 'Sur devis',
},
{
title: 'Développement Web',
desc: 'Applications performantes avec Next.js, React et TypeScript',
features: ['Code scalable', 'SEO optimisé', 'Performances maximales'],
price: 'Sur devis',
featured: true,
},
{
title: 'Branding Digital',
desc: 'Identité visuelle forte et cohérente sur tous supports',
features: ['Stratégie marque', 'Charte graphique', 'Guidelines'],
price: 'Sur devis',
},
];

return (
<section id="services" style={{
padding: 'var(--space-8) 0',
position: 'relative',
}} className="noise-overlay">
<div className="container">
<div style={{
textAlign: 'center',
maxWidth: '700px',
marginInline: 'auto',
marginBottom: 'var(--space-7)',
}}>
<h2 style={{
fontFamily: 'var(--font-display)',
fontSize: 'var(--text-3xl)',
fontWeight: 700,
marginBottom: 'var(--space-4)',
}}>
Services Excellence
</h2>
<p style={{
fontSize: 'var(--text-lg)',
color: 'var(--color-text-2)',
lineHeight: 1.7,
}}>
Solutions sur mesure adaptées à vos ambitions
</p>
</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'var(--space-5)',
        }}>
          {services.map((service, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--space-6)',
                background: service.featured ? 'var(--color-surface)' : 'var(--color-bg-2)',
                border: service.featured ? '2px solid var(--color-accent-1)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                position: 'relative',
                transition: 'all 0.4s',
                animation: `fadeInUp 0.8s ease-out ${i * 0.1}s backwards`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = service.featured ? 'var(--shadow-lg), var(--shadow-glow)' : 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {service.featured && (
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  right: 'var(--space-4)',
                  padding: 'var(--space-1) var(--space-3)',
                  background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'white',
                }}>
                  Populaire
                </div>
              )}

              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                marginBottom: 'var(--space-3)',
                color: 'var(--color-text-1)',
              }}>
                {service.title}
              </h3>

              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-2)',
                marginBottom: 'var(--space-5)',
                lineHeight: 1.7,
              }}>
                {service.desc}
              </p>

              <ul style={{
                listStyle: 'none',
                marginBottom: 'var(--space-5)',
              }}>
                {service.features.map((feature, j) => (
                  <li key={j} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-2)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-2)',
                  }}>
                    <Check size={16} color="var(--color-accent-1)" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                color: 'var(--color-accent-1)',
                marginBottom: 'var(--space-4)',
              }}>
                {service.price}
              </div>

              <button style={{
                width: '100%',
                padding: 'var(--space-4)',
                background: service.featured ? 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))' : 'var(--color-surface)',
                color: service.featured ? 'white' : 'var(--color-text-1)',
                border: service.featured ? 'none' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                Démarrer un projet
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
);
};

// ============================================================================
// CASE STUDY SECTION
// ============================================================================

const CaseStudy = () => {
const [showAfter, setShowAfter] = useState(false);

return (
<section style={{
padding: 'var(--space-8) 0',
background: 'var(--color-bg-2)',
}}>
<div className="container">
<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
gap: 'var(--space-7)',
alignItems: 'center',
}}>
{/* Left: Story */}
<div>
<div style={{
display: 'inline-block',
padding: 'var(--space-2) var(--space-4)',
background: 'var(--color-surface)',
border: '1px solid var(--color-border)',
borderRadius: 'var(--radius-full)',
fontSize: 'var(--text-sm)',
color: 'var(--color-accent-1)',
marginBottom: 'var(--space-4)',
}}>
Étude de Cas
</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              marginBottom: 'var(--space-4)',
            }}>
              +340% de conversions pour TechStart
            </h2>

            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-2)',
              marginBottom: 'var(--space-5)',
              lineHeight: 1.7,
            }}>
              Refonte complète de leur plateforme SaaS avec focus sur l'UX et les performances. Résultat: triplement du taux de conversion en 6 mois.
            </p>

            {/* KPIs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}>
              {[
                { value: '+340%', label: 'Conversions' },
                { value: '0.8s', label: 'Load Time' },
                { value: '96/100', label: 'Lighthouse' },
              ].map((kpi, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: 'var(--color-accent-1)',
                    marginBottom: 'var(--space-1)',
                  }}>
                    {kpi.value}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-3)',
                  }}>
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              padding: 'var(--space-4) var(--space-6)',
              background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Voir le cas complet
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right: Before/After */}
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: showAfter 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #434343 0%, #000000 100%)',
              transition: 'all 0.6s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
            }}>
              {showAfter ? 'Après' : 'Avant'}
            </div>

            <button
              onClick={() => setShowAfter(!showAfter)}
              style={{
                position: 'absolute',
                bottom: 'var(--space-4)',
                right: 'var(--space-4)',
                padding: 'var(--space-3) var(--space-5)',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 'var(--radius-full)',
                color: 'white',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              {showAfter ? '← Voir Avant' : 'Voir Après →'}
            </button>
          </div>
        </div>
      </div>
    </section>
);
};

// ============================================================================
// CTA SECTION
// ============================================================================

const CTA = () => {
return (
<section id="contact" style={{
padding: 'var(--space-8) 0',
position: 'relative',
}} className="noise-overlay">
<div className="container">
<div style={{
maxWidth: '800px',
marginInline: 'auto',
textAlign: 'center',
}}>
<h2 style={{
fontFamily: 'var(--font-display)',
fontSize: 'var(--text-4xl)',
fontWeight: 700,
marginBottom: 'var(--space-4)',
background: 'linear-gradient(135deg, var(--color-text-1) 0%, var(--color-accent-1) 100%)',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
}}>
Prêt à transformer votre vision en réalité ?
</h2>

          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-2)',
            marginBottom: 'var(--space-7)',
            lineHeight: 1.7,
          }}>
            Discutons de votre projet et découvrez comment nous pouvons propulser votre présence digitale
          </p>

          {/* Contact Form */}
          <form style={{
            display: 'grid',
            gap: 'var(--space-4)',
            textAlign: 'left',
            marginBottom: 'var(--space-7)',
          }} onSubmit={(e) => e.preventDefault()}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-4)',
            }}>
              <input
                type="text"
                placeholder="Votre nom"
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--color-text-1)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent-1)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-glow)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <input
                type="email"
                placeholder="Votre email"
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--color-text-1)',
                  fontSize: 'var(--text-base)',
                  transition: 'all 0.3s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent-1)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-glow)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <textarea
              placeholder="Parlez-nous de votre projet..."
              rows={5}
              style={{
                padding: 'var(--space-4)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text-1)',
                fontSize: 'var(--text-base)',
                transition: 'all 0.3s',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent-1)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-glow)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />

            <button
              type="submit"
              style={{
                padding: 'var(--space-4) var(--space-6)',
                background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                marginInline: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Envoyer le message
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Contact Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-5)',
            padding: 'var(--space-6)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-3)',
                marginBottom: 'var(--space-2)',
              }}>
                Email
              </div>
              <a href="mailto:contact@agency.com" style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-accent-1)',
                textDecoration: 'none',
                fontWeight: 600,
              }}>
                contact@agency.com
              </a>
            </div>

            <div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-3)',
                marginBottom: 'var(--space-2)',
              }}>
                Téléphone
              </div>
              <a href="tel:+33123456789" style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-accent-1)',
                textDecoration: 'none',
                fontWeight: 600,
              }}>
                +33 1 23 45 67 89
              </a>
            </div>

            <div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-3)',
                marginBottom: 'var(--space-2)',
              }}>
                Réseaux
              </div>
              <div style={{
                display: 'flex',
                gap: 'var(--space-3)',
              }}>
                {['LinkedIn', 'Twitter', 'Dribbble'].map(social => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-2)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-1)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-2)'}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
);
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => {
return (
<footer style={{
padding: 'var(--space-7) 0 var(--space-5)',
background: 'var(--color-bg-2)',
borderTop: '1px solid var(--color-border)',
}}>
<div className="container">
<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
gap: 'var(--space-6)',
marginBottom: 'var(--space-6)',
}}>
{/* Brand */}
<div>
<div style={{
fontFamily: 'var(--font-display)',
fontSize: 'var(--text-xl)',
fontWeight: 700,
background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2))',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
marginBottom: 'var(--space-3)',
}}>
YourBrand
</div>
<p style={{
fontSize: 'var(--text-sm)',
color: 'var(--color-text-3)',
lineHeight: 1.6,
}}>
Excellence digitale depuis 2015
</p>
</div>

          {/* Links */}
          <div>
            <h4 style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text-1)',
              marginBottom: 'var(--space-3)',
            }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['Projets', 'Services', 'Process', 'À propos'].map(link => (
                <li key={link} style={{ marginBottom: 'var(--space-2)' }}>
                  <a href="#" style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-1)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-3)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text-1)',
              marginBottom: 'var(--space-3)',
            }}>
              Légal
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['Mentions légales', 'Confidentialité', 'CGV'].map(link => (
                <li key={link} style={{ marginBottom: 'var(--space-2)' }}>
                  <a href="#" style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-1)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-3)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: 'var(--space-5)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-3)',
          }}>
            © 2025 YourBrand. Tous droits réservés.
          </p>

          <div style={{
            display: 'flex',
            gap: 'var(--space-4)',
          }}>
            {['LinkedIn', 'Twitter', 'Dribbble', 'GitHub'].map(social => (
              <a
                key={social}
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-2)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-accent-1)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'var(--color-accent-1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface)';
                  e.currentTarget.style.color = 'var(--color-text-2)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
);
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
return (
<>
<style>{styles}</style>
<Navigation />
<Hero />
<Proof />
<Showreel />
<Process />
<Services />
<CaseStudy />
<CTA />
<Footer />
</>
);
}