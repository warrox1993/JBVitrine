import { Heading } from '@/components/ui/Heading';

export default function Differentiators() {
  const cards = [
    { title: 'Design system concret', text: 'Composants réels, documentés, utilisables. Pas de maquettage hors-sol.' },
    { title: 'Performance budgétée', text: 'Perf mesurée, objectifs CWV intégrés dans la dette produit.' },
    { title: 'Résultats mesurables', text: 'KPIs définis, learning loops, décisions par la donnée.' },
    { title: 'Transparence du code', text: 'Code clair, maintenable, prêt pour l’audit.' },
  ];
  return (
    <section className="pt-3 pb-3">
      <div className="container stack">
        <Heading as="h2" accent className="mb-4">Ce qui nous distingue</Heading>
        <div className="grid-2">
          {cards.map((c) => (
            <article key={c.title} className="stack" aria-label={c.title}>
              <h3>{c.title}</h3>
              <p className="muted">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
