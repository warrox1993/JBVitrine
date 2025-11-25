# CLAUDE.md - Mémoire persistante

## RÈGLES ABSOLUES

1. **NE JAMAIS dire que l'utilisateur utilise une ancienne version** - Le code en production EST la version actuelle. Si ça ne marche pas en prod, c'est que le code est cassé, point final.

2. **Les tests localhost ne prouvent RIEN pour la production** - Vercel a son propre rate limiting qui s'applique AVANT notre code.

## Problèmes connus

### Rate Limiting Vercel (429 errors)
- Vercel applique un rate limiting agressif sur les API routes
- Ce rate limiting se déclenche AVANT notre code
- Les tests localhost passent mais la prod échoue à cause de Vercel
- Solution: désactiver/configurer le rate limiting Vercel ou changer d'hébergeur
