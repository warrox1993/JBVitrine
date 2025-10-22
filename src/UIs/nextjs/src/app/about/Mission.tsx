"use client";

import "./mission.css";

export default function Mission() {
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="mission__bg" aria-hidden="true">
        <span className="mission__orb mission__orb--1" />
        <span className="mission__orb mission__orb--2" />
        <span className="mission__orb mission__orb--3" />
      </div>

      <div className="mission__wrap">
        {/* H2 principal de section */}
        <h2 id="mission-title" className="mission__h2">Notre mission</h2>

        <div className="mission__grid" role="list">
          <article className="mcard" role="listitem">
            <div className="mcard__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path d="M3 20h18M5 20l2-7 5-5 5 5 2 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mcard__title">La forge technique</h3>
            <p className="mcard__text">Nous transformons le code brut en expériences raffinées. Chaque ligne est forgée avec précision, chaque interface sculptée avec intention.</p>
          </article>

          <article className="mcard" role="listitem">
            <div className="mcard__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mcard__title">L’art & la science</h3>
            <p className="mcard__text">Notre approche marie excellence technique et sensibilité artistique pour créer des produits qui inspirent confiance et fluidité.</p>
          </article>

          <article className="mcard" role="listitem">
            <div className="mcard__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path d="M3 12h6v9H3zM15 3h6v18h-6zM9 7h6v14H9z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mcard__title">Impact mesurable</h3>
            <p className="mcard__text">Nous visons des résultats tangibles. Chaque décision est guidée par des métriques claires et des effets concrets pour votre marque.</p>
          </article>
        </div>

        <blockquote className="mission__statement">
          <p className="mission__quote">
            SMIDJAN est né d’une conviction : <span className="hl">la technologie n’est pas un but, c’est un matériau</span>. Comme une forge, nous transformons ce matériau — code, données, interfaces — en <span className="hl">expériences utiles, élégantes et durables</span>.
          </p>
        </blockquote>

        <div className="mission__cta">
          <a href="#contact" className="btn btn--primary" aria-label="Discuter de votre vision">Discuter de votre vision</a>
        </div>
      </div>
    </section>
  );
}
