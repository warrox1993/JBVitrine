import { Heading } from '@/components/ui/Heading';

export default function ProcessMini() {
  const steps = [
    { title: 'Découverte', text: 'Nous commençons par comprendre le vrai besoin, pas la demande initiale. Audit, interviews, objectifs.' },
    { title: 'Design System', text: 'Nous définissons les tokens, les couleurs, les typographies, les composants, et leur documentation.' },
    { title: 'Implémentation', text: 'Chaque ligne de code respecte les standards du projet, du naming convention jusqu’à la CI/CD.' },
    { title: 'Mesure & itération', text: 'Les produits évoluent. Nous mesurons, analysons, corrigeons, itérons.' },
  ];
  return (
    <div className="stack">
      <Heading as="h2" accent className="mb-4">Méthode </Heading>
      <p className="muted">Notre méthode n’est pas un secret, c’est une discipline. Nous la partageons car elle garantit qualité, prédictibilité et performance.</p>
      <ol className="grid-2" aria-label="Étapes du processus">
        {steps.map((s) => (
          <li key={s.title} className="stack">
            <strong>{s.title}</strong>
            <span className="muted">{s.text}</span>
          </li>
        ))}
      </ol>
      <p>
        <a className="header-link" href="/processus">Lire le Processus</a>
      </p>
    </div>
  );
}
