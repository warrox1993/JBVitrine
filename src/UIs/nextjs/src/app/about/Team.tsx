"use client";
import { Heading } from "@/components/ui/Heading";
import "./team.css";

export default function Team() {
  return (
    <>
      <div className="stack">
        <Heading as="h2" accent className="mb-4">Notre Équipe</Heading>
        <p className="muted">
          Une équipe en construction, avec l’excellence au cœur de notre ADN et l’ambition
          de créer des expériences digitales mesurables.
        </p>
      </div>

      <div className="team-grid" role="list">
        {/* Slot 1 – À recruter (Frontend) */}
        <article className="member" role="listitem" aria-label="Consultant Frontend à recruter">
          <div className="avatar-wrap">
            <div className="recruit-ph" aria-hidden="true">
              <span className="qmark" aria-hidden="true">?</span>
            </div>
          </div>
          <span className="recruit-badge" aria-hidden="true">Nous recrutons</span>
          <h3 className="member-name">Consultant Frontend</h3>
          <p className="member-role">Développeur·se</p>
          <p className="member-desc">
            Expert·e React/Next.js et design systems. Focalisé·e performance et UX. Rejoignez-nous pour façonner des interfaces élégantes et scalables.
          </p>
        </article>

        {/* Slot 2 – Membre central */}
        <article className="member member--center" role="listitem" aria-label="Alexandre N. — Fondateur & Designer Produit">
          <div className="avatar-wrap">
            <img
              className="avatar"
              src="/images/team/alexandre.jpg"
              alt="Portrait de Alexandre N."
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="member-name">Jean-Baptiste D.</h3>
          <p className="member-role">CEO & Designer Produit</p>
          <p className="member-desc">
            Conçoit des systèmes clairs où chaque détail sert le parcours. Esthétique utile, mesurable, durable.
          </p>
        </article>

        {/* Slot 3 – À recruter (Backend) */}
        <article className="member" role="listitem" aria-label="Consultant Backend à recruter">
          <div className="avatar-wrap">
            <div className="recruit-ph" aria-hidden="true">
              <span className="qmark" aria-hidden="true">?</span>
            </div>
          </div>
          <span className="recruit-badge" aria-hidden="true">Nous recrutons</span>
          <h3 className="member-name">Consultant Backend</h3>
          <p className="member-role">Développeur·se</p>
          <p className="member-desc">
            Expert·e Node.js/Python/Java/.Net. Architecture scalable, APIs robustes, fiabilité en production.
          </p>
        </article>
      </div>

      <p className="team-note">
        Selon le projet, nous activons un réseau d’experts associés (recherche utilisateur, contenu, vidéo, data).
      </p>

      <div className="team-cta">
        <h3 className="team-cta-title">Rejoindre SMIDJAN</h3>
        <p className="team-cta-sub">
          Consultant orienté excellence et impact business, autonome et exigeant ? Parlons-en.
        </p>

        <a href="#contact" className="btn btn--primary" aria-label="Postuler maintenant">
          Postuler maintenant
        </a>
      </div>
    </>
  );
}
