import { Heading } from '@/components/ui/Heading';

export default function Mission() {
  return (
    <div className="stack">
      <Heading as="h2" accent className="mb-4">Notre mission</Heading>
      <div className="prose">
        <p>
          SMIDJAN est née d’une idée simple : la technologie n’est pas un but, c’est un matériau. Comme une forge, nous transformons
          ce matériau brut — le code, les données, les interfaces — en expériences utiles, élégantes et durables. Notre mission est de
          relier excellence technique et sensibilité artistique, pour créer des produits numériques qui inspirent confiance
          et fluidité. Nous croyons à un numérique qui respire, mesurable.
        </p>
      </div>
    </div>
  );
}
