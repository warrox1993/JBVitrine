# 🔧 Guide de Mise à Jour des Variables d'Environnement Vercel

## 📋 Variables à Mettre à Jour

### ❌ Variables à SUPPRIMER (anciennes)

1. `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
2. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. `RECAPTCHA_SECRET_KEY` (si elle existe)
4. `NEXT_PUBLIC_HUNTER_API_KEY` (si elle existe)
5. `NEXT_PUBLIC_BRANDFETCH_API_KEY` (si elle existe)

### ✅ Variables à AJOUTER (nouvelles)

1. `NEXT_PUBLIC_RECAPTCHA_SITE_ID`
   - Valeur: Copier la valeur de l'ancienne `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - Environnements: Production, Preview, Development

2. `NEXT_PUBLIC_GOOGLE_MAPS_ID`
   - Valeur: Copier la valeur de l'ancienne `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Environnements: Production, Preview, Development

3. `RECAPTCHA_SECRET`
   - Valeur: Copier la valeur de l'ancienne `RECAPTCHA_SECRET_KEY`
   - Environnements: Production, Preview, Development
   - ⚠️ **IMPORTANT**: Cette clé est PRIVÉE (pas de NEXT_PUBLIC_)

4. `HUNTER_API_KEY` (si vous utilisez Hunter.io)
   - Valeur: Votre clé API Hunter.io
   - Environnements: Production, Preview, Development
   - ⚠️ **PRIVÉE** (pas de NEXT_PUBLIC_)

5. `BRANDFETCH_API_KEY` (si vous utilisez Brandfetch)
   - Valeur: Votre clé API Brandfetch
   - Environnements: Production, Preview, Development
   - ⚠️ **PRIVÉE** (pas de NEXT_PUBLIC_)

---

## 🎯 Procédure Étape par Étape

### Étape 1: Accéder aux Variables d'Environnement

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet (Smidjan)
3. Cliquez sur **Settings** (Paramètres)
4. Dans le menu latéral, cliquez sur **Environment Variables**

### Étape 2: Copier les Valeurs des Anciennes Variables

**AVANT de supprimer**, copiez les valeurs:

1. Cliquez sur `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
2. Cliquez sur le bouton **👁️ Show** pour révéler la valeur
3. Copiez la valeur complète (commence par `6L...`)
4. Collez-la dans un fichier texte temporaire

Répétez pour:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (commence par `AIza...`)
- `RECAPTCHA_SECRET_KEY` (commence par `6L...`)

### Étape 3: Supprimer les Anciennes Variables

Pour chaque ancienne variable:

1. Trouvez la variable dans la liste
2. Cliquez sur les **3 points** (⋮) à droite
3. Cliquez sur **Delete**
4. Confirmez la suppression

Supprimez:
- ❌ `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- ❌ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- ❌ `RECAPTCHA_SECRET_KEY`
- ❌ `NEXT_PUBLIC_HUNTER_API_KEY` (si présente)
- ❌ `NEXT_PUBLIC_BRANDFETCH_API_KEY` (si présente)

### Étape 4: Ajouter les Nouvelles Variables

Pour chaque nouvelle variable:

1. Cliquez sur **Add New** (en haut à droite)
2. Remplissez les champs:

#### Variable 1: reCAPTCHA Site ID
```
Name: NEXT_PUBLIC_RECAPTCHA_SITE_ID
Value: [Votre clé site reCAPTCHA - commence par 6L...]
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: Google Maps ID
```
Name: NEXT_PUBLIC_GOOGLE_MAPS_ID
Value: [Votre clé Google Maps - commence par AIza...]
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: reCAPTCHA Secret
```
Name: RECAPTCHA_SECRET
Value: [Votre secret reCAPTCHA - commence par 6L...]
Environments: ✅ Production ✅ Preview ✅ Development
```

3. Cliquez sur **Save** pour chaque variable

### Étape 5: Redéployer l'Application

⚠️ **IMPORTANT**: Les changements de variables d'environnement nécessitent un redéploiement!

**Option A: Redéploiement Automatique (Recommandé)**
1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement réussi
3. Cliquez sur les **3 points** (⋮) à droite
4. Cliquez sur **Redeploy**
5. Confirmez le redéploiement

**Option B: Push Git (Alternative)**
1. Faites un petit commit dans votre repo:
   ```bash
   git commit --allow-empty -m "chore: trigger redeploy for env vars"
   git push
   ```

---

## ✅ Vérification

Après le redéploiement, vérifiez que tout fonctionne:

### 1. Variables d'Environnement Vercel
- [ ] Toutes les anciennes variables sont supprimées
- [ ] Les 3 nouvelles variables sont ajoutées (ou 5 si Hunter/Brandfetch)
- [ ] Chaque variable est activée pour Production, Preview, Development

### 2. Application en Production
- [ ] La carte Google Maps s'affiche correctement
- [ ] Le formulaire de contact fonctionne
- [ ] reCAPTCHA fonctionne (vérifier badge en bas à droite)
- [ ] Aucune erreur dans la console du navigateur

### 3. Logs Vercel
1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Vérifiez qu'il n'y a pas d'erreurs liées aux variables d'environnement

---

## 🐛 Dépannage

### Problème: La carte Google Maps ne s'affiche pas
**Solution**:
- Vérifiez que `NEXT_PUBLIC_GOOGLE_MAPS_ID` est bien définie
- Vérifiez que la valeur commence par `AIza`
- Redéployez l'application

### Problème: reCAPTCHA ne fonctionne pas
**Solution**:
- Vérifiez que `NEXT_PUBLIC_RECAPTCHA_SITE_ID` est bien définie
- Vérifiez que `RECAPTCHA_SECRET` est bien définie (SANS NEXT_PUBLIC_)
- Redéployez l'application

### Problème: "Environment variable not found"
**Solution**:
- Les variables d'environnement ne sont disponibles qu'APRÈS un redéploiement
- Assurez-vous d'avoir redéployé après l'ajout des variables

---

## 📝 Checklist Complète

- [ ] Copier les valeurs des anciennes variables (dans un fichier texte)
- [ ] Supprimer `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] Supprimer `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- [ ] Supprimer `RECAPTCHA_SECRET_KEY`
- [ ] Ajouter `NEXT_PUBLIC_RECAPTCHA_SITE_ID`
- [ ] Ajouter `NEXT_PUBLIC_GOOGLE_MAPS_ID`
- [ ] Ajouter `RECAPTCHA_SECRET`
- [ ] Redéployer l'application
- [ ] Vérifier que la carte Google Maps fonctionne
- [ ] Vérifier que le formulaire de contact fonctionne
- [ ] Vérifier qu'il n'y a plus de warnings dans les logs Vercel

---

## 🎁 Résultat Attendu

Après cette mise à jour:
- ✅ Plus de warnings "This key might expose sensitive information"
- ✅ Tous les services fonctionnent (Maps, reCAPTCHA, Contact)
- ✅ Sécurité améliorée (clés Hunter/Brandfetch privées)
- ✅ Nomenclature cohérente (pas de "KEY" dans les noms publics)

---

## 📞 Besoin d'Aide?

Si vous rencontrez des problèmes:
1. Vérifiez les logs de déploiement Vercel
2. Vérifiez la console du navigateur (F12)
3. Assurez-vous que toutes les variables sont en Production + Preview + Development

**Temps estimé**: 10-15 minutes ⏱️
