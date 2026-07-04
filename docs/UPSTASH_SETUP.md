# 🚀 Configuration d'Upstash Redis

Votre projet utilise maintenant Upstash Redis pour le rate limiting. Voici comment configurer votre compte (gratuit) :

## Étape 1 : Créer un compte Upstash (2 minutes)

1. Allez sur [https://upstash.com/](https://upstash.com/)
2. Cliquez sur **"Sign Up"** (vous pouvez utiliser GitHub)
3. Confirmez votre email

## Étape 2 : Créer une Redis Database (1 minute)

1. Dans le dashboard Upstash, cliquez sur **"Create Database"**
2. Configurez :
   - **Name** : `smidjan-ratelimit` (ou votre choix)
   - **Region** : Choisissez `Europe (Ireland)` pour GDPR
   - **Type** : `Regional` (gratuit)
   - **Eviction** : Laissez sur `allkeys-lru` (par défaut)
3. Cliquez sur **Create**

## Étape 3 : Copier les clés API (1 minute)

1. Dans la page de votre database, allez dans l'onglet **"Details"**
2. Vous verrez deux sections :
   - ✅ **REST API** ← Utilisez celle-ci
   - ❌ **Redis client** (pas nécessaire)
3. Copiez les deux valeurs suivantes :
   - `UPSTASH_REDIS_REST_URL` (ressemble à `https://xxx-xxx.upstash.io`)
   - `UPSTASH_REDIS_REST_TOKEN` (une longue chaîne de caractères)

## Étape 4 : Ajouter les variables d'environnement

### En local (`.env.local`)

Ouvrez votre fichier `.env.local` et ajoutez :

```bash
# Upstash Redis (Rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx-xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=votre_token_ici
```

### Sur Vercel (Production)

1. Allez dans le dashboard Vercel : [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les deux variables :

| Name                       | Value                        |
| -------------------------- | ---------------------------- |
| `UPSTASH_REDIS_REST_URL`   | `https://xxx-xxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | `votre_token_ici`            |

5. Assurez-vous de les cocher pour **Production**, **Preview**, et **Development**
6. Cliquez sur **Save**
7. **Redéployez** votre application pour que les changements prennent effet

## Étape 5 : Tester en local

Lancez votre serveur de développement :

```bash
npm run dev
```

Essayez de soumettre un formulaire. Vous devriez voir dans la console :

```
✅ Quote rate limit OK: { remaining: 2, limit: 3 }
```

## Étape 6 : Vérifier les analytics (optionnel)

1. Dans votre dashboard Upstash, allez dans l'onglet **"Analytics"**
2. Vous verrez en temps réel :
   - Nombre de commandes par jour
   - Latence des requêtes
   - Utilisation du quota gratuit

## 🎯 Ce qui est configuré

Votre nouveau système de rate limiting Redis protège 3 endpoints :

| Route                     | Limite      | Période    |
| ------------------------- | ----------- | ---------- |
| `/api/quote`              | 3 requêtes  | par heure  |
| `/api/contact`            | 5 requêtes  | par heure  |
| `/api/leadScoring/enrich` | 10 requêtes | par minute |

**Avantages :**

- ✅ Chaque utilisateur a son propre compteur (IP-based)
- ✅ Fonctionne en production serverless (Vercel)
- ✅ Sliding window (plus fair qu'une fixed window)
- ✅ Analytics intégrés
- ✅ Gratuit jusqu'à 10,000 commandes/jour

## ❓ FAQ

**Q : Dois-je payer ?**
R : Non, le plan gratuit (10,000 commandes/jour) est largement suffisant. Vous ne paierez que si vous dépassez.

**Q : Puis-je utiliser la même database pour plusieurs projets ?**
R : Oui, mais c'est recommandé de créer une database par projet pour isoler les quotas.

**Q : Que se passe-t-il si Redis est down ?**
R : Le système "fail open" (permet la requête) pour éviter de bloquer les utilisateurs. Vous verrez juste un warning dans les logs.

**Q : Puis-je ajuster les limites ?**
R : Oui, éditez `src/lib/rate-limit-redis.ts` et modifiez les valeurs dans `Ratelimit.slidingWindow(X, 'Yh')`.

## 🐛 Dépannage

**Erreur : `UPSTASH_REDIS_REST_URL is not defined`**

- Vérifiez que vous avez bien ajouté les variables dans `.env.local`
- Redémarrez votre serveur de développement (`npm run dev`)

**Erreur 401 Unauthorized**

- Vérifiez que votre `UPSTASH_REDIS_REST_TOKEN` est correct
- Assurez-vous de copier le token depuis la section **"REST API"** (pas "Redis client")

**Requests toujours bloquées après migration**

- Supprimez les anciennes données en allant dans **Upstash Dashboard → Data Browser → Flush All**
- Ou attendez 1 heure que la fenêtre de rate limit expire

---

**✅ Une fois configuré, votre rate limiting sera opérationnel et protégera votre production !**
