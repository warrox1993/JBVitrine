# 🎯 Système de Lead Scoring V2 - Documentation Complète

## Vue d'ensemble

Système complet de qualification et scoring automatique des leads avec :
- **Scoring comportemental** en temps réel
- **Enrichissement automatique** des données (Hunter.io, Brandfetch)
- **Tracking avancé** de l'engagement
- **Routage automatique** des leads HOT/WARM
- **Notifications** Slack/Discord/Email
- **Dashboard administratif** avec filtres et analytics
- **Exports** CSV/Excel
- **Digest quotidien** par email

---

## 🏗️ Architecture

### Base de données (Neon PostgreSQL)

4 tables principales :
- `leads` - Leads capturés avec scoring complet
- `sessions` - Sessions comportementales des visiteurs
- `events` - Événements de tracking détaillés
- `quotes` - Ancienne table (rétrocompatibilité)

3 vues analytiques :
- `leads_by_grade` - Statistiques par grade
- `leads_by_project_type` - Statistiques par type de projet
- `daily_lead_stats` - Statistiques quotidiennes

### Modules principaux

```
src/
├── lib/
│   ├── db/                     # Connexion DB et queries
│   ├── leadScoring/            # Système de scoring
│   │   ├── behavioralTracking.ts
│   │   ├── enrichment.ts
│   │   ├── realTimeScorer.ts
│   │   └── types.ts
│   ├── notifications/          # Slack/Discord/Email
│   └── pricing/                # Calcul des devis
├── app/
│   ├── admin/leads/            # Dashboard admin
│   └── api/
│       ├── leadScoring/        # APIs de scoring
│       │   ├── leads/
│       │   ├── session/
│       │   └── events/
│       └── admin/leads/        # APIs admin
│           ├── export/csv/
│           ├── export/excel/
│           └── digest/
└── components/
    └── contact/QuoteWizard/    # Wizard de devis
```

---

## ⚙️ Configuration

### 1. Variables d'environnement

Copier `.env.example` vers `.env.local` et configurer :

```bash
# Base de données (REQUIS)
DATABASE_URL=postgresql://...@...neon.tech/...

# Email (REQUIS pour notifications)
RESEND_API_KEY=re_...

# Notifications (OPTIONNEL)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Cron (REQUIS pour digest)
CRON_SECRET=votre-secret-securise-ici

# Enrichissement (OPTIONNEL)
NEXT_PUBLIC_HUNTER_API_KEY=...
NEXT_PUBLIC_BRANDFETCH_API_KEY=...
```

### 2. Initialiser la base de données

```bash
# Créer les tables
npx tsx scripts/init-db.ts

# Tester la connexion
npx tsx scripts/test-db.ts
```

---

## 📊 Fonctionnalités

### 1. Routage automatique des leads

Les leads HOT et WARM déclenchent automatiquement :
- ✅ Notification Slack (si configuré)
- ✅ Notification Discord (si configuré)
- ✅ Email à l'équipe commerciale
- ✅ Sauvegarde en base de données

**Code:** `src/lib/notifications/index.ts`

Configuration dans `/api/leadScoring/leads/route.ts:87-111`

### 2. Dashboard administratif

**URL:** `/admin/leads`

**Fonctionnalités:**
- 📊 Statistiques en temps réel (total, hot, warm, cold, score moyen)
- 🔍 Filtres par grade (HOT, WARM, COLD, SPAM)
- 🔎 Recherche par nom, email, entreprise, téléphone
- 📥 Export CSV
- 📥 Export Excel détaillé
- 📧 Actions rapides (email, appel)

**Fichiers:**
- `src/app/admin/leads/page.tsx`
- `src/app/admin/leads/page.module.css`

### 3. Exports de données

#### Export CSV
**Endpoint:** `GET /api/admin/leads/export/csv`

Colonnes exportées :
- Informations de contact
- Scoring complet (total + breakdown)
- Données de projet
- Budget estimé
- Timestamps

#### Export Excel
**Endpoint:** `GET /api/admin/leads/export/excel`

Format XML compatible Excel avec :
- Formatage conditionnel (couleurs par grade)
- Mise en forme des montants (EUR)
- Toutes les colonnes + données enrichies
- Styles professionnels

### 4. Email digest quotidien

**Endpoint:** `POST /api/admin/leads/digest`

**Envoi automatique:** Chaque jour à 9h00 (via Vercel Cron)

**Contenu:**
- Statistiques des dernières 24h
- Liste des leads HOT
- Aperçu des leads WARM
- Résumé global

**Configuration manuelle:**

Pour tester manuellement :
```bash
curl -X POST https://votresite.com/api/admin/leads/digest \
  -H "Authorization: Bearer votre-cron-secret"
```

**Vercel Cron:** Configuré dans `vercel.json`

---

## 🎯 Système de scoring

### Breakdown du score (0-100 points)

| Catégorie | Points Max | Description |
|-----------|-----------|-------------|
| **Projet** | 30 pts | Type de projet, budget, complexité |
| **Engagement** | 25 pts | Temps passé, pages visitées, interactions |
| **Complétion** | 20 pts | Champs remplis dans le wizard |
| **Enrichissement** | 15 pts | Données entreprise validées |
| **Comportement** | 10 pts | Actions high-intent, wizard progression |

### Grades de qualification

| Grade | Score | Action recommandée |
|-------|-------|-------------------|
| 🔥 **HOT** | 70-100 | Contact immédiat (<24h) |
| ⚡ **WARM** | 50-69 | Suivi sous 2-3 jours |
| ❄️ **COLD** | 30-49 | Nurturing automatisé |
| 🚫 **SPAM** | 0-29 | Ignorer / Vérifier |

---

## 🔧 Utilisation

### Accéder au dashboard

1. Naviguer vers `/admin/leads`
2. Visualiser les statistiques en temps réel
3. Filtrer par grade ou rechercher
4. Cliquer sur les actions (email, appel)
5. Exporter si besoin

### Notifications Slack

1. Créer un webhook Slack : https://api.slack.com/messaging/webhooks
2. Ajouter `SLACK_WEBHOOK_URL` dans `.env.local`
3. Les leads HOT/WARM déclencheront automatiquement une notification

### Notifications Discord

1. Créer un webhook Discord (Server Settings > Integrations > Webhooks)
2. Ajouter `DISCORD_WEBHOOK_URL` dans `.env.local`
3. Les leads HOT/WARM déclencheront automatiquement une notification

### Configurer le digest quotidien

**Option 1: Vercel Cron (Recommandé)**
1. Deploy sur Vercel
2. Le fichier `vercel.json` configure automatiquement le cron
3. Ajouter `CRON_SECRET` dans les variables d'environnement Vercel

**Option 2: External Cron (GitHub Actions, Zapier, etc.)**
```yaml
# .github/workflows/daily-digest.yml
name: Daily Lead Digest
on:
  schedule:
    - cron: '0 9 * * *'  # 9h00 chaque jour
jobs:
  send-digest:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger digest
        run: |
          curl -X POST https://votresite.com/api/admin/leads/digest \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

---

## 📈 Analytics

### Queries SQL utiles

**Leads par grade:**
```sql
SELECT * FROM leads_by_grade;
```

**Performance quotidienne:**
```sql
SELECT * FROM daily_lead_stats
ORDER BY date DESC
LIMIT 30;
```

**Top projets:**
```sql
SELECT project_type, COUNT(*) as count, AVG(score_total) as avg_score
FROM leads
GROUP BY project_type
ORDER BY count DESC;
```

**Conversion rate par source:**
```sql
SELECT
  utm_source,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE score_grade = 'HOT') as hot_leads,
  ROUND(COUNT(*) FILTER (WHERE score_grade = 'HOT')::numeric / COUNT(*) * 100, 2) as conversion_rate
FROM leads
WHERE utm_source IS NOT NULL
GROUP BY utm_source;
```

---

## 🚀 Déploiement

### Étapes

1. **Configurer Neon Database**
   ```bash
   # Créer un projet sur neon.tech
   # Copier la connection string
   # Ajouter dans .env.local
   ```

2. **Initialiser la DB**
   ```bash
   npx tsx scripts/init-db.ts
   ```

3. **Configurer les webhooks**
   - Créer webhook Slack
   - Créer webhook Discord
   - Ajouter dans variables d'environnement

4. **Deploy sur Vercel**
   ```bash
   vercel --prod
   ```

5. **Configurer les variables d'environnement Vercel**
   - Aller dans Settings > Environment Variables
   - Ajouter toutes les variables de `.env.local`

6. **Tester**
   - Soumettre un lead via `/contact`
   - Vérifier `/admin/leads`
   - Vérifier les notifications

---

## 🐛 Troubleshooting

### La base de données ne se connecte pas
- Vérifier `DATABASE_URL` dans `.env.local`
- Tester avec `npx tsx scripts/test-db.ts`
- Vérifier les logs Neon

### Les notifications ne fonctionnent pas
- Vérifier les webhooks Slack/Discord
- Tester les URLs avec curl
- Vérifier les logs dans la console

### Le digest ne s'envoie pas
- Vérifier `CRON_SECRET`
- Tester manuellement : `curl -X POST .../digest -H "Authorization: Bearer SECRET"`
- Vérifier les logs Vercel Cron

### Les exports ne fonctionnent pas
- Vérifier que la DB contient des leads
- Tester directement les endpoints API
- Vérifier les permissions du navigateur

---

## 📝 Prochaines améliorations possibles

- [ ] Dashboard avec graphiques (Chart.js / Recharts)
- [ ] Segmentation automatique pour email marketing
- [ ] Intégration CRM (HubSpot, Salesforce)
- [ ] A/B testing du wizard
- [ ] Prédiction de conversion (ML)
- [ ] Webhook pour intégrations tierces
- [ ] API REST complète pour les leads
- [ ] Authentification admin sécurisée

---

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter : jeanbaptiste.dhondt1@gmail.com

---

**Développé avec ❤️ par Smidjan**
