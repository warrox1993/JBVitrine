import { Heading } from '@/components/ui/Heading';
import servicesStyles from '@/components/sections/Services/Services.module.css';

type Value = { title: string; desc: string };

const VALUES: Value[] = [
  {
    title: 'Rigueur',
    desc: 'Standards élevés, tests automatisés et revues croisées. Des livrables précis, mesurables et maintenables.',
  },
  {
    title: 'Clarté',
    desc: 'Parcours lisibles et hiérarchie nette. Chaque décision est documentée pour garder le cap.',
  },
  {
    title: 'Impact',
    desc: 'Pilotage par les indicateurs qui comptent: performance, adoption et conversion.',
  },
];

export default function ValuesCards() {
  return (
    <section aria-label="Valeurs fondamentales">
      <div className="stack" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <Heading as="h2" accent className="mb-4">Nos valeurs</Heading>
      </div>
      <div className={servicesStyles.grid}>
        {VALUES.map(({ title, desc }) => (
          <article key={title} className={`${servicesStyles.card} ${servicesStyles.regular}`}>
            <h3 className={servicesStyles.cardTitle}>{title}</h3>
            <p className={servicesStyles.cardDesc}>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
