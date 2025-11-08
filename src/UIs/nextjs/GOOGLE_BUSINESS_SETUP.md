# 🗺️ Configuration Google Maps & Google My Business

## 📋 Checklist Google My Business

### 1. Créer/Vérifier Votre Fiche Google Business

- [ ] Créer une fiche sur https://www.google.com/business/
- [ ] Remplir toutes les informations:
  - **Nom:** Smidjan
  - **Catégorie:** Agence de développement web / Concepteur de sites Web
  - **Adresse:** Liège, Belgique
  - **Téléphone:** +32 475 20 55 62
  - **Site web:** https://smidjan.be
  - **Horaires:** À définir
  - **Description:** Agence web spécialisée en développement d'applications modernes...

- [ ] Vérifier la fiche (par courrier, téléphone ou email)
- [ ] Ajouter des photos (logo, bureaux, équipe)
- [ ] Ajouter les services (développement web, apps mobiles, etc.)

---

## 🔑 Obtenir le Place ID

### Méthode 1: Google Maps URL

1. Allez sur https://www.google.com/maps
2. Recherchez votre entreprise: "Smidjan Liège"
3. Cliquez sur votre fiche
4. Copiez l'URL:
   ```
   https://www.google.com/maps/place/Smidjan/@50.6446374,5.5664509,17z/data=!3m1!4b1!4m6!3m5!1s0xABCDEF123456...
   ```
5. Le Place ID commence après `1s0x` ou `1s`

### Méthode 2: Place ID Finder

1. Ouvrez: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
2. Recherchez: "Smidjan, Liège, Belgique"
3. Cliquez sur le marqueur
4. Copiez le **Place ID** (format: `ChIJ...`)

### Méthode 3: API Place Details

Si vous avez l'API activée:
```bash
curl "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Smidjan%20Liège&inputtype=textquery&fields=place_id&key=YOUR_API_KEY"
```

---

## 🔧 Configuration du Code

### Option 1: Avec Place ID (Recommandé ⭐)

Une fois le Place ID obtenu, mettez à jour le code:

```tsx
// src/app/contact/UnifiedContactPage.tsx
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}&q=place_id:ChIJVOTRE_PLACE_ID_ICI&zoom=15&language=fr&region=BE`}
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Localisation Smidjan à Liège, Belgique"
/>
```

**Avantages:**
- ✅ Affiche votre fiche Google Business complète
- ✅ Les utilisateurs voient les avis, photos, horaires
- ✅ Bouton "Itinéraire" intégré
- ✅ Meilleur pour le SEO local

### Option 2: Avec le Nom de l'Entreprise

Si votre fiche est bien établie:

```tsx
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}&q=Smidjan,Liège,Belgique&zoom=15&language=fr&region=BE`}
  // ...
/>
```

### Option 3: Coordonnées GPS (Actuel - Pas de fiche Business)

```tsx
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}&q=50.6446374,5.5664509&zoom=13&language=fr&region=BE`}
  // ...
/>
```

**Inconvénient:** Pas de lien avec Google Business

---

## 📊 Comparaison des Options

| Option | Affichage | Fiche Business | Avis | Bouton Itinéraire | SEO Local |
|--------|-----------|----------------|------|-------------------|-----------|
| **Place ID** | ✅ Optimal | ✅ Oui | ✅ Oui | ✅ Oui | ✅ Excellent |
| **Nom Entreprise** | ✅ Bon | ✅ Oui | ✅ Oui | ✅ Oui | ✅ Bon |
| **Coordonnées GPS** | ⚠️ Basique | ❌ Non | ❌ Non | ⚠️ Basique | ⚠️ Moyen |

---

## 🎯 Prochaines Étapes

### Si vous N'AVEZ PAS encore de fiche Google Business:

1. **Créer la fiche:**
   - Allez sur https://www.google.com/business/
   - Remplissez toutes les informations
   - Vérifiez votre entreprise (par courrier/téléphone)

2. **Obtenir le Place ID:**
   - Utilisez une des méthodes ci-dessus
   - Notez le Place ID (format: `ChIJ...`)

3. **Mettre à jour le code:**
   - Donnez-moi le Place ID
   - Je mettrai à jour l'iframe

### Si vous AVEZ déjà une fiche Google Business:

1. **Trouvez votre Place ID:**
   - Utilisez Place ID Finder (lien ci-dessus)
   - Ou cherchez dans l'URL Google Maps

2. **Donnez-moi le Place ID:**
   - Format: `ChIJ...` (environ 27 caractères)
   - Je mettrai immédiatement à jour le code

---

## 🔍 Vérification

Une fois le Place ID intégré, vérifiez:

### Sur votre site:
- [ ] La carte affiche votre fiche complète
- [ ] Le nom "Smidjan" apparaît sur la carte
- [ ] Les avis Google sont visibles (si vous en avez)
- [ ] Le bouton "Itinéraire" fonctionne

### Dans Google Search Console:
- [ ] La propriété Google Business est liée
- [ ] Les données structurées incluent le Place ID
- [ ] Le Local Business schema est valide

---

## 📞 Besoin d'Aide?

**Donnez-moi simplement:**
1. Votre Place ID (si vous l'avez trouvé)
   - Format: `ChIJ...`

OU

2. Confirmez si vous avez déjà créé votre fiche Google My Business
   - Oui/Non
   - Si oui, quel est le nom exact?

Et je mettrai à jour le code immédiatement! 🚀

---

## 🎁 Bonus: Optimisation SEO Local

Une fois le Place ID intégré, ajoutez aussi:

### Dans schema.ts:
```typescript
{
  "@type": "LocalBusiness",
  "url": "https://smidjan.be",
  "name": "Smidjan",
  "hasMap": "https://www.google.com/maps?cid=VOTRE_CID_ICI",
  // ...
}
```

### Dans sitemap.xml:
```xml
<url>
  <loc>https://smidjan.be/contact</loc>
  <geo:geo>
    <geo:lat>50.6446374</geo:lat>
    <geo:long>5.5664509</geo:long>
  </geo:geo>
</url>
```

Cela améliore considérablement votre référencement local! 📈
