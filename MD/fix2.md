Tu es un expert Next.js 16 + TypeScript, spécialisé en audit et correction de code React strictement typé.

CONTEXTE :
Je viens de merger une branche "FixCss" dans main.  
Le déploiement Vercel a échoué avec cette erreur TypeScript :
> Type error: Expected 1 arguments, but got 0.
> ./src/app/about/Team.tsx:123:24
> const animationRef = useRef<number>();

OBJECTIF :
1. Auditer le fichier complet `src/app/about/Team.tsx` et détecter toutes les causes potentielles d’erreurs TypeScript ou d’imports cassés après la fusion.
2. Corriger **toutes les refs et hooks** mal initialisés (`useRef`, `useEffect`, `useMemo`, etc.) pour être compatibles avec TypeScript strict.
3. Respecter le style du projet (React + TSX, pas de suppression inutile de code, pas de dépendances ajoutées).
4. Si la logique originale du composant n’est pas claire (ex : animation, canvas, etc.), commente brièvement tes hypothèses dans le code.
5. Fournir un code final **corrigé, testé et compilable sans erreur** avec `npm run build` (Next.js 16.0.0 + Turbopack).

CONTRAINTES :
- Maintenir toutes les fonctionnalités existantes (pas de refactor visuel ou fonctionnel).
- Ne pas désactiver TypeScript ni assouplir les types.
- Retourner le code complet de `Team.tsx` corrigé, suivi d’un court résumé expliquant chaque correction (1 phrase par point corrigé).

OPTIONNEL :
- Si tu repères d'autres refs mal initialisées (HTMLDivElement, Canvas, etc.), corrige-les toutes.
- Si le composant utilise `react-three-fiber` ou un canvas, adapte les `useRef` en conséquence (`useRef<THREE.Group | null>(null)` par exemple).

But final : le build Vercel doit réussir sans aucune erreur TypeScript.
