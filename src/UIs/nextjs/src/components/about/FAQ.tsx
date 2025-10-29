import { Heading } from "@/components/ui/Heading";
import styles from "./FAQ.module.css";

const ITEMS = [
  {
    q: "Comment démarre un projet ?",
    a: "Par un atelier de 90 minutes, où l’on cartographie vos objectifs, vos cibles et vos contraintes. De là naît un plan clair et mesurable.",
  },
  {
    q: "Quels sont vos délais moyens ?",
    a: "Une vitrine premium : 3 à 6 semaines. Un produit sur mesure : sprint de 2 semaines, avec livrables itératifs.",
  },
  {
    q: "Qui rédige le contenu ?",
    a: "Nous structurons, vous écrivez, ou inversement. L’important, c’est que le message soit vrai et lisible.",
  },
  {
    q: "Comment gérez-vous la maintenance ?",
    a: "Nos projets incluent un plan d’entretien : mises à jour, audit, monitoring, support prioritaire.",
  },
  {
    q: "Qui détient le code ?",
    a: "Toujours vous. Tout est documenté, versionné, transféré en fin de mission.",
  },
] as const;

export default function FAQ() {
  return (
    <section className={styles["faq-root"]} aria-labelledby="faq-heading">
      <Heading as="h2" accent className={styles["faq-heading"]} id="faq-heading">
        FAQ
      </Heading>
      <div className={styles["faq-list"]}>
        {ITEMS.map(({ q, a }, index) => (
          <article key={q} className={styles["faq-item"]} aria-labelledby={`faq-q-${index}`}>
            <h3 id={`faq-q-${index}`} className={styles["faq-question"]}>
              {q}
            </h3>
            <p className={styles["faq-answer"]}>{a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
