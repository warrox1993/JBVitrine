import { Heading } from '@/components/ui/Heading';

export default function FAQ() {
  const items = [
    { q: 'Comment démarre un projet ?', a: 'Par un atelier de 90 minutes, où l’on cartographie vos objectifs, vos cibles et vos contraintes. De là naît un plan clair et mesurable.' },
    { q: 'Quels sont vos délais moyens ?', a: 'Une vitrine premium : 3 à 6 semaines. Un produit sur mesure : sprint de 2 semaines, avec livrables itératifs.' },
    { q: 'Qui rédige le contenu ?', a: 'Nous structurons, vous écrivez, ou inversement. L’important, c’est que le message soit vrai et lisible.' },
    { q: 'Comment gérez-vous la maintenance ?', a: 'Nos projets incluent un plan d’entretien : mises à jour, audit, monitoring, support prioritaire.' },
    { q: 'Qui détient le code ?', a: 'Toujours vous. Tout est documenté, versionné, transféré en fin de mission.' },
  ];
  return (
    <div className="stack">
      <Heading as="h2" accent className="mb-4">FAQ</Heading>
      <div className="stack">
        {items.map(({ q, a }) => (
          <article key={q} className="stack">
            <h3>{q}</h3>
            <p className="muted">{a}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
