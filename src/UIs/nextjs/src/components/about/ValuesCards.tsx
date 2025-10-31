import { Heading } from "@/components/ui/Heading";
import styles from "./ValuesCards.module.css";

type Value = {
  readonly title: string;
  readonly desc: string;
  readonly credo: string;
  readonly icon: React.ReactNode;
};

const VALUES: readonly Value[] = [
  {
    title: "Liberté maîtrisée",
    desc: "Créer, c'est respirer. Mais la vraie liberté naît de la maîtrise. Chez SMIDJAN, la créativité n'est jamais un désordre : elle s'appuie sur des fondations solides, un code rigoureux et des principes éprouvés. Nous concevons sans contrainte inutile, tout en respectant les règles qui rendent un système stable et durable.",
    credo: "Notre credo : maîtriser l'art avant d'en briser les limites.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Précision",
    desc: "Chaque pixel, chaque ligne de code, chaque variable a une raison d'exister. Nous croyons que la précision est la forme la plus pure du respect — envers le client, l'utilisateur, et le produit. Notre architecture est pensée pour durer : modulaire, claire, scalable, et sans redite.",
    credo: "Notre promesse : un code qui respire la rigueur et la cohérence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: "Justesse",
    desc: "La qualité ne doit jamais être un luxe. Nous cherchons à offrir le plus haut niveau de performance et de design au coût le plus juste. Pas de superflu, pas de marketing creux : chaque décision vise à maximiser la valeur réelle du produit, sans sacrifier la beauté ni l'efficacité.",
    credo: "Notre philosophie : l'équilibre parfait entre exigence et accessibilité.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18"/>
        <path d="M8 7l4-4 4 4"/>
        <path d="M8 17l4 4 4-4"/>
        <path d="M3 12h18"/>
      </svg>
    ),
  },
  {
    title: "Transmission",
    desc: "SMIDJAN n'est pas un projet solo, c'est une école de rigueur et de curiosité. Nous croyons que la connaissance n'a de valeur que si elle circule. Nos processus, nos outils et nos méthodes sont conçus pour grandir avec ceux qui les utilisent : collaborateurs, clients, apprentis.",
    credo: "Notre horizon : bâtir une équipe où chaque compétence devient un levier collectif.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 11l-5-5-5 5"/>
        <path d="M17 18l-5-5-5 5"/>
        <path d="M12 6v12"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
        <circle cx="12" cy="6" r="2"/>
      </svg>
    ),
  },
  {
    title: "Amélioration continue",
    desc: "Rien n'est jamais figé. Chaque version, chaque ligne, chaque idée peut être affinée. Nous travaillons avec le souci constant de progresser : apprendre, documenter, optimiser. C'est dans cette répétition consciente que naît la qualité durable.",
    credo: "Notre engagement : forger mieux à chaque itération.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6"/>
        <path d="M21.5 2l-7 7"/>
        <path d="M2.5 22v-6h6"/>
        <path d="M2.5 22l7-7"/>
        <path d="M14.5 15a7.5 7.5 0 1 1 0-15"/>
      </svg>
    ),
  },
  {
    title: "Esthétique fonctionnelle",
    desc: "Nous refusons de choisir entre la forme et la fonction. Un beau produit est un produit clair, performant, agréable à utiliser. Le design et la technique ne sont pas deux mondes : ce sont deux faces d'un même savoir-faire.",
    credo: "Notre signature : des interfaces qui inspirent, des systèmes qui tiennent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 21V9"/>
      </svg>
    ),
  },
  {
    title: "Intégrité technique",
    desc: "Aucune ligne de code n'est écrite \"pour faire semblant\". Nous refusons les raccourcis opaques, les architectures fragiles ou les dépendances inutiles. SMIDJAN, c'est la garantie d'une transparence totale sur la logique, les choix et les outils.",
    credo: "Notre règle d'or : si ce n'est pas clair, c'est que ce n'est pas prêt.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="16" r="1"/>
        <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
      </svg>
    ),
  },
] as const;

export default function ValuesCards() {
  return (
    <section
      className={styles["values-section"]}
      aria-labelledby="values-heading"
    >
      <header className={styles["values-header"]}>
        <Heading
          as="h2"
          accent
          className={styles["values-heading"]}
          id="values-heading"
        >
          Nos valeurs
        </Heading>
        <p className={styles["values-intro"]}>
          Chez <strong>SMIDJAN</strong>, chaque projet est une pièce forgée avec patience, méthode et intention.
          Nous ne cherchons pas à faire "plus", mais à faire <strong>mieux</strong> — plus clair, plus juste, plus durable.
          Nos valeurs ne sont pas des mots-clés marketing : elles définissent notre manière d'écrire, de concevoir et de bâtir.
        </p>
      </header>
      <div className={styles["values-grid"]}>
        {VALUES.map(({ title, desc, credo, icon }) => (
          <article key={title} className={styles["values-card"]}>
            <div className={styles["values-cardIcon"]} aria-hidden="true">
              {icon}
            </div>
            <h3 className={styles["values-cardTitle"]}>{title}</h3>
            <p className={styles["values-cardDesc"]}>{desc}</p>
            <blockquote className={styles["values-cardCredo"]}>
              {credo}
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
