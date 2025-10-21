import Image from 'next/image';

type Member = { name: string; role: string; bio: string; avatar: string };

import { Heading } from '@/components/ui/Heading';

export default function Team() {
  const team: Member[] = [
    { name: 'Alexandre N.', role: 'Designer Produit', bio: 'Conçoit des systèmes qui respirent, où chaque détail sert un parcours clair. Partisan d’une esthétique utile et mesurable.', avatar: '/images/pic01.webp' },
    { name: 'Mina L.', role: 'Ingénieure Frontend', bio: 'Écrit du code maintenable, documente, teste. Cherche le juste équilibre entre performance, accessibilité et scalabilité.', avatar: '/images/pic02.webp' },
    { name: 'Yanis R.', role: 'Product Builder', bio: 'Relie enjeux métiers et arbitrages techniques. Défend le pragmatisme, la clarté des roadmaps et la valeur livrée.', avatar: '/images/pic03.webp' },
  ];
  return (
    <div className="stack">
      <Heading as="h2" accent className="mb-4">Équipe</Heading>
      <div className="grid-3">
        {team.map((m) => (
          <article key={m.name} className="stack" aria-label={`${m.name}, ${m.role}`}>
            <Image src={m.avatar} alt={`${m.name} — ${m.role}`} width={160} height={160} loading="lazy" />
            <strong>{m.name}</strong>
            <div className="muted">{m.role}</div>
            <p>{m.bio}</p>
          </article>
        ))}
      </div>
      <p className="muted">Selon le projet, nous activons un réseau d’experts associés (recherche utilisateur, contenu, vidéo, data).</p>
    </div>
  );
}
