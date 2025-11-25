# CLAUDE.md - Mémoire persistante

## RÈGLES ABSOLUES

1. **NE JAMAIS dire que l'utilisateur utilise une ancienne version** - Le code en production EST la version actuelle. Si ça ne marche pas en prod, c'est que le code est cassé, point final.

2. **Les tests localhost ne prouvent RIEN pour la production** - Il faut tester en prod.

3. **RATE LIMITING : 3 ENVOIS PAR HEURE MAXIMUM** - Ne JAMAIS changer cette limite. C'est la valeur correcte pour la sécurité anti-spam.

4. **Le bug des 429 a été créé par Claude il y a une semaine** - C'est un bug dans le code, pas un problème de configuration Vercel ou de limites.

## Problème actuel à corriger

### Bug 429 sur /api/csrf/token et autres endpoints
- Le bug existe depuis une semaine
- Les 429 apparaissent même avec la PREMIÈRE requête
- Ce n'est PAS un problème de limites trop basses
- C'est un bug dans le code lui-même qu'il faut trouver et corriger
